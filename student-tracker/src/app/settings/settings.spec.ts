import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Settings } from './settings';

describe('Settings', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Settings]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Settings);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show and then hide the saved message after onSave()', fakeAsync(() => {
    const fixture = TestBed.createComponent(Settings);
    const component = fixture.componentInstance;
    component.onSave();
    expect(component.savedMessageVisible).toBe(true);

    tick(2500);
    expect(component.savedMessageVisible).toBe(false);
  }));

  it('should restore defaults on reset', () => {
    const fixture = TestBed.createComponent(Settings);
    const component = fixture.componentInstance;

    component.professorName = 'Someone Else';
    component.passingGrade = 50;
    component.weeklySummaryEmail = true;

    component.onResetDefaults();

    expect(component.professorName).toBe('Prof. Reyes');
    expect(component.passingGrade).toBe(75);
    expect(component.weeklySummaryEmail).toBe(false);
  });

  it('should build initials from the professor name, ignoring the "Prof." prefix', () => {
    const fixture = TestBed.createComponent(Settings);
    const component = fixture.componentInstance;
    expect(component.initials('Prof. Reyes')).toBe('R');
  });
});
