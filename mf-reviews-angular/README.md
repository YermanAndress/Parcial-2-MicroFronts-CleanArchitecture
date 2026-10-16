# MF Reviews Angular (4203)

Microfrontend de reviews con Clean Architecture. Consume a `ms-reviews-springboot` (`http://localhost:8081/api/reviews`).

## Casos de uso (3)

- `GetAllReviewsUseCase` → `GET /api/reviews/:count`
- `GetReviewByIdUseCase` → `GET /api/reviews/item/:id`
- `CreateReviewUseCase` → `POST /api/reviews`

## Estructura

`core/domain/models|repositories` → `core/application/use-cases` → `core/infrastructure/services|repositories` → `presentation/pages|components` + `mocks/` + `environments/environment.ts`.

## Comandos

```bash
npm i
npm run start      # http://localhost:4203/remoteEntry.js (ReviewsPage)
npm run test:coverage  # 8 suites, 31 tests, 100% (exige >90%)
npx ng build
```
