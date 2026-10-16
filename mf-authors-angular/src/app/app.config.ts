import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthorRepository } from './core/domain/repositories/author.repository';
import { AuthorRepositoryImpl } from './core/infrastructure/repositories/author.repository.impl';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: AuthorRepository, useClass: AuthorRepositoryImpl },
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
