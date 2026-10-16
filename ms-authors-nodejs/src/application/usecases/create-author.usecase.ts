import { Author } from "../../domain/models/author.model";
import { AuthorRepository } from "../../domain/repositories/author.repository";

/**
 * Caso de uso para crear un nuevo autor en el catálogo.
 *
 * @remarks
 * Esta clase pertenece a la capa de Application y orquesta la creación
 * de autores sin acoplarse a detalles de infraestructura.
 */
export class CreateAuthorUseCase {
  /**
   * Crea una instancia de CreateAuthorUseCase.
   *
   * @param authorRepository Repositorio abstracto de autores
   */
  constructor(private readonly authorRepository: AuthorRepository) {}

  /**
   * Ejecuta la lógica del caso de uso.
   *
   * @param author Datos del autor sin identificador
   * @returns Promesa con el autor creado (con `id` asignado)
   */
  async execute(author: Omit<Author, "id">): Promise<Author> {
    return this.authorRepository.create(author);
  }
}
