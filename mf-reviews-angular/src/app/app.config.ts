import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ReviewRepository } from './core/domain/repositories/review.repository';
import { ReviewRepositoryImpl } from './core/infrastructure/repositories/review.repository.impl';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ReviewRepository, useClass: ReviewRepositoryImpl },
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
