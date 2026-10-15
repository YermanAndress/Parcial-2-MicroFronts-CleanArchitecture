import { CreateMovieDto, Movie } from '../models/movie.model';

/**
 * Contrato del repositorio de películas.
 *
 * @remarks
 * Esta clase abstracta pertenece a la **capa de Domain**
 * y define el contrato que deben cumplir todas las
 * implementaciones de repositorios de películas.
 *
 * El dominio:
 * - NO conoce detalles de infraestructura
 * - NO sabe de bases de datos, APIs o frameworks
 *
 * Los casos de uso dependen de esta abstracción,
 * no de implementaciones concretas.
 *
 * @see {@link Movie}
 */
export abstract class MovieRepository {
  /**
   * Obtiene el listado completo de películas.
   *
   * @returns Promesa que resuelve un arreglo de {@link Movie}
   */
  abstract getAll(): Promise<Movie[]>;

  /**
   * Obtiene una película por su identificador.
   *
   * @param id - Identificador único de la película
   * @returns Promesa que resuelve la {@link Movie} o `undefined`
   * si no existe
   */
  abstract getById(id: number): Promise<Movie | undefined>;

  /**
   * Crea una nueva película.
   *
   * @param movie - Datos de la película a crear (sin `id`)
   * @returns Promesa que resuelve la {@link Movie} creada
   */
  abstract create(movie: CreateMovieDto): Promise<Movie>;
}
