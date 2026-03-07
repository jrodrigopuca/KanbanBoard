# Development Guide

## Scope

- Target: repositorio completo
- Docs location: `docs/`

## Confidence Note

- **Confirmed** from repository evidence: scripts de npm, dependencias, estructura de carpetas y configuración de Vite
- **Needs confirmation**: no se encontró archivo `.env`, `.nvmrc` ni configuración de CI/CD

## Prerequisites

- **Node.js** versión 18+ (recomendado 20+ para trabajar con el stack actualizado)
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
| `BASE_URL` | URL base para producción          | No        | `/kanban/`                  |

> **Inferred**: la base de despliegue se define en `vite.config.js` y afecta las rutas del build de producción.

## Running Locally

```bash
cd kanban
npm start
```

Disponible en: `http://localhost:3000`

La página se recarga automáticamente al hacer cambios en el código fuente.

## Testing

```bash
# Ejecutar todos los tests
cd kanban
npm test

# Ejecutar tests en modo watch
npm run test:watch
```

La suite actual valida render inicial, fallback de persistencia, renombre de columnas y confirmación de eliminación.

## Linting and Formatting

No hay una tarea de lint dedicada configurada actualmente tras la migración a Vite. No se encontró configuración de Prettier ni otro formateador en el repositorio.

## Building

```bash
cd kanban
npm run build
```

El build de producción se genera en `kanban/build/`. Los archivos se minifican y los nombres incluyen hashes para cache-busting.

> **Nota**: la carpeta `build/` se usa como artefacto local y no debe versionarse. Después de hacer cambios, ejecutar `npm run build` para regenerarla en local si hace falta validar el despliegue.

## Project Scripts

| Script  | Comando         | Descripción                                          |
| ------- | --------------- | ---------------------------------------------------- |
| `start` | `npm start`     | Inicia el servidor de desarrollo de Vite en `localhost:3000` |
| `dev`   | `npm run dev`   | Alias de desarrollo para Vite                        |
| `build` | `npm run build` | Genera el build de producción en `build/`            |
| `preview` | `npm run preview` | Sirve el build generado localmente                |
| `test`  | `npm test`      | Ejecuta los tests con Vitest en modo no interactivo  |
| `test:watch` | `npm run test:watch` | Ejecuta los tests con Vitest en modo watch |

## Common Issues

| Problema                                     | Solución                                                                                                                                                                                                                                                                    |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm start` falla con error de puerto        | El puerto 3000 está ocupado. Usar `PORT=3001 npm start` o cerrar el proceso que ocupa el puerto                                                                                                                                                                             |
| Los datos del tablero no aparecen            | Verificar `localStorage` en DevTools → Application → Local Storage. Los datos se almacenan bajo la clave `localColumns`                                                                                                                                                     |
| Un test falla tras cambiar persistencia      | Limpiar `localStorage` o actualizar la expectativa del test para reflejar el estado inicial y el manejo de datos persistidos                                                                                                                                                |
| `npm audit` reporta nuevas vulnerabilidades | Revisar primero la cadena reportada antes de aplicar fixes automáticos. Tras la migración a Vite, la auditoría actual del proyecto queda en `0` vulnerabilidades, por lo que cualquier aviso nuevo debe tratarse como regresión |

## Sources Inspected

- `kanban/package.json` — scripts y dependencias
- `kanban/src/index.js` — bootstrap de React con `StrictMode`
- `kanban/src/App.test.js` — test de ejemplo
- `kanban/index.html` — HTML base y título de la aplicación
- `kanban/vite.config.js` — configuración de Vite y Vitest
- `kanban/README.md` — README del proyecto
