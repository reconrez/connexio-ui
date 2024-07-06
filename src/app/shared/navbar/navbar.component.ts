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
    return "Connexio";
  }

  darkModeToggle(){
    this.darkMode = !this.darkMode;
    const body = document.body as HTMLElement
    if(this.darkMode){
      body.setAttribute('data-bs-theme', 'dark')
    }else{
      body.setAttribute('data-bs-theme', 'light')
    }
  }

}
