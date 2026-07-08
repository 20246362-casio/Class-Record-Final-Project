import { Component, inject, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';

// this page shows charts and stats about how the class is doing
@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports implements OnInit {
  private studentService = inject(StudentService);

  students: Student[] = [];

  ngOnInit(): void {
    this.studentService.students$.subscribe(data => {
      this.students = data;
    });
    this.studentService.refreshStudents();
  }

  // average grade of everyone, rounded nicely
  get classAverage(): number {
    if (this.students.length === 0) {
      return 0;
    }
    const total = this.students.reduce((sum, s) => sum + s.grade, 0);
    return Math.round((total / this.students.length) * 10) / 10;
  }

  // count of students passing (75+)
  get passingCount(): number {
    return this.students.filter(s => s.grade >= 75).length;
  }

  // count of students failing (below 75)
  get failingCount(): number {
    return this.students.filter(s => s.grade < 75).length;
  }

  // student with the highest grade
  get topStudent(): Student | null {
    if (this.students.length === 0) {
      return null;
    }
    return this.students.reduce((top, s) => (s.grade > top.grade ? s : top), this.students[0]);
  }

  // student with the lowest grade
  get lowestStudent(): Student | null {
    if (this.students.length === 0) {
      return null;
    }
    return this.students.reduce((low, s) => (s.grade < low.grade ? s : low), this.students[0]);
  }

  // groups students into grade ranges (brackets) so we can make
  // that simple bar chart showing how many students are in each range
  get bracketCounts(): { label: string; count: number; className: string }[] {
    const brackets = [
      { label: '90 - 100', min: 90, max: 100, className: 'pass' },
      { label: '85 - 89', min: 85, max: 89, className: 'pass' },
      { label: '75 - 84', min: 75, max: 84, className: 'warn' },
      { label: 'Below 75', min: 0, max: 74, className: 'fail' }
    ];

    return brackets.map(b => ({
      label: b.label,
      className: b.className,
      count: this.students.filter(s => s.grade >= b.min && s.grade <= b.max).length
    }));
  }

  // biggest bracket count, used so the bars scale correctly (dont wanna divide by 0)
  get maxBracketCount(): number {
    const counts = this.bracketCounts.map(b => b.count);
    return Math.max(1, ...counts);
  }

  // turns a count into a percent width for the bar chart css
  barWidth(count: number): number {
    return Math.round((count / this.maxBracketCount) * 100);
  }
}
