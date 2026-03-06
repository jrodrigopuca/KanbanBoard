# Cleanup Rules

## Purpose

Apply only editorial and consistency improvements that are safe after validation has already identified the main issues.

## Applies To

- `cleanup-and-review-docs`

## Rules

### Safe Cleanup Actions

- remove duplicated explanations that appear in multiple docs
- shorten repetitive paragraphs without dropping evidenced meaning
- normalize heading depth and section ordering when needed
- normalize table style and bullet formatting
- remove placeholders that were left by mistake
- convert unresolved placeholders into explicit `Needs confirmation` notes when removal would hide a real gap
- align repeated names for modules, services, and domains across documents
- fix obvious broken relative links inside `{scope}/docs/`

### Priority Order

1. correctness-preserving cleanup
2. consistency across docs
3. readability and concision
4. cosmetic formatting improvements

## Constraints

Do not:

- add new architectural claims
- invent missing rationale, commands, endpoints, or relationships
- rewrite major sections in ways that change technical meaning
- merge documents or restructure the docs tree unless explicitly instructed

## Known Issue Candidate Boundary

- preserve a `knownIssueCandidate` only if the issue still exists after reasonable cleanup
- drop a `knownIssueCandidate` when cleanup fully resolves it in the same pass
- prefer keeping an issue as a normal `remainingIssue` if it does not need status tracking or future re-evaluation
- promote an unresolved item to `knownIssueCandidate` when it reflects an accepted limitation, deferred work item, monitoring concern, or clarification gap worth preserving

## Cleanup Candidate Handling

- review each `cleanupCandidate` as a discrete item instead of collapsing multiple actions into vague summary prose
- mark a cleanup candidate as applied when the suggested action is safe and completed
- mark a cleanup candidate as skipped when the change would risk altering technical meaning or lacks enough evidence
- escalate a cleanup candidate only when it remains important after cleanup and now meets the `knownIssueCandidate` boundary

## Remaining Issue Handling

- emit a structured `remainingIssue` when cleanup reviewed an item but could not safely resolve it
- explain why the item remains instead of repeating the same problem statement
- include a concrete next step when one can be stated from repository evidence or workflow context
- escalate a `remainingIssue` to `knownIssueCandidate` only when it now requires explicit status tracking or future re-evaluation
