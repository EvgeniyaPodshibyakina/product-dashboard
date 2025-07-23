import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductSelector from './ProductSelector';
import { vi } from 'vitest';

const mockOnProductChange = vi.fn();

describe('ProductSelector', () => {

  const mockOptions = ['Sweater', 'Jacket', 'Jeans', 'Dress'];

  beforeEach(() => {
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

    fireEvent.click(screen.getByRole('button', { name: /open/i }));

    const jacketOption = screen.getByText('Jacket');
    fireEvent.click(jacketOption);

    expect(mockOnProductChange).toHaveBeenCalledWith(
      expect.anything(),  
      'Jacket',            
      expect.anything(),   
      expect.anything()
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

    fireEvent.change(screen.getByLabelText('Product'), {
      target: { value: 'Sweater' },
    });

    expect(mockOnProductChange).not.toHaveBeenCalled();
  });
});