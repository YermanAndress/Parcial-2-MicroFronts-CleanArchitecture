/**
 * Interfaz que representa el modelo de dominio de una Película.
 *
 * @remarks
 * Cumple con el contrato estricto de 5 propiedades requeridas por la arquitectura:
 * `id`, `title`, `director`, `year` y `genre`.
 *
 * @example
 * ```ts
 * const movie: Movie = {
 *   id: "1",
 *   title: "Inception",
 *   director: "Christopher Nolan",
 *   year: 2010,
 *   genre: "Sci-Fi"
 * };
 * ```
 */
export interface Movie {
  /** Identificador único de la película */
  id: string;

  /** Título oficial de la película */
  title: string;

  /** Director cinematográfico */
  director: string;

  /** Año de estreno de la película */
  year: number;

  /** Género cinematográfico de la película */
  genre: string;
}
