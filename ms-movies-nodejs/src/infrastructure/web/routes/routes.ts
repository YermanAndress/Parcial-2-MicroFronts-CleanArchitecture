import { Router } from "express";

// TODO: crear <entidad>.routes.ts en esta carpeta y registrarlo aquí.
// Ejemplo: router.use("/api/authors", AuthorsRoutes.routes);
export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    return router;
  }
}
