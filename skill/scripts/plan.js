#!/usr/bin/env node
/**
 * bridge plan — write / show / advance persisted plan in .bridge/plan.md
 *
 *   node plan.js write --title="…" --steps="keel shape|impeccable shape|bridge sync"
 *   node plan.js status [--json]
 *   node plan.js done [n]     # mark step n (1-based) or first open
 *   node plan.js next [--json]
 */
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./lib.mjs";

const PLAN = path.join(ROOT, ".bridge", "plan.md");

function ensureDir() {
  fs.mkdirSync(path.dirname(PLAN), { recursive: true });
}

function parsePlan(text) {
  const steps = [...text.matchAll(/^\s*-\s*\[([ xX])\]\s+(.+)$/gm)].map((m, i) => ({
    n: i + 1,
    done: m[1].toLowerCase() === "x",
    title: m[2].trim(),
  }));
  return steps;
}

function render(title, steps) {
  const lines = [
    `# Bridge plan — ${title}`,
    "",
    `<!-- bridge:plan-schema 1 -->`,
    `<!-- Updated: ${new Date().toISOString()} -->`,
    "",
    "## Checklist",
    "",
    ...steps.map((s) => `- [${s.done ? "x" : " "}] ${s.title}`),
    "",
  ];
  return lines.join("\n");
}

function load() {
  if (!fs.existsSync(PLAN)) return null;
  const text = fs.readFileSync(PLAN, "utf8");
  const title =
    (text.match(/^#\s*Bridge plan\s*[—-]\s*(.+)$/m) || [])[1]?.trim() || "untitled";
  return { title, steps: parsePlan(text), text };
}

function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  if (!cmd || cmd === "help" || cmd === "-h") {
    console.log(`bridge plan write|status|done|next

  write --title=NAME --steps="a|b|c"
  status [--json]
  done [n]
  next [--json]
`);
    process.exit(0);
  }

  if (cmd === "write") {
    let title = "untitled";
    let stepsRaw = "";
    for (let i = 0; i < rest.length; i++) {
      if (rest[i].startsWith("--title=")) title = rest[i].slice(8);
      else if (rest[i] === "--title") title = rest[++i];
      else if (rest[i].startsWith("--steps=")) stepsRaw = rest[i].slice(8);
      else if (rest[i] === "--steps") stepsRaw = rest[++i];
    }
    const titles = stepsRaw
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!titles.length) {
      console.error("need --steps='step1|step2|…'");
      process.exit(1);
    }
    ensureDir();
    const steps = titles.map((t) => ({ done: false, title: t }));
    fs.writeFileSync(PLAN, render(title, steps));
    console.log(`wrote ${path.relative(ROOT, PLAN)} (${steps.length} steps)`);
    process.exit(0);
  }

  const plan = load();
  if (!plan) {
    if (rest.includes("--json") || process.argv.includes("--json")) {
      console.log(JSON.stringify({ ok: false, error: "no plan" }));
    } else {
      console.error("no .bridge/plan.md — run: bridge plan write … or /bridge plan");
    }
    process.exit(2);
  }

  if (cmd === "status") {
    const done = plan.steps.filter((s) => s.done).length;
    const next = plan.steps.find((s) => !s.done) || null;
    const payload = {
      ok: true,
      title: plan.title,
      done,
      total: plan.steps.length,
      next: next ? { n: next.n, title: next.title } : null,
      steps: plan.steps,
    };
    if (rest.includes("--json") || process.argv.includes("--json")) {
      console.log(JSON.stringify(payload, null, 2));
    } else {
      console.log(`Plan: ${plan.title} — ${done}/${plan.steps.length}`);
      for (const s of plan.steps) {
        console.log(`  ${s.n}. [${s.done ? "x" : " "}] ${s.title}`);
      }
      if (next) console.log(`Next: (${next.n}) ${next.title}`);
      else console.log("Next: complete");
    }
    process.exit(done === plan.steps.length ? 0 : 2);
  }

  if (cmd === "next") {
    const next = plan.steps.find((s) => !s.done);
    if (rest.includes("--json") || process.argv.includes("--json")) {
      console.log(JSON.stringify({ next: next ? { n: next.n, title: next.title } : null }));
    } else if (next) {
      console.log(`${next.n}. ${next.title}`);
    } else {
      console.log("complete");
    }
    process.exit(next ? 2 : 0);
  }

  if (cmd === "done") {
    const n = Number(rest[0]) || plan.steps.find((s) => !s.done)?.n;
    if (!n) {
      console.error("nothing to mark");
      process.exit(1);
    }
    const steps = plan.steps.map((s) => (s.n === n ? { ...s, done: true } : s));
    fs.writeFileSync(PLAN, render(plan.title, steps));
    console.log(`marked done: ${n}. ${steps.find((s) => s.n === n)?.title}`);
    process.exit(0);
  }

  console.error("unknown:", cmd);
  process.exit(1);
}

main();
