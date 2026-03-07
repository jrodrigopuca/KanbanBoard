# BF-002 Impact Analysis

## Scope

- Target: repositorio completo
- Related backlog items: `BF-002`, `BF-003`, `BF-005`
- Design inputs: [design/lista.md](../design/lista.md), [design/001.svg](../design/001.svg), [design/002.svg](../design/002.svg), [design/003.svg](../design/003.svg), [design/004.svg](../design/004.svg), [design/005.svg](../design/005.svg), [design/006.svg](../design/006.svg), [design/007.svg](../design/007.svg), [design/008.svg](../design/008.svg), [design/009.svg](../design/009.svg), [design/010.svg](../design/010.svg), [design/011.svg](../design/011.svg), [design/012.svg](../design/012.svg)

## Objective

Determinar qué comportamiento actual debe preservarse, qué nuevas capacidades funcionales aparecen en la propuesta visual y qué cambios estructurales son necesarios para soportar el rediseño bajo principios de Clean Architecture y SOLID.

## Current baseline

La implementación actual cubre un tablero Kanban simple con:

- columnas persistidas en `localStorage`
- creación rápida de tareas y columnas
- edición inline de título de tarea y columna
- eliminación de tareas y columnas
- drag & drop entre columnas
- story points básicos con incremento/decremento
- modal de confirmación para borrar columnas

La implementación original concentraba la mayor parte de esta lógica en el antiguo `Board.jsx`. Tras la migración inicial, la responsabilidad principal ya pasó a [kanban/src/ui/board/useBoardViewModel.js](../kanban/src/ui/board/useBoardViewModel.js), con la presentación distribuida en [kanban/src/ui/board/BoardView.jsx](../kanban/src/ui/board/BoardView.jsx), [kanban/src/ui/column/ColumnView.jsx](../kanban/src/ui/column/ColumnView.jsx) y [kanban/src/ui/task/TaskCard.jsx](../kanban/src/ui/task/TaskCard.jsx).

## Functional scope to keep

Estas capacidades deben mantenerse durante el refactor:

1. Persistencia local del tablero
2. Drag & drop entre columnas
3. Alta de columna
4. Renombre y eliminación de columna con confirmación
5. Alta, edición y eliminación de tareas
6. Story points por tarea
7. Compatibilidad con responsive mínimo ya existente

## Functional scope added by the designs

La carpeta de diseño convierte BF-002 en una mejora funcional y no solo estética.

### 1. Board renovado

De [design/001.svg](../design/001.svg) y [design/006.svg](../design/006.svg):

- headers de columna con contador persistente
- tarjetas con metadata visual estable
- estados activos de drag & drop más claros
- badges/labels por tarea
- jerarquía visual de prioridad/estado

### 2. Crear o editar tarea

De [design/002.svg](../design/002.svg):

- input principal con foco claro
- descripción opcional
- selector de etiquetas
- shortcut de envío con Enter

**Impacto funcional**: la entidad `Task` ya no puede quedarse solo con `title`, `date` y `points`; necesita al menos `description` y `labels`.

### 3. Crear o editar columna

De [design/003.svg](../design/003.svg):

- creación/renombre contextual de columna
- soporte visual para estados vacíos de una columna nueva

**Impacto funcional**: conviene modelar mejor la columna como agregado con acciones explícitas (`rename`, `clear`, `archive?`).

### 4. Menú de acciones de columna

De [design/004.svg](../design/004.svg):

- renombrar columna
- vaciar tareas
- eliminar columna

**Impacto funcional**: actualmente existe borrar, pero no `vaciar tareas`; debe añadirse una acción con confirmación y posibilidad de feedback.

### 5. Detalle de tarea

De [design/005.svg](../design/005.svg):

- panel lateral o drawer
- estado editable
- prioridad
- etiquetas
- descripción rica/simple
- subtareas con progreso

**Impacto funcional**: se necesitan nuevos atributos de dominio:

- `priority`
- `description`
- `labels`
- `subtasks[]`
- posiblemente `status` explícito además de la columna

### 6. Paleta de comandos

De [design/007.svg](../design/007.svg):

- búsqueda global
- navegación por acciones
- apertura rápida de tareas recientes
- atajos de teclado

**Impacto funcional**: hace falta una capa de comandos desacoplada de la UI y una fuente consultable de acciones/tareas recientes.

### 7. Empty states

De [design/008.svg](../design/008.svg):

- estado vacío sin columnas ni tareas
- CTA para crear primer tablero
- acceso desde shortcut a comandos

**Impacto funcional**: el dominio debe tolerar tablero vacío. Hoy la app asume columnas por defecto o inserción en la primera columna.

### 8. Story points mejorados

De [design/009.svg](../design/009.svg):

- selector directo de puntos
- popover contextual

**Impacto funcional**: el cambio es menor en dominio, pero requiere separar la regla de estimación Fibonacci de la UI actual basada en botones incrementales.

### 9. Responsive real

De [design/010.svg](../design/010.svg):

