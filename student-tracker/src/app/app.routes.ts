import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Students } from './students/students';
import { Reports } from './reports/reports';
import { Settings } from './settings/settings';

// this is basically the map of our app
// tells angular which page to show for which url
export const routes: Routes = [
  { path: '', component: Home },           // homepage / dashboard
  { path: 'students', component: Students }, // page to view/add/edit students
  { path: 'reports', component: Reports },   // page with the grade charts
  { path: 'settings', component: Settings }  // page to change profile/settings
];
