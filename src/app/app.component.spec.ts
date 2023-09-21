import { TestBed, waitForAsync } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import * as counterActions from "./actions/counter.actions";
import { AppComponent } from "./app.component";
import * as fromRoot from "./reducers";
import { ObserverSpy, subscribeSpyTo } from "@hirez_io/observer-spy";

describe("AppComponent", () => {
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

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Angular & NgRx'`, () => {
    expect(component.name).toEqual("Angular & NgRx");
  });

  it("should dispatch an action onInit - method 1", () => {
    const action = counterActions.increment();
    component.ngOnInit();
    expect(storeSpy.getLastValue()).toEqual(action);
  });

  it("should dispatch an action onInit - method 2", () => {
    const spyStore = spyOn(store, "dispatch").and.callThrough();
    const action = counterActions.increment();
    component.ngOnInit();
    expect(spyStore).toHaveBeenCalledWith(action);
  });

});
