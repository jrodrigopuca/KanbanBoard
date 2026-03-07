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

---

### BF-002: Mejora visual del tablero

- Type: `feature`
- Status: `candidate`
- Priority: `high`
- Affects: `kanban/src/component/styles.css`, `kanban/src/App.css`, `kanban/src/component/Board.jsx`, `kanban/src/component/Column.jsx`, `kanban/src/component/Task.jsx`

**Summary**

Rediseñar visualmente el tablero tomando como referencia patrones de GitHub Projects y JIRA: jerarquía visual más clara, columnas con mejor separación, tarjetas con metadata más legible y acciones menos invasivas.

**Why it matters**

Una mejora visual aumentaría la legibilidad del tablero, facilitaría el escaneo rápido de tareas y acercaría la experiencia a herramientas de gestión ya familiares para los usuarios.

**Current evidence**

- `kanban/src/component/styles.css` — el layout y la paleta actual son funcionales, pero todavía básicos y con poco énfasis visual entre columna, card, metadata y acciones
- `kanban/src/component/Task.jsx` — la tarjeta concentra fecha, puntos y acciones en un espacio reducido, sin estados visuales avanzados
- `kanban/src/component/Column.jsx` — el encabezado de columna muestra información mínima y todavía no incorpora elementos visuales comparables a tableros modernos

**Possible acceptance criteria**

- Se redefine la identidad visual general del tablero con una guía consistente de color, espaciado y tipografía
- Las columnas y cards mejoran su jerarquía visual y legibilidad
- Las acciones de tarjeta y columna se integran de forma más clara y menos intrusiva
- El diseño toma inspiración visible de GitHub Projects y JIRA sin copiar interfaces literalmente
- Los estados de hover, drag & drop y edición mantienen consistencia visual

**Notes**

- Conviene definir primero un sistema simple de tokens visuales antes de rehacer componentes
- Puede ser útil separar estilos base, layout y estados interactivos para facilitar mantenimiento

---

### BF-003: Soporte responsive

- Type: `feature`
- Status: `candidate`
- Priority: `high`
- Affects: `kanban/src/component/styles.css`, `kanban/src/component/Board.jsx`, `kanban/src/component/Column.jsx`

**Summary**

Adaptar la interfaz para funcionar correctamente en tablet y mobile, manteniendo usabilidad en el tablero, formularios y modal de confirmación.

**Why it matters**

Actualmente el tablero está pensado principalmente para pantallas amplias. Un comportamiento responsive mejoraría accesibilidad y permitiría revisar o gestionar tareas desde dispositivos más pequeños.

**Current evidence**

- `kanban/src/component/styles.css` — `.kanban-board` usa `display: flex` sin reglas responsive ni wrap condicional
- `kanban/src/component/styles.css` — `.column` depende de `flex: 1` y `min-width: 200px`, lo que puede forzar desbordes en pantallas angostas
- `kanban/src/component/styles.css` — los formularios y controles usan anchos fijos o proporcionales sin breakpoints dedicados

**Possible acceptance criteria**

- El tablero se adapta correctamente a desktop, tablet y mobile
- Las columnas pueden apilarse o desplazarse horizontalmente de forma controlada
- Inputs, acciones y modal siguen siendo utilizables en pantallas pequeñas
- No aparece overflow horizontal no intencional en la vista principal
- La experiencia de drag & drop mantiene un comportamiento razonable en anchos reducidos

**Notes**

- Hace falta decidir si en mobile conviene scroll horizontal por columnas o layout apilado vertical
- También conviene revisar áreas táctiles mínimas para botones y acciones

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
- `kanban/src/component/Board.jsx` — manejo actual de columnas
- `kanban/src/component/Column.jsx` — render actual de la UI de columnas
- `kanban/src/App.test.js` — cobertura de renombre y eliminación con confirmación
- `kanban/src/component/styles.css` — layout visual actual y limitaciones responsive
- `kanban/src/component/Task.jsx` — estructura visual actual de las tarjetas
- `kanban/package.json` — dependencias actuales y tooling base
