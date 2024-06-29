import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public router: Router) { }

  handleMissingToken() {
    // Clear any potential tokens or user data
    localStorage.removeItem('access_token');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']); // Redirect to login page
  }
}
