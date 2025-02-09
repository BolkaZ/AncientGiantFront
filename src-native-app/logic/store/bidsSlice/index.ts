// store/bidSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api';
import { BidGetFullInfo, BidList, BidModerationInput } from '../../api/Api.ts';

// Тип для параметров запроса
export interface BidListQuery {
  status?: string;
  date_start?: string;
  date_end?: string;
}

// Асинхронный thunk для получения списка заявок
export const fetchBidList = createAsyncThunk<BidList[], BidListQuery>(
  'bids/fetchBidList',
  async (query: BidListQuery, { rejectWithValue }) => {
    try {
      const response = await api.bids.bidList(query);
      if ('data' in response) {
        return response.data as BidList[];
      }
      throw new Error('Failed to fetch bid list');
    } catch (error) {
      console.error('Fetch bid list failed:', error);
      return rejectWithValue(error.message || 'Failed to fetch bid list');
    }
  }
);

// Асинхронный thunk для принятия заявки
export const approveBid = createAsyncThunk<BidGetFullInfo, string>(
  'bids/approveBid',
  async (bidId, { rejectWithValue }) => {
    try {
      const moderationData: BidModerationInput = {
        status: 'FINISHED',
      };
      const response = await api.bids.bidModeration(bidId, moderationData);
      if ('data' in response) {
        return response.data as BidGetFullInfo;
      }
      throw new Error('Failed to approve bid');
    } catch (error) {
      console.error('Approve bid failed:', error);
      return rejectWithValue(error.message || 'Failed to approve bid');
    }
  }
);

// Асинхронный thunk для отклонения заявки
export const rejectBid = createAsyncThunk<BidGetFullInfo, string>(
  'bids/rejectBid',
  async (bidId, { rejectWithValue }) => {
    try {
      const moderationData: BidModerationInput = {
        status: 'REJECTED',
      };
      const response = await api.bids.bidModeration(bidId, moderationData);
      if ('data' in response) {
        return response.data as BidGetFullInfo;
      }
      throw new Error('Failed to reject bid');
    } catch (error) {
      console.error('Reject bid failed:', error);
      return rejectWithValue(error.message || 'Failed to reject bid');
    }
  }
);

// Интерфейс для состояния заявок
interface BidState {
  bids: BidList[];
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: BidState = {
  bids: [],
  loading: false,
  error: null,
};

// Создание слайса
const bidSlice = createSlice({
  name: 'bids',
  initialState,
  reducers: {
    // Можно добавить дополнительные редьюсеры, если потребуется
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBidList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBidList.fulfilled, (state, action: PayloadAction<BidList[]>) => {
        state.bids = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchBidList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Approve Bid
      .addCase(approveBid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveBid.fulfilled, (state, action: PayloadAction<BidGetFullInfo>) => {
        state.bid = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(approveBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Reject Bid
      .addCase(rejectBid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectBid.fulfilled, (state, action: PayloadAction<BidGetFullInfo>) => {
        state.bid = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(rejectBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bidSlice.reducer;