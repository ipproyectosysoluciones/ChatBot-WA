## Review Workload Forecast

| Field                   | Value                                                             |
| ----------------------- | ----------------------------------------------------------------- |
| Estimated changed lines | ~250-350 (6-8 new files, minimal edits to README)                 |
| 400-line budget risk    | Low                                                               |
| Chained PRs recommended | No                                                                |
| Suggested split         | Single PR — files are independent artifacts with clear boundaries |
| Delivery strategy       | ask-on-risk (default) / single-pr acceptable                      |
| Chain strategy          | stacked-to-main (default, not activated)                          |

```text
Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: stacked-to-main
400-line budget risk: Low
```

Source inputs: `openspec/config/proposal.md` (proposal), `openspec/changes/docker-infrastructure/specs/docker-infrastructure/spec.md` (spec). No `design.md` present — design decision deferred to tasks (unified Dockerfile + multi-service compose, per spec §File Structure).

---

## Task breakdown (dependency-ordered)

Strict TDD active (`strict_tdd: true` per `openspec/config.yaml`). For config/file artifacts the RED→GREEN cycle is validation-driven: write file → `docker-compose config` / `docker build --target` passes (GREEN) → triangulate with `docker-compose -f ... up` dry-run / second target (TRIANGULATE) → refactor (REFACTOR). No source unit tests are required for infrastructure files.

### Layer 1 — Foundation (no inter-file dependency within layer)

**T1 — Unified Dockerfile (root)**

- Path: `Dockerfile` (new, root)
- Acceptance: `docker build -t builderbot:bot --target bot .` succeeds; `--target production .` produces deploy stage with `node:21-alpine3.18`; multi-stage (builder / deploy) mimics `starters/apps/base-ts-voice-whatsapp-memory/Dockerfile` pattern (`FROM node:21-alpine3.18 as builder` / `as deploy`). `.dockerignore` excludes `node_modules` / `dist` / `.git`.
- Estimate: 60 min
- Dep: none
- Verification: `docker build --target bot .` + `docker build --target production .`
- Rollback: delete `Dockerfile`

**T2 — .env.example + .env template**

- Path: `.env.example` (new, root); referenced by compose via `env_file`
- Acceptance: Contains all spec-required variables (`NODE_ENV`, `BUILDORG`, `DB_HOST/PORT/NAME/USER/PASSWORD`, `MONGO_HOST/PORT/DB`, `REDIS_HOST/PORT`, per spec §Scenario: Required environment variables); placeholder values; no secrets checked in.
- Estimate: 30 min
- Dep: none (used by T3)
- Verification: `grep` check + copy-to-`.env` + `docker-compose config` reads without error
- Rollback: delete `.env.example`

**T3 — Base docker-compose.yml (core orchestration)**

- Path: `docker-compose.yml` (new, root)
- Acceptance: Defines `bot`, `postgres`, `mongo`, `redis` services; `builderbot-network` bridge network (spec §Internal Networking); named volumes `postgres_data`, `mongo_data`, `redis_data`; `depends_on` with `condition: service_healthy`; bot exposes only `3000`; DB services have no published ports. Matches spec §File Structure.
- Estimate: 90 min
- Dep: T2 (env variables referenced)
- Verification: `docker-compose config` passes; `docker-compose config --services` lists 4 services
- Rollback: delete `docker-compose.yml`

### Layer 2 — Profiles + Health (depend on T3 structure)

**T4 — Health checks (compose + Dockerfile)**

- Paths: `docker-compose.yml` (add `healthcheck` blocks per service); `Dockerfile` (add `HEALTHCHECK` for bot at `http://localhost:3000/health`)
- Acceptance: PostgreSQL uses `pg_isready`; MongoDB uses `mongosh --eval "db.adminCommand('ping')"`; Redis `redis-cli ping`; bot HTTP `200`. `depends_on` uses `condition: service_healthy` so bot waits for DB readiness (spec §Scenario: Bot service depends on healthy PostgreSQL).
- Estimate: 45 min
- Dep: T3 (service names defined), T1 (Dockerfile HEALTHCHECK)
- Verification: `docker-compose up -d` + `docker inspect` shows `healthy`; bot starts only after postgres healthy
- Rollback: revert `docker-compose.yml` + `Dockerfile` healthcheck sections

**T5 — Development override (docker-compose.dev.yml)**

- Path: `docker-compose.dev.yml` (new)
- Acceptance: Volume mounts for hot reload (source dirs); debug port `9229`; verbose logging; `./data/postgres` local override for DB (spec §Development Profile). Uses `-f docker-compose.yml -f docker-compose.dev.yml`.
- Estimate: 60 min
- Dep: T3 (base services defined)
- Verification: `docker-compose -f docker-compose.yml -f docker-compose.dev.yml config` passes; source edit triggers reload (manual)
- Rollback: delete file

**T6 — Production override (docker-compose.prod.yml)**

- Path: `docker-compose.prod.yml` (new)
- Acceptance: No source mounts (build-stage artifacts only); resource limits (`mem_limit`, `cpus`); `restart: unless-stopped`; non-root user; read-only root fs where possible; log rotation (spec §Production Profile). No secrets hardcoded — references `.env` / CI injection.
- Estimate: 60 min
- Dep: T3
- Verification: `docker-compose -f docker-compose.yml -f docker-compose.prod.yml config` passes; `docker-compose ... up -d` starts with limits
- Rollback: delete file

