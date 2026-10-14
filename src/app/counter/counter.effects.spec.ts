import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Action } from '@ngrx/store';
import { SubscriberSpy, subscribeSpyTo } from '@hirez_io/observer-spy';
import { Observable, of, throwError } from 'rxjs';
import { CounterActions } from './counter.actions';
import { CounterEffects } from './counter.effects';

describe('CounterEffects', () => {
  let actions$: Observable<Action>;
  let effects: CounterEffects;
  let storageMapSpy: jasmine.SpyObj<StorageMap>;
  let observerSpy: SubscriberSpy<Action>;

  beforeEach(() => {
    storageMapSpy = jasmine.createSpyObj<StorageMap>('StorageMap', ['set']);
    TestBed.configureTestingModule({
      providers: [
        CounterEffects,
        provideMockActions(() => actions$),
        { provide: StorageMap, useValue: storageMapSpy },
      ],
    });
    effects = TestBed.inject<CounterEffects>(CounterEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should call storage on action', () => {
    actions$ = of(CounterActions.storeCounter({ val: 8 }));
    storageMapSpy.set.and.returnValue(of(undefined));
    observerSpy = subscribeSpyTo(effects.setCounter$);
    expect(storageMapSpy.set).toHaveBeenCalledWith('count', 8);
    expect(observerSpy.getLastValue()).toEqual(
      CounterActions.storeCounterSucceeded()
    );
    expect(observerSpy.getValuesLength()).toBe(1);
  });

  it('should report a failed storage write', () => {
    actions$ = of(CounterActions.storeCounter({ val: 8 }));
    storageMapSpy.set.and.returnValue(
      throwError(() => new Error('storage unavailable'))
    );
    observerSpy = subscribeSpyTo(effects.setCounter$);
    expect(observerSpy.getLastValue()).toEqual(
      CounterActions.storeCounterFailed()
    );
  });
});
