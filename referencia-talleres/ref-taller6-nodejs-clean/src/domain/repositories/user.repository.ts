import { User } from "../models/user.model";

/**
 * Contrato del repositorio de usuarios.
 *
 * @remarks
 * Forma parte de la **capa de Domain** y representa
 * una abstracción de acceso a datos de usuarios.
 *
 * Define qué operaciones están disponibles para
 * los casos de uso, sin exponer detalles técnicos
 * ni decisiones de infraestructura.
 *
 * Las implementaciones concretas viven en la capa
 * de *Infrastructure*.
 *
 * @see {@link User}
 */
export abstract class UserRepository {

  /**
   * Obtiene un listado de usuarios.
   *
   * @remarks
   * Representa una operación del dominio relacionada
   * con la obtención de usuarios.
   *
   * No define:
   * - Cómo se obtienen los datos
   * - Desde qué fuente provienen
   * - Qué tecnología se utiliza
   *
   * @param countUsers - Cantidad de usuarios a obtener
   * @returns Promesa que resuelve un arreglo de {@link User}
   */
  abstract getAll(countUsers: number): Promise<User[]>;
}