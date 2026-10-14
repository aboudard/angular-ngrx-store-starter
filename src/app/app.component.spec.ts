import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CounterFacade } from './counter/counter.facade';
import { CounterViewModel } from './counter/counter.facade';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  const counterFacade = {
    viewModel$: of<CounterViewModel>({
      count: 2,
      storedValue: null,
      storageError: false,
      isStoring: false,
      storeError: false,
    }),
    decrement: jasmine.createSpy('decrement'),
    increment: jasmine.createSpy('increment'),
    storeDisplayedCount: jasmine.createSpy('storeDisplayedCount'),
  };

  beforeEach(waitForAsync(() => {
    counterFacade.decrement.calls.reset();
    counterFacade.increment.calls.reset();
    counterFacade.storeDisplayedCount.calls.reset();
    TestBed.configureTestingModule({
      providers: [
        AppComponent,
        { provide: CounterFacade, useValue: counterFacade },
      ],
    });
    component = TestBed.inject(AppComponent);
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Angular & NgRx - v17'`, () => {
    expect(component.name).toEqual('Angular & NgRx - v17');
  });

  it('should increment the counter once on init', () => {
    component.ngOnInit();
    expect(counterFacade.increment).toHaveBeenCalledTimes(1);
  });

  it('should route counter operations through the facade', () => {
    component.increment();
    component.decrement();
    component.storeVal(17);

    expect(counterFacade.increment).toHaveBeenCalledTimes(1);
    expect(counterFacade.decrement).toHaveBeenCalledTimes(1);
    expect(counterFacade.storeDisplayedCount).toHaveBeenCalledWith(17);
  });
});
