import { Routes } from '@angular/router';
import { MoviesPage } from './presentation/pages/movies/movies.page';

/**
 * Rutas de navegación principales de la aplicación autónoma de películas.
 *
 * @remarks
 * Define el enrutamiento base para cuando el microfrontend se ejecuta de forma
 * independiente en el puerto 4202.
 */
export const routes: Routes = [
  {
    path: 'movies',
    component: MoviesPage,
  },
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'movies',
  },
];
