# Ingest process

Incorporate new or materially changed Markdown source material into an initialised wiki.

## Inputs

- the new or changed source files;
- the existing `wiki/ontology.md`, `wiki/index.md`, and affected wiki pages.

## Process

1. Read the current ontology and index.
2. Read the changed source material.
3. Locate existing wiki pages affected by the source.
4. Use `wiki-synthesizer` to determine what the source adds, changes, contradicts, or invalidates.
5. Update existing knowledge before creating new pages.
6. Preserve provenance, uncertainty, and disagreement.
7. Update `.wiki/source-registry.md` only after a source has been incorporated successfully.
8. If recurring knowledge no longer fits the ontology, use `ontology-librarian` to analyse the mismatch.
9. If an ontology change is justified:
   - update `wiki/ontology.md`;
   - migrate all affected pages, links, and relevant index entries;
   - record material migrations in `.wiki/maintenance-log.md`.
10. Use `wiki-reviewer` for independent verification.
11. Fix blocking findings.
12. Run the `wiki-lint` skill and fix validation failures.

## Constraints

- Ask: **What does this source change about what the wiki currently knows?**
- Do not reduce ingestion to document summarisation.
- Do not change the ontology for a one-off awkward source.
- Do not leave the wiki knowingly split between old and new ontology structures.
