import { Router } from "express";
import { GetAllUsersUseCase } from "../../../application/usecases/get-all-users.usecase";
import { UserDatasource } from "../../datasources/user.datasource";
import { UserRepositoryImpl } from "../../repositories/user.repository.impl";
import { UsersController } from "../controllers/users.controller";

export class UsersRoutes {
  static get routes(): Router {
    const router = Router();
    const repository = new UserRepositoryImpl(new UserDatasource());
    const getAllUsers = new GetAllUsersUseCase(repository);
    const controller = new UsersController(getAllUsers);

    /**
     * @openapi
     * /api/users/{countUsers}:
     *   get:
     *     summary: Obtener listado de usuarios
     *     description: Retorna una lista de usuarios generados dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Users
     *     parameters:
     *       - in: path
     *         name: countUsers
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de usuarios a generar
     *     responses:
     *       200:
     *         description: Lista de usuarios generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
     *       400:
     *         description: Parámetro inválido
     */
    router.get("/:countUsers", controller.getAllUsers);

    return router;
  }
}