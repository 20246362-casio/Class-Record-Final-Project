import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Student } from '../models/student.model';

// this file talks to the backend api so we dont have to
// write fetch calls in every page
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private http = inject(HttpClient); // lets us send requests to the server
  private apiUrl = 'http://localhost:5000/api/students'; // where our backend is running

  // this holds the current list of students in memory
  // every page (Home, Students, Reports) listens to this
  // so they all show the same data at the same time, instead of
  // each page fetching its own copy
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  students$ = this.studentsSubject.asObservable(); // other pages subscribe to this

  //goes and gets the newest list of students and tells everyone about it 
  refreshStudents(): void {
    this.http.get<Student[]>(this.apiUrl).subscribe({
      next: (students) => this.studentsSubject.next(students), // update everyone with new data
      error: (err) => console.error('Failed to load students:', err) // just log it if it breaks
    });
  }

  // adds a new student, then refreshes the list so it shows up right away
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student).pipe(
      tap(() => this.refreshStudents())
    );
  }

  // updates one student by id, then refreshes the list
  updateStudent(id: string, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student).pipe(
      tap(() => this.refreshStudents())
    );
  }

  // deletes a student by id, then refreshes the list
  deleteStudent(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.refreshStudents())
    );
  }
}
