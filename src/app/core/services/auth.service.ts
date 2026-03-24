import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User>({ name: '', email: '', role: 'client', loggedIn: false });

  readonly user   = this._user.asReadonly();
  readonly isAdmin    = computed(() => this._user().loggedIn && this._user().role === 'admin');
  readonly isLoggedIn = computed(() => this._user().loggedIn);
  readonly userName   = computed(() => this._user().name);
  readonly userRole   = computed(() => this._user().role);

  /** Returns true on success */
  login(email: string, password: string): boolean {
    if (email === 'admin@serviko.ph' && password === 'admin123') {
      this._user.set({ name: 'Admin', email, role: 'admin', loggedIn: true });
      return true;
    }
    if (email === 'user@serviko.ph' && password === 'user123') {
      this._user.set({ name: 'Juan', email, role: 'client', loggedIn: true });
      return true;
    }
    return false;
  }

  register(firstName: string, email: string, role: 'client' | 'provider'): void {
    this._user.set({ name: firstName, email, role, loggedIn: true });
  }

  logout(): void {
    this._user.set({ name: '', email: '', role: 'client', loggedIn: false });
  }
}
