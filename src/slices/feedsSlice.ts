import { getFeedsApi } from '../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface FeedsState {
  orders: TOrder[];
  total: number | null;
  totalToday: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: FeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const getFeeds = createAsyncThunk('feeds/get', async () => {
  const response = await getFeedsApi();
  return response;
});

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.total = null;
        state.totalToday = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  },
  selectors: {
    feedsSelector: (state) => state.orders,
    isLoading: (state) => state.loading,
    totalFeedsSelector: (state) => state.total,
    totalTodayFeedsSelector: (state) => state.totalToday
  }
});

export const {
  feedsSelector,
  isLoading,
  totalFeedsSelector,
  totalTodayFeedsSelector
} = feedsSlice.selectors;
export const feedsReducer = feedsSlice.reducer;
