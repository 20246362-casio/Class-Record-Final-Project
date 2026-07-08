import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';

// this is the form used for both adding a new student
// and editing an existing one (same form, different mode)
@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './student-form.html',
  styleUrl: './student-form.css'
})
export class StudentForm implements OnChanges {
  private studentService = inject(StudentService);

  @Input() editStudent: Student | null = null; // if this is set, we're editing not adding
  @Output() saved = new EventEmitter<void>(); // tell parent when we're done saving

  name = '';
  studentId = '';
  course = 'APPDEV1';
  grade: number | null = null;

  // runs whenever editStudent changes, fills the form with their info
  ngOnChanges(): void {
    if (this.editStudent) {
      this.name = this.editStudent.name;
      this.studentId = this.editStudent.studentId;
      this.course = this.editStudent.course;
      this.grade = this.editStudent.grade;
    }
  }

  // handles both add and edit, depending on if editStudent has an id
  onSubmit(): void {
    const studentData: Student = {
      name: this.name,
      studentId: this.studentId,
      course: this.course,
      grade: this.grade ?? 0 // just in case grade is null somehow
    };

    if (this.editStudent && this.editStudent._id) {
      // already has an id, so we're updating
      this.studentService.updateStudent(this.editStudent._id, studentData).subscribe(() => {
        this.resetForm();
        this.saved.emit();
      });
    } else {
      // no id yet, so its a brand new student
      this.studentService.addStudent(studentData).subscribe(() => {
        this.resetForm();
        this.saved.emit();
      });
    }
  }

  // if user clicks cancel while editing, just close the form without saving
  cancelEdit(): void {
    this.resetForm();
    this.saved.emit();
  }

  // clears the form back to empty/default
  resetForm(): void {
    this.name = '';
    this.studentId = '';
    this.course = 'APPDEV1';
    this.grade = null;
    this.editStudent = null;
  }
}
