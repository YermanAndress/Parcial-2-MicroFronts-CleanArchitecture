import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieModel } from '../../domain/models/movie.model';
import { MovieRepository } from '../../domain/repositories/movie.repository';

/**
 * Caso de uso para obtener la totalidad de películas del catálogo.
 *
 * @remarks
 * Pertenece a la capa de Aplicación de Clean Architecture. Orquesta
 * la recuperación del listado de películas delegando directamente
 * en el contrato abstracto {@link MovieRepository}.
 *
 * @see {@link MovieModel}
 * @see {@link MovieRepository}
 */
@Injectable({ providedIn: 'root' })
export class GetAllMoviesUseCase {
  /**
   * Referencia al contrato abstracto del repositorio de películas, inyectado mediante `inject()`.
   */
  private readonly movieRepository = inject(MovieRepository);

  /**
   * Ejecuta el caso de uso solicitando todas las películas disponibles.
   *
   * @returns Un {@link Observable} que emite la lista completa de {@link MovieModel}.
   */
  execute(): Observable<MovieModel[]> {
    return this.movieRepository.getAll();
  }
}
