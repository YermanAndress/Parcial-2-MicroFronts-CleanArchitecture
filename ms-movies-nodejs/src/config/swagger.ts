import swaggerJsdoc from "swagger-jsdoc";

/**
 * Especificación de Swagger (OpenAPI 3.0) para la API de películas.
 */
export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Movies - ms-movies-nodejs",
      version: "1.0.0",
      description: "Documentación de la API de películas (ms-movies-nodejs) en el puerto 3003",
    },
    servers: [
      {
        url: "http://localhost:3003",
        description: "Servidor local",
      },
    ],
  },
  apis: [
    "./src/presentation/**/*.routes.ts",
    "./src/infrastructure/web/routes/**/*.routes.ts",
    "./src/config/swagger.schemas.ts",
    "./src/infrastructure/web/config/swagger.schemas.ts",
  ],
});
