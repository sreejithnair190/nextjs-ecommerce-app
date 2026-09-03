import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/axios';
import { Category } from '@prisma/client';

export interface CategoriesState {
  list: Category[];
  total: number;
  page: number;
  perPage: number;
  search: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  list: [],
  total: 0,
  page: 1,
  perPage: 10,
  search: '',
  isLoading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { getState }) => {
    const state = getState() as any;
    const { page, perPage, search } = state.categories;
    
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('perPage', perPage.toString());
    if (search) {
      params.append('search', search);
    }

    const response = await api.get(`/categories?${params.toString()}`);
    return response.data; // expects { data: Category[], total: number }
  }
);

export const categoriesSlice = createSlice({
  name: 'categories',
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
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

export const { setPage, setSearch, setPerPage } = categoriesSlice.actions;
export default categoriesSlice.reducer;
