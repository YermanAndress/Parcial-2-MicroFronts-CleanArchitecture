import { Movie } from "../models/movie.model";

/**
 * Contrato abstracto del repositorio de películas en la capa de Dominio.
 *
 * @remarks
 * Define las operaciones que cualquier fuente de datos (en memoria con Faker,
 * base de datos, o API externa) debe implementar para el catálogo de películas.
 */
export abstract class MovieRepository {
  /**
   * Obtiene todas las películas del catálogo.
   *
   * @returns Promesa con la colección completa de películas
   */
  abstract getAll(): Promise<Movie[]>;

  /**
   * Obtiene las películas con estreno reciente (año >= 2020).
   *
   * @returns Promesa con la lista de películas recientes
   */
  abstract getRecent(): Promise<Movie[]>;

  /**
   * Obtiene las películas consideradas clásicas (año < 2000).
   *
   * @returns Promesa con la lista de películas clásicas
   */
  abstract getClassics(): Promise<Movie[]>;
}
