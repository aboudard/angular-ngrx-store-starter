import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import * as counterActions from './actions/counter.actions';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import * as fromRoot from './reducers';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<fromRoot.AppState>;
  let compEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(fromRoot.reducers)],
      declarations: [AppComponent, HelloComponent]
    }).compileComponents();

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compEl = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Angular & NgRx'`, () => {
    expect(component.name).toEqual('Angular & NgRx');
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Hello Angular & NgRx'
    );
  });

  it('should dispatch an action to load data when created', () => {
    const action = counterActions.increment();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should display counter value', () => {
    const span = compEl.querySelector('#num');
    expect(span.textContent).toEqual('2');
  });
});
