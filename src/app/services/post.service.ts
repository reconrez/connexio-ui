import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}
  postList = []
  createPost(post: any){
    console.log(post);
    return this.http.post<any>(`${this.baseUrl}/post`, post)
    .subscribe((res: any) => {
      console.log(res);
      this.getAllPosts();
      (error: any) => {
        catchError(this.handleError)
      }
    })
  }

  getAllPosts() {
    return this.http.get<any[]>(`${this.baseUrl}/posts`)
  }

  getPostById(id: string): Observable<any | null> {
    return this.http.get<any>(`${this.baseUrl}/post/:${id}`)
      .pipe(
        catchError(this.handleError),
        (post => post || null) // Handle cases where the post may not exist
      );
  }

  updatePost(id: string, post: any): Observable<any | null> {
    return this.http.put<any>(`${this.baseUrl}/post/${id}`, post)
      .pipe(
        catchError(this.handleError),
        map((post: any) => post || null) // Handle cases where the update may fail
      );
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/post/:${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createComment(comment: any){
    console.log(`${this.baseUrl}/comment`);
    return this.http.post<any>(`${this.baseUrl}/comment`, comment)
    .subscribe((res: any) => {
      console.log(res);
      (error: any) => {
        catchError(this.handleError)
      }
    })
  }

  getAllComments(post_id: any) {
    console.log(post_id)
    return this.http.post<any[]>(`${this.baseUrl}/comments`, {post_id: post_id})
    
  }

  deleteComment(id: string): Observable<void> {
    console.log(`${this.baseUrl}/comment/${id}`);
    return this.http.delete<void>(`${this.baseUrl}/comment/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something went wrong. Please try again later.');
  }
}
