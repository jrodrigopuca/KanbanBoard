# Evaluación: `create-software-docs`

> Evaluación inicial: 2026-03-06
> Última revisión: 2026-03-06 (3ª pasada, post v3.2)
> Archivos: 58 markdown (excluyendo este archivo)
> Tamaño total actual: ~143 KB / ~3,953 líneas

---

## Resumen ejecutivo

| Dimensión    | Inicial | Rev. 2 | Rev. 3 (actual) | Comentario                                                                                            |
| ------------ | ------- | ------ | --------------- | ----------------------------------------------------------------------------------------------------- |
| Completitud  | 9/10    | 9.5/10 | **9.8/10**      | Todos los pendientes anteriores resueltos; solo queda el solapamiento de 3 capas como trade-off menor |
| Contexto LLM | 6/10    | 8/10   | **8.5/10**      | Orchestrator reducido -4.6 KB, política extraída a referencia de planning, tokens/paso ~7,500         |
| Performance  | 7.5/10  | 8.5/10 | **9/10**        | Compact/full modes para known issues + orchestrator más ligero reducen overhead efectivo              |
| Diseño       | 8.5/10  | 9/10   | **9.5/10**      | Separación orchestrator vs. policy + CHANGELOG + compact mode = diseño maduro y bien estratificado    |

---

## 1. Completitud — 9.8/10

La skill cubre todo lo esperado de un orquestador de documentación de software:

- Orquestación con workflow claro de 12 sub-skills
- 3 modos operativos (`generate`, `update`, `reconcile`)
- Contratos compartidos para sub-skills documentales y no-documentales
- Artefactos de handoff estructurados entre etapas
- Templates para cada tipo de documento (10 templates específicos + convenciones + contrato)
- Quality checklist, diagram patterns, evidence model
- Reglas de escalación (validation finding → cleanup candidate → remaining issue → known issue)
- Especializaciones locales por sub-skill
- ~~No hay guía de "context budget"~~ — **Resuelto.** Context Loading Strategy con lazy loading por etapa extraída a `orchestration-policy.md`.
- ~~No hay criterio de abort/downgrade~~ — **Resuelto.** Downgrade Rules con orden de degradación explícito en `orchestration-policy.md`.
- ~~No hay versionado~~ — **Resuelto.** Se añadió `CHANGELOG.md` con historial ligero de versiones (1.x → 2.x → 3.0 → 3.1 → 3.2).
- Modos de tracking `compact` / `full` para known issues, bien integrados en orchestrator, policy, sub-skill y template.
- Validation levels (`minimal`, `standard`, `full`) con propagación de `deferredChecks`.
- Fast path para proyectos simples.
- Paralelización controlada para documentos opcionales.

### Único gap residual

Las tres capas de referencia (`common.md` → template específico → local specialization) siguen existiendo. El solapamiento real es menor que antes gracias a la centralización de update/reconcile y al adelgazamiento de local specializations, pero la cadena sigue siendo una decisión de diseño deliberada, no un problema funcional.

---

## 2. Optimización para ventana de contexto — 8.5/10

### Métricas de tamaño

| Concepto                         | Inicial  | Rev. 2   | Rev. 3 (actual) | Cambio vs Rev. 2           |
| -------------------------------- | -------- | -------- | --------------- | -------------------------- |
| Total skill (sin EVALUATION.md)  | ~133 KB  | ~134 KB  | **~143 KB**     | +9 KB (policy + changelog) |
| Orchestrator `SKILL.md`          | 12 KB    | 19.4 KB  | **14.8 KB**     | **-4.6 KB**                |
| Nuevo: `orchestration-policy.md` | —        | —        | **8.0 KB**      | +8.0 KB (solo planning)    |
| Nuevo: `CHANGELOG.md`            | —        | —        | **1.7 KB**      | +1.7 KB (no se carga)      |
| `sub-skill-handoffs.md`          | 22 KB    | 19 KB    | 19.3 KB         | sin cambio material        |
| `sub-skills/README.md`           | 5.5 KB   | 2.8 KB   | 2.9 KB          | sin cambio material        |
| `common.md`                      | 1.6 KB   | 1.5 KB   | 1.5 KB          | sin cambio                 |
| `update-reconcile-guidance.md`   | —        | 1.7 KB   | 1.7 KB          | sin cambio                 |
| Sub-skill SKILL.md (promedio)    | ~2.8 KB  | ~2.6 KB  | ~2.6 KB         | sin cambio                 |
| Local specializations (promedio) | ~0.83 KB | ~0.68 KB | ~0.68 KB        | sin cambio                 |
| `diagrams.md`                    | ~7 KB    | ~7 KB    | ~7 KB           | sin cambio                 |
| `known-issues.md` (template)     | —        | ~5.6 KB  | ~5.6 KB         | sin cambio                 |

