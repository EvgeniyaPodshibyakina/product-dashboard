import { useMemo } from 'react';
import { UseReportDataParams } from './types/UseReportDataParams';


export const useReportData = ({
    salesData,
    conversionData,
    reviewData,
    comments,
    inventoryCount,
  }: UseReportDataParams) => {
    const reportData = useMemo(() => {
      return {
        salesData,
        conversionData,
        reviewData,
        comments,
        inventoryCount,
      };
    }, [salesData, conversionData, reviewData, comments, inventoryCount]);
  
    return reportData;
  };