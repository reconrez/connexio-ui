import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpHandlerFn
} from '@angular/common/http';
import { catchError, Observable,   
 tap, 
 throwError} from 'rxjs';
import { AuthService } from '../services/auth.service';

// export class LoggingInterceptor implements HttpInterceptor   
//  {
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     console.log("============================");   

//     const clonedReq = req.clone(); // Create a clone of the request

//     return next.handle(clonedReq).pipe(
//       tap(event => {
//         if (event instanceof HttpResponse) {
//           console.log(req.url, 'returned a response with status', event.status);
//         }
//       })
//     );
//   }
// }

export const authTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  console.log('Auth Token Interceptor: Processing request', req.url)

  const authService = inject(AuthService)
  const accessToken = localStorage.getItem('access_token')

  if (accessToken) {
    console.log('Auth Token Interceptor: Access token found, adding to headers')
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
  } else if (!req.url.includes('login') && !req.url.includes('register')) {
    console.log('Auth Token Interceptor: Access token not found for protected route')
    authService.handleMissingToken()
    return throwError(() => new Error('Access token not found'))
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('Auth Token Interceptor: Error occurred', error.status)
      if (error.status === 401) {
        console.log('Auth Token Interceptor: Unauthorized error, handling missing token')
        authService.handleMissingToken()
      }
      return throwError(() => error)
    })
  )
}


























// ==========================================================================================================================
// export const authTokenInterceptor: HttpInterceptorFn = (req : HttpRequest<unknown>, next) => {
//   const authService = inject(AuthService);

//   console.log("interceptors");
//   const accessToken = localStorage.getItem("access_token");

//   if (accessToken) {
//     req = req.clone({
//       setHeaders: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//   } else if (!req.url.includes("login") && !req.url.includes("register")) {
//     authService.handleMissingToken();
//     console.log("token not found");
//     return throwError(() => new Error("Access token not found"));
//   }

//   return next(req).pipe(
//     catchError((error: HttpErrorResponse) => {
//       if (error.status === 401) {
//         // Handle unauthorized error (e.g., log out, redirect to login)
//         authService.handleMissingToken();
//       }
//       return throwError(() => error);
//     })
//   );
// };


// Changes made:
// 1. Simplified error handling by removing redundant conditions
// 2. Combined login and register conditions to reduce code duplication
// 3. Removed unnecessary else-if statement
// 4. Improved error throwing by using new Error() instead of a string
// 5. Removed unnecessary comments
// 6. Improved code structure and readability


// export const authTokenInterceptorProvider = {
//   provide: HTTP_INTERCEPTORS,
//   useFactory: () => ({
//     intercept: authTokenInterceptor
//   }),
//   multi: true
// }