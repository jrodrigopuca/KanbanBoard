# Shared Template Contract

Use this contract for every document-producing sub-skill.

## Consumption Order

1. read `common.md`
2. read the one shared template that matches the target document
3. read the local specialization note for that sub-skill
4. read any extra local rules only if they change behavior for that document type

## Division of Responsibility

### Shared templates

Shared templates define:

- required sections
- optional sections
- target output path
- minimal skeleton structure

### Local specialization notes

Local specialization notes define:

- scope-specific adjustments
- document-specific emphasis
- narrowing rules for monorepos or partial repositories
- what not to over-document

### Extra local rules

Extra local rules define only specialized concerns, such as:

- diagram rules
- endpoint rules
- evidence policy
- ERD rules

## Constraint

Local files must not duplicate the full shared template. They should only specialize it.
