import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  darkMode : boolean = false;

  getTitle = () => {
    return "Dashboard";
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
