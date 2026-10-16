import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAllMoviesUseCase } from '../../../core/application/usecases/get-all-movies.usecase';
import { GetClassicMoviesUseCase } from '../../../core/application/usecases/get-classic-movies.usecase';
import { GetRecentMoviesUseCase } from '../../../core/application/usecases/get-recent-movies.usecase';
import { MOVIES_MOCK } from '../../../mocks/movies.mocks';
import { MoviesPage } from './movies.page';

describe('MoviesPage', () => {
  let component: MoviesPage;
  let fixture: ComponentFixture<MoviesPage>;

  const getAllMoviesUseCaseMock = {
    execute: jest.fn(),
  };

  const getRecentMoviesUseCaseMock = {
    execute: jest.fn(),
  };

  const getClassicMoviesUseCaseMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    getAllMoviesUseCaseMock.execute.mockReturnValue(of(MOVIES_MOCK));
    getRecentMoviesUseCaseMock.execute.mockReturnValue(
      of(MOVIES_MOCK.filter((m) => m.year >= 2020))
    );
    getClassicMoviesUseCaseMock.execute.mockReturnValue(
      of(MOVIES_MOCK.filter((m) => m.year < 2000))
    );

    await TestBed.configureTestingModule({
      imports: [MoviesPage],
    })
      .overrideComponent(MoviesPage, {
        set: {
          providers: [
            { provide: GetAllMoviesUseCase, useValue: getAllMoviesUseCaseMock },
            { provide: GetRecentMoviesUseCase, useValue: getRecentMoviesUseCaseMock },
            { provide: GetClassicMoviesUseCase, useValue: getClassicMoviesUseCaseMock },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MoviesPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ejecuta ngOnInit y deja el componente en estado inicial
  });

  it('debería crearse correctamente el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería invocar loadAllMovies en ngOnInit y actualizar estado a success', () => {
    expect(getAllMoviesUseCaseMock.execute).toHaveBeenCalledTimes(1);
    expect(component.state).toBe('success');
    expect(component.movies).toEqual(MOVIES_MOCK);
    expect(component.activeFilterTitle).toBe('Catálogo Completo');
  });

  describe('loadAllMovies', () => {
    it('debería actualizar state a success y cargar las películas', () => {
      component.loadAllMovies();

      expect(getAllMoviesUseCaseMock.execute).toHaveBeenCalled();
      expect(component.state).toBe('success');
      expect(component.movies).toEqual(MOVIES_MOCK);
      expect(component.errorMessage).toBe('');
    });

    it('debería actualizar state a error cuando el caso de uso falla', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      getAllMoviesUseCaseMock.execute.mockReturnValue(
        throwError(() => new Error('Error al listar películas'))
      );

      component.loadAllMovies();

      expect(component.state).toBe('error');
      expect(component.errorMessage).toContain('Ocurrió un error al cargar todas las películas');
      consoleSpy.mockRestore();
    });
  });

  describe('loadRecentMovies', () => {
    it('debería actualizar state a success y cargar películas con year >= 2020', () => {
      const recent = MOVIES_MOCK.filter((m) => m.year >= 2020);
      getRecentMoviesUseCaseMock.execute.mockReturnValue(of(recent));

      component.loadRecentMovies();

      expect(getRecentMoviesUseCaseMock.execute).toHaveBeenCalled();
      expect(component.state).toBe('success');
      expect(component.movies).toEqual(recent);
      expect(component.activeFilterTitle).toContain('Películas Recientes');
    });

    it('debería actualizar state a error cuando el caso de uso falla', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      getRecentMoviesUseCaseMock.execute.mockReturnValue(
        throwError(() => new Error('Error al listar películas recientes'))
      );

      component.loadRecentMovies();

      expect(component.state).toBe('error');
      expect(component.errorMessage).toContain('Ocurrió un error al cargar las películas recientes');
      consoleSpy.mockRestore();
    });
  });

  describe('loadClassicMovies', () => {
    it('debería actualizar state a success y cargar películas con year < 2000', () => {
      const classics = MOVIES_MOCK.filter((m) => m.year < 2000);
      getClassicMoviesUseCaseMock.execute.mockReturnValue(of(classics));

      component.loadClassicMovies();

      expect(getClassicMoviesUseCaseMock.execute).toHaveBeenCalled();
      expect(component.state).toBe('success');
      expect(component.movies).toEqual(classics);
      expect(component.activeFilterTitle).toContain('Películas Clásicas');
    });

    it('debería actualizar state a error cuando el caso de uso falla', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      getClassicMoviesUseCaseMock.execute.mockReturnValue(
        throwError(() => new Error('Error al listar películas clásicas'))
      );

      component.loadClassicMovies();

      expect(component.state).toBe('error');
      expect(component.errorMessage).toContain('Ocurrió un error al cargar las películas clásicas');
      consoleSpy.mockRestore();
    });
  });

  describe('Interacción en Plantilla (DOM)', () => {
    it('debería invocar los métodos al hacer clic en los botones de filtrado', () => {
      const buttons = fixture.nativeElement.querySelectorAll('button');

      const spyAll = jest.spyOn(component, 'loadAllMovies');
      const spyRecent = jest.spyOn(component, 'loadRecentMovies');
      const spyClassics = jest.spyOn(component, 'loadClassicMovies');

      buttons[0]?.click();
      expect(spyAll).toHaveBeenCalled();

      buttons[1]?.click();
      expect(spyRecent).toHaveBeenCalled();

      buttons[2]?.click();
      expect(spyClassics).toHaveBeenCalled();
    });

    it('debería renderizar la alerta de error cuando state sea error', () => {
      component.state = 'error';
      component.errorMessage = 'Mensaje de prueba';
      fixture.detectChanges();

      const alert = fixture.nativeElement.querySelector('.alert-danger');
      expect(alert).toBeTruthy();
      expect(alert.textContent).toContain('Mensaje de prueba');
    });

    it('debería renderizar el spinner cuando state sea loading', () => {
      component.state = 'loading';
      fixture.detectChanges();

      const spinner = fixture.nativeElement.querySelector('.spinner-border');
      expect(spinner).toBeTruthy();
    });
  });
});
