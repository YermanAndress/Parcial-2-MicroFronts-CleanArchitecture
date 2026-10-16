import { Router } from "express";
import { MoviesRoutes } from "./modules/movies/movies.routes";

/**
 * Enrutador principal de la aplicación.
 *
 * @remarks
 * Centraliza las rutas de los módulos de la aplicación,
 * registrando el módulo de películas bajo el prefijo `/api/movies`.
 */
export class AppRoutes {
  /**
   * Obtiene la instancia del Router con todas las rutas registradas.
   */
  static get routes(): Router {
    const router = Router();

    // Registrar rutas del módulo movies
    router.use("/api/movies", MoviesRoutes.routes);

    return router;
  }
}
