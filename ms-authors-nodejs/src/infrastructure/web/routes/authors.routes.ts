import { Router } from "express";
import { CreateAuthorUseCase } from "../../../application/usecases/create-author.usecase";
import { GetAllAuthorsUseCase } from "../../../application/usecases/get-all-authors.usecase";
import { GetAuthorByIdUseCase } from "../../../application/usecases/get-author-by-id.usecase";
import { AuthorRepositoryImpl } from "../../repositories/author.repository.impl";
import { AuthorsController } from "../controllers/authors.controller";

/**
 * Rutas del recurso de autores en la capa de Infraestructura (web).
 *
 * @remarks
 * Define y expone los endpoints HTTP del recurso `authors` documentados con Swagger/OpenAPI:
 * - `GET /api/authors/:count`: Primeros `count` autores del catálogo
 * - `GET /api/authors/item/:id`: Autor por identificador
 * - `POST /api/authors`: Crear un nuevo autor
 */
export class AuthorsRoutes {
  /**
   * Router con los endpoints de autores y sus anotaciones Swagger OpenAPI.
   */
  static get routes(): Router {
    const router = Router();

    const authorRepository = new AuthorRepositoryImpl();
    const getAllAuthorsUseCase = new GetAllAuthorsUseCase(authorRepository);
    const getAuthorByIdUseCase = new GetAuthorByIdUseCase(authorRepository);
    const createAuthorUseCase = new CreateAuthorUseCase(authorRepository);

    const controller = new AuthorsController(
      getAllAuthorsUseCase,
      getAuthorByIdUseCase,
      createAuthorUseCase
    );

    /**
     * @swagger
     * /api/authors/{count}:
     *   get:
     *     summary: Obtener autores
     *     description: Retorna los primeros `count` autores del catálogo generados dinámicamente con Faker.
     *     tags:
     *       - Authors
     *     parameters:
     *       - in: path
     *         name: count
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 0
     *         description: Cantidad máxima de autores a retornar
     *     responses:
     *       200:
     *         description: Lista de autores obtenida exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Author'
     *       400:
     *         description: Parámetro count inválido
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/:count", controller.getAllAuthors);

    /**
     * @swagger
     * /api/authors/item/{id}:
     *   get:
     *     summary: Obtener autor por id
     *     description: Retorna el autor con el identificador indicado.
     *     tags:
     *       - Authors
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *         description: Identificador del autor
     *     responses:
     *       200:
     *         description: Autor encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Author'
     *       400:
     *         description: Parámetro id inválido
     *       404:
     *         description: Autor no encontrado
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/item/:id", controller.getAuthorById);

    /**
     * @swagger
     * /api/authors:
     *   post:
     *     summary: Crear autor
     *     description: Crea un nuevo autor en el catálogo.
     *     tags:
     *       - Authors
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - country
     *               - birthYear
     *             properties:
     *               name:
     *                 type: string
     *               country:
     *                 type: string
     *               birthYear:
     *                 type: integer
     *     responses:
     *       201:
     *         description: Autor creado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Author'
     *       400:
     *         description: Cuerpo de la petición inválido
     *       500:
     *         description: Error interno del servidor
     */
    router.post("/", controller.createAuthor);

    return router;
  }
}
