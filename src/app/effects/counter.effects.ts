import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StorageMap } from '@ngx-pwa/local-storage';
import { map } from 'rxjs/operators';
import { CounterActions } from '../actions/counter.actions';

@Injectable()
export class CounterEffects {
  actions$ = inject(Actions);
  storage = inject(StorageMap);

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
