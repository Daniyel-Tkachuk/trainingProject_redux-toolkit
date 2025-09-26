import {Counter} from "./Counter/Counter.tsx";

export const Counters = () => {
  return (
    <div style={{marginBottom: "50px"}}>
      <Counter counterId={'first'}/>
      <Counter counterId={'second'}/>
    </div>
  );
};
