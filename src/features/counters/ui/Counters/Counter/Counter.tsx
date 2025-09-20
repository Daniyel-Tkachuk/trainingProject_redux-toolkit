import type {CounterId, CounterState, DecrementAction, IncrementAction} from "../../../model/reducerCounter.ts";
import {type AppState, store} from "../../../../../app/store.ts";
import {useEffect, useReducer, useRef} from "react";

type Props = {
  counterId: CounterId
}

const selectCounter = (state: AppState, counterId: CounterId): CounterState => state.counters[counterId];

export const Counter = ({counterId}: Props) => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0)

  const lastStateRef = useRef<ReturnType<typeof selectCounter>>();

  useEffect(() => {
    return store.subscribe(() => {
      const currentState = selectCounter(store.getState(), counterId)
      const lastState = lastStateRef.current

      if (currentState !== lastState) {
        forceUpdate()
      }

      lastStateRef.current = currentState
    })
  }, [])

  const currentState = selectCounter(store.getState(), counterId);

  return (
    <div>
      <div>
        counter: {currentState?.counter}
      </div>
      <div>
        <button
          onClick={() => store.dispatch({type: 'increment', payload: {counterId}} satisfies IncrementAction)}>inc
        </button>
        <button
          onClick={() => store.dispatch({type: 'decrement', payload: {counterId}} satisfies DecrementAction)}>dec
        </button>
      </div>
    </div>
  );
};
