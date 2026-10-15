import { Movie } from '../../domain/models/movie.model';
import { MovieRepository } from '../../domain/repositories/movie.repository';

/**
 * Caso de uso para obtener una película por su identificador.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Application** y encapsula la
 * acción de negocio de recuperar una película específica por su `id`.
 *
 * ❗ No conoce detalles de infraestructura.
 *
 * @see {@link MovieRepository}
 * @see {@link Movie}
 */
export class GetMovieByIdUseCase {
  /**
   * Crea una nueva instancia del caso de uso.
   *
   * @param movieRepository - Repositorio de películas
   */
  constructor(private readonly movieRepository: MovieRepository) {}

  /**
   * Ejecuta el caso de uso.
   *
   * @param id - Identificador único de la película
   * @returns Promesa que resuelve la {@link Movie} o `undefined`
   * si no existe
   *
   * @example
   * ```ts
   * const useCase = new GetMovieByIdUseCase(movieRepository);
   * const movie = await useCase.execute(1);
   * ```
   */
  execute(id: number): Promise<Movie | undefined> {
    return this.movieRepository.getById(id);
  }
}
