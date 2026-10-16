/**
 * Configuración de variables de entorno para el microfrontend de películas.
 *
 * @remarks
 * Contiene los endpoints y URLs base de los servicios backend
 * requeridos por la arquitectura para la conmutación de repositorios.
 */
export const environment = {
  /**
   * Indica si la aplicación está en modo producción.
   */
  production: false,

  /**
   * URL de la API del microservicio backend Node.js en el puerto 3003.
   */
  apiUrlNode: 'http://localhost:3003/api',

  /**
   * URL de la API del microservicio backend Spring Boot en el puerto 8082.
   */
  apiUrlSpringBoot: 'http://localhost:8082/api',

  /**
   * URL base del backend Node.js.
   */
  baseUrlNode: 'http://localhost:3003',

  /**
   * URL base del backend Spring Boot.
   */
  baseUrlSpringBoot: 'http://localhost:8082',
};
