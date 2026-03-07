# Known Issues

## Scope

- Target: repositorio completo
- Docs location: `docs/`

## Confidence Note

- **Confirmed** from repository evidence: todos los issues listados se basan en código y archivos observables en el repositorio
- **Needs confirmation**: no se tiene contexto sobre decisiones intencionales del autor respecto a algunos de estos puntos

## Status Model

| Status                | Significado                                    |
| --------------------- | ---------------------------------------------- |
| `open`                | Identificado, no triageado aún                 |
| `known`               | Confirmado y reconocido                        |
| `resolved`            | Solucionado y verificado en el repositorio     |
| `accepted`            | Tolerado intencionalmente por ahora            |
| `deferred`            | Issue válido, pospuesto para trabajo futuro    |
| `needs-clarification` | Requiere más información o una decisión futura |

## Known Issues

### KI-001: Test de ejemplo roto

- Status: `resolved`
- Category: `tooling`
- Affects: `kanban/src/App.test.js`

**Summary**

El test heredado de Create React App fue reemplazado por pruebas alineadas con la UI real del tablero. Ahora se valida el render del título y de las columnas por defecto, y también el fallback cuando `localStorage` contiene JSON inválido.

**Evidence**

- `kanban/src/App.test.js` — contiene pruebas para el render del tablero y para recuperación ante datos persistidos inválidos
- `kanban/src/App.js` — sigue renderizando `<Board />`, ahora cubierto por pruebas acordes a la aplicación
- Validación manual: `npm test` ejecutado con resultado exitoso tras migrar a Vitest

---

### KI-002: Sin manejo de errores en localStorage

- Status: `resolved`
- Category: `architecture`
- Affects: `kanban/src/component/Board.jsx`

**Summary**

La inicialización y persistencia del tablero ahora envuelven el acceso a `localStorage` en `try/catch`. Si hay JSON corrupto o falla la escritura, la app evita romperse y conserva un fallback seguro con columnas por defecto.

**Evidence**

- `kanban/src/component/Board.jsx` — `initColumns()` protege `getItem()` y `JSON.parse()` con `try/catch` y vuelve a `createDefaultColumns()` cuando falla la carga
- `kanban/src/component/Board.jsx` — el `useEffect` protege `localStorage.setItem()` con `try/catch`
- `kanban/src/App.test.js` — hay una prueba explícita para JSON inválido en `localStorage`

---

### KI-003: Mutación directa de estado en handlers

- Status: `resolved`
- Category: `architecture`
- Affects: `kanban/src/component/Board.jsx`

**Summary**

Los handlers principales del tablero ahora crean nuevas referencias para columnas y tareas antes de reordenar o insertar elementos. Con ello se elimina la mutación directa del estado anidado y se mantiene el patrón inmutable esperado por React.

**Evidence**

- `kanban/src/component/Board.jsx` — `handleDragEnd` clona cada columna y su array `tasks` antes de usar `splice()` sobre copias seguras
- `kanban/src/component/Board.jsx` — `handleAddTask` usa `setColumns()` funcional y crea un nuevo array `tasks` con spread
- `kanban/src/component/Board.jsx` — `handleAddColumn` también fue ajustado a actualización funcional para mantener consistencia

---

### KI-004: Falta prop `key` en iteración de TaskComponent

- Status: `resolved`
- Category: `architecture`
- Affects: `kanban/src/component/Column.jsx`

**Summary**

El renderizado de tareas ahora asigna una prop `key` explícita basada en `task.id` sobre el elemento retornado por el `map`, evitando el warning de React y mejorando la estabilidad del reconciliador.

**Evidence**

- `kanban/src/component/Column.jsx` — `tasks.map(...)` ahora renderiza `<TaskComponent key={task.id} ... />`

---

### KI-006: StrictMode de React deshabilitado

- Status: `resolved`
- Category: `tooling`
- Affects: `kanban/src/index.js`

**Summary**

`React.StrictMode` fue reactivado tras migrar el drag & drop a `@hello-pangea/dnd` y actualizar el stack principal. Con ello se recuperan las verificaciones adicionales de desarrollo sin romper el build ni la suite de tests actual.

**Evidence**

- `kanban/src/index.js` — vuelve a renderizar `<App />` dentro de `<React.StrictMode>`
- Validación manual: `npm test` y `npm run build` ejecutados con resultado exitoso tras migrar a Vite

---

### KI-007: Carpeta build commiteada en el repositorio

- Status: `resolved`
- Category: `tooling`
- Affects: `kanban/build/`

**Summary**

La carpeta `build/` no debe versionarse. El proyecto ya incluye la regla `/build` en `.gitignore` y los artefactos compilados se retiraron del árbol del repositorio para que esta salida se use solo de forma local.

**Evidence**

- `kanban/.gitignore` — contiene la regla `/build`
- `kanban/build/` — los artefactos compilados fueron eliminados del repositorio

## Backlog funcional

### BF-001: Gestión de columnas

- Type: `feature`
- Status: `done`
- Affects: `kanban/src/component/Board.jsx`

**Summary**

La edición y eliminación de columnas ya se implementó como mejora del tablero. La eliminación usa una confirmación modal, porque también borra todas las cards de la columna.

**Evidence**

- `kanban/src/component/Board.jsx` — existen handlers para renombrar columnas, solicitar eliminación y confirmar mediante modal
- `kanban/src/component/Column.jsx` — cada columna expone acciones para editar y eliminar
- `kanban/src/App.test.js` — hay cobertura para renombrado y borrado con confirmación

## Sources Inspected

- `kanban/src/component/Board.jsx` — lógica de estado, mutaciones, persistencia
- `kanban/src/component/Column.jsx` — iteración de tareas sin key
- `kanban/src/component/Task.jsx` — componente de tarea
- `kanban/src/App.test.js` — test roto
- `kanban/src/index.js` — StrictMode reactivado
- `kanban/package.json` — dependencias y homepage
- `kanban/.gitignore` — exclusión de artefactos de build
- `docs/architecture.md` — constraints y trade-offs identificados
- `docs/development-guide.md` — problemas comunes documentados
