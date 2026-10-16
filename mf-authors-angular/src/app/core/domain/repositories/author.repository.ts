import { Observable } from 'rxjs';
import { Author } from '../models/author.model';

export abstract class AuthorRepository {
  abstract getAll(count: number): Observable<Author[]>;
  abstract getById(id: number): Observable<Author>;
  abstract create(author: Partial<Author>): Observable<Author>;
}
