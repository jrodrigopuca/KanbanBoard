# Orchestration Policy

Use this reference for orchestration-wide execution policy that should not be duplicated across every step of the workflow.

## Purpose

Keep the top-level orchestrator focused on workflow, activation, and handoffs while centralizing planning-time policy in one place.

Use this file when deciding:

- how much of the skill tree to load
- when to downgrade the workflow
- which validation level to use
- when the simple-project fast path is appropriate
- which known-issues tracking mode to use

## Context Loading Strategy

Do not load the whole skill tree at once unless the model context is clearly large enough and the task truly requires it.

Prefer lazy loading by stage.

### Scope analysis stage

Load only:

- the orchestrator file
- `sub-skills/analyze-project-scope/SKILL.md`
- `references/contracts/non-document-subskill.md`
- the relevant sections of `references/contracts/sub-skill-handoffs.md` for `Scope Analysis Artifact`
- `sub-skills/analyze-project-scope/references/scope-rules.md`
- `sub-skills/analyze-project-scope/references/evidence-model.md`

### Document generation stage

For one document-producing sub-skill, load only:

- the orchestrator file
- that sub-skill `SKILL.md`
- `references/contracts/document-subskill.md`
- `references/contracts/update-reconcile-guidance.md` when operating in `update` or `reconcile` mode
- `references/templates/common.md`
- the one shared template for that document type
- the sub-skill local specialization note
- only the extra local rules files that materially constrain that document type

Do not load other document sub-skills during a single document-generation step unless cross-document consistency truly requires it.

### Validation stage

Load only:

- the orchestrator file
- `sub-skills/validate-generated-docs/SKILL.md`
- `references/contracts/non-document-subskill.md`
- the relevant artifact sections from `references/contracts/sub-skill-handoffs.md`
- `sub-skills/validate-generated-docs/references/validation-rules.md`
- `sub-skills/validate-generated-docs/references/output-checklist.md`
- `references/quality-checklist.md`

### Cleanup stage

Load only:

- the orchestrator file
- `sub-skills/cleanup-and-review-docs/SKILL.md`
- `references/contracts/non-document-subskill.md`
- the relevant cleanup sections from `references/contracts/sub-skill-handoffs.md`
- `sub-skills/cleanup-and-review-docs/references/cleanup-rules.md`
- `sub-skills/cleanup-and-review-docs/references/editorial-checklist.md`
- `references/quality-checklist.md`

### Known-issues stage

Load only:

- the orchestrator file
- `sub-skills/create-known-issues/SKILL.md`
- `references/contracts/document-subskill.md`
- `references/contracts/update-reconcile-guidance.md` when applicable
- the relevant known-issues sections from `references/contracts/sub-skill-handoffs.md`
- `references/templates/common.md`
- `references/templates/known-issues.md`
- `sub-skills/create-known-issues/references/local-specialization.md`
- `sub-skills/create-known-issues/references/status-rules.md`

### Hard constraint

- Do not pre-load every template, every sub-skill, and the full handoff contract for each step.
- Load only the files needed for the current stage and the current document type.
- If a contract file is large, read only the sections relevant to the artifact being produced or consumed.

## Downgrade Rules

If context budget, time budget, or repository size makes the full workflow impractical, downgrade in this order:

1. keep scope analysis mandatory
2. keep core docs mandatory: `project-overview`, `architecture`, `development-guide`
3. skip optional docs that have weak evidence or low user value in the current pass
4. simplify validation to the most critical checks: scope, evidence, links, obvious speculation
5. keep cleanup minimal and correctness-preserving
6. generate `known-issues` only when there are clearly persistent, important findings worth tracking

When downgrading:

- prefer omitting low-confidence optional deliverables over producing shallow or speculative docs
- prefer partial but accurate coverage over full but weak coverage
- state which docs or checks were intentionally deferred
- do not drop validation entirely

If even the downgraded workflow does not fit the available context, produce only a scoped plan plus the highest-value core docs and explicitly mark the rest as deferred.

## Validation Levels

Choose one validation level for each validation pass.

- `minimal` — verify scope boundaries, output paths, `Sources inspected`, confidence labeling, obvious broken links, obvious speculative sections, and core README/doc navigation
- `standard` — default level; includes `minimal` plus applicable document-specific checks, cross-document terminology consistency, and structured artifact quality checks
- `full` — includes `standard` plus exhaustive link review, deeper preserved-content verification in `update` or `reconcile` mode, and stricter review of diagrams, operational procedures, and known-issue escalation boundaries

Select the level like this:

- use `minimal` for downgraded runs, fast-path simple projects, or final re-validation after purely editorial cleanup
- use `standard` by default for normal generation or update workflows
- use `full` for complex scopes, high-risk docs, heavy `reconcile` work, or when many preserved sections must be re-verified against repository evidence

When validation is not `full`, explicitly state which deeper checks were deferred.

## Known-Issues Tracking Modes

Choose one known-issues tracking mode before running `create-known-issues`.

- `compact` — reduced tracking for `simple` scopes, downgraded runs, or `minimal` validation passes; keep only the most important persistent issues and use only the fields needed to keep them understandable and reviewable
- `full` — richer tracking for `complex` scopes, `reconcile` work, existing mature known-issues docs, or cases where future clarification and re-evaluation history matter materially

Select the mode like this:

- use `compact` by default when the project is `simple`, validation ran at `minimal`, or the issue set is small and mostly lightweight
- use `full` when the project is `complex`, the workflow is `reconcile`, the scope already has a maintained known-issues history, or multiple items need explicit clarification or re-evaluation

In `compact` mode:

- promote only the highest-value persistent issues
- prefer concise entries over exhaustive lifecycle detail
- keep `currentHandling`, `clarificationNeeded`, and `reEvaluateWhen` only when they materially help future readers
- omit a standalone future-clarifications section when no item actually needs it

In `full` mode:

- preserve stable issue history when it already exists
- keep explicit clarification and re-evaluation notes when they matter
- retain richer status-driven tracking for long-lived items

## Fast Path for Simple Projects

If scope analysis classifies the project as `simple`, prefer this reduced path unless strong evidence justifies more:

1. `analyze-project-scope`
2. `create-project-overview`
3. `create-architecture-docs` with only the simplest evidenced sections and diagrams
4. `create-development-guide`
5. `validate-generated-docs` with a minimal but evidence-focused pass
6. `cleanup-and-review-docs` with a minimal editorial pass

Add optional steps only when directly evidenced and clearly valuable:

- `create-api-docs` if an API is central and obvious
- `create-data-model-docs` if persistence is central and obvious
- `create-runbooks` only when operational procedures are clearly present
- `create-glossary` only when terminology is non-trivial even in a simple scope
- `create-adrs` only when a real hard-to-reverse decision is visible
- `create-known-issues` only when persistent issues clearly deserve tracking, using `compact` mode by default

The fast path should reduce instruction and execution cost, not reduce factual quality.
