import {configureStore, createSelector} from "@reduxjs/toolkit";
import {useDispatch, useSelector, useStore} from "react-redux";
import {initialUsersList, usersSlice} from "../modules/users/users.slice.ts";
import {countersReducer} from "../modules/counters/counets.slice.ts";

// вот что возвращает combineReducer , ниже показан типа самописный rootReducer
/*export const rootReducer = (state = initialState, action: Actions): InitialState => {
  return {
    users: usersReducer(state.users, action),
    counters: countersReducer(state.counters, action),
  }
}*/


// для самописных редьюсеров нужен combineReducer чтобы работать с configureStore


export const store = configureStore({
  reducer: {
    counters: countersReducer,
    [usersSlice.name]: usersSlice.reducer
  }
})

store.dispatch(usersSlice.actions.stored({users: initialUsersList}))

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppStore = useStore.withTypes<typeof store>()
export const createAppSelector = createSelector.withTypes<AppState>()

// @ts-ignore
window.store = store