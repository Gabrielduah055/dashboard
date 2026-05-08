import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

type NavItem = {
  label: string;
  path: string;
  icon: string;
};

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  readonly navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: 'uil uil-create-dashboard' },
    { label: 'Leads', path: '/leads', icon: 'uil uil-user' },
    { label: 'Live Chat', path: '/live-chat', icon: 'uil uil-comment-add' },
    { label: 'Settings', path: '/settings', icon: 'uil uil-setting' }
  ];
}
