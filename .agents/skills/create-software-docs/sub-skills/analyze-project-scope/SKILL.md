---
name: analyze-project-scope
description: Analyze a project or selected sub-scope to determine documentation boundaries, complexity, stack, evidence sources, and which documentation artifacts should be generated. | Analiza un proyecto o sub-alcance seleccionado para determinar límites de documentación, complejidad, stack, fuentes de evidencia y qué artefactos documentales deben generarse.
license: MIT
---

# Analyze Project Scope

Determine the documentation `{scope}` before any other documentation skill runs.

## Responsibilities

- identify whether the target is a whole repo, app, package, or service
- detect whether the workflow should behave as `generate`, `update`, or `reconcile`
- detect technology stack and major entry points
- identify evidence sources inside the selected scope
- detect whether documentation already exists under `{scope}/docs/`
- classify complexity as simple, medium, or complex
- decide which documentation outputs are applicable
- report confidence and missing context

## Required Inputs

- user request or selected target path
- repository structure inside the potential `{scope}`
- manifests, configs, entry points, and existing docs
- any monorepo or multi-service boundaries visible in the repository

## Expected Output

Produce a **Scope Analysis Artifact** containing:

- `scope`
- `scopeType`
- `operationMode`
- `complexity`
- `techStack`
- `majorModules`
- `sourcesInspected` as structured evidence references
- `existingDocsDetected`
- `documentsToGenerate`
- `confidenceNote`
- `missingContext`

This output should be reusable by downstream sub-skills without redefining the scope.

## Rules

- Prefer the smallest scope that matches the user request.
- If the repo is a monorepo, identify the exact app/package/service root.
- If evidence is incomplete, state what cannot be verified.
- Reuse the evidence inventory in downstream sub-skills.
- If docs already exist, determine whether the safest behavior is update-focused or reconcile-focused instead of full regeneration.

## References

Use the shared non-document contract in [../../references/contracts/non-document-subskill.md](../../references/contracts/non-document-subskill.md), the shared handoff contract in [../../references/contracts/sub-skill-handoffs.md](../../references/contracts/sub-skill-handoffs.md), and the local references [references/scope-rules.md](references/scope-rules.md) and [references/evidence-model.md](references/evidence-model.md).
