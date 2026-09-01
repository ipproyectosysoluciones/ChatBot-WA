# SDD Proposal: Docker Infrastructure for BuilderBot (ChatBot-WA)

## 1. Executive Summary

**Change**: `docker-infrastructure`
**Project**: ChatBot-WA (BuilderBot monorepo)
**Status**: Proposal

### Problem

The ChatBot-WA monorepo (27+ packages) consists of multiple interconnected services (WhatsApp, Telegram, Facebook Messenger, Instagram, Twitter, etc.) deployed across several starters. Currently, each starter has its own Dockerfile but lacks a unified orchestration layer. This makes:

- Deploying the entire monorepo difficult
- Managing shared resources (databases, static assets) across services
- Ensuring consistency in build environments
- Scaling individual services independently

### Solution

Create a **multi-service docker-compose.yml** that orchestrates all components of the BuilderBot monorepo. This approach leverages the existing multi-stage Docker patterns from the starters (node:21-alpine3.18) and extends them to a cohesive composition.

## 2. Approach Comparison

| Aspect               | Single-Service docker-compose | Multi-Service docker-compose             |
| -------------------- | ----------------------------- | ---------------------------------------- |
| **Scope**            | One service at a time         | Entire monorepo (all services)           |
| **Database Sharing** | Per-service only              | Shared volumes for PostgreSQL, MongoDB   |
| **Asset Management** | Per-service                   | Centralized static assets (dist folders) |
| **Scaling**          | Independent per service       | Coordinated via compose services         |
| **Configuration**    | Service-specific env vars     | Shared env file with service overrides   |
| **Complexity**       | Simple                        | Moderate (requires proper networking)    |
| **Best Fit**         | Small projects, single API    | Microservices, monorepos                 |

**Recommendation**: **Multi-service docker-compose** – the monorepo has multiple tightly-coupled services (WhatsApp, Telegram, FB Messenger, etc.) that benefit from shared volumes and coordinated deployment.

## 3. Proposed Architecture

### Core Services

- **Web Server**: `@builderbot/bot` – main application entry point
- **API Gateway**: `@builderbot/manager` – orchestrates flows
- **Provider Services**: Twilio, Facebook Messenger, Instagram, WhatsApp, etc.
- **Databases**: PostgreSQL (primary), MongoDB (secondary)
- **Static Assets**: Dist folders from each package

### Key Design Decisions

#### Node Image Version

- **Current**: `node:21-alpine3.18` (used in starters)
- **Rationale**: Matches CI (Node 22.20.0) and provides stable Alpine base. We'll keep `node:21-alpine3.18` for consistency with existing build pipelines.

#### Volume Mounts

- **Databases**: `postgres_data`, `mongo_data` volumes persisted across services
- **Assets**: `./packages/**/dist` mounted as `assets` and `dist` in each service
- **Config**: Shared `.env` file with service-specific overrides

#### Environment Variables

```yaml
# Global (all services)
NODE_ENV: production
BUILDORG: BuildBot

# Per-service overrides
services:
    twilio:
        ENV_VARS:
            TWILIO_API_KEY: ${TWILIO_API_KEY}
            TWILIO_SITE_ID: ${TWILIO_SITE_ID}
    facebook:
        ENV_VARS:
            FACEBOOK_MESSENGER_TOKEN: ${FACEBOOK_TOKEN}
            FACEBOOK_PAGE_ID: ${FACEBOOK_PAGE_ID}
    postgres:
        ENV_VARS:
            DB_HOST: postgres
            DB_PORT: 5432
            DB_NAME: builderbot
            DB_USER: builderbot
            DB_PASSWORD: ${DB_PASSWORD}
```

## 4. Implementation Plan

1. **Create `docker-compose.yml`** – central orchestration file
2. **Define services** – each starter becomes a service with its own ports and env
3. **Add networks** – isolated network for inter-service communication
4. **Configure volumes** – persistent database and static asset mounts
5. **Set up health checks** – basic readiness/liveness probes
6. **Document** – add to `README.md` and `openspec/config/proposal.md`

## 5. Risks & Mitigations

| Risk                       | Impact | Mitigation                                                          |
| -------------------------- | ------ | ------------------------------------------------------------------- |
| Database connection issues | Medium | Use official PostgreSQL/MongoDB images with health checks           |
| Port conflicts             | Low    | Fixed ports per service; avoid hardcoded ports                      |
| Large image sizes          | Medium | Multi-stage builds (builder → deploy) as in starters                |
| Secret management          | High   | Use environment variables + .env.example; integrate with CI secrets |

## 6. Success Criteria

- [ ] `docker-compose up` starts all services successfully
- [ ] All services can communicate via internal DNS (e.g., `postgres:5432`)
- [ ] Static assets are accessible at `/assets/`
- [ ] Health checks pass for each service
- [ ] Build reproduces consistently across environments

## 7. Next Steps

1. Write the `docker-compose.yml` file
2. Validate with `docker-compose config`
3. Update `openspec/config/proposal.md` (this proposal)
4. Create `docker-compose.override.yml` for local development
5. Document in `README.md`

---

**Status**: Implemented (via SDD `docker-infrastructure`, `sdd-apply` T8)

**Author**: SDD Proposer (BuilderBot)
**Date**: 2026-08-31
**Status**: Implemented
