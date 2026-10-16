import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { AUTHORS_MOCK } from '../../../mocks/authors.mocks';
import { AuthorApiService } from './author-api.service';

describe('AuthorApiService', () => {
  let service: AuthorApiService;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.baseUrl}/api/authors`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthorApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener authors por HTTP (getAll)', () => {
    service.getAll(2).subscribe((authors) => expect(authors).toEqual(AUTHORS_MOCK));
    const req = httpMock.expectOne(`${baseUrl}/2`);
    expect(req.request.method).toBe('GET');
    req.flush(AUTHORS_MOCK);
  });

  it('debe obtener author por id (getById)', () => {
    service.getById(1).subscribe((author) => expect(author).toEqual(AUTHORS_MOCK[0]));
    const req = httpMock.expectOne(`${baseUrl}/item/1`);
    expect(req.request.method).toBe('GET');
    req.flush(AUTHORS_MOCK[0]);
  });

  it('debe crear author por HTTP (create)', () => {
    const payload = { name: 'Nuevo Autor', country: 'Chile', birthYear: 1980 };
    service.create(payload).subscribe((author) => expect(author).toEqual(AUTHORS_MOCK[0]));
    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(AUTHORS_MOCK[0]);
  });
});
