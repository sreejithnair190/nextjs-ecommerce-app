import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/axios';
import { Product, Category } from '@prisma/client';

export type ProductWithCategory = Product & { category: Category };

export interface AdminProductsState {
  list: ProductWithCategory[];
  total: number;
  page: number;
  perPage: number;
  search: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: AdminProductsState = {
  list: [],
  total: 0,
  page: 1,
  perPage: 10,
  search: '',
  isLoading: false,
  error: null,
};

export const fetchAdminProducts = createAsyncThunk(
  'adminProducts/fetchAdminProducts',
  async (_, { getState }) => {
    const state = getState() as any;
    const { page, perPage, search } = state.adminProducts;
    
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('perPage', perPage.toString());
    if (search) {
      params.append('search', search);
    }

    const response = await api.get(`/products?${params.toString()}`);
    return response.data; // expects { data: ProductWithCategory[], total: number }
  }
);

export const adminProductsSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1; 
    },
    setPerPage: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setPage, setSearch, setPerPage } = adminProductsSlice.actions;
export default adminProductsSlice.reducer;
