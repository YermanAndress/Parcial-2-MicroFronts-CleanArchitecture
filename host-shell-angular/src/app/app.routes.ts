import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  {
    path: 'authors',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './AuthorsPage',
      }).then((m) => m.AuthorsPage),
  },
  {
    path: 'movies',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './MoviesPage',
      }).then((m) => m.MoviesPage),
  },
  {
    path: 'reviews',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        exposedModule: './ReviewsPage',
      }).then((m) => m.ReviewsPage),
  },
  { path: '**', redirectTo: 'authors' },
];
