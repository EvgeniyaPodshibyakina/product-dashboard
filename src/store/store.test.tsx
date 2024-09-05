import { describe, it, expect, vi } from 'vitest';
import { configureStore, Middleware } from '@reduxjs/toolkit';
import { productApi } from '../services/productApi';
import productReducer from '../reducers/productSlice';

// Mock data для теста
const mockProductData = {
  "products": {
      "dress": {
        "salesData": [
          { "month": "Sep", "sales": 2800 },
          { "month": "Oct", "sales": 2700 },
          { "month": "Nov", "sales": 3000 },
          { "month": "Dec", "sales": 2300 },
          { "month": "Jan", "sales": 3700 },
          { "month": "Feb", "sales": 3200 },
          { "month": "Mar", "sales": 2500 },
          { "month": "Apr", "sales": 2900 },
          { "month": "May", "sales": 2200 },
          { "month": "Jun", "sales": 2600 },
          { "month": "Jul", "sales": 3400 },
          { "month": "Aug", "sales": 3900 }
        ],
        "conversionData": [
          { "month": "Sep", "conversionRate": 0.27 },
          { "month": "Oct", "conversionRate": 0.26 },
          { "month": "Nov", "conversionRate": 0.3 },
          { "month": "Dec", "conversionRate": 0.23 },
          { "month": "Jan", "conversionRate": 0.37 },
          { "month": "Feb", "conversionRate": 0.32 },
          { "month": "Mar", "conversionRate": 0.25 },
          { "month": "Apr", "conversionRate": 0.29 },
          { "month": "May", "conversionRate": 0.22 },
          { "month": "Jun", "conversionRate": 0.26 },
          { "month": "Jul", "conversionRate": 0.34 },
          { "month": "Aug", "conversionRate": 0.39 }
        ],
        "reviewData": [
          { "month": "Sep", "averageRating": 4.1 },
          { "month": "Oct", "averageRating": 4.2 },
          { "month": "Nov", "averageRating": 4.0 },
          { "month": "Dec", "averageRating": 4.3 },
          { "month": "Jan", "averageRating": 4.6 },
          { "month": "Feb", "averageRating": 4.4 },
          { "month": "Mar", "averageRating": 4.2 },
          { "month": "Apr", "averageRating": 4.3 },
          { "month": "May", "averageRating": 4.2 },
          { "month": "Jun", "averageRating": 4.4 },
          { "month": "Jul", "averageRating": 4.5 },
          { "month": "Aug", "averageRating": 4.7 }
        ],
        "comments": [
          { "author": "Ella", "text": "Beautiful dress!" },
          { "author": "Grace", "text": "Perfect for special occasions." },
          { "author": "Amelia", "text": "Fits like a glove." },
          { "author": "Henry", "text": "Elegant and classy." },
          { "author": "Victoria", "text": "Love the fabric and design." }
        ],
        "inventory": 150
      }}
};

// Mocking productApi for testing
vi.mock('./path/to/productApi', () => ({
    productApi: {
      reducerPath: 'productApi',
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
      reducer: vi.fn((state = {}, _action) => state), // Mock reducer with proper typing
      middleware: vi.fn<Middleware>(() => (next) => (action) => next(action)), // Mock middleware with proper typing
      endpoints: {
        getProductData: {
          useQuery: vi.fn(() => ({
            data: mockProductData,
            isLoading: false,
          })),
        },
      },
    },
  }));
  

describe('Store', () => {
    it('should configure the store correctly', () => {
      const store = configureStore({
        reducer: {
          products: productReducer,
          [productApi.reducerPath]: productApi.reducer, // Use the reducer directly
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware().concat(productApi.middleware),
      });
  
      // Check store initialization
      const state = store.getState();
      expect(state.products).toBeDefined();
      expect(state.productApi).toBeDefined();
    });
  });