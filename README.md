# Bridge

Orquestrador **FE↔BE** para [Keel](../keel) + [Impeccable](https://github.com/pbakaus/impeccable).  
Contrato, sequência e monitoramento — sem substituir o craft.

## Início rápido

```bash
node cli/bin/bridge.js install --providers=cursor
# + Keel e Impeccable no mesmo projeto
```

`/bridge init` → `/bridge contract` → `/bridge plan` → handoff → `/bridge sync` → `/bridge ship`.

## Comandos do agente

| Comando | Args / flags | Descrição |
|---------|--------------|-----------|
| `init` | — | PRODUCT + stub CONTRACT |
| `contract` | (+ seed OpenAPI via CLI) | Negocia/aceita `CONTRACT.md` (APIs, auth, mocks) |
| `plan` | persiste `.bridge/plan.md` | Sequência Keel/Impeccable; `plan done` avança |
| `sync` | gap codes | Diff UI ↔ contrato ↔ BE |
| `status` | `--json` | Pulso artefatos + skills + plano |
| `doctor` | `--json` · `--fix` | Valida stamps/Status/APIs/skills |
| `ship` | — | Gate combinado vs CONTRACT |
| `handoff` | — | Só linhas copy-paste `/keel` `/impeccable` |

## CLI

| Comando | Flags | Descrição |
|---------|-------|-----------|
| `install` | `--providers=…` | Instala skill no harness |
| `status` | `--json` | Pulso |
| `doctor` | `--json` `--fix` | Validação CONTRACT/PRODUCT |
| `plan` | `write` · `status` · `done [n]` · `next` | Checklist em `.bridge/plan.md` |
| `seed` | `--in=` `--force` `--json` | OpenAPI → linhas da tabela APIs (draft) |

```bash
node cli/bin/bridge.js status --json
node cli/bin/bridge.js doctor --json
node cli/bin/bridge.js plan write --title=App --steps="/keel shape|/impeccable shape|/bridge sync"
node cli/bin/bridge.js seed --in=openapi.yaml
```

## Gap codes (`sync`)

`BE_MISSING_ROUTE` · `FE_EXTRA_CALL` · `FE_AUTH_HEADER` · `ERROR_SHAPE` · `FIELD_MISSING` · `CONTRACT_DRAFT` · `MOCK_POLICY` · `SKILL_MISSING`

## Testes

```bash
npm test
```

## License

Apache-2.0
