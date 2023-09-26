import { Action, createReducer, on } from '@ngrx/store';
import { CounterActions } from '../actions/counter.actions';

export const counterFeatureKey = 'counter';

export interface CounterState {
  count: number;
}

export const initialState: CounterState = {
  count: 0
};

const counterReducer = createReducer(
  initialState,
  on(CounterActions.incrementCounter, state => ({ ...state, count: state.count + 2 })),
  on(CounterActions.decrementCounter, state => ({ ...state, count: state.count - 1 }))
);

export function reducer(state: CounterState | undefined, action: Action) {
  return counterReducer(state, action);
}
