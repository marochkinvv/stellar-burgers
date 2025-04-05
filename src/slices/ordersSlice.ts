import { getOrdersApi } from '../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IOrdersState {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: IOrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const getOrders = createAsyncThunk('orders/get', async () => {
  const response = await getOrdersApi();
  return response;
});

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      });
  },
  selectors: {
    ordersSelector: (state) => state.orders,
    loading: (state) => state.loading,
    error: (state) => state.error
  }
});

export const { ordersSelector, error, loading } = ordersSlice.selectors;
export const ordersReducer = ordersSlice.reducer;
