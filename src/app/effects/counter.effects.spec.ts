import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { StorageMap } from "@ngx-pwa/local-storage";
import { CounterActions } from "../actions/counter.actions";
import { CounterEffects } from "./counter.effects";
import { Observable, of } from "rxjs";
import { Spy, provideAutoSpy } from "jasmine-auto-spies";
import { SubscriberSpy, subscribeSpyTo } from "@hirez_io/observer-spy";
import { Action } from "@ngrx/store";

describe("CounterEffects", () => {
  let actions$: Observable<Action>;
  let effects: CounterEffects;
  // let storage: StorageMap;
  let storageMapSpy: Spy<StorageMap>;
  let observerSpy: SubscriberSpy<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CounterEffects,
        provideMockActions(() => actions$),
        provideAutoSpy(StorageMap),
      ],
    });
    effects = TestBed.inject<CounterEffects>(CounterEffects);
    observerSpy = undefined;
    actions$ = undefined;
    storageMapSpy = TestBed.inject<any>(StorageMap);
  });

  it("should be created", () => {
    expect(effects).toBeTruthy();
  });

  it("should call storage on action", () => {
    actions$ = of(CounterActions.storeCounter);
    storageMapSpy.set.and.nextWith();
    observerSpy = subscribeSpyTo(effects.setCounter$);
    expect(observerSpy.getValuesLength()).toBe(1);
  });
});
