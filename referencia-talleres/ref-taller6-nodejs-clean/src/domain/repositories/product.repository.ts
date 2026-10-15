import { Product } from "../models/product.model";


/**
 * Contrato del repositorio de productos.
 *
 * @remarks
 * Esta clase abstracta pertenece a la **capa de Domain**
 * y define el contrato que deben cumplir todas las
 * implementaciones de repositorios de productos.
 *
 * El dominio:
 * - NO conoce detalles de infraestructura
 * - NO sabe de bases de datos, APIs o frameworks
 *
 * Cualquier fuente de datos (API, base de datos, mocks,
 * archivos, etc.) puede ser utilizada siempre que
 * implemente este contrato.
 *
 * Los casos de uso dependen de esta abstracción,
 * no de implementaciones concretas.
 *
 * @see {@link Product}
 */
export abstract class ProductRepository {
  /**
   * Obtiene un listado de productos.
   *
   * @remarks
   * Este método define una **operación de negocio**
   * relacionada con la obtención de productos,
   * sin especificar cómo ni desde dónde se obtienen.
   *
   * @param countProducts - Cantidad de productos a obtener
   * @returns Promesa que resuelve un arreglo de {@link Product}
   */
  abstract getAll(countProducts: number): Promise<Product[]>;
}