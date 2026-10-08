---
name: wiki-query
description: Answer a question primarily from the maintained wiki, following its ontology and internal links before returning to raw sources.
---
# Wiki query

Use this skill to answer questions from an initialised wiki.

## Execution contract

Follow `processes/query.md`.

## Constraints

- Start from maintained wiki knowledge rather than reconstructing the corpus from scratch.
- Return to raw sources when verification or missing detail requires it.
- Preserve relevant uncertainty and disagreement.
- Do not silently mutate the wiki during a query.
