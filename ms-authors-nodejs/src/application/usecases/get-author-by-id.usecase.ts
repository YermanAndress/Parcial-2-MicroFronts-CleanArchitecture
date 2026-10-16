import { Author } from "../../domain/models/author.model";
import { AuthorRepository } from "../../domain/repositories/author.repository";

/**
 * Caso de uso para obtener un autor por su identificador.
 *
 * @remarks
 * Esta clase pertenece a la capa de Application y orquesta la búsqueda
 * de un autor sin acoplarse a detalles de infraestructura.
 */
export class GetAuthorByIdUseCase {
  /**
   * Crea una instancia de GetAuthorByIdUseCase.
   *
   * @param authorRepository Repositorio abstracto de autores
   */
  constructor(private readonly authorRepository: AuthorRepository) {}

  /**
   * Ejecuta la lógica del caso de uso.
   *
   * @param id Identificador del autor
   * @returns Promesa con el autor encontrado o `null` si no existe
   */
  async execute(id: number): Promise<Author | null> {
    return this.authorRepository.getById(id);
  }
}
