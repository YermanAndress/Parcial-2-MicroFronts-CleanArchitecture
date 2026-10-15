import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { MovieRepository } from './core/domain/repositories/movie.repository';
import { MovieRepositoryImpl } from './core/infrastructure/repositories/movie.repository.impl';
import { routes } from './app.routes';

/**
 * Configuración principal de la aplicación Angular.
 *
 * @remarks
 * Define los *providers* globales utilizados en el arranque de la
 * aplicación. Incluye el enrutamiento, el cliente HTTP y el registro del
 * contrato {@link MovieRepository} con su implementación de
 * infraestructura.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Clean Architecture: el dominio define el contrato, infraestructura lo implementa.
    { provide: MovieRepository, useClass: MovieRepositoryImpl },

    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
