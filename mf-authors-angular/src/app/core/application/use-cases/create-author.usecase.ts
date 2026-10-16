import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../../domain/models/author.model';
import { AuthorRepository } from '../../domain/repositories/author.repository';

@Injectable()
export class CreateAuthorUseCase {
  private authorRepository = inject(AuthorRepository);

  execute(author: Partial<Author>): Observable<Author> {
    return this.authorRepository.create(author);
  }
}
