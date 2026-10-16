import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { MOVIES_MOCK } from '../../../mocks/movies.mocks';
import { MovieRepository } from '../../domain/repositories/movie.repository';
import { GetRecentMoviesUseCase } from './get-recent-movies.usecase';

describe('GetRecentMoviesUseCase', () => {
  let useCase: GetRecentMoviesUseCase;
  const recentMoviesMock = MOVIES_MOCK.filter((m) => m.year >= 2020);
  const movieRepositoryMock = {
    getAll: jest.fn(),
    getRecent: jest.fn(),
    getClassics: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [
        GetRecentMoviesUseCase,
        { provide: MovieRepository, useValue: movieRepositoryMock },
      ],
    });
    useCase = TestBed.inject(GetRecentMoviesUseCase);
  });

  it('debería instanciarse e inyectarse correctamente', () => {
    expect(useCase).toBeTruthy();
    expect(useCase).toBeInstanceOf(GetRecentMoviesUseCase);
  });

  it('debería delegar la llamada a getRecent del MovieRepository y retornar películas recientes', async () => {
    movieRepositoryMock.getRecent.mockReturnValue(of(recentMoviesMock));
    const result = await firstValueFrom(useCase.execute());

    expect(movieRepositoryMock.getRecent).toHaveBeenCalledTimes(1);
    expect(result).toEqual(recentMoviesMock);
  });

  it('debería propagar el error cuando MovieRepository.getRecent falla', async () => {
    const errorExpected = new Error('Error al consultar películas recientes');
    movieRepositoryMock.getRecent.mockReturnValue(throwError(() => errorExpected));

    await expect(firstValueFrom(useCase.execute())).rejects.toThrow(
      'Error al consultar películas recientes'
    );
    expect(movieRepositoryMock.getRecent).toHaveBeenCalledTimes(1);
  });
});
