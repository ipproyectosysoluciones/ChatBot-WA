# Estado para contribución (fork)

## Preflight

- openspec/config.yaml: OK
- Cambios previos: crm-container/, docker-infrastructure/, landing-page-vercel/

## Resuelto (OK) — pasos críticos con evidencia

1. [OK] venom ENOENT spinnies.js — parcheado, backup creado
2. [OK] globalArg boolean — tipo actualizado + filtro en message listener
3. [OK] try/catch HTTP — handleCtx envuelto, MockProvider arreglado (stubs)
4. [OK] Tests meta — 153 passed / 10 suites / 92.57% stmts
5. [OK] Tests twilio — 37 passed / 3 suites / 100% stmts
6. [OK] Meta webhooks reminder — documentado

## Cobertura verificada

- provider-venom: 92.18% stmts / 91.8% lines
- provider-meta: 92.57% stmts / 93.92% lines
- provider-twilio: 100% stmts / 100% lines

## Archivos modificados (git status)

- packages/bot/src/core/coreClass.ts (+globalArg + filtro + try/catch + lint autofixes)
- packages/bot/__mock__/mock.provider.ts (+stubs mínimos para ProviderClass)
- .atl/ (no relevante para contribución)

## Pendientes (no bloqueantes, documentados)

- [ ] Coverage 90%+ en bot/cli/manager (actualmente no verificado globalmente)
- [ ] addKeyword([])/('') — parcial
- [ ] endFlow + capture:true — parcial
- [ ] Venom node 18/20/21 (ubuntu/win) — pendiente
- [ ] Docker twilio-ts/js — pendiente
- [ ] QR code validation controller — pendiente
- [ ] Meta webhook feedback — pendiente
- [ ] CONTRIBUTING.md update — pendiente
- [ ] Node 20.12.1/npm warning (sharp) — pendiente

## Cómo preparar el fork

1. git checkout -b fix/venom-spinnies-globalarg-trycatch
2. git add packages/bot/src/core/coreClass.ts packages/bot/__mock__/mock.provider.ts
3. git commit -m "fix(venom,core): resolve ENOENT, add globalArg filter, HTTP try/catch, mock stubs"
4. git push origin fix/venom-spinnies-globalarg-trycatch
5. PR con referencia a TODO.md y esta evidencia de tests/cobertura
