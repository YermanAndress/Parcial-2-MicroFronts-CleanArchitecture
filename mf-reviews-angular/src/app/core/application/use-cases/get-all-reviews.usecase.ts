import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../../domain/models/review.model';
import { ReviewRepository } from '../../domain/repositories/review.repository';

@Injectable()
export class GetAllReviewsUseCase {
  private reviewRepository = inject(ReviewRepository);

  execute(count: number): Observable<Review[]> {
    return this.reviewRepository.getAll(count);
  }
}
