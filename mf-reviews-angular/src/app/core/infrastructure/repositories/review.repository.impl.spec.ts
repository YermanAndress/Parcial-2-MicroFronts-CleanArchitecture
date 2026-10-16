import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { REVIEWS_MOCK } from '../../../mocks/reviews.mocks';
import { Review } from '../../../domain/models/review.model';
import { ReviewApiService } from '../services/review-api.service';
import { ReviewRepositoryImpl } from './review.repository.impl';

describe('ReviewRepositoryImpl', () => {
  let repository: ReviewRepositoryImpl;
  const ReviewApiServiceMock = { getAll: jest.fn(), getById: jest.fn(), create: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReviewRepositoryImpl, { provide: ReviewApiService, useValue: ReviewApiServiceMock }],
    }).compileComponents();
    repository = TestBed.inject(ReviewRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar getAll al api service', (done) => {
    ReviewApiServiceMock.getAll.mockReturnValue(of(REVIEWS_MOCK));
    repository.getAll(2).subscribe((reviews: Review[]) => {
      expect(reviews).toEqual(REVIEWS_MOCK);
      expect(ReviewApiServiceMock.getAll).toHaveBeenCalledWith(2);
      done();
    });
  });

  it('debe delegar getById al api service', (done) => {
    ReviewApiServiceMock.getById.mockReturnValue(of(REVIEWS_MOCK[0]));
    repository.getById(1).subscribe((review: Review) => {
      expect(review).toEqual(REVIEWS_MOCK[0]);
      expect(ReviewApiServiceMock.getById).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('debe delegar create al api service', (done) => {
    const payload = { title: 'Nueva', rating: 5, comment: 'Top' };
    ReviewApiServiceMock.create.mockReturnValue(of(REVIEWS_MOCK[0]));
    repository.create(payload).subscribe((review: Review) => {
      expect(review).toEqual(REVIEWS_MOCK[0]);
      expect(ReviewApiServiceMock.create).toHaveBeenCalledWith(payload);
      done();
    });
  });
});
