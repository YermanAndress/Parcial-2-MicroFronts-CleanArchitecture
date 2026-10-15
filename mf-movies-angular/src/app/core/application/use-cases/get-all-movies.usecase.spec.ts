import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { MOVIES_MOCK } from '../../../mocks/movies.mocks';
import { MovieRepository } from '../../domain/repositories/movie.repository';
import { GetAllMoviesUseCase } from './get-all-movies.usecase';

describe('GetAllMoviesUseCase', () => {
  let useCase: GetAllMoviesUseCase;

  const movieRepositoryMock: jest.Mocked<MovieRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
  } as unknown as jest.Mocked<MovieRepository>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetAllMoviesUseCase,
        { provide: MovieRepository, useValue: movieRepositoryMock },
      ],
    }).compileComponents();
    useCase = TestBed.inject(GetAllMoviesUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllMoviesUseCase);
  });

  it('debería delegar la llamada del repository', async () => {
    movieRepositoryMock.getAll.mockReturnValue(of(MOVIES_MOCK));
    const result = await firstValueFrom(useCase.execute());
    expect(movieRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(MOVIES_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo la búsqueda de películas';
    movieRepositoryMock.getAll.mockReturnValue(
      throwError(() => new Error(errorMessage)),
    );
    await expect(firstValueFrom(useCase.execute())).rejects.toThrow(errorMessage);
  });
});
