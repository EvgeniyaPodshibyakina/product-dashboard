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
    global.URL.createObjectURL = vi.fn(() => 'mock-url');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the generate report button', () => {

    render(<GenerateReportButton reportData={mockReportData} />);

    expect(screen.getByText('Generate Report')).toBeInTheDocument();
  });

  it('generates CSV content from provided report data', () => {

    render(<GenerateReportButton reportData={mockReportData} />);

    fireEvent.click(screen.getByText('Generate Report'));

    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });

  it('triggers download of the CSV file on button click', () => {
    
    render(<GenerateReportButton reportData={mockReportData} />);

    fireEvent.click(screen.getByText('Generate Report'));

    expect(global.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
  });
});