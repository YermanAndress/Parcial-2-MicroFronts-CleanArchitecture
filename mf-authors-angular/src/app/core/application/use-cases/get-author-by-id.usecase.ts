import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../../domain/models/author.model';
import { AuthorRepository } from '../../domain/repositories/author.repository';

@Injectable()
export class GetAuthorByIdUseCase {
  private authorRepository = inject(AuthorRepository);

  execute(id: number): Observable<Author> {
    return this.authorRepository.getById(id);
  }
}
