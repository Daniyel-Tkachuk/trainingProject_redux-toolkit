import {combineReducers, configureStore, createSelector} from "@reduxjs/toolkit";
import {useDispatch, useSelector, useStore} from "react-redux";
import {initialUsersList, usersReducer, type UsersStoredAction} from "../modules/users/users.slice.ts";
import {countersReducer} from "../modules/counters/counets.slice.ts";

// вот что возвращает combineReducer , ниже показан типа самописный rootReducer
/*export const rootReducer = (state = initialState, action: Actions): InitialState => {
  return {
    users: usersReducer(state.users, action),
    counters: countersReducer(state.counters, action),
  }
}*/


// для самописных редьюсеров нужен combineReducer чтобы работать с configureStore

const rootReducer = combineReducers({
  users: usersReducer,
  counters: countersReducer,
})

export const store = configureStore({
  reducer: rootReducer
})

store.dispatch({
  type: "usersStored",
  payload: {users: initialUsersList}
} satisfies UsersStoredAction)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppStore = useStore.withTypes<typeof store>()

export const createAppSelector = createSelector.withTypes<AppState>()
// @ts-ignore
window.store = store