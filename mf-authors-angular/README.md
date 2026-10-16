# MF Authors Angular (4201)

Microfrontend de autores con Clean Architecture. Consume a `ms-authors-nodejs` (`http://localhost:3001/api/authors`).

## Casos de uso (3)

- `GetAllAuthorsUseCase` → `GET /api/authors/:count`
- `GetAuthorByIdUseCase` → `GET /api/authors/item/:id`
- `CreateAuthorUseCase` → `POST /api/authors`

## Estructura

`core/domain/models|repositories` → `core/application/use-cases` → `core/infrastructure/services|repositories` → `presentation/pages|components` + `mocks/` + `environments/environment.ts`.

## Comandos

```bash
bun install    # o npm i
npx ng serve   # http://localhost:4201/remoteEntry.js (AuthorsPage)
npx jest --coverage  # 8 suites, 30 tests, 100% (exige >90%)
npx ng build
```
