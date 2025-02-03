import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: ` <h1>Hello {{ name() }}!</h1> `,
  standalone: true,
})
export class HelloComponent {
  readonly name = input<string>(undefined);
}
