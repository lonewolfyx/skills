# Evidence Collection

This skill is pure instruction and reference material. Do not add bundled scanning scripts. Collect evidence with normal repository inspection tools and the model's code review judgment.

## Audit Scope

Identify the target source roots and exclude dependency, generated, build, coverage, snapshot, vendored, lockfile, and public asset output directories unless the user explicitly asks to audit them.

Common exclusions:

- `node_modules`
- `dist`, `build`, `out`, `.next`, `.nuxt`, `.output`, `coverage`
- generated folders such as `generated` and `__generated__`
- lockfiles and minified bundles
- snapshots and fixtures unless they are the review target

## Evidence To Collect

Collect enough evidence to fill the report template:

- scanned file count and approximate source line count
- largest files and likely God files
- long function/component candidates
- nested control-flow candidates
- repeated logic, repeated UI structure, repeated constants, repeated request/state/error handling
- TODO, FIXME, HACK, TEMP, WORKAROUND clusters
- magic strings, magic numbers, route names, API paths, cache keys, storage keys, status values, defaults, intervals, regexes
- thin wrapper and pseudo abstraction candidates
- TypeScript escape hatches: `any`, `as any`, `@ts-ignore`, `@ts-expect-error`, broad assertions, fake generic safety
- React/Vue state and side-effect misuse
- direct API calls from page/component/store layers
- accessibility candidates in rendered UI
- unclear public entry points, deep imports, overlapping `utils` / `helpers` / `common` / `shared` boundaries

## Confirmation Rules

Treat search hits as candidates until confirmed by reading surrounding code.

Confirm duplication only when the duplicated logic has the same behavior, same business semantics, and likely shared future changes.

Confirm a thin wrapper only when it adds no business rule, error strategy, type contract, compatibility strategy, stable public entry, external dependency isolation, state/lifecycle boundary, or testing value.

Confirm magic values only when literals encode stable business, protocol, route, API, state, timing, formatting, permission, cache, storage, or UI rules.

Do not count generated code, framework-required repetition, intentionally explicit tests, or similar-looking code with different semantics as 屎山 evidence.

## Scoring Guidance

Score each audit category from 0 to 20 using [10-audit-rubric.md](10-audit-rubric.md). Sum the five categories into a 0-100 屎山指数.

- 0-24: Low. Local cleanup only.
- 25-44: Medium. Maintainability risk exists but no broad boundary failure.
- 45-69: High. Likely structural debt or repeated patterns requiring focused refactor.
- 70-100: Critical. Hard boundary hit, change-coupled duplication, or architecture-level drift.

If any confirmed hard boundary from [20-hard-boundaries.md](20-hard-boundaries.md) exists, the final score should usually be at least 70 unless the hit is isolated, generated, or short-lived migration code.
