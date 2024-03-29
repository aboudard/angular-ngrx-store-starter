import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { StorageMap } from "@ngx-pwa/local-storage";
import { Observable, combineLatest } from "rxjs";
import { delay, map } from "rxjs/operators";
import { CounterActions } from "./actions/counter.actions";
import { AppState } from "./reducers";
import { getCount } from "./selectors/counter.selector";

interface ViewModel {
  count: number;
  storage: number;
}

@Component({
  selector: "app-component",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  name = "Angular & NgRx";
  viewModel$: Observable<ViewModel>;

  constructor(private store: Store<AppState>, private storage: StorageMap) {
    this.viewModel$ = combineLatest([
      this.store.pipe(select(getCount)),
      this.storage.watch<number>("count", {
        type: "number"
      }) as Observable<number>,
    ]).pipe(
      delay(1500),
      map(([count, storage]) => ({ count, storage }))
      );
  }

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
