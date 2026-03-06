# Evidence Model

## Purpose

Capture evidence in a reusable format that downstream sub-skills can inherit without reinterpretation.

## Applies To

- `analyze-project-scope`
- all downstream document-producing sub-skills

## Rules

### Evidence Categories

- manifests and config files
- scripts and task runners
- entry points and routing files
- schemas, models, and migrations
- Docker, CI/CD, and infrastructure config
- existing docs inside `{scope}`

### Confidence Labels

- **Confirmed**: directly supported by files in the repository
- **Inferred**: reconstructed from multiple repository signals
- **Needs confirmation**: plausible but not sufficiently evidenced

## Usage Notes

Every downstream document should inherit:

- the same `{scope}`
- the same `sources inspected`
- the same confidence policy
