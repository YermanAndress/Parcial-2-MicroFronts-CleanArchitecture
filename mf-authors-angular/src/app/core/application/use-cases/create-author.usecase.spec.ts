import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { AUTHORS_MOCK } from '../../../mocks/authors.mocks';
import { AuthorRepository } from '../../domain/repositories/author.repository';
import { CreateAuthorUseCase } from './create-author.usecase';

describe('CreateAuthorUseCase', () => {
  let useCase: CreateAuthorUseCase;
  const payload = { name: 'Nuevo Autor', country: 'Chile', birthYear: 1980 };
  const AuthorRepositoryMock: jest.Mocked<AuthorRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CreateAuthorUseCase, { provide: AuthorRepository, useValue: AuthorRepositoryMock }],
    }).compileComponents();
    useCase = TestBed.inject(CreateAuthorUseCase);
  });

  it('debería crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(CreateAuthorUseCase);
  });

  it('debería delegar create al repository', async () => {
    AuthorRepositoryMock.create.mockReturnValue(of(AUTHORS_MOCK[0]));
    const result = await firstValueFrom(useCase.execute(payload));
    expect(AuthorRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(AuthorRepositoryMock.create).toHaveBeenCalledWith(payload);
    expect(result).toEqual(AUTHORS_MOCK[0]);
  });

  it('debería propagar el error del repository', async () => {
    AuthorRepositoryMock.create.mockReturnValue(throwError(() => new Error('fallo')));
    await expect(firstValueFrom(useCase.execute(payload))).rejects.toThrow('fallo');
  });
});
