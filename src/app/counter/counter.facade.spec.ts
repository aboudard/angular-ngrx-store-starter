import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { StorageMap } from '@ngx-pwa/local-storage';
import { of, throwError } from 'rxjs';
import { CounterActions } from './counter.actions';
import { CounterFacade, CounterViewModel } from './counter.facade';
import { AppState } from '../reducers';

describe('CounterFacade', () => {
  let facade: CounterFacade;
  let store: MockStore<AppState>;
  const watch = jasmine.createSpy('watch').and.returnValue(of(6));

  beforeEach(() => {
    watch.calls.reset();
    watch.and.returnValue(of(6));
    TestBed.configureTestingModule({
      providers: [
        CounterFacade,
        provideMockStore({
          initialState: {
            counter: {
              count: 4,
              isStoring: false,
              storeError: false,
            },
          },
        }),
        { provide: StorageMap, useValue: { watch } },
      ],
    });
    facade = TestBed.inject(CounterFacade);
    store = TestBed.inject(MockStore);
  });

  it('combines live and stored values after the display delay', fakeAsync(() => {
    let actual: CounterViewModel | undefined;
    facade.viewModel$.subscribe(viewModel => {
      actual = viewModel;
    });

    tick(1199);
    expect(actual).toBeUndefined();
    tick(1);

    expect(actual).toEqual({
      count: 4,
      storedValue: 6,
      storageError: false,
      isStoring: false,
      storeError: false,
    });
  }));

  it('keeps the live counter available if storage cannot be read', fakeAsync(() => {
    watch.and.returnValue(throwError(() => new Error('storage unavailable')));
    let actual: CounterViewModel | undefined;
    facade.viewModel$.subscribe(viewModel => {
      actual = viewModel;
    });

    tick(1200);

    expect(actual).toEqual({
      count: 4,
      storedValue: null,
      storageError: true,
      isStoring: false,
      storeError: false,
    });
  }));

  it('updates Store progress independently of the display delay', fakeAsync(() => {
    let actual: CounterViewModel | undefined;
    facade.viewModel$.subscribe(viewModel => {
      actual = viewModel;
    });
    tick(1200);
    expect(actual?.isStoring).toBeFalse();

    store.setState({
      counter: {
        count: 4,
        isStoring: true,
        storeError: false,
      },
    });
    expect(actual?.isStoring).toBeTrue();

    store.setState({
      counter: {
        count: 4,
        isStoring: false,
        storeError: true,
      },
    });
    expect(actual?.isStoring).toBeFalse();
    expect(actual?.storeError).toBeTrue();
  }));

  it('dispatches counter operations and stores the displayed snapshot', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    facade.increment();
    facade.decrement();
    facade.storeDisplayedCount(12);

    expect(dispatchSpy.calls.allArgs()).toEqual([
      [CounterActions.incrementCounter()],
      [CounterActions.decrementCounter()],
      [CounterActions.storeCounter({ val: 12 })],
    ]);
  });
});
