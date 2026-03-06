# Project Overview Shared Template

Target file: `{scope}/docs/project-overview.md`

## Required Sections

- `# [Project Name]`
- `## Scope`
- `## Confidence Note`
- `## Summary`
- `## Tech Stack`
- `## Repository Structure`
- `## Key Modules`
- `## Documentation`
- `## Sources Inspected`

## Template Skeleton

````markdown
# [Project Name]

## Scope

- Target: [whole repository | app | package | service]
- Boundary: [what is included and excluded]
- Docs location: `{scope}/docs/`

## Confidence Note

- Confirmed from repository evidence: [short summary]
- Inferred from repository structure or conventions: [short summary]
- Needs confirmation: [gaps that could not be verified]

## Summary

[1-2 paragraphs: what the project does, its purpose, and who uses it]

## Tech Stack

| Layer          | Technology                        |
| -------------- | --------------------------------- |
| Language       | [e.g., TypeScript, Python, Go]    |
| Framework      | [e.g., Express, Django, Gin]      |
| Database       | [e.g., PostgreSQL, MongoDB]       |
| Infrastructure | [e.g., Docker, AWS, Vercel]       |
| CI/CD          | [e.g., GitHub Actions, GitLab CI] |

## Repository Structure

```text
project-root/
├── [dir]/          ← [purpose]
├── [dir]/          ← [purpose]
├── [dir]/          ← [purpose]
├── [config-file]   ← [purpose]
└── README.md
```
````

## Key Modules

| Module | Purpose          | Location  |
| ------ | ---------------- | --------- |
| [Name] | [Responsibility] | `[path/]` |
| [Name] | [Responsibility] | `[path/]` |
| [Name] | [Responsibility] | `[path/]` |

## Documentation

- Base path: `{scope}/docs/`
- [Architecture](architecture.md)
- [Development Guide](development-guide.md)
- [Decision Records](decisions/)
- [Runbooks](runbooks/)
- [Data Model](data-model.md)
- [API Reference](api-reference.md)
- [Glossary](glossary.md)

## Sources Inspected

- `[path/to/file-or-dir]` — [why it matters]
- `[path/to/file-or-dir]` — [why it matters]

```

```
