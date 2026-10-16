import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../../domain/models/review.model';
import { ReviewRepository } from '../../domain/repositories/review.repository';
import { ReviewApiService } from '../services/review-api.service';

@Injectable()
export class ReviewRepositoryImpl extends ReviewRepository {
  private apiService = inject(ReviewApiService);

  override getAll(count: number): Observable<Review[]> {
    return this.apiService.getAll(count);
  }

  override getById(id: number): Observable<Review> {
    return this.apiService.getById(id);
  }

  override create(review: Partial<Review>): Observable<Review> {
    return this.apiService.create(review);
  }
}
