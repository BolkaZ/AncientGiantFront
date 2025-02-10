import { createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {mockPeriods} from '../../api/mock.ts';
import { api } from '../../api';
import { RequestParams } from '../../api/Api.ts';
import { TBidInfo, TPeriod, TPeriodGet } from '../../api/types.ts';

const initialState: {periods: TPeriod[], loading: boolean, error: string | null, bidInfo: TBidInfo}  = {
  periods: [],
  loading: false,
  error: null,
  bidInfo: {} as TBidInfo
}

export const fetchPeriodCollection = createAsyncThunk(
  '/periods/get/',
  async (query?: { search?: string; }, params?: RequestParams) => {
    const response = await api.periods.periodList(query, params);
    if( 'data' in response) {
      return response.data as TPeriodGet
    }
  }
)

const periodsSlice = createSlice({
  name: 'periods',
  initialState,
  reducers: {
    changePeriod (state, action: PayloadAction<TPeriod[]>) {
      state.periods = action.payload;
    },
    clearPeriod (state) {
      state.periods = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeriodCollection.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPeriodCollection.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        if(action.payload?.periods) {
          state.periods = action.payload?.periods;
          state.bidInfo = action.payload.bid_info
        }
      })
      .addCase(fetchPeriodCollection.rejected, (state,action) => {
        console.log(action.error.code);
        
        state.loading = false;
        state.periods = mockPeriods;
        state.error = action.error.name || 'Ошибка призагрузке данных';
      });
  },

})

export default periodsSlice.reducer;
export const {changePeriod, clearPeriod } = periodsSlice.actions;