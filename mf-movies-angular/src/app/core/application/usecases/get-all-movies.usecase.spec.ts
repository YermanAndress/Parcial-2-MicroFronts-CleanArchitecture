import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { MOVIES_MOCK } from '../../../mocks/movies.mocks';
import { MovieRepository } from '../../domain/repositories/movie.repository';
import { GetAllMoviesUseCase } from './get-all-movies.usecase';

describe('GetAllMoviesUseCase', () => {
  let useCase: GetAllMoviesUseCase;
  const movieRepositoryMock = {
    getAll: jest.fn(),
    getRecent: jest.fn(),
    getClassics: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [
        GetAllMoviesUseCase,
        { provide: MovieRepository, useValue: movieRepositoryMock },
      ],
    });
    useCase = TestBed.inject(GetAllMoviesUseCase);
  });

  it('debería instanciarse e inyectarse correctamente', () => {
    expect(useCase).toBeTruthy();
    expect(useCase).toBeInstanceOf(GetAllMoviesUseCase);
  });

  it('debería delegar la llamada a getAll del MovieRepository y retornar películas', async () => {
    movieRepositoryMock.getAll.mockReturnValue(of(MOVIES_MOCK));
    const result = await firstValueFrom(useCase.execute());

    expect(movieRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(MOVIES_MOCK);
  });

  it('debería propagar el error cuando MovieRepository.getAll falla', async () => {
    const errorExpected = new Error('Error al consultar todas las películas');
    movieRepositoryMock.getAll.mockReturnValue(throwError(() => errorExpected));

    await expect(firstValueFrom(useCase.execute())).rejects.toThrow(
      'Error al consultar todas las películas'
    );
    expect(movieRepositoryMock.getAll).toHaveBeenCalledTimes(1);
  });
});
