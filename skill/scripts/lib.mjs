#!/usr/bin/env node
/**
 * bridge lib — shared helpers for status/doctor/plan/openapi-seed
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

export const ROOT = process.cwd();

export function exists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}

export function read(rel) {
  try {
    return fs.readFileSync(path.join(ROOT, rel), "utf8");
  } catch {
    return null;
  }
}

/** Find installed skill dir by name (keel | impeccable | bridge) */
export function findSkill(name) {
  const candidates = [
    `.cursor/skills/${name}`,
    `.claude/skills/${name}`,
    `.agents/skills/${name}`,
    `skill`, // when cwd is the skill package itself and name matches package
  ];
  for (const c of candidates) {
    const skillMd = path.join(ROOT, c, "SKILL.md");
    if (!fs.existsSync(skillMd)) continue;
    const text = fs.readFileSync(skillMd, "utf8");
    if (new RegExp(`name:\\s*${name}\\b`).test(text) || c.endsWith(`/${name}`)) {
      return { path: c, scripts: path.join(ROOT, c, "scripts") };
    }
  }
  // sibling packages (monorepo /agent/keel)
  const sibling = path.resolve(ROOT, "..", name);
  if (fs.existsSync(path.join(sibling, "skill", "SKILL.md"))) {
    return { path: path.relative(ROOT, path.join(sibling, "skill")) || path.join(sibling, "skill"), scripts: path.join(sibling, "skill", "scripts") };
  }
  return null;
}

export function parseContractStatus(text) {
  if (!text) return null;
  const m = text.match(/##\s*Status\s*\n+<!--[^>]*-->\s*\n*([^\n]+)/i) || text.match(/##\s*Status\s*\n+([^\n]+)/i);
  if (!m) return "unknown";
  const v = m[1].replace(/<!--.*?-->/g, "").trim().toLowerCase();
  if (/accepted/.test(v)) return "accepted";
  if (/superseded/.test(v)) return "superseded";
  if (/draft/.test(v)) return "draft";
  return v.slice(0, 40) || "unknown";
}

export function countApiRows(text) {
  if (!text) return 0;
  const idx = text.search(/##\s*APIs\b/i);
  if (idx < 0) return 0;
  const slice = text.slice(idx).split(/\n##\s+/)[0];
  let n = 0;
  for (const line of slice.split("\n")) {
    if (!/^\|/.test(line)) continue;
    if (/^\|\s*-+/.test(line) || /\bMethod\b/i.test(line)) continue;
    const cells = line.split("|").map((c) => c.trim()).filter(Boolean);
    if (cells.length >= 2 && cells[0] && cells[1]) n++;
  }
  return n;
}

export function runKeelStatus(keel) {
  if (!keel?.scripts) return null;
  const script = path.join(keel.scripts, "status.js");
  if (!fs.existsSync(script)) return null;
  const r = spawnSync(process.execPath, [script, "--json"], { encoding: "utf8", cwd: ROOT });
  try {
    return JSON.parse(r.stdout || "{}");
  } catch {
    return { ok: false, error: "parse failed", exit: r.status };
  }
}

export const GAP_CODES = {
  BE_MISSING_ROUTE: "Backend missing route required by CONTRACT/UI",
  FE_EXTRA_CALL: "Frontend calls path not in CONTRACT",
  FE_AUTH_HEADER: "Auth header/scheme mismatch vs CONTRACT",
  ERROR_SHAPE: "Error envelope mismatch",
  FIELD_MISSING: "Required response/request field missing",
  CONTRACT_DRAFT: "CONTRACT not accepted",
  MOCK_POLICY: "FE advancing without mocks policy",
  SKILL_MISSING: "Keel or Impeccable skill not installed",
};
