import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { DetailComponent } from './components/detail/detail';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detail/:name', component: DetailComponent },
  { path: '**', redirectTo: '' }
];
