---
name: git-commit-message
description: Generate changelog-friendly Git commit messages that align with Conventional Commits, Angular-style commit writing, and repository-specific validators such as `scripts/verify-commit.js`. Use when Codex needs to inspect staged changes, choose a valid commit `type`, draft a `git commit` message, rewrite a failing commit header, or help with Git 提交信息 / commit message / git comment generation.
---

# Git Commit Message

## Overview

Generate a commit message that is semantically correct and locally valid.
Prefer the repository's own validator over generic commit-convention advice when they conflict.

## Workflow

1. Inspect the change before writing anything.
Use `git status --short`, `git diff --cached --stat`, and `git diff --cached` when available.
If nothing is staged, inspect the relevant diff the user points to and say that the message is based on unstaged or described changes.

2. Load repository-specific rules first.
If the repository contains `scripts/verify-commit.js`, `.github/commit-convention.md`, `commitlint` config, or equivalent commit hooks, read them and treat them as the source of truth.
For this repository, `scripts/verify-commit.js` currently accepts this header shape:

```text
(revert: )?<type>(<scope>)?!?: <subject>
```

3. Choose the narrowest valid `type`.
Use the repository's allowed type list when present.
For this repository, the accepted types are:

```text
feat, fix, docs, dx, style, refactor, perf, test,
workflow, build, ci, chore, types, wip, release
```

4. Draft the subject line in Angular style.
Keep it imperative, specific, and without a trailing period.
Use lowercase after `type(scope):` unless an identifier or brand requires uppercase.
Keep the first line short enough to satisfy the validator.

5. Validate against local constraints before returning.
For this repository:
- Keep the subject between 1 and 50 characters.
- Allow `type!:` and `type(scope)!:` for breaking changes.
- Keep `scope` optional and omit it when it adds no value.
- Allow `revert: ` only when the change is actually reverting a prior commit.

6. Add body or footer only when it helps.
The local validator only checks the header prefix, but when a body/footer is useful, keep Angular-style structure:
- Separate header, body, and footer with blank lines.
- Explain what changed and why, not how.
- Put issue references or breaking-change notes in the footer or body.
- If the change is breaking, prefer `!` in the header and optionally add details in the body/footer.

## Type Selection

- `feat`: add a user-facing feature.
- `fix`: fix a bug or incorrect behavior.
- `docs`: change documentation only.
- `dx`: improve developer experience, ergonomics, or local workflow without changing runtime behavior.
- `style`: make formatting or style-only changes with no behavior change.
- `refactor`: restructure code without feature or bug-fix behavior changes.
- `perf`: improve performance.
- `test`: add or update tests.
- `workflow`: change repository automation or workflow definitions.
- `build`: change build tooling, packaging, bundling, or dependency build steps.
- `ci`: change continuous integration configuration.
- `chore`: make maintenance changes that do not fit a more specific type.
- `types`: make type-only changes, such as TypeScript declarations or stricter annotations.
- `wip`: record deliberate work in progress when the user explicitly wants that status.
- `release`: cut a release, version bump, or publish release artifacts.

Prefer a more specific type over `chore`.
Prefer `types` over `refactor` or `chore` when the diff is type-only.
Prefer `dx` over `chore` when the main value is better contributor experience.

## Subject Rules

- Use the pattern `type(scope): subject` or `type(scope)!: subject`.
- Keep the subject actionable and concrete.
- Avoid generic subjects like `update files` or `fix stuff`.
- Avoid trailing punctuation.
- Avoid stuffing multiple unrelated changes into one header.
- If the change mixes unrelated concerns, recommend splitting the commit before drafting the message.
- Use `!` only when the change introduces a breaking API, behavior, or contract change.

## Output Style

When the user asks for a commit message, return the best final message first.
If confidence is low because the diff spans multiple intents, return:

1. A recommended commit message.
2. One short note explaining the ambiguity.
3. Up to two alternatives only when they reflect meaningfully different type/scope choices.

Wrap multi-line commit messages in a fenced code block.
If the user asks for "just the message", return only the message with no extra commentary.

## Reference

Read [references/commit-rules.md](references/commit-rules.md) when you need the rationale behind the header format, Angular-style writing guidance, or the differences between generic Conventional Commits and this repository's local validator.
