import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Review } from '../../domain/models/review.model';

@Injectable({ providedIn: 'root' })
export class ReviewApiService {
  private httpClient = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/api/reviews`;

  getAll(count: number): Observable<Review[]> {
    return this.httpClient.get<Review[]>(`${this.baseUrl}/${count}`);
  }

  getById(id: number): Observable<Review> {
    return this.httpClient.get<Review>(`${this.baseUrl}/item/${id}`);
  }

  create(review: Partial<Review>): Observable<Review> {
    return this.httpClient.post<Review>(this.baseUrl, review);
  }
}
