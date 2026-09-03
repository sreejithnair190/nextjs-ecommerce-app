import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/axios';
import { ProductVariant, Product } from '@prisma/client';

export type VariantWithProduct = ProductVariant & { product?: Product };

export interface VariantsState {
  list: VariantWithProduct[];
  total: number;
  page: number;
  perPage: number;
  search: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: VariantsState = {
  list: [],
  total: 0,
  page: 1,
  perPage: 10,
  search: '',
  isLoading: false,
  error: null,
};

export const fetchVariants = createAsyncThunk(
  'variants/fetchVariants',
  async (productId: string, { getState }) => {
    const state = getState() as any;
    const { page, perPage, search } = state.variants;
    
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('perPage', perPage.toString());
    if (search) {
      params.append('search', search);
    }

    const response = await api.get(`/products/${productId}/variants?${params.toString()}`);
    return response.data; // expects { data: VariantWithProduct[], total: number }
  }
);

export const variantsSlice = createSlice({
  name: 'variants',
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
    resetVariantsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVariants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVariants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchVariants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch variants';
      });
  },
});

export const { setPage, setSearch, setPerPage, resetVariantsState } = variantsSlice.actions;
export default variantsSlice.reducer;
