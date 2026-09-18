#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = path.resolve(__dirname, "../..");
const SKILL_SRC = path.join(PKG_ROOT, "skill");

const PROVIDERS = {
  cursor: ".cursor/skills/bridge",
  claude: ".claude/skills/bridge",
  agents: ".agents/skills/bridge",
  codex: ".agents/skills/bridge",
};

function cpDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, ent.name);
    const d = path.join(dest, ent.name);
    if (ent.isDirectory()) cpDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function install(args) {
  const root = process.cwd();
  let providers = [];
  for (const a of args) {
    if (a.startsWith("--providers=")) {
      providers = a.slice(12).split(",").map((s) => s.trim()).filter(Boolean);
    }
  }
  if (!providers.length) providers = ["cursor"];
  for (const p of providers) {
    const dir = PROVIDERS[p];
    if (!dir) {
      console.error("unknown provider:", p);
      process.exit(1);
    }
    cpDir(SKILL_SRC, path.join(root, dir));
    try {
      fs.chmodSync(path.join(root, dir, "scripts", "bridge"), 0o755);
    } catch { /* */ }
    console.log("installed →", dir);
  }
  console.log("Reload harness → /bridge init");
  console.log("Also install Keel + Impeccable for full orchestration.");
}

function run(script, args) {
  const r = spawnSync(process.execPath, [path.join(SKILL_SRC, "scripts", script), ...args], {
    stdio: "inherit",
    cwd: process.cwd(),
  });
  process.exit(r.status ?? 1);
}

function help() {
  console.log(`bridge — FE↔BE orchestrator (Keel + Impeccable)

Usage:
  bridge install [--providers=cursor,claude,agents]
  bridge status  [--json]
  bridge doctor  [--json] [--fix]
  bridge plan    write|status|done|next …
  bridge seed    [--in=openapi.yaml] [--force]   (openapi-seed)
  bridge help
`);
}

const [cmd, ...rest] = process.argv.slice(2);
switch (cmd) {
  case "install":
  case "update":
    install(rest);
    break;
  case "status":
    run("status.js", rest);
    break;
  case "doctor":
    run("doctor.js", rest);
    break;
  case "plan":
    run("plan.js", rest);
    break;
  case "seed":
  case "openapi-seed":
    run("openapi-seed.js", rest);
    break;
  case "help":
  case undefined:
    help();
    break;
  default:
    console.error("unknown:", cmd);
    help();
    process.exit(1);
}
