import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import ProductDashboard from './ProductDashboard';
import { vi } from 'vitest';
import { useGetProductDataQuery } from '../../services/productApi';

// Correct mock for productApi and useGetProductDataQuery
vi.mock('../../services/productApi', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual as Record<string, unknown>, // add a type for actual
      useGetProductDataQuery: vi.fn(), // mock the required function
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
    // Mock successful data fetching
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

    // Check that the Product Selector is rendered
    expect(screen.getByLabelText('Product')).toBeInTheDocument();

    // Check that the dashboard displays product-related data
    expect(screen.getByText('Sales Over Time')).toBeInTheDocument();
    expect(screen.getByText('Conversion Rate Over Time')).toBeInTheDocument();
    expect(screen.getByText('Customer Review Trend')).toBeInTheDocument();
  });

  it('displays loading state while fetching data', () => {
    // Mock the loading state
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

    // Check that loading message is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('handles API errors gracefully', () => {
    // Mock an API error
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

    // Check that error message is displayed
    expect(screen.getByText('Error: 500')).toBeInTheDocument();
  });

  it('updates the dashboard when a different product is selected', () => {
    render(
      <Provider store={store}>
        <ProductDashboard />
      </Provider>
    );

    // Simulate product selection change
    fireEvent.change(screen.getByLabelText('Product'), {
      target: { value: 'sweater' },
    });

    // Check that product-related data updates
    expect(screen.getByText('Amazing sweater!')).toBeInTheDocument();
  });
});