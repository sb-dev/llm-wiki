# Maintenance process

Repair, refactor, or evolve the existing wiki when the problem is with the knowledge base itself rather than one newly changed source.

## Triggers

Examples include:

- duplicated knowledge;
- weak or overlapping page boundaries;
- inconsistent terminology;
- broken navigation;
- stale derived knowledge;
- repeated ontology mismatches;
- structural drift after previous changes.

## Process

1. Identify the concrete maintenance problem.
2. Read the affected wiki pages, ontology, and relevant sources.
3. For structural or ontology questions, use `ontology-librarian` for read-only analysis.
4. Choose the smallest change that resolves the demonstrated problem.
5. If the ontology changes:
   - update `wiki/ontology.md`;
   - migrate every affected page, link, and relevant index entry in the same operation;
   - record material migrations in `.wiki/maintenance-log.md`.
6. If the ontology does not change, keep the refactor local to the demonstrated problem.
7. Update `wiki/index.md` when navigation changes.
8. Use `wiki-reviewer` for material changes.
9. Fix blocking findings.
10. Run the `wiki-lint` skill and fix validation failures.

## Constraints

- Do not redesign the ontology for neatness alone.
- Do not add taxonomy unsupported by recurring wiki content.
- Preserve provenance, uncertainty, and real disagreement through refactors.
- Keep ontology and wiki structure consistent after a migration.
