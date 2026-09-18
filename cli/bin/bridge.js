#!/usr/bin/env node
/**
 * bridge CLI — install skill into harness providers
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
    console.log("installed →", dir);
  }
  console.log("Reload harness, then /bridge init");
  console.log("Requires Keel + Impeccable installed separately for full orchestration.");
}

function help() {
  console.log(`bridge — FE↔BE orchestrator for Keel + Impeccable

Usage:
  bridge install [--providers=cursor,claude,agents]
  bridge help
`);
}

const [cmd, ...rest] = process.argv.slice(2);
if (cmd === "install" || cmd === "update") install(rest);
else help();
