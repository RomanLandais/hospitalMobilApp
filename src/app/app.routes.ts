import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },

  {
    path: 'consultation',
    loadComponent: () =>
      import('./feature/consultation/consultation.component').then(
        (m) => m.ConsultationComponent
      ),
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  { path: '**', redirectTo: 'home' },
];
