# Bridge

Orquestrador **FE↔BE**: amarra [Keel](../keel) (backend) e [Impeccable](https://github.com/pbakaus/impeccable) (frontend).  
Dona de **contrato, sequência e monitoramento** — não substitui o craft dos dois.

## Início rápido

```bash
cd /caminho/para/bridge
node cli/bin/bridge.js install --providers=cursor
# Instale também Keel e Impeccable no mesmo projeto
```

Fluxo típico: `/bridge init` → `/bridge contract` → `/bridge plan` → handoff Keel/Impeccable → `/bridge sync` → `/bridge ship`.

## Comandos

| Comando | Args / flags | Descrição |
|---------|--------------|-----------|
| `init` | — | PRODUCT compartilhado + stub de CONTRACT |
| `contract` | — | Negocia/aceita `CONTRACT.md` (APIs, auth, erros) |
| `plan` | — | Sequência com `/keel …` e `/impeccable …` (não auto-executa) |
| `sync` | — | Diff UI ↔ contrato ↔ backend; tabela de gaps |
| `status` | — | Pulso: PRODUCT/CONTRACT/artefatos Keel·Impeccable |
| `ship` | — | Gate combinado; delega `keel ship` + `impeccable polish` |
| `handoff` | — | Lista copy-paste dos comandos Keel/Impeccable |

Bare `/bridge`: recomenda 2–3 passos — nunca auto-run.

## O que Bridge planeja vs o que não

| Planeja | Não planeja |
|---------|-------------|
| CONTRACT FE↔BE, ordem de trabalho, gaps | Topologia de serviços (Keel `shape`) |
| Quando chamar cada skill | Pixels, motion, DESIGN (Impeccable) |
| Definition of Done cruzado | Score /32 ou critique visual |

## Artefatos

- `PRODUCT.md` — compartilhado  
- `CONTRACT.md` — autoridade de integração ([template](skill/assets/templates/CONTRACT.md))  
- Keel: `ARCHITECTURE.md`, `.keel/` · Impeccable: `DESIGN.md`, `.impeccable/`

## License

Apache-2.0
