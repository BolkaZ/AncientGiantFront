import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { TPeriodState} from './types.ts';
import { mockPeriodsDetail} from '../../api/mock.ts';

const initialState: {period: TPeriodState | null}  = {
  period: null,
}

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
  }

})

export default periodSlice.reducer;
export const {changePeriod, clearPeriod, getMockPeriod} = periodSlice.actions;