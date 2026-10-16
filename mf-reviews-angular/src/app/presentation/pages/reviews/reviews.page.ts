import { Component, inject } from '@angular/core';
import { GetAllReviewsUseCase } from '../../../core/application/use-cases/get-all-reviews.usecase';
import { Review } from '../../../core/domain/models/review.model';
import { ReviewRepository } from '../../../core/domain/repositories/review.repository';
import { ReviewRepositoryImpl } from '../../../core/infrastructure/repositories/review.repository.impl';
import { AlertComponent } from '../../components/alert/alert.component';
import { ReviewsTableComponent } from '../../components/reviews-table/reviews-table.component';
import { State } from '../../interfaces/state.interface';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  imports: [ReviewsTableComponent, AlertComponent],
  providers: [
    GetAllReviewsUseCase,
    // Proveedor a nivel de componente: app.config.ts no se ejecuta cuando
    // la página se carga como remoto en el host (Module Federation).
    { provide: ReviewRepository, useClass: ReviewRepositoryImpl },
  ],
})
export class ReviewsPage {
  reviews: Review[] = [];
  state: State = 'init';

  private getAllReviewsUseCase = inject(GetAllReviewsUseCase);

  ngOnInit(): void {
    this.state = 'loading';
    this.getAllReviewsUseCase.execute(10).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.state = 'error';
      },
    });
  }
}
