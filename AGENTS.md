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
- **Routes** (`app/routes/`): `/` (home, public), `/signin` (public), `/signup` (public), `/books`, `/books/:id`, `/rentals`, `/rentals/all` (all others wrapped in `_protected` layout that redirects to `/signin` if no token)

## Backend

- **Stack:** Java 25, Spring Boot 4.1.0, Spring MVC, Spring Data JPA/Hibernate, Spring Security + JWT (jjwt), PostgreSQL 18
- **Java version managed via `mise`** (see `backend/mise.toml`)
- **Commands** (run from `backend/`):
  - `docker compose up -d` — starts Postgres on `:5432` and Adminer on `:8081`
  - `./mvnw spring-boot:run` — starts backend on `:8080`
  - `./mvnw test` — runs tests (only a single context-load smoke test exists)
- **Schema:** `src/main/resources/schema.sql` runs on every startup (`spring.sql.init.mode=always`) — **idempotent**: uses `CREATE TABLE IF NOT EXISTS` and `ON CONFLICT DO NOTHING` so data survives restarts. Same for `data.sql` (book seeds).
- **Layered structure:** `controller/` → `service/` → `repository/` → DB; `dto/` for request/response classes; `model/` for JPA entities; `security/` for JWT; `config/` for Spring config
- **Auth:** Token stored in `localStorage("token")` by frontend, sent as `Authorization: Bearer <token>` header
- **API base URL** is hardcoded `http://localhost:8080` in frontend code
- **Adding an endpoint:** bottom-up: DTO → Model → Repository → Service → Controller → (SecurityConfig if access rules change)

## Environment

- **`backend/.env`** is loaded automatically by `spring-dotenv` at startup (gitignored). Contains `JWT_SECRET` and `JWT_EXPIRATION`. Copy from `.env.example` if missing.
- **`frontend/.env`** contains `VITE_API_URL` (gitignored). Copy from `frontend/.env.example` if missing.
- **`.env.example` files** (root, `backend/`, `frontend/`) are committed to git — copy to `.env` and fill values.
- **`show-sql: false`** — SQL logging disabled for production.

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
| GET | `/api/authors/{author}` | JWT |
| GET | `/api/rentals` | JWT |
| GET | `/api/rentals/all` | JWT (librarian) |
| POST | `/api/rentals` | JWT |
| PUT | `/api/rentals/{id}/return` | JWT (librarian) |
