import { Component, inject, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';
import { StudentList } from '../student-list/student-list';
import { StudentForm } from '../student-form/student-form';

// this page has the student list and the add/edit form together
@Component({
  selector: 'app-students',
  standalone: true,
  imports: [StudentList, StudentForm],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students implements OnInit {
  private studentService = inject(StudentService);

  students: Student[] = [];
  selectedStudent: Student | null = null; // the student we're currently editing (if any)

  ngOnInit(): void {
    // subscribe instead of fetching on our own, so if we add/edit/delete
    // from anywhere in the app, this list stays up to date automatically
    this.studentService.students$.subscribe(data => {
      this.students = data;
    });
    this.studentService.refreshStudents();
  }

  // when user clicks edit on a student, put them in the form
  onEdit(student: Student): void {
    this.selectedStudent = student;
  }

  // when user clicks delete, just tell the service to remove it
  onDelete(id: string): void {
    this.studentService.deleteStudent(id).subscribe();
  }

  // called after the form saves, clears out the selection
  onSaved(): void {
    this.selectedStudent = null;
  }
}
