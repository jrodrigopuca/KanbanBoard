---
name: create-data-model-docs
description: Generate data model documentation for the selected scope using schemas, migrations, ORM models, and other persistence evidence. | Genera documentación del modelo de datos para el alcance seleccionado usando esquemas, migraciones, modelos ORM y otra evidencia de persistencia.
license: MIT
---

# Create Data Model Docs

## Responsibilities

- identify persisted entities
- document fields, constraints, and relationships
- generate an evidence-based ER diagram
- describe lifecycle when observable

## Required Inputs

- the selected `{scope}` and persistence boundaries
- schemas, migrations, ORM models, or database configuration files
- scope analysis results and entity terminology
- ERD rules that constrain what counts as persistence evidence

## Expected Output

Produce a **Document Generation Artifact** for the data model containing at least:

- `targetPath`: `{scope}/docs/data-model.md`
- `documentType`: `data-model`
- `sourcesInspected`
- `confidenceNote`
- `openQuestions` or `needsConfirmation` when applicable

The generated document must cover only persisted entities and evidenced relationships, marking unclear cardinality or lifecycle details as `Needs confirmation` when necessary.

## Rules

- Use field names and types that exist in the repository.
- Mark uncertain relationships as `Needs confirmation`.
- Do not infer persistence if only transient types are present.
- Include `Sources Inspected`.
- Remove obsolete entities or relationships when repository evidence shows they no longer exist.

## References

Use the shared document sub-skill contract in [../../references/contracts/document-subskill.md](../../references/contracts/document-subskill.md), the shared handoff contract in [../../references/contracts/sub-skill-handoffs.md](../../references/contracts/sub-skill-handoffs.md), the shared template at [../../references/templates/data-model.md](../../references/templates/data-model.md), the shared conventions at [../../references/templates/common.md](../../references/templates/common.md), [references/erd-rules.md](references/erd-rules.md), and the local specialization note in `references/local-specialization.md`.
