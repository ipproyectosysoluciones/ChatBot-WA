# CRM Workflows (n8n)

CRM automation pack running inside the `n8n` service added to the project's
`docker-compose.yml`. It receives webhook events from BuilderBot, validates
them, branches by `event_type`, calls Google Calendar / Sheets, and records
every accepted event in the shared PostgreSQL instance.

This document is the **first-slice** setup and operational guide. The
workflow JSONs themselves land in PR3.

## Layout

```
packages/crm-workflows/
├── README.md              # this file
├── sql/                   # DDL applied to the existing `postgres` service
│   └── 001_crm_events.sql
├── workflows/             # n8n workflow JSONs (canonical, version-controlled)
│   ├── crm-webhook.json
│   ├── appointment-handler.json
│   └── contact-handler.json
└── .n8n/
    └── config.json        # n8n runtime defaults
```

The `docker-compose.yml` service `n8n` mounts this directory **read-only**
(`/home/node/.n8n/workflows:ro`) so workflow edits in the repo are picked up
on container restart.

## Google Service Account (GSA) mount

Google Calendar and Google Sheets are reached with **service-account auth**
(server-to-server). The service-account JSON key is **never committed**; it
is mounted read-only into the n8n container at runtime.

### Where the file goes

- Host path: `./secrets/google-service-account.json`
- Container path: `/home/node/.n8n/gsa.json` (read-only)
- `GOOGLE_APPLICATION_CREDENTIALS` is set to that container path inside the
  `n8n` service environment.

The host directory `secrets/` is gitignored (see root `.gitignore`). A
`secrets/.gitkeep` placeholder keeps the directory tracked without leaking
the key.

### Verifying the mount is ignored

```bash
git check-ignore secrets/google-service-account.json
# → prints the path; exit code 0
```

### Creating the service account (one-time, done in Google Cloud Console)

1. Open **Google Cloud Console** → your project → **APIs & Services** →
   **Library** → enable **Google Calendar API** and **Google Sheets API**.
2. **IAM & Admin** → **Service Accounts** → **Create Service Account**.
3. Grant the service account these roles on the target resources:
   - On the target Calendar: **Calendar** ▸ `Make changes to events`
     (equivalent to `roles/calendar.editor`).
   - On the target Sheet: **Editor** (`roles/editor`).
4. After creating, open the service account → **Keys** → **Add Key** →
   **Create new key** → **JSON**. Save the downloaded file to
   `secrets/google-service-account.json` (project root).
5. Share the target Calendar (in Google Calendar settings) and the target
   Sheet (in Google Sheets "Share") with the service account's `email`
   field — granting it the editor scopes listed above.

### Required env vars (see `.env.example`)

| Variable | Example | Notes |
| --- | --- | --- |
| `CRM_WEBHOOK_SECRET` | random 32+ char string | compared constant-time by webhook |
| `GOOGLE_APPLICATION_CREDENTIALS` | `/home/node/.n8n/gsa.json` | path inside the n8n container |
| `GOOGLE_CALENDAR_ID` | `<id>@group.calendar.google.com` | shared with the service account |
| `GOOGLE_SHEETS_ID` | `<spreadsheet-id>` | from the Sheet URL |
| `N8N_HOST` | `n8n.internal` | internal DNS name on the bridge network |
| `WEBHOOK_URL` | `http://n8n:5678/webhook` | used by n8n when building absolute webhook URLs |

## Operational notes

- **Network:** the `n8n` service joins the existing `builderbot-network`
  bridge. BuilderBot and other services reach it as `http://n8n:5678`.
- **Healthcheck:** `wget --spider http://localhost:5678/healthz` every 30s.
  Container is considered healthy after a successful spider.
- **Database:** n8n's own internal DB is the shared `postgres` service
  (`DB_TYPE=postgresdb`). The application data table `crm_events` is created
  by `sql/001_crm_events.sql` (applied in PR2).
- **No public UI port:** the n8n UI is intentionally not exposed to the host
  in this first slice. Access is via `docker compose exec n8n` for ops.
