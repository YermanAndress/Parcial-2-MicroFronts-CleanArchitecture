import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieModel } from '../../../domain/models/movie.model';
import { MovieRepository } from '../../../domain/repositories/movie.repository';
import { DataService } from '../../services/data.service';

/**
 * Implementación local del repositorio de películas (Mocks en memoria).
 *
 * @remarks
 * Pertenece a la capa de Infraestructura. Cumple el contrato abstracto
 * {@link MovieRepository} obteniendo los datos directamente del {@link DataService}
 * a partir de arreglos simulados en memoria.
 */
@Injectable({
  providedIn: 'root',
})
export class MovieLocalRepositoryImpl extends MovieRepository {
  /**
   * Servicio de infraestructura para obtención de datos, inyectado mediante `inject()`.
   */
  private readonly dataService: DataService = inject(DataService);

  /**
   * Obtiene la totalidad de películas locales simuladas.
   *
   * @returns Un {@link Observable} que emite el catálogo completo de películas mock.
   */
  override getAll(): Observable<MovieModel[]> {
    return this.dataService.getAllMoviesLocal();
  }

  /**
   * Obtiene las películas locales con estreno reciente (año >= 2020).
   *
   * @returns Un {@link Observable} que emite las películas recientes mock.
   */
  override getRecent(): Observable<MovieModel[]> {
    return this.dataService.getRecentMoviesLocal();
  }

  /**
   * Obtiene las películas locales consideradas clásicas (año < 2000).
   *
   * @returns Un {@link Observable} que emite las películas clásicas mock.
   */
  override getClassics(): Observable<MovieModel[]> {
    return this.dataService.getClassicMoviesLocal();
  }
}
