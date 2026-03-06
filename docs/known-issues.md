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
| `accepted`            | Tolerado intencionalmente por ahora            |
| `deferred`            | Issue válido, pospuesto para trabajo futuro    |
| `needs-clarification` | Requiere más información o una decisión futura |

## Known Issues

### KI-001: Test de ejemplo roto

- Status: `known`
- Category: `tooling`
- Affects: `kanban/src/App.test.js`

**Summary**

El test generado por Create React App busca el texto "learn react" que fue eliminado cuando se reemplazó el contenido por defecto con el componente `Board`. Ejecutar `npm test` falla con este test.

**Evidence**

- `kanban/src/App.test.js` — el test usa `screen.getByText(/learn react/i)` pero ese texto no existe en la aplicación
- `kanban/src/App.js` — renderiza `<Board />`, no el contenido por defecto de CRA

---

### KI-002: Sin manejo de errores en localStorage

- Status: `open`
- Category: `architecture`
- Affects: `kanban/src/component/Board.jsx`

**Summary**

Las operaciones de lectura y escritura de `localStorage` no están envueltas en `try/catch`. Si `localStorage` está lleno, deshabilitado por el navegador, o contiene JSON corrupto, la aplicación puede fallar silenciosamente o lanzar una excepción no capturada.

**Evidence**

- `kanban/src/component/Board.jsx` — `initColumns()` llama `localStorage.getItem()` y `JSON.parse()` sin protección (línea 9-11); el `useEffect` llama `localStorage.setItem()` sin protección (línea 49)

---

### KI-003: Mutación directa de estado en handlers

- Status: `open`
- Category: `architecture`
- Affects: `kanban/src/component/Board.jsx`

**Summary**

Los handlers `handleDragEnd` y `handleAddTask` realizan una copia superficial del array de columnas (`[...columns]`) pero luego mutan directamente los objetos internos (columnas y sus arrays de tareas) usando `splice()` y `push()`. Esto viola el principio de inmutabilidad de React y puede causar bugs sutiles en re-renderizados.

**Evidence**

- `kanban/src/component/Board.jsx` — `handleDragEnd` usa `column.tasks.splice()` sobre objetos referenciados del estado original (línea 86-88); `handleAddTask` usa `newColumns[0].tasks.push()` que muta el array de tareas del mismo objeto (línea 107)

---

### KI-004: Falta prop `key` en iteración de TaskComponent

- Status: `open`
- Category: `architecture`
- Affects: `kanban/src/component/Column.jsx`

**Summary**

En el `map` de tareas dentro de `Column.jsx`, el componente `TaskComponent` no recibe una prop `key` explícita. Aunque `Draggable` internamente usa `draggableId`, React producirá un warning por la falta de `key` en el elemento del iterador.

**Evidence**

- `kanban/src/component/Column.jsx` — `tasks.map((task, index) => (<TaskComponent {...task} indexTask={index} .../>))` sin prop `key` (línea 22-24)

---

### KI-005: No se pueden eliminar columnas

- Status: `accepted`
- Category: `architecture`
- Affects: `kanban/src/component/Board.jsx`

**Summary**

La aplicación permite agregar columnas pero no ofrece funcionalidad para eliminarlas ni editarlas. La única forma de remover una columna es limpiar `localStorage` manualmente.

**Evidence**

- `kanban/src/component/Board.jsx` — existe `handleAddColumn` pero no hay `handleDeleteColumn` ni `handleEditColumn`

---

### KI-006: StrictMode de React deshabilitado

- Status: `accepted`
- Category: `tooling`
- Affects: `kanban/src/index.js`

**Summary**

`React.StrictMode` fue removido del entry point. Esto es una solución al conflicto conocido entre `react-beautiful-dnd` y el doble renderizado de StrictMode en React 18. Como consecuencia, se pierden las advertencias de desarrollo que StrictMode proporciona.

**Evidence**

- `kanban/src/index.js` — renderiza `<App />` directamente sin `<React.StrictMode>`
- `kanban/package.json` — usa `react-beautiful-dnd ^13.1.1` que tiene issues documentados con StrictMode en React 18

---

### KI-007: Carpeta build commiteada en el repositorio

- Status: `needs-clarification`
- Category: `tooling`
- Affects: `kanban/build/`

**Summary**

La carpeta `build/` con los artefactos de producción está incluida en el repositorio. Esto puede causar conflictos de merge innecesarios y aumentar el tamaño del repo. Sin embargo, podría ser intencional si se usa para despliegue directo desde el repositorio (ej. GitHub Pages).

**Evidence**

- `kanban/build/` — contiene `index.html`, archivos CSS y JS minificados con hashes
- `kanban/package.json` — `homepage: "https://yardev.net/kanban"` sugiere despliegue estático

## Sources Inspected

- `kanban/src/component/Board.jsx` — lógica de estado, mutaciones, persistencia
- `kanban/src/component/Column.jsx` — iteración de tareas sin key
- `kanban/src/component/Task.jsx` — componente de tarea
- `kanban/src/App.test.js` — test roto
- `kanban/src/index.js` — StrictMode ausente
- `kanban/package.json` — dependencias y homepage
- `kanban/build/` — artefactos de producción en el repo
- `docs/architecture.md` — constraints y trade-offs identificados
- `docs/development-guide.md` — problemas comunes documentados
