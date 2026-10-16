import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AUTHORS_MOCK } from '../../../mocks/authors.mocks';
import { Author } from '../../../domain/models/author.model';
import { AuthorApiService } from '../services/author-api.service';
import { AuthorRepositoryImpl } from './author.repository.impl';

describe('AuthorRepositoryImpl', () => {
  let repository: AuthorRepositoryImpl;
  const AuthorApiServiceMock = { getAll: jest.fn(), getById: jest.fn(), create: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorRepositoryImpl, { provide: AuthorApiService, useValue: AuthorApiServiceMock }],
    }).compileComponents();
    repository = TestBed.inject(AuthorRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar getAll al api service', (done) => {
    AuthorApiServiceMock.getAll.mockReturnValue(of(AUTHORS_MOCK));
    repository.getAll(2).subscribe((authors: Author[]) => {
      expect(authors).toEqual(AUTHORS_MOCK);
      expect(AuthorApiServiceMock.getAll).toHaveBeenCalledWith(2);
      done();
    });
  });

  it('debe delegar getById al api service', (done) => {
    AuthorApiServiceMock.getById.mockReturnValue(of(AUTHORS_MOCK[0]));
    repository.getById(1).subscribe((author: Author) => {
      expect(author).toEqual(AUTHORS_MOCK[0]);
      expect(AuthorApiServiceMock.getById).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('debe delegar create al api service', (done) => {
    const payload = { name: 'Nuevo Autor', country: 'Chile', birthYear: 1980 };
    AuthorApiServiceMock.create.mockReturnValue(of(AUTHORS_MOCK[0]));
    repository.create(payload).subscribe((author: Author) => {
      expect(author).toEqual(AUTHORS_MOCK[0]);
      expect(AuthorApiServiceMock.create).toHaveBeenCalledWith(payload);
      done();
    });
  });
});
