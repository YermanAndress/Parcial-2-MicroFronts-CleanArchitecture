import { Product } from "../../domain/models/product.model";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { ProductDatasource } from "../datasources/product.datasource";

/**
 * Implementación concreta del repositorio de productos.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa como
 * un **adaptador (Repository Implementation)** entre:
 *
 * - El contrato del dominio {@link ProductRepository}
 * - La fuente de datos {@link ProductDatasource}
 *
 * Su responsabilidad es:
 * - Cumplir el contrato definido por el dominio
 * - Delegar la obtención de datos al datasource
 * - Adaptar o transformar los datos si fuese necesario
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No debe ser utilizada directamente por los casos de uso.
 *
 * Los casos de uso dependen únicamente del contrato
 * {@link ProductRepository}, no de esta implementación.
 *
 * @see {@link ProductRepository}
 * @see {@link ProductDatasource}
 */
export class ProductRepositoryImpl extends ProductRepository {

  /**
   * Crea una nueva instancia del repositorio de productos.
   *
   * @param datasource - Fuente de datos utilizada para
   * obtener la información de productos
   */
  constructor(private datasource: ProductDatasource) {
    super();
  }

  /**
   * Obtiene el listado de productos.
   *
   * @remarks
   * Implementa el método definido en
   * {@link ProductRepository#getAll}.
   *
   * Este es el punto adecuado para:
   * - Transformar DTOs en modelos de dominio
   * - Aplicar reglas de adaptación
   * - Manejar errores o políticas de caché
   *
   * @param countProducts - Cantidad de productos a obtener
   * @returns Promesa que resuelve un arreglo de {@link Product}
   *
   * @example
   * ```ts
   * const repository = new ProductRepositoryImpl(new ProductDatasource());
   * const products = await repository.getAll(10);
   * ```
   */
  getAll(countProducts: number): Promise<Product[]> {
    return this.datasource.getAll(countProducts);
  }
}