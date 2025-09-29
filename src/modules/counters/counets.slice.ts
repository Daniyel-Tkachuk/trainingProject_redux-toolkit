import {createAction} from "@reduxjs/toolkit";

export const incrementAction = createAction<{counterId: CounterId}>("counters/increment")
export const decrementAction = createAction<{counterId: CounterId}>("counters/decrement")

export type CounterId = string

export type Counter = {
  counter: number
}

const initialCounterState: Counter = {
  counter: 0
}

type CountersState = Record<CounterId, Counter | undefined>

const countersState: CountersState = {}

export const countersReducer = (state = countersState, action: Actions): CountersState => {
  switch (action.type) {
    case 'increment': {
      const {counterId} = action.payload
      const currentCounter = state[counterId] ?? initialCounterState
      return {
        ...state,
        [counterId]: {
          ...currentCounter,
          counter: currentCounter.counter + 1
        }
      }
    }
    case 'decrement': {
      const {counterId} = action.payload
      const currentCounter = state[counterId] ?? initialCounterState
      return {
        ...state,
        [counterId]: {
          ...currentCounter,
          counter: currentCounter.counter - 1
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



