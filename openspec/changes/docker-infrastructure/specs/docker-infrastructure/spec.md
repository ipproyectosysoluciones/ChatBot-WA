# Docker Infrastructure Specification

## Purpose

Define the multi-service Docker infrastructure for the BuilderBot (ChatBot-WA) monorepo. This specification establishes requirements for orchestrating all BuilderBot services (bot, databases, cache) through Docker Compose, ensuring consistent deployments across development and production environments.

## Scope

This specification covers:

- Multi-service `docker-compose.yml` architecture
- Core services: bot application, PostgreSQL, MongoDB, Redis
- Dockerfile strategy (unified vs. per-service)
- Volume management for persistent data
- Environment variable configuration
- Internal networking and service discovery
- Health check implementation
- Development and production profile separation

## Requirements

### Requirement: Unified Dockerfile Strategy

The monorepo SHALL use a single unified Dockerfile in the root directory that can build any package within the monorepo using multi-stage builds. This ensures:

1. **Single source of truth** for build configuration
2. **Consistent base image** across all services (`node:21-alpine3.18` to match existing starters)
3. **Multi-stage builds**: builder stage for dependencies and compilation, deploy stage for minimal runtime image

#### Scenario: Building the bot service

- GIVEN a developer runs `docker build -t builderbot:bot --target bot .`
- WHEN the Dockerfile uses `--target bot` to select the appropriate stage
- THEN the resulting image contains only the bot package artifacts and production dependencies

#### Scenario: Production build

- GIVEN a CI pipeline runs `docker build -t builderbot:prod --target production .`
- WHEN the production stage copies only the necessary artifacts
- THEN the final image excludes development dependencies, test files, and source maps

---

### Requirement: Multi-Service Docker Compose Architecture

The system MUST provide a `docker-compose.yml` that orchestrates all core services:

1. **Bot Service**: The main BuilderBot application
2. **PostgreSQL**: Primary relational database for structured bot state
3. **MongoDB**: Secondary document database for flexible data schemas
4. **Redis**: Caching layer for session management and rate limiting

#### Scenario: Starting all services in production

- GIVEN a deployment environment with Docker and Docker Compose installed
- WHEN an operator runs `docker-compose up -d`
- THEN all four services start in the correct order with proper dependencies
- AND health checks confirm all services are ready before traffic is routed

#### Scenario: Service dependency resolution

- GIVEN PostgreSQL takes 15 seconds to initialize
- WHEN the bot service depends on PostgreSQL
- THEN the bot service waits for PostgreSQL health check to pass before starting
- AND PostgreSQL remains running throughout bot restarts

---

### Requirement: Volume Strategy for Persistent Data

The system MUST use Docker named volumes for all persistent data:

1. **`postgres_data`**: Persists PostgreSQL database files across container restarts
2. **`mongo_data`**: Persists MongoDB data files across container restarts
3. **`redis_data`**: Persists Redis persistence files (RDB snapshots) across container restarts

#### Scenario: Data survives service restart

- GIVEN a PostgreSQL volume `postgres_data` is mounted at `/var/lib/postgresql/data`
- WHEN the PostgreSQL container restarts
- THEN all previously stored databases and tables remain accessible

#### Scenario: Development volume overrides

- GIVEN a developer uses `docker-compose -f docker-compose.yml -f docker-compose.override.yml up`
- WHEN the override file mounts local `./data/postgres` to the PostgreSQL container
- THEN developers can inspect database files directly on the host

---

### Requirement: Environment Variable Configuration

The system MUST support environment variables through:

1. **`.env.example`**: Template file documenting all required variables with placeholder values
2. **`env_file` directive**: Docker Compose loads variables from a `.env` file
3. **Variable interpolation**: Service-specific values reference shared global variables

#### Scenario: Required environment variables

- GIVEN the following `.env.example` template exists:

    ```
    # Global
    NODE_ENV=production
    BUILDORG=BuildBot

    # PostgreSQL
    DB_HOST=postgres
    DB_PORT=5432
    DB_NAME=builderbot
    DB_USER=builderbot
    DB_PASSWORD=changeme

    # MongoDB
    MONGO_HOST=mongodb
    MONGO_PORT=27017
    MONGO_DB=builderbot

    # Redis
    REDIS_HOST=redis
    REDIS_PORT=6379
    ```

- WHEN a new developer copies `.env.example` to `.env`
- THEN Docker Compose reads all variables without modification for local development

#### Scenario: Production secrets injection

- GIVEN CI/CD pipelines inject secrets via environment variables
- WHEN `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up`
- THEN the production override file can reference `${DB_PASSWORD}` from the CI environment
- AND actual passwords are never stored in version control

---

### Requirement: Internal Networking

The system MUST use an isolated Docker network for inter-service communication:

