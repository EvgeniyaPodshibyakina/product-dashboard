import {
  ConversionData,
  ReviewData,
  SalesData,
  CommentData,
} from "../../../mockData/types";

export interface ProductDataDisplayProps {
  salesData: SalesData[];
  conversionData: ConversionData[];
  reviewData: ReviewData[];
  comments: CommentData[];
  inventoryCount: number;
}
