import { CreateMovieDto, Movie } from '../core/domain/models/movie.model';

/**
 * Películas de prueba utilizadas en pruebas unitarias y desarrollo.
 */
export const MOVIES_MOCK: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    director: 'Christopher Nolan',
    year: 2010,
    genre: 'Sci-Fi',
  },
  {
    id: 2,
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    year: 1972,
    genre: 'Drama',
  },
];

/**
 * Datos de prueba para crear una película.
 */
export const CREATE_MOVIE_MOCK: CreateMovieDto = {
  title: 'Interstellar',
  director: 'Christopher Nolan',
  year: 2014,
  genre: 'Sci-Fi',
};
