---
name: create-adrs
description: Generate retroactive ADRs for important technical decisions in the selected scope using evidence-aware rationale and MADR-style structure. | Genera ADRs retroactivos para decisiones técnicas importantes en el alcance seleccionado usando racionales con conciencia de evidencia y estructura tipo MADR.
license: MIT
---

# Create ADRs

## Responsibilities

- identify significant technical decisions
- reconstruct context when necessary
- explain why the decision matters
- mark uncertain rationale explicitly
- preserve valid existing ADRs and update only those contradicted or extended by current evidence

## Required Inputs

- the selected `{scope}` and its architectural or technical decision points
- repository evidence for hard-to-reverse or cross-cutting choices
- scope analysis and architecture findings to ground rationale
- ADR evidence policy and naming rules
- existing ADR files under `{scope}/docs/decisions/` when operating in `update` or `reconcile` mode

## Expected Output

Produce one or more **Document Generation Artifacts** for ADRs containing at least:

- `targetPath` values under `{scope}/docs/decisions/`
- `documentType`: `adr`
- `sourcesInspected`
- `confidenceNote` or equivalent evidence-level note when applicable
- `openQuestions` or `needsConfirmation` when applicable

Only create decisions with meaningful evidence and future value, and explicitly label reconstructed rationale when direct evidence is unavailable.

In `update` or `reconcile` mode, preserve ADRs that remain valid, revise ADRs whose context has materially changed, and avoid duplicating the same decision in a new file.

## Rules

- Only create ADRs for decisions that affect multiple parts of the system, are hard to reverse, or will likely be questioned later.
- If rationale is reconstructed, say so explicitly.
- Prefer fewer strong ADRs over many weak ones.
- Include `Sources Inspected` in every ADR.
- If an existing ADR is outdated but historically useful, update its status or context instead of silently replacing it.

## References

Use the shared document sub-skill contract in [../../references/contracts/document-subskill.md](../../references/contracts/document-subskill.md), the shared handoff contract in [../../references/contracts/sub-skill-handoffs.md](../../references/contracts/sub-skill-handoffs.md), the shared template at [../../references/templates/adr.md](../../references/templates/adr.md), the shared conventions at [../../references/templates/common.md](../../references/templates/common.md), the local specialization note in `references/local-specialization.md`, and [references/evidence-policy.md](references/evidence-policy.md).
