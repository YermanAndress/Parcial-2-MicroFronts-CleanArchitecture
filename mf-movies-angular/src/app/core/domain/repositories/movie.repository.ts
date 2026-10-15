import { Observable } from 'rxjs';
import { CreateMovieDto, Movie } from '../models/movie.model';

/**
 * Contrato del repositorio de películas.
 *
 * @description
 * Define el contrato de acceso a datos para la entidad `Movie`
 * dentro de la **capa de dominio**, siguiendo los principios de
 * Clean Architecture.
 *
 * Permite desacoplar la lógica de negocio de los detalles de
 * implementación de la infraestructura.
 *
 * @remarks
 * Las implementaciones pueden variar (API REST, GraphQL,
 * almacenamiento local, mocks, etc.) sin afectar a los casos de uso.
 *
 * @architecture Clean Architecture
 * @layer Domain
 *
 * @see {@link Movie}
 */
export abstract class MovieRepository {
  /**
   * Obtiene el listado completo de películas.
   *
   * @returns Observable que emite un arreglo de {@link Movie}
   */
  abstract getAll(): Observable<Movie[]>;

  /**
   * Obtiene una película por su identificador.
   *
   * @param id - Identificador único de la película
   * @returns Observable que emite la {@link Movie}
   */
  abstract getById(id: number): Observable<Movie>;

  /**
   * Crea una nueva película.
   *
   * @param movie - Datos de la película a crear (sin `id`)
   * @returns Observable que emite la {@link Movie} creada
   */
  abstract create(movie: CreateMovieDto): Observable<Movie>;
}
