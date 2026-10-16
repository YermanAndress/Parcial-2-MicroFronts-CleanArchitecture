import cors from "cors";
import express, { Router } from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../config/swagger";

/**
 * Interfaz con las opciones de inicialización del servidor.
 */
export interface ServerOptions {
  /** Puerto de escucha del servidor */
  port: number;
  /** Ruta a los archivos estáticos públicos */
  publicPath: string;
  /** Router con las rutas registradas */
  routes: Router;
}

/**
 * Servidor Express para el microservicio ms-movies-nodejs en el puerto 3003.
 *
 * @remarks
 * Centraliza la configuración de Express, middlewares (CORS, express.json),
 * archivos públicos, endpoints bajo `/api/movies`, documentación OpenAPI en `/api/docs`
 * y fallback SPA.
 */
export class Server {
  /** Instancia pública de Express */
  public readonly app = express();

  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  /**
   * Crea una nueva instancia de Server.
   *
   * @param options Opciones de configuración del servidor
   */
  constructor(options: ServerOptions) {
    const { port, publicPath, routes } = options;
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  /**
   * Inicializa y levanta el servidor HTTP.
   */
  async start(): Promise<void> {
    //* Middlewares
    this.app.use(cors());
    this.app.use(express.json());

    //* Carpeta estática pública
    this.app.use(express.static(this.publicPath));

    //* Rutas del API
    this.app.use(this.routes);

    //* Swagger UI en /api/docs
    this.app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    //* Fallback SPA
    this.app.use((req, res) => {
      res.sendFile(
        path.join(__dirname, `../../${this.publicPath}/index.html`)
      );
    });

    this.app.listen(this.port, () => {
      console.log(`Server Running on Port ${this.port}`);
    });
  }
}
