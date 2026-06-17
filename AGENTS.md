# Library Management — AGENTS.md

## Structure

Monorepo: `frontend/` (React), `backend/` (Spring Boot). No monorepo tool — each has its own build.

## Frontend

- **Stack:** React 19, React Router v7 (SSR, file-based routing via `@react-router/fs-routes`), Vite 8, Tailwind CSS v4, TypeScript 5.9
- **`~/*`** path alias maps to `app/`
- **Commands** (run from `frontend/`):
  - `npm run dev` — dev server on `:5173`
  - `npm run build` — production build
  - `npm run typecheck` — runs `react-router typegen && tsc` (typegen first)
  - `npm run start` — production server (via `react-router-serve`)
- **Routes** (`app/routes/`): `/` (home), `/signin`, `/signup`, `/books`, `/books/:id`

## Backend

- **Stack:** Java 25, Spring Boot 4.1.0, Spring MVC, Spring Data JPA/Hibernate, Spring Security + JWT (jjwt), PostgreSQL 18
- **Java version managed via `mise`** (see `backend/mise.toml`)
- **Commands** (run from `backend/`):
  - `docker compose up -d` — starts Postgres on `:5432` and Adminer on `:8081`
  - `./mvnw spring-boot:run` — starts backend on `:8080`
  - `./mvnw test` — runs tests (only a single context-load smoke test exists)
- **Schema:** `src/main/resources/schema.sql` runs on every startup (`spring.sql.init.mode=always`) — drops and recreates all tables
- **Layered structure:** `controller/` → `service/` → `repository/` → DB; `dto/` for request/response classes; `model/` for JPA entities; `security/` for JWT; `config/` for Spring config
- **Auth:** Token stored in `localStorage("token")` by frontend, sent as `Authorization: Bearer <token>` header
- **API base URL** is hardcoded `http://localhost:8080` in frontend code
- **Adding an endpoint:** bottom-up: DTO → Model → Repository → Service → Controller → (SecurityConfig if access rules change)

## Known issues

- **Duplicate CORS config:** `WebConfig.java` and `SecurityConfig.java` both configure CORS with different origins — keep `SecurityConfig`, delete `WebConfig`
- **Auth split across controllers:** `AuthController.java` (signin) and `UserController.java` (signup) share `/api/auth` — consolidate
- **Debug scaffolding:** `TestController.java`, `TestService.java`, `TestRepository.java`, `model/Test.java` reference a `test` table not in `schema.sql` — remove
- **Dead code:** `BooksResponse.java` (DTO) is never used; Lombok in `pom.xml` is declared but unused (manual getters/setters everywhere)
- **Stub controller:** `AuthorController.java` returns hardcoded strings, doesn't follow the layered pattern
- **Security:** JWT secret has a hardcoded fallback — set `JWT_SECRET` env var in production

## API endpoints

| Method | Path | Auth |
|---|---|---|
| POST | `/api/auth/signup` | public |
| POST | `/api/auth/signin` | public |
| GET | `/api/auth/check-email?email=` | JWT |
| GET | `/api/books` | JWT |
| GET | `/api/books/{id}` | JWT |
| POST | `/api/books` | JWT |
| GET | `/api/authors` | JWT |
| GET | `/api/authors/{id}` | JWT |
| POST | `/api/authors` | JWT |
| GET | `/api/test` | JWT |
