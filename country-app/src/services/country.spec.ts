import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CountryService } from './country';
import { Country } from '../models/country';
import { environment } from '../environments/environment';

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;

  const mockApiResponse = [
    {
      name: 'USA',
      officialName: 'United States of America',
      nativeName: 'United States',
      capitals: ['Washington D.C.'],
      region: 'Americas',
      population: 330000000,
      flag: '🇺🇸',
      flagAlt: 'US Flag'
    },
    {
      name: 'Canada',
      officialName: 'Canada',
      nativeName: 'Canada',
      capitals: ['Ottawa'],
      region: 'Americas',
      population: 38000000,
      flag: '🇨🇦',
      flagAlt: 'Canada Flag'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryService]
    });

    service = TestBed.inject(CountryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllCountries should return mapped countries', () => {
    service.getAllCountries().subscribe((countries: Country[]) => {
      expect(countries.length).toBe(2);
      expect(countries[0].name).toBe('USA');
      expect(countries[1].capitals).toEqual(['Ottawa']);
    });

    const req = httpMock.expectOne(environment.countryApiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
  });

  it('getAllCountries should return empty array on error', () => {
    service.getAllCountries().subscribe((countries: Country[]) => {
      expect(countries.length).toBe(0);
    });

    const req = httpMock.expectOne(environment.countryApiUrl);
    req.error(new ErrorEvent('Network error'));
  });

  it('getCountryByName should return the correct country', () => {
    service.getCountryByName('USA').subscribe((country) => {
      expect(country?.name).toBe('USA');
    });

    const req = httpMock.expectOne(environment.countryApiUrl);
    req.flush(mockApiResponse);
  });

  it('getCountryByName should return undefined if name does not match', () => {
    service.getCountryByName('France').subscribe((country) => {
      expect(country).toBeUndefined();
    });

    const req = httpMock.expectOne(environment.countryApiUrl);
    req.flush(mockApiResponse);
  });

  it('getCountryByName should return undefined if name is empty', () => {
    service.getCountryByName('').subscribe((country) => {
      expect(country).toBeUndefined();
    });
  });

  it('getCountryByName should handle error gracefully', () => {
    service.getCountryByName('USA').subscribe((country) => {
      expect(country).toBeUndefined();
    });

    const req = httpMock.expectOne(environment.countryApiUrl);
    req.error(new ErrorEvent('Network error'));
  });
});
