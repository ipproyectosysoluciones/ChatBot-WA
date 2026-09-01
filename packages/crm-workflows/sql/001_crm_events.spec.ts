/**
 * T2 — RED test for `001_crm_events.sql`
 *
 * Spec contract (from `sdd/crm-container/spec`):
 *  - Table `crm_events` with:
 *      id BIGSERIAL PRIMARY KEY
 *      event_type TEXT NOT NULL
 *      payload_json JSONB NOT NULL
 *      google_calendar_event_id TEXT NULL
 *      sheets_row_ref TEXT NULL
 *      created_at TIMESTAMPTZ DEFAULT now()
 *      updated_at TIMESTAMPTZ DEFAULT now()
 *  - Indexes:
 *      event_type_idx ON crm_events(event_type)
 *      created_at_idx ON crm_events(created_at)
 *  - Table comment (object comment on crm_events) describing its purpose.
 *
 * This test is RED until the migration file is created and the Docker
 * postgres service is healthy + populated. The test script itself does not
 * require docker at import time — it shells out lazily so the project can
 * still `tsc` / build even when postgres is not running.
 */
import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import assert from 'node:assert/strict'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const MIGRATION_PATH = join(__dirname, '001_crm_events.sql')

test('T2.AC1 — migration file exists and is non-empty', () => {
    assert.ok(existsSync(MIGRATION_PATH), `expected ${MIGRATION_PATH} to exist`)
    const sql = readFileSync(MIGRATION_PATH, 'utf8').trim()
    assert.ok(sql.length > 0, 'migration file must not be empty')
})

test('T2.AC2 — migration declares crm_events table with required columns', () => {
    const sql = readFileSync(MIGRATION_PATH, 'utf8')
    const lowered = sql.toLowerCase()

    // Table
    assert.match(lowered, /create\s+table\s+(if\s+not\s+exists\s+)?crm_events/, 'CREATE TABLE crm_events missing')

    // Columns (case-insensitive; allow whitespace variations)
    const must = [
        /id\s+bigserial/,
        /event_type\s+text\s+not\s+null/,
        /payload_json\s+jsonb\s+not\s+null/,
        /google_calendar_event_id\s+text/,
        /sheets_row_ref\s+text/,
        /created_at\s+timestamptz[^,\n]*default\s+now\(\)/,
        /updated_at\s+timestamptz[^,\n]*default\s+now\(\)/,
    ]
    for (const re of must) {
        assert.match(lowered, re, `crm_events missing required column matching ${re}`)
    }

    // Primary key on id — allow inline form: BIGSERIAL PRIMARY KEY
    assert.match(lowered, /(?:primary\s+key\s*\(\s*id\s*\)|bigserial\s+primary\s+key)/, 'PRIMARY KEY (id) missing')
})

test('T2.AC3 — migration declares both required indexes', () => {
    const sql = readFileSync(MIGRATION_PATH, 'utf8').toLowerCase()
    assert.match(sql, /create\s+index\s+(if\s+not\s+exists\s+)?event_type_idx\s+on\s+crm_events\s*\(\s*event_type\s*\)/, 'event_type_idx missing')
    assert.match(sql, /create\s+index\s+(if\s+not\s+exists\s+)?created_at_idx\s+on\s+crm_events\s*\(\s*created_at\s*\)/, 'created_at_idx missing')
})

test('T2.AC4 — migration documents the table with a COMMENT', () => {
    const sql = readFileSync(MIGRATION_PATH, 'utf8')
    assert.match(sql, /comment\s+on\s+table\s+crm_events\s+is\s+/i, 'COMMENT ON TABLE crm_events IS … missing')
})

test('T2.AC5 — migration parses cleanly against the running postgres (dry-run)', () => {
    // Lazily shell out to docker compose; if docker is not reachable we
    // surface that as the test failure (RED) — the test must run in an
    // environment where the postgres service from docker-compose.yml exists.
    let out: string
    try {
        out = execSync(
            'docker compose exec -T postgres psql -U ${DB_USER:-builderbot} -d ${DB_NAME:-builderbot} -v ON_ERROR_STOP=1 -c "\\set ECHO none" -f /dev/stdin < packages/crm-workflows/sql/001_crm_events.sql',
            { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] },
        )
    } catch (e: any) {
        // When docker / compose / postgres is not available this test is RED.
        // Surfacing the raw error keeps the failure diagnostic.
        assert.fail(`postgres dry-run failed: ${e?.stderr?.toString() ?? e?.message ?? String(e)}`)
    }
    assert.match(out, /create\s+table/i, 'psql output missing CREATE TABLE — dry-run did not apply migration')
})
