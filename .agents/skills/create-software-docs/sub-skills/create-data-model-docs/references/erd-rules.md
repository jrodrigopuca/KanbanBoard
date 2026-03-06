# ERD Rules

## Purpose

Keep ER diagrams and entity descriptions tied to persistence evidence rather than transport or view models.

## Applies To

- `create-data-model-docs`

## Rules

- prefer schemas, migrations, and ORM models over DTOs
- include PK, FK, and unique constraints when they are evidenced
- keep names aligned with the selected scope
- if cardinality is not clear, document the uncertainty instead of guessing

## Constraints

- do not promote transient types into persistent entities without evidence
