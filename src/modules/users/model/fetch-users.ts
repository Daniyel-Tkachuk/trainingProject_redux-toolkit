import {usersSlice} from "../users.slice.ts";
import type {AppThunk} from "../../../app/store.ts";

export const fetchUsers = ({refetch}: {refetch?: boolean} = {}): AppThunk<Promise<void>> =>
  async (dispatch, getState, {api}) => {
  const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState())

  if (!isIdle && !refetch) return;

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