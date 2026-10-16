import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../../domain/models/author.model';
import { AuthorRepository } from '../../domain/repositories/author.repository';
import { AuthorApiService } from '../services/author-api.service';

@Injectable()
export class AuthorRepositoryImpl extends AuthorRepository {
  private apiService = inject(AuthorApiService);

  override getAll(count: number): Observable<Author[]> {
    return this.apiService.getAll(count);
  }

  override getById(id: number): Observable<Author> {
    return this.apiService.getById(id);
  }

  override create(author: Partial<Author>): Observable<Author> {
    return this.apiService.create(author);
  }
}
