import { Product } from "../../domain/models/product.model";
import { ProductRepository } from "../../domain/repositories/product.repository";

/**
 * Caso de uso para obtener un listado de productos.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Application**
 * y representa una **regla de negocio de la aplicación**.
 *
 * Su responsabilidad es:
 * - Orquestar la obtención de productos
 * - Coordinar la interacción con el repositorio
 *
 * ❗ No conoce detalles de infraestructura.
 * ❗ No depende de implementaciones concretas.
 *
 * Depende únicamente del contrato
 * {@link ProductRepository} definido en el dominio.
 *
 * @see {@link ProductRepository}
 * @see {@link Product}
 */
export class GetAllProductsUseCase {

  /**
   * Crea una nueva instancia del caso de uso.
   *
   * @param productRepository - Repositorio de productos
   * utilizado para acceder a los datos
   */
  constructor(private productRepository: ProductRepository) {}

  /**
   * Ejecuta el caso de uso.
   *
   * @remarks
   * Obtiene una cantidad determinada de productos
   * delegando el acceso a datos al repositorio.
   *
   * Aquí se pueden agregar:
   * - Validaciones de entrada
   * - Reglas de negocio simples
   * - Orquestación de múltiples repositorios
   *
   * @param countProducts - Cantidad de productos a obtener
   * @returns Promesa que resuelve un arreglo de {@link Product}
   *
   * @example
   * ```ts
   * const useCase = new GetAllProductsUseCase(productRepository);
   * const products = await useCase.execute(10);
   * ```
   */
  execute(countProducts: number): Promise<Product[]> {
    return this.productRepository.getAll(countProducts);
  }
}