import {configureStore} from "@reduxjs/toolkit";
import {reducerCounter} from "../features/counters/model/reducerCounter.ts";

export const store = configureStore({
  reducer: reducerCounter
})

export type AppState = ReturnType<typeof store.getState>