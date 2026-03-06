# Document-Producing Sub-skill Contract

Use this contract for sub-skills that generate or update one or more documentation files under `{scope}/docs/`.

## Required Sections

Every document-producing sub-skill should define:

- `## Responsibilities`
- `## Required Inputs`
- `## Expected Output`
- `## Rules`
- `## References`

## Intent

These sub-skills generate or update a target document or document set using repository evidence plus the selected shared template and local specialization notes.

When the orchestrator is in `update` or `reconcile` mode, follow the shared guidance in `update-reconcile-guidance.md`.

## Output Rules

Expected output should identify:

- the target path or target folder under `{scope}/docs/`
- the type of content to generate
- any conditions that affect whether a section is omitted or included

When applicable, the sub-skill should also make clear whether the target file is being newly created, partially updated, or substantially rewritten.

Artifact names should align with the shared handoff contract in `sub-skill-handoffs.md` when outputs are passed to downstream sub-skills.

## Reference Rules

Document-producing sub-skills should usually consume references in this order:

1. shared conventions in `../../references/templates/common.md`
2. the shared update/reconcile guidance in `../../references/contracts/update-reconcile-guidance.md` when applicable
3. the shared template for the target document type
4. the local specialization note for the sub-skill
5. any extra local rules files only if they materially constrain generation or update behavior

## Constraint

Document-producing sub-skills should not duplicate full template content inside their `SKILL.md`. They should define behavior, inputs, outputs, and reference order.
