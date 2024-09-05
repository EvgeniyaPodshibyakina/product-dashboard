import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductSelector from './ProductSelector';
import { vi } from 'vitest';

// Mock the onProductChange callback
const mockOnProductChange = vi.fn();

describe('ProductSelector', () => {
  // Updating mockOptions to include 'Dress'
  const mockOptions = ['Sweater', 'Jacket', 'Jeans', 'Dress'];

  beforeEach(() => {
    // Reset the mock function before each test to ensure isolated test cases
    mockOnProductChange.mockClear();
  });

  it('renders correctly with provided options and selected product', () => {
    render(
      <ProductSelector
        selectedProduct="Sweater"
        onProductChange={mockOnProductChange}
        options={mockOptions}
      />
    );
    
    // Verify that the selected product is displayed
    expect(screen.getByDisplayValue('Sweater')).toBeInTheDocument();

  });

  it('calls onProductChange when a new product is selected', () => {
    render(
      <ProductSelector
        selectedProduct="Sweater"
        onProductChange={mockOnProductChange}
        options={mockOptions}
      />
    );

    // Open the dropdown list
    fireEvent.click(screen.getByRole('button', { name: /open/i }));

    // Find and click on the 'Jacket' option
    const jacketOption = screen.getByText('Jacket');
    fireEvent.click(jacketOption);

    // Verify that onProductChange was called with the correct parameters
    expect(mockOnProductChange).toHaveBeenCalledWith(
      expect.anything(),   // the click event
      'Jacket',            // the selected product
      expect.anything(),   // additional parameters (e.g., 'selectOption')
      expect.anything()    // object with additional details
    );
  });

  it('does not call onProductChange if the selected product is the same', () => {
    render(
      <ProductSelector
        selectedProduct="Sweater"
        onProductChange={mockOnProductChange}
        options={mockOptions}
      />
    );

    // Simulate selecting the same product again
    fireEvent.change(screen.getByLabelText('Product'), {
      target: { value: 'Sweater' },
    });

    // Verify that onProductChange is not called
    expect(mockOnProductChange).not.toHaveBeenCalled();
  });
});