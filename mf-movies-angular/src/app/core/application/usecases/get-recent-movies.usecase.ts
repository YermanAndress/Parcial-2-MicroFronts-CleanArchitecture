import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieModel } from '../../domain/models/movie.model';
import { MovieRepository } from '../../domain/repositories/movie.repository';

/**
 * Caso de uso para obtener las películas de estreno reciente (año >= 2020).
 *
 * @remarks
 * Pertenece a la capa de Aplicación de Clean Architecture. Orquesta
 * la consulta de películas recientes delegando en el contrato {@link MovieRepository}.
 *
 * @see {@link MovieModel}
 * @see {@link MovieRepository}
 */
@Injectable({ providedIn: 'root' })
export class GetRecentMoviesUseCase {
  /**
   * Referencia al contrato abstracto del repositorio de películas, inyectado mediante `inject()`.
   */
  private readonly movieRepository = inject(MovieRepository);

  /**
   * Ejecuta el caso de uso solicitando las películas de estreno reciente.
   *
   * @returns Un {@link Observable} que emite las películas con año mayor o igual a 2020.
   */
  execute(): Observable<MovieModel[]> {
    return this.movieRepository.getRecent();
  }
}
