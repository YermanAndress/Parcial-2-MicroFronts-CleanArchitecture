import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../../domain/models/review.model';
import { ReviewRepository } from '../../domain/repositories/review.repository';

@Injectable()
export class GetReviewByIdUseCase {
  private reviewRepository = inject(ReviewRepository);

  execute(id: number): Observable<Review> {
    return this.reviewRepository.getById(id);
  }
}
