import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAllAuthorsUseCase } from '../../../core/application/use-cases/get-all-authors.usecase';
import { AUTHORS_MOCK } from '../../../mocks/authors.mocks';
import { AlertComponent } from '../../components/alert/alert.component';
import { AuthorsTableComponent } from '../../components/authors-table/authors-table.component';
import { AuthorsPage } from './authors.page';

describe('AuthorsPage', () => {
  let component: AuthorsPage;
  let fixture: ComponentFixture<AuthorsPage>;
  const GetAllAuthorsUseCaseMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorsPage, AuthorsTableComponent, AlertComponent],
    })
      .overrideComponent(AuthorsPage, {
        set: { providers: [{ provide: GetAllAuthorsUseCase, useValue: GetAllAuthorsUseCaseMock }] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AuthorsPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente en estado init', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.authors).toEqual([]);
  });

  it('debe cargar authors y pasar a success', () => {
    GetAllAuthorsUseCaseMock.execute.mockReturnValue(of(AUTHORS_MOCK));
    fixture.detectChanges();
    expect(component.authors).toEqual(AUTHORS_MOCK);
    expect(component.state).toBe('success');
  });

  it('debe pasar a error si falla el caso de uso', () => {
    GetAllAuthorsUseCaseMock.execute.mockReturnValue(throwError(() => new Error('error')));
    fixture.detectChanges();
    expect(component.authors).toEqual([]);
    expect(component.state).toBe('error');
  });
});
