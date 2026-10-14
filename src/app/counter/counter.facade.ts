import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { StorageMap } from '@ngx-pwa/local-storage';
import { combineLatest, defer, of } from 'rxjs';
import { catchError, delay, map, shareReplay } from 'rxjs/operators';
import { AppState } from '../reducers';
import { CounterActions } from './counter.actions';
import { getCount, getIsStoring, getStoreError } from './counter.selectors';

export interface CounterViewModel {
  count: number;
  storedValue: number | null;
  storageError: boolean;
  isStoring: boolean;
  storeError: boolean;
}

@Injectable({ providedIn: 'root' })
export class CounterFacade {
  private readonly store = inject(Store<AppState>);
  private readonly storage = inject(StorageMap);

  private readonly displayedValues$ = combineLatest([
    this.store.select(getCount),
    defer(() =>
      this.storage.watch('count', {
        type: 'number',
      })
    ).pipe(
      map(storedValue => ({
        storedValue: storedValue ?? null,
        storageError: false,
      })),
      catchError(() =>
        of({
          storedValue: null,
          storageError: true,
        })
      )
    ),
  ]).pipe(
    delay(1200),
    map(([count, storageState]) => ({
      count,
      ...storageState,
    })),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly viewModel$ = combineLatest([
    this.displayedValues$,
    this.store.select(getIsStoring),
    this.store.select(getStoreError),
  ]).pipe(
    map(([displayedValues, isStoring, storeError]) => ({
      ...displayedValues,
      isStoring,
      storeError,
    })),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  increment(): void {
    this.store.dispatch(CounterActions.incrementCounter());
  }

  decrement(): void {
    this.store.dispatch(CounterActions.decrementCounter());
  }

  storeDisplayedCount(value: number): void {
    this.store.dispatch(CounterActions.storeCounter({ val: value }));
  }
}
