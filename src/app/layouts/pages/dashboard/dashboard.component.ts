import { Component } from '@angular/core';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";
import { HomeComponent } from "../home/home.component";
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { NotificationCardsComponent } from "../../../shared/notification-cards/notification-cards.component";
import { NgFor } from '@angular/common';
import { RightSidebarComponent } from "../../../shared/right-sidebar/right-sidebar.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [NgFor, NavbarComponent, HomeComponent, SidebarComponent, NotificationCardsComponent, RightSidebarComponent]
})
export class DashboardComponent {
    screenRoutes = [
        {
            pageName: "Explore",
            route:"/explore"
        },
        {
            pageName: "Messages",
            route:"/messages"
        },
        {
            pageName: "Notification",
            route:"/notifications"
        },
        {
            pageName: "Connections",
            route:"/connections"
        },
        {
            pageName: "Forum",
            route:"/forum"
        },
        {
            pageName: "Profile",
            route:"/profile"
        },
        {
            pageName: "Tokens",
            route:"/tokens"
        }
        
    ]
}
