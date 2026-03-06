# Shared Templates Index

This folder no longer uses a single monolithic template reference.

Use only the shared template that matches the document being generated.

## Shared Conventions

- [templates/common.md](templates/common.md)
- [templates/contract.md](templates/contract.md)

## Document-Specific Shared Templates

- [templates/project-overview.md](templates/project-overview.md)
- [templates/architecture.md](templates/architecture.md)
- [templates/development-guide.md](templates/development-guide.md)
- [templates/adr.md](templates/adr.md)
- [templates/runbook-operational.md](templates/runbook-operational.md)
- [templates/runbook-troubleshooting.md](templates/runbook-troubleshooting.md)
- [templates/data-model.md](templates/data-model.md)
- [templates/api-reference.md](templates/api-reference.md)
- [templates/glossary.md](templates/glossary.md)
- [templates/known-issues.md](templates/known-issues.md)

## Consumption Rule

Each sub-skill should consume:

1. the shared conventions in [templates/common.md](templates/common.md)
2. the shared contract in [templates/contract.md](templates/contract.md)
3. only its own document-specific shared template
4. its local specialization notes, if needed

Examples:

- `create-project-overview` → `templates/project-overview.md`
- `create-architecture-docs` → `templates/architecture.md`
- `create-runbooks` → `templates/runbook-operational.md` and/or `templates/runbook-troubleshooting.md`
- `create-adrs` → `templates/adr.md`
- `create-known-issues` → `templates/known-issues.md`

This keeps shared guidance modular and avoids loading unrelated template sections.
