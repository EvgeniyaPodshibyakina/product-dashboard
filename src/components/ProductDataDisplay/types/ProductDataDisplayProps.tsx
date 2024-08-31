import { ConversionData, ReviewData, SalesData, Comment } from "../../../mockData/types";

export interface ProductDataDisplayProps {
  salesData: SalesData[];
  conversionData: ConversionData[];
  reviewData: ReviewData[];
  comments: Comment[];
  inventoryCount: number; 
}