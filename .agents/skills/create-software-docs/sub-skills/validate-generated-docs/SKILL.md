---
name: validate-generated-docs
description: Validate generated documentation for scope correctness, evidence markings, links, document consistency, and structural completeness. | Valida la documentación generada en cuanto a corrección del alcance, marcados de evidencia, enlaces, consistencia documental e integridad estructural.
license: MIT
---

# Validate Generated Docs

Validate everything generated under `{scope}/docs/` before final editorial cleanup, and optionally again after cleanup if substantial edits were made.

## Responsibilities

- apply the requested validation level: `minimal`, `standard`, or `full`
- verify files are inside the selected scope
- check cross-links and README links
- ensure evidence and confidence labeling are present
- detect empty or speculative sections
- review Mermaid consistency and document coherence
- emit structured `filesChecked` entries for per-file validation coverage
- emit structured `issuesFound` for meaningful validation findings
- report issues that should be fixed by cleanup and review without inventing new content
- emit structured `brokenLinks`, `missingEvidenceNotes`, and `speculativeSections`
- emit structured `cleanupCandidates` for issues cleanup can safely address
- identify only persistent, track-worthy findings as `knownIssueCandidates`
- record any deferred checks when validation is intentionally lighter than full coverage

## Required Inputs

- the generated files under `{scope}/docs/`
- the selected `{scope}` and expected docs boundaries
- the requested validation level: `minimal`, `standard`, or `full`
- cross-links between generated docs and the scope README
- evidence markers such as `Sources inspected`, `Inferred`, and `Needs confirmation`

## Expected Output

Produce a **Validation Artifact** containing:

- `validationLevel`
- `filesChecked` as structured file check entries
- `issuesFound`
- `brokenLinks`
- `missingEvidenceNotes`
- `speculativeSections`
- `cleanupCandidates`
- `knownIssueCandidates`
- `deferredChecks` when applicable
- `status` (`pass`, `pass-with-findings`, or `fail`)

## Rules

- Prefer minimal corrections over broad rewrites.
- Preserve specialized content from upstream sub-skills.
- Report unresolved issues explicitly.
- Use the final checklist before completion.
- Do not absorb editorial cleanup responsibilities that belong to `cleanup-and-review-docs`.
- Use structured `filesChecked` entries so downstream review can see which checks were applied per file.
- Use structured `issuesFound` instead of free-form lists for meaningful validation findings.
- Use structured `brokenLinks`, `missingEvidenceNotes`, and `speculativeSections` instead of ambiguous summaries.
- Use structured `cleanupCandidates` instead of vague prose when the issue is expected to be handled during cleanup.
- Do not promote every finding into `knownIssueCandidates`; use that field only for evidence-backed issues that should remain visible after the current pass.
- In `minimal` validation or `simple` scopes, emit `knownIssueCandidates` only for the small set of persistent issues that materially affect understanding, operation, maintenance, or future review.
- Do not claim full coverage when running `minimal` or `standard`; record deeper checks as `deferredChecks` when they were intentionally skipped.
- Apply validation levels like this:
  - `minimal` — check scope, output paths, evidence labels, obvious link failures, obvious speculative sections, and core navigation
  - `standard` — default; include `minimal` plus applicable document-specific checks and cross-document consistency review
  - `full` — include `standard` plus exhaustive link review, preserved-content verification for `update` or `reconcile`, and stricter diagram and runbook scrutiny
- When a final validation pass follows cleanup, use the level requested by the orchestrator instead of automatically repeating the heaviest possible review.

## References

Use the shared non-document contract in [../../references/contracts/non-document-subskill.md](../../references/contracts/non-document-subskill.md), the shared handoff contract in [../../references/contracts/sub-skill-handoffs.md](../../references/contracts/sub-skill-handoffs.md), and the local references [references/validation-rules.md](references/validation-rules.md) and [references/output-checklist.md](references/output-checklist.md).
