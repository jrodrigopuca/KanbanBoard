# Sub-skills Index

This folder contains the specialized skills used by the `create-software-docs` orchestrator.

Read the orchestrator first for the full workflow, activation rules, and operating modes.

For context loading, downgrade behavior, validation levels, and the simple-project fast path, use `../references/orchestration-policy.md`.

## Execution Order

1. `analyze-project-scope`
2. sequential core docs:
   - `create-project-overview`
   - `create-architecture-docs`
   - `create-development-guide`
3. optional batch, parallel only when safe:
   - `create-data-model-docs`
   - `create-api-docs`
   - `create-runbooks`
   - `create-glossary`
4. `create-adrs`
5. `validate-generated-docs`
6. `cleanup-and-review-docs`
7. conditional: `create-known-issues`

If cleanup or known-issues generation performs substantial edits, run `validate-generated-docs` again as a final pass.

Choose the validation level explicitly:

- `minimal` for fast-path or downgraded runs
- `standard` by default
- `full` for complex, high-risk, or heavy `reconcile` workflows

## Role Groups

- `analyze-project-scope` — resolves `{scope}`, mode, and evidence inventory
- `create-*` document sub-skills — generate or update docs under `{scope}/docs/`
- `validate-generated-docs` — produces the `Validation Artifact`
- `cleanup-and-review-docs` — produces the `Cleanup Artifact`
- `create-known-issues` — produces the `Known Issues Document Artifact` when applicable

## Reference Contract

Document-producing sub-skills should consume references in this order:

1. shared conventions in `../references/templates/common.md`
2. the shared document contract in `../references/contracts/document-subskill.md`
3. the shared update/reconcile guidance in `../references/contracts/update-reconcile-guidance.md` when applicable
4. one document-specific shared template in `../references/templates/`
5. one or more local specialization notes in the sub-skill `references/` folder
6. any additional local rules files only when needed

This keeps shared structure centralized and local behavior minimal.

Non-document sub-skills should instead use the shared process contract in `../references/contracts/non-document-subskill.md` plus any local rules/checklists they require.

Local rule files and checklist files should follow the shared contract in `../references/contracts/rules-and-checklists.md`.

Artifact exchanges between sub-skills should align with the shared handoff contract in `../references/contracts/sub-skill-handoffs.md`.

## Purpose

- use smaller, specialized prompts
- reduce cross-document hallucination
- make monorepo scope handling explicit
- keep validation independent from generation
- keep editorial cleanup separate from structural validation
- keep analysis, validation, and cleanup on a shared process contract
- keep artifact exchange typed and predictable for downstream sub-skills
