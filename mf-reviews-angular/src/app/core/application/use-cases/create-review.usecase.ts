import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../../domain/models/review.model';
import { ReviewRepository } from '../../domain/repositories/review.repository';

@Injectable()
export class CreateReviewUseCase {
  private reviewRepository = inject(ReviewRepository);

  execute(review: Partial<Review>): Observable<Review> {
    return this.reviewRepository.create(review);
  }
}
