import { TestBed } from '@angular/core/testing';

import { StorageMap } from '@ngx-pwa/local-storage';
import { storeCounter } from '../actions/counter.actions';
import { CounterEffects } from './counter.effects';

describe('CounterEffects', () => {
  // let actions$: Observable<any>;
  let effects: CounterEffects;
  let storage: StorageMap;
  const action = storeCounter({ val: 10 });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CounterEffects,
        // provideMockActions(() => actions$),
        StorageMap
      ]
    });
    storage = TestBed.inject(StorageMap);
    effects = TestBed.inject<CounterEffects>(CounterEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should call storage on action', () => {});
});
