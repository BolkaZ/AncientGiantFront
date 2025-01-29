// store/bidSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api';
import { BidList } from '../../api/Api.ts';

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
      });
  },
});

export default bidSlice.reducer;