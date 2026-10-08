# Query process

Answer a question from the maintained wiki.

## Input

- a user question;
- the existing wiki.

## Process

1. Start from `wiki/index.md`.
2. Read `wiki/ontology.md` when its terminology, page types, or relationships affect interpretation.
3. Read the most relevant wiki pages.
4. Follow internal links that materially help answer the question.
5. Consult raw source files only when:
   - provenance needs verification;
   - wiki knowledge is ambiguous;
   - sources disagree;
   - required detail is not represented in the wiki.
6. Answer from the maintained knowledge while preserving material uncertainty or disagreement.

## Knowledge gaps

A query may reveal missing knowledge, duplicate pages, weak boundaries, stale synthesis, or an ontology mismatch.

Do not silently mutate the wiki during a query. Route source-driven corrections through the ingest process and structural corrections through the maintenance process.
