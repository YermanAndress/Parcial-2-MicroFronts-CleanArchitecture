import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { REVIEWS_MOCK } from '../../../mocks/reviews.mocks';
import { ReviewApiService } from './review-api.service';

describe('ReviewApiService', () => {
  let service: ReviewApiService;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.baseUrl}/api/reviews`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ReviewApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener reviews por HTTP (getAll)', () => {
    service.getAll(2).subscribe((reviews) => expect(reviews).toEqual(REVIEWS_MOCK));
    const req = httpMock.expectOne(`${baseUrl}/2`);
    expect(req.request.method).toBe('GET');
    req.flush(REVIEWS_MOCK);
  });

  it('debe obtener review por id (getById)', () => {
    service.getById(1).subscribe((review) => expect(review).toEqual(REVIEWS_MOCK[0]));
    const req = httpMock.expectOne(`${baseUrl}/item/1`);
    expect(req.request.method).toBe('GET');
    req.flush(REVIEWS_MOCK[0]);
  });

  it('debe crear review por HTTP (create)', () => {
    const payload = { title: 'Nueva', rating: 5, comment: 'Top' };
    service.create(payload).subscribe((review) => expect(review).toEqual(REVIEWS_MOCK[0]));
    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(REVIEWS_MOCK[0]);
  });
});
