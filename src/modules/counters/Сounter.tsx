import {useAppSelector} from "../../app/store.ts";
import {useDispatch} from "react-redux";
import {type CounterId, decrementAction, incrementAction,} from "./counets.slice.ts";
import {selectCounter} from "./counters-selector.ts";
import {bindActionCreators} from "@reduxjs/toolkit";

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

  // чтобы не писать к примеру dispatch(incrementAction({counterId})) благодоря bindActionCreators можно сделать так
  const actions = bindActionCreators(
    {
      incrementAction,
      decrementAction,
    },
    dispatch
  )

  return (
    <div>
      <div>
        counter: {counterState?.counter}
      </div>
      <div>
        <button
          onClick={() => actions.incrementAction({counterId})}>inc
        </button>
        <button
          onClick={() => actions.decrementAction({counterId})}>dec
        </button>
      </div>
    </div>
  );
};
