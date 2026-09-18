#!/usr/bin/env node
/**
 * bridge status — pulse PRODUCT/CONTRACT/artifacts + optional keel status
 * Exit: 0 ok-ish, 2 blocking gaps, 1 error
 */
import fs from "node:fs";
import path from "node:path";
import {
  ROOT,
  exists,
  read,
  findSkill,
  parseContractStatus,
  countApiRows,
  runKeelStatus,
} from "./lib.mjs";

function parseArgs(argv) {
  const a = { json: false, help: false };
  for (const x of argv) {
    if (x === "--json") a.json = true;
    else if (x === "--help" || x === "-h") a.help = true;
  }
  return a;
}

function planPulse() {
  const p = path.join(ROOT, ".bridge", "plan.md");
  if (!fs.existsSync(p)) return null;
  const text = fs.readFileSync(p, "utf8");
  const steps = [...text.matchAll(/^\s*-\s*\[([ xX])\]\s+(.+)$/gm)].map((m) => ({
    done: m[1].toLowerCase() === "x",
    title: m[2].trim(),
  }));
  if (!steps.length) return { file: ".bridge/plan.md", steps: 0, done: 0, next: null };
  const done = steps.filter((s) => s.done).length;
  const next = steps.find((s) => !s.done)?.title || null;
  return { file: ".bridge/plan.md", steps: steps.length, done, next };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(`bridge status [--json]`);
    process.exit(0);
  }

  const keel = findSkill("keel");
  const impeccable = findSkill("impeccable");
  const contractText = read("CONTRACT.md");
  const contractStatus = parseContractStatus(contractText);
  const apiCount = countApiRows(contractText);
  const plan = planPulse();
  const keelStatus = runKeelStatus(keel);

  const gaps = [];
  if (!exists("PRODUCT.md")) gaps.push({ code: "PRODUCT_MISSING", severity: "high", summary: "PRODUCT.md missing" });
  if (!contractText) gaps.push({ code: "CONTRACT_MISSING", severity: "high", summary: "CONTRACT.md missing" });
  else if (contractStatus === "draft" || contractStatus === "unknown") {
    gaps.push({ code: "CONTRACT_DRAFT", severity: "med", summary: `CONTRACT Status: ${contractStatus}` });
  }
  if (contractText && apiCount === 0 && contractStatus === "accepted") {
    gaps.push({ code: "CONTRACT_EMPTY_APIS", severity: "med", summary: "CONTRACT accepted but APIs table empty" });
  }
  if (!keel) gaps.push({ code: "SKILL_MISSING", severity: "med", summary: "Keel skill not found in harness paths" });
  if (!impeccable) gaps.push({ code: "SKILL_MISSING", severity: "med", summary: "Impeccable skill not found in harness paths" });

  const payload = {
    ok: gaps.filter((g) => g.severity === "high").length === 0,
    product: exists("PRODUCT.md"),
    contract: contractText
      ? { status: contractStatus, apiCount, stamp: /bridge:contract-schema/.test(contractText) }
      : null,
    architecture: exists("ARCHITECTURE.md"),
    design: exists("DESIGN.md"),
    skills: {
      keel: keel ? keel.path : null,
      impeccable: impeccable ? impeccable.path : null,
    },
    plan,
    keelStatus: keelStatus
      ? {
          ship: keelStatus.ship,
          slug: keelStatus.slug,
          openIssues: keelStatus.openIssues?.length ?? null,
          latestScore: keelStatus.latest?.total_score ?? null,
        }
      : null,
    gaps,
  };

  if (args.json) {
    console.log(JSON.stringify(payload, null, 2));
  } else {
    console.log("## Bridge status");
    console.log("");
    console.log(`PRODUCT: ${payload.product ? "present" : "missing"}`);
    console.log(
      `CONTRACT: ${
        !payload.contract
          ? "missing"
          : `${payload.contract.status} · ${payload.contract.apiCount} APIs` +
            (payload.contract.stamp ? "" : " · no schema stamp")
      }`,
    );
    console.log(`ARCHITECTURE: ${payload.architecture ? "present" : "missing"}`);
    console.log(`DESIGN: ${payload.design ? "present" : "missing"}`);
    console.log(`Keel: ${payload.skills.keel || "not installed"}`);
    console.log(`Impeccable: ${payload.skills.impeccable || "not installed"}`);
    if (payload.keelStatus) {
      console.log(
        `Keel pulse: ship=${payload.keelStatus.ship} score=${payload.keelStatus.latestScore ?? "?"} open=${payload.keelStatus.openIssues ?? "?"}`,
      );
    }
    if (plan) {
      console.log(`Plan: ${plan.done}/${plan.steps} done` + (plan.next ? ` · next: ${plan.next}` : " · complete"));
    } else {
      console.log("Plan: none (.bridge/plan.md)");
    }
    if (gaps.length) {
      console.log("");
      console.log("### Gaps");
      for (const g of gaps) console.log(`- [${g.code}] ${g.summary}`);
    }
  }

  const blocking = gaps.some((g) => g.severity === "high" || g.code === "CONTRACT_DRAFT");
  process.exit(blocking ? 2 : 0);
}

main();
