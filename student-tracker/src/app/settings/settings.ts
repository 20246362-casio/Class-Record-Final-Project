import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

// settings page, lets the professor change their profile and preferences
// note: this doesnt save to a database, its just stored in the component for now
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {
  // Profile
  professorName = 'Prof. Lee';
  professorEmail = 'lee@university.edu';

  // Class details
  section = 'BSIT3A';
  term = 'Term 2';
  courseCode = 'APPDEV1';

  // Grading & alerts
  passingGrade = 75;
  gradingScale: 'percentage' | 'letter' = 'percentage';

  // Notifications
  emailOnLowGrade = true;
  weeklySummaryEmail = false;
  newStudentAlert = true;

  savedMessageVisible = false; // shows saved message for a bit
  resetMessageVisible = false; // shows reset message for a bit

  // called when user hits save, just shows a lil confirmation message
  onSave(): void {
    this.savedMessageVisible = true;
    this.resetMessageVisible = false;
    setTimeout(() => {
      this.savedMessageVisible = false; 
    }, 2500);
  }

  // puts everything back to the default values
  onResetDefaults(): void {
    this.professorName = 'Prof. Lee';
    this.professorEmail = 'lee@university.edu';
    this.section = 'BSIT-3A';
    this.term = 'Term 2';
    this.courseCode = 'APPDEV1';
    this.passingGrade = 75;
    this.gradingScale = 'percentage';
    this.emailOnLowGrade = true;
    this.weeklySummaryEmail = false;
    this.newStudentAlert = true;

    this.resetMessageVisible = true;
    this.savedMessageVisible = false;
    setTimeout(() => {
      this.resetMessageVisible = false;
    }, 2500);
  }

  // makes initials from the name, like "Prof. Reyes" to "R"
  initials(name: string): string {
    return name
      .replace('Prof.', '') 
      .trim()
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0]?.toUpperCase())
      .join('');
  }
}
