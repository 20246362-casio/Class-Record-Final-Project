import { TestBed } from '@angular/core/testing';
import { StudentList } from './student-list';
import { Student } from '../models/student.model';

describe('StudentList', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentList]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(StudentList);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit edit with the selected student', () => {
    const fixture = TestBed.createComponent(StudentList);
    const component = fixture.componentInstance;
    const testStudent: Student = { name: 'Test', studentId: '001', course: 'APPDEV1', grade: 90 };

    let emitted!: Student;
    component.edit.subscribe(s => (emitted = s));

    component.onEdit(testStudent);

    expect(emitted).toEqual(testStudent);
  });

  it('should show empty state when there are no students', () => {
    const fixture = TestBed.createComponent(StudentList);
    fixture.componentInstance.students = [];
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('No students yet');
  });
});
