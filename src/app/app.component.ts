import { AsyncPipe, NgIf } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { StorageMap } from "@ngx-pwa/local-storage";
import { Observable, combineLatest } from "rxjs";
import { delay, map } from "rxjs/operators";
import { CounterActions } from "./actions/counter.actions";
import { HelloComponent } from "./hello.component";
import { AppState } from "./reducers";
import { getCount } from "./selectors/counter.selector";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";

interface ViewModel {
  count: number;
  storage: number;
}

@Component({
  selector: "app-component",
  templateUrl: "./app.component.html",
  standalone: true,
  imports: [NgIf, HelloComponent, AsyncPipe, NgbDropdownModule],
})
export class AppComponent implements OnInit {
  name = "Angular & NgRx - v15";
  store = inject(Store<AppState>);
  storage = inject(StorageMap);
  viewModel$: Observable<ViewModel> = combineLatest([
    this.store.pipe(select(getCount)),
    this.storage.watch<number>("count", {
      type: "number",
    }) as Observable<number>,
  ]).pipe(
    delay(500),
    map(([count, storage]) => ({ count, storage }))
  );

  decrement(): void {
    this.store.dispatch(CounterActions.decrementCounter());
  }
  increment(): void {
    this.store.dispatch(CounterActions.incrementCounter());
  }
  storeVal(num: number): void {
    this.store.dispatch(CounterActions.storeCounter({ val: num }));
  }
  ngOnInit(): void {
    this.increment();
  }
}
