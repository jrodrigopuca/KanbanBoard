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
- Affects: `kanban/src/ui/board/useBoardViewModel.js`, `kanban/src/ui/column/ColumnView.jsx`

**Summary**

Se agregó soporte para editar y eliminar columnas del tablero. La eliminación ahora requiere una confirmación explícita mediante modal, dado que también elimina todas las cards de la columna.

**Why it matters**

Esta mejora completa la administración de columnas desde la interfaz y evita depender de limpiar manualmente el `localStorage` para reorganizar la estructura del tablero.

**Current evidence**

- `kanban/src/ui/board/useBoardViewModel.js` — expone handlers de creación, renombre y eliminación de columnas
- `kanban/src/ui/column/ColumnView.jsx` — la UI actual renderiza el título y acciones de administración

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

---

### BF-002: Mejora visual del tablero

- Type: `feature`
- Status: `done`
- Priority: `high`
- Affects: `kanban/src/ui/shared/board.css`, `kanban/src/App.css`, `kanban/src/ui/board/BoardView.jsx`, `kanban/src/ui/column/ColumnView.jsx`, `kanban/src/ui/task/TaskCard.jsx`

**Summary**

Rediseñar visualmente el tablero tomando como referencia patrones de GitHub Projects y JIRA: jerarquía visual más clara, columnas con mejor separación, tarjetas con metadata más legible y acciones menos invasivas.

**Why it matters**

Una mejora visual aumentaría la legibilidad del tablero, facilitaría el escaneo rápido de tareas y acercaría la experiencia a herramientas de gestión ya familiares para los usuarios.

**Current evidence**

- `kanban/src/ui/shared/board.css` — el layout y la paleta actual son funcionales, pero todavía básicos y con poco énfasis visual entre columna, card, metadata y acciones
- `kanban/src/ui/task/TaskCard.jsx` — la tarjeta concentra fecha, puntos y acciones en un espacio reducido, sin estados visuales avanzados
- `kanban/src/ui/column/ColumnView.jsx` — el encabezado de columna muestra información mínima y todavía no incorpora elementos visuales comparables a tableros modernos

**Possible acceptance criteria**

- Se redefine la identidad visual general del tablero con una guía consistente de color, espaciado y tipografía
- Las columnas y cards mejoran su jerarquía visual y legibilidad
- Las acciones de tarjeta y columna se integran de forma más clara y menos intrusiva
- El diseño toma inspiración visible de GitHub Projects y JIRA sin copiar interfaces literalmente
- Los estados de hover, drag & drop y edición mantienen consistencia visual

**Notes**

- Conviene definir primero un sistema simple de tokens visuales antes de rehacer componentes
- Puede ser útil separar estilos base, layout y estados interactivos para facilitar mantenimiento

**Progress so far**

- Se creó una primera base visual nueva sobre `kanban/src/ui/shared/board.css` con tokens de color, superficies, estados y elevación
- `kanban/src/ui/board/BoardView.jsx` ahora presenta un shell más claro con hero superior, métricas rápidas y formularios integrados al layout
- `kanban/src/ui/column/ColumnView.jsx` mejoró jerarquía visual en encabezados y badges de contexto
- `kanban/src/ui/task/TaskCard.jsx` separa mejor metadata, acciones y puntos de historia para acercarse a un patrón más tipo GitHub Projects / JIRA
- Se agregó un empty state real para tableros sin columnas y para workflows sin cards, con recuperación del tablero base desde la UI
- Se incorporó un primer drawer de detalle para tasks con edición de título, descripción y story points desde una vista lateral
- El drawer de detalle ahora soporta prioridad y labels, y las cards reflejan esa metadata visualmente en el tablero
- El drawer de detalle ahora soporta subtareas con alta, marcado y eliminación, y las cards muestran progreso resumido de ejecución
- Se agregaron acciones de exportación JSON/CSV desde el board para descargar el estado actual con metadata extendida de tasks
- Se agregó feedback tipo toast para acciones relevantes y undo inmediato para eliminaciones de tasks o columnas
- Se agregó una primera command palette con atajo `⌘K`/`Ctrl+K`, búsqueda de acciones globales y apertura rápida de detalles de tasks
- La command palette ahora permite navegar resultados con flechas y ejecutar el comando activo con Enter

**Impact analysis available**

