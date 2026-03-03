# Bid-MVP Factory Control Planes Plan (ljwx-docs, refreshed on 2026-03-03)

## Phase 0 Inventory

### Existing
- Docs control-plane structure is already present:
  - `docs/factory/README.md`
  - `docs/factory/dashboard.md`
  - `docs/factory/traceability.md`
  - `docs/factory/project-setup-runbook.md`
  - `docs/factory/process.md`
  - `docs/factory/roles.md`
- Templates are already present:
  - `docs/templates/spec-template.md`
  - `docs/templates/architecture-template.md`
  - `docs/templates/demo-template.md`
  - `docs/templates/uat-template.md`
  - `docs/templates/release-template.md`
  - `docs/templates/acceptance-report-template.md`
- 5 Gate PR templates already exist:
  - `.github/PULL_REQUEST_TEMPLATE/gate-1-spec.md`
  - `.github/PULL_REQUEST_TEMPLATE/gate-2-architecture.md`
  - `.github/PULL_REQUEST_TEMPLATE/gate-3-demo.md`
  - `.github/PULL_REQUEST_TEMPLATE/gate-4-uat.md`
  - `.github/PULL_REQUEST_TEMPLATE/gate-5-release.md`
- VitePress navigation already includes factory/templates entries (`docs/.vitepress/config.ts`).

### Current Gap / To Improve
- Replace placeholder evidence URL in factory docs with the final GitHub Pages URL from `ljwx-deploy`.
- Strengthen docs wording for the deployment invariant:
  - Same codebase must deploy to both:
    - local server `k3s`
    - China mainland development server `OrbStack k3s`
  - Environment difference must be handled by overlays/values/env parameters only (no code fork).
- Add explicit reviewer ownership matrix for Gate-1..Gate-5 in factory docs (if current role doc is not strict enough).

### Existing promoter/test-runner/evidence/pages status (docs repo scope)
- Promoter logic: not in this repo (expected in `ljwx-deploy`).
- Smoke/test-runner logic: not in this repo (expected in `ljwx-deploy`).
- Evidence feed hosting: not in this repo; this repo should only link to deploy repo Pages URL.

## Planned File Changes (next docs iterations)
- `docs/factory/dashboard.md` (set stable evidence feed URL + usage examples)
- `docs/factory/traceability.md` (add two-cluster same-code rule text)
- `docs/factory/roles.md` or `docs/factory/process.md` (tighten gate reviewer ownership)
- Gate templates under `.github/PULL_REQUEST_TEMPLATE/*.md` (if evidence-link checks need stricter wording)

## Local Validation Commands
- `test -f PLAN.md && sed -n '1,200p' PLAN.md`
- `rg --files docs/factory docs/templates .github/PULL_REQUEST_TEMPLATE | sort`
- `rg -n "factory|templates|dashboard|traceability" docs/.vitepress/config.ts`
- `npm run docs:build`

## Commit Plan
- `phase0(docs): refresh inventory plan`
- `phase1(docs): tighten gate docs and evidence linkage`
