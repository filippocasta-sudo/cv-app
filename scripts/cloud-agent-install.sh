#!/usr/bin/env bash
set -euo pipefail

test -f README.md

if [ -f package.json ]; then
  if [ -f pnpm-lock.yaml ]; then
    corepack enable
    pnpm install --frozen-lockfile
  elif [ -f package-lock.json ]; then
    npm ci
  else
    npm install
  fi
fi

echo "cv-app environment ready"