- Se revisó la propuesta visual en [design/lista.md](../design/lista.md)
- El análisis funcional y técnico quedó documentado en [docs/bf-002-impact-analysis.md](bf-002-impact-analysis.md)
- BF-002 deja de ser solo visual: la propuesta introduce nuevas capacidades funcionales y exige reestructurar el frontend para desacoplar dominio, casos de uso y presentación

**Closure review**

- La identidad visual principal ya fue reemplazada por un shell moderno con hero, métricas, tarjetas elevadas y estados consistentes
- El board ya incluye detalle de task, labels, prioridad, subtareas, exportación, toasts y command palette, por lo que el rediseño dejó de ser solo cosmético y quedó materializado en la UI actual
- La validación reciente mantiene `npm test` y `npm run build` pasando sobre la implementación activa

---

### BF-003: Soporte responsive

- Type: `feature`
- Status: `done`
- Priority: `high`
- Affects: `kanban/src/ui/shared/board.css`, `kanban/src/ui/board/BoardView.jsx`, `kanban/src/ui/column/ColumnView.jsx`

**Summary**

Adaptar la interfaz para funcionar correctamente en tablet y mobile, manteniendo usabilidad en el tablero, formularios y modal de confirmación.

**Why it matters**

Actualmente el tablero está pensado principalmente para pantallas amplias. Un comportamiento responsive mejoraría accesibilidad y permitiría revisar o gestionar tareas desde dispositivos más pequeños.

**Current evidence**

- `kanban/src/ui/shared/board.css` — `.kanban-board` usa `display: flex` sin reglas responsive ni wrap condicional
- `kanban/src/ui/shared/board.css` — `.column` depende de `flex: 1` y `min-width: 200px`, lo que puede forzar desbordes en pantallas angostas
- `kanban/src/ui/shared/board.css` — los formularios y controles usan anchos fijos o proporcionales sin breakpoints dedicados

**Possible acceptance criteria**

- El tablero se adapta correctamente a desktop, tablet y mobile
- Las columnas pueden apilarse o desplazarse horizontalmente de forma controlada
- Inputs, acciones y modal siguen siendo utilizables en pantallas pequeñas
- No aparece overflow horizontal no intencional en la vista principal
- La experiencia de drag & drop mantiene un comportamiento razonable en anchos reducidos

**Notes**

- Hace falta decidir si en mobile conviene scroll horizontal por columnas o layout apilado vertical
- También conviene revisar áreas táctiles mínimas para botones y acciones

**Progress so far**

- Se agregó una región específica para el tablero en `kanban/src/ui/board/BoardView.jsx` con contexto visual y hint de interacción
- `kanban/src/ui/shared/board.css` ahora soporta scroll horizontal controlado para columnas en pantallas intermedias y compactas
- Las acciones de task dejan de depender solo de `hover` en dispositivos táctiles o viewports reducidos
- Inputs, botones, stats y cards ajustan su layout en breakpoints pequeños para evitar overflow accidental

**Closure review**

- El tablero responde hoy con layouts adaptativos, scroll horizontal de columnas y densidad reducida en pantallas pequeñas
- Los controles principales del board, drawer, modal y toast ya contemplan breakpoints compactos
- BF-003 puede darse por cumplido para la iteración actual, aunque futuras mejoras visuales podrían seguir refinando mobile

---

### BF-004: Actualización de dependencias

- Type: `technical-improvement`
- Status: `done`
- Priority: `medium`
- Affects: `kanban/package.json`

**Summary**

Revisar y actualizar dependencias del proyecto para reducir deuda técnica, mejorar compatibilidad futura y preparar una posible modernización del stack.

**Why it matters**

El proyecto depende de versiones específicas de Create React App y de librerías con mantenimiento limitado o con fricción en React. Mantener dependencias actualizadas reduce riesgo operativo y facilita mejoras posteriores.

**Current evidence**

- `kanban/package.json` — el proyecto migró a `vite` para reemplazar `react-scripts` y modernizar el tooling
- `kanban/package.json` — la migración inicial de drag & drop reemplaza `react-beautiful-dnd` archivado por `@hello-pangea/dnd`, fork mantenido y compatible con el mismo modelo de integración
- `kanban/package.json` — las dependencias de testing y soporte pueden revisarse para compatibilidad y versiones actuales

**Progress so far**

