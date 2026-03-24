import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProviderService } from '../../core/services/provider.service';
import { Provider } from '../../core/models/provider.model';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css'],
  animations: [
    trigger('cardStagger', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(15px)' }),
          stagger(80, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ListingsComponent {
  search       = signal('');
  selectedCats = signal<Record<string,boolean>>({});
  minRating    = signal(0);
  maxRate      = signal(3000);
  verifiedOnly = signal(false);
  sortBy       = signal('rating');

  categories = ['Electrician','Plumber','Carpenter','Painter','Aircon Technician','House Cleaner','Welder','Pest Control'];

  providers = this.providerService.providers;

  filteredProviders = computed(() => {
    const s  = this.search().toLowerCase();
    const cats = Object.keys(this.selectedCats()).filter(k => this.selectedCats()[k]);
    return this.providers.filter(p => {
      if (cats.length && !cats.includes(p.service)) return false;
      if (s && !p.name.toLowerCase().includes(s) && !p.service.toLowerCase().includes(s)) return false;
      if (p.rating < this.minRating()) return false;
      if (p.rate > this.maxRate()) return false;
      if (this.verifiedOnly() && !p.verified) return false;
      return true;
    }).sort((a, b) => {
      if (this.sortBy() === 'rating') return b.rating - a.rating;
      if (this.sortBy() === 'rate')   return a.rate - b.rate;
      return a.name.localeCompare(b.name);
    });
  });

  constructor(private providerService: ProviderService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['search']) this.search.set(params['search']);
    });
  }

  toggleCat(cat: string): void {
    this.selectedCats.update(c => ({ ...c, [cat]: !c[cat] }));
  }

  clearFilters(): void {
    this.search.set(''); this.selectedCats.set({});
    this.minRating.set(0); this.maxRate.set(3000); this.verifiedOnly.set(false);
  }

  viewProvider(p: Provider): void {
    this.providerService.select(p);
    this.router.navigate(['/provider-profile']);
  }

  updateSearch(v: string):  void { this.search.set(v); }
  updateMaxRate(v: number): void { this.maxRate.set(v); }
  updateRating(v: number):  void { this.minRating.set(v); }
  updateSort(v: string):    void { this.sortBy.set(v); }
  toggleVerified():         void { this.verifiedOnly.update(v => !v); }
}
