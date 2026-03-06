# Local Specialization

## Base Inputs

Use these inputs in order:

1. shared conventions at `../../references/templates/common.md`
2. shared document template at `../../references/templates/known-issues.md`
3. the existing target document when operating in `update` or `reconcile` mode
4. this local specialization note
5. local status rules in `status-rules.md`

## Local Adjustments

- prefer issues that remain relevant after validation and cleanup, not ephemeral drafting noise
- preserve an issue entry when the team has already acknowledged it and assigned a different status
- use future clarification fields when the issue cannot be fully resolved from repository evidence alone
- when updating, preserve stable issue identifiers and revise status, evidence, and review notes instead of recreating entries unnecessarily
- in `compact` mode, prefer concise entries and omit optional lifecycle detail that does not improve future usefulness
- in `full` mode, preserve richer history and review notes when they already exist or clearly matter

## Do Not Repeat

Do not restate the full shared template here. Only describe scope-specific adjustments.
