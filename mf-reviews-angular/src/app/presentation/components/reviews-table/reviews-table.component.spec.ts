import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { REVIEWS_MOCK } from '../../../mocks/reviews.mocks';
import { ReviewsTableComponent } from './reviews-table.component';

describe('ReviewsTableComponent', () => {
  let component: ReviewsTableComponent;
  let fixture: ComponentFixture<ReviewsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ReviewsTableComponent] }).compileComponents();
    fixture = TestBed.createComponent(ReviewsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar una tabla', () => {
    expect(fixture.debugElement.query(By.css('table'))).toBeTruthy();
  });

  it('debería renderizar una fila por cada review', () => {
    component.reviews = REVIEWS_MOCK;
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('tbody tr')).length).toBe(REVIEWS_MOCK.length);
  });

  it('debería mostrar los datos en cada columna', () => {
    component.reviews = REVIEWS_MOCK;
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const review = REVIEWS_MOCK[index];
      expect(columns[0].nativeElement.textContent.trim()).toBe(String(review.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(review.title);
      expect(columns[3].nativeElement.textContent.trim()).toBe(review.comment);
    });
  });

  it('debería mapear cada rating a su BadgeType', () => {
    expect(component.ratingMap[1]).toBe('danger');
    expect(component.ratingMap[3]).toBe('warning');
    expect(component.ratingMap[4]).toBe('primary');
    expect(component.ratingMap[5]).toBe('success');
  });
});
