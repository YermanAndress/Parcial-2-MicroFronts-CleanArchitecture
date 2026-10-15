import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../domain/models/movie.model';
import { MovieRepository } from '../../domain/repositories/movie.repository';

/**
 * Caso de uso para obtener una película por su identificador.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y encapsula
 * la acción de negocio encargada de recuperar una película específica.
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see {@link Movie}
 * @see {@link MovieRepository}
 */
@Injectable()
export class GetMovieByIdUseCase {
  /**
   * Repositorio de películas inyectado por contrato.
   */
  private movieRepository = inject(MovieRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param id - Identificador único de la película
   * @returns Observable que emite la {@link Movie}
   */
  execute(id: number): Observable<Movie> {
    return this.movieRepository.getById(id);
  }
}
