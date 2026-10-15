import { CreateMovieDto, Movie } from '../../domain/models/movie.model';
import { MovieRepository } from '../../domain/repositories/movie.repository';
import { MovieDatasource } from '../datasources/movie.datasource';

/**
 * Implementación concreta del repositorio de películas.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa como
 * un **adaptador (Repository Implementation)** entre el contrato del
 * dominio {@link MovieRepository} y la fuente de datos
 * {@link MovieDatasource}.
 *
 * Su responsabilidad es cumplir el contrato definido por el dominio
 * delegando el acceso a datos al datasource.
 *
 * ❗ No contiene lógica de negocio.
 *
 * @see {@link MovieRepository}
 * @see {@link MovieDatasource}
 */
export class MovieRepositoryImpl extends MovieRepository {
  /**
   * Crea una nueva instancia del repositorio de películas.
   *
   * @param datasource - Fuente de datos utilizada para obtener
   * la información de películas
   */
  constructor(private readonly datasource: MovieDatasource) {
    super();
  }

  /**
   * Obtiene el listado completo de películas.
   *
   * @returns Promesa que resuelve un arreglo de {@link Movie}
   */
  getAll(): Promise<Movie[]> {
    return this.datasource.getAll();
  }

  /**
   * Obtiene una película por su identificador.
   *
   * @param id - Identificador único de la película
   * @returns Promesa que resuelve la {@link Movie} o `undefined`
   */
  getById(id: number): Promise<Movie | undefined> {
    return this.datasource.getById(id);
  }

  /**
   * Crea una nueva película.
   *
   * @param movie - Datos de la película a crear (sin `id`)
   * @returns Promesa que resuelve la {@link Movie} creada
   */
  create(movie: CreateMovieDto): Promise<Movie> {
    return this.datasource.create(movie);
  }
}
