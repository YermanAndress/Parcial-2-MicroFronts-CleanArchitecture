import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateMovieDto, Movie } from '../../domain/models/movie.model';
import { MovieRepository } from '../../domain/repositories/movie.repository';

/**
 * Caso de uso para registrar una nueva película.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y encapsula
 * la acción de negocio encargada de crear una película.
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see {@link Movie}
 * @see {@link MovieRepository}
 */
@Injectable()
export class CreateMovieUseCase {
  /**
   * Repositorio de películas inyectado por contrato.
   */
  private movieRepository = inject(MovieRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param movie - Datos de la película a crear (sin `id`)
   * @returns Observable que emite la {@link Movie} creada
   */
  execute(movie: CreateMovieDto): Observable<Movie> {
    return this.movieRepository.create(movie);
  }
}
