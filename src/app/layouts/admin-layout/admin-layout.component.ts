import { Component } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../pages/user-profile/user-profile.component';
import { TokensComponent } from '../pages/tokens/tokens.component';
import { FeedComponent } from '../pages/feed/feed.component';
import { CreatePostsComponent } from '../../shared/create-posts/create-posts.component';
import { AdvertsComponent } from '../../shared/adverts/adverts.component';
import { PostsComponent } from '../../shared/posts/posts.component';
import { ForumComponent } from '../pages/forum/forum.component';
import { MessagesComponent } from '../pages/messages/messages.component';
import { HomeComponent } from '../pages/home/home.component';
import { NotificationsComponent } from '../pages/notifications/notifications.component';

const adminDashboardRoutes : Routes = [
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'users', component: UserProfileComponent
  },
  {
    path: 'tokens', component: TokensComponent
  },
  {
    path: 'feed', component: FeedComponent
  },
  {
    path: 'create-posts', component: CreatePostsComponent
  },
  {
    path: 'adverts', component: AdvertsComponent
  },
  {
    path: 'posts', component: PostsComponent
  },
  {
    path: 'forum', component: ForumComponent
  },
  {
    path: 'messages', component: MessagesComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'notifications', component: NotificationsComponent
  }
]

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterModule
    // RouterModule.forChild(adminDashboardRoutes)
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})


export class AdminLayoutComponent {

}
