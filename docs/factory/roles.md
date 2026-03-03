---
title: Roles and Ownership
description: Operating model for Bid-MVP factory
---

# Roles and Ownership

## Role Definitions

- Product Owner: owns scope, acceptance criteria, and UAT sign-off.
- Tech Lead/Architect: owns architecture decisions and risk controls.
- Delivery Engineer: owns implementation, gate completion, and queue updates.
- Release Bot (automation): owns promotion, evidence updates, smoke status ingestion.
- SRE/Platform: owns cluster health and workflow reliability.

## RACI

| Activity | Product Owner | Architect | Delivery Engineer | Release Bot | SRE |
| --- | --- | --- | --- | --- | --- |
| Gate-1 Spec | A | C | R | I | I |
| Gate-2 Architecture | C | A/R | C | I | I |
| Gate-3 Demo | A | C | R | I | I |
| Gate-4 UAT | A/R | C | R | I | I |
| Gate-5 Release | A | C | R | C | I |
| Queue Promotion (dev) | I | I | C | A/R | C |
| Smoke Validation | I | I | C | A/R | C |
| Incident + Auto Repair | I | C | C | R | A |

## Gate Reviewer Ownership

- Gate-1 Spec: Product Owner approves.
- Gate-2 Architecture: Architect approves.
- Gate-3 Demo: Product Owner + Delivery Engineer approve.
- Gate-4 UAT: Product Owner approves; SRE consulted on operational risk.
- Gate-5 Release: Delivery Engineer prepares; Product Owner final approval.

## Escalation Path

1. Gate blocker > 24h: escalate to Product Owner + Tech Lead.
2. Promotion retries exhausted: escalate to SRE with queue entry and logs.
3. Smoke failure persists after repair attempts: open incident issue and hold release.
