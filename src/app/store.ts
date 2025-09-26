import {configureStore} from "@reduxjs/toolkit";
import {type CounterId, reducerCounter} from "../features/counters/model/reducerCounter.ts";
import {useDispatch, useSelector, useStore} from "react-redux";

export const store = configureStore({
  reducer: reducerCounter
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppStore = useStore.withTypes<typeof store>()

export const selectCounter = (state: AppState, counterId: CounterId) => state.counters[counterId];