import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreateMovieDto, Movie } from '../../domain/models/movie.model';

/**
 * Servicio de infraestructura para la obtención de datos de películas.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa como
 * un **Data Source** que provee información desde el microservicio
 * de películas (ms-movies-nodejs) mediante HTTP.
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No debe ser consumido directamente por los casos de uso.
 *
 * Es utilizado por `MovieRepositoryImpl`, que adapta los datos
 * al dominio.
 */
@Injectable({ providedIn: 'root' })
export class MovieApiService {
  /**
   * Cliente HTTP de Angular.
   */
  private httpClient = inject(HttpClient);

  /**
   * URL base del microservicio de películas.
   */
  private baseUrl = `${environment.baseUrl}/api/movies`;

  /**
   * Obtiene el listado de películas desde el microservicio.
   *
   * @returns Observable que emite un arreglo de {@link Movie}
   */
  getAllMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.baseUrl);
  }

  /**
   * Obtiene una película por su identificador desde el microservicio.
   *
   * @param id - Identificador único de la película
   * @returns Observable que emite la {@link Movie}
   */
  getMovieById(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(`${this.baseUrl}/${id}`);
  }

  /**
   * Registra una nueva película en el microservicio.
   *
   * @param movie - Datos de la película a crear (sin `id`)
   * @returns Observable que emite la {@link Movie} creada
   */
  createMovie(movie: CreateMovieDto): Observable<Movie> {
    return this.httpClient.post<Movie>(this.baseUrl, movie);
  }
}
