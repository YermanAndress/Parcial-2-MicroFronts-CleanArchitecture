import { appConfig } from './app.config';
import { MovieRepository } from './core/domain/repositories/movie.repository';
import { MovieNodeRepositoryImpl } from './core/infrastructure/repositories/node-implementation/movie-node.repository.impl';

describe('appConfig', () => {
  it('debería estar definido con providers', () => {
    expect(appConfig).toBeDefined();
    expect(Array.isArray(appConfig.providers)).toBe(true);
  });

  it('debería registrar MovieRepository con MovieNodeRepositoryImpl', () => {
    const provider = appConfig.providers.find(
      (p) =>
        typeof p === 'object' &&
        p !== null &&
        'provide' in p &&
        (p as { provide: unknown }).provide === MovieRepository
    ) as { provide: unknown; useClass: unknown } | undefined;

    expect(provider).toBeDefined();
    expect(provider?.useClass).toBe(MovieNodeRepositoryImpl);
  });
});
