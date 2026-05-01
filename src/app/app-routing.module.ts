import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './guest.guard';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  // Public Routes loaded via PublicModule
  {
    path: '',
    loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule)
  },

  // Lazy-loaded Admin Module
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: { requiredRole: 'admin' }
  },

  // Lazy-loaded Student Module
  {
    path: 'student',
    loadChildren: () => import('./modules/student/student.module').then(m => m.StudentModule),
    canActivate: [AuthGuard],
    data: { requiredRole: 'student' }
  },

  // Lazy-loaded Trainer Module
  {
    path: 'trainer',
    loadChildren: () => import('./modules/trainer/trainer.module').then(m => m.TrainerModule),
    canActivate: [AuthGuard],
    data: { requiredRole: 'trainer' }
  },

  // Standalone route for SetupProfileComponent (shared between student & trainer)
  {
    path: 'setup-profile',
    canActivate: [AuthGuard],
    loadComponent: () => import('./setup-profile/setup-profile.component').then(m => m.SetupProfileComponent)
  },

  // Legacy redirects
  { path: 'login', redirectTo: '' },
  { path: 'landing-page', redirectTo: '' },
  { path: 'admin-panel', redirectTo: '/admin' },
  { path: 'student-dashboard', redirectTo: '/student' },
  { path: 'trainer-dashboard', redirectTo: '/trainer' },

  // Wildcard
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }