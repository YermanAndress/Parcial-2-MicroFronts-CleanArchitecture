import { faker } from "@faker-js/faker";
import { Author } from "../../domain/models/author.model";
import { AuthorRepository } from "../../domain/repositories/author.repository";

/**
 * Implementación del repositorio de autores utilizando datos dinámicos de Faker.js.
 *
 * @remarks
 * Pertenece a la capa de Infraestructura. Genera 15 autores dinámicos en memoria,
 * satisfaciendo los 3 casos de uso del dominio sin acoplar la lógica de negocio.
 */
export class AuthorRepositoryImpl implements AuthorRepository {
  /**
   * Catálogo de autores almacenado en memoria.
   */
  private readonly authors: Author[];

  /**
   * Inicializa el repositorio generando 15 autores dinámicos.
   */
  constructor() {
    this.authors = this.seedAuthors();
  }

  /**
   * Genera 15 autores con Faker.
   *
   * @returns Lista de 15 autores con contrato Author estricto
   */
  private seedAuthors(): Author[] {
    const seeded: Author[] = [];

    for (let i = 1; i <= 15; i++) {
      seeded.push({
        id: i,
        name: faker.person.fullName(),
        country: faker.location.country(),
        birthYear: faker.number.int({ min: 1930, max: 2005 }),
      });
    }

    return seeded;
  }

  /**
   * Obtiene los primeros `count` autores del catálogo.
   *
   * @param count Cantidad máxima de autores a retornar
   * @returns Promesa con los autores solicitados
   */
  async getAll(count: number): Promise<Author[]> {
    return [...this.authors].slice(0, Math.max(count, 0));
  }

  /**
   * Obtiene un autor por su identificador único.
   *
   * @param id Identificador del autor
   * @returns Promesa con el autor encontrado o `null` si no existe
   */
  async getById(id: number): Promise<Author | null> {
    return this.authors.find((author) => author.id === id) ?? null;
  }

  /**
   * Crea un nuevo autor asignándole el siguiente identificador disponible.
   *
   * @param author Datos del autor sin identificador
   * @returns Promesa con el autor creado
   */
  async create(author: Omit<Author, "id">): Promise<Author> {
    const nextId =
      this.authors.reduce((max, item) => Math.max(max, item.id), 0) + 1;
    const created: Author = { id: nextId, ...author };
    this.authors.push(created);
    return created;
  }
}
