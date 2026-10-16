import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { MOVIES_MOCK } from '../../../../mocks/movies.mocks';
import { DataService } from '../../services/data.service';
import { MovieSpringBootRepositoryImpl } from './movie-springboot.repository.impl';

describe('MovieSpringBootRepositoryImpl', () => {
  let repository: MovieSpringBootRepositoryImpl;
  const dataServiceMock = {
    getAllMoviesSpringBoot: jest.fn(),
    getRecentMoviesSpringBoot: jest.fn(),
    getClassicMoviesSpringBoot: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [
        MovieSpringBootRepositoryImpl,
        { provide: DataService, useValue: dataServiceMock },
      ],
    });
    repository = TestBed.inject(MovieSpringBootRepositoryImpl);
  });

  it('debería crearse correctamente', () => {
    expect(repository).toBeTruthy();
    expect(repository).toBeInstanceOf(MovieSpringBootRepositoryImpl);
  });

  describe('getAll', () => {
    it('debería delegar a dataService.getAllMoviesSpringBoot y retornar películas', async () => {
      dataServiceMock.getAllMoviesSpringBoot.mockReturnValue(of(MOVIES_MOCK));
      const result = await firstValueFrom(repository.getAll());

      expect(dataServiceMock.getAllMoviesSpringBoot).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MOVIES_MOCK);
    });

    it('debería propagar error si dataService falla', async () => {
      dataServiceMock.getAllMoviesSpringBoot.mockReturnValue(throwError(() => new Error('Error springboot getAll')));
      await expect(firstValueFrom(repository.getAll())).rejects.toThrow('Error springboot getAll');
    });
  });

  describe('getRecent', () => {
    it('debería delegar a dataService.getRecentMoviesSpringBoot y retornar películas recientes', async () => {
      const recent = MOVIES_MOCK.filter((m) => m.year >= 2020);
      dataServiceMock.getRecentMoviesSpringBoot.mockReturnValue(of(recent));
      const result = await firstValueFrom(repository.getRecent());

      expect(dataServiceMock.getRecentMoviesSpringBoot).toHaveBeenCalledTimes(1);
      expect(result).toEqual(recent);
    });

    it('debería propagar error si dataService falla', async () => {
      dataServiceMock.getRecentMoviesSpringBoot.mockReturnValue(throwError(() => new Error('Error springboot getRecent')));
      await expect(firstValueFrom(repository.getRecent())).rejects.toThrow('Error springboot getRecent');
    });
  });

  describe('getClassics', () => {
    it('debería delegar a dataService.getClassicMoviesSpringBoot y retornar películas clásicas', async () => {
      const classics = MOVIES_MOCK.filter((m) => m.year < 2000);
      dataServiceMock.getClassicMoviesSpringBoot.mockReturnValue(of(classics));
      const result = await firstValueFrom(repository.getClassics());

      expect(dataServiceMock.getClassicMoviesSpringBoot).toHaveBeenCalledTimes(1);
      expect(result).toEqual(classics);
    });

    it('debería propagar error si dataService falla', async () => {
      dataServiceMock.getClassicMoviesSpringBoot.mockReturnValue(throwError(() => new Error('Error springboot getClassics')));
      await expect(firstValueFrom(repository.getClassics())).rejects.toThrow('Error springboot getClassics');
    });
  });
});
