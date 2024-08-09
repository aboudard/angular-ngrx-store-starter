import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-hello',
    template: `
    <h1>Hello {{ name }}!</h1>
  `,
    styles: [
        ``
    ],
    standalone: true
})
export class HelloComponent {
  @Input() name: string;
}