1. **Network name**: `builderbot-network` (bridge driver)
2. **Service discovery**: Services communicate via container names as DNS hostnames
3. **No external exposure**: Database services (PostgreSQL, MongoDB, Redis) have no published ports by default

#### Scenario: Bot connecting to PostgreSQL

- GIVEN the bot service has `DB_HOST=postgres` in its environment
- WHEN the bot service starts in the `builderbot-network`
- THEN the container can resolve `postgres` to the PostgreSQL container's IP address
- AND the bot successfully connects to PostgreSQL on port 5432

#### Scenario: Exposing only required ports

- GIVEN the bot service exposes port 3000 for HTTP traffic
- WHEN `docker-compose ps` runs
- THEN only the bot service shows a published port (3000:3000)
- AND PostgreSQL, MongoDB, and Redis show no published ports

---

### Requirement: Health Checks

Each service MUST implement Docker HEALTHCHECK directives:

1. **PostgreSQL**: Uses `pg_isready` command with connection timeout
2. **MongoDB**: Uses `mongosh --eval "db.adminCommand('ping')"`
3. **Redis**: Uses `redis-cli ping` command
4. **Bot**: HTTP endpoint at `http://localhost:3000/health` returning 200 OK

#### Scenario: PostgreSQL health check

- GIVEN the PostgreSQL container is starting
- WHEN `docker inspect` shows health status
- THEN the status is `starting` until `pg_isready` returns successfully
- AND after successful check, status changes to `healthy`

#### Scenario: Bot service depends on healthy PostgreSQL

- GIVEN the bot service has `depends_on` with `condition: service_healthy`
- WHEN PostgreSQL is unhealthy or starting
- THEN the bot service does not start
- AND the bot service starts only after PostgreSQL becomes healthy

---

### Requirement: Development Profile

The system MUST provide a `docker-compose.dev.yml` override for development:

1. **Hot reload**: Mounts source code directories as volumes for live reloading
2. **Debug ports**: Exposes debugging ports (e.g., Node.js inspector on 9229)
3. **Verbose logging**: Enables debug-level application logging
4. **Volume overrides**: Database data stored in local `./data/` directories

#### Scenario: Development workflow

- GIVEN a developer runs `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up`
- WHEN the developer modifies a TypeScript file in `packages/bot/src/`
- THEN the running container detects the change and reloads without rebuild

#### Scenario: Attaching debugger

- GIVEN the bot service runs with Node.js inspector enabled
- WHEN a developer connects to `localhost:9229` with VS Code debugger
- THEN breakpoints in mounted source files trigger as expected

---

### Requirement: Production Profile

The system MUST provide a `docker-compose.prod.yml` override for production:

1. **No source mounts**: Uses only compiled artifacts from build stage
2. **Resource limits**: Memory and CPU limits defined per service
3. **Restart policies**: `unless-stopped` for all services
4. **Log rotation**: Limits log file size to prevent disk exhaustion
5. **Security**: Non-root user for application containers, read-only root filesystem where possible

#### Scenario: Production deployment

- GIVEN `docker-compose -f docker-compose.yml -f docker-compose.prod.yml config` validates successfully
- WHEN `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d` executes
- THEN all containers run with defined resource limits
- AND restart automatically after system reboot (unless explicitly stopped)

---

### Requirement: Configuration Validation

Docker Compose configuration MUST be validated before deployment:

1. **`docker-compose config`**: Validates YAML syntax and service definitions
2. **`docker-compose config --services`**: Lists all defined services
3. **No hardcoded secrets**: Configuration must not contain plaintext passwords

#### Scenario: Validating compose file

- GIVEN an operator modifies `docker-compose.yml`
- WHEN running `docker-compose config` succeeds
- THEN the configuration is syntactically valid
- AND the operator can proceed with deployment

#### Scenario: Detecting missing environment variables

- GIVEN `.env` file is missing a required variable
- WHEN running `docker-compose config`
- THEN Docker Compose reports the missing variable with an error message
- AND deployment is blocked until the variable is provided

---

## File Structure

The Docker infrastructure files MUST be organized as follows:

```
ChatBot-WA/
├── docker-compose.yml              # Base composition (all services)
├── docker-compose.dev.yml           # Development overrides
├── docker-compose.prod.yml         # Production overrides
├── .env.example                     # Environment variable template
├── Dockerfile                       # Unified multi-stage build
└── .dockerignore                    # Excludes for build context
```

## Non-Requirements

- The specification does NOT cover Kubernetes or other container orchestration platforms
- The specification does NOT define specific database schemas or migrations
- The specification does NOT mandate service-specific Dockerfiles (unified approach is preferred)

---

## References

- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)
- [Health Checks in Compose](https://docs.docker.com/compose/compose-file/#healthcheck)
