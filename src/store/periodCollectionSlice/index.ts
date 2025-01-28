import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { TPeriodShort} from './types.ts';
import {mockPeriods, mockPeriodsDetail} from '../../api/mock.ts';

const initialState: {periods: TPeriodShort[]}  = {
  periods: [],
}

const periodsSlice = createSlice({
  name: 'periods',
  initialState,
  reducers: {
    changePeriod (state, action: PayloadAction<TPeriodShort>) {
      state.periods = action.payload;
    },
    clearPeriod (state) {
      state.periods = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPeriods.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPeriods.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload.cities;
      })
      .addCase(getPeriods.rejected, (state) => {
        state.loading = false;
        state.cities = mockPeriods.cities.filter((item) =>
          item.name.toLocaleLowerCase().startsWith(state.searchValue.toLocaleLowerCase())
        );
      });
  },

})

export default periodsSlice.reducer;
export const {changePeriod, clearPeriod } = periodsSlice.actions;