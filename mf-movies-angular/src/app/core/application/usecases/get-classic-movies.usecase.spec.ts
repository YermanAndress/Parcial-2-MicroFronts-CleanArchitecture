import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { MOVIES_MOCK } from '../../../mocks/movies.mocks';
import { MovieRepository } from '../../domain/repositories/movie.repository';
import { GetClassicMoviesUseCase } from './get-classic-movies.usecase';

describe('GetClassicMoviesUseCase', () => {
  let useCase: GetClassicMoviesUseCase;
  const classicMoviesMock = MOVIES_MOCK.filter((m) => m.year < 2000);
  const movieRepositoryMock = {
    getAll: jest.fn(),
    getRecent: jest.fn(),
    getClassics: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [
        GetClassicMoviesUseCase,
        { provide: MovieRepository, useValue: movieRepositoryMock },
      ],
    });
    useCase = TestBed.inject(GetClassicMoviesUseCase);
  });

  it('debería instanciarse e inyectarse correctamente', () => {
    expect(useCase).toBeTruthy();
    expect(useCase).toBeInstanceOf(GetClassicMoviesUseCase);
  });

  it('debería delegar la llamada a getClassics del MovieRepository y retornar películas clásicas', async () => {
    movieRepositoryMock.getClassics.mockReturnValue(of(classicMoviesMock));
    const result = await firstValueFrom(useCase.execute());

    expect(movieRepositoryMock.getClassics).toHaveBeenCalledTimes(1);
    expect(result).toEqual(classicMoviesMock);
  });

  it('debería propagar el error cuando MovieRepository.getClassics falla', async () => {
    const errorExpected = new Error('Error al consultar películas clásicas');
    movieRepositoryMock.getClassics.mockReturnValue(throwError(() => errorExpected));

    await expect(firstValueFrom(useCase.execute())).rejects.toThrow(
      'Error al consultar películas clásicas'
    );
    expect(movieRepositoryMock.getClassics).toHaveBeenCalledTimes(1);
  });
});
