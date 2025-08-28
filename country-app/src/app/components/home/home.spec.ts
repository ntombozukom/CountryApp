import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home';
import { CountryService } from '../../../services/country';
import { Country } from '../../../models/country';
import 'zone.js';
import 'zone.js/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let countryServiceSpy: jasmine.SpyObj<CountryService>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    countryServiceSpy = jasmine.createSpyObj('CountryService', ['getAllCountries']);

    TestBed.configureTestingModule({
      imports: [
        HomeComponent,        // standalone component
        RouterTestingModule   // inject Router for navigation tests
      ],
      providers: [
        { provide: CountryService, useValue: countryServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should load countries on success', waitForAsync(() => {
    const mockCountries: Country[] = [
      { name: 'USA' } as Country,
      { name: 'Canada' } as Country
    ];
    countryServiceSpy.getAllCountries.and.returnValue(of(mockCountries));

    fixture.detectChanges(); // triggers ngOnInit

    fixture.whenStable().then(() => {
      expect(countryServiceSpy.getAllCountries).toHaveBeenCalled();
      expect(component.countries.length).toBe(2);
      expect(component.countries[0].name).toBe('USA');
    });
  }));

  it('ngOnInit should handle error gracefully', waitForAsync(() => {
    spyOn(console, 'error');
    countryServiceSpy.getAllCountries.and.returnValue(
      throwError(() => new Error('API error'))
    );

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(countryServiceSpy.getAllCountries).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith(jasmine.any(Error));
      expect(component.countries.length).toBe(0);
    });
  }));

  it('goToDetail should navigate with correct params', () => {
    spyOn(router, 'navigate');
    component.goToDetail('USA');
    expect(router.navigate).toHaveBeenCalledWith(['/detail', 'USA']);
  });
});
