import { faker } from '@faker-js/faker';
import { Product, ProductCategory } from "../../domain/models/product.model";

/**
 * Datasource encargado de generar productos simulados.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa como
 * una **fuente de datos (Datasource)**.
 *
 * Utiliza la librería {@link https://www.npmjs.com/package/@faker-js/faker | faker}
 * para generar información falsa de productos.
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No implementa repositorios del dominio.
 *
 * Es consumida por `ProductRepositoryImpl`, que se encarga
 * de adaptar los datos al dominio y exponerlos mediante
 * el contrato `ProductRepository`.
 */
export class ProductDatasource {

    /**
     * Categorías disponibles para los productos simulados.
     *
     * @remarks
     * Se utiliza para asignar una categoría aleatoria
     * a cada producto generado.
     */
    private categories: ProductCategory[] = [
        'Carnes',
        'Frutas',
        'Lacteos',
        'Verduras'
    ];

    /**
     * Obtiene una lista de productos simulados.
     *
     * @remarks
     * Genera dinámicamente una cantidad determinada de productos
     * utilizando datos aleatorios.
     *
     * @param countProducts - Cantidad de productos a generar
     * @returns Promesa que resuelve un arreglo de {@link Product}
     *
     * @example
     * ```ts
     * const datasource = new ProductDatasource();
     * const products = await datasource.getAll(10);
     * ```
     */
    async getAll(countProducts: number): Promise<Product[]> {
        const products: Promise<Product>[] = [];

        for (let i = 1; i <= countProducts; i++) {
        products.push(this.generateProduct(i));
        }

        return Promise.all(products);
    }


    /**
     * Genera un producto individual con datos simulados.
     *
     * @remarks
     * Este método es interno y no debe ser utilizado
     * fuera del datasource.
     *
     * @param id - Identificador único del producto
     * @returns Promesa que resuelve un {@link Product}
     */
    private generateProduct(id: number): Promise<Product> {
        return Promise.resolve({
        id,
        name: faker.commerce.productName(),
        price: Number(
            faker.commerce.price({ min: 1, max: 100, dec: 2 })
        ),
        category: faker.helpers.arrayElement(this.categories),
        });
    }

}