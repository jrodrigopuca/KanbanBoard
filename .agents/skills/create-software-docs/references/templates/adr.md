# ADR Shared Template

Target path: `{scope}/docs/decisions/NNN-kebab-case-title.md`

## Required Sections

- `# ADR-NNN: [Title of Decision]`
- `## Status`
- `## Date`
- `## Scope`
- `## Docs Location`
- `## Evidence Level`
- `## Context`
- `## Decision Drivers`
- `## Considered Options`
- `## Decision Outcome`
- `## Consequences`
- `## Sources Inspected`
- `## Links`

## Template Skeleton

```markdown
# ADR-NNN: [Title of Decision]

## Status

[Proposed | Accepted | Deprecated | Superseded by ADR-XXX]

## Date

[YYYY-MM-DD]

## Scope

[Whole repository | app | package | service]

## Docs Location

`{scope}/docs/decisions/`

## Evidence Level

- Direct evidence: [files, issues, docs, commits, config]
- Reconstructed from repository state: [what had to be inferred]
- Needs confirmation: [what could not be verified]

## Context

[What situation prompted this decision? What problem are we solving?
What constraints exist?]

## Decision Drivers

- [Driver 1]
- [Driver 2]
- [Driver 3]

## Considered Options

### Option 1: [Name]

- ✅ [Advantage]
- ❌ [Disadvantage]

### Option 2: [Name]

- ✅ [Advantage]
- ❌ [Disadvantage]

## Decision Outcome

**Chosen option:** "[Option N]" because [justification].

> If the rationale is reconstructed rather than documented explicitly, say so clearly here.

### Consequences

**Positive:**

- [Benefit]

**Negative:**

- [Trade-off and how it's mitigated]

## Sources Inspected

- `[path/to/file-or-dir]` — [why it matters]

## Links

- [Related ADR, RFC, issue, or discussion]
```
