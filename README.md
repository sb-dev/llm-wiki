# LLM Wiki

LLM Wiki maintains a structured Markdown knowledge base from existing repository documentation using Cursor processes, skills, and sub-agents.

The wiki uses an ontology derived from the source material during initialisation. The ontology and wiki are maintained together as the source corpus changes.

## Repository structure

```text
AGENTS.md

.claude/
├── agents/
│   ├── ontology-librarian.md
│   ├── wiki-reviewer.md
│   └── wiki-synthesizer.md
└── skills/
    ├── wiki-bootstrap/SKILL.md
    ├── wiki-ingest/SKILL.md
    ├── wiki-lint/SKILL.md
    ├── wiki-maintain/SKILL.md
    └── wiki-query/SKILL.md

processes/
├── bootstrap.md
├── ingest.md
├── maintenance.md
└── query.md

wiki/
├── index.md
└── ontology.md

.wiki/
├── maintenance-log.md
└── source-registry.md

scripts/
└── wiki-lint.ts
```

### `AGENTS.md`

Defines repository-wide instructions for working with the wiki: source authority, provenance, ontology rules, process routing, and implementation constraints.

### `processes/`

Defines the end-to-end workflows that govern wiki operations:

- `bootstrap.md` — initialise the wiki from an existing Markdown corpus;
- `ingest.md` — incorporate new or changed source material;
- `query.md` — answer questions from the maintained wiki;
- `maintenance.md` — repair or evolve the wiki and ontology.

Process files define orchestration: sequence, decision points, sub-agent use, review, migration, and completion conditions.

### `.claude/skills/`

Contains Cursor skills that execute reusable wiki procedures and follow the corresponding process files:

- `wiki-bootstrap`
- `wiki-ingest`
- `wiki-query`
- `wiki-maintain`
- `wiki-lint`

### `.claude/agents/`

Contains specialist sub-agents used by the processes:

- `ontology-librarian` — analyses corpus structure and ontology fit;
- `wiki-synthesizer` — synthesises source material into the wiki;
- `wiki-reviewer` — independently checks changes against sources and the ontology.

### `wiki/`

Contains the maintained knowledge base.

- `ontology.md` defines the current ontology and is derived from the source corpus during bootstrap.
- `index.md` is the main navigation entry point.
- Additional pages and directories are created according to the ontology and the knowledge found in the corpus.

### `.wiki/`

Contains operational state used to maintain the wiki.

- `source-registry.md` tracks source files incorporated into the wiki.
- `maintenance-log.md` records material ontology migrations and structural changes when an audit trail is useful.

## Requirements

- Cursor with project skills and sub-agents enabled.
- Node.js 22.6 or newer for the TypeScript linter.

## Initialise the wiki

Provide Cursor with the Markdown files or directories that form the source corpus and invoke `wiki-bootstrap`.

`wiki-bootstrap` follows `processes/bootstrap.md`: it inventories the corpus, derives the initial ontology, synthesises the wiki, reconciles the result, builds navigation, runs independent review, and validates the wiki.

The source corpus can live anywhere in the repository. The process uses the source scope you provide rather than assuming a fixed source directory.

## Update the wiki

Use `wiki-ingest` whenever source Markdown is added or materially changed.

The skill follows `processes/ingest.md`: it reads the existing ontology and wiki first, determines what the changed source adds or alters, updates existing knowledge where possible, and changes the ontology only when recurring evidence demonstrates that the current model no longer fits.

## Query the wiki

Use `wiki-query` to answer questions from the maintained knowledge base.

The skill follows `processes/query.md`: it starts from `wiki/index.md`, uses the ontology and internal links to navigate the wiki, and returns to raw source files only when verification, ambiguity, disagreement, or missing detail requires it.

Querying does not silently modify the wiki. Source-driven corrections go through ingestion; structural corrections go through maintenance.

## Maintain the wiki

Use `wiki-maintain` for problems with the knowledge base itself, including duplicated knowledge, weak page boundaries, inconsistent terminology, broken navigation, stale derived knowledge, or recurring ontology mismatches.

The skill follows `processes/maintenance.md`. Ontology changes are migrations: update the ontology, migrate affected wiki content and navigation, review the result, and lint it in the same operation.

## Validate the wiki

Run:

```bash
npm run wiki:lint
```

The TypeScript linter checks deterministic repository invariants such as links, page titles, source references, and required wiki files. Semantic correctness and source fidelity are handled by the review process.

Run lint after bootstrap, ingestion, and material maintenance changes.

## Maintenance rules

- Treat source documents as authoritative inputs.
- Read the existing wiki before creating new pages.
- Synthesise knowledge across sources rather than mirror source documents.
- Keep important derived knowledge traceable to its sources.
- Preserve meaningful disagreement, uncertainty, and unresolved questions.
- Apply the current ontology consistently.
- Evolve the ontology only when recurring knowledge demonstrates that the existing model no longer fits.
- Migrate affected wiki content whenever the ontology changes.
- Keep `wiki/index.md` aligned with the structure that actually exists.
- Follow the relevant process file for substantive wiki operations.
