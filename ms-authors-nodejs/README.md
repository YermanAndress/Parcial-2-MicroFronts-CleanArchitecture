# MS Authors NodeJS (3001)

Microservicio de autores con Clean Architecture + Swagger en `/api/docs`.

## Casos de uso (3)

- `GetAllAuthorsUseCase` → `GET /api/authors/:count`
- `GetAuthorByIdUseCase` → `GET /api/authors/item/:id`
- `CreateAuthorUseCase` → `POST /api/authors` (201)

## Capas

`domain/models|repositories` → `application/usecases` → `infrastructure/repositories` (Faker) + `infrastructure/web/controllers|routes` + `web/config|erros|interfaces`.

## Comandos

```bash
bun install  # o npm i
npm start    # http://localhost:3001 (ts-node-dev)
# Swagger: http://localhost:3001/api/docs
# Probar: curl http://localhost:3001/api/authors/3
```
