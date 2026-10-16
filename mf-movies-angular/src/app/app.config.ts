import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { MovieRepository } from './core/domain/repositories/movie.repository';
import { MovieNodeRepositoryImpl } from './core/infrastructure/repositories/node-implementation/movie-node.repository.impl';

/**
 * Configuración global de la aplicación Angular para el microfrontend de películas.
 *
 * @remarks
 * Registra los proveedores de servicios del contenedor de Inyección de Dependencias.
 * Asocia el contrato abstracto {@link MovieRepository} con la implementación {@link MovieNodeRepositoryImpl}.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Conmutabilidad de repositorios bajo Clean Architecture
    { provide: MovieRepository, useClass: MovieNodeRepositoryImpl },

    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
