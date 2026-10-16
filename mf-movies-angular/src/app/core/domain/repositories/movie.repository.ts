import { Observable } from 'rxjs';
import { MovieModel } from '../models/movie.model';

/**
 * Contrato abstracto del repositorio de películas en la capa de Dominio.
 *
 * @remarks
 * Esta clase abstracta sirve como Token de Inyección de Dependencias (DI)
 * en tiempo de ejecución para Angular, permitiendo desacoplar la capa de
 * aplicación de cualquier fuente de datos (Local, Node.js o Spring Boot).
 *
 * Los casos de uso dependen exclusivamente de este contrato y nunca de
 * implementaciones concretas de infraestructura.
 *
 * @see {@link MovieModel}
 */
export abstract class MovieRepository {
  /**
   * Obtiene la totalidad de películas disponibles en el catálogo.
   *
   * @returns Un {@link Observable} que emite el arreglo completo de {@link MovieModel}.
   */
  abstract getAll(): Observable<MovieModel[]>;

  /**
   * Obtiene las películas de estreno reciente con año mayor o igual a 2020.
   *
   * @returns Un {@link Observable} que emite el listado de películas recientes.
   */
  abstract getRecent(): Observable<MovieModel[]>;

  /**
   * Obtiene las películas clásicas con año de estreno anterior al 2000.
   *
   * @returns Un {@link Observable} que emite el listado de películas clásicas.
   */
  abstract getClassics(): Observable<MovieModel[]>;
}
