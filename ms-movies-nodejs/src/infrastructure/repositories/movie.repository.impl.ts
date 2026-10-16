import { faker } from "@faker-js/faker";
import { Movie } from "../../domain/models/movie.model";
import { MovieRepository } from "../../domain/repositories/movie.repository";

/**
 * Implementación del repositorio de películas utilizando datos dinámicos de Faker.js.
 *
 * @remarks
 * Pertenece a la capa de Infraestructura. Genera 15 películas dinámicas en memoria
 * garantizando la existencia de películas clásicas (año < 2000) y recientes (año >= 2020),
 * satisfaciendo los 3 casos de uso del dominio sin acoplar la lógica de negocio.
 */
export class MovieRepositoryImpl implements MovieRepository {
  /**
   * Catálogo de películas almacenado en memoria.
   */
  private readonly movies: Movie[];

  /**
   * Inicializa el repositorio generando 15 películas dinámicas.
   */
  constructor() {
    this.movies = this.seedMovies();
  }

  /**
   * Genera 15 películas con Faker garantizando variedad cronológica.
   *
   * @returns Lista de 15 películas con contrato Movie estricto
   */
  private seedMovies(): Movie[] {
    const genres = [
      "Action",
      "Comedy",
      "Drama",
      "Sci-Fi",
      "Thriller",
      "Horror",
      "Animation",
      "Adventure",
    ];

    const generated: Movie[] = [];

    // 5 Películas clásicas (1975 - 1999) -> year < 2000
    for (let i = 1; i <= 5; i++) {
      generated.push({
        id: String(i),
        title: faker.book.title(),
        director: faker.person.fullName(),
        year: faker.number.int({ min: 1975, max: 1999 }),
        genre: faker.helpers.arrayElement(genres),
      });
    }

    // 5 Películas intermedias (2000 - 2019)
    for (let i = 6; i <= 10; i++) {
      generated.push({
        id: String(i),
        title: faker.book.title(),
        director: faker.person.fullName(),
        year: faker.number.int({ min: 2000, max: 2019 }),
        genre: faker.helpers.arrayElement(genres),
      });
    }

    // 5 Películas de estreno reciente (2020 - 2024) -> year >= 2020
    for (let i = 11; i <= 15; i++) {
      generated.push({
        id: String(i),
        title: faker.book.title(),
        director: faker.person.fullName(),
        year: faker.number.int({ min: 2020, max: 2024 }),
        genre: faker.helpers.arrayElement(genres),
      });
    }

    return generated;
  }

  /**
   * Obtiene todas las películas del catálogo.
   *
   * @returns Promesa con las 15 películas
   */
  async getAll(): Promise<Movie[]> {
    return [...this.movies];
  }

  /**
   * Obtiene las películas con año de estreno reciente (año >= 2020).
   *
   * @returns Promesa con las películas con year >= 2020
   */
  async getRecent(): Promise<Movie[]> {
    return this.movies.filter((movie) => movie.year >= 2020);
  }

  /**
   * Obtiene las películas consideradas clásicas (año < 2000).
   *
   * @returns Promesa con las películas con year < 2000
   */
  async getClassics(): Promise<Movie[]> {
    return this.movies.filter((movie) => movie.year < 2000);
  }
}
