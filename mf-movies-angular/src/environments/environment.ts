/**
 * Configuración de variables de entorno de la aplicación.
 *
 * @remarks
 * Este archivo contiene las constantes de entorno utilizadas
 * en la aplicación Angular.
 *
 * @example
 * ```ts
 * import { environment } from '../../environments/environment';
 *
 * this.http.get(`${environment.baseUrl}/api/movies`);
 * ```
 */
export const environment = {
  /**
   * URL base del microservicio de películas (ms-movies-nodejs).
   *
   * @remarks
   * Se utiliza como punto de partida para construir
   * las peticiones HTTP hacia la API.
   */
  baseUrl: 'http://localhost:3003',
};
