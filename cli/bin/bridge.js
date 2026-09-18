#!/usr/bin/env node
/**
 * bridge CLI — install + status/doctor/plan/seed
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import {
  PROVIDER_CATALOG,
  expandProviders,
  listProviderIds,
} from "../lib/providers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = path.resolve(__dirname, "../..");
const SKILL_SRC = path.join(PKG_ROOT, "skill");
const SKILL_NAME = "bridge";

function ensureDir(dir) {
  const abs = path.resolve(dir);
  for (let p = abs; p !== path.dirname(p); p = path.dirname(p)) {
    try {
      if (!fs.statSync(p).isDirectory()) {
        const rel = path.relative(process.cwd(), p) || p;
        throw new Error(
          `Cannot create ${path.relative(process.cwd(), abs) || abs}: ${rel} exists as a file`,
        );
      }
    } catch (e) {
      if (e.code === "ENOENT") continue;
      throw e;
    }
  }
  fs.mkdirSync(abs, { recursive: true });
}

function cpDir(src, dest) {
  ensureDir(dest);
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, ent.name);
    const d = path.join(dest, ent.name);
    if (ent.isDirectory()) cpDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function install(args) {
  const root = process.cwd();
  let raw = [];
  let listOnly = false;
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--providers=")) {
      raw.push(...args[i].slice(12).split(",").map((s) => s.trim()).filter(Boolean));
    } else if (args[i] === "--providers") {
      raw.push(...String(args[++i] || "").split(",").map((s) => s.trim()).filter(Boolean));
    } else if (args[i] === "--list-providers") listOnly = true;
    else if (args[i] === "all") raw.push("all");
  }

  if (listOnly) {
    console.log("id\tlabel\tpath\tinvoke");
    for (const id of listProviderIds()) {
      const s = PROVIDER_CATALOG[id];
      console.log(`${id}\t${s.label}\t${s.dir(SKILL_NAME)}\t${s.invoke(SKILL_NAME)}`);
    }
    return;
  }

  if (!raw.length) raw = ["cursor"];
  let providers;
  try {
    providers = expandProviders(raw);
  } catch (e) {
    console.error(String(e.message || e));
    console.error("Use: bridge install --list-providers");
    process.exit(1);
  }

  for (const id of providers) {
    const spec = PROVIDER_CATALOG[id];
    const dirs = [spec.dir(SKILL_NAME), ...((spec.extraDirs && spec.extraDirs(SKILL_NAME)) || [])];
    for (const rel of dirs) {
      const dest = path.join(root, rel);
      cpDir(SKILL_SRC, dest);
      try {
        fs.chmodSync(path.join(dest, "scripts", "bridge"), 0o755);
      } catch { /* */ }
      console.log(`installed → ${rel} (${spec.label})`);
    }
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
  bridge install [--providers=cursor,claude,…|all]
  bridge install --list-providers
  bridge status | doctor | plan | seed …
  bridge help

Providers: ${listProviderIds().join(", ")}, all
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
