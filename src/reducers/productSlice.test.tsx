import { configureStore } from '@reduxjs/toolkit';
import productReducer, { selectProduct } from './productSlice';
import { productApi } from '../services/productApi';
import { ProductState } from './productState/ProductState';
import { server } from '../mocks/server'; // Используем уже настроенный сервер
import { http, HttpResponse } from 'msw';

// Mock store for testing
const createTestStore = () =>
  configureStore({
    reducer: {
      products: productReducer,
      [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware),
  });

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('productSlice', () => {
  // Test case for the selectProduct action
  it('should handle selectProduct action', () => {
    const testStore = createTestStore();
    testStore.dispatch(selectProduct('Hat'));

    const state: ProductState = testStore.getState().products;
    expect(state.selectedProduct).toBe('Hat');
  });

  // Test case for pending state on API request
  it('should set status to "loading" when fetching product data', async () => {
    const testStore = createTestStore();
    testStore.dispatch(productApi.endpoints.getProductData.initiate());

    const state: ProductState = testStore.getState().products;
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  // Test case for successful data fetching
  it('should set status to "succeeded" when product data is fetched successfully', async () => {
    const testStore = createTestStore();

    await testStore.dispatch(productApi.endpoints.getProductData.initiate());
    const state: ProductState = testStore.getState().products;

    expect(state.status).toBe('succeeded');
    expect(state.error).toBeNull();
  });

  // Test case for failed product data fetching
  it('should set status to "failed" when product data fetching fails', async () => {
    // Simulate server error with a custom error message
    server.use(
      http.get('http://localhost:5173/db.json', () => {
        return HttpResponse.json('Internal Server Error', {
          status: 500,
          statusText: 'Internal Server Error',
        });
      })
    );
  
    const testStore = createTestStore();
  
    await testStore.dispatch(productApi.endpoints.getProductData.initiate());
    const state: ProductState = testStore.getState().products;
  
    expect(state.status).toBe('failed');
    
    // Check if error message is either 'Internal Server Error' or 'Rejected'
    if (state.error === 'Rejected') {
      expect(state.error).toBe('Rejected');
    } else {
      expect(state.error).toBe('Internal Server Error');
    }
  });

});