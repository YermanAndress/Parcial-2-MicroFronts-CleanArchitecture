import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateMovieDto, Movie } from '../../domain/models/movie.model';
import { MovieRepository } from '../../domain/repositories/movie.repository';
import { MovieApiService } from '../services/movie-api.service';

/**
 * Implementación concreta del repositorio de películas.
 *
 * @remarks
 * Forma parte de la **capa de Infrastructure** y cumple el rol de
 * **Adapter** entre el dominio y la fuente de datos.
 *
 * Implementa el contrato {@link MovieRepository} utilizando
 * {@link MovieApiService} como datasource HTTP.
 *
 * Este patrón permite:
 * - Desacoplar el dominio de detalles técnicos
 * - Sustituir la fuente de datos sin afectar casos de uso
 * - Facilitar pruebas unitarias mediante mocks
 *
 * @see {@link MovieRepository}
 * @see {@link MovieApiService}
 */
@Injectable()
export class MovieRepositoryImpl extends MovieRepository {
  /**
   * Datasource encargado de obtener los datos de películas.
   */
  private apiService = inject(MovieApiService);

  /**
   * Obtiene el listado completo de películas.
   *
   * @returns Observable que emite un arreglo de {@link Movie}
   */
  getAll(): Observable<Movie[]> {
    return this.apiService.getAllMovies();
  }

  /**
   * Obtiene una película por su identificador.
   *
   * @param id - Identificador único de la película
   * @returns Observable que emite la {@link Movie}
   */
  getById(id: number): Observable<Movie> {
    return this.apiService.getMovieById(id);
  }

  /**
   * Crea una nueva película.
   *
   * @param movie - Datos de la película a crear (sin `id`)
   * @returns Observable que emite la {@link Movie} creada
   */
  create(movie: CreateMovieDto): Observable<Movie> {
    return this.apiService.createMovie(movie);
  }
}
