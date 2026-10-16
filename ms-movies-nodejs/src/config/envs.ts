import "dotenv/config";
import { get } from "env-var";

/**
 * Variables de entorno utilizadas por la aplicación.
 *
 * @remarks
 * Centraliza la lectura y validación de las variables de entorno
 * requeridas para el microservicio ms-movies-nodejs en el puerto 3003.
 *
 * @example
 * ```ts
 * console.log(envs.PORT); // 3003
 * ```
 */
export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  PUBLIC_PATH: get("PUBLIC_PATH").default("public").asString(),
};
