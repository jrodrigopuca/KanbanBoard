# Operational Local Specialization

## Base Inputs

Use these inputs in order:

1. shared conventions at `../../references/templates/common.md`
2. shared document template at `../../references/templates/runbook-operational.md`
3. the existing target runbook when operating in `update` or `reconcile` mode
4. this local specialization note

## Local Adjustments

- one action per step
- verification should be concrete and observable
- destructive operations should always have an explicit warning
- when updating, preserve validated operational steps and revise only commands, warnings, verification, or rollback details affected by current evidence

## Do Not Repeat

Do not restate the full shared template here. Only describe scope-specific adjustments.
