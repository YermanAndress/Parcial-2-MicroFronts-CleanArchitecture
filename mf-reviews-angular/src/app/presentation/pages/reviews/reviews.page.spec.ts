import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAllReviewsUseCase } from '../../../core/application/use-cases/get-all-reviews.usecase';
import { REVIEWS_MOCK } from '../../../mocks/reviews.mocks';
import { AlertComponent } from '../../components/alert/alert.component';
import { ReviewsTableComponent } from '../../components/reviews-table/reviews-table.component';
import { ReviewsPage } from './reviews.page';

describe('ReviewsPage', () => {
  let component: ReviewsPage;
  let fixture: ComponentFixture<ReviewsPage>;
  const GetAllReviewsUseCaseMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsPage, ReviewsTableComponent, AlertComponent],
    })
      .overrideComponent(ReviewsPage, {
        set: { providers: [{ provide: GetAllReviewsUseCase, useValue: GetAllReviewsUseCaseMock }] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ReviewsPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente en estado init', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.reviews).toEqual([]);
  });

  it('debe cargar reviews y pasar a success', () => {
    GetAllReviewsUseCaseMock.execute.mockReturnValue(of(REVIEWS_MOCK));
    fixture.detectChanges();
    expect(component.reviews).toEqual(REVIEWS_MOCK);
    expect(component.state).toBe('success');
  });

  it('debe pasar a error si falla el caso de uso', () => {
    GetAllReviewsUseCaseMock.execute.mockReturnValue(throwError(() => new Error('error')));
    fixture.detectChanges();
    expect(component.reviews).toEqual([]);
    expect(component.state).toBe('error');
  });
});
