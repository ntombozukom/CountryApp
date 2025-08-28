import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, catchError, of } from 'rxjs';
import { Country } from '../models/country';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl = environment.countryApiUrl;

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<Country[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(countries => countries.map(c => ({
        name: c.name || 'N/A',
        officialName: c.officialName || 'N/A',
        nativeName: c.nativeName || 'N/A',
        capitals: c.capitals && c.capitals.length ? c.capitals : ['N/A'],
        region: c.region || 'N/A',
        population: c.population || 0,
        flag: c.flag || '',
        flagAlt: c.flagAlt || ''
      }))),
      catchError(error => {
        console.error('Error fetching all countries:', error);
        return of([] as Country[]);
      })
    );
  }

  getCountryByName(name: string): Observable<Country | undefined> {
    if (!name) return of(undefined);

    return this.getAllCountries().pipe(
      map(countries => countries.find(c => c.name.toLowerCase() === name.toLowerCase())),
      catchError(error => {
        console.error(`Error fetching country by name "${name}":`, error);
        return of(undefined);
      })
    );
  }
}