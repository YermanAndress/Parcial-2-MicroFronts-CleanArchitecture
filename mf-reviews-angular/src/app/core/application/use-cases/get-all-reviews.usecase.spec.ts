import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { REVIEWS_MOCK } from '../../../mocks/reviews.mocks';
import { ReviewRepository } from '../../domain/repositories/review.repository';
import { GetAllReviewsUseCase } from './get-all-reviews.usecase';

describe('GetAllReviewsUseCase', () => {
  let useCase: GetAllReviewsUseCase;
  const count = 5;
  const ReviewRepositoryMock: jest.Mocked<ReviewRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [GetAllReviewsUseCase, { provide: ReviewRepository, useValue: ReviewRepositoryMock }],
    }).compileComponents();
    useCase = TestBed.inject(GetAllReviewsUseCase);
  });

  it('debería crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllReviewsUseCase);
  });

  it('debería delegar getAll al repository', async () => {
    ReviewRepositoryMock.getAll.mockReturnValue(of(REVIEWS_MOCK));
    const result = await firstValueFrom(useCase.execute(count));
    expect(ReviewRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(ReviewRepositoryMock.getAll).toHaveBeenCalledWith(count);
    expect(result).toEqual(REVIEWS_MOCK);
  });

  it('debería propagar el error del repository', async () => {
    ReviewRepositoryMock.getAll.mockReturnValue(throwError(() => new Error('fallo')));
    await expect(firstValueFrom(useCase.execute(count))).rejects.toThrow('fallo');
  });
});
