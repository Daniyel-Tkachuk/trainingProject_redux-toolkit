import {memo, useState} from "react";
import {type UserId, type UserRemoveSelectedAction, type UserSelectedAction} from "../model/reducerCounter.ts";
import {type AppState, createAppSelector, useAppDispatch, useAppSelector} from "../../../app/store.ts";


const selectSortedUsers = createAppSelector(
  (state: AppState) => state.users.ids,
  (state: AppState) => state.users.entities,
  (_: AppState, sort: "asc" | "desc") => sort,
  (ids, entities, sort) =>
    ids
      .map((id) => entities[id])
      .sort((a, b) => sort === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
)

export const UsersList = () => {
  const [sortType, setSortType] = useState<'asc' | 'desc'>('asc')

  const sortedUsers = useAppSelector((state) => selectSortedUsers(state, sortType))
  const selectedUserId = useAppSelector((state) => state.users.selectedUserId)

  // *********** этот код ниже, преднозачен, если мы хотим оптимизировать приложение без применения реселекта, который описан выше ****
  // const entities = useAppSelector(state => state.users.entities)
  // const ids = useAppSelector(state => state.users.ids)
  // const selectedUserId = useAppSelector(state => state.users.selectedUserId)

  /*const selectedUser = selectedUserId ? entities[selectedUserId] : undefined*/

  /*const sortedUsers = useMemo(() => {
    return ids
      .map((id) => entities[id])
      .sort((a, b) => sortType === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
  }, [ids, entities, sortType])*/

  return (
    <div className="flex flex-col items-center">
      {!selectedUserId ? (
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
      ) : (
        <SelectedUser
          userId={selectedUserId}
        />
      )}
    </div>
  );
};

type UserListItem = {
  userId: UserId
}

export const UserListItem = memo(function UserListItem({userId}: UserListItem) {
  const user = useAppSelector(state => state.users.entities[userId])
  const dispatch = useAppDispatch()

  const handleUserClick = () => {
    dispatch({
      type: 'userSelected',
      payload: {userId: user.id}
    } satisfies UserSelectedAction)
  }

  return (
    <li key={user.id} className="py-2" onClick={handleUserClick}>
      <span className="hover:underline cursor-pointer">{user.name}</span>
    </li>
  );
})

type SelectedUser = {
  userId: UserId
}

function SelectedUser({userId}: SelectedUser) {
  const user = useAppSelector(state => state.users.entities[userId])
  const dispatch = useAppDispatch()

  const handleBackButtonClick = () => {
    dispatch({
      type: 'userRemoveSelected',
    } satisfies UserRemoveSelectedAction)
  }

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleBackButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md"
      >
        Back
      </button>
      <h2 className="text-3xl">{user.name}</h2>
      <p className="text-xl">{user.description}</p>
    </div>
  );
}