import { Router } from "express";
import { ProductDatasource } from "../../datasources/product.datasource";
import { ProductRepositoryImpl } from "../../repositories/product.repository.impl";
import { GetAllProductsUseCase } from "../../../application/usecases/get-all-products.usecase";
import { ProductsController } from "../controllers/products.controller";

export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();
    const repository = new ProductRepositoryImpl(new ProductDatasource());
    const getAllProducts = new GetAllProductsUseCase(repository);
    const controller = new ProductsController(getAllProducts);

    /**
     * @openapi
     * /api/products/{countProducts}:
     *   get:
     *     summary: Obtener listado de productos
     *     description: Retorna una lista de productos generados dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Products
     *     parameters:
     *       - in: path
     *         name: countProducts
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de productos a generar
     *     responses:
     *       200:
     *         description: Lista de productos generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Product'
     *       400:
     *         description: Parámetro inválido
     */
    router.get("/:countProducts", controller.getAllProducts);

    return router;
  }
}