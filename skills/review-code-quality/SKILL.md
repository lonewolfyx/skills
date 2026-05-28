---
name: review-code-quality
description: Review source code for readability, maintainability, code structure, code smells, React state/effect usage, TypeScript rigor, abstraction quality, and accessibility. Use when Codex needs to audit a file, component, hook, utility, PR, or code snippet and return concrete findings for code review.
---

# Review Code Quality

## Overview

Review code with a reviewer mindset, not a linter mindset. Prioritize findings that create bugs, hidden coupling, maintenance cost, or team confusion, and avoid noisy style-only comments unless the issue materially hurts comprehension or violates an explicit project convention.

Default to review-only output. Do not rewrite code unless the user explicitly asks for fixes.

## Workflow

1. Identify the review target and stack.
Inspect the file, diff, or snippet first. Note whether the target is React, TypeScript, frontend UI, utility code, or mixed logic so the review stays relevant.

2. Build minimal context before judging.
Read adjacent helpers, types, hooks, or constants when they are needed to understand intent, ownership, and module boundaries. Do not speculate about missing context when you can inspect it.

3. Scan for high-signal issues first.
Start with logic that often hides real risk:
- overgrown functions or components
- duplicated branches or copy-paste logic
- nested control flow
- hardcoded business values
- weak naming or muddy abstraction boundaries
- React `useEffect` / state misuse
- async flows that are difficult to reason about
- missing or imprecise TypeScript types
- accessibility gaps in UI markup

4. Judge against the rubric, not personal taste.
Use the checklist in [references/review-rubric.md](references/review-rubric.md) to decide whether an issue is a material finding, a mild suggestion, or not worth calling out.

5. Report actionable findings only.
For each finding, explain:
- what the issue is
- why it matters
- where it lives
- what refactor direction would improve it

6. Close with gaps, not filler.
If no material findings are present, say so explicitly and mention any residual uncertainty such as unreviewed files, missing tests, or unclear product constraints.

## Review Rules

- Prefer findings over nits. Do not flood the user with cosmetic comments.
- Treat repository conventions as the source of truth when they conflict with generic best practices.
- Keep the review proportional to the artifact. A small utility may only need a few focused comments; a large component may need architecture-level findings.
- Escalate when a maintainability smell may also cause behavioral bugs, especially around stale closures, effect dependencies, global mutation, or magic values that encode business rules.
- Check accessibility when the target includes rendered UI, semantic HTML, forms, or interactive controls.

## Output Style

- Present findings first, ordered by severity.
- Include file and line references when available.
- Keep each finding concise but concrete.
- Separate open questions or assumptions after the findings.
- Keep the final summary brief.
- If the user asks for "review only", do not include patch proposals.
- If the user asks to fix issues after the review, address the highest-leverage findings first.

## Reference

Read [references/review-rubric.md](references/review-rubric.md) for the detailed checklist covering readability, maintainability, structure, code smells, React and TypeScript usage, accessibility, and engineering maturity signals.
