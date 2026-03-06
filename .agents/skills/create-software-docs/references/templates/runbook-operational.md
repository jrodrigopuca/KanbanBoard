# Operational Runbook Shared Template

Target path: `{scope}/docs/runbooks/[title].md`

## Required Sections

- `# Runbook: [Title]`
- `## Runbook Type`
- `## Docs Location`
- `## Overview`
- `## Trigger Conditions`
- `## Prerequisites`
- `## Procedure`
- `## Verification`
- `## Rollback`
- `## Escalation`
- `## Sources Inspected`

## Template Skeleton

````markdown
# Runbook: [Title]

## Runbook Type

Operational

## Docs Location

`{scope}/docs/runbooks/`

## Overview

[What this runbook covers — 1-2 sentences]

## Trigger Conditions

- [When this runbook should be used]

## Prerequisites

- [ ] Access to [system/service]
- [ ] [Tool] installed
- [ ] [Permission/role] required

## Procedure

### Step 1: [Action title]

⚠️ **Warning:** [Safety concern, if any]

[What this step does and why]

```bash
[exact command]
```
````

### Step 2: [Action title]

[Continue...]

## Verification

- [ ] [How to confirm success]

## Rollback

1. [How to undo if something went wrong]

## Escalation

| Contact     | Role   | Channel   |
| ----------- | ------ | --------- |
| [Name/Team] | [Role] | [Channel] |

## Sources Inspected

- `[path/to/file-or-dir]` — [why it matters]

```

```
