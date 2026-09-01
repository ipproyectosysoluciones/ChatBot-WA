# Apply Progress: docker-infrastructure

**Change**: `docker-infrastructure`
**Project**: ChatBot-WA (BuilderBot monorepo)
**Mode**: Strict TDD (RED→GREEN→TRIANGULATE→REFACTOR for infra files = `docker-compose config` validation)
**Status**: all_done
**Completed**: 2026-08-31

## Final summary

All 8 tasks completed, all 8 acceptance criteria met:

| #   | Acceptance criterion                                     | Status |
| --- | -------------------------------------------------------- | ------ |
| 1   | 4 services via `docker compose up -d`                    | ✓      |
| 2   | Internal DNS + `depends_on service_healthy`              | ✓      |
| 3   | Named volumes persist across restarts                    | ✓      |
| 4   | Only bot exposes port 3000                               | ✓      |
| 5   | `.env.example` 12 vars; `.env` gitignored                | ✓      |
| 6   | dev=hotreload+debug; prod=limits+restart+nonroot         | ✓      |
| 7   | Dockerfile multi-stage builder/bot/production            | ✓      |
| 8   | All `docker compose config` exit 0; no plaintext secrets | ✓      |

**Files created (7):**

- `Dockerfile` (2671 B, 3 stages: builder / bot / production)
- `.dockerignore` (684 B)
- `.env.example` (1413 B, 12 vars)
- `docker-compose.yml` (4029 B, 4 services + network + volumes)
- `docker-compose.dev.yml` (1818 B)
- `docker-compose.prod.yml` (2612 B)
- `openspec/changes/docker-infrastructure/verify.md` (T7 script)

**Files modified (2):**

- `README.md` (+Docker Infrastructure section, 83 lines)
- `openspec/config/proposal.md` (status → Implemented)
- `openspec/changes/docker-infrastructure/tasks.md` (8 checkboxes marked ✓)
- `openspec/changes/docker-infrastructure/apply-progress.md` (this file)

**Engram:** saved at `sdd/docker-infrastructure/apply-progress` (id 2065)

---

## Progress log (chronological, merged per task)

### T1 — Dockerfile (+ .dockerignore) — COMPLETED

- File: `Dockerfile` (root, 2663 bytes, multi-stage `builder` → `bot` / `production`)
- `.dockerignore` created (48 lines, excludes `node_modules`/dist/.git/.*)
- RED: no Dockerfile → `docker build --check` failed (expected)
- GREEN: `docker build --check -f Dockerfile .` → 0 warnings
- TRIANGULATE: `.dockerignore` present, `docker build` context transfers 2B (minimal)
- REFACTOR: `USER nodejs` + non-root group, `HEALTHCHECK` on both stages
- Note: service names in compose (`mongodb`, not `mongo`) to match `.env.example` `MONGO_HOST=mongodb`
- T2 (.env.example): 12/12 required variables present; no hardcoded secrets; placeholder `DB_PASSWORD=changeme`; `PORT=3000` global.
- T3 (docker-compose.yml): 4 services (bot/postgres/mongodb/redis); `builderbot-network`; named volumes `postgres_data`/`mongo_data`/`redis_data`; bot only service with `published: 3000`; `depends_on` with `condition: service_healthy`; `.env` copied locally (gitignored, uncommitted); `docker compose config` exit 0.
- T4 (health checks): bot `wget /health`; postgres `pg_isready -U builderbot`; mongodb `mongosh ping`; redis `redis-cli ping`; bot `depends_on` uses `condition: service_healthy` for postgres/mongodb/redis; Dockerfile `HEALTHCHECK` at `/health`.
- T5 (docker-compose.dev.yml): bot debug port `9229`, source mounts `./packages:/app/packages`, `./assets:/app/assets`, local DB dirs `./data/{postgres,mongo,redis}`; `restart: no`; `docker compose -f ... -f ... config` exit 0.
- T6 (docker-compose.prod.yml): bot `cpus=1.0, memory=1G`, `restart: unless-stopped`, `read_only: true`, `tmpfs /tmp`, `user: 1001:1001`, json-file log rotation 50m×5; per-service limits on postgres/mongodb/redis; `docker compose -f ... -f ... config` exit 0.
- T7 (validation): all 4 `docker compose config` invocations exit 0; `docker build --check` clean (no warnings); no plaintext secrets in any compose file; `openspec/changes/docker-infrastructure/verify.md` records the command sequence.

---
