import { combineReducers, configureStore } from "@reduxjs/toolkit"
import filterSlice from "./filterSlice"
import periodSlice from './periodSlice';


const rootReducer = combineReducers({
  filter: filterSlice,
  period: periodSlice
})


export const store = () => configureStore({
  reducer: rootReducer,
})

export type TRootState = ReturnType<typeof rootReducer>
export type TAppStore = ReturnType<typeof store>
export type TAppDispatch = TAppStore['dispatch']