# Development Guide Shared Template

Target file: `{scope}/docs/development-guide.md`

## Required Sections

- `# Development Guide`
- `## Scope`
- `## Confidence Note`
- `## Prerequisites`
- `## Setup`
- `## Environment Variables`
- `## Running Locally`
- `## Testing`
- `## Linting and Formatting`
- `## Building`
- `## Common Issues`
- `## Sources Inspected`

## Optional Sections

- `## Security and Operational Notes`

## Template Skeleton

````markdown
# Development Guide

## Scope

- Target: [whole repository | app | package | service]
- Docs location: `{scope}/docs/`

## Confidence Note

- Confirmed from repository evidence: [short summary]
- Needs confirmation: [gaps that could not be verified]

## Prerequisites

- [Tool/runtime] version [X]+
- [Tool] version [X]+
- [Account/access] for [service]

## Setup

```bash
# Clone
git clone [repo-url]
cd [project-name]

# Install dependencies
[install command]

# Configure environment
cp .env.example .env

# Edit .env with your values
```
````

## Environment Variables

| Variable     | Description    | Required | Default        |
| ------------ | -------------- | -------- | -------------- |
| `[VAR_NAME]` | [What it does] | Yes/No   | [default or -] |
| `[VAR_NAME]` | [What it does] | Yes/No   | [default or -] |

## Running Locally

```bash
[dev server command]
```

Available at: `[http://localhost:port]`

## Testing

```bash
# Run all tests
[test command]

# Run specific tests
[specific test command]
```

## Linting and Formatting

```bash
[lint command]
[format command]
```

## Building

```bash
[build command]
```

## Security and Operational Notes

- [How to handle secrets locally]
- [Required services such as databases, queues, or emulators]
- [Migration/seed order, if applicable]
- [Safety warnings for destructive local commands]

## Common Issues

| Issue     | Solution |
| --------- | -------- |
| [Symptom] | [Fix]    |
| [Symptom] | [Fix]    |

## Sources Inspected

- `[path/to/file-or-dir]` — [why it matters]
- `[path/to/file-or-dir]` — [why it matters]

```

```
