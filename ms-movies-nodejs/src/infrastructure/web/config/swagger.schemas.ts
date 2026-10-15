/**
 * @openapi
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       description: Representa una película del sistema
 *       required:
 *         - id
 *         - title
 *         - director
 *         - year
 *         - genre
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         title:
 *           type: string
 *           example: Inception
 *         director:
 *           type: string
 *           example: Christopher Nolan
 *         year:
 *           type: number
 *           example: 2010
 *         genre:
 *           type: string
 *           enum:
 *             - Action
 *             - Comedy
 *             - Drama
 *             - Sci-Fi
 *             - Animation
 *             - Thriller
 *             - Horror
 *           example: Sci-Fi
 *     CreateMovie:
 *       type: object
 *       description: Datos necesarios para crear una película
 *       required:
 *         - title
 *         - director
 *         - year
 *         - genre
 *       properties:
 *         title:
 *           type: string
 *           example: Inception
 *         director:
 *           type: string
 *           example: Christopher Nolan
 *         year:
 *           type: number
 *           example: 2010
 *         genre:
 *           type: string
 *           enum:
 *             - Action
 *             - Comedy
 *             - Drama
 *             - Sci-Fi
 *             - Animation
 *             - Thriller
 *             - Horror
 *           example: Sci-Fi
 */
export {};
