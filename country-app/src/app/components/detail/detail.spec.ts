import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailComponent } from './detail';
import { CountryService } from '../../../services/country';
import { Country } from '../../../models/country';
import 'zone.js';
import 'zone.js/testing';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let countryServiceSpy: jasmine.SpyObj<CountryService>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    countryServiceSpy = jasmine.createSpyObj('CountryService', ['getCountryByName']);

    TestBed.configureTestingModule({
      imports: [DetailComponent, RouterTestingModule],
      providers: [
        { provide: CountryService, useValue: countryServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'USA' } } } }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(DetailComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should load country on success', waitForAsync(() => {
    const mockCountry: Country = {
      name: 'USA',
      officialName: 'United States of America',
      nativeName: 'United States',
      capitals: ['Washington D.C.'],
      region: 'Americas',
      population: 330000000,
      flag: '🇺🇸'
    };

    countryServiceSpy.getCountryByName.and.returnValue(of(mockCountry));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(countryServiceSpy.getCountryByName).toHaveBeenCalledWith('USA');
      expect(component.country).toEqual(mockCountry);
      expect(component.loading).toBeFalse();
      expect(component.error).toBeFalse();
    });
  }));

  it('ngOnInit should handle API error', waitForAsync(() => {
    countryServiceSpy.getCountryByName.and.returnValue(throwError(() => new Error('API error')));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.loading).toBeFalse();
      expect(component.error).toBeTrue();
      expect(component.country).toBeUndefined();
    });
  }));

  it('goBack should navigate to home', () => {
    spyOn(router, 'navigate');
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});

// --- Separate suite for missing param ---
describe('DetailComponent with missing param', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let countryServiceSpy: jasmine.SpyObj<CountryService>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    countryServiceSpy = jasmine.createSpyObj('CountryService', ['getCountryByName']);

    TestBed.configureTestingModule({
      imports: [DetailComponent, RouterTestingModule],
      providers: [
        { provide: CountryService, useValue: countryServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(DetailComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
    });
  }));

  it('ngOnInit should handle missing param', () => {
    fixture.detectChanges();
    expect(component.loading).toBeFalse();
    expect(component.error).toBeTrue();
    expect(component.country).toBeUndefined();
  });
});
