/**
 * Interfaz que representa el modelo de dominio de un Autor.
 *
 * @remarks
 * Cumple con el contrato estricto de 4 propiedades requeridas por la arquitectura:
 * `id`, `name`, `country` y `birthYear`.
 *
 * @example
 * ```ts
 * const author: Author = {
 *   id: 1,
 *   name: 'Gabriel García Márquez',
 *   country: 'Colombia',
 *   birthYear: 1927
 * };
 * ```
 */
export interface Author {
  /** Identificador único del autor */
  id: number;

  /** Nombre completo del autor */
  name: string;

  /** País de origen del autor */
  country: string;

  /** Año de nacimiento del autor */
  birthYear: number;
}