- Se inició la modernización eliminando la dependencia de `react-beautiful-dnd`
- La integración del tablero se migró a `@hello-pangea/dnd` para reducir riesgo y mantener cambios acotados
- Se actualizaron `react`, `react-dom`, `@testing-library/jest-dom`, `@testing-library/react`, `@testing-library/user-event` y `web-vitals`
- Se eliminó `uuid` y se reemplazó por generación de IDs con `crypto.randomUUID()`
- Se reactivó `React.StrictMode` y el proyecto siguió pasando tests y build
- El proyecto vuelve a compilar y pasar tests tras estos cambios
- `npm audit fix` redujo la superficie reportada de 56 a 26 vulnerabilidades, aunque persisten issues arrastrados por `react-scripts`
- Se migró de Create React App a Vite manteniendo `npm start`, salida en `build/` y base de despliegue `/kanban/`
- La suite de tests se movió de Jest heredado de CRA a Vitest
- `npm audit` pasó a reportar `0` vulnerabilidades tras reinstalar dependencias sobre el nuevo stack

**Possible acceptance criteria**

- Se ejecuta una auditoría de dependencias y se documenta el plan de actualización
- Se actualizan dependencias seguras de bajo riesgo
- Se evalúa migración de librerías con mantenimiento limitado, especialmente drag & drop
- El proyecto sigue compilando y pasando tests tras la actualización
- Se documentan breaking changes y pasos de migración necesarios

**Notes**

- La migración a Vite resuelve la dependencia directa en `react-scripts` y deja el proyecto listo para una nueva auditoría
- La auditoría posterior a la migración confirma `0` vulnerabilidades en el árbol actual

**Security review update (before migration)**

- `npm outdated --json` devuelve `{}`: las dependencias directas del proyecto ya están en su última versión publicada
- `react-scripts` sigue en `5.0.1` y no tiene una versión más nueva disponible; hoy es la principal fuente de la deuda de seguridad restante
- Las 26 vulnerabilidades reportadas por `npm audit` provienen mayormente de dependencias transitivas arrastradas por CRA:
  - cadena de build SVG/minificación: `@svgr/webpack` → `@svgr/plugin-svgo` → `svgo` → `css-select` → `nth-check`
  - cadena de minificación: `css-minimizer-webpack-plugin` / `workbox-build` → `serialize-javascript`
  - cadena de estilos: `resolve-url-loader` → `postcss`
  - cadena de testing heredada: `jest@27` / `jsdom` / `http-proxy-agent` / `@tootallnate/once`
  - utilidades legacy del toolchain: `bfj` → `jsonpath` → `underscore`
  - servidor de desarrollo: `webpack-dev-server`
- En varios casos, `npm audit` solo ofrece `fixAvailable` mediante un cambio mayor o no resoluble dentro de `react-scripts`, por lo que no existe un parche in-place de bajo riesgo

**Closure implemented**

- Se reemplazó `react-scripts` por `vite@7.3.1` y `@vitejs/plugin-react@5.1.4`
- Se reemplazó el runner de tests heredado por `vitest@3.2.4` con entorno `jsdom`
- Se preservó el directorio de salida `build/` para reducir impacto en documentación y despliegue
- La nueva instalación reduce la auditoría a `0` vulnerabilidades reportadas por `npm audit`

## Sources Inspected

- `docs/known-issues.md` — origen del BF-001 como backlog funcional
- `kanban/src/ui/board/useBoardViewModel.js` — manejo actual de columnas
- `kanban/src/ui/column/ColumnView.jsx` — render actual de la UI de columnas
- `kanban/src/App.test.js` — cobertura de renombre y eliminación con confirmación
- `kanban/src/ui/shared/board.css` — layout visual actual y limitaciones responsive
- `kanban/src/ui/task/TaskCard.jsx` — estructura visual actual de las tarjetas
- `kanban/package.json` — dependencias actuales y tooling base

---

### BF-005: Refactor a Clean Architecture y SOLID

- Type: `technical-improvement`
- Status: `active`
- Priority: `high`
- Affects: `kanban/src/`

**Summary**

Reorganizar el frontend para separar reglas de negocio, casos de uso, adapters de persistencia y componentes de UI. El objetivo es soportar el rediseño de BF-002 sin seguir concentrando toda la lógica en `Board.jsx`.

