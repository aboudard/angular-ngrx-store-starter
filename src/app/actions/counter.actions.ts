import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CounterActions = createActionGroup({
  source: 'Counter',
  events: {
    'Increment Counter': emptyProps(),
    'Decrement Counter': emptyProps(),
    'Store Counter': props<{ val: number }>()
  }
});