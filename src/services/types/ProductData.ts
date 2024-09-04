export interface ProductData {
    salesData: { month: string, sales: number }[];
    conversionData: { month: string, conversionRate: number }[];
    reviewData: { month: string, averageRating: number }[];
    comments: { author: string, text: string }[];
    inventory: number;
  }
  
