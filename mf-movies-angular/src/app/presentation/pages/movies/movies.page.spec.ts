import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CREATE_MOVIE_MOCK, MOVIES_MOCK } from '../../../mocks/movies.mocks';
import { CreateMovieUseCase } from '../../../core/application/use-cases/create-movie.usecase';
import { GetAllMoviesUseCase } from '../../../core/application/use-cases/get-all-movies.usecase';
import { GetMovieByIdUseCase } from '../../../core/application/use-cases/get-movie-by-id.usecase';
import { MovieRepository } from '../../../core/domain/repositories/movie.repository';
import { MoviesPage } from './movies.page';

describe('MoviesPage', () => {
  let component: MoviesPage;
  let fixture: ComponentFixture<MoviesPage>;

  const movieRepositoryMock: jest.Mocked<MovieRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
  } as unknown as jest.Mocked<MovieRepository>;

  beforeEach(async () => {
    movieRepositoryMock.getAll.mockReturnValue(of(MOVIES_MOCK));

    await TestBed.configureTestingModule({
      imports: [MoviesPage],
    })
      .overrideComponent(MoviesPage, {
        set: {
          providers: [
            GetAllMoviesUseCase,
            GetMovieByIdUseCase,
            CreateMovieUseCase,
            { provide: MovieRepository, useValue: movieRepositoryMock },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MoviesPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('debería cargar las películas en ngOnInit (success)', () => {
    fixture.detectChanges();
    expect(movieRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(component.movies).toEqual(MOVIES_MOCK);
    expect(component.state).toBe('success');
  });

  it('debería establecer el estado error si falla la carga', () => {
    movieRepositoryMock.getAll.mockReturnValue(
      throwError(() => new Error('error')),
    );
    fixture.detectChanges();
    expect(component.state).toBe('error');
  });

  it('searchById debería mostrar un error si no hay id', () => {
    fixture.detectChanges();
    component.searchId = null;
    component.searchById();
    expect(component.searchError).toContain('id');
  });

  it('searchById debería encontrar la película', () => {
    fixture.detectChanges();
    movieRepositoryMock.getById.mockReturnValue(of(MOVIES_MOCK[0]));
    component.searchId = 1;
    component.searchById();
    expect(movieRepositoryMock.getById).toHaveBeenCalledWith(1);
    expect(component.searchedMovie).toEqual(MOVIES_MOCK[0]);
    expect(component.searchError).toBe('');
  });

  it('searchById debería manejar el error de no encontrada', () => {
    fixture.detectChanges();
    movieRepositoryMock.getById.mockReturnValue(
      throwError(() => new Error('404')),
    );
    component.searchId = 99;
    component.searchById();
    expect(component.searchedMovie).toBeNull();
    expect(component.searchError).toContain('no encontrada');
  });

  it('createMovie debería crear y recargar el listado', () => {
    fixture.detectChanges();
    const created = { id: 3, ...CREATE_MOVIE_MOCK };
    movieRepositoryMock.create.mockReturnValue(of(created));
    component.form = { ...CREATE_MOVIE_MOCK };

    component.createMovie();

    expect(movieRepositoryMock.create).toHaveBeenCalledWith(CREATE_MOVIE_MOCK);
    expect(component.createState).toBe('success');
    expect(component.form.title).toBe('');
    expect(movieRepositoryMock.getAll).toHaveBeenCalledTimes(2);
  });

  it('createMovie debería manejar el error de creación', () => {
    fixture.detectChanges();
    movieRepositoryMock.create.mockReturnValue(
      throwError(() => new Error('error')),
    );
    component.createMovie();
    expect(component.createState).toBe('error');
  });
});
