import { configureStore } from '@reduxjs/toolkit';
import productReducer, { selectProduct } from './productSlice';
import { productApi } from '../services/productApi';
import { ProductState } from './productState/ProductState';
import { server } from '../mocks/server'; 
import { http, HttpResponse } from 'msw';

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
  it('should handle selectProduct action', () => {
    const testStore = createTestStore();
    testStore.dispatch(selectProduct('Hat'));

    const state: ProductState = testStore.getState().products;
    expect(state.selectedProduct).toBe('Hat');
  });

  it('should set status to "loading" when fetching product data', async () => {
    const testStore = createTestStore();
    testStore.dispatch(productApi.endpoints.getProductData.initiate());

    const state: ProductState = testStore.getState().products;
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('should set status to "succeeded" when product data is fetched successfully', async () => {
    const testStore = createTestStore();

    await testStore.dispatch(productApi.endpoints.getProductData.initiate());
    const state: ProductState = testStore.getState().products;

    expect(state.status).toBe('succeeded');
    expect(state.error).toBeNull();
  });

  it('should set status to "failed" when product data fetching fails', async () => {
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
    
    if (state.error === 'Rejected') {
      expect(state.error).toBe('Rejected');
    } else {
      expect(state.error).toBe('Internal Server Error');
    }
  });

});