**Why it matters**

La propuesta visual ya no es solamente un ajuste cosmético. Introduce detalle de tareas, labels, subtareas, exportación, toasts, command palette y estados vacíos, por lo que conviene desacoplar responsabilidades antes de ampliar más la UI.

**Current evidence**

- `kanban/src/ui/board/useBoardViewModel.js` concentra la orquestación actual del tablero mientras la migración sigue en progreso
- `kanban/src/ui/column/ColumnView.jsx` encapsula la edición inline y acciones de columna
- `kanban/src/ui/task/TaskCard.jsx` concentra interacción local de edición y cambio de story points

**Progress so far**

- Se creó la estructura base `Option A` en `kanban/src/`
- Se extrajo la persistencia a `kanban/src/infrastructure/persistence/localStorageBoardRepository.js`
- Se extrajeron casos de uso iniciales a `kanban/src/application/use-cases/`
- Se movieron los modelos iniciales a `kanban/src/domain/models/`
- Se creó `kanban/src/ui/board/useBoardViewModel.js` para desacoplar estado y acciones de la vista
- Se creó `kanban/src/ui/board/BoardView.jsx` como capa de presentación del board
- `kanban/src/App.js` ya consume `kanban/src/ui/board/BoardPage.jsx` como nueva entrada de UI
- Se migraron columna y tarea a `kanban/src/ui/column/ColumnView.jsx` y `kanban/src/ui/task/TaskCard.jsx`
- La regla de story points quedó centralizada en `kanban/src/domain/services/storyPoints.js`
- Se agregaron servicios de dominio para metadata de task y subtareas
- Los estilos compartidos del board pasaron a `kanban/src/ui/shared/board.css`
- El board dejó de pasar un objeto genérico `taskFunctions` y ahora usa handlers explícitos de tarea
- Se eliminaron los wrappers temporales de `kanban/src/component/`
- Se sumaron adapters y casos de uso para exportación, además de nuevas superficies de UI como drawer, toast y command palette
- La suite de tests y el build siguen pasando tras esta primera etapa

**Proposed acceptance criteria**

- Se definen entidades y modelos de dominio (`Board`, `Column`, `Task`, `Subtask`, `Label`)
- Los casos de uso se separan de la capa de presentación
- La persistencia en `localStorage` queda detrás de un repositorio o gateway
- La UI consume view models o hooks de aplicación en lugar de mutar estado de dominio directamente
- La suite de tests se redistribuye entre dominio, aplicación y presentación

**Notes**

- La primera etapa debe priorizar estructura y contratos, sin intentar resolver todas las pantallas nuevas en el mismo cambio
- BF-005 habilita implementar BF-002 y BF-003 con menor acoplamiento
- Se adoptó la estructura simplificada `Option A` documentada en [docs/bf-002-impact-analysis.md](bf-002-impact-analysis.md)
- La estructura base ya fue creada en `kanban/src/` para iniciar la migración por etapas

**Remaining gaps to close BF-005**

- La suite de tests sigue concentrada principalmente en [kanban/src/App.test.js](../kanban/src/App.test.js) y aún no se redistribuye por dominio/aplicación/presentación
- No existe todavía un modelo explícito de `Label` ni un agregado `Board` completo más allá de helpers y estructuras normalizadas
- El manejo de notificaciones funciona desde el view model, pero todavía no está desacoplado en un adapter o servicio específico dentro de `infrastructure/notifications/`

---

### BF-006: Revisión de consistencia UI/UX

- Type: `feature`
- Status: `done`
- Priority: `high`
- Affects: `kanban/src/ui/board/BoardView.jsx`, `kanban/src/ui/column/ColumnView.jsx`, `kanban/src/ui/task/TaskCard.jsx`, `kanban/src/ui/task/TaskDetailDrawer.jsx`, `kanban/src/ui/board/CommandPalette.jsx`, `kanban/src/ui/shared/board.css`, `kanban/src/ui/board/useBoardViewModel.js`

**Summary**

Revisión completa del frontend que detecta inconsistencias de UI/UX acumuladas tras las iteraciones de BF-001 a BF-005: redundancias visuales, texto en idioma incorrecto, código inalcanzable, patrones de interacción divergentes entre componentes y falta de cierre en menús y notificaciones.

**Why it matters**

