// store/bidSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api';
import { BidGetFullInfo, BidUpdateInput, BidFormInput } from '../../api/Api.ts';

// Типы для параметров запросов
export interface PeriodInBidCreateData {
  bid_id?: number;
}

export interface PeriodInBidUpdateData {
  bid_id: number;
  quantity_found: number;
}

export interface PeriodInBidDeleteData {
  bid_id: number;
}

// Асинхронный thunk для добавления периода в заявку
export const periodInBidCreate = createAsyncThunk<
  BidGetFullInfo,
  { periodId: string; data: PeriodInBidCreateData }
>('bids/periodInBidCreate', async ({ periodId, data }, { rejectWithValue }) => {
  try {
    const response = await api.bids.periodInBidCreate(periodId, data);
    if ('data' in response) {
      return response.data as BidGetFullInfo;
    }
    throw new Error('Failed to create period in bid');
  } catch (error) {
    console.error('Create period in bid failed:', error);
    return rejectWithValue(error.message || 'Failed to create period in bid');
  }
});

// Асинхронный thunk для обновления периода в заявке
export const periodInBidUpdate = createAsyncThunk<
  BidGetFullInfo,
  { periodId: string; data: PeriodInBidUpdateData }
>('bids/periodInBidUpdate', async ({ periodId, data }, { rejectWithValue }) => {
  try {
    const response = await api.bids.periodInBidUpdate(periodId, data);
    if ('data' in response) {
      return response.data as BidGetFullInfo;
    }
    throw new Error('Failed to update period in bid');
  } catch (error) {
    console.error('Update period in bid failed:', error);
    return rejectWithValue(error.message || 'Failed to update period in bid');
  }
});

// Асинхронный thunk для удаления периода из заявки
export const periodInBidDelete = createAsyncThunk<
  void,
  { periodId: string; data: PeriodInBidDeleteData }
>('bids/periodInBidDelete', async ({ periodId, data }, { rejectWithValue }) => {
  try {
    await api.bids.periodInBidDelete(periodId, data);
  } catch (error) {
    console.error('Delete period in bid failed:', error);
    return rejectWithValue(error.message || 'Failed to delete period in bid');
  }
});

// Асинхронный thunk для получения детальной информации о заявке
export const bidGet = createAsyncThunk<
  BidGetFullInfo,
  string
>('bids/bidGet', async (bidId, { rejectWithValue }) => {
  try {
    const response = await api.bids.bidGet(bidId);
    if ('data' in response) {
      return response.data as BidGetFullInfo;
    }
    throw new Error('Failed to get bid details');
  } catch (error) {
    console.error('Get bid details failed:', error);
    return rejectWithValue(error.message || 'Failed to get bid details');
  }
});

// Асинхронный thunk для обновления заявки
export const bidUpdate = createAsyncThunk<
  BidGetFullInfo,
  { bidId: string; data: BidUpdateInput }
>('bids/bidUpdate', async ({ bidId, data }, { rejectWithValue }) => {
  try {
    const response = await api.bids.bidUpdate(bidId, data);
    if ('data' in response) {
      return response.data as BidGetFullInfo;
    }
    throw new Error('Failed to update bid');
  } catch (error) {
    console.error('Update bid failed:', error);
    return rejectWithValue(error.message || 'Failed to update bid');
  }
});

// Асинхронный thunk для удаления заявки
export const bidDelete = createAsyncThunk<
  void,
  string
>('bids/bidDelete', async (bidId, { rejectWithValue }) => {
  try {
    await api.bids.bidDelete(bidId);
  } catch (error) {
    console.error('Delete bid failed:', error);
    return rejectWithValue(error.message || 'Failed to delete bid');
  }
});

// Асинхронный thunk для формирования заявки
export const bidForm = createAsyncThunk<
  BidGetFullInfo,
  { bidId: string; data: BidFormInput }
>('bids/bidForm', async ({ bidId, data }, { rejectWithValue }) => {
  try {
    const response = await api.bids.bidForm(bidId, data);
    if ('data' in response) {
      return response.data as BidGetFullInfo;
    }
    throw new Error('Failed to form bid');
  } catch (error) {
    console.error('Form bid failed:', error);
    return rejectWithValue(error.message || 'Failed to form bid');
  }
});

// Интерфейс для состояния заявок
interface BidState {
  bid: BidGetFullInfo | null;
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: BidState = {
  bid: null,
  loading: false,
  error: null,
};

// Создание слайса
const bidSlice = createSlice({
  name: 'bids',
  initialState,
  reducers: {
    clearBid (state) {
      state.bid= null;
    },
  },
  extraReducers: (builder) => {
    builder
      // PeriodInBidCreate
      .addCase(periodInBidCreate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(periodInBidCreate.fulfilled, (state, action: PayloadAction<BidGetFullInfo>) => {
        state.bid = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(periodInBidCreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // PeriodInBidUpdate
      .addCase(periodInBidUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(periodInBidUpdate.fulfilled, (state, action: PayloadAction<BidGetFullInfo>) => {
        state.bid = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(periodInBidUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // PeriodInBidDelete
      .addCase(periodInBidDelete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(periodInBidDelete.fulfilled, (state) => {
        state.bid = null; // Предполагаем, что период был удален из текущей заявки
        state.loading = false;
        state.error = null;
      })
      .addCase(periodInBidDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // BidGet
      .addCase(bidGet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bidGet.fulfilled, (state, action: PayloadAction<BidGetFullInfo>) => {
        state.bid = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(bidGet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // BidUpdate
      .addCase(bidUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bidUpdate.fulfilled, (state, action: PayloadAction<BidGetFullInfo>) => {
        state.bid = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(bidUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // BidDelete
      .addCase(bidDelete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bidDelete.fulfilled, (state) => {
        state.bid = null; // Предполагаем, что заявка была удалена
        state.loading = false;
        state.error = null;
      })
      .addCase(bidDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // BidForm
      .addCase(bidForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bidForm.fulfilled, (state, action: PayloadAction<BidGetFullInfo>) => {
        state.bid = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(bidForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bidSlice.reducer;