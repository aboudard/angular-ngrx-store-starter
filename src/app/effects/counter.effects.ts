import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StorageMap } from '@ngx-pwa/local-storage';
import { map, switchMap } from 'rxjs/operators';
import { CounterActions } from '../actions/counter.actions';

@Injectable()
export class CounterEffects {
  actions$ = inject(Actions);
  storage = inject(StorageMap);

  setCounter$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CounterActions.storeCounter),
        map(action => action.val),
        switchMap(val =>
          this.storage.set('count', val).pipe(map(() => console.log(val)))
        )
      ),
    { dispatch: false }
  );
}
