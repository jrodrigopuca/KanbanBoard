---
name: create-glossary
description: Generate a glossary for the selected scope using domain terms, acronyms, and internal vocabulary evidenced by the codebase and docs. | Genera un glosario para el alcance seleccionado usando términos de dominio, acrónimos y vocabulario interno evidenciado por el código y la documentación.
license: MIT
---

# Create Glossary

## Responsibilities

- identify domain-specific terms
- expand acronyms and internal naming
- define terms concisely and consistently

## Required Inputs

- the selected `{scope}` and domain terminology visible in code or docs
- model names, business logic, acronyms, and internal vocabulary from the repository
- terminology already used in overview, architecture, API, and ADR documents

## Expected Output

Produce a **Document Generation Artifact** for the glossary containing at least:

- `targetPath`: `{scope}/docs/glossary.md`
- `documentType`: `glossary`
- `sourcesInspected`
- `openQuestions` or `needsConfirmation` when applicable

The generated document must include only evidenced domain or internal terms and keep definitions short, consistent, and non-circular.

## Rules

- Include only terms evidenced by the selected scope.
- Prefer business-meaningful definitions over implementation jargon.
- Avoid circular definitions.
- Include `Sources Inspected`.
- Remove stale terms that are no longer evidenced by the selected scope.

## References

Use the shared document sub-skill contract in [../../references/contracts/document-subskill.md](../../references/contracts/document-subskill.md), the shared handoff contract in [../../references/contracts/sub-skill-handoffs.md](../../references/contracts/sub-skill-handoffs.md), the shared template at [../../references/templates/glossary.md](../../references/templates/glossary.md), the shared conventions at [../../references/templates/common.md](../../references/templates/common.md), and the local specialization note in `references/local-specialization.md`.
