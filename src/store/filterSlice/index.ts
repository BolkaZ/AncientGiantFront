import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TFilterState} from './types.ts';


const params = new URLSearchParams(window.location.search);


const initialState: TFilterState = {
  name: params.get('name') ?? '',
  // @ts-ignore
  // eslint-disable-next-line no-constant-binary-expression
  startDate:  +params.get('startDate') ?? 0,
  // @ts-ignore
  // eslint-disable-next-line no-constant-binary-expression
  endDate: +params.get('endDate') ?? 0,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeName (state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    changeStartDate (state, action: PayloadAction<string| number>) {
      state.startDate = +action.payload;
    },
    changeEndDate (state, action: PayloadAction<string | number>) {
      state.endDate = +action.payload;
    },
    resetFilterState(state) {
      state.name = '';
      state.startDate = 0;
      state.endDate = 0;
    }

  }

})

export default filterSlice.reducer;
export const {changeName, changeStartDate, changeEndDate} = filterSlice.actions;