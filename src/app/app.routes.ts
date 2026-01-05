import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'admin',
    canActivateChild: [authGuard],
    loadComponent: () =>
      import('./layout/admin-layout/admin-layout.component').then(
        (m) => m.AdminLayoutComponent
      ),
    children: [
      // {
      //   path: '',
      //   loadComponent: () =>
      //     import('./features/dashboard/dashboard.component').then(
      //       (m) => m.DashboardComponent
      //     ),
      // },
    ],
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'admin',
  },
];
