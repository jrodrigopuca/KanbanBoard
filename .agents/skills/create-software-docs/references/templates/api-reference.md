# API Reference Shared Template

Target file: `{scope}/docs/api-reference.md`

## Required Sections

- `# API Reference`
- `## Scope`
- `## Confidence Note`
- `## Base URL`
- `## Endpoints`
- `## Sources Inspected`

## Optional Sections

- auth summary
- request/response schemas
- error codes

## Template Skeleton

```markdown
# API Reference

## Scope

- Target: [whole repository | app | package | service]
- Docs location: `{scope}/docs/`

## Confidence Note

- Confirmed from repository evidence: [short summary]
- Needs confirmation: [gaps that could not be verified]

## Base URL

`[base-url-pattern]` — Auth: [method]

## Endpoints

### [Resource Name]

| Method         | Path   | Description   |
| -------------- | ------ | ------------- |
| [GET/POST/...] | [path] | [description] |

[For each endpoint, add request/response shapes and error codes as needed]

## Sources Inspected

- `[path/to/file-or-dir]` — [why it matters]
```
