# Issue tracker: GitHub

Issues and specs for this repo live as GitHub issues. Use the `gh` CLI for all operations.

## Conventions

- Create an issue: `gh issue create --title "..." --body "..."`.
- Read an issue: `gh issue view <number> --json number,title,body,labels,comments`.
- List issues: `gh issue list --state open --json number,title,body,labels,comments` with appropriate filters.
- Comment: `gh issue comment <number> --body "..."`.
- Apply or remove labels: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`.
- Close: `gh issue close <number> --comment "..."`.
- Infer the repository from `git remote -v`; `gh` does this automatically inside a clone.

## Pull requests as a triage surface

**PRs as a request surface: no.** Set this to `yes` only if external PRs are to be treated as feature requests. When enabled, use `gh pr view <number> --comments` and `gh pr diff <number>` to read them, and `gh pr comment`, `gh pr edit`, and `gh pr close` to act on them. GitHub issues and PRs share a number space; resolve ambiguity with `gh pr view <number>` and fall back to `gh issue view <number>` as needed.

## Publishing and fetching

- When a skill says “publish to the issue tracker,” create a GitHub issue.
- When a skill says “fetch the relevant ticket,” run `gh issue view <number> --comments`.

## Wayfinding

- **Map:** one issue labelled `wayfinder:map`, containing Notes / Decisions-so-far / Fog.
- **Child ticket:** use a GitHub sub-issue where available; otherwise add the child to a task list in the map and put `Part of #<map>` at the top of the child body. Use `wayfinder:research`, `wayfinder:prototype`, `wayfinder:grilling`, or `wayfinder:task` labels.
- **Blocking:** use native GitHub issue dependencies where available; otherwise add `Blocked by: #<n>` to the child body. A ticket is unblocked when every blocker is closed.
- **Claim:** assign with `gh issue edit <n> --add-assignee @me`.
- **Resolve:** comment with the answer, close the issue, then append a context pointer to the map’s Decisions-so-far.
