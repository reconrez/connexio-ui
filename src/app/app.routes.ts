import { Routes, RouterModule  } from '@angular/router';

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { DashboardComponent } from './layouts/pages/dashboard/dashboard.component';

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
        path: "dashboard",
        component: DashboardComponent,
      },
      // {
      //   path: "**",
      //   component: NotFoundComponent,
      // }
//child routes defined in layouts/admin-layout 
];
