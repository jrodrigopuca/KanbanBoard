# Shared Template Conventions

These conventions apply to every generated document under `{scope}/docs/`.

## Path Convention

- All generated files must live under `{scope}/docs/`.
- `{scope}` is the repository root or the selected app/package/service root.
- Do not generate documentation outside the selected scope.

## Shared Sections

Use these sections whenever they apply:

### `Scope`

Describe:

- target type: repository, app, package, or service
- what is included in the selected scope
- what is excluded from the selected scope
- the effective docs location when useful

### `Confidence Note`

Use repository-backed confidence labels:

- **Confirmed** — directly supported by files in the repository
- **Inferred** — reconstructed from multiple repository signals
- **Needs confirmation** — plausible but not sufficiently evidenced

### `Sources Inspected`

List the main files or directories used as evidence.

When possible, keep each entry aligned with the shared evidence-reference shape: path, kind, and why it matters.

Example:

- `[path/to/file-or-dir]` — [why it matters]
- `[path/to/file-or-dir]` — [why it matters]

## Writing Rules

- Prefer omission over speculation.
- Reuse the same terminology across all generated docs.
- Keep links inside `{scope}/docs/` consistent with the selected scope.
- Mark uncertain statements instead of completing gaps with guesses.
- In `update` or `reconcile` mode, follow the shared guidance in `../contracts/update-reconcile-guidance.md`.
