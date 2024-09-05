import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { vi } from 'vitest';
import { useGetProductDataQuery } from './services/productApi';

// Мокаем API вызов для получения данных
vi.mock('./services/productApi', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual as Record<string, unknown>, // add a type for actual,
    useGetProductDataQuery: vi.fn(() => ({
      data: {
        dress: {
          salesData: [
            { month: 'Jan', sales: 100 },
            { month: 'Feb', sales: 200 },
          ],
          conversionData: [
            { month: 'Jan', conversionRate: 0.1 },
            { month: 'Feb', conversionRate: 0.2 },
          ],
          reviewData: [
            { month: 'Jan', averageRating: 4.5 },
            { month: 'Feb', averageRating: 4.6 },
          ],
          comments: [
            { author: 'John', text: 'Great product!' },
            { author: 'Doe', text: 'Excellent!' },
          ],
          inventory: 150,
        },
      },
      error: null,
      isLoading: false,
      refetch: vi.fn(), 
    })),
  };
});

describe('App Component', () => {
  it('renders ProductDashboard component with correct heading', () => {
    // Оборачиваем App в Provider с передачей store
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Проверяем, что компонент ProductDashboard отображает заголовок
    const heading = screen.getByRole('heading', { name: /Product Dashboard/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders loading state initially', () => {
    // Мокаем состояние загрузки
    vi.mocked(useGetProductDataQuery).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
      refetch: vi.fn(), 
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Проверяем, что отображается индикатор загрузки
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('handles error state correctly', () => {
    // Мокаем ошибку
    vi.mocked(useGetProductDataQuery).mockReturnValue({
      data: null,
      error: { message: 'Failed to fetch data' },
      isLoading: false,
      refetch: vi.fn(), 
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Проверяем, что ошибка отображается
    expect(screen.getByText(/Failed to fetch data/i)).toBeInTheDocument();
  });
});