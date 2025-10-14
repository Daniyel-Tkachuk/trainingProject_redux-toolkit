import {configureStore, createSelector, type ThunkAction, type UnknownAction} from "@reduxjs/toolkit";
import {useDispatch, useSelector, useStore} from "react-redux";
import {usersSlice} from "../modules/users/users.slice.ts";
import {countersReducer} from "../modules/counters/counets.slice.ts";
import {extraArgument} from "../extra-arguments.ts";

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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({thunk: {extraArgument}})
})

// store.dispatch(usersSlice.actions.fetchUsersSuccess({users: initialUsersList}))

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// типизация для thunk
export type AppThunk<R = void> = ThunkAction<R, AppState, typeof extraArgument, UnknownAction>

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppStore = useStore.withTypes<typeof store>()
export const createAppSelector = createSelector.withTypes<AppState>()

// @ts-ignore
window.store = store