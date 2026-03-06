# Rules and Checklists Contract

Use this contract for local rule files, policy files, and checklist files.

## Required Sections for Rule or Policy Files

Rule-oriented references should define, when applicable:

- `## Purpose`
- `## Applies To`
- `## Rules` or equivalent rule sections
- `## Constraints` when unsafe actions or boundaries matter
- `## Usage Notes` when the rule file affects downstream behavior

## Required Sections for Checklist Files

Checklist-oriented references should define, when applicable:

- `## Purpose`
- `## Applies To`
- one or more checklist sections
- `## Usage Notes`

## Normalization Goals

- keep headings predictable across reference files
- separate purpose from actionable rules
- make it clear which sub-skill consumes the file
- avoid mixing rules, outputs, and narrative explanation without labels

## Constraint

Do not turn every file into the same shape if that reduces clarity. Normalize section naming and intent, not the exact amount of content.
