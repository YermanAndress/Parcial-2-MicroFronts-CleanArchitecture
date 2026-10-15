import { Request, Response } from 'express';
import { CreateMovieUseCase } from '../../../application/usecases/create-movie.usecase';
import { GetAllMoviesUseCase } from '../../../application/usecases/get-all-movies.usecase';
import { GetMovieByIdUseCase } from '../../../application/usecases/get-movie-by-id.usecase';
import { CreateMovieDto } from '../../../domain/models/movie.model';
import { CustomError } from '../erros/custom.error';
import { HandleError } from '../erros/handle.error';

/**
 * Controlador HTTP para operaciones relacionadas con películas.
 *
 * @remarks
 * Esta clase pertenece a la **capa más externa** de la aplicación
 * (*Frameworks & Drivers*) y su responsabilidad es recibir solicitudes
 * HTTP, extraer parámetros y delegar la lógica a los casos de uso.
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No accede directamente a repositorios ni datasources.
 *
 * @see {@link GetAllMoviesUseCase}
 * @see {@link GetMovieByIdUseCase}
 * @see {@link CreateMovieUseCase}
 */
export class MoviesController {
  /**
   * Crea una nueva instancia del controlador de películas.
   *
   * @param getAllMoviesUseCase - Caso de uso para listar películas
   * @param getMovieByIdUseCase - Caso de uso para consultar por id
   * @param createMovieUseCase - Caso de uso para crear películas
   */
  constructor(
    private readonly getAllMoviesUseCase: GetAllMoviesUseCase,
    private readonly getMovieByIdUseCase: GetMovieByIdUseCase,
    private readonly createMovieUseCase: CreateMovieUseCase,
  ) {}

  /**
   * Maneja la petición HTTP para obtener el listado de películas.
   *
   * @param req - Objeto Request de Express
   * @param res - Objeto Response de Express
   */
  getAllMovies = (req: Request, res: Response): void => {
    this.getAllMoviesUseCase
      .execute()
      .then((movies) => res.status(200).json(movies))
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Maneja la petición HTTP para obtener una película por su id.
   *
   * @remarks
   * Si la película no existe se responde con un error 404.
   *
   * @param req - Objeto Request de Express
   * @param res - Objeto Response de Express
   */
  getMovieById = (req: Request, res: Response): void => {
    const id = Number(req.params.id);

    if (Number.isNaN(id) || id <= 0) {
      HandleError.error(CustomError.badRequest('Invalid movie id'), res);
      return;
    }

    this.getMovieByIdUseCase
      .execute(id)
      .then((movie) => {
        if (!movie) {
          throw CustomError.notFound(`Movie with id ${id} not found`);
        }
        res.status(200).json(movie);
      })
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Maneja la petición HTTP para crear una película.
   *
   * @param req - Objeto Request de Express
   * @param res - Objeto Response de Express
   */
  createMovie = (req: Request, res: Response): void => {
    const { title, director, year, genre } = req.body as Partial<CreateMovieDto>;

    if (!title || !director || !year || !genre) {
      HandleError.error(
        CustomError.badRequest('title, director, year and genre are required'),
        res,
      );
      return;
    }

    this.createMovieUseCase
      .execute({ title, director, year, genre })
      .then((movie) => res.status(201).json(movie))
      .catch((error) => HandleError.error(error, res));
  };
}
