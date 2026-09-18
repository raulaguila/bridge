#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scripts = path.join(root, "skill/scripts");

function run(script, args, cwd) {
  return spawnSync(process.execPath, [path.join(scripts, script), ...args], {
    encoding: "utf8",
    cwd,
  });
}

function fail(m) {
  console.error("FAIL", m);
  process.exit(1);
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "bridge-smoke-"));
fs.writeFileSync(
  path.join(tmp, "PRODUCT.md"),
  `<!-- bridge:product-schema 1 -->\n# Product\n\n## Platform\nweb\n`,
);
fs.writeFileSync(
  path.join(tmp, "CONTRACT.md"),
  `# Contract
<!-- bridge:contract-schema 1 -->

## Status

draft

## Auth

Bearer

## APIs

| Method | Path | Purpose | Request | Response | Errors |
|--------|------|---------|---------|----------|--------|
| GET | \`/health\` | health | — | ok | — |

## Mocks

| Allowed without BE | Until | Owner |
|--------------------|-------|-------|
| GET /health fixture | accepted | fe |
`,
);

// doctor should warn keel/impeccable missing but contract ok-ish
{
  const r = run("doctor.js", ["--json"], tmp);
  const p = JSON.parse(r.stdout || "{}");
  if (!p.findings) fail("doctor findings");
}

// status
{
  const r = run("status.js", ["--json"], tmp);
  const p = JSON.parse(r.stdout || "{}");
  if (!p.contract || p.contract.status !== "draft") fail("status contract " + JSON.stringify(p.contract));
}

// plan write/done/next
{
  let r = run(
    "plan.js",
    ["write", "--title=Demo", "--steps=/keel shape|/impeccable shape|/bridge sync"],
    tmp,
  );
  if (r.status !== 0) fail("plan write " + r.stderr);
  r = run("plan.js", ["next"], tmp);
  if (!String(r.stdout).includes("keel shape")) fail("plan next");
  r = run("plan.js", ["done"], tmp);
  if (r.status !== 0) fail("plan done");
  r = run("plan.js", ["status", "--json"], tmp);
  const p = JSON.parse(r.stdout || "{}");
  if (p.done !== 1 || p.total !== 3) fail("plan status " + JSON.stringify(p));
}

// openapi seed
{
  fs.writeFileSync(
    path.join(tmp, "openapi.json"),
    JSON.stringify({
      openapi: "3.0.0",
      paths: {
        "/users": { get: { summary: "List users" }, post: { summary: "Create" } },
      },
    }),
  );
  const r = run("openapi-seed.js", ["--in=openapi.json", "--json"], tmp);
  if (r.status !== 0) fail("seed " + r.stderr + r.stdout);
  const body = fs.readFileSync(path.join(tmp, "CONTRACT.md"), "utf8");
  if (!body.includes("/users")) fail("seed missing /users");
}

console.log("bridge smoke ok");
