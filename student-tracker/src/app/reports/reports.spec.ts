import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Reports } from './reports';

describe('Reports', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reports],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Reports);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should return null top/lowest student when there are no students', () => {
    const fixture = TestBed.createComponent(Reports);
    const component = fixture.componentInstance;
    component.students = [];
    expect(component.topStudent).toBeNull();
    expect(component.lowestStudent).toBeNull();
  });

  it('should identify the top and lowest performer correctly', () => {
    const fixture = TestBed.createComponent(Reports);
    const component = fixture.componentInstance;
    component.students = [
      { name: 'Ana', studentId: '1', course: 'APPDEV1', grade: 95 },
      { name: 'Ben', studentId: '2', course: 'APPDEV1', grade: 60 }
    ];
    expect(component.topStudent?.name).toBe('Ana');
    expect(component.lowestStudent?.name).toBe('Ben');
  });

  it('should bucket grades into the correct brackets', () => {
    const fixture = TestBed.createComponent(Reports);
    const component = fixture.componentInstance;
    component.students = [
      { name: 'Ana', studentId: '1', course: 'APPDEV1', grade: 95 },
      { name: 'Ben', studentId: '2', course: 'APPDEV1', grade: 60 }
    ];
    const brackets = component.bracketCounts;
    expect(brackets.find(b => b.label === '90 - 100')?.count).toBe(1);
    expect(brackets.find(b => b.label === 'Below 75')?.count).toBe(1);
  });
});
