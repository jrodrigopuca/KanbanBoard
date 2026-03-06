# Data Model Shared Template

Target file: `{scope}/docs/data-model.md`

## Required Sections

- `# Data Model`
- `## Scope`
- `## Confidence Note`
- `## Entity Relationship Diagram`
- `## Entities`
- `## Data Lifecycle`
- `## Sources Inspected`

## Template Skeleton

````markdown
# Data Model

## Scope

- Target: [whole repository | app | package | service]
- Docs location: `{scope}/docs/`

## Confidence Note

- Confirmed from repository evidence: [short summary]
- Needs confirmation: [gaps that could not be verified]

## Entity Relationship Diagram

```mermaid
[ER diagram — see references/diagrams.md]
```
````

## Entities

### [Entity Name]

[Purpose] — Key fields:

| Field   | Type   | Constraints | Description   |
| ------- | ------ | ----------- | ------------- |
| [field] | [type] | PK          | [description] |
| [field] | [type] | FK          | [description] |

[Repeat for each entity]

## Data Lifecycle

[How records are created, updated, archived, deleted]

## Sources Inspected

- `[path/to/file-or-dir]` — [why it matters]

```

```
