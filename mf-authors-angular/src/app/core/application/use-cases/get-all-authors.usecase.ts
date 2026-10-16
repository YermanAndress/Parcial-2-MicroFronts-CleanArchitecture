import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../../domain/models/author.model';
import { AuthorRepository } from '../../domain/repositories/author.repository';

@Injectable()
export class GetAllAuthorsUseCase {
  private authorRepository = inject(AuthorRepository);

  execute(count: number): Observable<Author[]> {
    return this.authorRepository.getAll(count);
  }
}
