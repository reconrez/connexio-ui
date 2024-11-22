import { Component } from '@angular/core';
import { FeedComponent } from "../feed/feed.component";
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { CreatePostsComponent } from "../../../shared/create-posts/create-posts.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FeedComponent, SidebarComponent, CreatePostsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
