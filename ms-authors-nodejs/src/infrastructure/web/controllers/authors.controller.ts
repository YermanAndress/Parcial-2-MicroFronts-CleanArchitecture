import { Request, Response } from "express";
import { CreateAuthorUseCase } from "../../../application/usecases/create-author.usecase";
import { GetAllAuthorsUseCase } from "../../../application/usecases/get-all-authors.usecase";
import { GetAuthorByIdUseCase } from "../../../application/usecases/get-author-by-id.usecase";
import { CustomError } from "../erros/custom.error";
import { HandleError } from "../erros/handle.error";

/**
 * Controlador HTTP para el recurso de autores.
 *
 * @remarks
 * Pertenece a la capa de Infraestructura (web). Recibe las peticiones HTTP
 * delegando la ejecución a los 3 Casos de Uso del Dominio
 * (`GetAllAuthorsUseCase`, `GetAuthorByIdUseCase`, `CreateAuthorUseCase`)
 * y estandarizando las respuestas y el manejo de errores.
 */
export class AuthorsController {
  /**
   * Crea una instancia de AuthorsController con los casos de uso inyectados.
   *
   * @param getAllAuthorsUseCase Caso de uso para obtener autores
   * @param getAuthorByIdUseCase Caso de uso para obtener un autor por id
   * @param createAuthorUseCase Caso de uso para crear un autor
   */
  constructor(
    private readonly getAllAuthorsUseCase: GetAllAuthorsUseCase,
    private readonly getAuthorByIdUseCase: GetAuthorByIdUseCase,
    private readonly createAuthorUseCase: CreateAuthorUseCase
  ) {}

  /**
   * Endpoint GET /api/authors/:count
   * Retorna los primeros `count` autores del catálogo.
   *
   * @param req Objeto de solicitud HTTP de Express
   * @param res Objeto de respuesta HTTP de Express
   */
  getAllAuthors = async (req: Request, res: Response): Promise<void> => {
    try {
      const count = Number(req.params.count);

      if (!Number.isInteger(count) || count < 0) {
        throw CustomError.badRequest(
          "El parámetro count debe ser un entero mayor o igual a 0"
        );
      }

      const authors = await this.getAllAuthorsUseCase.execute(count);
      res.json(authors);
    } catch (error) {
      HandleError.error(error, res);
    }
  };

  /**
   * Endpoint GET /api/authors/item/:id
   * Retorna el autor con el identificador indicado.
   *
   * @param req Objeto de solicitud HTTP de Express
   * @param res Objeto de respuesta HTTP de Express
   */
  getAuthorById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        throw CustomError.badRequest(
          "El parámetro id debe ser un entero mayor a 0"
        );
      }

      const author = await this.getAuthorByIdUseCase.execute(id);

      if (!author) {
        throw CustomError.notFound(`Autor con id ${id} no encontrado`);
      }

      res.json(author);
    } catch (error) {
      HandleError.error(error, res);
    }
  };

  /**
   * Endpoint POST /api/authors
   * Crea un nuevo autor en el catálogo.
   *
   * @param req Objeto de solicitud HTTP de Express
   * @param res Objeto de respuesta HTTP de Express
   */
  createAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, country, birthYear } = req.body as {
        name?: unknown;
        country?: unknown;
        birthYear?: unknown;
      };

      if (
        typeof name !== "string" ||
        typeof country !== "string" ||
        typeof birthYear !== "number"
      ) {
        throw CustomError.badRequest(
          "El cuerpo debe incluir name (string), country (string) y birthYear (number)"
        );
      }

      const author = await this.createAuthorUseCase.execute({
        name,
        country,
        birthYear,
      });
      res.status(201).json(author);
    } catch (error) {
      HandleError.error(error, res);
    }
  };
}
