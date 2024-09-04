import {
  ConversionData,
  ReviewData,
  SalesData,
  CommentData,
} from "../../../types/DataTypes";

export interface ProductDataDisplayProps {
  salesData: SalesData[];
  conversionData: ConversionData[];
  reviewData: ReviewData[];
  comments: CommentData[];
  inventoryCount: number;
}
