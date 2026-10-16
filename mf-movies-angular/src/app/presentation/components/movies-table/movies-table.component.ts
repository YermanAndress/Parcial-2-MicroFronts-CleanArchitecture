import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MovieModel } from '../../../core/domain/models/movie.model';

/**
 * Componente presentacional (Dumb Component) para renderizar la tabla de películas.
 *
 * @remarks
 * Este componente pertenece a la capa de Presentación y se encarga
 * exclusivamente de renderizar en una tabla HTML el listado de películas
 * que recibe a través de su `@Input() movies`.
 *
 * Expone de manera clara las 5 columnas requeridas por el contrato:
 * ID, Título, Director, Año y Género.
 *
 * @example
 * ```html
 * <app-movies-table [movies]="moviesList"></app-movies-table>
 * ```
 */
@Component({
  selector: 'app-movies-table',
  templateUrl: './movies-table.component.html',
  styleUrl: './movies-table.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class MoviesTableComponent {
  /**
   * Arreglo de películas a visualizar en la tabla.
   *
   * @remarks
   * Recibido desde el componente contenedor padre (Smart Component / Page).
   */
  @Input() movies: MovieModel[] = [];
}
