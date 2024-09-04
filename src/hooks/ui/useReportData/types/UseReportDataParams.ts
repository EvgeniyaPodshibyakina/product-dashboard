import { SalesData, ConversionData, ReviewData, CommentData   } from "../../../../types/DataTypes";

export interface UseReportDataParams {
    salesData: SalesData[];
    conversionData: ConversionData[];
    reviewData: ReviewData[];
    comments: CommentData[];
    inventoryCount: number;
  }