import { faker } from '@faker-js/faker';
import { User, UserEngineering } from "../../domain/models/user.model";


/**
 * Datasource encargado de generar usuarios simulados.
 *
 * @remarks
 * Forma parte de la **capa de Infrastructure** y actúa como
 * una fuente de datos temporal para desarrollo y pruebas.
 *
 * Utiliza la librería {@link https://www.npmjs.com/package/@faker-js/faker | faker}
 * para generar información aleatoria de usuarios.
 *
 * ❗ No contiene reglas de negocio.
 * ❗ No debe ser consumido directamente por casos de uso.
 *
 * Es utilizado por `UserRepositoryImpl`.
 */
export class UserDatasource {


    /**
     * Ingenierías disponibles para los usuarios simulados.
     *
     * @remarks
     * Se selecciona una ingeniería de forma aleatoria
     * al generar cada usuario.
     */
    private UserEngineerings: UserEngineering[] = [
        'Sistemas',
        'Electronica',
        'Biomedica',
        'Industrial',
        'Ambiental',
    ];

    /**
     * Obtiene una lista de usuarios simulados.
     *
     * @remarks
     * Genera dinámicamente una cantidad específica de usuarios
     * con datos aleatorios.
     *
     * @param countUsers - Cantidad de usuarios a generar
     * @returns Promesa que resuelve un arreglo de {@link User}
     *
     * @example
     * ```ts
     * const datasource = new UserDatasource();
     * const users = await datasource.getAll(5);
     * ```
     */
    async getAll(countUsers: number): Promise<User[]> {
        const users: Promise<User>[] = [];

        for (let i = 1; i <= countUsers; i++) {
            users.push(this.generateUser(i));
        }

        return Promise.all(users);
    }

    /**
     * Genera un usuario individual con datos simulados.
     *
     * @remarks
     * Método interno utilizado únicamente por el datasource
     * para construir usuarios aleatorios.
     *
     * @param id - Identificador único del usuario
     * @returns Promesa que resuelve un {@link User}
     */
    private generateUser(id: number): Promise<User> {
        return Promise.resolve({
        id,
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        age: faker.number.int({ min: 18, max: 65 }),
        email: faker.internet.email(),
        engineering: faker.helpers.arrayElement(this.UserEngineerings),
        });
    }

}