El total creció ~9 KB, pero el crecimiento proviene de archivos que **no se cargan por paso**: `orchestration-policy.md` se lee solo en planificación, `CHANGELOG.md` no se carga nunca en ejecución. El archivo que sí se carga siempre (orchestrator) se redujo 4.6 KB.

### Problemas detectados y estado

1. **`sub-skill-handoffs.md` demasiado grande con Examples Appendix duplicado.**
   - ~~645 líneas con ~150 líneas de ejemplos repetidos en Sección 4~~ — **Resuelto.** Contenido eliminado, archivo bajó de 22 KB a 19 KB.
   - ~~Vestigio en `## Structure of This Contract` mencionando "plus an examples appendix"~~ — **Resuelto.** La descripción ahora dice "three operational layers" sin mencionar appendix.

2. **Redundancia sistémica de update/reconcile (~25+ repeticiones).**
   - **Resuelto.** `update-reconcile-guidance.md` como referencia canónica. Prosa removida de ~12 archivos.

3. **Duplicación orchestrator ↔ sub-skills/README.md.**
   - **Resuelto.** README reducido a 2.9 KB, referencia al orchestrator como fuente canónica. Además ahora referencia `orchestration-policy.md` para context loading y downgrade.

4. **Tres capas de referencia con solapamiento.**
   - **Parcialmente mitigado.** Solapamiento real reducido. Es un trade-off de diseño aceptable.

5. **Pipeline de known issues sobre-ingeniado.**
   - **Mitigado.** Los modos `compact` / `full` permiten que proyectos simples usen entradas concisas con subconjunto de campos. Los shapes siguen existiendo en `sub-skill-handoffs.md` pero `compact` mode filtra activamente qué se produce.

### Estimación de tokens por paso de ejecución

| Archivo                        | Inicial     | Rev. 2                       | Rev. 3 (actual)              |
| ------------------------------ | ----------- | ---------------------------- | ---------------------------- |
| Orchestrator SKILL.md          | ~3,000      | ~4,900                       | **~3,700**                   |
| `orchestration-policy.md`      | —           | —                            | **~0** (solo planning)       |
| Sub-skill SKILL.md             | ~750        | ~650                         | ~650                         |
| `common.md`                    | ~400        | ~380                         | ~380                         |
| Template específico            | ~800        | ~800                         | ~800                         |
| Local specialization           | ~200        | ~170                         | ~170                         |
| `diagrams.md` (arq.)           | ~1,800      | ~1,800                       | ~1,800                       |
| `sub-skill-handoffs.md`        | ~5,500      | **~0** (lazy)                | **~0** (lazy)                |
| `update-reconcile-guidance.md` | —           | ~425 (solo update/reconcile) | ~425 (solo update/reconcile) |
| **Total por paso (generate)**  | **~12,500** | **~8,700**                   | **~7,500**                   |
| **Total por paso (update)**    | **~12,500** | **~9,125**                   | **~8,125**                   |

La mejora clave en esta revisión: la extracción de Context Loading Strategy, Downgrade Rules, Validation Levels, Known-Issues Tracking Modes y Fast Path a `orchestration-policy.md` redujo el orchestrator de ~4,900 a ~3,700 tokens/paso, ahorrando ~1,200 tokens adicionales por paso.

**Planning step**: ~3,700 (orchestrator) + ~2,000 (policy) + ~620 (scope analysis) = **~6,320 tokens** — se carga una sola vez.

- Para modelos con 128K-200K: muy cómodo.
- Para modelos con 32K: manejable sin dificultad (antes problemático).

---

## 3. Performance / Eficiencia de ejecución — 9/10

### Fortalezas

- La arquitectura modular permite que cada paso cargue solo sus archivos
- El orden de ejecución es lógico y bien definido
- Los artefactos de handoff estructurados permiten output consumible entre etapas sin ambigüedad
- Las activation rules evitan generar documentos que no aplican
- Los contratos (`document-subskill.md`, `non-document-subskill.md`) normalizan expectativas sin rigidez excesiva
- La separación de `validate` → `cleanup` → `known-issues` es conceptualmente limpia
- ~~No hay instrucción de paralelización~~ — **Resuelto.** Batch paralelo post-core con reglas de seguridad.
- ~~No hay fast path para proyectos simples~~ — **Resuelto.** Fast path de 6 pasos base en `orchestration-policy.md`.
- ~~12 pasos secuenciales sin alternativa~~ — **Mitigado.** Fast path + paralelización reducen pasos efectivos.
- ~~Orchestrator pesado (~19.4 KB) cargado en cada paso~~ — **Resuelto.** Reducido a 14.8 KB; política de planificación en `orchestration-policy.md` cargada solo una vez.
- `compact` / `full` modes para known issues permiten escalar la complejidad del pipeline al tipo de proyecto.

