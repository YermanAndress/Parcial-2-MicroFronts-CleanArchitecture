import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieModel } from '../../../domain/models/movie.model';
import { MovieRepository } from '../../../domain/repositories/movie.repository';
import { DataService } from '../../services/data.service';

/**
 * Implementación Spring Boot del repositorio de películas.
 *
 * @remarks
 * Pertenece a la capa de Infraestructura y funciona como Adapter
 * entre el contrato del dominio {@link MovieRepository} y el backend
 * de Spring Boot (puerto 8082), consumido a través de {@link DataService}.
 */
@Injectable({
  providedIn: 'root',
})
export class MovieSpringBootRepositoryImpl extends MovieRepository {
  /**
   * Servicio de infraestructura para obtención de datos vía HTTP, inyectado mediante `inject()`.
   */
  private readonly dataService: DataService = inject(DataService);

  /**
   * Obtiene la totalidad de películas consumiendo el endpoint GET `/api/movies` de Spring Boot.
   *
   * @returns Un {@link Observable} que emite el catálogo completo de {@link MovieModel}.
   */
  override getAll(): Observable<MovieModel[]> {
    return this.dataService.getAllMoviesSpringBoot();
  }

  /**
   * Obtiene las películas de estreno reciente desde el endpoint GET `/api/movies/recent` de Spring Boot.
   *
   * @returns Un {@link Observable} que emite las películas con año mayor o igual a 2020.
   */
  override getRecent(): Observable<MovieModel[]> {
    return this.dataService.getRecentMoviesSpringBoot();
  }

  /**
   * Obtiene las películas clásicas desde el endpoint GET `/api/movies/classics` de Spring Boot.
   *
   * @returns Un {@link Observable} que emite las películas con año anterior al 2000.
   */
  override getClassics(): Observable<MovieModel[]> {
    return this.dataService.getClassicMoviesSpringBoot();
  }
}
