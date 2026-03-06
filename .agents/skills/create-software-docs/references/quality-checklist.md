# Quality Checklist

Use this checklist after generating documentation under `{scope}/docs/`.

## Structure of This Checklist

Use it in this order:

1. verify shared evidence and scope rules
2. verify document-specific quality
3. verify validation artifact quality
4. verify cleanup and final delivery quality
5. verify known-issue tracking when applicable

## 1. Shared Evidence and Scope Checks

- [ ] The selected `{scope}` is explicit in the docs.
- [ ] Files were generated only inside `{scope}/docs/`.
- [ ] No section claims behavior that is not supported by repository evidence.
- [ ] Inferred statements are labeled as `Inferred`.
- [ ] Uncertain statements are labeled as `Needs confirmation`.
- [ ] Each document includes `Sources inspected`.
- [ ] `Sources inspected` entries explain why each source matters.
- [ ] Links between documents resolve correctly.

## 2. Document-Specific Checks

Apply only to the documents that were actually generated.

### Project Overview

- [ ] Matches the selected scope.
- [ ] Links to every generated document.

### Architecture

- [ ] Mermaid diagrams match actual modules, services, and integrations.
- [ ] Omitted sections are truly unsupported by evidence.

### Development Guide

- [ ] Setup, test, lint, and build commands exist in the repository.
- [ ] Environment variables are described only when evidenced.

### ADRs

- [ ] Decisions explain why, not only what.
- [ ] Reconstructed rationale is clearly labeled.

### Runbooks

- [ ] Steps are executable and ordered.
- [ ] Rollback and verification are present.

### Data Model

- [ ] Entities and relationships come from actual schema evidence.
- [ ] Uncertain relationships are marked.

### API Reference

- [ ] Endpoints and auth match routes, schemas, or specs.
- [ ] Error behavior is evidence-based.

### Glossary

- [ ] Terms reflect real domain or internal language.
- [ ] Definitions are concise and non-speculative.

### Known Issues

- [ ] Known issues are backed by evidence or upstream findings.
- [ ] Each issue has an explicit status.
- [ ] Each issue explains why it is tracked instead of being treated as a normal validation note or cleanup-only fix.
- [ ] Future clarification or re-evaluation notes are present when needed.
- [ ] Tracking detail matches the selected mode: concise in `compact`, richer continuity in `full`.
- [ ] Accepted or deferred issues are preserved instead of silently dropped.

## 3. Validation Artifact Checks

- [ ] `validationLevel` is explicit.
- [ ] `deferredChecks` are listed when validation intentionally ran below full coverage.
- [ ] `filesChecked` clearly shows which files were reviewed.
- [ ] Per-file validation coverage is visible through applied checks or notes.
- [ ] `issuesFound` entries are structured and specific enough to be actionable.
- [ ] `brokenLinks` entries identify the failing source path and target.
- [ ] `missingEvidenceNotes` clearly identify unsupported or weakly supported claims.
- [ ] `speculativeSections` identify sections that should be removed, relabeled, or replaced with evidence.
- [ ] `cleanupCandidates` are reserved for issues cleanup can realistically address.
- [ ] `knownIssueCandidates` are reserved for persistent issues that deserve long-term tracking.
- [ ] The same underlying issue is not duplicated inconsistently across `issuesFound`, `cleanupCandidates`, and `knownIssueCandidates`.

## 4. Cleanup and Final Delivery Checks

- [ ] Editorial cleanup has removed stale placeholders and obvious duplication.
- [ ] Terminology is consistent across all generated docs.
- [ ] Repeated explanations were reduced or cross-linked instead of duplicated.
- [ ] Heading levels, bullet lists, and tables are stylistically consistent.
- [ ] Final wording is concise without changing evidenced meaning.
- [ ] `remainingIssues` are structured and explain why the issue still remains.
- [ ] `remainingIssues` include a concrete next step when one can be stated safely.
- [ ] `cleanupCandidatesReviewed` or equivalent cleanup review output makes resolution visible.

## 5. Known-Issue Tracking Checks

- [ ] Only persistent issues were promoted into `knownIssueCandidates`.
- [ ] Issues fixed during cleanup were not left behind as known issues.
- [ ] Remaining issues were escalated to known issues only when status tracking or future re-evaluation is truly needed.
