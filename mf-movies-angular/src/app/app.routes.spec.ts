import { routes } from './app.routes';
import { MoviesPage } from './presentation/pages/movies/movies.page';

describe('app.routes', () => {
  it('debería exponer la carga perezosa de MoviesPage en la raíz', async () => {
    const route = routes.find((r) => r.path === '');
    expect(route).toBeDefined();

    const loaded = await (
      route?.loadComponent as () => Promise<unknown>
    )();
    expect(loaded).toBe(MoviesPage);
  });
});
