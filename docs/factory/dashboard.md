---
title: Evidence Dashboard
description: How to use GitHub Pages evidence feed
---

# Evidence Dashboard

## URL

- Dashboard: `https://brunogaosz.github.io/ljwx-deploy/`
- Raw feed: `https://brunogaosz.github.io/ljwx-deploy/evidence/index.json`

## What You Can See

- Latest promotion status per service/environment.
- Smoke result (`pass`/`fail`) with timestamp.
- Deploy commit and image digest used.
- Failure reasons and retry counts.

## How to Use

1. Open dashboard and filter by service/environment.
2. Verify latest record is from expected commit SHA.
3. Confirm promotion status is `promoted`.
4. Confirm smoke result is `pass`.
5. Follow record links back to PR, queue item, and deployment files in GitHub.

## Troubleshooting

- Missing record: run evidence collect workflow or execute collect script locally.
- Stale page: check `gh-pages` workflow run status and branch publish settings.
- Unexpected failure: inspect record `error` and `attempts`, then inspect promoter/smoke logs.