- navegación móvil por columna activa
- tarjeta expandida para una sola columna por vez
- botón flotante de alta rápida

**Impacto funcional**: el layout responsive no puede depender solo de `display: flex`; requiere estado de navegación de columna activa y componentes adaptativos.

### 10. Exportación

De [design/011.svg](../design/011.svg):

- exportación JSON completa
- exportación CSV plana
- estimación de tamaño

**Impacto funcional**: se necesita un servicio de exportación y adaptación de datos a múltiples formatos.

### 11. Notificaciones y undo

De [design/008.svg](../design/008.svg) y [design/012.svg](../design/012.svg):

- toasts de éxito, información y error
- acción `Deshacer`
- feedback para borrado, exportación y copiado

**Impacto funcional**: hace falta una capa de notificaciones y, al menos para algunas acciones, una estrategia de undo temporal.

## Functional gap summary

### Mantener

- CRUD básico de columnas
- CRUD básico de tareas
- drag & drop
- persistencia local
- story points

### Agregar

- descripción de tarea
- labels
- prioridad
- subtareas
- detalle de tarea en panel lateral
- vaciar tareas de una columna
- estado vacío real sin columnas obligatorias
- paleta de comandos
- exportación JSON/CSV
- notificaciones con undo
- navegación móvil por columna activa

## Impact on domain model

### Current implicit model

- `Column { id, title, tasks[] }`
- `Task { id, title, date, points }`

### Target model proposal

- `Board { id, title, columns[] }`
- `Column { id, title, taskIds[] | tasks[], kind, isArchived }`
- `Task { id, title, description, priority, labels[], storyPoints, status, updatedAt, subtaskIds[] | subtasks[] }`
- `Subtask { id, title, completed }`
- `Label { id, name, color }`
- `Notification { id, type, message, action? }`

## Architectural impact

## Why the current structure will not scale

La versión original del tablero concentraba demasiadas responsabilidades en un único componente. Hoy el principal punto de orquestación es [kanban/src/ui/board/useBoardViewModel.js](../kanban/src/ui/board/useBoardViewModel.js):

- conoce el formato de persistencia
- orquesta todas las mutaciones
- decide reglas de negocio
- controla estados visuales de modal
- prepara datos para la UI

Esto viola varios principios SOLID:

- `SRP`: demasiadas responsabilidades en un solo componente
- `OCP`: cada nueva capacidad exige editar componentes centrales
- `DIP`: la UI depende directamente de `localStorage`

## Proposed target structure

La estructura anterior funciona, pero puede resultar demasiado grande para este proyecto en su estado actual. Para este caso conviene aplicar Clean Architecture de forma pragmática: separar responsabilidades importantes sin crear demasiadas carpetas vacías ni capas ceremoniales.

## Recommended simplified structure

### Option A — recommended now

Mantener una estructura corta, con 4 capas claras:

```text
kanban/src/
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
│   ├── task/
│   ├── column/
│   ├── shared/
│   └── hooks/
├── lib/
└── test/
```

**Cuándo usarla**

- proyecto pequeño o mediano
- un solo frontend
- sin routing complejo
- sin múltiples fuentes de datos todavía

**Ventajas**

- suficiente separación para aplicar `SRP` y `DIP`
- simple de recorrer para mantenimiento diario
- evita sobreingeniería
- deja margen para crecer después

### Option B — even simpler feature-first

Si se quiere todavía menos fricción, se puede usar una estructura híbrida por feature:

```text
kanban/src/
├── core/
│   ├── domain/
│   ├── infrastructure/
│   └── shared/
├── features/
│   ├── board/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── use-cases/
│   │   └── mappers/
│   ├── task-detail/
│   ├── command-palette/
│   ├── export/
│   └── notifications/
└── test/
```

**Cuándo usarla**

- cuando el trabajo futuro se organiza claramente por features
- cuando se quiere encapsular UI + casos de uso por módulo

**Ventajas**

- favorece crecimiento incremental
- cada feature puede evolucionar con bajo acoplamiento
- muy útil para BF-002, BF-003 y capacidades nuevas

### Option C — full layered architecture

La estructura originalmente propuesta:

```text
kanban/src/
├── app/
│   ├── providers/
│   ├── router/
│   └── store/
├── domain/
│   ├── entities/
│   ├── value-objects/
│   ├── repositories/
│   └── services/
├── application/
│   ├── use-cases/
│   ├── dto/
│   └── mappers/
├── infrastructure/
│   ├── persistence/
│   ├── export/
│   └── notifications/
├── presentation/
│   ├── board/
│   ├── task-detail/
│   ├── command-palette/
│   ├── shared/
│   └── hooks/
└── test/
```

**Cuándo usarla**

- si el proyecto va a crecer bastante
- si habrá múltiples vistas, fuentes de datos o reglas complejas
- si se quiere máxima formalidad arquitectónica

**Riesgo**

- demasiado peso para la app actual
- más costo de navegación y refactor inicial

## Recommendation for this project

La recomendación para este repositorio es usar **Option A** ahora.

