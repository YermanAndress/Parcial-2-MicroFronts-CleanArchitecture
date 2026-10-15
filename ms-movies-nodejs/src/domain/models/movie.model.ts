/**
 * Interfaz que representa una película.
 *
 * @remarks
 * Contiene la información básica necesaria para mostrar una película
 * en un listado o en el detalle.
 *
 * Cada película debe tener un `id` único, un `title` descriptivo,
 * un `director`, un `year` de estreno y un `genre` válido.
 *
 * @example
 * ```ts
 * const movie: Movie = {
 *   id: 1,
 *   title: 'Inception',
 *   director: 'Christopher Nolan',
 *   year: 2010,
 *   genre: 'Sci-Fi'
 * };
 * ```
 */
export interface Movie {
  /** Identificador único de la película */
  id: number;

  /** Título de la película */
  title: string;

  /** Director de la película */
  director: string;

  /** Año de estreno de la película */
  year: number;

  /** Género al que pertenece la película */
  genre: MovieGenre;
}

/**
 * Datos necesarios para crear una película.
 *
 * @remarks
 * Es el modelo {@link Movie} sin el `id`, ya que este es
 * generado por el sistema al momento de persistir la película.
 */
export type CreateMovieDto = Omit<Movie, 'id'>;

/**
 * Tipo de género de una película.
 *
 * @remarks
 * Restringe los géneros a un conjunto predefinido de valores,
 * evitando cadenas arbitrarias en el dominio.
 *
 * @example
 * ```ts
 * const genre: MovieGenre = 'Drama';
 * ```
 */
export type MovieGenre =
  | 'Action'
  | 'Comedy'
  | 'Drama'
  | 'Sci-Fi'
  | 'Animation'
  | 'Thriller'
  | 'Horror';
