import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Author } from '../../domain/models/author.model';

@Injectable({ providedIn: 'root' })
export class AuthorApiService {
  private httpClient = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/api/authors`;

  getAll(count: number): Observable<Author[]> {
    return this.httpClient.get<Author[]>(`${this.baseUrl}/${count}`);
  }

  getById(id: number): Observable<Author> {
    return this.httpClient.get<Author>(`${this.baseUrl}/item/${id}`);
  }

  create(author: Partial<Author>): Observable<Author> {
    return this.httpClient.post<Author>(this.baseUrl, author);
  }
}
