/**
 * Modelo de dominio que representa una Película dentro del microfrontend.
 *
 * @remarks
 * Representa la entidad central del catálogo cinematográfico y define
 * exactamente los 5 campos contractuales compartidos con el backend:
 * identificador, título, director, año y género.
 *
 * @example
 * ```ts
 * const movie: MovieModel = {
 *   id: '1',
 *   title: 'Inception',
 *   director: 'Christopher Nolan',
 *   year: 2010,
 *   genre: 'Sci-Fi'
 * };
 * ```
 */
export interface MovieModel {
  /**
   * Identificador único de la película.
   */
  id: string;

  /**
   * Título oficial de la obra cinematográfica.
   */
  title: string;

  /**
   * Nombre del director o directora de la película.
   */
  director: string;

  /**
   * Año de estreno o lanzamiento oficial.
   */
  year: number;

  /**
   * Género cinematográfico principal de la película.
   */
  genre: string;
}
