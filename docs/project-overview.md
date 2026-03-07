# KanbanBoard

## Scope

- Target: repositorio completo
- Boundary: incluye toda la aplicación React dentro de `kanban/`
- Docs location: `docs/`

## Confidence Note

- **Confirmed** from repository evidence: stack tecnológico, estructura de componentes, funcionalidades de CRUD y drag & drop, persistencia en localStorage
- **Inferred** from repository structure: homepage de despliegue (`https://yardev.net/kanban` en `package.json`)
- **Needs confirmation**: no se encontró configuración de CI/CD ni de despliegue

## Summary

KanbanBoard es una aplicación web de tablero Kanban construida con React. Permite a los usuarios gestionar tareas organizadas en columnas personalizables, con funcionalidad de arrastrar y soltar (drag & drop) para mover tareas entre columnas y reordenarlas. Los datos se persisten en el `localStorage` del navegador.

La aplicación soporta crear y eliminar tareas, editar títulos, asignar puntos de estimación (usando la secuencia de Fibonacci: 1, 2, 3, 5, 8, 13, 21) y agregar columnas personalizadas. Cada tarea registra la fecha de su última modificación.

## Tech Stack

| Capa          | Tecnología                             |
| ------------- | -------------------------------------- |
| Lenguaje      | JavaScript (JSX)                       |
| Framework     | React 19.2.4                           |
| Build Tool    | Vite 7.3.1                             |
| Drag & Drop   | @hello-pangea/dnd 18.0.1               |
| ID Generation | Web Crypto API (`crypto.randomUUID`)   |
| Persistencia  | localStorage (navegador)               |
| Testing       | Vitest + React Testing Library         |
| Linting       | No hay tarea dedicada configurada      |

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
│   │   ├── App.test.js      ← test de ejemplo
│   │   └── component/       ← componentes del tablero
│   │       ├── Board.jsx    ← tablero principal
│   │       ├── Column.jsx   ← columna droppable
│   │       ├── Task.jsx     ← tarjeta de tarea draggable
│   │       └── styles.css   ← estilos de componentes
│   └── build/               ← build de producción
├── docs/                    ← documentación del proyecto
├── README.md                ← README del repositorio
└── LICENSE
```

## Key Modules

| Módulo | Responsabilidad                                                            | Ubicación                         |
| ------ | -------------------------------------------------------------------------- | --------------------------------- |
| App    | Componente raíz que renderiza el Board                                     | `kanban/src/App.js`               |
| Board  | Estado del tablero, CRUD de tareas/columnas, drag & drop, persistencia     | `kanban/src/component/Board.jsx`  |
| Column | Renderiza una columna droppable con su lista de tareas                     | `kanban/src/component/Column.jsx` |
| Task   | Renderiza una tarjeta de tarea draggable con edición, eliminación y puntos | `kanban/src/component/Task.jsx`   |

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
- `kanban/src/component/Board.jsx` — lógica principal del tablero
- `kanban/src/component/Column.jsx` — componente de columna
- `kanban/src/component/Task.jsx` — componente de tarea
- `kanban/src/component/styles.css` — estilos de los componentes
- `kanban/index.html` — HTML base de la aplicación
- `README.md` — README del repositorio
