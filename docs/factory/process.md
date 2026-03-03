---
title: Factory Process
description: Bid-MVP factory control flow and gate criteria
---

# Factory Process

## Control Planes

- Documentation control plane: specs, architecture, UAT and release readiness.
- Deployment control plane: queueing, digest pinning, smoke checks, repair loop.
- Evidence control plane: immutable records published to GitHub Pages.

## Deployment Invariant

- One GitOps codebase serves two dev clusters: local `k3s` and OrbStack `k3s` in China mainland.
- Only overlays/values/env parameter files can differ between clusters.
- Service logic, promotion logic, and gate policy must remain shared.

## End-to-End Flow

1. Contributor opens Gate-1 PR using `gate-1-spec.md`.
2. Contributor advances through Gate-2..Gate-5 PR templates.
3. Release candidate enters `release/queue.yaml` as `pending`.
4. Promoter validates Harbor manifest digest exists.
5. Promoter writes digest pin to `envs/dev/<service>.yaml`.
6. Promoter records action in evidence records.
7. Smoke runner validates app health/readiness and appends evidence.
8. Nightly workflow rebuilds and republishes evidence dashboard.

## Gate Exit Criteria

### Gate-1 Spec
- Problem statement, scope, non-scope, acceptance criteria are complete.
- Evidence links to baseline record and project card are present.

### Gate-2 Architecture
- Component and data-flow decisions documented.
- Risk/rollback strategy documented.
- Evidence links include architecture record.

### Gate-3 Demo
- Demo scenario scripted with expected outcomes.
- Demo artifacts linked in evidence.

### Gate-4 UAT
- UAT plan and result matrix complete.
- Blockers and waivers documented.

### Gate-5 Release
- Queue entry prepared.
- Promotion + smoke evidence links attached.
- Acceptance report linked.

## Failure Handling

- Promotion failures retry up to configured max attempts.
- After max attempts, queue state transitions to `failed` with reason.
- Auto-repair loop can apply allowed fixes and re-trigger checks.
