# Parcial 2 - Microfrontends & Clean Architecture

Monorepo con host + 3 microfrontends (Angular + Module Federation) + 3 microservicios (2 Node.js + 1 Spring Boot), cada vertical con Clean Architecture y 3 casos de uso.

## Proyectos (7)

```
host-shell-angular/      # 4200 - principal: src/app/app.* + navbar + routes a 4201/4202/4203
mf-authors-angular/      # 4201 -> ms-authors-nodejs :3001
mf-movies-angular/       # 4202 -> ms-movies-nodejs :3003
mf-reviews-angular/      # 4203 -> ms-reviews-springboot :8081
ms-authors-nodejs/       # 3001 - principal: src/app.ts
ms-movies-nodejs/        # 3003 - principal: src/app.ts
ms-reviews-springboot/   # 8081 - principal: .../UcevaSpringBootTallerCleanArchitectureApplication.java
```

Qué contiene cada uno:

- Angular (host + 3 MF): Clean Architecture en `src/app` (`core/domain/models|repositories`, `core/application/use-cases`, `core/infrastructure/services|repositories`, `presentation/pages|components`, `mocks`, `environments`) + `package.json`, `angular.json` con puerto, `webpack.config.js` con `remoteEntry.js`, `tsconfig*.json`, `jest.config.js`, `setup-jest.ts`. Pruebas Jest con cobertura 100% en los 3 MF (exige >90%).
- Node (x2): Clean Architecture en `src` (`domain/models|repositories`, `application/usecases`, `infrastructure/repositories|web/controllers|routes`) + `src/app.ts`, `web/server.ts`, `web/routes/routes.ts`, `web/config|erros|interfaces` + `package.json`, `tsconfig.json`, `.env` con `PORT`. Swagger UI en `/api/docs`.
- Spring (x1): Clean Architecture en `src/main/java/...` (`domain/entity|repository`, `application/usecase`, `infrastructure/controller|datasource|repository` + `config/AppConfig.java` con beans, `config/CorsConfig.java`) + `application.properties` con `server.port=8081`. Swagger UI en `/api/swagger-ui/index.html`.

## Referencia de talleres

```
referencia-talleres/
├── ref-taller5-host-angular/      # Client-Host-Angular Taller-5 (federation + navbar + routes)
├── ref-taller5-mf-ejemplo-angular/ # Microfrontend-Users-Angular Taller-5 (ejemplo MF)
├── ref-taller5-ms-ejemplo-nodejs/  # Microservice-Users-NodeJS Taller-5 (ejemplo MS)
├── ref-taller6-angular-clean/      # Taller-6-Angular entero (Clean en src/app/core+presentation)
├── ref-taller6-nodejs-clean/       # Taller-6-NodeJS entero (Clean en src/domain+application+infrastructure)
└── ref-taller6-springboot-clean/   # Taller-6-SpringBoot entero (Clean en src/main/java/... )
```

## Puertos y mapeo

| MF                | MS                | Swagger                           |
| ----------------- | ----------------- | --------------------------------- |
| mf-authors `4201` | ms-authors `3001` | `:3001/api/docs`                  |
| mf-movies `4202`  | ms-movies `3003`  | `:3003/api/docs`                  |
| mf-reviews `4203` | ms-reviews `8081` | `:8081/api/swagger-ui/index.html` |
| host `4200`       | -                 | -                                 |

## Arranque (tras `npm i` / `./gradlew`)

Backends `3001, 3003, 8081` primero; luego `4201, 4202, 4203`; al final `4200`.

```bash
# Backends
cd ms-authors-nodejs && npm start          # :3001 (ts-node-dev)
cd ms-movies-nodejs && npm start            # :3003 (ts-node-dev)
cd ms-reviews-springboot && sh gradlew bootRun  # :8081 (requiere JDK 21, ver su README)

# Microfrontends (uno por terminal, exponen remoteEntry.js)
cd mf-authors-angular && npx ng serve       # :4201 (./AuthorsPage)
cd mf-movies-angular && npx ng serve        # :4202 (./routes)
cd mf-reviews-angular && npx ng serve       # :4203 (./ReviewsPage)

# Host (verificar en navegador las 3 rutas)
cd host-shell-angular && npx ng serve       # :4200 (/authors, /movies, /reviews)
```

Cobertura Jest (exige >90%): `npx jest --coverage` en cada MF → 100% en los tres.
APIs: `:3001/api/docs`, `:3003/api/docs`, `:8081/api/swagger-ui/index.html`.