Motivos:

- el producto todavía es pequeño
- hay una sola SPA
- no existe backend ni routing complejo
- el principal problema actual no es escala extrema, sino mezcla de responsabilidades en pocos componentes
- BF-002 necesita orden y extensibilidad, pero no una arquitectura enterprise completa

**Decision taken**

- Se adopta `Option A` como estructura objetivo para iniciar `BF-005`
- Ya se dejó creada la estructura base en `kanban/src/` para empezar la migración incremental

## Suggested first iteration

Una primera versión razonable sería:

```text
kanban/src/
├── domain/
│   ├── models/
│   │   ├── board.js
│   │   ├── column.js
│   │   ├── task.js
│   │   ├── subtask.js
│   │   └── label.js
│   └── services/
│       └── storyPoints.js
├── application/
│   └── use-cases/
│       ├── loadBoard.js
│       ├── saveBoard.js
│       ├── createTask.js
│       ├── updateTask.js
│       ├── moveTask.js
│       ├── createColumn.js
│       ├── renameColumn.js
│       ├── clearColumnTasks.js
│       └── deleteColumn.js
├── infrastructure/
│   ├── persistence/
│   │   └── localStorageBoardRepository.js
│   ├── export/
│   └── notifications/
├── ui/
│   ├── board/
│   │   ├── BoardPage.jsx
│   │   ├── BoardView.jsx
│   │   └── useBoardViewModel.js
│   ├── column/
│   ├── task/
│   └── shared/
└── test/
```

Con esto ya se logra:

- sacar persistencia fuera de `Board.jsx`
- mover reglas de negocio a casos de uso
- dejar componentes de UI más simples
- preparar el terreno para drawer, command palette, export y toasts

La estructura base ya fue inicializada con carpetas vacías para `domain`, `application`, `infrastructure`, `ui` y `test`.

## Practical rule

Si una carpeta queda con un solo archivo durante bastante tiempo, no hace falta subdividirla más todavía. La estructura debe crecer cuando aparezca presión real, no antes.

## Initial use cases to extract

- `loadBoard()`
- `saveBoard()`
- `createTask()`
- `updateTask()`
- `deleteTask()`
- `moveTask()`
- `setTaskStoryPoints()`
- `createColumn()`
- `renameColumn()`
- `clearColumnTasks()`
- `deleteColumn()`
- `openTaskDetail()`
- `exportBoardAsJson()`
- `exportBoardAsCsv()`
- `enqueueNotification()`
- `undoLastMutation()`

## Migration strategy

### Phase 1 — Structural refactor

- mover lógica de persistencia fuera de componentes
- introducir tipos/modelos de dominio
- crear capa de casos de uso para operaciones actuales
- dejar la UI actual funcionando con adapters mínimos

### Phase 2 — UI foundation

- definir design tokens y primitives
- crear layout shell del board
- separar tarjetas, pills, badges, menús, modales, drawer, toast y popover

### Phase 3 — New functionality

- detalle de tarea
- labels y prioridad
- subtareas
- vaciar columna
- empty state
- command palette
- exportación
- undo/notificaciones

### Phase 4 — Responsive and hardening

- navegación móvil por columna
- validación de accesibilidad
- tests de dominio, integración y UI

## Testing impact

Se recomienda redistribuir la cobertura en tres niveles:

- dominio: reglas puras de transformación y validación
- aplicación: casos de uso y repositorios mockeados
- presentación: interacción de componentes clave con Vitest + React Testing Library

## Recommendation

Antes de tocar masivamente la UI, conviene iniciar `BF-005` y usarlo como base de `BF-002`. La secuencia recomendada es:

1. extraer dominio y casos de uso actuales
2. estabilizar persistencia y contratos
3. introducir componentes visuales nuevos
4. activar nuevas capacidades una por una

De esta forma el rediseño no queda acoplado a una sola pantalla grande ni a un componente monolítico.

## Sources inspected

- [design/lista.md](../design/lista.md)
- [design/001.svg](../design/001.svg)
- [design/002.svg](../design/002.svg)
- [design/003.svg](../design/003.svg)
- [design/004.svg](../design/004.svg)
- [design/005.svg](../design/005.svg)
- [design/007.svg](../design/007.svg)
- [design/008.svg](../design/008.svg)
- [design/009.svg](../design/009.svg)
- [design/010.svg](../design/010.svg)
- [design/011.svg](../design/011.svg)
- [design/012.svg](../design/012.svg)
- [kanban/src/ui/board/useBoardViewModel.js](../kanban/src/ui/board/useBoardViewModel.js)
- [kanban/src/ui/board/BoardView.jsx](../kanban/src/ui/board/BoardView.jsx)
- [kanban/src/ui/column/ColumnView.jsx](../kanban/src/ui/column/ColumnView.jsx)
- [kanban/src/ui/task/TaskCard.jsx](../kanban/src/ui/task/TaskCard.jsx)
- [kanban/src/ui/shared/board.css](../kanban/src/ui/shared/board.css)
