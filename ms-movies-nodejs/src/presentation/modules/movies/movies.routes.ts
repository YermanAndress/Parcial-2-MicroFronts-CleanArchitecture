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
 * Instancia la implementación del repositorio, los 3 casos de uso y el controlador,
 * exponiendo los endpoints `/`, `/recent` y `/classics`.
 */
export class MoviesRoutes {
  /**
   * Router configurado con las rutas de películas.
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

    router.get("/", controller.getAllMovies);
    router.get("/recent", controller.getRecentMovies);
    router.get("/classics", controller.getClassicMovies);

    return router;
  }
}
