import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateMovieUseCase } from '../../../core/application/use-cases/create-movie.usecase';
import { GetAllMoviesUseCase } from '../../../core/application/use-cases/get-all-movies.usecase';
import { GetMovieByIdUseCase } from '../../../core/application/use-cases/get-movie-by-id.usecase';
import {
  CreateMovieDto,
  Movie,
  MovieGenre,
} from '../../../core/domain/models/movie.model';
import { MovieRepository } from '../../../core/domain/repositories/movie.repository';
import { MovieRepositoryImpl } from '../../../core/infrastructure/repositories/movie.repository.impl';
import { State } from '../../interfaces/state.interface';

/**
 * Página de películas.
 *
 * @remarks
 * Componente contenedor que orquesta los tres casos de uso del
 * microfrontend: listar, buscar por id y crear películas.
 *
 * Forma parte de la **capa de presentación** y consume los casos de uso
 * de la capa de aplicación (Clean Architecture).
 *
 * @remarks
 * El contrato `MovieRepository` se registra a nivel de componente para
 * que el microfrontend sea autocontenido: al ser cargado por el host vía
 * Module Federation, el `app.config.ts` del remoto no se ejecuta y sus
 * *providers* no estarían disponibles. Registrarlo aquí garantiza que
 * funcione tanto de forma individual como integrado en el host.
 */
@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrl: './movies.page.scss',
  imports: [FormsModule],
  providers: [
    GetAllMoviesUseCase,
    GetMovieByIdUseCase,
    CreateMovieUseCase,
    { provide: MovieRepository, useClass: MovieRepositoryImpl },
  ],
})
export class MoviesPage {
  /** Listado de películas obtenidas desde el caso de uso. */
  movies: Movie[] = [];

  /** Estado de la carga del listado. */
  state: State = 'init';

  /** Estado del formulario de creación. */
  createState: State = 'init';

  /** Identificador ingresado para la búsqueda. */
  searchId: number | null = null;

  /** Película encontrada en la búsqueda por id. */
  searchedMovie: Movie | null = null;

  /** Mensaje de error de la búsqueda. */
  searchError = '';

  /** Géneros disponibles para el formulario. */
  genres: MovieGenre[] = [
    'Action',
    'Comedy',
    'Drama',
    'Sci-Fi',
    'Animation',
    'Thriller',
    'Horror',
  ];

  /** Modelo del formulario de creación. */
  form: CreateMovieDto = this.createEmptyForm();

  private getAllMoviesUseCase = inject(GetAllMoviesUseCase);
  private getMovieByIdUseCase = inject(GetMovieByIdUseCase);
  private createMovieUseCase = inject(CreateMovieUseCase);

  /**
   * Inicializa el componente cargando el listado de películas.
   */
  ngOnInit(): void {
    this.loadMovies();
  }

  /**
   * Carga el listado de películas usando el caso de uso
   * {@link GetAllMoviesUseCase}.
   */
  loadMovies(): void {
    this.state = 'loading';
    this.getAllMoviesUseCase.execute().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.state = 'success';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  /**
   * Busca una película por id usando el caso de uso
   * {@link GetMovieByIdUseCase}.
   */
  searchById(): void {
    if (this.searchId === null) {
      this.searchError = 'Ingrese un id válido';
      return;
    }

    this.searchError = '';
    this.getMovieByIdUseCase.execute(this.searchId).subscribe({
      next: (movie) => {
        this.searchedMovie = movie;
      },
      error: () => {
        this.searchedMovie = null;
        this.searchError = 'Película no encontrada';
      },
    });
  }

  /**
   * Crea una película usando el caso de uso {@link CreateMovieUseCase}.
   *
   * @remarks
   * Al finalizar correctamente, reinicia el formulario y recarga el
   * listado.
   */
  createMovie(): void {
    this.createState = 'loading';
    this.createMovieUseCase.execute({ ...this.form }).subscribe({
      next: () => {
        this.createState = 'success';
        this.form = this.createEmptyForm();
        this.loadMovies();
      },
      error: () => {
        this.createState = 'error';
      },
    });
  }

  /**
   * Construye un modelo de formulario vacío.
   *
   * @returns Datos iniciales de una película
   */
  private createEmptyForm(): CreateMovieDto {
    return {
      title: '',
      director: '',
      year: new Date().getFullYear(),
      genre: 'Action',
    };
  }
}
