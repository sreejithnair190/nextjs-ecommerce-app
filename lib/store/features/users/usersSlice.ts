import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/axios';
import { User } from '@prisma/client';

export interface UsersState {
  list: User[];
  total: number;
  page: number;
  perPage: number;
  search: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  list: [],
  total: 0,
  page: 1,
  perPage: 10,
  search: '',
  isLoading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { getState }) => {
    const state = getState() as any;
    const { page, perPage, search } = state.users;
    
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('perPage', perPage.toString());
    if (search) {
      params.append('search', search);
    }

    const response = await api.get(`/users?${params.toString()}`);
    return response.data; // expects { data: User[], total: number }
  }
);

export const usersSlice = createSlice({
  name: 'users',
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
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { setPage, setSearch, setPerPage } = usersSlice.actions;
export default usersSlice.reducer;
