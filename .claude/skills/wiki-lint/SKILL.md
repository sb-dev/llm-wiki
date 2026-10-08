---
name: wiki-lint
description: Run deterministic TypeScript validation for wiki files, links, titles, and source references.
---
# Wiki lint

Run:

```bash
npm run wiki:lint
```

The linter checks deterministic filesystem invariants only. Source fidelity, ontology quality, useful page boundaries, and other semantic judgements belong to `wiki-reviewer`.

Fix lint failures before considering bootstrap, ingestion, or maintenance complete.
