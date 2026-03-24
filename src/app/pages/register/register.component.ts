import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { BookingService } from '../../core/services/booking.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [style({ opacity: 0 }), animate('400ms ease-out', style({ opacity: 1 }))])
    ])
  ]
})
export class RegisterComponent {
  role            = signal<'client' | 'provider'>('client');
  firstName       = '';
  lastName        = '';
  email           = '';
  phone           = '';
  city            = '';
  serviceType     = '';
  password        = '';
  confirmPassword = '';
  agree           = false;
  loading         = signal(false);
  idDisplayName   = '';
  idFileName      = '';
  errorMsg        = signal('');

  cities       = this.bookingService.cities;
  serviceTypes = ['Electrician','Plumber','Carpenter','Painter','Aircon Technician','House Cleaner','Welder','Pest Control','Landscaper','Tiler'];

  constructor(
    private auth: AuthService,
    private router: Router,
    private bookingService: BookingService
  ) {}

  setRole(r: 'client' | 'provider'): void { this.role.set(r); }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.idDisplayName = input.files[0].name;
    }
  }

  register(): void {
    this.loading.set(true);
    this.errorMsg.set('');
    setTimeout(() => {
      if (!this.firstName || !this.email || !this.password) {
        this.loading.set(false);
        this.errorMsg.set('Please fill in all required fields.'); return;
      }
      if (this.password !== this.confirmPassword) {
        this.loading.set(false);
        this.errorMsg.set('Passwords do not match.'); return;
      }
      if (!this.agree) {
        this.loading.set(false);
        this.errorMsg.set('Please agree to the Terms of Service.'); return;
      }
      this.auth.register(this.firstName, this.email, this.role());
      this.loading.set(false);
      this.router.navigate(['/']);
    }, 1400);
  }
}
