# Data model

## Summary
This project does not define a relational database schema or persistent backend domain model. The application state is a lightweight in-memory NgRx store with one primary state slice and browser-side persistence.

## State model
### Root application state
Defined in `src/app/reducers/index.ts`:

```ts
export interface AppState {
  [fromCounter.counterFeatureKey]: fromCounter.CounterState;
}
```

### Counter state
Defined in `src/app/reducers/counter.reducer.ts`:

```ts
export interface CounterState {
  count: number;
}
```

### Initial state
```ts
export const initialState: CounterState = {
  count: 0,
};
```

## Relationships and persistence
- There is a single feature slice keyed by `counter`.
- The `count` field is read via selector `getCount`.
- The same number is also persisted to browser storage with `StorageMap`.
- No database tables, entity mappings, or ORM metadata are present in the repo.

## Key entities / records
1. `CounterState`
   - Description: store slice containing the current counter value
   - Fields: `count: number`
2. `AppState`
   - Description: top-level state object that includes the counter feature slice
   - Fields: feature key `counter` mapped to `CounterState`
3. Persisted browser value
   - Description: local storage key `count` holding the last stored number
   - Type: number

## Transaction / consistency notes
- The project does not include transaction boundaries, relational integrity rules, or backend persistence workflows.
- The only state mutation is in the reducer and the write to browser storage performed by the effect.

## Conclusion
The effective data model is intentionally minimal and is centered on a single numeric state value. There is no separate domain model layer or database model in this repository.
