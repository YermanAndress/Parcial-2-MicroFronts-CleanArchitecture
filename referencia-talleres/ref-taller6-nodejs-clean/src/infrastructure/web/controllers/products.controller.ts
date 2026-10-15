import { Request, Response } from "express";
import { GetAllProductsUseCase } from "../../../application/usecases/get-all-products.usecase";
import { HandleError } from "../erros/handle.error";

/**
 * Controlador HTTP para operaciones relacionadas con productos.
 *
 * @remarks
 * Esta clase pertenece a la **capa más externa** de la aplicación
 * (*Frameworks & Drivers*), y su responsabilidad es:
 *
 * - Recibir solicitudes HTTP
 * - Extraer parámetros de la request
 * - Delegar la lógica al caso de uso correspondiente
 * - Transformar la respuesta del caso de uso en una respuesta HTTP
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No accede directamente a repositorios ni datasources.
 *
 * Depende del caso de uso {@link GetAllProductsUseCase}.
 */
export class ProductsController {


  /**
   * Crea una nueva instancia del controlador de productos.
   *
   * @param getAllProductsUseCase - Caso de uso encargado
   * de obtener el listado de productos
   */
  constructor(private getAllProductsUseCase: GetAllProductsUseCase){}


  /**
   * Maneja la petición HTTP para obtener productos.
   *
   * @remarks
   * Extrae el parámetro `countProducts` desde la URL,
   * ejecuta el caso de uso correspondiente y devuelve
   * la respuesta en formato JSON.
   *
   * Incluye un `setTimeout` únicamente con fines
   * demostrativos (simulación de latencia).
   *
   * Los errores son delegados al manejador centralizado
   * {@link HandleError}.
   *
   * @param req - Objeto Request de Express
   * @param res - Objeto Response de Express
   */
  getAllProducts = (req: Request, res: Response): void => {
    const { countProducts } = req.params;

    setTimeout(() => {
      this.getAllProductsUseCase
      .execute(Number(countProducts))
      .then((products) => res.status(201).json(products))
      .catch((error) => HandleError.error(error, res));
    }, 3000);
  };
}