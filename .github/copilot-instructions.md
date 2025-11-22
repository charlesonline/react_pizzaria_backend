# Copilot Instructions - Pizzaria Backend

## Architecture Overview

This is an Express + Prisma + PostgreSQL backend for a pizzaria management system. The codebase follows a **service-controller pattern**:

- **Controllers** (`src/controllers/`) - Handle HTTP requests/responses, extract data from request body
- **Services** (`src/services/`) - Contain business logic, interact with Prisma
- **Routes** (`src/routes.ts`) - Central route definitions, controllers instantiated inline
- **Prisma Client** - Generated to custom path `src/generated/prisma` (see `prisma/schema.prisma`)

## Critical Setup: Docker-First Development

This project **runs exclusively in Docker**. The database is containerized and data persists in `config_docker/postgres_data/`.

### Start development:
```bash
docker-compose up -d
```

### Access the app:
- Backend: `http://localhost:7005` (maps to container port 3333)
- PostgreSQL: `localhost:5434` (user: `user`, password: `user123`, db: `pizzaria`)

### Hot reload works via `ts-node-dev` inside the container with volume mounts.

## Database & Prisma Patterns

### Prisma Client Import (IMPORTANT!)
Do NOT use `import { PrismaClient } from '@prisma/client'`. Instead, use the singleton instance:

```typescript
import PrismaClient from "@prisma/client"; // Wrong - this is the constructor
```

**Correct pattern** (see `src/prisma/index.js`):
```typescript
import PrismaClient from '../../prisma'; // Use the singleton instance
```

The singleton is exported from `src/prisma/index.js` and configured with the custom output path.

### Running migrations:
```bash
# Inside container
docker-compose exec pizzaria_backend yarn prisma migrate dev

# Or from host (if you have Prisma CLI)
yarn prisma migrate dev
```

Database connection uses `.env` file with `DATABASE_URL`. For Docker, use `localhost:5434`. Inside containers, use service name `pizzaria_db:5432`.

## Code Conventions

### Service Pattern
Services accept interface-typed parameters and throw `Error` objects for validation:

```typescript
interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        if (!email) {
            throw new Error("Email incorrect");
        }
        // Business logic here
    }
}
```

### Controller Pattern
Controllers call services and return JSON. No try-catch needed - global error handler in `server.ts` catches all:

```typescript
class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password } = req.body;
        const service = new CreateUserService();
        const user = await service.execute({ name, email, password });
        return res.json(user);
    }
}
```

### Route Registration
Routes instantiate controllers inline (see `src/routes.ts`):

```typescript
router.post('/users', new CreateUserController().handle);
```

## Data Model Structure

The Prisma schema defines a pizzaria ordering system:
- **User** - Customer/staff accounts
- **Category** - Pizza categories (1:many with Products)
- **Product** - Menu items with price, description, banner image
- **Order** - Customer orders with table number, draft/status flags
- **OrderItem** - Junction table linking orders to products with quantities

All models use UUID primary keys and include `createdAt`/`updatedAt` timestamps.

## Key Files

- `src/server.ts` - Express app with global error handler
- `src/routes.ts` - All route definitions
- `src/prisma/index.js` - Prisma singleton instance (import from here!)
- `prisma/schema.prisma` - Database schema with custom client output path
- `docker-compose.yml` - Service definitions (backend + PostgreSQL)
- `.env` - Database connection string

## TypeScript Configuration

Uses strict mode with `tsconfig.json` path mapping for Prisma:
```json
"paths": {
  "@prisma/client": ["./src/generated/prisma"]
}
```

Build outputs to `dist/`, source in `src/`.
