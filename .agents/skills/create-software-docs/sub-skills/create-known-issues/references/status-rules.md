# Known Issue Status Rules

## Purpose

Define stable statuses for known issue entries so that issues can be re-evaluated over time without losing history.

## Applies To

- `create-known-issues`

## Rules

### Allowed Statuses

- `open` — newly identified and not yet triaged
- `known` — acknowledged as a real issue by the team
- `accepted` — intentionally tolerated for now
- `deferred` — valid but postponed
- `needs-clarification` — requires more evidence or a future decision
- `monitoring` — being watched for impact or change
- `resolved` — previously known and now considered closed

### Status Transitions

- prefer status changes over deleting historical issues
- move an item to `known` when the team confirms it is real
- move an item to `accepted` when the team decides it is an intentional trade-off
- move an item to `deferred` when the issue is valid but not prioritized now
- move an item to `resolved` when evidence shows the issue no longer applies
- use `needs-clarification` when evidence is insufficient but the issue should remain visible

### Initial Status Guidance

- start with `open` when the item is newly surfaced and not yet explicitly acknowledged
- start with `known` when the repository context or prior interaction already shows the team recognizes the issue
- start with `accepted` when the limitation is intentional or explicitly tolerated
- start with `deferred` when the issue is valid and visible but clearly postponed
- start with `monitoring` when the issue is not actionable yet but should stay visible for future change detection
- start with `needs-clarification` when the issue is worth tracking but the current evidence is incomplete

### Compact Mode Guidance

- in `compact` mode, prefer the simplest status that accurately communicates the issue state
- use `monitoring` only when future observation is materially important; otherwise prefer `open`, `known`, `accepted`, `deferred`, or `needs-clarification`
- avoid preserving long resolved history in `compact` mode unless the existing known-issues document already depends on that continuity

## Constraints

- do not mark an issue `resolved` without evidence or an explicit documented decision
- do not leave status implicit in prose; always set it explicitly

## Usage Notes

- keep identifiers stable when the same issue is re-evaluated across interactions
- prefer updating the issue state and review notes instead of creating duplicates
