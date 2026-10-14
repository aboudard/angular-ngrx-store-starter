import { CounterActions } from './counter.actions';
import { initialState, reducer } from './counter.reducer';

describe('counter reducer', () => {
  it('starts at zero and preserves the established increment/decrement steps', () => {
    expect(initialState.count).toBe(0);
    expect(reducer(initialState, CounterActions.incrementCounter()).count).toBe(
      2
    );
    expect(reducer(initialState, CounterActions.decrementCounter()).count).toBe(
      -1
    );
  });

  it('tracks a storage write until it succeeds', () => {
    const pending = reducer(
      initialState,
      CounterActions.storeCounter({ val: 2 })
    );

    expect(pending.isStoring).toBeTrue();
    expect(pending.storeError).toBeFalse();
    expect(
      reducer(pending, CounterActions.storeCounterSucceeded()).isStoring
    ).toBeFalse();
  });

  it('clears pending state and records a failed storage write', () => {
    const pending = reducer(
      initialState,
      CounterActions.storeCounter({ val: 2 })
    );
    const failed = reducer(pending, CounterActions.storeCounterFailed());

    expect(failed.isStoring).toBeFalse();
    expect(failed.storeError).toBeTrue();
  });
});
