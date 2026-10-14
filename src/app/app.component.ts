import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CounterExplanationComponent } from './counter/counter-explanation.component';
import { CounterFacade, CounterViewModel } from './counter/counter.facade';
import { HelloComponent } from './hello.component';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    NgIf,
    HelloComponent,
    CounterExplanationComponent,
    AsyncPipe,
    NgbDropdownModule,
  ],
})
export class AppComponent implements OnInit {
  name = 'Angular & NgRx - v17';
  private readonly counter = inject(CounterFacade);
  viewModel$: Observable<CounterViewModel> = this.counter.viewModel$;

  decrement(): void {
    this.counter.decrement();
  }

  increment(): void {
    this.counter.increment();
  }

  storeVal(displayedCount: number): void {
    this.counter.storeDisplayedCount(displayedCount);
  }

  ngOnInit(): void {
    this.increment();
  }
}
