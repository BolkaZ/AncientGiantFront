import { createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {mockPeriods, mockPeriodsDetail} from '../../api/mock.ts';
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
        if(action.payload?.periods) {
          state.periods = action.payload?.periods;
        }
      })
      .addCase(fetchPeriodCollection.rejected, (state,action) => {
        state.loading = false;
        state.periods = mockPeriods;
        state.error = action.error.message || 'Ошибка призагрузке данных';
      });
  },

})

export default periodsSlice.reducer;
export const {changePeriod, clearPeriod } = periodsSlice.actions;