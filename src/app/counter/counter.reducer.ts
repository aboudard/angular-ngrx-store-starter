import { Action, createReducer, on } from '@ngrx/store';
import { CounterActions } from './counter.actions';

export const counterFeatureKey = 'counter';

export interface CounterState {
  count: number;
  isStoring: boolean;
  storeError: boolean;
}

export const initialState: CounterState = {
  count: 0,
  isStoring: false,
  storeError: false,
};

const counterReducer = createReducer(
  initialState,
  on(CounterActions.incrementCounter, state => ({
    ...state,
    count: state.count + 2,
  })),
  on(CounterActions.decrementCounter, state => ({
    ...state,
    count: state.count - 1,
  })),
  on(CounterActions.storeCounter, state => ({
    ...state,
    isStoring: true,
    storeError: false,
  })),
  on(CounterActions.storeCounterSucceeded, state => ({
    ...state,
    isStoring: false,
  })),
  on(CounterActions.storeCounterFailed, state => ({
    ...state,
    isStoring: false,
    storeError: true,
  }))
);

export function reducer(state: CounterState | undefined, action: Action) {
  return counterReducer(state, action);
}
