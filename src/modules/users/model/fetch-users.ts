import {usersSlice} from "../users.slice.ts";
import type {AppThunk} from "../../../app/store.ts";

export const fetchUsers = (): AppThunk => (dispatch, getState, {api}) => {
  const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState())

  if (!isIdle) return;

  dispatch(usersSlice.actions.fetchUsersPending())
  api
    .getUsers()
    .then(users => {
      dispatch(usersSlice.actions.fetchUsersSuccess({users}))
    })
    .catch(() => {
      dispatch(usersSlice.actions.fetchUsersFailed())
    })
}