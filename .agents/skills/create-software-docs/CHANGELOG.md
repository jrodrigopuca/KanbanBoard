# Changelog

Registro simple de cambios relevantes de la skill `create-software-docs`.

## 3.2 — 2026-03-06

### Added

- Se añadió este `CHANGELOG.md` como mecanismo simple de versionado y seguimiento de cambios.

### Notes

- Esta versión adopta un historial liviano orientado a mantenimiento de la skill, sin imponer un esquema de release más complejo.

## 3.1 — 2026-03-06

### Changed

- Se extrajo la política de orquestación a `references/orchestration-policy.md`.
- Se redujo el peso del orchestrator `SKILL.md`, delegando política de planificación y carga de contexto.
- Se corrigió el vestigio del appendix eliminado en `references/contracts/sub-skill-handoffs.md`.

## 3.0 — 2026-03-06

### Changed

- Se añadió `Context Loading Strategy` con lazy loading por etapa.
- Se añadieron `Downgrade Rules` para ejecuciones con presupuesto de contexto o tiempo limitado.
- Se añadió soporte de validación por niveles: `minimal`, `standard`, `full`.
- Se introdujo `Fast Path for Simple Projects`.
- Se habilitó paralelización controlada para documentos opcionales.
- Se amplió el `Validation Artifact` con `validationLevel` y `deferredChecks`.
- Cleanup pasó a respetar el nivel de validación y checks diferidos.

## 2.x — 2026-03-06

### Changed

- Se consolidó el soporte para modos `generate`, `update` y `reconcile`.
- Se centralizó la guía compartida en `references/contracts/update-reconcile-guidance.md`.
- Se modularizaron templates, contratos y artefactos de handoff.
- Se añadió y normalizó el flujo de `known issues`.

## 1.x — 2026-03-06

### Added

- Versión base de la skill como orquestador de documentación de software con sub-skills especializadas.
