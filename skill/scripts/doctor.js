#!/usr/bin/env node
/**
 * bridge doctor — CONTRACT/PRODUCT schema + skill presence
 * Exit: 0 clean, 2 findings, 1 error
 * --json --fix (stamps only)
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
} from "./lib.mjs";

function parseArgs(argv) {
  const a = { json: false, fix: false, help: false };
  for (const x of argv) {
    if (x === "--json") a.json = true;
    else if (x === "--fix") a.fix = true;
    else if (x === "--help" || x === "-h") a.help = true;
  }
  return a;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(`bridge doctor [--json] [--fix]`);
    process.exit(0);
  }

  /** @type {{ id: string, severity: string, status: string, summary: string, fix?: string, auto?: boolean }[]} */
  const findings = [];

  const product = read("PRODUCT.md");
  const contract = read("CONTRACT.md");

  if (!product) {
    findings.push({
      id: "missing-product",
      severity: "high",
      status: "fail",
      summary: "PRODUCT.md missing",
      fix: "/bridge init",
    });
  } else if (!/bridge:product-schema|keel:product-schema|impeccable:product-schema/.test(product)) {
    findings.push({
      id: "product-stamp",
      severity: "med",
      status: "warn",
      summary: "PRODUCT.md missing schema stamp",
      fix: "add <!-- bridge:product-schema 1 --> (+ keel + impeccable stamps)",
      auto: true,
    });
  }

  if (!contract) {
    findings.push({
      id: "missing-contract",
      severity: "high",
      status: "fail",
      summary: "CONTRACT.md missing",
      fix: "/bridge contract",
    });
  } else {
    if (!/bridge:contract-schema/.test(contract)) {
      findings.push({
        id: "contract-stamp",
        severity: "med",
        status: "warn",
        summary: "CONTRACT.md missing bridge:contract-schema stamp",
        fix: "add <!-- bridge:contract-schema 1 -->",
        auto: true,
      });
    }
    const st = parseContractStatus(contract);
    if (!["draft", "accepted", "superseded"].includes(st)) {
      findings.push({
        id: "contract-status-invalid",
        severity: "med",
        status: "warn",
        summary: `CONTRACT Status not draft|accepted|superseded (got: ${st})`,
        fix: "set ## Status to draft or accepted",
      });
    }
    if (st === "accepted" && countApiRows(contract) === 0) {
      findings.push({
        id: "contract-accepted-empty",
        severity: "high",
        status: "fail",
        summary: "CONTRACT accepted with empty APIs table",
        fix: "/bridge contract — add endpoints or revert to draft",
      });
    }
    if (!/##\s*Auth\b/i.test(contract)) {
      findings.push({
        id: "contract-auth-section",
        severity: "med",
        status: "warn",
        summary: "CONTRACT missing ## Auth section",
      });
    }
    if (!/##\s*Mocks\b/i.test(contract)) {
      findings.push({
        id: "contract-mocks-section",
        severity: "low",
        status: "warn",
        summary: "CONTRACT missing ## Mocks policy (FE parallel build rules)",
        fix: "add Mocks section — see template",
      });
    }
  }

  if (!findSkill("keel")) {
    findings.push({
      id: "keel-missing",
      severity: "med",
      status: "warn",
      summary: "Keel skill not installed in this project",
      fix: "install Keel skill (keel install)",
    });
  }
  if (!findSkill("impeccable")) {
    findings.push({
      id: "impeccable-missing",
      severity: "med",
      status: "warn",
      summary: "Impeccable skill not installed in this project",
      fix: "install Impeccable skill",
    });
  }

  if (args.fix) {
    for (const f of findings.filter((x) => x.auto)) {
      if (f.id === "product-stamp" && product) {
        let next = product;
        if (!/bridge:product-schema/.test(next)) {
          next = `<!-- bridge:product-schema 1 -->\n${next}`;
        }
        if (!/keel:product-schema/.test(next)) {
          next = next.replace(
            /<!-- bridge:product-schema 1 -->/,
            "<!-- bridge:product-schema 1 -->\n<!-- keel:product-schema 1 -->",
          );
          if (!/keel:product-schema/.test(next)) next = `<!-- keel:product-schema 1 -->\n${next}`;
        }
        if (!/impeccable:product-schema/.test(next)) {
          next = next.replace(
            /<!-- keel:product-schema 1 -->/,
            "<!-- keel:product-schema 1 -->\n<!-- impeccable:product-schema 1 -->",
          );
          if (!/impeccable:product-schema/.test(next)) {
            next = `<!-- impeccable:product-schema 1 -->\n${next}`;
          }
        }
        if (next !== product) fs.writeFileSync(path.join(ROOT, "PRODUCT.md"), next);
        f.status = "fixed";
      }
      if (f.id === "contract-stamp" && contract) {
        if (!/bridge:contract-schema/.test(contract)) {
          fs.writeFileSync(path.join(ROOT, "CONTRACT.md"), `<!-- bridge:contract-schema 1 -->\n${contract}`);
        }
        f.status = "fixed";
      }
    }
  }

  const open = findings.filter((f) => f.status === "fail" || f.status === "warn");

  if (args.json) {
    console.log(JSON.stringify({ ok: open.length === 0, findings }, null, 2));
  } else {
    console.log("id\tstatus\tsummary\tfix");
    for (const f of findings) {
      console.log(`${f.id}\t${f.status}\t${f.summary}\t${f.fix || ""}`);
    }
    console.log(`bridge doctor: ${open.length} open`);
  }

  process.exit(open.length ? 2 : 0);
}

main();
