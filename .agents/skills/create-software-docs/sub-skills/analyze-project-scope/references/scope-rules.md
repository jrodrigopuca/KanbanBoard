# Scope Rules

## Purpose

Use these rules to resolve `{scope}` consistently before any documentation is generated.

## Applies To

- `analyze-project-scope`

## Rules

### Scope Resolution Order

1. honor an explicit user-selected path
2. otherwise identify the smallest coherent executable/documentable unit
3. fall back to repository root only when the repo behaves as a single project

### Scope Types

- **repository**: single cohesive project at repo root
- **app**: runnable application inside a larger repo
- **package**: library/package inside a monorepo
- **service**: backend or worker service inside a distributed system

### Complexity Heuristics

- **simple**: one deployable unit, one main data store, limited integrations
- **medium**: frontend/API/data split or multiple major layers
- **complex**: multiple services, async workflows, distributed deployments, or several bounded contexts

## Usage Notes

- prefer the smallest valid scope that matches the user request
- keep complexity classification reusable by downstream sub-skills
