import { Component, inject } from '@angular/core';
import { GetAllAuthorsUseCase } from '../../../core/application/use-cases/get-all-authors.usecase';
import { Author } from '../../../core/domain/models/author.model';
import { AuthorRepository } from '../../../core/domain/repositories/author.repository';
import { AuthorRepositoryImpl } from '../../../core/infrastructure/repositories/author.repository.impl';
import { AlertComponent } from '../../components/alert/alert.component';
import { AuthorsTableComponent } from '../../components/authors-table/authors-table.component';
import { State } from '../../interfaces/state.interface';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.page.html',
  imports: [AuthorsTableComponent, AlertComponent],
  providers: [
    GetAllAuthorsUseCase,
    // Proveedor a nivel de componente: app.config.ts no se ejecuta cuando
    // la página se carga como remoto en el host (Module Federation).
    { provide: AuthorRepository, useClass: AuthorRepositoryImpl },
  ],
})
export class AuthorsPage {
  authors: Author[] = [];
  state: State = 'init';

  private getAllAuthorsUseCase = inject(GetAllAuthorsUseCase);

  ngOnInit(): void {
    this.state = 'loading';
    this.getAllAuthorsUseCase.execute(10).subscribe({
      next: (authors) => {
        this.authors = authors;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.state = 'error';
      },
    });
  }
}
