import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { MOVIES_MOCK } from '../../../mocks/movies.mocks';
import { MovieRepository } from '../../domain/repositories/movie.repository';
import { GetMovieByIdUseCase } from './get-movie-by-id.usecase';

describe('GetMovieByIdUseCase', () => {
  let useCase: GetMovieByIdUseCase;

  const movieRepositoryMock: jest.Mocked<MovieRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
  } as unknown as jest.Mocked<MovieRepository>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetMovieByIdUseCase,
        { provide: MovieRepository, useValue: movieRepositoryMock },
      ],
    }).compileComponents();
    useCase = TestBed.inject(GetMovieByIdUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetMovieByIdUseCase);
  });

  it('debería delegar la llamada del repository con el id recibido', async () => {
    movieRepositoryMock.getById.mockReturnValue(of(MOVIES_MOCK[0]));
    const result = await firstValueFrom(useCase.execute(1));
    expect(movieRepositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(movieRepositoryMock.getById).toHaveBeenCalledWith(1);
    expect(result).toEqual(MOVIES_MOCK[0]);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Película no encontrada';
    movieRepositoryMock.getById.mockReturnValue(
      throwError(() => new Error(errorMessage)),
    );
    await expect(firstValueFrom(useCase.execute(99))).rejects.toThrow(errorMessage);
  });
});
