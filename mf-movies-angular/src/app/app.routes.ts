import { Routes } from '@angular/router';

/**
 * Definición de las rutas del microfrontend de películas.
 *
 * @remarks
 * La ruta raíz carga de forma perezosa `MoviesPage`, que es el
 * componente expuesto a través de Module Federation.
 *
 * @see {@link MoviesPage}
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/movies/movies.page').then((m) => m.MoviesPage),
  },
];
