import { User } from "../../domain/models/user.model";
import { UserRepository } from "../../domain/repositories/user.repository";

/**
 * Caso de uso para obtener un listado de usuarios.
 *
 * @remarks
 * Forma parte de la **capa de Application** y define
 * una acción concreta que la aplicación puede ejecutar.
 *
 * Este caso de uso:
 * - Orquesta el acceso a datos
 * - Aplica reglas de negocio si es necesario
 * - Aísla la lógica de la UI y la infraestructura
 *
 * Depende únicamente del contrato
 * {@link UserRepository}.
 *
 * @see {@link UserRepository}
 * @see {@link User}
 */
export class GetAllUsersUseCase {

  /**
   * Crea una nueva instancia del caso de uso.
   *
   * @param userRepository - Repositorio de usuarios
   * utilizado para acceder a la información
   */
  constructor(private userRepository: UserRepository) {}

  /**
   * Ejecuta el caso de uso.
   *
   * @remarks
   * Obtiene una cantidad específica de usuarios
   * utilizando el repositorio del dominio.
   *
   * En este nivel se pueden implementar:
   * - Validaciones de entrada
   * - Reglas de negocio de la aplicación
   * - Composición de múltiples operaciones
   *
   * @param countUsers - Cantidad de usuarios a obtener
   * @returns Promesa que resuelve un arreglo de {@link User}
   *
   * @example
   * ```ts
   * const useCase = new GetAllUsersUseCase(userRepository);
   * const users = await useCase.execute(5);
   * ```
   */
  execute(countUsers: number): Promise<User[]> {
    return this.userRepository.getAll(countUsers);
  }
}