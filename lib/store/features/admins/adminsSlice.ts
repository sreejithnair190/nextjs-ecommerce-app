import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/axios';
import { User } from '@prisma/client';

export interface AdminsState {
  list: User[];
  total: number;
  page: number;
  perPage: number;
  search: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: AdminsState = {
  list: [],
  total: 0,
  page: 1,
  perPage: 10,
  search: '',
  isLoading: false,
  error: null,
};

export const fetchAdmins = createAsyncThunk(
  'admins/fetchAdmins',
  async (_, { getState }) => {
    const state = getState() as any;
    const { page, perPage, search } = state.admins;
    
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('perPage', perPage.toString());
    if (search) {
      params.append('search', search);
    }

    const response = await api.get(`/admins?${params.toString()}`);
    return response.data; // expects { data: User[], total: number }
  }
);

export const adminsSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1; // reset to first page on new search
    },
    setPerPage: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch admins';
      });
  },
});

export const { setPage, setSearch, setPerPage } = adminsSlice.actions;
export default adminsSlice.reducer;
