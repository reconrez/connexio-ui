import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-user-profile',
    imports: [RouterLink],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  constructor(private authService: AuthService) {}

  logout(){
    this.authService.logout()
  }

}
