import { Router } from 'express';
import { CreateMovieUseCase } from '../../../application/usecases/create-movie.usecase';
import { GetAllMoviesUseCase } from '../../../application/usecases/get-all-movies.usecase';
import { GetMovieByIdUseCase } from '../../../application/usecases/get-movie-by-id.usecase';
import { MovieDatasource } from '../../datasources/movie.datasource';
import { MovieRepositoryImpl } from '../../repositories/movie.repository.impl';
import { MoviesController } from '../controllers/movies.controller';

/**
 * Rutas del módulo de películas.
 *
 * @remarks
 * Define y expone los endpoints HTTP del recurso `movies`, además
 * de documentar cada operación mediante anotaciones OpenAPI.
 *
 * @example
 * ```ts
 * router.use('/api/movies', MoviesRoutes.routes);
 * ```
 */
export class MoviesRoutes {
  /**
   * Devuelve el router con las rutas de películas registradas.
   *
   * @returns Router de Express para el recurso `movies`
   */
  static get routes(): Router {
    const router = Router();
    const repository = new MovieRepositoryImpl(new MovieDatasource());
    const getAllMovies = new GetAllMoviesUseCase(repository);
    const getMovieById = new GetMovieByIdUseCase(repository);
    const createMovie = new CreateMovieUseCase(repository);
    const controller = new MoviesController(
      getAllMovies,
      getMovieById,
      createMovie,
    );

    /**
     * @openapi
     * /api/movies:
     *   get:
     *     summary: Obtener el listado de películas
     *     description: Retorna la lista completa de películas registradas.
     *     tags:
     *       - Movies
     *     responses:
     *       200:
     *         description: Lista de películas
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Movie'
     *   post:
     *     summary: Crear una película
     *     description: Registra una nueva película con los datos enviados.
     *     tags:
     *       - Movies
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateMovie'
     *     responses:
     *       201:
     *         description: Película creada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Movie'
     *       400:
     *         description: Datos inválidos
     */
    router.get('/', controller.getAllMovies);
    router.post('/', controller.createMovie);

    /**
     * @openapi
     * /api/movies/{id}:
     *   get:
     *     summary: Obtener una película por id
     *     description: Retorna la película cuyo identificador coincide con el enviado.
     *     tags:
     *       - Movies
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 1
     *         description: Identificador único de la película
     *     responses:
     *       200:
     *         description: Película encontrada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Movie'
     *       404:
     *         description: Película no encontrada
     */
    router.get('/:id', controller.getMovieById);

    return router;
  }
}
