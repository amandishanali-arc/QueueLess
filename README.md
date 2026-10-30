# QueueLess

QueueLess is a real-time smart queue management system being developed as a Software Engineering internship portfolio project. It aims to help customers follow their place in a queue and help staff manage service efficiently.

## Problem statement

Physical queues often leave customers uncertain about their turn and require staff to coordinate service manually. QueueLess aims to make queue progress visible and provide a shared workflow for customers and service staff.

## Current development status

The backend foundation is implemented. Queue management and real-time functionality are **planned**, not available yet.

Implemented:

- Node.js, Express, and TypeScript backend with separate application and startup modules.
- JSON request parsing, configurable CORS, and environment configuration with dotenv.
- Root identification and API health-check endpoints.
- JSON responses for unknown routes and centralized error handling.
- Development, type-checking, build, and production startup commands.

No frontend, database, authentication, queue workflows, or automated test suite has been implemented yet.

## Planned key features

- Digital queue joining and ticket tracking.
- Live queue position and service-status updates.
- Staff controls to call and manage queue tickets.
- Authentication and role-based access for relevant workflows.
- Queue activity history and operational reporting.

These features describe the intended direction; details will evolve during development.

## Technology stack

| Area | Technology | Status |
| --- | --- | --- |
| Backend | Node.js, Express, TypeScript | Implemented foundation |
| Configuration | dotenv, cors | Configured |
| Frontend | Next.js, TypeScript, Tailwind CSS | Planned |
| Database | PostgreSQL, Prisma | Planned |
| Real-time communication | Socket.IO | Planned |
| Testing | Vitest, Supertest | Planned |

## Project structure

```text
QueueLess/
├── .gitignore
├── README.md
└── backend/
    ├── .env.example
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.json
    └── src/
        ├── app.ts
        ├── config.ts
        ├── index.ts
        └── middleware/
            └── error-handler.ts
```

- `app.ts` configures Express middleware and routes without opening a port.
- `index.ts` starts the HTTP server and reports startup errors.
- `config.ts` loads environment variables and validates the port.
- `middleware/error-handler.ts` returns consistent JSON errors without exposing internal error details to clients.
- `tsconfig.json` configures strict type checking and compiles `src/` into `dist/`.

Dependencies (`node_modules/`), compiled output (`dist/`), and local `.env` files are ignored by Git. The lockfile is committed to keep dependency installations reproducible.

## Local backend setup

Prerequisites: Git, Node.js, and npm. The backend has been verified with Node.js v22.23.2.

1. Clone the repository and enter the backend directory:

   ```sh
   git clone https://github.com/amandishanali-arc/QueueLess.git
   cd QueueLess/backend
   ```

2. Install the locked dependencies, including platform-specific optional packages:

   ```sh
   npm ci --include=optional
   ```

3. Optionally copy the environment template to `.env` to customize defaults.

   PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

   macOS/Linux:

   ```sh
   cp .env.example .env
   ```

   | Variable | Default | Purpose |
   | --- | --- | --- |
   | `PORT` | `5000` | HTTP port; an integer from 1 to 65535 |
   | `FRONTEND_ORIGIN` | `http://localhost:3000` | Allowed browser origin, without a trailing slash |

   Run npm commands from `backend/` so dotenv finds its `.env` file. Never commit secrets. CORS controls browser access; it is not authentication.

4. Start the development server:

   ```sh
   npm run dev
   ```

   The default server address is `http://localhost:5000`. Stop it with `Ctrl+C`.

## Available npm commands

Run these commands inside `backend/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run TypeScript with automatic restart on source changes |
| `npm run typecheck` | Check TypeScript without emitting files |
| `npm run build` | Compile the backend into `dist/` |
| `npm start` | Run the compiled backend with source-map support |

To verify and run a compiled build:

```sh
npm run typecheck
npm run build
npm start
```

Build before running `npm start`. Automated tests will be added in a later phase.

## Current API endpoints

### Health check

`GET http://localhost:5000/api/health`

Expected HTTP status: `200 OK`

```json
{
  "status": "success",
  "message": "QueueLess API is running"
}
```

Open the URL in a browser, or use PowerShell:

```powershell
Invoke-RestMethod http://localhost:5000/api/health
```

This endpoint confirms the API is responding; it does not check a database or external services.

### Backend identification

`GET /` returns:

```json
{
  "status": "success",
  "message": "QueueLess backend API"
}
```

Unknown routes return JSON with HTTP status `404`. Invalid JSON returns `400`, and request bodies exceeding the configured 100 KB limit return `413`. Unexpected errors return a generic `500` response.

## Future development roadmap

1. Define queue workflows, requirements, and the data model.
2. Set up PostgreSQL and Prisma with migrations.
3. Add authentication and queue management APIs.
4. Build the Next.js frontend.
5. Integrate Socket.IO for live queue updates.
6. Add Vitest and Supertest coverage, followed by CI checks.
7. Prepare deployment configuration and expand operational documentation.

Development is proceeding incrementally, with verification at each step.
