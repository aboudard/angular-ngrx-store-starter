# Domain Docs

How engineering skills consume this repo's domain documentation.

## Before exploring

- Read root `GLOSSARY.md`, or root `GLOSSARY-MAP.md` if present and the relevant context glossary it points to.
- Read relevant decisions in `docs/adr/`. If the repo later becomes multi-context, also check `src/<context>/docs/adr/`.
- If these files do not exist, proceed without flagging their absence or proposing them upfront. Create them lazily when domain terms or decisions are resolved.

## Layout

This repo uses a single-context layout: root `GLOSSARY.md` and `docs/adr/`.

## Vocabulary and decisions

Use glossary terms for domain concepts in issue titles, refactor proposals, hypotheses, and tests. If a needed concept is absent, reconsider the wording or note the gap for domain modeling. Explicitly flag when a proposal contradicts an existing ADR and explain why it may be worth revisiting.
