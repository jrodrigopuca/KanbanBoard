# Endpoint Rules

## Purpose

Keep API documentation grounded in the routed or specified surface that is visible within `{scope}`.

## Applies To

- `create-api-docs`

## Rules

- group by resource, bounded context, or module
- prefer documented auth and validation middleware over assumptions
- include only endpoints evidenced within `{scope}`
- if versioning is unclear, state that explicitly

## Constraints

- do not infer undocumented endpoints or contracts from naming alone
