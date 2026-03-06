# Local Specialization

## Base Inputs

Use these inputs in order:

1. shared conventions at `../../references/templates/common.md`
2. shared document template at `../../references/templates/adr.md`
3. existing ADR files when operating in `update` or `reconcile` mode
4. this local specialization note
5. local evidence policy in `evidence-policy.md`

## Local Adjustments

- create fewer ADRs with stronger evidence instead of documenting every small choice
- keep file names in `NNN-kebab-case-title.md` format under `{scope}/docs/decisions/`
- ensure reconstructed rationale is explicitly called out in `Decision Outcome`
- when updating, prefer revising the context, status, or rationale of an existing ADR over creating a duplicate ADR for the same decision

## Do Not Repeat

Do not restate the full shared template here. Only describe scope-specific adjustments.
