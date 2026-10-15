import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../domain/models/movie.model';
import { MovieRepository } from '../../domain/repositories/movie.repository';

/**
 * Caso de uso para obtener el listado completo de películas.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y encapsula
 * la acción de negocio encargada de recuperar todas las películas.
 *
 * Desacopla la capa de presentación de los detalles de acceso a datos
 * mediante el contrato `MovieRepository`.
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see {@link Movie}
 * @see {@link MovieRepository}
 */
@Injectable()
export class GetAllMoviesUseCase {
  /**
   * Repositorio de películas inyectado por contrato.
   */
  private movieRepository = inject(MovieRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @returns Observable que emite el listado completo de {@link Movie}
   */
  execute(): Observable<Movie[]> {
    return this.movieRepository.getAll();
  }
}
