import { appConfig } from './app.config';
import { MovieRepository } from './core/domain/repositories/movie.repository';
import { MovieRepositoryImpl } from './core/infrastructure/repositories/movie.repository.impl';

describe('appConfig', () => {
  it('debería estar definido con providers', () => {
    expect(appConfig).toBeDefined();
    expect(Array.isArray(appConfig.providers)).toBe(true);
  });

  it('debería registrar MovieRepository con MovieRepositoryImpl', () => {
    const provider = appConfig.providers.find(
      (p) =>
        typeof p === 'object' &&
        p !== null &&
        'provide' in p &&
        (p as { provide: unknown }).provide === MovieRepository,
    ) as { provide: unknown; useClass: unknown } | undefined;

    expect(provider).toBeDefined();
    expect(provider?.useClass).toBe(MovieRepositoryImpl);
  });
});
