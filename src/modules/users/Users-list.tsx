import {memo, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector, useAppStore} from "../../app/store.ts";
import {type UserId, usersSlice,} from "./users.slice.ts";
import {selectSortedUsers} from "./users-selectors.ts";
import {fetchUsers} from "./model/fetch-users.ts";
import {useNavigate} from "react-router-dom";


export const UsersList = () => {
  const dispatch = useAppDispatch();
  const appStore = useAppStore()
  const [sortType, setSortType] = useState<'asc' | 'desc'>('asc')
  const isPending = useAppSelector(usersSlice.selectors.selectIsFetchUserPending)

  useEffect(() => {
    dispatch(fetchUsers())
    // fetchUsers(appStore.dispatch, appStore.getState)
  }, [dispatch, appStore])


  const sortedUsers = useAppSelector((state) =>
    selectSortedUsers(state, sortType)
  )


  // *********** этот код ниже, преднозачен, если мы хотим оптимизировать приложение без применения реселекта, который описан в users.slice ****
  // const entities = useAppSelector(state => state.users.entities)
  // const ids = useAppSelector(state => state.users.ids)
  // const selectedUserId = useAppSelector(state => state.users.selectedUserId)

  /*const selectedUser = selectedUserId ? entities[selectedUserId] : undefined*/

  /*const sortedUsers = useMemo(() => {
    return ids
      .map((id) => entities[id])
      .sort((a, b) => sortType === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
  }, [ids, entities, sortType])*/

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-between">
          <div className="flex flex-row items-center">
            <button
              onClick={() => setSortType("asc")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Asc
            </button>
            <button
              onClick={() => setSortType("desc")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
            >
              Desc
            </button>
          </div>
          <ul className="list-none">
            {sortedUsers.map((user) => (
              <UserListItem
                userId={user.id}
                key={user.id}
              />
            ))}
          </ul>
        </div>
    </div>
  );
};


export const UserListItem = memo(function UserListItem({userId}: { userId: UserId }) {
  const navigate = useNavigate()
  const user = useAppSelector(state => state.users.entities[userId])

  const handleUserClick = () => {
    navigate(userId, {relative: "path"}) // path - навигация относительно текущего пути
  }

  return (
    <li key={user.id} className="py-2" onClick={handleUserClick}>
      <span className="hover:underline cursor-pointer">{user.name}</span>
    </li>
  );
})


