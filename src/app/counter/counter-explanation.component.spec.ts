import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterExplanationComponent } from './counter-explanation.component';

describe('CounterExplanationComponent', () => {
  let fixture: ComponentFixture<CounterExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterExplanationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterExplanationComponent);
    fixture.detectChanges();
  });

  it('explains the counter and saved-value behavior', () => {
    const text = fixture.nativeElement.textContent as string;

    expect(text).toContain('Increment adds 2');
    expect(text).toContain('Decrement subtracts 1');
    expect(text).toContain('increments once when the app starts');
    expect(text).toContain('does not set the counter when the app starts');
    expect(text).toContain('about 1.2 seconds after a change');
  });
});
