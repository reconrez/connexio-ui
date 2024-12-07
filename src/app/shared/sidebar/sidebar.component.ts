import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/Home",
    title: "Home",
    icon: "icon-chart-pie-36"
  },
  {
    path: "/explore",
    title: "Explore",
    icon: "icon-chart-pie-36"
  },
  {
    path: "/messages",
    title: "Messages",
    icon: "icon-chart-pie-36"
  },
  {
    path: "/notifications",
    title: "Notifications",
    icon: "icon-chart-pie-36"
  },
  {
    path: "/connections",
    title: "Connections",
    icon: "icon-chart-pie-36"
  },
  {
    path: "/forum",
    title: "Forum",
    icon: "icon-chart-pie-36"
  },
  {
    path: "/user",
    title: "Profile",
    icon: "icon-single-02"
  },
  {
    path: "/tokens",
    title: "Tokens",
    icon: "icon-single-02"
  }
];

@Component({
    selector: 'app-sidebar',
    imports: [NgFor, RouterLink],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems: any[] = []

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
