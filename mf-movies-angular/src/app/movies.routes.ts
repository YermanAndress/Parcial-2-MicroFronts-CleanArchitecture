import { Routes } from '@angular/router';
import { MovieRepository } from './core/domain/repositories/movie.repository';
import { MovieNodeRepositoryImpl } from './core/infrastructure/repositories/node-implementation/movie-node.repository.impl';
import { MoviesPage } from './presentation/pages/movies/movies.page';

/**
 * Definición de rutas del microfrontend de películas expuestas a través de Webpack Module Federation.
 *
 * @remarks
 * Provee la configuración de rutas y asegura que el token {@link MovieRepository}
 * quede provisto con {@link MovieNodeRepositoryImpl} para cuando el microfrontend
 * sea montado de forma remota por el Host.
 */
export const MOVIES_ROUTES: Routes = [
  {
    path: '',
    component: MoviesPage,
    providers: [
      { provide: MovieRepository, useClass: MovieNodeRepositoryImpl },
    ],
  },
];

/**
 * Exportación por defecto del arreglo de rutas para consumidores de Module Federation.
 */
export const routes: Routes = MOVIES_ROUTES;
