# Normalization Guidance

Use normalization to keep the skill system predictable.

## What to Normalize

- repeated section names across related skills
- ordering of inputs, outputs, rules, and references
- naming of local references
- wording for evidence and confidence handling

## What Not to Normalize Excessively

Do not force identical content when the skill type is materially different.

Examples:

- document generators need template references
- non-document sub-skills need process contracts
- validation and cleanup should stay separate even if both review docs

## Recommendation

Prefer a shared contract or shared guidance before creating a full new skill for normalization.
Create a dedicated normalization skill only if multiple skill families need recurring refactors and consistency passes.
