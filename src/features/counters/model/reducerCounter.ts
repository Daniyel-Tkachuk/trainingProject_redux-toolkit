


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

export type CounterState = {
  counter: number
}
export type CounterId = string

type InitialState = {
  counters: Record<CounterId, CounterState | undefined>
  users: UsersState
}

const initialCounterState = {
  counter: 0
}
const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  selectedUserId: undefined
}

const initialState: InitialState = {
  counters: {},
  users: initialUsersState
}

export const reducerCounter = (state = initialState, action: Actions): InitialState => {
  switch (action.type) {
    case 'increment': {
      const {counterId} = action.payload
      const currentCounter = state.counters[counterId] ?? initialCounterState
      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter + 1
          }
        }
      }
    }
    case 'decrement': {
      const {counterId} = action.payload
      const currentState = state.counters[counterId] ?? initialCounterState
      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: {
            ...currentState,
            counter: currentState.counter - 1
          }
        }
      }
    }
    case 'usersStored': {
      const {users} = action.payload
      return {
        ...state,
        users: {
          ...state.users,
          entities: users.reduce((acc, user) => {
            acc[user.id] = user
            return acc
          }, {} as Record<UserId, User>),
          ids: users.map(user => user.id)
        },
      }
    }
    case 'userSelected': {
      const {userId} = action.payload
      return {
        ...state,
        users: {
          ...state.users,
          selectedUserId: userId
        }
      }
    }
    case 'userRemoveSelected': {
      return {
        ...state,
        users: {
          ...state.users,
          selectedUserId: undefined
        }
      }
    }
    default: {
      return state
    }
  }
}

export type IncrementAction = {
  type: "increment";
  payload: {
    counterId: CounterId;
  };
};

export type DecrementAction = {
  type: "decrement";
  payload: {
    counterId: CounterId;
  };
};

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

type Actions = IncrementAction
  | DecrementAction
  | UserSelectedAction
  | UserRemoveSelectedAction
  | UsersStoredAction


/*export const IncrementAC = (counterId: CounterId) => {
  return {
    type: 'INCREMENT' as const,
    payload: {
      counterId
    }
  }
}
export const DecrementAC = (counterId: CounterId) => {
  return {
    type: 'DECREMENT' as const,
    payload: {
      counterId
    }
  }
}*/

// type Actions = ReturnType<typeof IncrementAC> | ReturnType<typeof DecrementAC>

