# Data model

## Summary

There is no relational database, backend domain model, or ORM schema. The application has one in-memory Counter state slice and a separate browser-stored number.

## Root application state

Defined in `src/app/reducers/index.ts`:

```ts
export interface AppState {
  [fromCounter.counterFeatureKey]: fromCounter.CounterState;
}
```

## Counter state

Defined in `src/app/counter/counter.reducer.ts`:

```ts
export interface CounterState {
  count: number;
  isStoring: boolean;
  storeError: boolean;
}
```

- `count` begins at `0`; app startup dispatches one increment.
- Increment adds `2`; Decrement subtracts `1`.
- `isStoring` tracks the current explicit storage write.
- `storeError` indicates that the latest storage write failed.

## Separate stored value

- Browser storage key: `count`
- Value type: number
- Store writes the currently displayed counter value.
- The stored value is read and displayed separately; it does not initialize the live counter.
- `storageError` is view-model state indicating that the stored value could not be read. It is not part of `CounterState`.

## Key records

1. `CounterState`
   - The feature state containing the live count and storage-write status.
2. `AppState`
   - The root state containing the `counter` feature slice.
3. Stored counter value
   - A number explicitly saved by the user and retained separately from the live count.
4. `CounterViewModel`
   - The facade's read model combining the displayed count, stored value, initial-read error, and write status for the UI.

## Relationships and consistency

- The reducer owns in-memory counter transitions and storage-write status.
- The Counter effect writes an explicit Store request and reports success or failure.
- The view model combines the in-memory state with the separately watched stored value.
- Displayed values are delayed by 1.2 seconds; Store submits the value currently displayed.
- There are no transaction boundaries, relational constraints, or backend persistence workflows.
