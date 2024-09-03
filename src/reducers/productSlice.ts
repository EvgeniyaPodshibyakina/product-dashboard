import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productApi } from '../services/productApi';
import { ProductState } from './productState/productState';

export const initialState: ProductState  = {
  selectedProduct: 'Sweater',
  status: 'idle',
  error:  null,
};


const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    selectProduct(state, action: PayloadAction<string>) {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(productApi.endpoints.getProductData.matchPending, (state) => {
        state.status = 'loading';
        state.error = null; 
      })
      .addMatcher(productApi.endpoints.getProductData.matchFulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addMatcher(productApi.endpoints.getProductData.matchRejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch product data';
      });
  },
});

export const { selectProduct } = productSlice.actions;

export default productSlice.reducer;