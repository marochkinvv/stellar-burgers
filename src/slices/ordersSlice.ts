import { getOrderByNumberApi, getOrdersApi } from '../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IOrdersState {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
  orderDetails: TOrder | null;
}

const initialState: IOrdersState = {
  orders: [],
  loading: false,
  error: null,
  orderDetails: null
};

export const getOrders = createAsyncThunk('orders/getAll', async () => {
  const response = await getOrdersApi();
  return response;
});

export const getOrderById = createAsyncThunk(
  'orders/getOrder',
  async (orderNum: number) => {
    const response = await getOrderByNumberApi(orderNum);
    return response;
  }
);

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
        state.error = null;
        state.orders = action.payload;
      });

    builder
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orderDetails = action.payload.orders[0];
      });
  },
  selectors: {
    ordersSelector: (state) => state.orders,
    loading: (state) => state.loading,
    error: (state) => state.error,
    orderByIdSelector: (state) => state.orderDetails
  }
});

export const { ordersSelector, error, loading, orderByIdSelector } =
  ordersSlice.selectors;
export const ordersReducer = ordersSlice.reducer;
