import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StorageMap } from '@ngx-pwa/local-storage';
import { defer, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { CounterActions } from './counter.actions';

@Injectable()
export class CounterEffects {
  actions$ = inject(Actions);
  storage = inject(StorageMap);

  setCounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CounterActions.storeCounter),
      exhaustMap(({ val }) =>
        defer(() => this.storage.set('count', val)).pipe(
          map(() => {
            console.log(val);
            return CounterActions.storeCounterSucceeded();
          }),
          catchError(() => of(CounterActions.storeCounterFailed()))
        )
      )
    )
  );
}
