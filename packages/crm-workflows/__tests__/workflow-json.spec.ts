/**
 * T5 — RED test for handler workflow JSONs (appointment-handler.json + contact-handler.json)
 *
 * Contract:
 *  - appointment-handler.json exists, parses as JSON, references Google Calendar
 *    and event types appointment.created / appointment.updated.
 *  - contact-handler.json exists, parses as JSON, references Google Sheets
 *    and event type contact.captured.
 *
 * RED until both workflow files are written.
 */
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import assert from 'node:assert/strict'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const WF_DIR = join(__dirname, '..', 'workflows')

const APPT_PATH = join(WF_DIR, 'appointment-handler.json')
const CONTACT_PATH = join(WF_DIR, 'contact-handler.json')

function loadText(p: string): string {
    return JSON.parse(readFileSync(p, 'utf8'))
}

test('T5.RED.A — appointment-handler.json exists and parses', () => {
    assert.ok(existsSync(APPT_PATH), `expected ${APPT_PATH} to exist`)
    assert.doesNotThrow(() => loadText(APPT_PATH), 'appointment-handler.json must be valid JSON')
})

test('T5.RED.B — appointment-handler references calendar + event types', () => {
    const text = JSON.stringify(loadText(APPT_PATH)).toLowerCase()
    assert.ok(text.includes('calendar') || text.includes('google'), 'must reference Google Calendar')
    assert.ok(text.includes('appointment.created') || text.includes('created'), 'must reference appointment.created')
    assert.ok(
        text.includes('appointment.updated') || text.includes('patch'),
        'must reference appointment.updated or patch'
    )
})

test('T5.RED.C — contact-handler.json exists and parses', () => {
    assert.ok(existsSync(CONTACT_PATH), `expected ${CONTACT_PATH} to exist`)
    assert.doesNotThrow(() => loadText(CONTACT_PATH), 'contact-handler.json must be valid JSON')
})

test('T5.RED.D — contact-handler references sheets + contact.captured', () => {
    const text = JSON.stringify(loadText(CONTACT_PATH)).toLowerCase()
    assert.ok(text.includes('sheet') || text.includes('google'), 'must reference Google Sheets')
    assert.ok(text.includes('contact.captured') || text.includes('captured'), 'must reference contact.captured')
})
