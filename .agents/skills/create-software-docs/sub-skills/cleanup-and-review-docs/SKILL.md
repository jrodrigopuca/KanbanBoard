---
name: cleanup-and-review-docs
description: Clean up and review generated documentation for editorial consistency, duplication, readability, placeholder removal, and final delivery quality without inventing new facts. | Limpia y revisa la documentación generada para asegurar consistencia editorial, evitar duplicaciones, mejorar legibilidad, eliminar placeholders y dejarla lista para entrega sin inventar hechos.
license: MIT
---

# Cleanup and Review Docs

Clean up and review everything generated under `{scope}/docs/`.

## Responsibilities

- remove duplication across related documents
- normalize headings, tables, and list formatting
- improve readability and concision without changing meaning
- remove leftover placeholders or clearly mark unresolved items
- standardize the use of `Inferred` and `Needs confirmation`
- align terminology across overview, architecture, API, ADRs, runbooks, and glossary
- fix minor cross-link and editorial consistency issues
- emit structured `remainingIssues` for items that survive cleanup
- keep only persistent, non-editorial issues in `knownIssueCandidates`
- respect the validation level and any deferred checks from the validation artifact

## Required Inputs

- the validated files under `{scope}/docs/`
- validation findings from `validate-generated-docs`
- the validation level used and any deferred checks
- structured `cleanupCandidates` from validation
- scope boundaries and expected output paths
- quality and editorial review checklists

## Rules

- Do not invent facts while polishing text.
- Prefer editorial cleanup over structural rewrites.
- Preserve repository-evidenced content from upstream sub-skills.
- If a section is unresolved and cannot be safely cleaned, leave it explicit rather than guessing.
- Keep the selected `{scope}` and output paths intact.
- Remove candidates that were fully resolved during cleanup, and preserve only the issues that still deserve explicit tracking.
- Resolve `cleanupCandidates` explicitly as applied, skipped, or escalated when feasible.
- Use structured `remainingIssues` instead of vague closing notes when unresolved items survive cleanup.
- Do not assume a deferred validation check was already covered; preserve that limitation in cleanup output when it affects confidence.
- In simple or downgraded workflows, prefer leaving lower-priority items as `remainingIssues` instead of escalating them into long-lived `knownIssueCandidates`.

## Expected Output

Produce a **Cleanup Artifact** containing:

- `filesReviewed`
- `cleanupCandidatesReviewed`
- `cleanupActionsTaken`
- `remainingIssues`
- `knownIssueCandidates`
- `followUpValidationNeeded`
- `status` (`clean`, `clean-with-open-issues`, or `needs-manual-review`)

## References

Use these references when reviewing:

- the shared non-document contract in [../../references/contracts/non-document-subskill.md](../../references/contracts/non-document-subskill.md)
- the shared handoff contract in [../../references/contracts/sub-skill-handoffs.md](../../references/contracts/sub-skill-handoffs.md)
- `../../references/quality-checklist.md`
- `references/cleanup-rules.md`
- `references/editorial-checklist.md`
