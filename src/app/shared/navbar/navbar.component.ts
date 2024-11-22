import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  darkMode : boolean = false;

  constructor(private router: Router, private location : Location) {}

  navigateTo(route: string): void {
    this.router.navigate([route]); // Navigate to the specified route
  }
  getTitle = () => {
    return "Dashboard";
  }

  goBack(): void {
    this.location.back(); // Navigates to the previous page in history
  }

  darkModeToggle() {
    this.darkMode = !this.darkMode;
  
    const body = document.body as HTMLElement;
    const darkMode = document.getElementById('darkModeButton')
    body.setAttribute('data-bs-theme', this.darkMode ? 'dark' : 'light');
      if (this.darkMode) {
        darkMode?.classList.remove('fa-mountain-sun')
        darkMode?.classList.add('fa-moon')
      } else {
        darkMode?.classList.remove('fa-moon')
        darkMode?.classList.add('fa-mountain-sun')
      }

  }

}