Las inconsistencias erosionan la confianza del usuario en la aplicación y aumentan la fricción al interactuar con el tablero. Resolverlas mejoraría la coherencia visual, reduciría confusión y eliminaría código muerto que dificulta el mantenimiento.

**Current evidence**

A continuación se documentan las inconsistencias detectadas, agrupadas por categoría.

---

#### A — Redundancias de información

**A.1 — Conteo de tareas duplicado en el encabezado de columna**

- Archivo: `kanban/src/ui/column/ColumnView.jsx`
- El encabezado de cada columna muestra el conteo de tareas **dos veces** en la misma zona visual:
  - En `column-count-badge`: `{tasks.length} {tasks.length === 1 ? "card" : "cards"}`
  - En el `<h2>` del título: `{title} ({tasks.length})`
- **Corrección sugerida**: eliminar el conteo del `<h2>` y dejar el badge como fuente única, o viceversa

**A.2 — Chip "Workflow" estático sin valor informativo**

- Archivo: `kanban/src/ui/column/ColumnView.jsx`
- Cada columna muestra un `<span className="column-chip">Workflow</span>` que siempre dice lo mismo
- En contraste, el drawer de detalle usa la misma clase `column-chip` para mostrar el nombre real de la columna, lo cual sí aporta contexto
- **Corrección sugerida**: eliminar el chip estático o reemplazarlo por información variable (tipo de columna, posición en el workflow)

**A.3 — Puntos de acceso redundantes para exportación**

- Archivo: `kanban/src/ui/board/BoardView.jsx`
- Existen tres caminos superpuestos para exportar:
  1. La card de exportación en el toolbar con botón "Open export"
  2. La command palette ofrece "Export board as JSON", "Export board as CSV" **y** "Open export options"
  3. La card de exportación además tiene un botón "Open commands" que abre la command palette
- **Corrección sugerida**: reducir a dos caminos claros (modal de exportación y command palette con acciones directas), eliminar el botón "Open commands" de la card de exportación

---

#### B — Mezcla de idiomas

**B.1 — Placeholders en español dentro de una UI en inglés**

- Archivo: `kanban/src/ui/board/BoardView.jsx`
- El input del compositor de tareas tiene placeholder `"Configurar entorno de"` (español, además truncado)
- El input del compositor de columnas tiene placeholder `"ARCHIVAD"` (español, truncado — probablemente "ARCHIVADO")
- Todo el resto de la UI (labels, headings, botones, modals, toasts, drawer) está en inglés
- **Corrección sugerida**: unificar placeholders al mismo idioma que el resto de la interfaz (ej. `"Set up environment..."` y `"ARCHIVED"`)

**B.2 — Branding cambia entre mobile y desktop**

- Archivo: `kanban/src/ui/board/BoardView.jsx`
- Mobile header: `"ProjectFlow"` con subtítulo `"Focused delivery"`
- Desktop hero: `"Kanban Board"` con eyebrow `"Focused delivery workspace"`
- El nombre de producto es diferente según el viewport
- **Corrección sugerida**: unificar el nombre del producto en ambos layouts

---

#### C — Código inalcanzable

**C.1 — Modo de edición inline en TaskCard sin trigger visible**

- Archivo: `kanban/src/ui/task/TaskCard.jsx`
- El componente mantiene estado `isEditing` y renderiza un bloque de edición inline con input, botón "Save task" y "Cancel edit"
- Sin embargo, ningún botón ni interacción en el estado no-editando establece `setIsEditing(true)`, por lo que el modo de edición es **código muerto inalcanzable**
- **Corrección sugerida**: agregar un botón "Edit" en la barra de acciones de la card, o eliminar el bloque de edición inline si se prefiere que la edición ocurra exclusivamente en el drawer

**C.2 — `canDeleteColumn` siempre `true`**

- Archivo: `kanban/src/ui/board/BoardView.jsx`
- Se pasa `canDeleteColumn` como prop booleano sin valor: `<ColumnView ... canDeleteColumn />`, lo cual equivale a `canDeleteColumn={true}` en todas las columnas
- La intención original era deshabilitar la eliminación cuando solo queda una columna, pero la lógica quedó desconectada
- **Corrección sugerida**: restaurar la lógica condicional (`canDeleteColumn={columns.length > 1}`) o eliminar la prop si la restricción ya no aplica

---

