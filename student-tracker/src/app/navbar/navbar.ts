import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

// simple top navbar, shows the links and the professor name
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  professorName = 'Prof. Lee'; // hardcoded for now, could come from login later
}
