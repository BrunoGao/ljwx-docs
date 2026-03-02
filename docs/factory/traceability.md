---
title: Traceability Chain
description: End-to-end evidence chain from requirement to production proof
---

# Traceability Chain

This chain guarantees every promotion can be traced from requirement to verification.

## Required Links in Chain

1. GitHub Project item (`Bid-MVP Factory`) with service and gate status.
2. Gate PRs (Gate-1..Gate-5) with template checklist completion.
3. Release queue item in `release/queue.yaml`.
4. Promoter mutation commit that pins digest in `envs/dev/<service>.yaml`.
5. Evidence record in `evidence/records/*.json` containing commit, digest, env, and timestamps.
6. Smoke result attached to the same evidence identity.
7. Published entry in `evidence/index.json` on GitHub Pages.

## Traceability Keys

- `service`
- `environment`
- `queue_id`
- `promotion_id`
- `deploy_commit`
- `image_digest`
- `smoke_status`
- `evidence_record_path`

## Integrity Rules

- All records are stored in Git and versioned.
- Evidence feed is generated from repository files only.
- No external mutable database is required.
- Dashboard entries must link back to raw GitHub artifacts.
