import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { MOVIES_MOCK } from '../../../../mocks/movies.mocks';
import { DataService } from '../../services/data.service';
import { MovieNodeRepositoryImpl } from './movie-node.repository.impl';

describe('MovieNodeRepositoryImpl', () => {
  let repository: MovieNodeRepositoryImpl;
  const dataServiceMock = {
    getAllMoviesNode: jest.fn(),
    getRecentMoviesNode: jest.fn(),
    getClassicMoviesNode: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [
        MovieNodeRepositoryImpl,
        { provide: DataService, useValue: dataServiceMock },
      ],
    });
    repository = TestBed.inject(MovieNodeRepositoryImpl);
  });

  it('debería crearse correctamente', () => {
    expect(repository).toBeTruthy();
    expect(repository).toBeInstanceOf(MovieNodeRepositoryImpl);
  });

  describe('getAll', () => {
    it('debería delegar a dataService.getAllMoviesNode y retornar películas', async () => {
      dataServiceMock.getAllMoviesNode.mockReturnValue(of(MOVIES_MOCK));
      const result = await firstValueFrom(repository.getAll());

      expect(dataServiceMock.getAllMoviesNode).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MOVIES_MOCK);
    });

    it('debería propagar error si dataService falla', async () => {
      dataServiceMock.getAllMoviesNode.mockReturnValue(throwError(() => new Error('Error node getAll')));
      await expect(firstValueFrom(repository.getAll())).rejects.toThrow('Error node getAll');
    });
  });

  describe('getRecent', () => {
    it('debería delegar a dataService.getRecentMoviesNode y retornar películas recientes', async () => {
      const recent = MOVIES_MOCK.filter((m) => m.year >= 2020);
      dataServiceMock.getRecentMoviesNode.mockReturnValue(of(recent));
      const result = await firstValueFrom(repository.getRecent());

      expect(dataServiceMock.getRecentMoviesNode).toHaveBeenCalledTimes(1);
      expect(result).toEqual(recent);
    });

    it('debería propagar error si dataService falla', async () => {
      dataServiceMock.getRecentMoviesNode.mockReturnValue(throwError(() => new Error('Error node getRecent')));
      await expect(firstValueFrom(repository.getRecent())).rejects.toThrow('Error node getRecent');
    });
  });

  describe('getClassics', () => {
    it('debería delegar a dataService.getClassicMoviesNode y retornar películas clásicas', async () => {
      const classics = MOVIES_MOCK.filter((m) => m.year < 2000);
      dataServiceMock.getClassicMoviesNode.mockReturnValue(of(classics));
      const result = await firstValueFrom(repository.getClassics());

      expect(dataServiceMock.getClassicMoviesNode).toHaveBeenCalledTimes(1);
      expect(result).toEqual(classics);
    });

    it('debería propagar error si dataService falla', async () => {
      dataServiceMock.getClassicMoviesNode.mockReturnValue(throwError(() => new Error('Error node getClassics')));
      await expect(firstValueFrom(repository.getClassics())).rejects.toThrow('Error node getClassics');
    });
  });
});
