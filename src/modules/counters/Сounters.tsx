import {Counter} from "./Сounter.tsx";


export const Counters = () => {
  return (
    <div className="flex flex-col items-center">
      <Counter counterId={'first'}/>
      <Counter counterId={'second'}/>
    </div>
  );
};
