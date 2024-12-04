import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  baseUrl: string = environment.API_BASE_URL;
  userId: string | null = null
  getUserId(): string | null {
    const currentUser = localStorage.getItem('current_user')
    if (currentUser) {
      this.userId = JSON.parse(currentUser)
    } else {
      return null
    }
    return this.userId
  }


  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, public router: Router) {}


  login(username: string, password: string) {
    console.log("Login Console Request", username, password);
    return this.http.post<any>(`${this.baseUrl}/auth/login`, { username, password })
      .subscribe((res: any) => {
        var currentUser = {
          _id: res._id,
          user_id: res.user_id,
          username: res.username,
          profilePicture: res.profilePicture,
          email: res.email,
          role: res.role
        }
        localStorage.setItem('access_token', JSON.stringify(res.access_token));
        localStorage.setItem('current_user', JSON.stringify(currentUser));
        console.log(res)
        this.router.navigate(['/home']);
      });
  }

  logout() {
    var access_token = localStorage.getItem('access_token')
    // Clear local authentication state
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');

    // Update authentication state observable
    this.isAuthenticatedSubject.next(false);

    // Handle client-side cookie clearing (if necessary)
    if (document.cookie) {
      const cookies = document.cookie.split(';');
      cookies.forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      });
    }

    // Redirect to login page
    this.router.navigate(['/login']);
  }  
  
  
  // logout() {
  //   var access_token = localStorage.getItem('access_token')
  //   return this.http.post<any>(`${this.baseUrl}/auth/logout`,{ access_token })
  //     .subscribe((res: any) => {
  //       // Clear local authentication state
  //       localStorage.removeItem('access_token');
  //       localStorage.removeItem('current_user');

  //       // Update authentication state observable
  //       this.isAuthenticatedSubject.next(false);

  //       // Handle client-side cookie clearing (if necessary)
  //       if (document.cookie) {
  //         const cookies = document.cookie.split(';');
  //         cookies.forEach(cookie => {
  //           const eqPos = cookie.indexOf('=');
  //           let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
  //           document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  //         });
  //       }

  //       // Redirect to login page
  //       this.router.navigate(['/login']);
  //     });
  // }

  handleMissingToken() {
    // Clear any potential tokens or user data
    localStorage.removeItem('access_token');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']); // Redirect to login page
  }

  testDiscussions(){
    console.log("testDiscussions")
    console.log(`${this.baseUrl}/testing/createDiscussion`)
    console.log("Ye wala")
    // return this.http.get<any>(`${this.baseUrl}/testing/createDiscussion`, {})
    // .subscribe((res: any) => {
    //   console.log(`Login Service Console Response ${res}`);
    // });
  }

  register(user: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, user).subscribe((res: any) => {
      console.log(`Login Service Console Response ${res}`);
      var currentUser = {
        user_id: res.user_id, 
        username: res.username,
        profilePicture: res.profilePicture,
        email: res.email,
        role: res.role
      }
      localStorage.setItem('access_token', JSON.stringify(res.access_token));
      localStorage.setItem('current_user', JSON.stringify(currentUser));
      // this.router.navigate(['home/' + res]);
    });
  }
}
