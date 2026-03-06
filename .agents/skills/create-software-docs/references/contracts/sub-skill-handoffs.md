# Sub-skill Handoff Contract

Use this contract to define the logical artifacts exchanged between sub-skills and the orchestrator.

## Purpose

Keep artifact names stable across the documentation workflow so that each sub-skill can declare its own outputs while the orchestrator can compose them predictably.

## Structure of This Contract

This contract is organized in three operational layers:

1. reusable artifact shapes shared across sub-skills
2. top-level artifacts produced by each sub-skill stage
3. escalation and flow rules that explain how items move through the pipeline

## 1. Reusable Artifact Shapes

### Evidence Reference

Reusable structured item for `sourcesInspected` and any other evidence list passed between sub-skills.

Fields:

- `path`
- `kind` (`file`, `directory`, `generated-doc`, `config`, `manifest`, or `other`)
- `whyItMatters`
- `scopeRelation` (`in-scope`, `adjacent`, or `external-context`) when applicable

Use an evidence reference whenever a sub-skill needs to explain which repository artifact supports a document, finding, or decision.

Canonical example:

```yaml
path: package.json
kind: manifest
whyItMatters: Confirms available scripts and top-level dependencies for the selected scope.
scopeRelation: in-scope
```

### File Check Entry

Reusable structured item for `filesChecked` in validation outputs.

Fields:

- `path`
- `documentType` when applicable
- `checksApplied`
- `status` (`pass`, `pass-with-findings`, or `fail`)
- `notes` when applicable

Use a file check entry whenever validation reports how a specific file was reviewed.

Canonical example:

```yaml
path: docs/architecture.md
documentType: architecture
checksApplied:
	- evidence-labeling
	- mermaid-consistency
	- internal-links
status: pass-with-findings
notes: One unsupported integration reference was flagged for correction.
```

### Validation Finding

Structured item inside `issuesFound` that records a validation concern before it is classified as a cleanup candidate or known issue candidate.

Fields:

- `findingId`
- `title`
- `summary`
- `category` (`scope`, `evidence`, `link`, `consistency`, `structure`, `diagram`, `placeholder`, or `other`)
- `severity` (`low`, `medium`, or `high`)
- `affects`
- `evidence`
- `recommendedDisposition` (`fix-in-validation`, `send-to-cleanup`, `track-as-known-issue`, or `needs-manual-review`)
- `notes` when applicable

Use a validation finding for any issue discovered during validation that should be recorded explicitly, even if it is later refined into a cleanup candidate or known issue candidate.

Canonical example:

```yaml
findingId: VF-001
title: Architecture diagram references a module not supported by the repository
summary: The architecture document mentions an Event Bus component, but the repository evidence inspected in scope does not confirm that this component exists.
category: diagram
severity: high
affects:
	- docs/architecture.md
evidence:
	- path: docs/architecture.md
		note: The diagram includes an Event Bus node.
	- path: src/
		note: No matching implementation or configuration was found during scope inspection.
recommendedDisposition: fix-in-validation
notes: Remove the unsupported node or mark it explicitly as Needs confirmation.
```

Translation guidance:

- `recommendedDisposition` should explain the next owner of the finding, not just restate severity.
- a validation finding may remain only in `issuesFound`, or it may also lead to a `cleanupCandidate` or `knownIssueCandidate` when the boundary rules justify it.
- prefer one stable finding per underlying issue rather than duplicating the same concern across multiple entries.

### Broken Link Entry

Structured item inside `brokenLinks` that captures a link validation failure.

Fields:

- `linkId`
- `sourcePath`
- `linkTarget`
- `linkText` when applicable
- `failureType` (`missing-file`, `missing-anchor`, `out-of-scope`, or `invalid-relative-path`)
- `severity` (`low`, `medium`, or `high`)
- `suggestedFix` when applicable

Use a broken link entry whenever validation can point to a concrete link that does not resolve correctly.

Canonical example:

```yaml
linkId: BL-001
sourcePath: docs/project-overview.md
linkTarget: ./architecture.md#event-bus
linkText: Architecture details
failureType: missing-anchor
severity: medium
suggestedFix: Update the anchor reference or align the destination heading with the linked anchor.
```

### Missing Evidence Note

