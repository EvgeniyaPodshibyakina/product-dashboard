import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductData } from './types/ProductData';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }), 
  endpoints: (builder) => ({
    getProductData: builder.query<Record<string, ProductData>, void>({
      query: () => `db.json`, 
      transformResponse: (response: { products: Record<string, ProductData> }) => {
        return response.products;
      },
    }),
  }),
});

export const { useGetProductDataQuery } = productApi;