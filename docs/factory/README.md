---
title: Bid-MVP Factory Operator Quickstart
description: End-to-end quickstart for Bid-MVP factory control planes
---

# Bid-MVP Factory Operator Quickstart

This quickstart is the operator entry point for running the Bid-MVP factory.

## Non-negotiables

- GitHub is the only source of truth for specs, queue state, and evidence.
- Evidence feed is published on GitHub Pages from `gh-pages` branch.
- `dev` environment supports auto-promote without manual reviewers.
- CI and promotion must not rely on Harbor replication timing.

## Stable URLs

- Evidence dashboard: `https://brunogaosz.github.io/ljwx-deploy/`
- Evidence JSON feed: `https://brunogaosz.github.io/ljwx-deploy/evidence/index.json`

## Daily Flow

1. Add/update card in GitHub Project `Bid-MVP Factory`.
2. Drive work through Gate-1 to Gate-5 PR templates.
3. Merge to `main` after gate checklist and evidence links are complete.
4. Queue release in `ljwx-deploy/release/queue.yaml`.
5. Let promoter pin image digest in `envs/dev/<service>.yaml`.
6. Confirm smoke result in dashboard and close the project card.

## Gate Sequence

1. Gate-1 Spec
2. Gate-2 Architecture
3. Gate-3 Demo
4. Gate-4 UAT
5. Gate-5 Release

Gate PR templates are in `.github/PULL_REQUEST_TEMPLATE/` and require evidence links.

## Minimal Operator Commands

```bash
# Validate evidence model in deploy repo
python3 scripts/evidence/validate.py

# Generate evidence index locally
python3 scripts/evidence/collect.py --out evidence/index.json

# Dry-run promoter
python3 scripts/promoter/deploy_promoter.py --dry-run

# Dry-run smoke
python3 scripts/smoke/run_smoke.py --dry-run
```

## References

- [Project Setup Runbook](./project-setup-runbook)
- [Factory Process](./process)
- [Roles and Ownership](./roles)
- [Dashboard Usage](./dashboard)
- [Traceability Chain](./traceability)
- [Templates Library](/templates/)
