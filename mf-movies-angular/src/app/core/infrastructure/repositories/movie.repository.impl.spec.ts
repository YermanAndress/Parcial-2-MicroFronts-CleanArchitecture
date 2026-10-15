import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CREATE_MOVIE_MOCK, MOVIES_MOCK } from '../../../mocks/movies.mocks';
import { Movie } from '../../domain/models/movie.model';
import { MovieApiService } from '../services/movie-api.service';
import { MovieRepositoryImpl } from './movie.repository.impl';

describe('MovieRepositoryImpl (Infrastructure)', () => {
  let repository: MovieRepositoryImpl;

  const movieApiServiceMock = {
    getAllMovies: jest.fn(),
    getMovieById: jest.fn(),
    createMovie: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieRepositoryImpl,
        { provide: MovieApiService, useValue: movieApiServiceMock },
      ],
    }).compileComponents();
    repository = TestBed.inject(MovieRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a MovieApiService.getAllMovies()', (done) => {
    movieApiServiceMock.getAllMovies.mockReturnValue(of(MOVIES_MOCK));
    repository.getAll().subscribe((movies: Movie[]) => {
      expect(movies).toEqual(MOVIES_MOCK);
      expect(movieApiServiceMock.getAllMovies).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('debe delegar la llamada a MovieApiService.getMovieById()', (done) => {
    movieApiServiceMock.getMovieById.mockReturnValue(of(MOVIES_MOCK[0]));
    repository.getById(1).subscribe((movie: Movie) => {
      expect(movie).toEqual(MOVIES_MOCK[0]);
      expect(movieApiServiceMock.getMovieById).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('debe delegar la llamada a MovieApiService.createMovie()', (done) => {
    const created: Movie = { id: 3, ...CREATE_MOVIE_MOCK };
    movieApiServiceMock.createMovie.mockReturnValue(of(created));
    repository.create(CREATE_MOVIE_MOCK).subscribe((movie: Movie) => {
      expect(movie).toEqual(created);
      expect(movieApiServiceMock.createMovie).toHaveBeenCalledWith(
        CREATE_MOVIE_MOCK,
      );
      done();
    });
  });
});
