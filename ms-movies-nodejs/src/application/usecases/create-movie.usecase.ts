import { CreateMovieDto, Movie } from '../../domain/models/movie.model';
import { MovieRepository } from '../../domain/repositories/movie.repository';

/**
 * Caso de uso para registrar una nueva película.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Application** y encapsula la
 * acción de negocio de crear una película a partir de los datos de
 * entrada, delegando la persistencia al contrato
 * {@link MovieRepository}.
 *
 * ❗ No conoce detalles de infraestructura.
 *
 * @see {@link MovieRepository}
 * @see {@link Movie}
 */
export class CreateMovieUseCase {
  /**
   * Crea una nueva instancia del caso de uso.
   *
   * @param movieRepository - Repositorio de películas
   */
  constructor(private readonly movieRepository: MovieRepository) {}

  /**
   * Ejecuta el caso de uso.
   *
   * @param movie - Datos de la película a crear (sin `id`)
   * @returns Promesa que resuelve la {@link Movie} creada
   *
   * @example
   * ```ts
   * const useCase = new CreateMovieUseCase(movieRepository);
   * const movie = await useCase.execute({ title: 'Inception', ... });
   * ```
   */
  execute(movie: CreateMovieDto): Promise<Movie> {
    return this.movieRepository.create(movie);
  }
}
