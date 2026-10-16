import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MOVIES_MOCK } from '../../../mocks/movies.mocks';
import { MoviesTableComponent } from './movies-table.component';

describe('MoviesTableComponent', () => {
  let component: MoviesTableComponent;
  let fixture: ComponentFixture<MoviesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente el componente', () => {
    expect(component).toBeTruthy();
    expect(component.movies).toEqual([]);
  });

  it('debería mostrar mensaje de lista vacía cuando no hay películas', () => {
    component.movies = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No hay películas para mostrar en este criterio');
  });

  it('debería renderizar las 5 columnas requeridas en el encabezado', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headers = Array.from(compiled.querySelectorAll('th')).map((th) => th.textContent?.trim());

    expect(headers).toContain('ID');
    expect(headers).toContain('Título');
    expect(headers).toContain('Director');
    expect(headers).toContain('Año');
    expect(headers).toContain('Género');
  });

  it('debería renderizar una fila por cada película recibida en @Input() movies', () => {
    component.movies = MOVIES_MOCK;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(MOVIES_MOCK.length);

    const firstRowText = rows[0]?.textContent;
    expect(firstRowText).toContain(MOVIES_MOCK[0]?.id);
    expect(firstRowText).toContain(MOVIES_MOCK[0]?.title);
    expect(firstRowText).toContain(MOVIES_MOCK[0]?.director);
    expect(firstRowText).toContain(String(MOVIES_MOCK[0]?.year));
    expect(firstRowText).toContain(MOVIES_MOCK[0]?.genre);
  });

  it('debería aplicar estilos y clases según el rango del año', () => {
    component.movies = [
      { id: '1', title: 'Clásico', director: 'Dir 1', year: 1990, genre: 'Drama' },
      { id: '2', title: 'Intermedio', director: 'Dir 2', year: 2010, genre: 'Action' },
      { id: '3', title: 'Reciente', director: 'Dir 3', year: 2023, genre: 'Sci-Fi' },
    ];
    fixture.detectChanges();

    const badges = fixture.nativeElement.querySelectorAll('tbody span.badge');
    expect(badges.length).toBeGreaterThanOrEqual(3);
  });
});
