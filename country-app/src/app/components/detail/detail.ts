import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CountryService } from '../../../services/country';
import { Country } from '../../../models/country';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail.html',
  styleUrls: ['./detail.scss']
})
export class DetailComponent implements OnInit {
  country?: Country;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.countryService.getCountryByName(name).subscribe({
        next: (c) => {
          this.country = c;
          this.loading = false;
          this.error = !c;
        },
        error: () => {
          this.loading = false;
          this.error = true;
        }
      });
    } else {
      this.loading = false;
      this.error = true;
    }
  }

  goBack(): void {
    this.router.navigate(['/']); // navigate to home
  }
}
