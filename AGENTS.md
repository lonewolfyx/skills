# AGENTS.md

This file provides guidance to AI agents (Claude Code, Cursor, Copilot, Codex, etc.) working in this repository.

## Repository Purpose

This repo defines structured, reusable skills for AI coding assistants. Each skill is a self-contained set of rules — a SKILL.md manifest, reference documents, and agent configs — that instructs AI tools how to behave for specific coding tasks.

## Skill Structure

Every skill lives under `skills/<skill-name>/` with this layout:

```
skills/<skill-name>/
  SKILL.md            # Required. Manifest with YAML frontmatter + Markdown rules.
  SKILL_ZH.md         # Optional. Chinese translation.
  agents/
    openai.yaml       # Required. Agent integration config.
  references/
    *.md              # Required. Source-of-truth rule documents.
```

### SKILL.md Format

```markdown
---
name: <skill-name>
description: <one-line description used for skill discovery>
---

# <Title>

## Overview / Workflow / Rules / Output Style / Reference
```

- Frontmatter `name` must match the directory name.
- Frontmatter `description` is the trigger text — it should describe when an agent should activate this skill.
- Body should define: what the skill does, the workflow, concrete rules, and a reference map to the `references/` documents.

### agents/openai.yaml

```yaml
interface:
  display_name: "<Human-readable name>"
  short_description: "<Short description>"
  default_prompt: "Use $<skill-name> to <purpose>."
policy:
  allow_implicit_invocation: true
```

- `default_prompt` uses `$<skill-name>` to reference the SKILL.md by frontmatter name.

### references/

Reference files are the source of truth. SKILL.md should link to them and summarize; the detailed rules live in `references/`. Name references with numeric prefixes for ordering (e.g., `00-goals-principles.md`, `10-duplicate-functions-logic.md`).

## Creating a New Skill

1. Create `skills/<skill-name>/` directory.
2. Write `SKILL.md` with YAML frontmatter (`name`, `description`) and Markdown rules.
3. Create `references/` with detailed rule documents.
4. Create `agents/openai.yaml` with the agent integration config.
5. Optionally add `SKILL_ZH.md` for Chinese translation.
6. If the skill directory should be excluded from ESLint, add it to `ignores` in `eslint.config.ts`.

## Conventions

- Commit messages must follow Conventional Commits: `(revert: )?<type>(<scope>)?!?: <subject>` — see `scripts/verify-commit.js` for the validator and allowed types.
- ESLint uses `@antfu/eslint-config` with 4-space indent, single quotes. Run `pnpm lint` to check.
- Package manager is pnpm (10.33.2). The project is ESM (`"type": "module"`).
- Git hooks: pre-commit runs lint-staged, commit-msg validates commit format.

## Existing Skills

| Skill | Trigger |
|-------|---------|
| `git-commit-message` | Generating or reviewing git commit messages |
| `review-code-quality` | Auditing code for readability, maintainability, bugs, coupling |
| `ts-type-naming` | Enforcing TypeScript type naming conventions (`I` prefix for interfaces, camelCase for types) |
| `naming-convention` | Enforcing naming conventions for functions, constants, variables, and config parameters |
| `code-convergence-and-abstraction-boundary` | Detecting duplicate logic, enforcing abstraction boundaries, convergence rules |
