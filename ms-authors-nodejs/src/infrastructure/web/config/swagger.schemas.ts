/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - country
 *         - birthYear
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único del autor
 *           example: 1
 *         name:
 *           type: string
 *           description: Nombre completo del autor
 *           example: Gabriel García Márquez
 *         country:
 *           type: string
 *           description: País de origen del autor
 *           example: Colombia
 *         birthYear:
 *           type: integer
 *           description: Año de nacimiento del autor
 *           example: 1927
 */
export {};
