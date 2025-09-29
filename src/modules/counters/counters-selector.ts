import type {AppState} from "../../app/store.ts";
import type {CounterId} from "./counets.slice.ts";

export const selectCounter = (state: AppState, counterId: CounterId) => state.counters[counterId];