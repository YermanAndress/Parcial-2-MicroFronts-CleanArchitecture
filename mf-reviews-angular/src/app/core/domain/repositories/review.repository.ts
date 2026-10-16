import { Observable } from 'rxjs';
import { Review } from '../models/review.model';

export abstract class ReviewRepository {
  abstract getAll(count: number): Observable<Review[]>;
  abstract getById(id: number): Observable<Review>;
  abstract create(review: Partial<Review>): Observable<Review>;
}
