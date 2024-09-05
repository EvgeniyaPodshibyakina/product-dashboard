import { productApi } from '../services/productApi'; 
import { server } from '../mocks/server'; 
import { http, HttpResponse } from 'msw'; //MSW 2.0
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { store } from '../store/store'; // Import your store

// Example data from db.json
const db = {
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
    }
  }
};

// Setup and teardown for the mock server
beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn', // Will show a warning if the request is not intercepted by MSW
  });
});

beforeEach(() => {
  server.resetHandlers(); // Reset all handlers before each test
  store.dispatch(productApi.util.resetApiState()); // Reset the API state between tests
});

afterAll(() => server.close());

// Test suite
describe('productApi', () => {
  // Test for successful request
  it('successfully fetches product data', async () => {
    // Mock a successful response from MSW
    server.use(
      http.get('http://localhost:5173/db.json', () => {
        return HttpResponse.json({ products: db.products });
      })
    );

    // Make the request via productApi
    const result = await store.dispatch(productApi.endpoints.getProductData.initiate());

    expect(result.isSuccess).toBe(true);
    expect(result.data).toEqual(db.products);
  });

  it('handles network error', async () => {
    // Simulate a network error using MSW
    server.use(
      http.get('http://localhost:5173/db.json', () => {
        return HttpResponse.error(); // Return network error
      })
    );
  
    // Make the request via productApi
    const result = await store.dispatch(productApi.endpoints.getProductData.initiate());
  
    expect(result.isError).toBe(true);
    expect(result.error).toHaveProperty('status', 'FETCH_ERROR');
  });
  
  it('handles server error', async () => {
    // Simulate a 500 server error using MSW
    server.use(
      http.get('http://localhost:5173/db.json', () => {
        return HttpResponse.json('Internal Server Error', {
          status: 500,
          statusText: 'Internal Server Error',
        });
      })
    );
  
    // Make the request via productApi
    const result = await store.dispatch(productApi.endpoints.getProductData.initiate());
  
    // Ensure the request finishes with an error
    expect(result.isError).toBe(true);
    expect(result.error).toHaveProperty('status', 500);
    expect(result.error).toHaveProperty('data', 'Internal Server Error');
  });
});