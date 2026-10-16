import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MOVIES_MOCK } from '../../../mocks/movies.mocks';
import { MovieModel } from '../../domain/models/movie.model';

/**
 * Servicio de infraestructura para el acceso y recuperación de datos de películas.
 *
 * @remarks
 * Actúa como Fuente de Datos (Data Source) en la capa de Infraestructura.
 * Centraliza la comunicación HTTP hacia los backends Node.js (puerto 3003)
 * y Spring Boot (puerto 8082), así como el retorno de datos simulados locales (Mocks).
 *
 * ❗ No contiene lógica de negocio del dominio.
 * ❗ Es consumido exclusivamente por las implementaciones de repositorios.
 */
@Injectable({
  providedIn: 'root',
})
export class DataService {
  /**
   * Instancia del cliente HTTP de Angular inyectada con `inject()`.
   */
  private readonly httpClient: HttpClient = inject(HttpClient);

  /**
   * URL base de la API del microservicio Node.js.
   */
  private readonly nodeApiUrl: string = environment.apiUrlNode;

  /**
   * URL base de la API del microservicio Spring Boot.
   */
  private readonly springBootApiUrl: string = environment.apiUrlSpringBoot;

  /**
   * Método genérico para consultar datos mediante HTTP GET.
   *
   * @typeParam T - Tipo de datos esperado en la respuesta.
   * @param endpoint - URL completa del endpoint a consultar.
   * @returns Un {@link Observable} que emite la respuesta tipada.
   */
  getAll<T>(endpoint: string): Observable<T> {
    return this.httpClient.get<T>(endpoint);
  }

  /**
   * Obtiene la totalidad de películas desde datos simulados en memoria (Local Mocks).
   *
   * @returns Un {@link Observable} con el listado completo de {@link MovieModel}.
   */
  getAllMoviesLocal(): Observable<MovieModel[]> {
    return of([...MOVIES_MOCK]);
  }

  /**
   * Obtiene las películas de estreno reciente (año >= 2020) desde Mocks locales.
   *
   * @returns Un {@link Observable} con las películas recientes simuladas.
   */
  getRecentMoviesLocal(): Observable<MovieModel[]> {
    return of(MOVIES_MOCK.filter((movie) => movie.year >= 2020));
  }

  /**
   * Obtiene las películas clásicas (año < 2000) desde Mocks locales.
   *
   * @returns Un {@link Observable} con las películas clásicas simuladas.
   */
  getClassicMoviesLocal(): Observable<MovieModel[]> {
    return of(MOVIES_MOCK.filter((movie) => movie.year < 2000));
  }

  /**
   * Obtiene la totalidad de películas consumiendo el microservicio backend Node.js.
   *
   * @returns Un {@link Observable} con la lista de películas obtenida por HTTP GET.
   */
  getAllMoviesNode(): Observable<MovieModel[]> {
    return this.httpClient.get<MovieModel[]>(`${this.nodeApiUrl}/movies`);
  }

  /**
   * Obtiene las películas de estreno reciente consumiendo el microservicio Node.js.
   *
   * @returns Un {@link Observable} con las películas recientes desde `/api/movies/recent`.
   */
  getRecentMoviesNode(): Observable<MovieModel[]> {
    return this.httpClient.get<MovieModel[]>(`${this.nodeApiUrl}/movies/recent`);
  }

  /**
   * Obtiene las películas clásicas consumiendo el microservicio backend Node.js.
   *
   * @returns Un {@link Observable} con las películas clásicas desde `/api/movies/classics`.
   */
  getClassicMoviesNode(): Observable<MovieModel[]> {
    return this.httpClient.get<MovieModel[]>(`${this.nodeApiUrl}/movies/classics`);
  }

  /**
   * Obtiene la totalidad de películas consumiendo el microservicio backend Spring Boot.
   *
   * @returns Un {@link Observable} con la lista de películas obtenida por HTTP GET.
   */
  getAllMoviesSpringBoot(): Observable<MovieModel[]> {
    return this.httpClient.get<MovieModel[]>(`${this.springBootApiUrl}/movies`);
  }

  /**
   * Obtiene las películas de estreno reciente consumiendo el microservicio Spring Boot.
   *
   * @returns Un {@link Observable} con las películas recientes desde `/api/movies/recent`.
   */
  getRecentMoviesSpringBoot(): Observable<MovieModel[]> {
    return this.httpClient.get<MovieModel[]>(`${this.springBootApiUrl}/movies/recent`);
  }

  /**
   * Obtiene las películas clásicas consumiendo el microservicio backend Spring Boot.
   *
   * @returns Un {@link Observable} con las películas clásicas desde `/api/movies/classics`.
   */
  getClassicMoviesSpringBoot(): Observable<MovieModel[]> {
    return this.httpClient.get<MovieModel[]>(`${this.springBootApiUrl}/movies/classics`);
  }
}
