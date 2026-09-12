# Estado de Contribución — BuilderBot (fork `ChatBot-WA`)

Fase de integración de `builderbot` completada. Este documento consolida el estado final.

## Contexto arquitectónico

- **builderbot** (`codigoencasa/builderbot`) = solo mensajería (dependencia).
- **CRM** = proyecto aparte que integra builderbot.
- Los fixes se aplican **localmente en el fork** para que el CRM avance sin depender de que el upstream los integre.

## Resuelto (marcados `[x]` en `TODO.md`)

| Área | Detalle |
| --- | --- |
| venom ENOENT | `spinnies.js` parcheado |
| `globalArg` boolean | evita que el bot responda a sí mismo |
| `try/catch` HTTP | `handleCtx` protegido |
| tests meta / twilio | 153 + 37 tests, cobertura 92.57% / 100% |
| meta webhooks | aviso de ambos webhooks |
| `addKeyword([])` / `('')` | throw `Keyword cannot be empty` |
| QR validation | `existsSync` → 404 JSON |
| Node/sharp warning | `engines >=20.12.1` |
| meta connection feedback | notice `WEBHOOK REQUIRED` |
| endFlow + capture | tests des-skipeados (6/6) |
| venom Node versions | CI matrix (→ Node 22 LTS) |
| Docker twilio | ya existía (10 starters) |
| CONTRIBUTING.md | actualizado a `builderbot` |

## PRs

| PR | Repo | Base ← Head | Estado |
| --- | --- | --- | --- |
| `#33` | fork `ChatBot-WA` | `dev` ← `main` | ✅ GREEN |
| `#1259` | `codigoencasa/builderbot` | `builderbot` ← `contrib/todo-backlog` | pendiente review (Leifer) |

## Fixes de CI (6 causas encadenadas resueltas)

1. Submodule huérfano `wa-calls-ref` → `git rm --cached`.
2. Conflicto pnpm (`version:9` vs `packageManager 9.0.6`) → pin a `9.0.6`.
3. Matrix con Node < mínimo sharp (`20.12.1`) → alineado.
4. `Object.hasOwn` (es2022) vs target `es2021` → revert a `hasOwnProperty`.
5. Windows con sharp sin prebuilt (timeout) → quitado.
6. `@builderbot/bot` sin `build` (TS2307) → build previo.

## Decisión de versiones

Solo **Ubuntu + Node 22 LTS** (las versiones 18-21 están obsoletas y generan problemas de seguridad en el MVP).

## Pendiente

- **Windows** (`win venom node 18/20/21`) — sin SO Windows para validación final.

## Verificación

- `bot` methods: 13/13 · e2e endFlow: 6/6
- `provider-venom`: 29/29 · `provider-meta`: 68/68
- Build monorepo: 30 proyectos OK
