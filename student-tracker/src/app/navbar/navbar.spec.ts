import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Navbar } from './navbar';

describe('Navbar', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideRouter([])]
    }).compileComponents();
  });
  
  it('should create the navbar', () => {
    const fixture = TestBed.createComponent(Navbar);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should display the professor name', () => {
    const fixture = TestBed.createComponent(Navbar);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Prof. Reyes');
  });
});
