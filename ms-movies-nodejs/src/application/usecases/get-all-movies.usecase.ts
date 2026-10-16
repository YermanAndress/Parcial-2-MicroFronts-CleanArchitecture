import { Movie } from "../../domain/models/movie.model";
import { MovieRepository } from "../../domain/repositories/movie.repository";

/**
 * Caso de uso para obtener todo el catálogo de películas.
 *
 * @remarks
 * Esta clase pertenece a la capa de Application y orquesta la consulta
 * de todas las películas sin acoplarse a detalles de infraestructura.
 */
export class GetAllMoviesUseCase {
  /**
   * Crea una instancia de GetAllMoviesUseCase.
   *
   * @param movieRepository Repositorio abstracto de películas
   */
  constructor(private readonly movieRepository: MovieRepository) {}

  /**
   * Ejecuta la lógica del caso de uso.
   *
   * @returns Promesa con el listado completo de películas
   */
  async execute(): Promise<Movie[]> {
    return this.movieRepository.getAll();
  }
}
