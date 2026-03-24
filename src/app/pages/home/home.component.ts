import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(50, [
            animate('400ms cubic-bezier(0.165, 0.84, 0.44, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class HomeComponent {
  searchTerm = '';

  constructor(private router: Router) {}

  serviceCategories = [
    { icon: '⚡', name: 'Electrical',      count: 124 },
    { icon: '🔧', name: 'Plumbing',         count: 98  },
    { icon: '🪚', name: 'Carpentry',        count: 76  },
    { icon: '🖌️', name: 'Painting',         count: 64  },
    { icon: '❄️', name: 'Aircon',           count: 112 },
    { icon: '🧹', name: 'Cleaning',         count: 89  },
    { icon: '🔥', name: 'Welding',          count: 43  },
    { icon: '🐛', name: 'Pest Control',     count: 57  },
    { icon: '🌿', name: 'Landscaping',      count: 35  },
    { icon: '🛁', name: 'Tiling',           count: 48  },
    { icon: '🔩', name: 'Masonry',          count: 31  },
    { icon: '📺', name: 'Appliance Repair', count: 67  },
  ];

  steps = [
    { num: '1', title: 'Search & Browse',  desc: 'Find verified service professionals in your area of Pampanga.' },
    { num: '2', title: 'Book Online',       desc: 'Choose your schedule, describe the job, and confirm instantly.' },
    { num: '3', title: 'Pay Securely',      desc: 'Pay via GCash or Maya. Funds held in escrow until work is done.' },
    { num: '4', title: 'Rate & Review',     desc: 'After the job, rate your provider to help the community.' },
  ];

  onSearch(): void {
    this.router.navigate(['/listings'], { queryParams: { search: this.searchTerm } });
  }

  go(path: string): void { this.router.navigate([path]); }
}
