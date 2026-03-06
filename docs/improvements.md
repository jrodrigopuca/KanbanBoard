# Improvements Backlog

## Scope

- Target: repositorio completo
- Docs location: `docs/`
- Purpose: registrar mejoras funcionales y técnicas que no se consideran bugs

## Status Model

| Status      | Significado                                 |
| ----------- | ------------------------------------------- |
| `candidate` | Idea válida pendiente de priorización       |
| `planned`   | Mejora aceptada para una iteración futura   |
| `active`    | En desarrollo                               |
| `done`      | Implementada y disponible en el repositorio |
| `deferred`  | Válida, pero pospuesta sin fecha definida   |

## Improvements

### BF-001: Gestión de columnas

- Type: `feature`
- Status: `done`
- Priority: `medium`
- Affects: `kanban/src/component/Board.jsx`, `kanban/src/component/Column.jsx`

**Summary**

Se agregó soporte para editar y eliminar columnas del tablero. La eliminación ahora requiere una confirmación explícita mediante modal, dado que también elimina todas las cards de la columna.

**Why it matters**

Esta mejora completa la administración de columnas desde la interfaz y evita depender de limpiar manualmente el `localStorage` para reorganizar la estructura del tablero.

**Current evidence**

- `kanban/src/component/Board.jsx` — existe `handleAddColumn`, pero no hay `handleDeleteColumn` ni `handleEditColumn`
- `kanban/src/component/Column.jsx` — la UI actual renderiza el título de la columna sin acciones de administración

**Implemented behavior**

- El usuario puede renombrar una columna desde acciones visibles en el encabezado
- El usuario puede solicitar la eliminación de una columna desde la interfaz
- Antes de eliminar, se muestra un modal de confirmación que advierte que todas las cards serán eliminadas
- La eliminación actualiza el estado y persiste en `localStorage`

**Possible acceptance criteria**

- El usuario puede renombrar una columna desde la interfaz
- El usuario puede eliminar una columna desde la interfaz
- Se define qué ocurre con las tareas de una columna eliminada
- Los cambios persisten correctamente en `localStorage`
- La interacción no rompe el flujo actual de drag & drop

**Notes**

- La eliminación se habilita mientras exista más de una columna en el tablero
- La confirmación se resuelve mediante modal antes de borrar la columna y sus cards

## Sources Inspected

- `docs/known-issues.md` — origen del BF-001 como backlog funcional
- `kanban/src/component/Board.jsx` — manejo actual de columnas
- `kanban/src/component/Column.jsx` — render actual de la UI de columnas
- `kanban/src/App.test.js` — cobertura de renombre y eliminación con confirmación