### Debilidad residual

- El re-validation condicional ("if cleanup performs meaningful edits, run validate again") sigue pudiendo crear loops, aunque la elección de validation level (`minimal` para re-validación editorial) lo hace controlable. Este es un trade-off de diseño razonable.

---

## 4. Calidad de diseño — 9.5/10

### Fortalezas consolidadas

- Filosofía de "no inventar hechos" y evidencia como principio rector
- Sistema de confidence labels consistente y bien definido
- Los templates son esqueletos mínimos, no murallas de texto
- La separación de responsabilidades entre sub-skills es clara
- Los contratos evitan que sub-skills dupliquen template content en sus SKILL.md
- El approach de `update`/`reconcile` es sofisticado y práctico
- Centralización de reglas update/reconcile en `update-reconcile-guidance.md` elimina repetición sistémica
- Validation levels (`minimal`, `standard`, `full`) bien integrados en validate, cleanup y orchestrator
- El Validation Artifact incluye `validationLevel` y `deferredChecks`, propagando awareness de cobertura real
- Cleanup consume validation level y deferred checks, evitando asumir cobertura que no existió
- **Separación clara entre orchestrator (workflow) y policy (planning-time decisions)** — el orchestrator se enfoca en qué hacer y en qué orden; la política en cuándo y cómo adaptar
- **CHANGELOG.md** proporciona trazabilidad de cambios sin sobre-ingeniería
- **Compact/full tracking modes** bien integrados en todo el pipeline: orchestrator → policy → sub-skill → template → local specialization → handoff contract

---

## Historial de mejoras

| #   | Recomendación                                         | Estado final                                                                           |
| --- | ----------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 1   | Eliminar Examples Appendix de `sub-skill-handoffs.md` | **Cumplida** — contenido y vestigio en TOC eliminados                                  |
| 2   | Reducir `sub-skills/README.md`                        | **Cumplida** — de 5.5 KB a 2.9 KB, sin duplicación                                     |
| 3   | Centralizar reglas update/reconcile                   | **Cumplida** — `update-reconcile-guidance.md`, prosa removida de ~12 archivos          |
| 4   | Añadir Context Loading Strategy                       | **Cumplida** — extraída a `orchestration-policy.md` con lazy loading + hard constraint |
| 5   | Fast path para proyectos simples                      | **Cumplida** — 6 pasos base con expansión condicional en `orchestration-policy.md`     |

### Mejoras adicionales implementadas a lo largo de las iteraciones

- **Validation Levels**: `minimal`, `standard`, `full` con propagación de `deferredChecks`
- **Parallelization rules**: batch paralelo post-core con reglas de seguridad
- **Cleanup awareness**: consume validation level y deferred checks
- **Validation Artifact ampliado**: incluye `validationLevel` y `deferredChecks`
- **Orchestration policy extraction**: separación de workflow vs. planning-time policy
- **CHANGELOG.md**: versionado ligero (1.x → 3.2)
- **Compact/full known-issues modes**: tracking escalable según complejidad del proyecto

---

## Pendientes y observaciones menores

Todos los pendientes identificados en revisiones anteriores fueron resueltos. Las observaciones restantes son trade-offs de diseño conscientes, no defectos:

1. **Tres capas de referencia.** `common.md` → template → local specialization sigue existiendo. El solapamiento real es menor tras la centralización de update/reconcile. Es una decisión de diseño que prioriza modularidad y reutilización sobre mínimo absoluto de archivos.

2. **`known-issues.md` template es el más pesado (5.6 KB).** Incluye el candidate translation example como shape reference. En `compact` mode esto es más template del necesario, pero el overhead es marginal (~1,400 tokens extra una sola vez cuando se genera known issues).

3. **`sub-skill-handoffs.md` sigue siendo 19 KB.** Es el archivo más grande, pero la lazy loading strategy (cargar solo secciones relevantes por paso) mitiga efectivamente su impacto. No se carga completo en ningún paso.

4. **Re-validation loop teórico.** El condicional "run validate again after cleanup if meaningful edits" tiene potencial de loop, pero `minimal` validation para re-pases editoriales lo hace controlable en la práctica.

Ninguno de estos puntos requiere acción inmediata. La skill está en un estado maduro y consistente.
