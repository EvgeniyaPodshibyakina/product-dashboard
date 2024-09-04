export interface SalesData {
    month: string;
    sales: number;
  }
  
  export interface ConversionData {
    month: string;
    conversionRate: number;
  }
  
  export interface ReviewData {
    month: string;
    averageRating: number;
  }
  
  export interface CommentData {
    author: string;
    text: string;
  }
  
  export type ChartData = SalesData | ConversionData | ReviewData;