import { Component, Input } from '@angular/core';
import { Author } from '../../../core/domain/models/author.model';

@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
})
export class AuthorsTableComponent {
  @Input() authors: Author[] = [];
}
