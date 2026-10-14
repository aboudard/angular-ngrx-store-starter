import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState, counterFeatureKey } from './counter.reducer';

export const selectCounterState =
  createFeatureSelector<CounterState>(counterFeatureKey);
export const getCount = createSelector(
  selectCounterState,
  counter => counter.count
);
export const getIsStoring = createSelector(
  selectCounterState,
  counter => counter.isStoring
);
export const getStoreError = createSelector(
  selectCounterState,
  counter => counter.storeError
);
