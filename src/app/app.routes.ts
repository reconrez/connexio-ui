import { Routes, RouterModule  } from '@angular/router';

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { DashboardComponent } from './layouts/pages/dashboard/dashboard.component';
import { FeedComponent } from './layouts/pages/feed/feed.component';
import { MessagesComponent } from './layouts/pages/messages/messages.component';
import { HomeComponent } from './layouts/pages/home/home.component';
import { UserProfileComponent } from './layouts/pages/user-profile/user-profile.component';
import { DiscussionPageComponent } from './layouts/pages/discussion-page/discussion-page.component';
import { ChatComponent } from './layouts/pages/messages/chat/chat.component';
import { EditProfileComponent } from './layouts/pages/user-profile/edit-profile/edit-profile.component';
import { ForumComponent } from './layouts/pages/forum/forum.component';

export const routes: Routes = [
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
      },
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
      },
      {
        path: "",
        component: DashboardComponent, // Parent component with navbar and its outlet
        children: [
          { path: "home", component: HomeComponent },
          { path: "messages", component: MessagesComponent },
          { path: "chat", component: ChatComponent },
          // { path: "explore", component: ExploreComponent },
          { path: "forum", component: ForumComponent },
          { path: "profile", component: UserProfileComponent },
          { path: "edit-profile", component: EditProfileComponent },
          { path: "", redirectTo: "home", pathMatch: "full" }, // Default route for Dashboard
        ],
      },
];
