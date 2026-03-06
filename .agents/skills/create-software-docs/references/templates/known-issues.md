# Known Issues Shared Template

Target file: `{scope}/docs/known-issues.md`

## Required Sections

- `# Known Issues`
- `## Scope`
- `## Confidence Note`
- `## Status Model`
- `## Known Issues`
- `## Future Clarifications` when at least one tracked issue needs explicit clarification or re-evaluation
- `## Sources Inspected`

## Tracking Modes

### `compact`

Use for `simple` scopes or downgraded runs.

- keep only the most important persistent issues
- keep entries concise
- include clarification and re-evaluation notes only when they materially help future review
- omit `## Future Clarifications` entirely when no issue needs it

### `full`

Use for `complex`, history-sensitive, or `reconcile` workflows.

- preserve richer lifecycle detail when it exists or clearly adds value
- retain clarification and re-evaluation notes when needed
- keep stronger continuity with existing issue history

## Template Skeleton

```markdown
# Known Issues

## Scope

- Target: [whole repository | app | package | service]
- Docs location: `{scope}/docs/`

## Confidence Note

- Confirmed from repository evidence: [short summary]
- Needs confirmation: [gaps that could not be verified]

## Status Model

| Status                | Meaning                                         |
| --------------------- | ----------------------------------------------- |
| `open`                | Newly identified and not yet triaged.           |
| `known`               | Confirmed and acknowledged by the team.         |
| `accepted`            | Intentionally tolerated for now.                |
| `deferred`            | Valid issue, but postponed for later work.      |
| `needs-clarification` | Requires more information or a future decision. |
| `monitoring`          | Being watched for change or impact.             |
| `resolved`            | Previously known, now considered closed.        |

## Known Issues

### KI-001: [Short Title]

- Status: `[open | known | accepted | deferred | needs-clarification | monitoring | resolved]`
- Category: `[architecture | api | data | ops | docs | tooling | other]`
- Affects: `[module, service, document, or path]`
- Detected by: `[validation | cleanup | analysis | manual review]`
- Tracking Reason: `[accepted limitation | unresolved risk | deferred work | monitoring item | clarification gap]`

In `compact` mode, keep the fields above that materially help the reader. `Category`, `Affects`, or `Tracking Reason` may be omitted when the summary and evidence already make the issue clear.

**Summary**

[What the issue is and why it matters]

**Evidence**

- `[path/to/file-or-dir]` — [why it matters]

**Current Handling**

[How the project or team currently treats this issue, if known]

**Why This Is Tracked**

[Why this issue remains visible instead of being treated as a transient finding or a cleanup-only task]

**Future Clarification or Review**

- Clarification needed: [what remains unclear]
- Re-evaluate when: [event, milestone, or condition]
- Notes: [optional review notes]

## Future Clarifications

| Issue ID | Clarification Needed | Re-evaluate When |
| -------- | -------------------- | ---------------- |
| KI-001   | [pending detail]     | [trigger]        |

In `compact` mode, omit this section when no item needs explicit clarification or re-evaluation tracking.

## Sources Inspected

- `[path/to/file-or-dir]` — [why it matters]
```

## Candidate Translation Example

Use this example only as a shape reference for transforming a `knownIssueCandidate` into the final document entry.

Candidate input:

```yaml
candidateId: KI-CAND-001
title: Deployment rollback step is undocumented
summary: The repository includes deployment automation, but there is no evidenced rollback procedure in the generated or source operational docs.
sourceType: validation
affects:
	- docs/runbooks/deploy.md
	- .github/workflows/deploy.yml
evidence:
	- path: .github/workflows/deploy.yml
		note: Confirms deployment automation exists.
	- path: docs/runbooks/deploy.md
		note: Describes deploy steps but does not define rollback.
recommendedStatus: needs-clarification
trackingReason: clarification gap
currentHandling: Manual rollback may exist, but it is not evidenced in the repository.
clarificationNeeded: Confirm whether rollback exists outside the repository or should be documented here.
reEvaluateWhen: Next release process review or after operational documentation update.
```

Expected final entry shape:

```markdown
### KI-001: Deployment rollback step is undocumented

- Status: `needs-clarification`
- Category: `ops`
- Affects: `docs/runbooks/deploy.md`, `.github/workflows/deploy.yml`
- Detected by: `validation`
- Tracking Reason: `clarification gap`

**Summary**

The repository shows deployment automation, but the rollback procedure is not evidenced in the available operational documentation.

**Evidence**

- `.github/workflows/deploy.yml` — confirms deployment automation exists.
- `docs/runbooks/deploy.md` — includes deploy steps but no rollback section.

**Current Handling**

Manual rollback may exist, but it is not documented in repository evidence.

**Why This Is Tracked**

This affects operational safety and should remain visible until the team confirms whether rollback is undocumented or intentionally external.

**Future Clarification or Review**

- Clarification needed: confirm whether rollback exists outside the repository or should be documented here.
- Re-evaluate when: next release process review or after operational documentation update.
- Notes: keep this item visible until the rollback path is evidenced or the team explicitly accepts the gap.
```
