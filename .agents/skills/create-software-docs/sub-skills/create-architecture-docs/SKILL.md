---
name: create-architecture-docs
description: Generate architecture documentation for the selected scope, including architecture style, evidence-based Mermaid diagrams, module descriptions, cross-cutting concerns, and constraints. | Genera documentación de arquitectura para el alcance seleccionado, incluyendo estilo arquitectónico, diagramas Mermaid basados en evidencia, descripción de módulos, concerns transversales y restricciones.
license: MIT
---

# Create Architecture Docs

## Responsibilities

- classify the architecture style
- choose diagrams according to observed complexity
- document modules, dependencies, and cross-cutting concerns
- include security and operational notes when evidenced
- omit unsupported sections rather than speculate

## Required Inputs

- the selected `{scope}` and complexity classification
- architecture-relevant evidence: modules, entry points, integrations, infra signals, and existing docs
- scope analysis results and terminology to keep consistent across docs
- Mermaid guidance and any scoped diagram constraints

## Expected Output

Produce a **Document Generation Artifact** for architecture containing at least:

- `targetPath`: `{scope}/docs/architecture.md`
- `documentType`: `architecture`
- `sourcesInspected`
- `confidenceNote`
- `omittedSections` for unsupported optional sections
- `openQuestions` or `needsConfirmation` when applicable

The generated document must include required sections from the shared architecture template and use only diagrams supported by repository evidence.

## Rules

- Always include a component diagram and at least one critical sequence when evidence supports them.
- For simple projects, omit context, container, and deployment sections unless clearly supported.
- Keep naming aligned with actual modules, services, and integrations.
- Include `Scope`, `Confidence Note`, and `Sources Inspected`.
- Replace outdated diagrams or section fragments instead of regenerating the full document when partial updates are sufficient.

## References

Use the shared document sub-skill contract in [../../references/contracts/document-subskill.md](../../references/contracts/document-subskill.md), the shared handoff contract in [../../references/contracts/sub-skill-handoffs.md](../../references/contracts/sub-skill-handoffs.md), the shared template at [../../references/templates/architecture.md](../../references/templates/architecture.md), the shared conventions at [../../references/templates/common.md](../../references/templates/common.md), the local specialization note in `references/local-specialization.md`, and [references/diagrams.md](references/diagrams.md).
