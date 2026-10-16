import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

/**
 * Rutas principales de la aplicación Host Shell (Client-Host-Angular, puerto 4200).
 *
 * @remarks
 * Integra los tres microfrontends remotos a través de Webpack Module Federation:
 * - Authors MFE en http://localhost:4201
 * - Movies MFE (moviesMfe) en http://localhost:4202 (consumiendo ms-movies-nodejs en el puerto 3003)
 * - Reviews MFE en http://localhost:4203
 */
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
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './routes',
      }).then((m) => m.routes),
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
