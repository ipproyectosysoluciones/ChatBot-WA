-- ============================================================================
-- 001_crm_events.sql
-- CRM Container — first-slice migration (T2, PR2 of crm-container change)
--
-- Purpose: durable record of CRM-domain events emitted by the n8n workflows
-- (inbound webhook receipts, calendar upserts, sheets syncs). n8n flows read
-- and write this table through the @builderbot/database-postgres adapter.
-- ============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- Table: crm_events
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS crm_events (
    id                       BIGSERIAL    PRIMARY KEY,
    event_type               TEXT         NOT NULL,
    payload_json             JSONB        NOT NULL,
    google_calendar_event_id TEXT         NULL,
    sheets_row_ref           TEXT         NULL,
    created_at               TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at               TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS event_type_idx ON crm_events (event_type);
CREATE INDEX IF NOT EXISTS created_at_idx ON crm_events (created_at);

-- ---------------------------------------------------------------------------
-- Comments
-- ---------------------------------------------------------------------------
COMMENT ON TABLE  crm_events              IS 'CRM domain events emitted by n8n workflows (webhook receipts, calendar upserts, sheets syncs).';
COMMENT ON COLUMN crm_events.id           IS 'Surrogate primary key.';
COMMENT ON COLUMN crm_events.event_type   IS 'Stable event discriminator (e.g. lead.created, calendar.upserted, sheet.synced).';
COMMENT ON COLUMN crm_events.payload_json IS 'Original event payload as JSONB; opaque to the schema.';
COMMENT ON COLUMN crm_events.google_calendar_event_id IS 'Google Calendar event id once the upsert is acknowledged; NULL until synced.';
COMMENT ON COLUMN crm_events.sheets_row_ref           IS 'Sheets row reference (e.g. "Sheet1!A2:H2") once persisted; NULL until synced.';
COMMENT ON COLUMN crm_events.created_at   IS 'Row creation timestamp (UTC).';
COMMENT ON COLUMN crm_events.updated_at   IS 'Row last-update timestamp (UTC).';

COMMIT;
