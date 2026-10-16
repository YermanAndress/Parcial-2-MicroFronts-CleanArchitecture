# MS Reviews SpringBoot (8081)

Microservicio de reviews con Clean Architecture + springdoc-openapi.

## Casos de uso (3)

- `GetAllReviewsUseCase` → `GET /api/reviews/{count}`
- `GetReviewByIdUseCase` → `GET /api/reviews/item/{id}`
- `CreateReviewUseCase` → `POST /api/reviews`

## Capas

`domain/entity|repository` → `application/usecase` → `infrastructure/controller|datasource|repository` + `config/AppConfig.java` (beans).

## Comandos

```bash
./gradlew bootRun   # http://localhost:8081/api (usar sh gradlew si falta permiso +x)
# Swagger: http://localhost:8081/api/swagger-ui/index.html
# Probar: curl http://localhost:8081/api/reviews/3
```
