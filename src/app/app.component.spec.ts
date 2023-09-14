import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import * as counterActions from "./actions/counter.actions";
import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import * as fromRoot from "./reducers";
import { ObserverSpy, subscribeSpyTo } from "@hirez_io/observer-spy";

describe("AppComponent", () => {
  let component: AppComponent;
  let store: MockStore<fromRoot.AppState>;
  let storeSpy: ObserverSpy<any>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(fromRoot.reducers)],
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

  it("should dispatch an action to load data when created", () => {
    const action = counterActions.increment();
    component.ngOnInit();
    expect(storeSpy.getLastValue()).toEqual(action);
  });
});
