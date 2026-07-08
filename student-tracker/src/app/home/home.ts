import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';

// this is the homepage / dashboard, shows quick stats about the class
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private studentService = inject(StudentService); // get the shared student data

  students: Student[] = [];

  ngOnInit(): void {
    // whenever the student list changes anywhere, this updates too
    this.studentService.students$.subscribe(data => {
      this.students = data;
    });
    this.studentService.refreshStudents(); // go get the latest data on load
  }

  // average grade of the whole class, rounded to 1 decimal
  get classAverage(): number {
    if (this.students.length === 0) {
      return 0; // avoid dividing by zero if theres no students yet
    }
    const total = this.students.reduce((sum, s) => sum + s.grade, 0);
    return Math.round((total / this.students.length) * 10) / 10;
  }

  // how many students are passing (75 and above)
  get passingCount(): number {
    return this.students.filter(s => s.grade >= 75).length;
  }

  // last 4 students added, newest one first
  get recentStudents(): Student[] {
    return this.students.slice(-4).reverse();
  }

  // students who need attention cuz their grade is below passing
  get attentionStudents(): Student[] {
    return this.students.filter(s => s.grade < 75);
  }

  // turns a full name into initials, like "Nathan Cruz" -> "NC"
  initials(name: string): string {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0]?.toUpperCase())
      .join('');
  }
}