Structured item inside `missingEvidenceNotes` that captures where documentation lacks enough repository support.

Fields:

- `noteId`
- `targetPath`
- `section` when applicable
- `claimSummary`
- `missingEvidenceType` (`unsupported-claim`, `missing-source-list`, `unlabeled-inference`, or `partial-evidence`)
- `severity` (`low`, `medium`, or `high`)
- `suggestedAction`

Use a missing evidence note when a document section needs stronger sourcing, clearer uncertainty labeling, or removal.

Canonical example:

```yaml
noteId: MEN-001
targetPath: docs/development-guide.md
section: Environment Variables
claimSummary: The document states that Redis is required for local development, but no scoped repository evidence was found.
missingEvidenceType: unsupported-claim
severity: high
suggestedAction: Remove the Redis requirement or mark it as Needs confirmation until repository evidence is found.
```

### Speculative Section Entry

Structured item inside `speculativeSections` that identifies a section whose content appears inferred beyond safe evidence.

Fields:

- `sectionId`
- `targetPath`
- `section` or `heading`
- `reason`
- `severity` (`low`, `medium`, or `high`)
- `suggestedDisposition` (`remove`, `label-as-inferred`, `label-as-needs-confirmation`, or `replace-with-evidence`)

Use a speculative section entry when a section should be corrected because it goes beyond directly supported repository evidence.

Canonical example:

```yaml
sectionId: SS-001
targetPath: docs/architecture.md
section: External Integrations
reason: The section describes a Kafka integration, but no configuration, client dependency, or code usage was found in scope.
severity: high
suggestedDisposition: remove
```

### Cleanup Candidate

Structured item produced by validation for cleanup to review, apply, skip, or escalate.

Fields:

- `candidateId`
- `title`
- `summary`
- `category` (`editorial`, `structure`, `link`, `terminology`, `formatting`, or `consistency`)
- `severity` (`low`, `medium`, or `high`)
- `sourceType` (`validation`)
- `affects`
- `evidence`
- `suggestedAction`
- `safeToApply` (`true` or `false`)
- `escalateToKnownIssue` (`true` or `false`) when cleanup cannot safely resolve it

Use a cleanup candidate only when the issue is expected to be resolved, improved, or explicitly triaged during the current cleanup pass.

Canonical example:

```yaml
candidateId: CC-001
title: Architecture and overview use different names for the same module
summary: The generated docs refer to the same module as "Billing Engine" in one file and "Payments Core" in another, which creates avoidable confusion.
category: terminology
severity: medium
sourceType: validation
affects:
	- docs/project-overview.md
	- docs/architecture.md
evidence:
	- path: docs/project-overview.md
		note: Uses the label Billing Engine.
	- path: docs/architecture.md
		note: Uses the label Payments Core for the same responsibility.
suggestedAction: Normalize both documents to the repository-evidenced module name and keep aliases only if needed for clarity.
safeToApply: true
escalateToKnownIssue: false
```

Translation guidance:

- `suggestedAction` should become a cleanup action when it is safe and evidence-preserving.
- if cleanup cannot safely apply the suggested action, the item may remain a normal `remainingIssue` or escalate to `knownIssueCandidate` when long-term tracking is justified.
- `escalateToKnownIssue` should be `true` only when the item may survive cleanup and require explicit future visibility.

### Remaining Issue

Structured item emitted by cleanup when a problem still exists after reasonable editorial or consistency work but does not necessarily require formal long-term tracking as a known issue.

Fields:

- `issueId`
- `title`
- `summary`
- `category` (`editorial`, `structure`, `link`, `consistency`, `evidence-gap`, or `other`)
- `severity` (`low`, `medium`, or `high`)
- `affects`
- `evidence`
- `whyRemaining`
- `recommendedNextStep`
- `shouldEscalateToKnownIssue` (`true` or `false`)

Use a remaining issue when cleanup cannot fully resolve the item in the current pass, but the item is still worth reporting explicitly in the cleanup artifact.

Canonical example:

```yaml
issueId: RI-001
title: README documentation section is still missing
summary: The scope documentation was generated, but the scope README still lacks the expected Documentation section linking to the new docs.
category: link
severity: medium
affects:
	- README.md
	- docs/project-overview.md
evidence:
	- path: README.md
		note: No Documentation section is present.
	- path: docs/project-overview.md
		note: The generated docs exist and are ready to be linked.
whyRemaining: Cleanup focused on generated docs and did not safely update the scope README in this pass.
recommendedNextStep: Add a Documentation section in the scope README with links to the generated docs.
shouldEscalateToKnownIssue: false
```

