import { Component, OnInit } from '@angular/core';
import { PostsComponent } from "../../../shared/posts/posts.component";
import { PostService } from '../../../services/post.service';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { catchError } from 'rxjs';
import { DecendingPipe } from "../../../pipes/decending.pipe";

@Component({
    selector: 'app-feed',
    imports: [PostsComponent, DecendingPipe],
    templateUrl: './feed.component.html',
    styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit {

  constructor(
    public postService : PostService,
    private authService : AuthService,
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.getPosts()
  }
  getPostData :any
  postData : any = []
  userData : any = []

  getPosts(){
    this.getPostData = new Promise<any>((response, reject)=>{
    this.postService.getAllPosts().subscribe((res: any) => {
      this.postData = res;
      (error: any) => {
        catchError(error)
      }
      if(this.postData){
        response(this.postData)
       }else{
        reject("Error fetching posts")
       }
     }) //fetch all the posts
    })
   this.getPostData.then(()=>{
    console.log(this.postData)
    })
  }
}

