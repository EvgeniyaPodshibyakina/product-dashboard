import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import ProductDashboard from './ProductDashboard';
import { vi } from 'vitest';
import { useGetProductDataQuery } from '../../services/productApi';

vi.mock('../../services/productApi', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual as Record<string, unknown>, 
      useGetProductDataQuery: vi.fn(), 
    };
  });

describe('ProductDashboard', () => {
  const mockProductData = {
    sweater: {
      salesData: [{ month: 'Jan', sales: 500 }],
      conversionData: [{ month: 'Jan', conversionRate: 0.2 }],
      reviewData: [{ month: 'Jan', averageRating: 4.8 }],
      comments: [{ author: 'Alice', text: 'Amazing sweater!' }],
      inventory: 50,
    },
  };

  beforeEach(() => {
    
    (useGetProductDataQuery as jest.Mock).mockReturnValue({
      data: mockProductData,
      isLoading: false,
      error: null,
    });
  });

  it('renders the product selector and dashboard content', () => {
    render(
      <Provider store={store}>
        <ProductDashboard />
      </Provider>
    );

    expect(screen.getByLabelText('Product')).toBeInTheDocument();
    expect(screen.getByText('Sales Over Time')).toBeInTheDocument();
    expect(screen.getByText('Conversion Rate Over Time')).toBeInTheDocument();
    expect(screen.getByText('Customer Review Trend')).toBeInTheDocument();
  });

  it('displays loading state while fetching data', () => {
 
    (useGetProductDataQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <Provider store={store}>
        <ProductDashboard />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('handles API errors gracefully', () => {

    (useGetProductDataQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: { status: 500, message: 'Internal Server Error' },
    });

    render(
      <Provider store={store}>
        <ProductDashboard />
      </Provider>
    );

    expect(screen.getByText('Error: 500')).toBeInTheDocument();
  });

  it('updates the dashboard when a different product is selected', () => {
    render(
      <Provider store={store}>
        <ProductDashboard />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Product'), {
      target: { value: 'sweater' },
    });

    expect(screen.getByText('Amazing sweater!')).toBeInTheDocument();
  });
});