#### D — Patrones de interacción divergentes

**D.1 — Confirmación de eliminación inconsistente**

- Eliminar una columna → modal de confirmación
- Limpiar tareas de una columna → modal de confirmación
- Eliminar una tarea desde la card → eliminación inmediata + toast con undo
- Eliminar una tarea desde el drawer → eliminación inmediata + toast con undo
- Las acciones destructivas no siguen un patrón uniforme; el usuario no puede predecir si habrá confirmación o no
- **Corrección sugerida**: definir una política clara (ej. eliminaciones con pérdida masiva → modal, eliminaciones unitarias → undo toast) y documentarla

**D.2 — Story points: guardado inmediato vs. guardado explícito en el drawer**

- Archivo: `kanban/src/ui/task/TaskDetailDrawer.jsx`
- Los campos de título, descripción, prioridad, labels y subtareas requieren click en "Save task" para persistir
- Los story points se guardan **inmediatamente** al clickear la grilla o los botones "Lower estimate"/"Raise estimate" (llaman a `onSaveTask` directo)
- Esto mezcla dos modelos de persistencia en la misma superficie
- **Corrección sugerida**: unificar el modelo — o todos los campos se guardan al interactuar, o todos requieren save explícito

**D.3 — Doble patrón de edición de story points**

- En TaskCard: popover con grilla de selección disparado desde el badge de puntos
- En TaskDetailDrawer: grilla de selección **más** botones "Lower estimate"/"Raise estimate"
- Son dos patrones de interacción diferentes para la misma operación
- **Corrección sugerida**: adoptar un único patrón (grilla directa) y eliminar los botones de incremento/decremento, o viceversa

**D.4 — Icono `＋` para "Open details" sugiere "Add" en vez de "Open"**

- Archivo: `kanban/src/ui/task/TaskCard.jsx`
- El botón de abrir detalles usa un signo `＋` (fullwidth plus) que convencionalmente indica "crear/agregar", no "abrir/expandir"
- **Corrección sugerida**: reemplazar por un icono de expansión o flecha (ej. `→`, `⤢`, o un chevron)

---

#### E — Menus y overlays sin cierre exterior

**E.1 — Menú de acciones de columna no se cierra al hacer click fuera**

- Archivo: `kanban/src/ui/column/ColumnView.jsx`
- El menú de acciones (`isActionsMenuOpen`) solo se cierra al hacer click en el botón `···` de nuevo o al seleccionar una acción
- Hacer click fuera del menú lo deja abierto, lo cual es inconsistente con el comportamiento estándar de dropdowns

**E.2 — Popover de story points no se cierra al hacer click fuera**

- Archivo: `kanban/src/ui/task/TaskCard.jsx`
- El popover `isPointsSelectorOpen` solo se cierra al seleccionar un valor o al clickear el trigger de nuevo
- Mismo problema que E.1

**E.3 — Backdrop de modales no cierra al hacer click**

- Archivo: `kanban/src/ui/board/BoardView.jsx`
- Los modales de confirmación (delete column, clear column) y el modal de exportación usan un backdrop con `role="presentation"` pero no tienen handler `onClick` para cerrar al clickear fuera
- El drawer de detalle y la command palette tampoco cierran al hacer click en el backdrop
- **Corrección sugerida**: agregar `onClick` en los backdrops que cierre el overlay correspondiente, con `stopPropagation` en el contenido para evitar cierre accidental

---

#### F — Notificaciones sin auto-dismiss

**F.1 — Toast no desaparece automáticamente**

- Archivo: `kanban/src/ui/board/BoardView.jsx`, `kanban/src/ui/board/useBoardViewModel.js`
- El toast permanece visible indefinidamente hasta que el usuario hace click en "Dismiss" o "Undo"
- Un nuevo toast reemplaza al anterior, pero si no hay nueva acción, el toast viejo persiste
- **Corrección sugerida**: agregar timeout de auto-dismiss (ej. 6–8 segundos), cancelable si el usuario interactúa con el toast

---

#### G — Labels de botones inconsistentes en overlays

**G.1 — Texto del botón de cierre varía entre overlays**

- Command palette: `"Close"`
- Task drawer: `"Close details"`
- Export modal: `"Close export"` (aparece dos veces: header y footer)
- Modal de delete column: `"Cancel"`
- Modal de clear column: `"Cancel"`
- **Corrección sugerida**: unificar la convención — `"Cancel"` para modales con acción pendiente, `"Close"` para overlays informativos o de edición

