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
  entities: Record<UserId, User>
  ids: UserId[]
  selectedUserId: UserId | undefined
}

const UsersState: UsersState = {
  entities: {},
  ids: [],
  selectedUserId: undefined
}

export const usersReducer = (state = UsersState, action: Actions): UsersState => {
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

type Actions = | UserSelectedAction | UserRemoveSelectedAction | UsersStoredAction