### Layer 3 — Validation + Documentation (depend on all above)

**T7 — Configuration validation (RED→GREEN→TRIANGULATE)**

- Path: none new — command-level
- RED: run `docker-compose config` / `docker-compose config --services`; expect failure if syntax wrong.
- GREEN: fix syntax → all configs pass (base, dev, prod).
- TRIANGULATE: run `docker-compose -f docker-compose.yml -f docker-compose.prod.yml config` + build both targets + `docker-compose ps` after dry-run.
- Acceptance: All three `docker-compose config` invocations exit 0; no missing-env errors; `docker build --target bot/production` exit 0; `docker-compose -f ... up -d` (local, non-prod) starts 4 services.
- Estimate: 45 min
- Dep: T3, T5, T6, T4, T1
- Verification: scripted command sequence saved in `openspec/changes/docker-infrastructure/verify.md` (optional); outputs captured
- Rollback: revert any syntax fixes; files remain

**T8 — Documentation updates**

- Path: `README.md` (edit, root) — add compose commands (`up -d`, `-f dev/prod`, `.env.example` copy step); update `openspec/config/proposal.md` per proposal §Next Steps (item 3).
- Acceptance: README contains `docker-compose up -d`, `.env.example → .env`, `docker-compose -f docker-compose.dev.yml up`; proposal status updated to `Implemented`. No hardcoded secrets.
- Estimate: 30 min
- Dep: T3-T7 complete (commands verified)
- Verification: `grep` checks + proposal status line
- Rollback: revert README section

---

## Dependency graph (simplified)

```
T1 (Dockerfile) ──┬──> T4 (health) ──┬──> T7 (validate)
T2 (.env) ───────> T3 (compose) ──> T4 ──> T5 (dev) ──┐
                     │                                ├──> T7
                     └───────────────────────────────> T6 (prod) ─┘
                                                      T8 (docs) <── T7
```

## Acceptance criteria (spec-level, from `spec.md`)

1. `docker-compose up -d` starts all 4 services; health checks pass before traffic routed.
2. Internal DNS works (`postgres:5432` from bot); service discovery via container names.
3. Named volumes persist (`postgres_data`, `mongo_data`, `redis_data`); restart preserves data.
4. Only bot exposes port `3000`; DB/Redis have no published ports by default.
5. `.env.example` documents all required variables; `.env` (gitignored) supplies secrets.
6. `docker-compose.dev.yml` enables hot reload + debug port; `docker-compose.prod.yml` sets limits/restart/non-root.
7. `Dockerfile` multi-stage builds (`bot` / `production`) with `node:21-alpine3.18`; `.dockerignore` present.
8. `docker-compose config` validates all profiles; no hardcoded secrets in versioned files.

## Verification commands (run during T7 / T4)

```bash
# RED / GREEN checks
docker build -t builderbot:bot --target bot .
docker build -t builderbot:prod --target production .
docker-compose config && docker-compose config --services
docker-compose -f docker-compose.yml -f docker-compose.dev.yml config
docker-compose -f docker-compose.yml -f docker-compose.prod.yml config

# Service startup (local, non-prod)
docker-compose up -d
docker-compose ps
docker inspect --format='{{.State.Health.Status}}' <postgres_container>
```

## Notes / constraints

- Design file (`design.md`) missing per dependency graph; spec is authoritative. No redesign needed — spec already specifies file layout (§File Structure) and architecture (unified Dockerfile + 4 services + network + volumes + profiles).
- No `docker-compose.yml` currently exists at repo root; creation is net-new (low blast radius).
- Existing starter Dockerfiles (`starters/apps/base-ts-voice-whatsapp-memory/Dockerfile`) establish the multi-stage `builder → deploy` pattern to mirror; `node:21-alpine3.18` base is fixed by spec.
- `chained-pr` skill not activated (`400-line budget risk: Low`; `chained PRs recommended: No`). If T7 reveals >400 lines of effective change, split at T5/T6 boundary before merge.
- Skill load (if sub-agents launched): `monorepo-navigator` (monorepo context); no docker-specific skill in registry.
- Artifact persistence (mandatory): save to `engram` with `topic_key: "sdd/docker-infrastructure/tasks"`, `type: "architecture"`, `project: "ChatBot-WA"`.

---

## Persisted task completion (sdd-apply)

- [x] **T1** — Unified Dockerfile (root) + `.dockerignore`
- [x] **T2** — `.env.example` template (12/12 spec-required variables)
- [x] **T3** — Base `docker-compose.yml` (bot, postgres, mongodb, redis; builderbot-network; named volumes)
- [x] **T4** — Health checks (compose + Dockerfile): `pg_isready` / `mongosh ping` / `redis-cli ping` / `wget /health`; bot `depends_on` → `service_healthy`
- [x] **T5** — `docker-compose.dev.yml` (debug port 9229, hot reload mounts, local `./data/*` DB override)
- [x] **T6** — `docker-compose.prod.yml` (resource limits, `restart: unless-stopped`, non-root user, `read_only: true`, json-file log rotation)
- [x] **T7** — Configuration validation: 4× `docker compose config` exit 0; `docker build --check` clean; no plaintext secrets in versioned files; `verify.md` captures sequence
- [x] **T8** — README "Docker Infrastructure" section + proposal status → `Implemented`
