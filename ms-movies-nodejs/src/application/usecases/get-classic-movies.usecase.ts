import { Movie } from "../../domain/models/movie.model";
import { MovieRepository } from "../../domain/repositories/movie.repository";

/**
 * Caso de uso para obtener las películas clásicas (año < 2000).
 *
 * @remarks
 * Esta clase pertenece a la capa de Application y orquesta la consulta
 * de películas clásicas delegando la obtención en el MovieRepository.
 */
export class GetClassicMoviesUseCase {
  /**
   * Crea una instancia de GetClassicMoviesUseCase.
   *
   * @param movieRepository Repositorio abstracto de películas
   */
  constructor(private readonly movieRepository: MovieRepository) {}

  /**
   * Ejecuta la lógica del caso de uso.
   *
   * @returns Promesa con las películas con año de estreno anterior al 2000
   */
  async execute(): Promise<Movie[]> {
    return this.movieRepository.getClassics();
  }
}
