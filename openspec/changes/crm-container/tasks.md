# Tasks: CRM Container — All Batches (crm-container)

**Change:** crm-container · **Phase:** tasks · **Project:** ChatBot-WA  
**Branch:** feature/crm-container-base · **Store:** engram (openspec fallback copy)

---

## Batch 1 — PR1 (T1 + T6) ✅

- [x] T1. Compose n8n service + .env + .gitignore
- [x] T6. GSA volume + docs

## Batch 2 — PR2 (T2 + T3) ✅

- [x] T2. SQL migration + dry-run (RED→GREEN) (sql/001_crm_events.sql, sql/001_crm_events.spec.ts)
- [x] T3. Folder skeleton + README (workflows/, .n8n/config.json, .env.example)

## Batch 3 — PR3 (T4 + T5 + T7 + T8) ✅

- [x] T4. Webhook endpoint (RED→GREEN→TRIANGULATE→REFACTOR) (workflows/crm-webhook.json, **tests**/crm-webhook.spec.ts)
- [x] T5. Workflow JSONs + CI parse (workflows/*.json, **tests**/workflow-json.spec.ts)
- [x] T7. CI pipeline (.github/workflows/crm-ci.yml: JSON parse, SQL dry-run, compose config)
- [x] T8. Docker verify build (manual — docker compose up n8n, webhook connectivity confirmed)

---

**Last updated:** 2026-09-01 by sdd-apply batch 3
