---
name: create-project-overview
description: Generate the project overview document for the selected scope, including scope, confidence note, repository structure, modules, and links to all generated documentation. | Genera el documento de visión general del proyecto para el alcance seleccionado, incluyendo alcance, nota de confianza, estructura del repositorio, módulos y enlaces a toda la documentación generada.
license: MIT
---

# Create Project Overview

## Responsibilities

- summarize what the scoped project does
- describe stack and repository structure
- list key modules and responsibilities
- act as the entry point to all generated docs
- link only to docs generated inside `{scope}/docs/`

## Required Inputs

- the selected `{scope}` and scope boundaries
- scope analysis results, including stack, modules, and confidence notes
- the list of documents actually generated under `{scope}/docs/`
- repository structure and supporting evidence inside the selected scope

## Expected Output

Produce a **Document Generation Artifact** for the project overview containing at least:

- `targetPath`: `{scope}/docs/project-overview.md`
- `documentType`: `project-overview`
- `sourcesInspected`
- `confidenceNote`
- `omittedSections` when applicable
- `openQuestions` or `needsConfirmation` when applicable

The generated document must include the overview sections defined by the shared template and link only to documentation that exists inside `{scope}/docs/`.

## Rules

- Keep it concise.
- Do not duplicate full architecture details.
- Include `Scope`, `Confidence Note`, and `Sources Inspected`.
- Use repository-relative paths that match the selected scope.
- Do not rewrite the full overview when only links, module summaries, or scope notes need refreshing.

## References

Use the shared document sub-skill contract in [../../references/contracts/document-subskill.md](../../references/contracts/document-subskill.md), the shared handoff contract in [../../references/contracts/sub-skill-handoffs.md](../../references/contracts/sub-skill-handoffs.md), the shared template at [../../references/templates/project-overview.md](../../references/templates/project-overview.md), the shared conventions at [../../references/templates/common.md](../../references/templates/common.md), and the local specialization note in `references/local-specialization.md`.
