#!/usr/bin/env bash
# Install Bridge into the current project from GitHub (no local clone needed).
# Usage (from your project root):
#   curl -fsSL https://raw.githubusercontent.com/raulaguila/bridge/master/install.sh | bash -s -- --providers=cursor
#   curl -fsSL …/install.sh | bash -s -- --providers=cursor,cline
set -euo pipefail

if ! command -v node >/dev/null 2>&1; then
  echo "bridge install: node is required (v20+)" >&2
  exit 1
fi
if ! command -v curl >/dev/null 2>&1; then
  echo "bridge install: curl is required" >&2
  exit 1
fi
if ! command -v tar >/dev/null 2>&1; then
  echo "bridge install: tar is required" >&2
  exit 1
fi

REPO="${BRIDGE_REPO:-raulaguila/bridge}"
REF="${BRIDGE_REF:-master}"
PROJECT_ROOT="${BRIDGE_PROJECT:-$PWD}"

TMP="$(mktemp -d "${TMPDIR:-/tmp}/bridge-install.XXXXXX")"
cleanup() { rm -rf "$TMP"; }
trap cleanup EXIT

ARCHIVE_URL="https://github.com/${REPO}/archive/refs/heads/${REF}.tar.gz"
if [[ "$REF" == v* ]] || [[ "$REF" =~ ^[0-9] ]]; then
  ARCHIVE_URL="https://github.com/${REPO}/archive/refs/tags/${REF}.tar.gz"
fi

echo "Fetching ${REPO}@${REF}…"
curl -fsSL "$ARCHIVE_URL" | tar -xz -C "$TMP"
shopt -s nullglob
dirs=("$TMP"/*)
SRC="${dirs[0]:-}"
if [[ -z "$SRC" || ! -d "$SRC" || ! -f "$SRC/cli/bin/bridge.js" ]]; then
  echo "bridge install: unexpected archive layout" >&2
  exit 1
fi

cd "$PROJECT_ROOT"
node "$SRC/cli/bin/bridge.js" install "$@"
