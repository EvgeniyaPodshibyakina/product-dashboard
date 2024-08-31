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
  
  export interface Comment {
    author: string;
    text: string;
  }