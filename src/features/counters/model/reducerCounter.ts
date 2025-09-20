export type CounterState = {
  counter: number
}
export type CounterId = string
type InitialState = {
  counters: Record<CounterId, CounterState | undefined>
}
const initialState: InitialState = {
  counters: {}
}

const initialCounterState = {
  counter: 0
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

type Actions = IncrementAction | DecrementAction


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

