import { routes } from './app.routes';
import { MoviesPage } from './presentation/pages/movies/movies.page';

describe('app.routes', () => {
  it('debería definir la ruta principal /movies hacia MoviesPage', () => {
    const route = routes.find((r) => r.path === 'movies');
    expect(route).toBeDefined();
    expect(route?.component).toBe(MoviesPage);
  });

  it('debería redirigir la ruta raíz vacía hacia /movies', () => {
    const defaultRoute = routes.find((r) => r.path === '');
    expect(defaultRoute).toBeDefined();
    expect(defaultRoute?.redirectTo).toBe('movies');
    expect(defaultRoute?.pathMatch).toBe('full');
  });

  it('debería redirigir cualquier ruta desconocida (wildcard **) hacia /movies', () => {
    const wildcardRoute = routes.find((r) => r.path === '**');
    expect(wildcardRoute).toBeDefined();
    expect(wildcardRoute?.redirectTo).toBe('movies');
  });
});
