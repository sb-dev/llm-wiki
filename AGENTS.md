# LLM Wiki project instructions

This repository contains a Markdown wiki derived from existing repository documents and maintained by Cursor agents.

## Authority

- Source documents are authoritative inputs. Do not modify them as part of wiki work unless the user explicitly asks.
- `wiki/ontology.md` is the current ontology after bootstrap.
- `wiki/index.md` is the wiki entry point.
- `.wiki/source-registry.md` records which source files the wiki has processed.
- `.wiki/maintenance-log.md` records material ontology migrations or structural changes when an audit trail is useful.
- `processes/` defines the end-to-end wiki workflows.

## Knowledge rules

- Synthesise knowledge across sources; do not create one summary page per source by default.
- Search the existing wiki before creating a page.
- Prefer updating existing knowledge over duplicating it.
- Preserve source disagreement, uncertainty, and unresolved questions.
- Keep important derived knowledge traceable to source files.
- Do not invent ontology elements before examining the corpus.
- Apply the current ontology consistently, but do not force recurring new knowledge into an ontology that no longer fits.
- Treat ontology changes as migrations: justify the change, review it, update the ontology, migrate affected wiki content, then lint.

## Process and skill model

Use the process files for end-to-end orchestration:

- `processes/bootstrap.md` — initialise a wiki from a Markdown corpus.
- `processes/ingest.md` — incorporate new or changed source material.
- `processes/query.md` — answer questions from the maintained wiki.
- `processes/maintenance.md` — repair or evolve the wiki and ontology.

Use Cursor skills for reusable procedures needed by those processes:

- `wiki-bootstrap`
- `wiki-ingest`
- `wiki-query`
- `wiki-maintain`
- `wiki-lint`

A skill must follow its corresponding process file where one exists. Do not collapse process orchestration into `AGENTS.md`.

Use project sub-agents when context isolation or independent review is useful:

- `ontology-librarian` — analyse corpus structure and ontology fit.
- `wiki-synthesizer` — perform bounded wiki synthesis work.
- `wiki-reviewer` — independently verify wiki changes against sources and ontology.

## Implementation

- Use TypeScript for repository automation and validation scripts.
- Do not introduce Python.
- Keep repository automation small and dependency-light.
