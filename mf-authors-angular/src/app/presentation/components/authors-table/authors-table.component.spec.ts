import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AUTHORS_MOCK } from '../../../mocks/authors.mocks';
import { AuthorsTableComponent } from './authors-table.component';

describe('AuthorsTableComponent', () => {
  let component: AuthorsTableComponent;
  let fixture: ComponentFixture<AuthorsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AuthorsTableComponent] }).compileComponents();
    fixture = TestBed.createComponent(AuthorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar una tabla', () => {
    expect(fixture.debugElement.query(By.css('table'))).toBeTruthy();
  });

  it('debería renderizar una fila por cada author', () => {
    component.authors = AUTHORS_MOCK;
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('tbody tr')).length).toBe(AUTHORS_MOCK.length);
  });

  it('debería mostrar los datos en cada columna', () => {
    component.authors = AUTHORS_MOCK;
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const author = AUTHORS_MOCK[index];
      expect(columns[0].nativeElement.textContent.trim()).toBe(String(author.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(author.name);
      expect(columns[2].nativeElement.textContent.trim()).toBe(author.country);
      expect(columns[3].nativeElement.textContent.trim()).toBe(String(author.birthYear));
    });
  });
});
