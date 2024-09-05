import { renderHook } from '@testing-library/react';
import { useReportData } from './useReportData'; 
import { SalesData, ConversionData, ReviewData, CommentData } from '../../../types';

// Mock data for testing
const mockSalesData: SalesData[] = [
  { month: 'Jan', sales: 100 },
  { month: 'Feb', sales: 200 },
];

const mockConversionData: ConversionData[] = [
  { month: 'Jan', conversionRate: 0.1 },
  { month: 'Feb', conversionRate: 0.2 },
];

const mockReviewData: ReviewData[] = [
  { month: 'Jan', averageRating: 4.5 },
  { month: 'Feb', averageRating: 4.6 },
];

const mockComments: CommentData[] = [
  { author: 'John', text: 'Great product!' },
  { author: 'Doe', text: 'Excellent!' },
];

const mockInventoryCount = 150;

// Initial parameters for useReportData
const initialParams = {
  salesData: [{ month: 'Jan', sales: 100 }],
  conversionData: [{ month: 'Jan', conversionRate: 0.1 }],
  reviewData: [{ month: 'Jan', averageRating: 4.5 }],
  comments: [{ author: 'John', text: 'Great product!' }],
  inventoryCount: 150,
};

describe('useReportData', () => {
  //  check if useReportData returns the correct report data
  it('should return report data correctly', () => {
    const { result } = renderHook(() =>
      useReportData({
        salesData: mockSalesData,
        conversionData: mockConversionData,
        reviewData: mockReviewData,
        comments: mockComments,
        inventoryCount: mockInventoryCount,
      })
    );

    expect(result.current.salesData).toEqual(mockSalesData);
    expect(result.current.conversionData).toEqual(mockConversionData);
    expect(result.current.reviewData).toEqual(mockReviewData);
    expect(result.current.comments).toEqual(mockComments);
    expect(result.current.inventoryCount).toEqual(mockInventoryCount);
  });

  //  handle empty data input correctly
  it('should handle empty data correctly', () => {
    const { result } = renderHook(() =>
      useReportData({
        salesData: [],
        conversionData: [],
        reviewData: [],
        comments: [],
        inventoryCount: 0,
      })
    );

    expect(result.current.salesData).toEqual([]);
    expect(result.current.conversionData).toEqual([]);
    expect(result.current.reviewData).toEqual([]);
    expect(result.current.comments).toEqual([]);
    expect(result.current.inventoryCount).toBe(0);
  });

  //   verify if report data updates when input data changes
  it('should update report data when input data changes', () => {
    const { result, rerender } = renderHook(({ salesData }) => 
      useReportData({ ...initialParams, salesData }), 
      {
        initialProps: { salesData: [{ month: 'Jan', sales: 100 }] }
      }
    );

    // Initial data check
    expect(result.current.salesData).toEqual([{ month: 'Jan', sales: 100 }]);

    // Rerender with updated data and check if it reflects correctly
    rerender({ salesData: [{ month: 'Feb', sales: 200 }] });
    expect(result.current.salesData).toEqual([{ month: 'Feb', sales: 200 }]);
  });
});