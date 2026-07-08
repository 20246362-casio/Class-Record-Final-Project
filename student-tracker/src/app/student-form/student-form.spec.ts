import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { StudentForm } from './student-form';

describe('StudentForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentForm],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(StudentForm);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should populate fields when editStudent is set', () => {
    const fixture = TestBed.createComponent(StudentForm);
    const component = fixture.componentInstance;

    component.editStudent = { _id: '1', name: 'Ana', studentId: '2023-0001', course: 'APPDEV1', grade: 90 };
    component.ngOnChanges();

    expect(component.name).toBe('Ana');
    expect(component.grade).toBe(90);
  });

  it('should reset the form after resetForm() runs', () => {
    const fixture = TestBed.createComponent(StudentForm);
    const component = fixture.componentInstance;

    component.name = 'Ana';
    component.resetForm();

    expect(component.name).toBe('');
    expect(component.editStudent).toBeNull();
  });
});
