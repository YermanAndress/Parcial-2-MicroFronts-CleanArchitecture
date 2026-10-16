import { MovieModel } from '../core/domain/models/movie.model';

/**
 * Arreglo de películas simuladas (Mocks) para pruebas y entorno local.
 *
 * @remarks
 * Contiene una colección representativa de películas que incluye obras
 * clásicas (año < 2000), películas intermedias y estrenos recientes (año >= 2020)
 * para validar los 3 casos de uso del dominio sin requerir servicios externos.
 */
export const MOVIES_MOCK: MovieModel[] = [
  {
    id: '1',
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    year: 1972,
    genre: 'Crime',
  },
  {
    id: '2',
    title: 'Blade Runner',
    director: 'Ridley Scott',
    year: 1982,
    genre: 'Sci-Fi',
  },
  {
    id: '3',
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    year: 1994,
    genre: 'Crime',
  },
  {
    id: '4',
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    year: 2008,
    genre: 'Action',
  },
  {
    id: '5',
    title: 'Inception',
    director: 'Christopher Nolan',
    year: 2010,
    genre: 'Sci-Fi',
  },
  {
    id: '6',
    title: 'Interstellar',
    director: 'Christopher Nolan',
    year: 2014,
    genre: 'Sci-Fi',
  },
  {
    id: '7',
    title: 'Dune: Part One',
    director: 'Denis Villeneuve',
    year: 2021,
    genre: 'Sci-Fi',
  },
  {
    id: '8',
    title: 'Avatar: The Way of Water',
    director: 'James Cameron',
    year: 2022,
    genre: 'Action',
  },
  {
    id: '9',
    title: 'Oppenheimer',
    director: 'Christopher Nolan',
    year: 2023,
    genre: 'Drama',
  },
  {
    id: '10',
    title: 'Dune: Part Two',
    director: 'Denis Villeneuve',
    year: 2024,
    genre: 'Sci-Fi',
  },
];
