import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductData } from './types/ProductData';

// Setting up the API slice
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    // Query to fetch product data
    getProductData: builder.query<Record<string, ProductData>, void>({
      query: () => `db.json`,
      transformResponse: (response: { products: Record<string, ProductData> }) => {
        return response.products;
      },
    }),
  }),
});

// Export hooks for querying and mutations
export const { 
  useGetProductDataQuery, 
} = productApi;