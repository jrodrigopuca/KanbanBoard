# Kanban

Aplicación de tablero Kanban construida con React 19 y Vite.

## Scripts disponibles

### `npm start`

Inicia el servidor de desarrollo con Vite en [http://localhost:3000](http://localhost:3000).

### `npm test`

Ejecuta la suite con Vitest en modo no interactivo.

### `npm run test:watch`

Ejecuta la suite con Vitest en modo watch.

### `npm run build`

Genera el build de producción en la carpeta `build/` usando la base `/kanban/`.

### `npm run preview`

Sirve localmente el build generado para validación manual.

## Stack técnico

- React 19.2.4
- Vite 7.3.1
- Vitest 3.2.4
- React Testing Library
- @hello-pangea/dnd

## Notas

- Los assets públicos se mantienen en `public/`
- El entry HTML ahora vive en `index.html` en la raíz de `kanban/`
- La salida de producción se conserva en `build/` para minimizar cambios de despliegue
