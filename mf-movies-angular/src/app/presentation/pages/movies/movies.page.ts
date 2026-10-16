import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { GetAllMoviesUseCase } from '../../../core/application/usecases/get-all-movies.usecase';
import { GetClassicMoviesUseCase } from '../../../core/application/usecases/get-classic-movies.usecase';
import { GetRecentMoviesUseCase } from '../../../core/application/usecases/get-recent-movies.usecase';
import { MovieModel } from '../../../core/domain/models/movie.model';
import { MoviesTableComponent } from '../../components/movies-table/movies-table.component';
import { State } from '../../interfaces/state.interface';

/**
 * Página principal (Smart Component) del microfrontend de películas.
 *
 * @remarks
 * Esta página pertenece a la capa de Presentación de Clean Architecture.
 * Cumple estrictamente con la regla de dependencia: **SOLO inyecta los 3 Casos de Uso**
 * ({@link GetAllMoviesUseCase}, {@link GetRecentMoviesUseCase}, {@link GetClassicMoviesUseCase})
 * y nunca inyecta directamente `HttpClient`, `DataService` ni implementaciones concretas
 * de repositorios.
 *
 * Administra el ciclo de vida, los estados de carga (`State`) y coordina las
 * acciones de filtrado de películas.
 */
@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrl: './movies.page.scss',
  standalone: true,
  imports: [CommonModule, MoviesTableComponent],
  providers: [
    GetAllMoviesUseCase,
    GetRecentMoviesUseCase,
    GetClassicMoviesUseCase,
  ],
})
export class MoviesPage implements OnInit {
  /**
   * Caso de uso inyectado para obtener todas las películas del catálogo.
   */
  private readonly getAllMoviesUseCase: GetAllMoviesUseCase = inject(GetAllMoviesUseCase);

  /**
   * Caso de uso inyectado para obtener las películas de estreno reciente (año >= 2020).
   */
  private readonly getRecentMoviesUseCase: GetRecentMoviesUseCase = inject(GetRecentMoviesUseCase);

  /**
   * Caso de uso inyectado para obtener las películas clásicas (año < 2000).
   */
  private readonly getClassicMoviesUseCase: GetClassicMoviesUseCase = inject(GetClassicMoviesUseCase);

  /**
   * Arreglo con la lista de películas actualmente cargadas en pantalla.
   */
  movies: MovieModel[] = [];

  /**
   * Estado asíncrono actual del componente ('init', 'loading', 'success', 'error').
   */
  state: State = 'init';

  /**
   * Mensaje descriptivo de error en caso de fallo en la petición.
   */
  errorMessage: string = '';

  /**
   * Título descriptivo de la vista según el filtro activo.
   */
  activeFilterTitle: string = 'Catálogo Completo';

  /**
   * Inicializa el componente ejecutando por defecto la carga de todas las películas.
   */
  ngOnInit(): void {
    this.loadAllMovies();
  }

  /**
   * Ejecuta el caso de uso 1: Carga todas las películas del catálogo.
   */
  loadAllMovies(): void {
    this.state = 'loading';
    this.errorMessage = '';
    this.activeFilterTitle = 'Catálogo Completo';

    this.getAllMoviesUseCase.execute().subscribe({
      next: (movies: MovieModel[]) => {
        this.movies = movies;
        this.state = 'success';
      },
      error: (error: unknown) => {
        this.state = 'error';
        this.errorMessage = 'Ocurrió un error al cargar todas las películas.';
        console.error('Error cargando películas:', error);
      },
    });
  }

  /**
   * Ejecuta el caso de uso 2: Carga únicamente las películas recientes (año >= 2020).
   */
  loadRecentMovies(): void {
    this.state = 'loading';
    this.errorMessage = '';
    this.activeFilterTitle = 'Películas Recientes (2020 - Actualidad)';

    this.getRecentMoviesUseCase.execute().subscribe({
      next: (movies: MovieModel[]) => {
        this.movies = movies;
        this.state = 'success';
      },
      error: (error: unknown) => {
        this.state = 'error';
        this.errorMessage = 'Ocurrió un error al cargar las películas recientes.';
        console.error('Error cargando películas recientes:', error);
      },
    });
  }

  /**
   * Ejecuta el caso de uso 3: Carga únicamente las películas clásicas (año < 2000).
   */
  loadClassicMovies(): void {
    this.state = 'loading';
    this.errorMessage = '';
    this.activeFilterTitle = 'Películas Clásicas (Antes del 2000)';

    this.getClassicMoviesUseCase.execute().subscribe({
      next: (movies: MovieModel[]) => {
        this.movies = movies;
        this.state = 'success';
      },
      error: (error: unknown) => {
        this.state = 'error';
        this.errorMessage = 'Ocurrió un error al cargar las películas clásicas.';
        console.error('Error cargando películas clásicas:', error);
      },
    });
  }
}
