import { Movie } from '../../domain/models/movie.model';
import { MovieRepository } from '../../domain/repositories/movie.repository';

/**
 * Caso de uso para obtener el listado de películas.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Application** y representa una
 * **regla de negocio de la aplicación**. Su responsabilidad es
 * orquestar la obtención del listado de películas delegando el acceso
 * a datos al contrato {@link MovieRepository}.
 *
 * ❗ No conoce detalles de infraestructura.
 *
 * @see {@link MovieRepository}
 * @see {@link Movie}
 */
export class GetAllMoviesUseCase {
  /**
   * Crea una nueva instancia del caso de uso.
   *
   * @param movieRepository - Repositorio de películas
   */
  constructor(private readonly movieRepository: MovieRepository) {}

  /**
   * Ejecuta el caso de uso.
   *
   * @returns Promesa que resuelve un arreglo de {@link Movie}
   *
   * @example
   * ```ts
   * const useCase = new GetAllMoviesUseCase(movieRepository);
   * const movies = await useCase.execute();
   * ```
   */
  execute(): Promise<Movie[]> {
    return this.movieRepository.getAll();
  }
}
