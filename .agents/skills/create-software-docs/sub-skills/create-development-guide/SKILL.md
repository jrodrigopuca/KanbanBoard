---
name: create-development-guide
description: Generate a development guide for the selected scope using only repository-evidenced setup, environment, run, test, lint, and build instructions. | Genera una guía de desarrollo para el alcance seleccionado usando solo instrucciones de setup, entorno, ejecución, test, lint y build evidenciadas por el repositorio.
license: MIT
---

# Create Development Guide

## Responsibilities

- describe prerequisites and local setup
- document environment variables when evidenced
- list real run, test, lint, and build commands
- mention operational and safety notes for development
- record common issues visible from the repository

## Required Inputs

- the selected `{scope}` and scope boundaries
- scripts, Makefiles, Dockerfiles, CI config, or task runners relevant to local development
- environment variable sources such as config files or examples
- scope analysis results and confidence notes

## Expected Output

Produce a **Document Generation Artifact** for the development guide containing at least:

- `targetPath`: `{scope}/docs/development-guide.md`
- `documentType`: `development-guide`
- `sourcesInspected`
- `confidenceNote`
- `omittedSections` when applicable
- `openQuestions` or `needsConfirmation` when applicable

The generated document must include only commands and setup steps evidenced by the repository, marking unverifiable steps as `Needs confirmation` when omission would hide a real gap.

## Rules

- Never invent commands.
- Prefer commands from scripts, Makefiles, Dockerfiles, CI config, or task runners.
- If a step cannot be verified, label it `Needs confirmation`.
- Include `Sources Inspected`.
- Remove or update stale commands instead of retaining legacy instructions that no longer match the repository.

## References

Use the shared document sub-skill contract in [../../references/contracts/document-subskill.md](../../references/contracts/document-subskill.md), the shared handoff contract in [../../references/contracts/sub-skill-handoffs.md](../../references/contracts/sub-skill-handoffs.md), the shared template at [../../references/templates/development-guide.md](../../references/templates/development-guide.md), the shared conventions at [../../references/templates/common.md](../../references/templates/common.md), and the local specialization note in `references/local-specialization.md`.
