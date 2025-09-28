import {configureStore, createSelector} from "@reduxjs/toolkit";
import {
  type CounterId,
  reducerCounter,
  type User,
  type UsersStoredAction
} from "../features/counters/model/reducerCounter.ts";
import {useDispatch, useSelector, useStore} from "react-redux";

export const users: User[] = Array.from({length: 3000}, (_, index) => ({
  id: `user${index + 11}`,
  name: `User ${index + 11}`,
  description: `Description for User ${index + 11}`
}))

export const store = configureStore({
  reducer: reducerCounter
})

store.dispatch({type: "usersStored", payload: {users}} satisfies UsersStoredAction)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppStore = useStore.withTypes<typeof store>()

export const selectCounter = (state: AppState, counterId: CounterId) => state.counters[counterId];
export const createAppSelector = createSelector.withTypes<AppState>()