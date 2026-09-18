#!/usr/bin/env node
/**
 * bridge openapi-seed — draft CONTRACT API rows from OpenAPI 3 YAML/JSON
 * Does not overwrite accepted CONTRACT without --force.
 *
 *   node openapi-seed.js [--in=openapi.yaml] [--out=CONTRACT.md] [--force] [--json]
 */
import fs from "node:fs";
import path from "node:path";
import { ROOT, read, parseContractStatus } from "./lib.mjs";

function parseArgs(argv) {
  const a = {
    inn: null,
    out: "CONTRACT.md",
    force: false,
    json: false,
    help: false,
  };
  for (const x of argv) {
    if (x.startsWith("--in=")) a.inn = x.slice(5);
    else if (x.startsWith("--out=")) a.out = x.slice(6);
    else if (x === "--force") a.force = true;
    else if (x === "--json") a.json = true;
    else if (x === "--help" || x === "-h") a.help = true;
    else if (!x.startsWith("-") && !a.inn) a.inn = x;
  }
  return a;
}

function findOpenApi(explicit) {
  if (explicit && fs.existsSync(path.join(ROOT, explicit))) return explicit;
  for (const c of [
    "openapi.yaml",
    "openapi.yml",
    "openapi.json",
    "docs/openapi.yaml",
    "swagger.yaml",
    "api/openapi.yaml",
  ]) {
    if (fs.existsSync(path.join(ROOT, c))) return c;
  }
  return null;
}

/** Minimal path extraction — no full YAML parser dependency */
function extractOps(text) {
  const ops = [];
  // JSON OpenAPI
  try {
    if (text.trim().startsWith("{")) {
      const doc = JSON.parse(text);
      for (const [p, item] of Object.entries(doc.paths || {})) {
        for (const method of Object.keys(item || {})) {
          if (!/^(get|post|put|patch|delete|head|options)$/i.test(method)) continue;
          const op = item[method];
          ops.push({
            method: method.toUpperCase(),
            path: p,
            purpose: op.summary || op.operationId || "",
          });
        }
      }
      return ops;
    }
  } catch {
    /* fall through YAML-ish */
  }

  // Naive YAML: look for paths: then "  /x:" and "    get:"
  let currentPath = null;
  for (const line of text.split(/\r?\n/)) {
    const pathM = line.match(/^\s{0,2}(\/[^\s:]+):\s*$/);
    if (pathM && !line.trim().startsWith("#")) {
      currentPath = pathM[1];
      continue;
    }
    const methM = line.match(/^\s{2,6}(get|post|put|patch|delete):\s*$/i);
    if (methM && currentPath) {
      ops.push({ method: methM[1].toUpperCase(), path: currentPath, purpose: "" });
    }
    const sumM = line.match(/^\s+summary:\s*["']?(.+?)["']?\s*$/);
    if (sumM && ops.length) {
      const last = ops[ops.length - 1];
      if (!last.purpose) last.purpose = sumM[1];
    }
  }
  return ops;
}

function apiTable(ops) {
  const rows = [
    "| Method | Path | Purpose | Request | Response | Errors |",
    "|--------|------|---------|---------|----------|--------|",
    ...ops.map(
      (o) =>
        `| ${o.method} | \`${o.path}\` | ${o.purpose || "—"} | — | — | — |`,
    ),
  ];
  return rows.join("\n");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(`bridge openapi-seed [--in=openapi.yaml] [--out=CONTRACT.md] [--force] [--json]`);
    process.exit(0);
  }

  const inn = findOpenApi(args.inn);
  if (!inn) {
    console.error("no OpenAPI file found (openapi.yaml|json)");
    process.exit(1);
  }
  const text = fs.readFileSync(path.join(ROOT, inn), "utf8");
  const ops = extractOps(text);
  if (!ops.length) {
    console.error(`no paths extracted from ${inn}`);
    process.exit(1);
  }

  const existing = read(args.out);
  const st = parseContractStatus(existing);
  if (existing && st === "accepted" && !args.force) {
    console.error("CONTRACT is accepted — pass --force to overwrite API table seed");
    process.exit(2);
  }

  const table = apiTable(ops);
  let out;
  if (existing && /##\s*APIs\b/i.test(existing)) {
    out = existing.replace(
      /##\s*APIs\b[\s\S]*?(?=\n##\s+|\n*$)/i,
      `## APIs\n\n<!-- seeded from ${inn} — review before accept -->\n\n${table}\n\n`,
    );
  } else if (existing) {
    out = `${existing.trim()}\n\n## APIs\n\n<!-- seeded from ${inn} -->\n\n${table}\n`;
  } else {
    out = `# Contract

<!-- bridge:contract-schema 1 -->

## Status

draft

## Surfaces

| Surface | Mode (BE) | Mode (FE) | Notes |
|---------|-----------|-----------|-------|
| | Serve | Operate | seeded |

## Auth

<!-- TODO -->

## APIs

<!-- seeded from ${inn} — review before accept -->

${table}

## Errors

## Mocks

| Allowed without BE | Until |
|--------------------|-------|
| | CONTRACT accepted + listed stubs |

## Non-goals

## Open questions
`;
  }

  fs.writeFileSync(path.join(ROOT, args.out), out);
  const payload = { ok: true, source: inn, operations: ops.length, out: args.out };
  if (args.json) console.log(JSON.stringify(payload, null, 2));
  else console.log(`seeded ${ops.length} ops from ${inn} → ${args.out} (Status stays draft — review)`);
  process.exit(0);
}

main();
