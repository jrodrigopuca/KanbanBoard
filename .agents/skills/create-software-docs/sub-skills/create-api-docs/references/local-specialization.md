# Local Specialization

## Base Inputs

Use these inputs in order:

1. shared conventions at `../../references/templates/common.md`
2. shared document template at `../../references/templates/api-reference.md`
3. this local specialization note
4. local endpoint rules in `endpoint-rules.md`

## Local Adjustments

- group endpoints according to the scoped module or bounded context
- keep auth and error details only when they are evidenced by routes, middleware, schemas, or specs
- avoid describing implicit contracts that are not visible in the repository

## Do Not Repeat

Do not restate the full shared template here. Only describe scope-specific adjustments.
