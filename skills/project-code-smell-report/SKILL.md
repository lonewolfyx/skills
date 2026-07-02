---
name: project-code-smell-report
description: Generate evidence-backed project code smell and technical debt reports, including 屎山代码判定, readability, maintainability, structure, duplication, abstraction boundary, React/TypeScript, accessibility, and engineering maturity checks. Use when asked to scan or audit a codebase, quantify code smells, judge whether a project is 屎山, or produce a debt report.
---

# Project Code Smell Report

## Overview

Generate a data-backed code smell report for a project. Default to a Chinese report unless the user asks for another language.

Use this skill for report-only audits. Do not modify project code unless the user explicitly asks for fixes after the report.

## Workflow

1. Resolve the audit target.
Use the path provided by the user. If no path is provided, use the current workspace root. Read local instructions such as `AGENTS.md`, `README.md`, package metadata, and framework config only as needed to understand boundaries and generated paths.

2. Load the required references.
Always read:
- [references/10-audit-rubric.md](references/10-audit-rubric.md)
- [references/20-hard-boundaries.md](references/20-hard-boundaries.md)
- [references/30-report-template.md](references/30-report-template.md)
- [references/40-evidence-collection.md](references/40-evidence-collection.md)

3. Collect evidence.
Follow [references/40-evidence-collection.md](references/40-evidence-collection.md) to inspect files, search repeated logic, find large files/functions, locate TODO/HACK clusters, identify hardcoded values, and confirm boundary violations. Treat raw search output as candidates, not final verdicts.

4. Inspect high-risk files.
Open the files with the strongest signals: largest files, longest functions, deepest nesting, duplicated blocks, thin-wrapper candidates, direct API calls, TypeScript escape hatches, TODO/HACK clusters, magic values, and accessibility candidates. Use concrete source evidence before judging.

5. Decide the verdict.
Classify with evidence:
- `是屎山`: at least one confirmed hard boundary from `20-hard-boundaries.md`, or smell score is 70+ with multiple confirmed high-risk categories.
- `疑似屎山`: smell score is 45-69, or there are repeated candidates that need domain confirmation.
- `暂未判定为屎山`: smell score is below 45 and no confirmed hard boundary exists.

If a rule from `20-hard-boundaries.md` is confirmed, mark it as `命中屎山边界` even if the overall codebase is small.

6. Produce the report.
Use the structure in [references/30-report-template.md](references/30-report-template.md). Include counts, top risky files, confirmed boundary hits, category scores, evidence, and prioritized remediation direction.

## Evidence Rules

- Cite concrete file and line references for every confirmed issue.
- Separate `候选信号` from `已确认问题`.
- Do not count `node_modules`, build output, generated files, lockfiles, vendored code, or snapshots as source debt unless the project intentionally maintains them.
- Do not judge stable duplication as bad when semantics, lifecycle, or future change direction are different.
- Do not recommend abstracting a small local expression unless it creates a real business boundary, error strategy, type contract, or stable shared entry point.
- If evidence is insufficient, say what was sampled and what remains uncertain.

## Resource Map

- `references/10-audit-rubric.md`: category checklist for readability, maintainability, structure, smells, and engineering maturity.
- `references/20-hard-boundaries.md`: mandatory boundary rules. Confirmed hits force a 屎山 boundary verdict.
- `references/30-report-template.md`: required Chinese output format.
- `references/40-evidence-collection.md`: evidence collection method and scoring guidance.
