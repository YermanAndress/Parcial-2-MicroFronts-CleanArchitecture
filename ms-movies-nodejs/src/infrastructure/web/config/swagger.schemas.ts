/**
 * Definición de esquemas OpenAPI para Swagger.
 *
 * @remarks
 * Registra el esquema `Movie` con los tipos estrictos:
 * id: string, title: string, director: string, year: number, genre: string.
 *
 * @openapi
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - director
 *         - year
 *         - genre
 *       properties:
 *         id:
 *           type: string
 *           description: Identificador único de la película
 *           example: "1"
 *         title:
 *           type: string
 *           description: Título de la película
 *           example: "Inception"
 *         director:
 *           type: string
 *           description: Director cinematográfico
 *           example: "Christopher Nolan"
 *         year:
 *           type: integer
 *           description: Año de estreno de la película
 *           example: 2010
 *         genre:
 *           type: string
 *           description: Género cinematográfico
 *           example: "Sci-Fi"
 */
export const swaggerSchemas = {};
