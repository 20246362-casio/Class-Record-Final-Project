import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../models/student.model';

// shows the table/list of students, sends events up when
// user wants to edit or delete someone
@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentList {
  @Input() students: Student[] = []; // list comes from the parent page
  @Output() edit = new EventEmitter<Student>(); // tell parent "user wants to edit this one"
  @Output() delete = new EventEmitter<string>(); // tell parent "user wants to delete this id"

  onEdit(student: Student): void {
    this.edit.emit(student);
  }

  onDelete(id: string | undefined): void {
    if (!id) {
      return; // safety check, shouldnt happen but just in case
    }
    const confirmed = confirm('Remove this student from the ledger?'); // ask before deleting
    if (confirmed) {
      this.delete.emit(id);
    }
  }
}