Translation guidance:

- `whyRemaining` should explain why the item survived cleanup instead of repeating the issue summary.
- `recommendedNextStep` should be concrete and scope-safe.
- set `shouldEscalateToKnownIssue` to `true` only when the remaining issue now meets the persistent tracking boundary.

### Known Issue Candidate

Structured item that can appear inside a validation or cleanup artifact.

Core fields:

- `candidateId` when a stable identifier already exists
- `title`
- `summary`
- `sourceType` (`scope-analysis`, `validation`, `cleanup`, or `manual-review`)
- `affects`
- `evidence`
- `recommendedStatus`
- `trackingReason`

Optional fields:

- `currentHandling` when known
- `clarificationNeeded` when applicable
- `reEvaluateWhen` when applicable

Use a known issue candidate only when the item should survive the current pass and remain visible for future work, future clarification, or future re-evaluation.

Canonical example:

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

Translation guidance:

- `candidateId` may become the final issue identifier, or be converted into a stable document identifier such as `KI-001`.
- `recommendedStatus` should become the initial issue status unless stronger downstream evidence justifies a different one.
- `trackingReason`, `clarificationNeeded`, and `reEvaluateWhen` should be preserved in the final known issue entry instead of being collapsed into vague prose.
- in `compact` tracking mode, keep only the core fields plus whichever optional fields materially improve future review.
- do not invent optional lifecycle fields merely to fill out the shape.

## 2. Top-level Handoff Artifacts by Stage

### Scope Analysis Artifact

Produced by:

- `analyze-project-scope`

Fields:

- `scope`
- `scopeType`
- `operationMode`
- `complexity`
- `techStack`
- `majorModules`
- `sourcesInspected` (as `Evidence Reference` entries)
- `existingDocsDetected`
- `documentsToGenerate`
- `confidenceNote`
- `missingContext`

Consumed by:

- all document-producing sub-skills
- `validate-generated-docs`
- `cleanup-and-review-docs`

### Document Generation Artifact

Produced by:

- any document-producing sub-skill

Fields:

- `targetPath` or `targetFolder`
- `documentType`
- `sourcesInspected` (as `Evidence Reference` entries)
- `confidenceNote` when applicable
- `omittedSections` when applicable
- `openQuestions` or `needsConfirmation` when applicable

Consumed by:

- `validate-generated-docs`
- `cleanup-and-review-docs`
- the orchestrator when updating README and summarizing outputs

### Validation Artifact

Produced by:

- `validate-generated-docs`

Fields:

- `validationLevel` (`minimal`, `standard`, or `full`)
- `filesChecked` (as `File Check Entry` entries)
- `issuesFound` (as `Validation Finding` entries)
- `brokenLinks` (as `Broken Link Entry` entries)
- `missingEvidenceNotes` (as `Missing Evidence Note` entries)
- `speculativeSections` (as `Speculative Section Entry` entries)
- `cleanupCandidates` (as `Cleanup Candidate` entries)
- `knownIssueCandidates` (as `Known Issue Candidate` entries)
- `deferredChecks` when applicable
- `status`

Consumed by:

- `cleanup-and-review-docs`
- the orchestrator

### Cleanup Artifact

Produced by:

- `cleanup-and-review-docs`

Fields:

- `filesReviewed`
- `cleanupCandidatesReviewed`
- `cleanupActionsTaken`
- `remainingIssues` (as `Remaining Issue` entries)
- `knownIssueCandidates` (as `Known Issue Candidate` entries)
- `followUpValidationNeeded`
- `status`

Consumed by:

- the orchestrator
- `validate-generated-docs` when a final pass is required

### Known Issues Document Artifact

Produced by:

- `create-known-issues`

Fields:

- `targetPath`
- `documentType`
- `trackingMode` (`compact` or `full`) when applicable
- `sourcesInspected` (as `Evidence Reference` entries)
- `confidenceNote` when applicable
- `openQuestions` or `needsConfirmation` when applicable

Consumed by:

