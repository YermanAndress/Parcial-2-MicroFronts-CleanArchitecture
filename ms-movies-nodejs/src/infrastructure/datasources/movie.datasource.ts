import { faker } from '@faker-js/faker';
import { CreateMovieDto, Movie, MovieGenre } from '../../domain/models/movie.model';

/**
 * Datasource encargado de gestionar películas simuladas.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa como
 * una **fuente de datos (Datasource)**. Utiliza la librería
 * {@link https://www.npmjs.com/package/@faker-js/faker | faker}
 * para generar información falsa de películas.
 *
 * Mantiene un almacenamiento en memoria que permite listar,
 * consultar por id y registrar nuevas películas.
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No implementa repositorios del dominio.
 *
 * Es consumida por `MovieRepositoryImpl`, que se encarga de adaptar
 * los datos al dominio y exponerlos mediante el contrato
 * `MovieRepository`.
 */
export class MovieDatasource {
  /**
   * Géneros disponibles para las películas simuladas.
   */
  private readonly genres: MovieGenre[] = [
    'Action',
    'Comedy',
    'Drama',
    'Sci-Fi',
    'Animation',
    'Thriller',
    'Horror',
  ];

  /**
   * Almacenamiento en memoria de las películas.
   */
  private movies: Movie[] = [];

  /**
   * Crea una nueva instancia del datasource.
   *
   * @remarks
   * Al inicializarse genera un conjunto de películas simuladas
   * que sirven como datos semilla.
   *
   * @param seedCount - Cantidad de películas semilla a generar
   */
  constructor(private readonly seedCount: number = 10) {
    this.movies = this.generateMovies(this.seedCount);
  }

  /**
   * Obtiene el listado completo de películas.
   *
   * @returns Promesa que resuelve un arreglo de {@link Movie}
   */
  async getAll(): Promise<Movie[]> {
    return Promise.resolve([...this.movies]);
  }

  /**
   * Obtiene una película por su identificador.
   *
   * @param id - Identificador único de la película
   * @returns Promesa que resuelve la {@link Movie} o `undefined`
   */
  async getById(id: number): Promise<Movie | undefined> {
    return Promise.resolve(this.movies.find((movie) => movie.id === id));
  }

  /**
   * Crea una nueva película a partir de los datos recibidos.
   *
   * @param movie - Datos de la película a crear (sin `id`)
   * @returns Promesa que resuelve la {@link Movie} creada
   */
  async create(movie: CreateMovieDto): Promise<Movie> {
    const nextId =
      this.movies.reduce((maxId, current) => Math.max(maxId, current.id), 0) + 1;

    const newMovie: Movie = { id: nextId, ...movie };
    this.movies.push(newMovie);

    return Promise.resolve(newMovie);
  }

  /**
   * Genera un conjunto de películas simuladas.
   *
   * @param count - Cantidad de películas a generar
   * @returns Arreglo de {@link Movie}
   */
  private generateMovies(count: number): Movie[] {
    const movies: Movie[] = [];

    for (let i = 1; i <= count; i++) {
      movies.push(this.generateMovie(i));
    }

    return movies;
  }

  /**
   * Genera una película individual con datos simulados.
   *
   * @param id - Identificador único de la película
   * @returns {@link Movie} generada
   */
  private generateMovie(id: number): Movie {
    return {
      id,
      title: faker.book.title(),
      director: faker.book.author(),
      year: faker.number.int({ min: 1970, max: 2025 }),
      genre: faker.helpers.arrayElement(this.genres),
    };
  }
}
