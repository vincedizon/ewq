import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [style({ opacity: 0 }), animate('400ms ease-out', style({ opacity: 1 }))])
    ])
  ]
})
export class LoginComponent {
  email    = '';
  password = '';
  remember = false;
  loading  = signal(false);
  errorMsg  = signal('');

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    this.loading.set(true);
    this.errorMsg.set('');
    setTimeout(() => {
      if (!this.email || !this.password) {
        this.loading.set(false);
        this.errorMsg.set('Please enter your email and password.');
        return;
      }
      const ok = this.auth.login(this.email, this.password);
      this.loading.set(false);
      if (ok) {
        this.router.navigate([this.auth.isAdmin() ? '/admin' : '/']);
      } else {
        this.errorMsg.set('Invalid email or password. Use demo: admin@serviko.ph/admin123 or user@serviko.ph/user123');
      }
    }, 1200);
  }
}
