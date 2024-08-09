import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CounterActions } from '../actions/counter.actions';
import { map } from 'rxjs/operators';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable()
export class CounterEffects {
  constructor(private actions$: Actions, private storage: StorageMap) {}

  setCounter$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CounterActions.storeCounter),
        map(action => {
          this.storage.set('count', action.val).subscribe();
          console.log(action.val);
        })
      ),
    { dispatch: false }
  );
}
