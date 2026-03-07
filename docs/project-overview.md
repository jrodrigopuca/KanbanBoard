# KanbanBoard

## Scope

- Target: repositorio completo
- Boundary: incluye toda la aplicación React dentro de `kanban/`
- Docs location: `docs/`

## Confidence Note

- **Confirmed** from repository evidence: stack tecnológico, estructura de componentes, funcionalidades de CRUD y drag & drop, persistencia en localStorage
- **Inferred** from repository structure: despliegue bajo la base `/kanban/` definida en [kanban/vite.config.js](kanban/vite.config.js)
- **Needs confirmation**: no se encontró configuración de CI/CD ni de despliegue

## Summary

KanbanBoard es una aplicación web de tablero Kanban construida con React. Permite a los usuarios gestionar tareas organizadas en columnas personalizables, con funcionalidad de arrastrar y soltar (drag & drop) para mover tareas entre columnas y reordenarlas. Los datos se persisten en el `localStorage` del navegador.

La aplicación soporta crear y eliminar tareas, editar títulos, asignar puntos de estimación (usando la secuencia de Fibonacci: 1, 2, 3, 5, 8, 13, 21) y agregar columnas personalizadas. Cada tarea registra la fecha de su última modificación. Sobre esa base, la UI actual ya incorpora detalle lateral de tarea, labels, prioridad, subtareas, exportación JSON/CSV, command palette y toasts con undo.

La base actual del frontend ya empezó a migrarse hacia una estructura simplificada con capas `domain`, `application`, `infrastructure` y `ui`, para preparar el rediseño y nuevas capacidades sin seguir concentrando todo el comportamiento en un único componente.

## Tech Stack

| Capa          | Tecnología                           |
| ------------- | ------------------------------------ |
| Lenguaje      | JavaScript (JSX)                     |
| Framework     | React 19.2.4                         |
| Build Tool    | Vite 7.3.1                           |
| Drag & Drop   | @hello-pangea/dnd 18.0.1             |
| ID Generation | Web Crypto API (`crypto.randomUUID`) |
| Persistencia  | localStorage (navegador)             |
| Testing       | Vitest + React Testing Library       |
| Linting       | No hay tarea dedicada configurada    |

## Repository Structure

```text
KanbanBoard/
├── kanban/                  ← aplicación React
│   ├── package.json         ← dependencias y scripts
│   ├── index.html           ← punto de entrada HTML de Vite
│   ├── public/              ← assets estáticos públicos
│   ├── src/                 ← código fuente
│   │   ├── index.js         ← bootstrap de React
│   │   ├── App.js           ← componente raíz
│   │   ├── App.css          ← estilos del componente raíz
│   │   ├── index.css        ← estilos globales
│   │   ├── App.test.js      ← suite de pruebas de interfaz
│   │   ├── domain/          ← modelos y reglas de dominio
│   │   ├── application/     ← casos de uso
│   │   ├── infrastructure/  ← persistencia y adapters
│   │   └── ui/              ← componentes y view models
│   └── build/               ← build de producción
├── docs/                    ← documentación del proyecto
├── README.md                ← README del repositorio
└── LICENSE
```

## Key Modules

| Módulo           | Responsabilidad                                                 | Ubicación                                  |
| ---------------- | --------------------------------------------------------------- | ------------------------------------------ |
| App              | Componente raíz que renderiza la entrada del board              | `kanban/src/App.js`                        |
| BoardPage        | Conecta la UI del tablero con su view model                     | `kanban/src/ui/board/BoardPage.jsx`        |
| BoardViewModel   | Orquesta estado y acciones del tablero                          | `kanban/src/ui/board/useBoardViewModel.js` |
| ColumnView       | Renderiza una columna droppable con su lista de tareas          | `kanban/src/ui/column/ColumnView.jsx`      |
| TaskCard         | Renderiza una tarjeta de tarea draggable con metadata resumida  | `kanban/src/ui/task/TaskCard.jsx`          |
| TaskDetailDrawer | Expone edición ampliada de tarea, labels, prioridad y subtareas | `kanban/src/ui/task/TaskDetailDrawer.jsx`  |
| CommandPalette   | Permite ejecutar acciones rápidas y abrir tareas con teclado    | `kanban/src/ui/board/CommandPalette.jsx`   |

## Documentation

- Base path: `docs/`
- [Architecture](architecture.md)
- [Development Guide](development-guide.md)
- [Improvements Backlog](improvements.md)
- [Known Issues](known-issues.md)

## Sources Inspected

- `kanban/package.json` — dependencias, scripts y configuración del proyecto
- `kanban/src/App.js` — componente raíz
- `kanban/src/index.js` — punto de entrada de React
- `kanban/src/ui/board/BoardPage.jsx` — entrada de la UI del tablero
- `kanban/src/ui/board/useBoardViewModel.js` — estado y acciones del tablero
- `kanban/src/ui/column/ColumnView.jsx` — componente de columna
- `kanban/src/ui/task/TaskCard.jsx` — componente de tarea
- `kanban/src/ui/shared/board.css` — estilos compartidos del tablero
- `kanban/index.html` — HTML base de la aplicación
- `README.md` — README del repositorio
