import { Router } from "express";
import { GetAllMoviesUseCase } from "../../../application/usecases/get-all-movies.usecase";
import { GetClassicMoviesUseCase } from "../../../application/usecases/get-classic-movies.usecase";
import { GetRecentMoviesUseCase } from "../../../application/usecases/get-recent-movies.usecase";
import { MovieRepositoryImpl } from "../../../infrastructure/repositories/movie.repository.impl";
import { MoviesController } from "./movies.controller";

/**
 * Rutas del módulo de películas en la capa de Presentación.
 *
 * @remarks
 * Define y expone los endpoints HTTP del recurso `movies` documentados con Swagger/OpenAPI:
 * - `GET /api/movies`: Todas las películas del catálogo
 * - `GET /api/movies/recent`: Películas de estreno reciente (año >= 2020)
 * - `GET /api/movies/classics`: Películas clásicas (año < 2000)
 */
export class MoviesRoutes {
  /**
   * Router con los endpoints de películas y sus anotaciones Swagger OpenAPI.
   */
  static get routes(): Router {
    const router = Router();

    const movieRepository = new MovieRepositoryImpl();
    const getAllMoviesUseCase = new GetAllMoviesUseCase(movieRepository);
    const getRecentMoviesUseCase = new GetRecentMoviesUseCase(movieRepository);
    const getClassicMoviesUseCase = new GetClassicMoviesUseCase(movieRepository);

    const controller = new MoviesController(
      getAllMoviesUseCase,
      getRecentMoviesUseCase,
      getClassicMoviesUseCase
    );

    /**
     * @swagger
     * /api/movies:
     *   get:
     *     summary: Obtener todas las películas
     *     description: Retorna la lista completa de películas del catálogo generadas dinámicamente con Faker.
     *     tags:
     *       - Movies
     *     responses:
     *       200:
     *         description: Catálogo completo de películas obtenido exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Movie'
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/", controller.getAllMovies);

    /**
     * @swagger
     * /api/movies/recent:
     *   get:
     *     summary: Obtener películas recientes
     *     description: Retorna las películas de estreno reciente con año mayor o igual a 2020.
     *     tags:
     *       - Movies
     *     responses:
     *       200:
     *         description: Lista de películas recientes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Movie'
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/recent", controller.getRecentMovies);

    /**
     * @swagger
     * /api/movies/classics:
     *   get:
     *     summary: Obtener películas clásicas
     *     description: Retorna las películas cinematográficas clásicas con año anterior al 2000.
     *     tags:
     *       - Movies
     *     responses:
     *       200:
     *         description: Lista de películas clásicas
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Movie'
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/classics", controller.getClassicMovies);

    return router;
  }
}
