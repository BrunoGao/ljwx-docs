# Bid-MVP Factory Control Planes Implementation Plan (ljwx-docs)

## Phase 0 Inventory

### Existing
- VitePress docs site exists under `docs/` with configurable nav/sidebar (`docs/.vitepress/config.ts`).
- No `docs/factory/` section yet.
- No public process templates under `docs/templates/` (only internal `docs/.templates/`).
- No PR gate templates under `.github/PULL_REQUEST_TEMPLATE/`.
- No operator quickstart dedicated to Bid-MVP factory controls.

### Missing (to add)
- Factory docs pages:
  - `docs/factory/README.md`
  - `docs/factory/dashboard.md`
  - `docs/factory/traceability.md`
  - `docs/factory/project-setup-runbook.md`
  - `docs/factory/process.md`
  - `docs/factory/roles.md`
- Templates:
  - `docs/templates/spec-template.md`
  - `docs/templates/architecture-template.md`
  - `docs/templates/demo-template.md`
  - `docs/templates/uat-template.md`
  - `docs/templates/release-template.md`
  - `docs/templates/acceptance-report-template.md`
- PR gate templates:
  - `.github/PULL_REQUEST_TEMPLATE/gate-1-spec.md`
  - `.github/PULL_REQUEST_TEMPLATE/gate-2-architecture.md`
  - `.github/PULL_REQUEST_TEMPLATE/gate-3-demo.md`
  - `.github/PULL_REQUEST_TEMPLATE/gate-4-uat.md`
  - `.github/PULL_REQUEST_TEMPLATE/gate-5-release.md`
- VitePress nav/sidebar updates in `docs/.vitepress/config.ts`.

### Existing promoter/test-runner/evidence/pages status
- Promoter: not present in this repo.
- Test-runner: not present in this repo.
- Evidence feed pages: not present in this repo (dashboard docs will link to deploy repo Pages URL).

## Phase 1 Scope (Docs Control Plane)
- Implement all factory docs and templates.
- Add strict gate checklists and required evidence links to PR templates.
- Add dashboard and traceability docs with end-to-end evidence-chain guidance.
- Add operator quickstart at `docs/factory/README.md`.

## Phase-by-Phase Verification Commands (docs repo)
- Phase 0:
  - `test -f PLAN.md && sed -n '1,80p' PLAN.md`
- Phase 1:
  - `rg --files docs/factory docs/templates .github/PULL_REQUEST_TEMPLATE`
  - `rg -n "factory|templates|dashboard|traceability" docs/.vitepress/config.ts`
  - `npm run docs:build`

## Commit Plan (docs repo)
- `phase0(docs): inventory + PLAN.md`
- `phase1(docs): factory docs + templates + gate PR templates + nav`
