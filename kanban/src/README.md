# Source structure

This project is starting the `BF-005` refactor with the simplified `Option A` structure.

## Selected structure

```text
src/
├── domain/
│   ├── models/
│   └── services/
├── application/
│   └── use-cases/
├── infrastructure/
│   ├── persistence/
│   ├── export/
│   └── notifications/
├── ui/
│   ├── board/
│   ├── column/
│   ├── task/
│   ├── shared/
│   └── hooks/
└── test/
```

## Intent

- `domain/`: business models and pure rules
- `application/`: use cases orchestrating business actions
- `infrastructure/`: adapters such as `localStorage`, export and notifications
- `ui/`: React components, view models and hooks
- `test/`: tests organized by layer as the refactor advances

## Migration note

The legacy implementation under `src/component/` remains active until behavior is moved incrementally into the new structure.
