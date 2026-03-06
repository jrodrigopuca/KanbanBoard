# Architecture Shared Template

Target file: `{scope}/docs/architecture.md`

## Required Sections

- `# Architecture`
- `## Scope`
- `## Confidence Note`
- `## Overview`
- `## Architecture Style`
- `## Components`
- `## Key Flows`
- `## Cross-Cutting Concerns`
- `## Constraints and Trade-offs`
- `## Sources Inspected`

## Optional Sections

Include only when supported by evidence:

- `## System Context`
- `## Containers`
- `## Security and Operations`
- `## Deployment`

## Template Skeleton

````markdown
# Architecture

## Scope

- Target: [whole repository | app | package | service]
- Boundary: [what is included and excluded]
- Docs location: `{scope}/docs/`

## Confidence Note

- Confirmed from repository evidence: [short summary]
- Inferred from repository structure or conventions: [short summary]
- Needs confirmation: [gaps that could not be verified]

## Overview

[1-2 paragraphs: architecture style, key design principles, high-level description]

## Architecture Style

- Pattern: [layered | event-driven | monolith | microservices | serverless | other]
- Complexity: [simple | medium | complex]
- Rationale: [why this classification fits the observed repository]

## System Context (omit if not applicable)

[Who/what interacts with this system — users, external services, other systems]

```mermaid
[System context diagram — see references/diagrams.md]
```
````

## Containers (omit if not applicable)

[Major deployable units and how they communicate]

```mermaid
[Container diagram — see references/diagrams.md]
```

## Components

[Internal module structure and dependencies]

```mermaid
[Component diagram — see references/diagrams.md]
```

## Key Flows

[Critical paths through the system — e.g., authentication, main business operation]

```mermaid
[Sequence diagram — see references/diagrams.md]
```

## Cross-Cutting Concerns

| Concern        | Approach                         |
| -------------- | -------------------------------- |
| Authentication | [How auth is handled]            |
| Logging        | [Logging strategy]               |
| Error handling | [Error handling approach]        |
| Caching        | [Caching strategy, if any]       |
| Monitoring     | [Observability approach, if any] |

## Security and Operations

| Area               | Notes                                            |
| ------------------ | ------------------------------------------------ |
| Secrets/config     | [How secrets are managed]                        |
| Background jobs    | [Workers, schedulers, queues]                    |
| Backup/restore     | [If observable]                                  |
| Operational limits | [Rate limits, maintenance windows, manual steps] |

## Deployment (omit if not applicable)

[How and where the system is deployed]

```mermaid
[Deployment diagram — see references/diagrams.md, if applicable]
```

## Constraints and Trade-offs

- [Constraint/trade-off 1 and why it exists]
- [Constraint/trade-off 2 and why it exists]

## Sources Inspected

- `[path/to/file-or-dir]` — [why it matters]
- `[path/to/file-or-dir]` — [why it matters]

```

```
