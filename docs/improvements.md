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
