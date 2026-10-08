# Bootstrap process

Initialise a wiki from an existing Markdown corpus.

## Inputs

- one or more Markdown files or directories supplied by the user;
- the repository containing the wiki scaffold.

Do not assume where source Markdown lives. Exclude `wiki/**`, `.wiki/**`, `.cursor/**`, and `processes/**` unless the user explicitly includes them as source material.

## Process

1. **Inventory the corpus**
   - discover Markdown files in the requested source scope;
   - register them as `pending` in `.wiki/source-registry.md`.

2. **Understand the corpus before modelling it**
   - inspect the corpus broadly;
   - use the `ontology-librarian` sub-agent to identify recurring terminology, subjects, entities, relationships, page boundaries, and existing conventions.

3. **Derive the initial ontology**
   - write the smallest useful ontology to `wiki/ontology.md`;
   - include only distinctions supported by recurring evidence in the corpus.

4. **Define seed page boundaries**
   - select a small set of high-value knowledge pages;
   - do not mirror source-document boundaries.

5. **Synthesise the corpus**
   - process sources in coherent batches;
   - use `wiki-synthesizer` for bounded synthesis work;
   - update existing pages before creating new ones;
   - preserve provenance, uncertainty, and contradictions;
   - mark a source as processed only after its knowledge has been incorporated successfully.

6. **Validate the ontology against the emerging wiki**
   - use `ontology-librarian` again after substantial synthesis;
   - identify repeated exceptions, ambiguous page boundaries, missing recurring relationships, unused distinctions, and terminology drift.

7. **Migrate if the ontology changes**
   - update `wiki/ontology.md`;
   - migrate every affected page, link, and navigation entry in the same operation;
   - record material migrations in `.wiki/maintenance-log.md`.

8. **Reconcile the wiki globally**
   - remove duplicate or source-shaped pages;
   - reconcile overlapping page scopes and terminology;
   - preserve genuine disagreement;
   - introduce directories only if the resulting ontology and corpus justify them.

9. **Build `wiki/index.md`**
   - derive navigation from the wiki that actually exists;
   - keep the index useful rather than exhaustive by default.

10. **Review**
    - use `wiki-reviewer` to compare the resulting wiki with the source scope and current ontology;
    - fix blocking findings.

11. **Lint**
    - run the `wiki-lint` skill;
    - fix deterministic validation failures.

## Complete when

- every successfully incorporated source is registered;
- the ontology describes the wiki that exists;
- knowledge is synthesised across sources rather than mirrored per document;
- important derived knowledge remains traceable to source files;
- meaningful contradictions remain visible;
- navigation is usable;
- review has no blocking findings;
- lint passes.
