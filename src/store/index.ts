import { combineReducers, configureStore } from "@reduxjs/toolkit"
import filterSlice from "./filterSlice"
import periodSlice from './periodSlice';
import periodsSlice from './periodCollectionSlice'
import userSlice from './userSlice';
import bidsSlice from './bidsSlice';
import bidSlice from './bidSlice';
import periodModerationSlice from './periodModerationSlice'
const rootReducer = combineReducers({
  filter: filterSlice,
  period: periodSlice,
  periodCollection: periodsSlice,
  user: userSlice,
  bidsCollection: bidsSlice,
  bid: bidSlice,
  periodModeration: periodModerationSlice,
})


export const store = () => configureStore({
  reducer: rootReducer,
})

export type TRootState = ReturnType<typeof rootReducer>
export type TAppStore = ReturnType<typeof store>
export type TAppDispatch = TAppStore['dispatch']