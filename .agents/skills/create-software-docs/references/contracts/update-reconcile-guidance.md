# Update and Reconcile Guidance

## Purpose

Define the shared rules for refreshing existing documentation without regenerating everything unnecessarily.

## Applies To

- the orchestrator
- document-producing sub-skills
- validation and cleanup sub-skills when existing docs are already present

## Modes

- `generate` — create missing documentation from repository evidence
- `update` — preserve still-valid docs and refresh only impacted files or sections
- `reconcile` — repair drift, inconsistency, or partial staleness across existing docs

## Rules

- Treat existing files under `{scope}/docs/` as inputs when operating in `update` or `reconcile` mode.
- Preserve still-valid content whenever it remains accurate, evidenced, and consistent with the selected scope.
- Prefer section-level or file-level updates over full regeneration.
- Rewrite a full document only when partial changes would leave it misleading, contradictory, or harder to maintain.
- Remove, replace, or explicitly mark stale content when repository evidence no longer supports it.
- Keep links, terminology, and evidence notes aligned with the refreshed documentation set.

## Constraints

- Do not preserve stale content only to avoid edits.
- Do not silently keep contradicted sections when new repository evidence invalidates them.
- Do not rewrite the full docs tree when only a small subset changed.

## Usage Notes

- Use `update` when the current docs are mostly healthy and only need targeted refreshes.
- Use `reconcile` when the current docs show drift, mixed quality, or uneven maintenance.
- Preserve stable identifiers when the document type depends on continuity, such as ADRs or known issues.
