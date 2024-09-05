import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductDataDisplay from './ProductDataDisplay';
import { ProductDataDisplayProps } from './types/ProductDataDisplayProps';
import { useReportData } from '../../hooks/ui/useReportData/useReportData';
import { vi } from 'vitest';

// Mocking the useReportData hook
vi.mock('../../hooks/ui/useReportData/useReportData');

const mockUseReportData = useReportData as jest.MockedFunction<typeof useReportData>;

describe('ProductDataDisplay', () => {
  // Mock props for ProductDataDisplay component
  const mockProps: ProductDataDisplayProps = {
    salesData: [{ month: 'Jan', sales: 1000 }],
    conversionData: [{ month: 'Jan', conversionRate: 0.1 }],
    reviewData: [{ month: 'Jan', averageRating: 4.5 }],
    comments: [{ author: 'John', text: 'Great product!' }],
    inventoryCount: 100,
  };

  // Setup before each test case
  beforeEach(() => {
    // Mocking the return value of useReportData hook
    mockUseReportData.mockReturnValue(mockProps);
  });

  // checking if the component renders correctly with provided data
  it('renders correctly with provided data', () => {
    render(<ProductDataDisplay {...mockProps} />);

    // Check if specific elements and data are displayed
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Sales Over Time')).toBeInTheDocument();
    expect(screen.getByText('Conversion Rate Over Time')).toBeInTheDocument();
    expect(screen.getByText('Customer Review Trend')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Great product!')).toBeInTheDocument();
  });

  // checking if the GenerateReportButton renders
  it("renders the GenerateReportButton", () => {
    render(<ProductDataDisplay {...mockProps} />);
    expect(screen.getByText("Generate Report")).toBeInTheDocument();
  });

  // ensuring useReportData is called with correct parameters
  it("calls useReportData with correct parameters", () => {
    render(<ProductDataDisplay {...mockProps} />);
    expect(mockUseReportData).toHaveBeenCalledWith(mockProps);
  });
  
});