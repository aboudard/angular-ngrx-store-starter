import { TestBed, waitForAsync } from '@angular/core/testing';
import { ObserverSpy, subscribeSpyTo } from '@hirez_io/observer-spy';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CounterActions } from './actions/counter.actions';
import { AppComponent } from './app.component';
import * as fromRoot from './reducers';

describe('AppComponent', () => {
  let component: AppComponent;
  let store: MockStore<fromRoot.AppState>;
  let storeSpy: ObserverSpy<any>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [AppComponent, provideMockStore()],
    });
    store = TestBed.inject(MockStore);
    storeSpy = subscribeSpyTo(store.scannedActions$);
    component = TestBed.inject(AppComponent);
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Angular & NgRx - v17'`, () => {
    expect(component.name).toEqual('Angular & NgRx - v17');
  });

  it('should dispatch an action onInit - method 1', () => {
    const action = CounterActions.incrementCounter();
    component.ngOnInit();
    expect(storeSpy.getLastValue()).toEqual(action);
  });

  it('should dispatch an action onInit - method 2', () => {
    const spyStore = spyOn(store, 'dispatch').and.callThrough();
    const action = CounterActions.incrementCounter();
    component.ngOnInit();
    expect(spyStore).toHaveBeenCalledWith(action);
  });
});
