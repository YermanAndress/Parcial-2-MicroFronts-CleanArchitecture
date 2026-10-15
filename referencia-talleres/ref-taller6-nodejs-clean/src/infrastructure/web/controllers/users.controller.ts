import { Request, Response } from "express";
import { GetAllUsersUseCase } from "../../../application/usecases/get-all-users.usecase";
import { HandleError } from "../erros/handle.error";

/**
 * Controlador HTTP para operaciones relacionadas con usuarios.
 *
 * @remarks
 * Forma parte de la **capa de Frameworks & Drivers**
 * y actúa como un **adaptador HTTP** entre Express
 * y la capa de Application.
 *
 * Su función es:
 * - Interpretar la request HTTP
 * - Delegar la ejecución al caso de uso
 * - Enviar la respuesta HTTP adecuada
 *
 * @see {@link GetAllUsersUseCase}
 */
export class UsersController {

  /**
   * Crea una nueva instancia del controlador de usuarios.
   *
   * @param getAllUsersUseCase - Caso de uso encargado
   * de obtener el listado de usuarios
   */
  constructor(private getAllUsersUseCase: GetAllUsersUseCase){}


    /**
   * Maneja la petición HTTP para obtener usuarios.
   *
   * @remarks
   * Obtiene el parámetro `countUsers` desde la request,
   * ejecuta el caso de uso correspondiente y devuelve
   * la respuesta en formato JSON.
   *
   * El manejo de errores se delega al componente
   * {@link HandleError}.
   *
   * El retardo artificial (`setTimeout`) se utiliza
   * únicamente con fines demostrativos.
   *
   * @param req - Objeto Request de Express
   * @param res - Objeto Response de Express
   */
  getAllUsers = (req: Request, res: Response): void => {
    const { countUsers } = req.params;

    setTimeout(() => {
      this.getAllUsersUseCase
      .execute(Number(countUsers))
      .then((users) => res.status(201).json(users))
      .catch((error) => HandleError.error(error, res));
    }, 3000);
  };
}