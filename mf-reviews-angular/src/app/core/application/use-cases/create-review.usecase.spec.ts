import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { REVIEWS_MOCK } from '../../../mocks/reviews.mocks';
import { ReviewRepository } from '../../domain/repositories/review.repository';
import { CreateReviewUseCase } from './create-review.usecase';

describe('CreateReviewUseCase', () => {
  let useCase: CreateReviewUseCase;
  const ReviewRepositoryMock: jest.Mocked<ReviewRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CreateReviewUseCase, { provide: ReviewRepository, useValue: ReviewRepositoryMock }],
    }).compileComponents();
    useCase = TestBed.inject(CreateReviewUseCase);
  });

  it('debería crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(CreateReviewUseCase);
  });

  it('debería delegar create al repository', async () => {
    const payload = { title: 'Nueva', rating: 5, comment: 'Top' };
    ReviewRepositoryMock.create.mockReturnValue(of(REVIEWS_MOCK[0]));
    const result = await firstValueFrom(useCase.execute(payload));
    expect(ReviewRepositoryMock.create).toHaveBeenCalledWith(payload);
    expect(result).toEqual(REVIEWS_MOCK[0]);
  });

  it('debería propagar el error del repository', async () => {
    ReviewRepositoryMock.create.mockReturnValue(throwError(() => new Error('invalido')));
    await expect(firstValueFrom(useCase.execute({}))).rejects.toThrow('invalido');
  });
});
