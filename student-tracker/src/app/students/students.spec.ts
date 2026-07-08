import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Students } from './students';

describe('Students', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Students],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Students);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should clear the selected student after saving', () => {
    const fixture = TestBed.createComponent(Students);
    const component = fixture.componentInstance;
    component.selectedStudent = { name: 'Ana', studentId: '001', course: 'APPDEV1', grade: 90 };
    component.onSaved();
    expect(component.selectedStudent).toBeNull();
  });
});
