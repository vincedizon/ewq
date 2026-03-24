import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'listings',
    loadComponent: () => import('./pages/listings/listings.component').then(m => m.ListingsComponent)
  },
  {
    path: 'provider-profile',
    loadComponent: () => import('./pages/provider-profile/provider-profile.component').then(m => m.ProviderProfileComponent)
  },
  {
    path: 'booking',
    loadComponent: () => import('./pages/booking/booking.component').then(m => m.BookingComponent),
    canActivate: [authGuard]
  },
  {
    path: 'payment',
    loadComponent: () => import('./pages/payment/payment.component').then(m => m.PaymentComponent),
    canActivate: [authGuard]
  },
  {
    path: 'bookings',
    loadComponent: () => import('./pages/bookings/bookings.component').then(m => m.BookingsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'ratings',
    loadComponent: () => import('./pages/ratings/ratings.component').then(m => m.RatingsComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [authGuard, adminGuard]
  },
  { path: '**', redirectTo: '' }
];
