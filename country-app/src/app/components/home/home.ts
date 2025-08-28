import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { Country } from '../../../models/country';
import { CountryService } from '../../../services/country';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  countries: Country[] = [];

  constructor(private countryService: CountryService, private router: Router) {}

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe({
      next: (data) => this.countries = data,
      error: (err) => console.error(err)
    });
  }

  goToDetail(name: string) {
    this.router.navigate(['/detail', name]);
  }
}
