import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { AUTHORS_MOCK } from '../../../mocks/authors.mocks';
import { AuthorRepository } from '../../domain/repositories/author.repository';
import { GetAuthorByIdUseCase } from './get-author-by-id.usecase';

describe('GetAuthorByIdUseCase', () => {
  let useCase: GetAuthorByIdUseCase;
  const id = 1;
  const AuthorRepositoryMock: jest.Mocked<AuthorRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [GetAuthorByIdUseCase, { provide: AuthorRepository, useValue: AuthorRepositoryMock }],
    }).compileComponents();
    useCase = TestBed.inject(GetAuthorByIdUseCase);
  });

  it('debería crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAuthorByIdUseCase);
  });

  it('debería delegar getById al repository', async () => {
    AuthorRepositoryMock.getById.mockReturnValue(of(AUTHORS_MOCK[0]));
    const result = await firstValueFrom(useCase.execute(id));
    expect(AuthorRepositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(AuthorRepositoryMock.getById).toHaveBeenCalledWith(id);
    expect(result).toEqual(AUTHORS_MOCK[0]);
  });

  it('debería propagar el error del repository', async () => {
    AuthorRepositoryMock.getById.mockReturnValue(throwError(() => new Error('fallo')));
    await expect(firstValueFrom(useCase.execute(id))).rejects.toThrow('fallo');
  });
});
