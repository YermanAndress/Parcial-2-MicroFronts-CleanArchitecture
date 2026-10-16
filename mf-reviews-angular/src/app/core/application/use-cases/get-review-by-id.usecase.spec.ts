import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { REVIEWS_MOCK } from '../../../mocks/reviews.mocks';
import { ReviewRepository } from '../../domain/repositories/review.repository';
import { GetReviewByIdUseCase } from './get-review-by-id.usecase';

describe('GetReviewByIdUseCase', () => {
  let useCase: GetReviewByIdUseCase;
  const ReviewRepositoryMock: jest.Mocked<ReviewRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [GetReviewByIdUseCase, { provide: ReviewRepository, useValue: ReviewRepositoryMock }],
    }).compileComponents();
    useCase = TestBed.inject(GetReviewByIdUseCase);
  });

  it('debería crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetReviewByIdUseCase);
  });

  it('debería delegar getById al repository', async () => {
    ReviewRepositoryMock.getById.mockReturnValue(of(REVIEWS_MOCK[0]));
    const result = await firstValueFrom(useCase.execute(1));
    expect(ReviewRepositoryMock.getById).toHaveBeenCalledWith(1);
    expect(result).toEqual(REVIEWS_MOCK[0]);
  });

  it('debería propagar el error del repository', async () => {
    ReviewRepositoryMock.getById.mockReturnValue(throwError(() => new Error('no encontrado')));
    await expect(firstValueFrom(useCase.execute(99))).rejects.toThrow('no encontrado');
  });
});
