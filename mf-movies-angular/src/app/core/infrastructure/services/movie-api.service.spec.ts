import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { CREATE_MOVIE_MOCK, MOVIES_MOCK } from '../../../mocks/movies.mocks';
import { MovieApiService } from './movie-api.service';

describe('MovieApiService', () => {
  let service: MovieApiService;
  let httpMock: HttpTestingController;

  const baseUrl = `${environment.baseUrl}/api/movies`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(MovieApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener las películas por HTTP (GET)', () => {
    service.getAllMovies().subscribe((movies) => {
      expect(movies).toEqual(MOVIES_MOCK);
    });
    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(MOVIES_MOCK);
  });

  it('debe obtener una película por id por HTTP (GET)', () => {
    service.getMovieById(1).subscribe((movie) => {
      expect(movie).toEqual(MOVIES_MOCK[0]);
    });
    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(MOVIES_MOCK[0]);
  });

  it('debe crear una película por HTTP (POST)', () => {
    const created = { id: 3, ...CREATE_MOVIE_MOCK };
    service.createMovie(CREATE_MOVIE_MOCK).subscribe((movie) => {
      expect(movie).toEqual(created);
    });
    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(CREATE_MOVIE_MOCK);
    req.flush(created);
  });
});
