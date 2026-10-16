import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MOVIES_MOCK } from '../../../mocks/movies.mocks';
import { MovieModel } from '../../domain/models/movie.model';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(DataService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  describe('Métodos Locales (Mocks)', () => {
    it('getAllMoviesLocal debería retornar todas las películas mock', async () => {
      const result = await firstValueFrom(service.getAllMoviesLocal());
      expect(result).toEqual(MOVIES_MOCK);
    });

    it('getRecentMoviesLocal debería retornar solo películas con year >= 2020', async () => {
      const result = await firstValueFrom(service.getRecentMoviesLocal());
      const expected = MOVIES_MOCK.filter((m) => m.year >= 2020);
      expect(result).toEqual(expected);
      expect(result.every((m) => m.year >= 2020)).toBe(true);
    });

    it('getClassicMoviesLocal debería retornar solo películas con year < 2000', async () => {
      const result = await firstValueFrom(service.getClassicMoviesLocal());
      const expected = MOVIES_MOCK.filter((m) => m.year < 2000);
      expect(result).toEqual(expected);
      expect(result.every((m) => m.year < 2000)).toBe(true);
    });
  });

  describe('Métodos Node.js (Puerto 3003)', () => {
    it('getAllMoviesNode debería realizar GET a /movies', async () => {
      const promise = firstValueFrom(service.getAllMoviesNode());
      const req = httpTesting.expectOne(`${environment.apiUrlNode}/movies`);
      expect(req.request.method).toBe('GET');
      req.flush(MOVIES_MOCK);

      const result = await promise;
      expect(result).toEqual(MOVIES_MOCK);
    });

    it('getRecentMoviesNode debería realizar GET a /movies/recent', async () => {
      const recent = MOVIES_MOCK.filter((m) => m.year >= 2020);
      const promise = firstValueFrom(service.getRecentMoviesNode());
      const req = httpTesting.expectOne(`${environment.apiUrlNode}/movies/recent`);
      expect(req.request.method).toBe('GET');
      req.flush(recent);

      const result = await promise;
      expect(result).toEqual(recent);
    });

    it('getClassicMoviesNode debería realizar GET a /movies/classics', async () => {
      const classics = MOVIES_MOCK.filter((m) => m.year < 2000);
      const promise = firstValueFrom(service.getClassicMoviesNode());
      const req = httpTesting.expectOne(`${environment.apiUrlNode}/movies/classics`);
      expect(req.request.method).toBe('GET');
      req.flush(classics);

      const result = await promise;
      expect(result).toEqual(classics);
    });
  });

  describe('Métodos Spring Boot (Puerto 8082)', () => {
    it('getAllMoviesSpringBoot debería realizar GET a /movies', async () => {
      const promise = firstValueFrom(service.getAllMoviesSpringBoot());
      const req = httpTesting.expectOne(`${environment.apiUrlSpringBoot}/movies`);
      expect(req.request.method).toBe('GET');
      req.flush(MOVIES_MOCK);

      const result = await promise;
      expect(result).toEqual(MOVIES_MOCK);
    });

    it('getRecentMoviesSpringBoot debería realizar GET a /movies/recent', async () => {
      const recent = MOVIES_MOCK.filter((m) => m.year >= 2020);
      const promise = firstValueFrom(service.getRecentMoviesSpringBoot());
      const req = httpTesting.expectOne(`${environment.apiUrlSpringBoot}/movies/recent`);
      expect(req.request.method).toBe('GET');
      req.flush(recent);

      const result = await promise;
      expect(result).toEqual(recent);
    });

    it('getClassicMoviesSpringBoot debería realizar GET a /movies/classics', async () => {
      const classics = MOVIES_MOCK.filter((m) => m.year < 2000);
      const promise = firstValueFrom(service.getClassicMoviesSpringBoot());
      const req = httpTesting.expectOne(`${environment.apiUrlSpringBoot}/movies/classics`);
      expect(req.request.method).toBe('GET');
      req.flush(classics);

      const result = await promise;
      expect(result).toEqual(classics);
    });
  });

  describe('Método genérico getAll<T>', () => {
    it('debería consultar el endpoint arbitrario con GET', async () => {
      const customUrl = 'http://localhost:3003/api/custom-endpoint';
      const promise = firstValueFrom(service.getAll<MovieModel[]>(customUrl));
      const req = httpTesting.expectOne(customUrl);
      expect(req.request.method).toBe('GET');
      req.flush(MOVIES_MOCK);

      const result = await promise;
      expect(result).toEqual(MOVIES_MOCK);
    });
  });
});
