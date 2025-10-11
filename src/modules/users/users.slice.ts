import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export const initialUsersList: User[] = Array.from({length: 3000}, (_, index) => ({
  id: `user${index + 11}`,
  name: `User ${index + 11}`,
  description: `Description for User ${index + 11}`
}))



export type UserId = string

export type User = {
  id: UserId
  name: string
  description: string
}

export type UsersState = {
  entities: Record<UserId, User | undefined>
  ids: UserId[]
  // selectedUserId: UserId | undefined
  fetchUsersStatus: "idle" | "pending" | "success" | "failed"
  fetchUserStatus: "idle" | "pending" | "success" | "failed"
}

const usersState: UsersState = {
  entities: {},
  ids: [],
  // selectedUserId: undefined,
  fetchUsersStatus: "idle",
  fetchUserStatus: "idle",
}

export const usersSlice = createSlice({
  name: "users",
  initialState: usersState,
  selectors: {
    // selectSelectedUserId: (state) => state.selectedUserId,
    selectUserById: (state, userId: UserId) => state.entities[userId],
    selectIsFetchUsersPending: (state) => state.fetchUsersStatus === "pending",
    selectIsFetchUsersIdle: (state) => state.fetchUsersStatus === "idle",
    selectIsFetchUserPending: (state) => state.fetchUserStatus === "pending",
  },
  reducers: {
    /*selectedUser: (state, action: PayloadAction<{userId: UserId}>) => {
      const {userId} = action.payload
      state.selectedUserId = userId
    },*/
    /*selectRemoved: (state) => {
      state.selectedUserId = undefined
    },*/
    fetchUsersPending: (state) => {
      state.fetchUsersStatus = "pending"
    },
    fetchUsersSuccess: (state, action: PayloadAction<{users: User[]}>) => {
      const {users} = action.payload
      state.fetchUsersStatus = "success"
      state.entities = users.reduce<Record<UserId, User>>((acc, user) => {
        acc[user.id] = user
        return acc
      }, {})
      state.ids = users.map((user) => user.id)
    },
    fetchUsersFailed: (state) => {
      state.fetchUsersStatus = "failed"
    },
    fetchUserPending: (state) => {
      state.fetchUserStatus = "pending"
    },
    fetchUserSuccess: (state, action: PayloadAction<{user: User}>) => {
      const {user} = action.payload
      state.fetchUsersStatus = "success"
      state.entities[user.id] = user
    },
    fetchUserFailed: (state) => {
      state.fetchUserStatus = "failed"
    },
  },
})




/*export const usersReducer = (state = usersState, action: Actions): UsersState => {
  switch (action.type) {
    case 'usersStored': {
      const {users} = action.payload
      return {
        ...state,
        entities: users.reduce((acc, user) => {
          acc[user.id] = user
          return acc
        }, {} as Record<UserId, User>),
        ids: users.map((user) => user.id)
      }
    }
    case 'userSelected': {
      const {userId} = action.payload
      return {
        ...state,
        selectedUserId: userId
      }
    }
    case 'userRemoveSelected': {
      return {
        ...state,
        selectedUserId: undefined
      }
    }
    default: {
      return state
    }
  }
}

export type UserSelectedAction = {
  type: "userSelected",
  payload: {
    userId: string
  }
}

export type UserRemoveSelectedAction = {
  type: "userRemoveSelected",
}

export type UsersStoredAction = {
  type: "usersStored",
  payload: {
    users: User[]
  }
}

type Actions = | UserSelectedAction | UserRemoveSelectedAction | UsersStoredAction*/

