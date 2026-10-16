# Microfrontend Movies (mf-movies-angular) — Puerto 4202

Microfrontend desarrollado en Angular con Webpack Module Federation (`moviesMfe`) y Clean Architecture para la asignatura Arquitectura de Software (UCEVA).

## Mapeo de Puertos y Servicios

| Componente | Tipo | Puerto | URL / Endpoint | Consume |
| :--- | :--- | :---: | :--- | :--- |
| **`host-shell-angular`** | Host Shell | `4200` | `http://localhost:4200` | `4201`, `4202`, `4203` |
| **`mf-movies-angular`** | Microfrontend | `4202` | `http://localhost:4202/remoteEntry.js` | **`3003`** (`ms-movies-nodejs`) |
| **`ms-movies-nodejs`** | Backend Node.js | `3003` | `http://localhost:3003/api/movies` | Swagger: `/api/docs` |

## Los 3 Casos de Uso del Dominio

1. **`GetAllMoviesUseCase`**: Obtiene todas las películas del catálogo (`GET /api/movies`).
2. **`GetRecentMoviesUseCase`**: Obtiene películas de estreno reciente con año mayor o igual a 2020 (`GET /api/movies/recent`).
3. **`GetClassicMoviesUseCase`**: Obtiene películas clásicas con año anterior al 2000 (`GET /api/movies/classics`).

## Conmutabilidad Transparente de Fuentes de Datos

La capa de infraestructura implementa el contrato `MovieRepository` a través de 3 adaptadores intercambiables configurables en los providers:
- `MovieLocalRepositoryImpl`: Datos en memoria usando Mocks (`MOVIES_MOCK`).
- `MovieNodeRepositoryImpl`: Backend Node.js en `http://localhost:3003/api/movies` (configuración activa por defecto).
- `MovieSpringBootRepositoryImpl`: Backend Spring Boot en `http://localhost:8082/api/movies`.

## Métricas de Calidad

- **Cobertura de Pruebas Unitarias (Jest)**: **100%** en Statements, Branches, Functions y Lines (supera el 90% requerido).
- **Cobertura de Documentación (Compodoc)**: **100%** con bloques JSDoc exhaustivos en español en interfaces, clases, propiedades, métodos y decoradores.
