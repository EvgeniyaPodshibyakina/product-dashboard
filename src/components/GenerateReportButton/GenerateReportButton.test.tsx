import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GenerateReportButton from './GenerateReportButton';
import { ProductDataDisplayProps } from '../ProductDataDisplay/types/ProductDataDisplayProps';
import { vi } from 'vitest';


describe('GenerateReportButton', () => {
  const mockReportData: ProductDataDisplayProps = {
    salesData: [{ month: 'Jan', sales: 1000 }],
    conversionData: [{ month: 'Jan', conversionRate: 0.1 }],
    reviewData: [{ month: 'Jan', averageRating: 4.5 }],
    comments: [{ author: 'John', text: 'Great product!' }],
    inventoryCount: 100,
  };

  beforeEach(() => {
    // Mock the createObjectURL function to prevent errors during the test
    global.URL.createObjectURL = vi.fn(() => 'mock-url');
  });

  afterEach(() => {
    // Restore all mocks after each test to avoid side effects
    vi.restoreAllMocks();
  });

  it('renders the generate report button', () => {
    // Render the GenerateReportButton component with mock report data
    render(<GenerateReportButton reportData={mockReportData} />);

    // Check that the "Generate Report" button is in the document
    expect(screen.getByText('Generate Report')).toBeInTheDocument();
  });

  it('generates CSV content from provided report data', () => {
    // Render the GenerateReportButton component with mock report data
    render(<GenerateReportButton reportData={mockReportData} />);

    // Simulate a click on the "Generate Report" button
    fireEvent.click(screen.getByText('Generate Report'));

    // Verify that the createObjectURL function was called
    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });

  it('triggers download of the CSV file on button click', () => {
    // Render the GenerateReportButton component with mock report data
    render(<GenerateReportButton reportData={mockReportData} />);

    // Simulate a click on the "Generate Report" button
    fireEvent.click(screen.getByText('Generate Report'));

    // Check that createObjectURL was called with a Blob as the argument
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
  });
});