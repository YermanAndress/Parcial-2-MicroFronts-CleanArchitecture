import { Routes } from '@angular/router';
import { AuthorsPage } from './presentation/pages/authors/authors.page';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./presentation/pages/authors/authors.page').then((m) => m.AuthorsPage) },
];
