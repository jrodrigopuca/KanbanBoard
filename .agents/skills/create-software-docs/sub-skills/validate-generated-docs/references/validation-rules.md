# Validation Rules

## Purpose

Define the structural and evidence-based checks that validation must perform before delivery or cleanup.

## Applies To

- `validate-generated-docs`

## Rules

- output path is under `{scope}/docs/`
- `Scope` is explicit where required
- `Sources Inspected` appears in generated documents
- `Inferred` and `Needs confirmation` are used where necessary
- internal document links resolve
- names and modules are consistent across docs
- Mermaid diagrams align with the narrative and selected scope
- placeholder sections that remain unsupported are removed
- emit structured `filesChecked` with checked path, checks applied, per-file status, and notes when relevant
- emit structured `issuesFound` with category, severity, affected scope, evidence, and recommended disposition
- emit structured `brokenLinks` with source path, failing target, failure type, severity, and suggested fix
- emit structured `missingEvidenceNotes` with affected path or section, missing evidence type, severity, and suggested action
- emit structured `speculativeSections` with section identity, reason, severity, and suggested disposition
- use structured `cleanupCandidates` for editorial, consistency, structure, naming, and link issues that cleanup can safely address
- use `knownIssueCandidates` only for persistent issues that should remain visible after cleanup or require future review
- keep transient editorial or formatting issues out of `knownIssueCandidates`

## Usage Notes

- report cleanup candidates separately from hard validation failures when possible
- keep `issuesFound`, `cleanupCandidates`, and `knownIssueCandidates` aligned so the same underlying issue is not duplicated inconsistently
- keep `brokenLinks`, `missingEvidenceNotes`, and `speculativeSections` specific enough that downstream cleanup or re-validation can verify closure deterministically
- keep `sourcesInspected` and per-finding evidence references consistent with the shared evidence reference shape
