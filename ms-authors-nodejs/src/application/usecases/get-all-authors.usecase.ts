import { Author } from "../../domain/models/author.model";
import { AuthorRepository } from "../../domain/repositories/author.repository";

/**
 * Caso de uso para obtener autores del catálogo.
 *
 * @remarks
 * Esta clase pertenece a la capa de Application y orquesta la consulta
 * de autores sin acoplarse a detalles de infraestructura.
 */
export class GetAllAuthorsUseCase {
  /**
   * Crea una instancia de GetAllAuthorsUseCase.
   *
   * @param authorRepository Repositorio abstracto de autores
   */
  constructor(private readonly authorRepository: AuthorRepository) {}

  /**
   * Ejecuta la lógica del caso de uso.
   *
   * @param count Cantidad máxima de autores a retornar
   * @returns Promesa con el listado de autores
   */
  async execute(count: number): Promise<Author[]> {
    return this.authorRepository.getAll(count);
  }
}
