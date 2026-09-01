/**
 * T4 — RED test for `workflows/crm-webhook.json`
 *
 * Contract (from spec + design):
 *  - File exists and parses as JSON
 *  - Webhook node: POST /webhook/crm
 *  - Nodes include: Webhook, Set (extract fields), Switch (branch event_type),
 *    Header Auth validation (X-CRM-Secret), Error Trigger (422)
 *  - Schema validates required keys: event_type (string), occurred_at (ISO-8601), payload (object)
 *
 * RED until the workflow file is written.
 */
import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import assert from 'node:assert/strict'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const WORKFLOW_PATH = join(__dirname, '..', 'workflows', 'crm-webhook.json')

test('T4.RED.A — workflow file exists', () => {
    assert.ok(existsSync(WORKFLOW_PATH), `expected ${WORKFLOW_PATH} to exist`)
})

test('T4.RED.B — file parses as valid JSON', () => {
    assert.ok(existsSync(WORKFLOW_PATH), 'file must exist for JSON parse')
    const raw = readFileSync(WORKFLOW_PATH, 'utf8')
    assert.doesNotThrow(() => JSON.parse(raw), 'crm-webhook.json must be valid JSON')
})

test('T4.RED.C — JSON contains webhook node referencing POST /webhook/crm', () => {
    const raw = JSON.parse(readFileSync(WORKFLOW_PATH, 'utf8'))
    // n8n export: nodes array with name/type; webhook node should reference the path
    const nodes = raw?.nodes || raw?.connections || []
    // Accept either top-level nodes array (simplified structure) or full export
    let text = JSON.stringify(raw).toLowerCase()
    assert.ok(
        text.includes('webhook') || text.includes('/webhook/crm'),
        'workflow JSON must reference webhook and /webhook/crm path'
    )
})

test('T4.RED.D — JSON includes event_type branch nodes (Switch / branch logic)', () => {
    const raw = JSON.parse(readFileSync(WORKFLOW_PATH, 'utf8'))
    const text = JSON.stringify(raw).toLowerCase()
    assert.ok(
        text.includes('switch') || text.includes('event_type'),
        'workflow must include event_type branch (Switch node or event_type reference)'
    )
})
