import { Router } from "express";
import { AuthorsRoutes } from "./authors.routes";

/**
 * Rutas principales de la aplicación.
 *
 * @remarks
 * Registra los módulos de rutas de cada recurso bajo el prefijo `/api`.
 */
export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use("/api/authors", AuthorsRoutes.routes);
    return router;
  }
}
