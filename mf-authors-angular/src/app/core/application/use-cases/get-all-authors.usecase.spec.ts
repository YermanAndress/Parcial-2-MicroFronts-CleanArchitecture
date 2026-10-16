import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { AUTHORS_MOCK } from '../../../mocks/authors.mocks';
import { AuthorRepository } from '../../domain/repositories/author.repository';
import { GetAllAuthorsUseCase } from './get-all-authors.usecase';

describe('GetAllAuthorsUseCase', () => {
  let useCase: GetAllAuthorsUseCase;
  const count = 5;
  const AuthorRepositoryMock: jest.Mocked<AuthorRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [GetAllAuthorsUseCase, { provide: AuthorRepository, useValue: AuthorRepositoryMock }],
    }).compileComponents();
    useCase = TestBed.inject(GetAllAuthorsUseCase);
  });

  it('debería crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllAuthorsUseCase);
  });

  it('debería delegar getAll al repository', async () => {
    AuthorRepositoryMock.getAll.mockReturnValue(of(AUTHORS_MOCK));
    const result = await firstValueFrom(useCase.execute(count));
    expect(AuthorRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(AuthorRepositoryMock.getAll).toHaveBeenCalledWith(count);
    expect(result).toEqual(AUTHORS_MOCK);
  });

  it('debería propagar el error del repository', async () => {
    AuthorRepositoryMock.getAll.mockReturnValue(throwError(() => new Error('fallo')));
    await expect(firstValueFrom(useCase.execute(count))).rejects.toThrow('fallo');
  });
});
