import {Counter} from "./Counter/Counter.tsx";

export const Counters = () => {
  return (
    <div>
      <Counter counterId={'first'}/>
      <Counter counterId={'second'}/>
    </div>
  );
};
