---
name: create-runbooks
description: Generate operational and troubleshooting runbooks for the selected scope using repository-evidenced procedures, verification steps, rollback instructions, and escalation notes. | Genera runbooks operacionales y de troubleshooting para el alcance seleccionado usando procedimientos evidenciados por el repositorio, pasos de verificación, rollback y escalación.
license: MIT
---

# Create Runbooks

## Responsibilities

- identify operational and troubleshooting scenarios
- document exact evidenced procedures
- include verification, rollback, and escalation
- warn before destructive operations
- preserve still-valid procedures when updating existing runbooks

## Required Inputs

- the selected `{scope}` and operational boundaries
- deployment, migration, CI/CD, worker, queue, or task-runner evidence
- commands and procedures that can be grounded in repository artifacts
- validation or architecture findings that identify operational scenarios
- existing runbooks under `{scope}/docs/runbooks/` when operating in `update` or `reconcile` mode

## Expected Output

Produce one or more **Document Generation Artifacts** for runbooks containing at least:

- `targetPath` values under `{scope}/docs/runbooks/`
- `documentType`: `runbook-operational` or `runbook-troubleshooting`
- `sourcesInspected`
- `confidenceNote` when applicable
- `openQuestions` or `needsConfirmation` when applicable

Choose operational and troubleshooting templates according to scenario type, and include only steps and commands that are evidenced or clearly marked as needing confirmation.

In `update` or `reconcile` mode, preserve valid procedures and update only the scenarios, commands, checks, or rollback paths affected by new evidence.

## Rules

- One action per step.
- Prefer commands from scripts, CI/CD, task runners, and deployment config.
- If a command or sequence cannot be verified, mark it `Needs confirmation`.
- Include `Sources Inspected` in every runbook.
- Remove or revise stale operational steps promptly when repository evidence no longer supports them.

## References

Use the shared document sub-skill contract in [../../references/contracts/document-subskill.md](../../references/contracts/document-subskill.md), the shared handoff contract in [../../references/contracts/sub-skill-handoffs.md](../../references/contracts/sub-skill-handoffs.md), the shared templates at [../../references/templates/runbook-operational.md](../../references/templates/runbook-operational.md) and [../../references/templates/runbook-troubleshooting.md](../../references/templates/runbook-troubleshooting.md), the shared conventions at [../../references/templates/common.md](../../references/templates/common.md), and the local specialization notes in `references/operational-specialization.md` and `references/troubleshooting-specialization.md`.
