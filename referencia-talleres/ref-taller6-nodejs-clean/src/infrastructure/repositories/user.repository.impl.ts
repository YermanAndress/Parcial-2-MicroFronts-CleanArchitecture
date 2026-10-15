import { User } from "../../domain/models/user.model";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserDatasource } from "../datasources/user.datasource";

/**
 * Implementación concreta del repositorio de usuarios.
 *
 * @remarks
 * Forma parte de la **capa de Infrastructure** y cumple
 * el rol de **adaptador** entre el dominio y la fuente de datos.
 *
 * Implementa el contrato {@link UserRepository}
 * utilizando {@link UserDatasource} como origen de datos.
 *
 * Este diseño permite:
 * - Desacoplar el dominio de detalles técnicos
 * - Sustituir la fuente de datos sin afectar a los casos de uso
 * - Facilitar pruebas unitarias mediante mocks
 *
 * @see {@link UserRepository}
 * @see {@link UserDatasource}
 */
export class UserRepositoryImpl extends UserRepository {

  /**
   * Crea una nueva instancia del repositorio de usuarios.
   *
   * @param datasource - Fuente de datos encargada
   * de generar u obtener los usuarios
   */
  constructor(private datasource: UserDatasource) {
    super();
  }

  /**
   * Obtiene el listado de usuarios.
   *
   * @remarks
   * Implementa el método definido en
   * {@link UserRepository#getAll}.
   *
   * En esta capa se pueden aplicar:
   * - Transformaciones de datos
   * - Validaciones técnicas
   * - Manejo de errores
   *
   * @param countUsers - Cantidad de usuarios a obtener
   * @returns Promesa que resuelve un arreglo de {@link User}
   *
   * @example
   * ```ts
   * const repository = new UserRepositoryImpl(new UserDatasource());
   * const users = await repository.getAll(5);
   * ```
   */
  getAll(countUsers: number): Promise<User[]> {
    return this.datasource.getAll(countUsers);
  }
}