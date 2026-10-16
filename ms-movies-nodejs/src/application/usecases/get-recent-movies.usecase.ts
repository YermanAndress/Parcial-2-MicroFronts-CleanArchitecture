import { Movie } from "../../domain/models/movie.model";
import { MovieRepository } from "../../domain/repositories/movie.repository";

/**
 * Caso de uso para obtener las películas de estreno reciente (año >= 2020).
 *
 * @remarks
 * Esta clase pertenece a la capa de Application y orquesta la consulta
 * de películas recientes delegando la obtención en el MovieRepository.
 */
export class GetRecentMoviesUseCase {
  /**
   * Crea una instancia de GetRecentMoviesUseCase.
   *
   * @param movieRepository Repositorio abstracto de películas
   */
  constructor(private readonly movieRepository: MovieRepository) {}

  /**
   * Ejecuta la lógica del caso de uso.
   *
   * @returns Promesa con las películas con año de estreno mayor o igual a 2020
   */
  async execute(): Promise<Movie[]> {
    return this.movieRepository.getRecent();
  }
}
