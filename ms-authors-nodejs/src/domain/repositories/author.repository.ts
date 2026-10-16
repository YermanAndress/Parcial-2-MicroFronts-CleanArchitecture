import { Author } from "../models/author.model";

/**
 * Contrato abstracto del repositorio de autores en la capa de Dominio.
 *
 * @remarks
 * Define las operaciones que cualquier fuente de datos (en memoria con Faker,
 * base de datos, o API externa) debe implementar para el catálogo de autores.
 */
export abstract class AuthorRepository {
  /**
   * Obtiene los primeros `count` autores del catálogo.
   *
   * @param count Cantidad máxima de autores a retornar
   * @returns Promesa con la colección de autores
   */
  abstract getAll(count: number): Promise<Author[]>;

  /**
   * Obtiene un autor por su identificador único.
   *
   * @param id Identificador del autor
   * @returns Promesa con el autor encontrado o `null` si no existe
   */
  abstract getById(id: number): Promise<Author | null>;

  /**
   * Crea un nuevo autor en el catálogo.
   *
   * @param author Datos del autor sin identificador
   * @returns Promesa con el autor creado (con `id` asignado)
   */
  abstract create(author: Omit<Author, "id">): Promise<Author>;
}
