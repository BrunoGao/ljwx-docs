---
title: Project Setup Runbook
description: GitHub Project setup for Bid-MVP Factory
---

# Project Setup Runbook

This runbook creates and configures GitHub Project `Bid-MVP Factory`.

## 1. Create Project

1. GitHub org/repo owner creates a Projects v2 board named `Bid-MVP Factory`.
2. Default views:
   - `Factory Board` (Status columns)
   - `Release Queue` (table grouped by service)
   - `Evidence Missing` (filter where evidence link is empty)

## 2. Recommended Fields

- `Status`: Backlog, Spec, Architecture, Demo, UAT, Release, Promoted, Failed
- `Service`: backend, frontend, quality-dashboard, ljwx-website, ljwx-bookstore, ljwx-health-*
- `Environment`: dev, staging, prod
- `Gate`: Gate-1..Gate-5
- `PR`: GitHub PR URL
- `Evidence`: GitHub Pages evidence URL
- `Release Commit`: SHA pinned by promoter
- `Smoke`: pass/fail

## 3. Branch + PR Controls

- Keep branch protection on `main`.
- Enforce gate PR template usage.
- Allow bot-driven merge for `dev` promotion path (no manual reviewer required).
- Require all gate checklist items and required links to be present.

## 4. Pages Controls

- Source branch: `gh-pages` (publish root `/`).
- Main branch remains source of truth; `gh-pages` is generated output only.
- Restrict `gh-pages` writes to automation bot account via workflow permissions + branch rules.

## 5. Repo Wiring

- Docs repository stores process, templates, gate definitions.
- Deploy repository stores queue, promoter logic, evidence records, smoke records, automation.

## 6. Operational SLO

- Queue to promoted latency target: < 30 min on dev.
- Smoke completion target: < 10 min after promotion.
- Evidence freshness target: dashboard reflects latest evidence within 24h nightly refresh.