- the orchestrator
- `validate-generated-docs` when a final pass is required

## 3. Escalation and Flow Rules

### General Handoff Rules

- Sub-skills define their own outputs, but artifact names should align with this contract.
- The orchestrator defines which produced artifact is required before the next sub-skill runs.
- If an expected artifact is incomplete, the orchestrator should either stop, downgrade the plan, or mark the gap as `Needs confirmation`.
- Do not rename core artifact fields casually once downstream sub-skills depend on them.

### Escalation Boundaries

Use these boundaries consistently:

- Keep an item as a normal validation finding when it is important to report but does not need long-term tracking.
- Keep an item as a cleanup candidate when it is mainly editorial, structural, or link-related and can reasonably be fixed in the same documentation pass.
- Promote an item to `knownIssueCandidate` only when all of the following are true:
  - it is backed by repository evidence or by a concrete upstream finding
  - it is still relevant after reasonable validation and cleanup work
  - it affects understanding, operation, maintenance, architecture, or future delivery in a non-trivial way
  - it benefits from explicit status tracking, clarification tracking, or future re-evaluation

For `compact` tracking mode, apply an extra filter:

- prefer only the small set of persistent issues that a future reader truly needs to see again
- leave lower-priority unresolved items as `remainingIssues` or normal validation findings when long-term tracking adds little value

Do not create a known issue candidate for:

- transient drafting noise
- formatting-only problems
- small fixes that should be resolved immediately
- speculative concerns without evidence
- duplicates of an already tracked issue

### When to Prefer Each Structured Item

Prefer a plain validation finding when:

- the issue should be recorded, but validation can still fix it directly
- the issue does not need a dedicated cleanup workflow item
- the issue does not need status-driven tracking beyond the current pass
- the main value is diagnostic visibility for the orchestrator or reviewer

Prefer a broken link entry when:

- the problem is a directly resolvable link target or anchor failure
- the main concern is navigability rather than factual correctness

Prefer a missing evidence note when:

- the main problem is insufficient repository support for a claim
- the document needs stronger sourcing, uncertainty labeling, or claim removal

Prefer a speculative section entry when:

- a section or heading is too inference-heavy to keep as written
- the safest action is to remove, relabel, or replace the section based on evidence

Prefer a cleanup candidate when:

- the action is local to the documentation set
- the correction is evidence-preserving
- the issue is mainly editorial, naming, structure, or link consistency
- the team does not need to track the item beyond the current pass if fixed

Prefer a remaining issue when:

- cleanup reviewed the item but could not safely resolve it in the current pass
- the item should be reported to the orchestrator or reviewer even if it does not warrant long-term issue tracking
- the issue may need manual follow-up, but not necessarily a status-driven lifecycle

### Recommended Flow

1. `analyze-project-scope` produces the scope analysis artifact.
2. In `update` or `reconcile` mode, existing docs under `{scope}/docs/` should be inspected before document-producing sub-skills rewrite anything.
3. Core document-producing sub-skills establish the main scope narrative, terminology, and architecture baseline.
4. Optional document-producing sub-skills may then run as a controlled parallel batch when they are applicable and do not depend on each other's unfinished outputs.
5. Each document-producing sub-skill consumes scope analysis and produces its own document generation artifact.
6. When optional docs ran in parallel, the orchestrator should reconcile naming and coverage expectations before validation begins.
7. `validate-generated-docs` consumes generated or updated documents plus scope context and produces a validation artifact.
8. `validate-generated-docs` should emit structured `issuesFound` for all meaningful findings discovered during validation.
9. `validate-generated-docs` should add structured `cleanupCandidates` for issues expected to be handled during cleanup.
10. `validate-generated-docs` should add `knownIssueCandidates` only for persistent or track-worthy issues, not for every finding.
11. `cleanup-and-review-docs` consumes generated or updated documents plus the validation artifact and produces a cleanup artifact.
12. `cleanup-and-review-docs` should preserve, refine, apply, or drop cleanup candidates, emit structured remaining issues for unresolved items, and emit only the known issue candidates that still deserve tracking.
13. `create-known-issues` consumes scope, validation, and cleanup findings plus the selected tracking mode, and produces a known issues document artifact when applicable.
14. The orchestrator decides whether a final validation pass is required, and at which validation level.
