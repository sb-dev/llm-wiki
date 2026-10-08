---
name: wiki-bootstrap
description: Initialise the wiki from one or more existing Markdown source roots by deriving an ontology and synthesising the corpus into the maintained wiki.
---
# Wiki bootstrap

Use this skill when the target corpus has not yet been initialised as a wiki.

## Execution contract

Follow `processes/bootstrap.md` as the end-to-end workflow.

Use the project sub-agents named by that process for ontology analysis, bounded synthesis, and independent review.

## Input

The user must identify the source roots or files to include. Existing repository Markdown may live anywhere; do not assume a `sources/` directory.

## Constraints

- Understand the corpus before defining the ontology.
- Do not create one page per source by default.
- Keep important derived knowledge traceable to source files.
- Preserve meaningful disagreement and uncertainty.
- Do not consider bootstrap complete until the process completion conditions pass.
