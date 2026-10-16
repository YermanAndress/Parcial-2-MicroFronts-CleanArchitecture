import { Routes } from '@angular/router';
import { ReviewsPage } from './presentation/pages/reviews/reviews.page';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./presentation/pages/reviews/reviews.page').then((m) => m.ReviewsPage) },
];
