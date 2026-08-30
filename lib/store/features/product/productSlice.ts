import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Placeholder for a Product type, can be expanded later
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}

export interface ProductState {
  products: Product[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  searchTerm: '',
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSearchTerm, setProducts, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;
