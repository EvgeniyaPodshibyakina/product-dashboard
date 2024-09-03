export interface ProductState {
    selectedProduct: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }