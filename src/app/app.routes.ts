import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('@features/dashboard/dashboard.component').then((m) => m.DashboardComponent)
  },
  {
    path: 'leads',
    loadComponent: () => import('@features/leads/leads.component').then((m) => m.LeadsComponent)
  },
  {
    path: 'live-chat',
    loadComponent: () => import('@features/live-chat/live-chat.component').then((m) => m.LiveChatComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('@features/settings/settings.component').then((m) => m.SettingsComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
