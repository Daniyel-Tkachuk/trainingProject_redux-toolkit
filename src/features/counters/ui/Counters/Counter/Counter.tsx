import type {CounterId, DecrementAction, IncrementAction} from "../../../model/reducerCounter.ts";
import {selectCounter, useAppSelector} from "../../../../../app/store.ts";
import {useDispatch} from "react-redux";

type Props = {
  counterId: CounterId
}



export const Counter = ({counterId}: Props) => {
  /*
  ********* Сохраннение предыдущего стейта через useRef (подкапотная работа useSelector) ******
  const [_, forceUpdate] = useReducer((x) => x + 1, 0)
  const lastStateRef = useRef<ReturnType<typeof selectCounter>>(null);

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
  const currentState = selectCounter(store.getState(), counterId);*/

  const dispatch = useDispatch()
  const counterState = useAppSelector((state) => selectCounter(state, counterId));

  return (
    <div>
      <div>
        counter: {counterState?.counter}
      </div>
      <div>
        <button
          onClick={() => dispatch({type: 'increment', payload: {counterId}} satisfies IncrementAction)}>inc
        </button>
        <button
          onClick={() => dispatch({type: 'decrement', payload: {counterId}} satisfies DecrementAction)}>dec
        </button>
      </div>
    </div>
  );
};
