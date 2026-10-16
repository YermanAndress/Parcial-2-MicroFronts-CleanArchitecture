import { Request, Response } from "express";
import { GetAllMoviesUseCase } from "../../../application/usecases/get-all-movies.usecase";
import { GetClassicMoviesUseCase } from "../../../application/usecases/get-classic-movies.usecase";
import { GetRecentMoviesUseCase } from "../../../application/usecases/get-recent-movies.usecase";
import { HandleError } from "../../../domain/erros/handle.error";

/**
 * Controlador HTTP para el recurso de películas.
 *
 * @remarks
 * Pertenece a la capa de Presentación. Recibe las peticiones HTTP
 * delegando la ejecución a los 3 Casos de Uso del Dominio
 * (`GetAllMoviesUseCase`, `GetRecentMoviesUseCase`, `GetClassicMoviesUseCase`)
 * y estandarizando las respuestas y el manejo de errores.
 */
export class MoviesController {
  /**
   * Crea una instancia de MoviesController con los casos de uso inyectados.
   *
   * @param getAllMoviesUseCase Caso de uso para obtener todas las películas
   * @param getRecentMoviesUseCase Caso de uso para obtener películas recientes
   * @param getClassicMoviesUseCase Caso de uso para obtener películas clásicas
   */
  constructor(
    private readonly getAllMoviesUseCase: GetAllMoviesUseCase,
    private readonly getRecentMoviesUseCase: GetRecentMoviesUseCase,
    private readonly getClassicMoviesUseCase: GetClassicMoviesUseCase
  ) {}

  /**
   * Endpoint GET /api/movies
   * Retorna el catálogo completo de películas.
   *
   * @param req Objeto de solicitud HTTP de Express
   * @param res Objeto de respuesta HTTP de Express
   */
  getAllMovies = async (req: Request, res: Response): Promise<void> => {
    try {
      const movies = await this.getAllMoviesUseCase.execute();
      res.json(movies);
    } catch (error) {
      HandleError.error(error, res);
    }
  };

  /**
   * Endpoint GET /api/movies/recent
   * Retorna las películas de estreno reciente (año >= 2020).
   *
   * @param req Objeto de solicitud HTTP de Express
   * @param res Objeto de respuesta HTTP de Express
   */
  getRecentMovies = async (req: Request, res: Response): Promise<void> => {
    try {
      const movies = await this.getRecentMoviesUseCase.execute();
      res.json(movies);
    } catch (error) {
      HandleError.error(error, res);
    }
  };

  /**
   * Endpoint GET /api/movies/classics
   * Retorna las películas clásicas (año < 2000).
   *
   * @param req Objeto de solicitud HTTP de Express
   * @param res Objeto de respuesta HTTP de Express
   */
  getClassicMovies = async (req: Request, res: Response): Promise<void> => {
    try {
      const movies = await this.getClassicMoviesUseCase.execute();
      res.json(movies);
    } catch (error) {
      HandleError.error(error, res);
    }
  };
}
