import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { Review } from '../../../core/domain/models/review.model';

@Component({
  selector: 'app-reviews-table',
  templateUrl: './reviews-table.component.html',
  imports: [BadgeAtom],
})
export class ReviewsTableComponent {
  @Input() reviews: Review[] = [];

  ratingMap: Record<number, BadgeType> = {
    1: 'danger',
    2: 'danger',
    3: 'warning',
    4: 'primary',
    5: 'success',
  };
}
