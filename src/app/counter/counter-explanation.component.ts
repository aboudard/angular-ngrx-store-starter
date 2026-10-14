import { Component } from '@angular/core';

@Component({
  selector: 'app-counter-explanation',
  standalone: true,
  template: `
    <section class="mb-3" aria-label="How the counter works">
      <p>
        Increment adds 2 and Decrement subtracts 1. The counter starts at 2
        because it begins at 0 and increments once when the app starts.
      </p>
      <p>
        Store saves the counter value currently shown in this browser. The saved
        value is displayed separately and does not set the counter when the app
        starts.
      </p>
      <p>
        The displayed counter and saved value update about 1.2 seconds after a
        change.
      </p>
    </section>
  `,
})
export class CounterExplanationComponent {}