---

#### H — CSS con duplicaciones menores

**H.1 — Regla duplicada para `.toast-card` en media query 720px**

- Archivo: `kanban/src/ui/shared/board.css`
- Dentro de `@media (max-width: 720px)`, `.toast-card` aparece dos veces con `min-width: 0; max-width: none;`:
  - Una vez agrupado: `.command-palette, .toast-card, .export-modal { min-width: 0; max-width: none; }`
  - Otra vez individual: `.toast-card { min-width: 0; max-width: none; }`
- **Corrección sugerida**: eliminar la regla individual redundante

**H.2 — Prefix `is-` inconsistente en clases de estado**

- Estados que usan `is-`: `is-active`, `is-selected`, `is-complete`, `is-danger`, `is-primary`
- Estados que no lo usan: `dragging`, `dragging-over`, `compact`
- **Corrección sugerida**: adoptar una convención uniforme para clases de estado (ej. todas con `is-` o sin él)

---

**Proposed acceptance criteria**

- Se eliminan las redundancias de información en el encabezado de columna y la card de exportación
- Los placeholders y el branding usan un idioma consistente con el resto de la UI
- Se elimina o reactiva el código inalcanzable de edición inline en TaskCard y la prop `canDeleteColumn`
- Los patrones de confirmación ante eliminación siguen una política documentada
- El modelo de persistencia en el drawer es uniforme entre story points y el resto de los campos
- Menús, popovers y backdrops se cierran al hacer click fuera
- El toast implementa auto-dismiss con timeout configurable
- Los labels de cierre en overlays siguen una convención unificada
- Se eliminan duplicaciones en el CSS y se unifica la convención de clases de estado

**Notes**

- Varias de estas inconsistencias provienen de haber iterado BF-001 a BF-005 de forma incremental sin una revisión transversal de UI/UX
- Se recomienda resolver por categoría: primero redundancias y código muerto (bajo riesgo), luego interacciones y overlays (riesgo medio), y finalmente unificación de patrones de guardado (riesgo alto)
- Cualquier cambio de idioma debe decidirse con intención: si la audiencia objetivo es hispanohablante, migrar toda la UI a español; si no, mantener inglés consistente

**Deletion confirmation policy (D.1)**

- Eliminación con pérdida masiva (columna completa, limpiar columna) → modal de confirmación explícito antes de ejecutar
- Eliminación unitaria (una tarea) → eliminación inmediata con toast de undo y atajo `⌘Z`
- Esta política queda documentada como convención del proyecto para futuras acciones destructivas

**Deferred — H.2 Prefix `is-` inconsistente**

- Las clases de estado mezclan prefijo `is-` (`is-active`, `is-selected`, `is-complete`, `is-danger`, `is-primary`) con clases sin prefijo (`dragging`, `dragging-over`, `compact`)
- Se difiere la normalización porque requeriría cambios coordinados entre CSS, JSX y tests sin impacto funcional directo
- Se adopta como convención futura usar `is-` para estados booleanos toggleable y dejar sin prefijo los estados de contexto (drag state, layout variant)

**Closure review**

Todas las inconsistencias detectadas fueron resueltas excepto H.2 (diferido):

