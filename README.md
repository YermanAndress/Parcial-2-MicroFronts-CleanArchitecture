# Parcial 2 - Microfrontends & Clean Architecture (BASE)

Base vacía: solo estructura de carpetas + archivos principales + `package` con dependencias. Sin implementación de dominio (la hace el grupo hoy).

## Proyectos a desarrollar (7, vacíos)

```
host-shell-angular/      # 4200 - principal: src/app/app.* + navbar + routes a 4201/4202/4203
mf-authors-angular/      # 4201 -> ms-authors-nodejs :3001
mf-movies-angular/       # 4202 -> ms-movies-nodejs :3003
mf-reviews-angular/      # 4203 -> ms-reviews-springboot :8081
ms-authors-nodejs/       # 3001 - principal: src/app.ts
ms-movies-nodejs/        # 3003 - principal: src/app.ts
ms-reviews-springboot/   # 8081 - principal: .../UcevaSpringBootTallerCleanArchitectureApplication.java
```

Qué queda en cada uno:
- Angular (host + 3 MF): carpetas Clean vacías (`core/domain/models|repositories`, `core/application/use-cases`, `core/infrastructure/services|repositories`, `presentation/pages|components`, `mocks`, `environments` con `.gitkeep`) + principales fuera de `/app` (`bootstrap.ts`, `index.html`, `main.ts`, `styles.scss`) + dentro de `/app` (`app.config.ts`, `app.routes.ts`, `app.scss`, `app.ts`) + obligatorios (`package.json`, `angular.json` con puerto, `webpack.config.js` con `remoteEntry.js`, `tsconfig*.json`, `jest.config.js`, `setup-jest.ts`).
- Node (x2): carpetas vacías (`domain/models|repositories`, `application/usecases`, `infrastructure/datasources|repositories|web/controllers`) + principales (`src/app.ts`, `web/server.ts`, `web/routes/routes.ts` placeholder, `web/config|erros|interfaces`) + obligatorios (`package.json`, `tsconfig.json`, `.env` con `PORT`).
- Spring (x1): carpetas vacías (`domain/entity|repository`, `application/usecase`, `infrastructure/controller|datasource|repository` con `.gitkeep`) + principales (`UcevaSpringBootTallerCleanArchitectureApplication.java`, `config/AppConfig.java` placeholder, `config/CorsConfig.java`, `application.properties` con `server.port=8081`) + obligatorios (`build.gradle`, `settings.gradle`).

## Referencia de talleres (copias intactas, no tocar)

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

| MF | MS | Swagger |
|---|---|---|
| mf-authors `4201` | ms-authors `3001` | `:3001/api/docs` |
| mf-movies `4202` | ms-movies `3003` | `:3003/api/docs` |
| mf-reviews `4203` | ms-reviews `8081` | `:8081/api/swagger-ui/index.html` |
| host `4200` | - | - |

## Arranque (tras `npm i` / `./gradlew`)

Backends `3001, 3003, 8081` primero; luego `4201, 4202, 4203`; al final `4200`.
