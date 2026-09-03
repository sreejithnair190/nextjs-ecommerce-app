import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/axios';
import { Address, User } from '@prisma/client';

export type AddressWithUser = Address & { user?: User };

export interface AddressesState {
  list: AddressWithUser[];
  total: number;
  page: number;
  perPage: number;
  search: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: AddressesState = {
  list: [],
  total: 0,
  page: 1,
  perPage: 10,
  search: '',
  isLoading: false,
  error: null,
};

export const fetchAddresses = createAsyncThunk(
  'addresses/fetchAddresses',
  async (userId: string, { getState }) => {
    const state = getState() as any;
    const { page, perPage, search } = state.addresses;
    
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('perPage', perPage.toString());
    if (search) {
      params.append('search', search);
    }

    const response = await api.get(`/users/${userId}/addresses?${params.toString()}`);
    return response.data; // expects { data: AddressWithUser[], total: number }
  }
);

export const addressesSlice = createSlice({
  name: 'addresses',
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
    resetAddressesState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch addresses';
      });
  },
});

export const { setPage, setSearch, setPerPage, resetAddressesState } = addressesSlice.actions;
export default addressesSlice.reducer;