- **A.1** — Se eliminó el conteo duplicado del `<h2>` en columnas, dejando solo el `column-count-badge`
- **A.2** — Se eliminó el chip estático "Workflow" de todas las columnas
- **A.3** — Se simplificaron los accesos de exportación: se eliminó el botón "Open commands" de la card y el comando "Open export options" de la palette
- **B.1** — Los placeholders se unificaron al inglés (`"Set up CI environment..."`, `"ARCHIVED"`)
- **B.2** — El branding mobile ahora muestra "Kanban Board" en vez de "ProjectFlow"
- **C.1** — Se eliminó el código muerto de edición inline en TaskCard (estado `isEditing`, bloque condicional completo)
- **C.2** — Se eliminó la prop `canDeleteColumn` que siempre era `true`; el empty state con "Restore starter board" cubre el escenario de tablero sin columnas
- **D.1** — Se documentó la política de confirmación de eliminación
- **D.2** — Los story points en el drawer ahora usan estado local y se persisten solo al hacer click en "Save task", como el resto de los campos
- **D.3** — Se eliminaron los botones "Lower estimate"/"Raise estimate" del drawer, dejando solo la grilla directa de selección
- **D.4** — El icono de "Open details" pasó de `＋` (sugiere "add") a `→` (sugiere "open/expand")
- **E.1** — El menú de acciones de columna se cierra al hacer click fuera
- **E.2** — El popover de story points en las cards se cierra al hacer click fuera
- **E.3** — Todos los backdrops (modales, drawer, command palette) cierran al hacer click fuera del contenido
- **F.1** — El toast implementa auto-dismiss tras 6 segundos, cancelable si el usuario interactúa antes
- **G.1** — Los labels de cierre siguen la convención: "Cancel" en modales con acción pendiente, "Close" en overlays de edición/consulta
- **H.1** — Se eliminó la regla CSS duplicada de `.toast-card` en el breakpoint 720px
- La suite de tests y el build siguen pasando tras todos los cambios (`npm test` 15/15, `npm run build` OK)

---

### BF-007: Mover tareas entre columnas en mobile

- Type: `feature`
- Status: `done`
- Priority: `critical`
- Affects: `kanban/src/ui/board/useBoardViewModel.js`, `kanban/src/ui/board/BoardPage.jsx`, `kanban/src/ui/board/BoardView.jsx`, `kanban/src/ui/column/ColumnView.jsx`, `kanban/src/ui/task/TaskCard.jsx`, `kanban/src/ui/task/TaskDetailDrawer.jsx`, `kanban/src/ui/shared/board.css`

**Summary**

En mobile el tablero muestra una sola columna a la vez, lo que hacía imposible el drag & drop entre columnas. No existía ningún mecanismo alternativo para mover tareas. Se implementaron dos soluciones complementarias: un selector de columna en el drawer de detalle y botones de movimiento rápido en cada card visible solo en mobile.

**Why it matters**

Mover tareas entre columnas es la operación fundamental de un tablero Kanban. Sin ella, la interfaz mobile era funcionalmente incompleta: el usuario podía ver tareas pero no avanzarlas a través del workflow.

**Current evidence (before fix)**

- `kanban/src/ui/board/BoardView.jsx` — el layout mobile (`mobile-focused-board`) oculta todas las columnas excepto la activa con `mobile-column-hidden`, imposibilitando el drag & drop entre columnas
- `kanban/src/ui/task/TaskDetailDrawer.jsx` — mostraba `task.columnTitle` como chip de solo lectura sin posibilidad de cambiar la columna
- `kanban/src/ui/task/TaskCard.jsx` — no tenía ningún control para mover la tarea a otra columna

**Implemented behavior**

1. **Selector de columna en el drawer de detalle**: el chip estático de columna fue reemplazado por un `<select>` que lista todas las columnas del tablero. Al cambiar la selección, la tarea se mueve inmediatamente a la columna destino (posición 0).

2. **Botones de movimiento rápido en cards (mobile-only)**: cada tarjeta muestra una barra inferior con botones "← Columna anterior" y "Columna siguiente →" visibles solo en viewports ≤720px. Los botones se omiten cuando no hay columna adyacente en esa dirección.

3. **Handler centralizado `handleMoveTaskToColumn`**: nuevo caso de uso en el view model que localiza la tarea en su columna origen, construye un objeto `result` compatible con `moveTask` y la reubica en la posición 0 de la columna destino.

**Acceptance criteria**

- El usuario puede mover una tarea a cualquier columna desde el drawer de detalle en cualquier viewport
- El usuario puede mover una tarea a la columna adyacente directamente desde la card en mobile
- Los botones de movimiento rápido no aparecen en desktop
- La tarea aparece al inicio de la columna destino tras el movimiento
- El estado persiste correctamente en `localStorage`
- El drag & drop en desktop no se ve afectado

**Notes**

- El selector del drawer funciona en todos los viewports, no solo mobile, lo que también mejora la experiencia en tablet
- Los botones de movimiento rápido usan CSS `display: none` por defecto y `display: flex` dentro de `@media (max-width: 720px)` para evitar lógica JS adicional
- El handler reutiliza el caso de uso `moveTask` existente construyendo un `result` equivalente al de drag & drop
- `npm run build` pasa correctamente tras la implementación
