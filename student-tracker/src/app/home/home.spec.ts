import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Home } from './home';

describe('Home', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Home);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should compute a class average of 0 with no students', () => {
    const fixture = TestBed.createComponent(Home);
    const component = fixture.componentInstance;
    component.students = [];
    expect(component.classAverage).toBe(0);
  });

  it('should compute the passing count correctly', () => {
    const fixture = TestBed.createComponent(Home);
    const component = fixture.componentInstance;
    component.students = [
      { name: 'A', studentId: '1', course: 'APPDEV1', grade: 90 },
      { name: 'B', studentId: '2', course: 'APPDEV1', grade: 60 }
    ];
    expect(component.passingCount).toBe(1);
  });

  it('should return the last four students, most recent first', () => {
    const fixture = TestBed.createComponent(Home);
    const component = fixture.componentInstance;
    component.students = [
      { name: 'One', studentId: '1', course: 'APPDEV1', grade: 90 },
      { name: 'Two', studentId: '2', course: 'APPDEV1', grade: 90 },
      { name: 'Three', studentId: '3', course: 'APPDEV1', grade: 90 }
    ];
    expect(component.recentStudents.map(s => s.name)).toEqual(['Three', 'Two', 'One']);
  });

  it('should list only students below the passing threshold as needing attention', () => {
    const fixture = TestBed.createComponent(Home);
    const component = fixture.componentInstance;
    component.students = [
      { name: 'Ana', studentId: '1', course: 'APPDEV1', grade: 90 },
      { name: 'Ben', studentId: '2', course: 'APPDEV1', grade: 60 }
    ];
    expect(component.attentionStudents.map(s => s.name)).toEqual(['Ben']);
  });

  it('should build initials from a full name', () => {
    const fixture = TestBed.createComponent(Home);
    const component = fixture.componentInstance;
    expect(component.initials('Nathan Cruz')).toBe('NC');
  });
});
