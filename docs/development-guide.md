# Development Guide

## Scope

- Target: repositorio completo
- Docs location: `docs/`

## Confidence Note

- **Confirmed** from repository evidence: scripts de npm, dependencias, estructura de carpetas, configuración de ESLint y browserslist
- **Needs confirmation**: no se encontró archivo `.env`, `.nvmrc` ni configuración de CI/CD

## Prerequisites

- **Node.js** versión 16+ (recomendado 18+ para compatibilidad con React 18)
- **npm** versión 8+ (incluido con Node.js)
- Un navegador moderno (Chrome, Firefox, Safari o Edge)

## Setup

```bash
# Clonar el repositorio
git clone <repo-url>
cd KanbanBoard

# Instalar dependencias
cd kanban
npm install
```

## Environment Variables

No se encontró archivo `.env` ni `.env.example` en el repositorio. La aplicación no requiere variables de entorno para funcionar localmente.

| Variable   | Descripción                       | Requerida | Default                     |
| ---------- | --------------------------------- | --------- | --------------------------- |
| `PORT`     | Puerto del servidor de desarrollo | No        | `3000`                      |
| `HOMEPAGE` | URL base para producción          | No        | `https://yardev.net/kanban` |

> **Inferred**: `HOMEPAGE` está configurado en `package.json` y afecta las rutas del build de producción.

## Running Locally

```bash
cd kanban
npm start
```

Disponible en: `http://localhost:3000`

La página se recarga automáticamente al hacer cambios en el código fuente. Los errores de lint se muestran en la consola del navegador.

## Testing

```bash
# Ejecutar todos los tests
cd kanban
npm test

# Ejecutar tests en modo no interactivo (CI)
npm test -- --watchAll=false
```

> **Nota**: el test existente (`App.test.js`) busca el texto "learn react" que no existe actualmente en la aplicación, por lo que fallará. Esto es un remanente del template de Create React App.

## Linting and Formatting

ESLint está configurado via `eslintConfig` en `package.json` con las extensiones `react-app` y `react-app/jest`.

```bash
# Ejecutar linting (integrado con react-scripts)
cd kanban
npx eslint src/
```

No se encontró configuración de Prettier ni otro formateador en el repositorio.

## Building

```bash
cd kanban
npm run build
```

El build de producción se genera en `kanban/build/`. Los archivos se minifican y los nombres incluyen hashes para cache-busting.

> **Nota**: la carpeta `build/` ya está incluida en el repositorio. Después de hacer cambios, ejecutar `npm run build` para regenerarla.

## Project Scripts

| Script  | Comando         | Descripción                                          |
| ------- | --------------- | ---------------------------------------------------- |
| `start` | `npm start`     | Inicia el servidor de desarrollo en `localhost:3000` |
| `build` | `npm run build` | Genera el build de producción en `build/`            |
| `test`  | `npm test`      | Ejecuta los tests con Jest en modo watch             |
| `eject` | `npm run eject` | Expone la configuración de CRA (irreversible)        |

## Common Issues

| Problema                                   | Solución                                                                                                                                     |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm start` falla con error de puerto      | El puerto 3000 está ocupado. Usar `PORT=3001 npm start` o cerrar el proceso que ocupa el puerto                                              |
| Los datos del tablero no aparecen          | Verificar `localStorage` en DevTools → Application → Local Storage. Los datos se almacenan bajo la clave `localColumns`                      |
| El test `App.test.js` falla                | Es esperado — el test busca "learn react" que fue eliminado. Actualizar el test para reflejar el contenido actual                            |
| `react-beautiful-dnd` warnings en React 18 | Es un issue conocido de la librería en modo estricto de React. El `index.js` ya renderiza sin `<React.StrictMode>` para evitar este problema |

## Sources Inspected

- `kanban/package.json` — scripts, dependencias y configuración de ESLint/browserslist
- `kanban/src/index.js` — bootstrap de React (nota: sin StrictMode)
- `kanban/src/App.test.js` — test de ejemplo
- `kanban/public/index.html` — HTML base y título de la aplicación
- `kanban/README.md` — README generado por Create React App con documentación de scripts
