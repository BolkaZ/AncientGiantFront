import { createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { TPeriodState} from './types.ts';
import { mockPeriodsDetail} from '../../api/mock.ts';
import { api } from '../../api/index.ts';

const initialState: {period: TPeriodState | null}  = {
  period: null,
}

export const fetchPeriod = createAsyncThunk(
  '/periods/get/',
  async (periodId: number) => {
    const response = await api.periods.periodGet(periodId.toString())
    if( 'data' in response) {
      return response.data
    }
  }
)


const periodSlice = createSlice({
  name: 'period',
  initialState,
  reducers: {
    changePeriod (state, action: PayloadAction<TPeriodState>) {
      state.period = action.payload;
    },
    clearPeriod (state) {
      state.period = null;
    },
    getMockPeriod(state,action:PayloadAction<number>) {
      state.period = mockPeriodsDetail.find(period => period.id === action.payload) ?? null;
    }
  },
   extraReducers: (builder) => {
      builder
        .addCase(fetchPeriod.pending, (state) => {
        })
        .addCase(fetchPeriod.fulfilled, (state, action) => {
          if(action.payload) {
            state.period = action.payload;
          }
        })
        .addCase(fetchPeriod.rejected, (state,action) => {
          console.log(action.error.code);
      
        });
    },
})

export default periodSlice.reducer;
export const {changePeriod, clearPeriod, getMockPeriod} = periodSlice.actions;