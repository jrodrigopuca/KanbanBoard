# Troubleshooting Runbook Shared Template

Target path: `{scope}/docs/runbooks/[title].md`

## Required Sections

- `# Runbook: [Title]`
- `## Runbook Type`
- `## Docs Location`
- `## Overview`
- `## Trigger Conditions`
- `## Prerequisites`
- `## Symptoms`
- `## Diagnosis`
- `## Procedure`
- `## Verification`
- `## Rollback`
- `## Escalation`
- `## Post-Incident`
- `## Sources Inspected`

## Template Skeleton

````markdown
# Runbook: [Title]

## Runbook Type

Troubleshooting

## Docs Location

`{scope}/docs/runbooks/`

## Overview

[What this runbook covers — 1-2 sentences]

## Trigger Conditions

- [Alert, symptom, or error condition]

## Prerequisites

- [ ] Access to [system/service]
- [ ] [Tool] installed
- [ ] [Permission/role] required

## Symptoms

- [How to recognize this problem — alert, error message, user report]

## Diagnosis

- [What to inspect before taking action]

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

## Post-Incident

- [ ] Write post-mortem if applicable
- [ ] Update this runbook with corrections
- [ ] File preventive tickets

## Sources Inspected

- `[path/to/file-or-dir]` — [why it matters]

```

```
