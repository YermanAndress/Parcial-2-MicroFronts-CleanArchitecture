import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { MOVIES_MOCK } from '../../../../mocks/movies.mocks';
import { DataService } from '../../services/data.service';
import { MovieLocalRepositoryImpl } from './movie-local.repository.impl';

describe('MovieLocalRepositoryImpl', () => {
  let repository: MovieLocalRepositoryImpl;
  const dataServiceMock = {
    getAllMoviesLocal: jest.fn(),
    getRecentMoviesLocal: jest.fn(),
    getClassicMoviesLocal: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [
        MovieLocalRepositoryImpl,
        { provide: DataService, useValue: dataServiceMock },
      ],
    });
    repository = TestBed.inject(MovieLocalRepositoryImpl);
  });

  it('debería crearse correctamente', () => {
    expect(repository).toBeTruthy();
    expect(repository).toBeInstanceOf(MovieLocalRepositoryImpl);
  });

  describe('getAll', () => {
    it('debería delegar a dataService.getAllMoviesLocal y retornar películas', async () => {
      dataServiceMock.getAllMoviesLocal.mockReturnValue(of(MOVIES_MOCK));
      const result = await firstValueFrom(repository.getAll());

      expect(dataServiceMock.getAllMoviesLocal).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MOVIES_MOCK);
    });

    it('debería propagar error si dataService falla', async () => {
      dataServiceMock.getAllMoviesLocal.mockReturnValue(throwError(() => new Error('Error local')));
      await expect(firstValueFrom(repository.getAll())).rejects.toThrow('Error local');
    });
  });

  describe('getRecent', () => {
    it('debería delegar a dataService.getRecentMoviesLocal y retornar películas recientes', async () => {
      const recent = MOVIES_MOCK.filter((m) => m.year >= 2020);
      dataServiceMock.getRecentMoviesLocal.mockReturnValue(of(recent));
      const result = await firstValueFrom(repository.getRecent());

      expect(dataServiceMock.getRecentMoviesLocal).toHaveBeenCalledTimes(1);
      expect(result).toEqual(recent);
    });

    it('debería propagar error si dataService falla', async () => {
      dataServiceMock.getRecentMoviesLocal.mockReturnValue(throwError(() => new Error('Error recent local')));
      await expect(firstValueFrom(repository.getRecent())).rejects.toThrow('Error recent local');
    });
  });

  describe('getClassics', () => {
    it('debería delegar a dataService.getClassicMoviesLocal y retornar películas clásicas', async () => {
      const classics = MOVIES_MOCK.filter((m) => m.year < 2000);
      dataServiceMock.getClassicMoviesLocal.mockReturnValue(of(classics));
      const result = await firstValueFrom(repository.getClassics());

      expect(dataServiceMock.getClassicMoviesLocal).toHaveBeenCalledTimes(1);
      expect(result).toEqual(classics);
    });

    it('debería propagar error si dataService falla', async () => {
      dataServiceMock.getClassicMoviesLocal.mockReturnValue(throwError(() => new Error('Error classics local')));
      await expect(firstValueFrom(repository.getClassics())).rejects.toThrow('Error classics local');
    });
  });
});
