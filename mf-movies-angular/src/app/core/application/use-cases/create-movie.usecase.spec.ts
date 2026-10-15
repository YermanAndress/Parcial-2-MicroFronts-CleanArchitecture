import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { CREATE_MOVIE_MOCK } from '../../../mocks/movies.mocks';
import { MovieRepository } from '../../domain/repositories/movie.repository';
import { CreateMovieUseCase } from './create-movie.usecase';

describe('CreateMovieUseCase', () => {
  let useCase: CreateMovieUseCase;

  const movieRepositoryMock: jest.Mocked<MovieRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
  } as unknown as jest.Mocked<MovieRepository>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreateMovieUseCase,
        { provide: MovieRepository, useValue: movieRepositoryMock },
      ],
    }).compileComponents();
    useCase = TestBed.inject(CreateMovieUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(CreateMovieUseCase);
  });

  it('debería delegar la creación al repository', async () => {
    const created = { id: 3, ...CREATE_MOVIE_MOCK };
    movieRepositoryMock.create.mockReturnValue(of(created));
    const result = await firstValueFrom(useCase.execute(CREATE_MOVIE_MOCK));
    expect(movieRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(movieRepositoryMock.create).toHaveBeenCalledWith(CREATE_MOVIE_MOCK);
    expect(result).toEqual(created);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Error al crear la película';
    movieRepositoryMock.create.mockReturnValue(
      throwError(() => new Error(errorMessage)),
    );
    await expect(
      firstValueFrom(useCase.execute(CREATE_MOVIE_MOCK)),
    ).rejects.toThrow(errorMessage);
  });
});
