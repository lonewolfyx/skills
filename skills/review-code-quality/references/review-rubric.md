# Code Review Rubric

Use this rubric to decide whether a comment is a real finding, a mild suggestion, or just personal preference. Raise findings when the issue materially harms correctness, readability, maintainability, extensibility, or collaboration.

## Readability

### Naming clarity

- Flag names that hide business intent, such as `data`, `item`, `handle`, `temp`, or `fn`, when the code clearly has a more precise domain meaning.
- Prefer names that reveal business concepts, side effects, and ownership.
- Do not nitpick short loop variables or obvious local names unless they obscure logic.

### Single responsibility

- Flag functions that fetch data, transform it, mutate state, format UI values, and handle control flow all at once.
- Flag components that mix view layout, data orchestration, permissions, and domain rules in a single block.
- Stronger finding when the function is long and difficult to test or explain.

### Clear visual structure

- Flag dense logic with weak paragraphing, inconsistent spacing, or giant blocks that hide stage boundaries.
- Flag code whose structure makes it hard to see guard clauses, happy paths, and exceptional paths.
- Treat this as a lower-severity finding unless it also increases bug risk.

### Comments explain why

- Flag missing comments only when intent is non-obvious, the rule is domain-specific, or a workaround needs context.
- Flag comments that restate the code without adding insight.
- Prefer comments that explain tradeoffs, invariants, and business constraints.

### Duplication

- Flag copy-paste branches, repeated condition trees, or repeated mapping logic that should share one abstraction.
- Escalate when duplication is likely to drift or already differs subtly between locations.
- Do not force abstraction for two tiny call sites unless there is real maintenance value.

## Maintainability

### Module boundaries

- Flag giant files or components that own too many responsibilities.
- Flag business logic embedded deep inside views when it would be clearer in utilities, hooks, services, or constants.
- Flag cross-layer coupling, such as UI components importing persistence details directly without a clear boundary.

### Nesting depth

- Flag logic that regularly exceeds two or three nested control levels and would read better with guard clauses, extracted helpers, or state machines.
- Escalate when deep nesting makes it hard to verify all branches or cleanup paths.

### Hardcoded values

- Flag hardcoded strings, URLs, feature flags, thresholds, retry counts, and business constants that should live in named constants or configuration.
- Treat magic values as higher severity when they encode domain rules with no explanation.
- Do not flag harmless literals that are self-evident, such as `0`, `1`, or small layout values, unless context makes them ambiguous.

### Technical debt markers

- Flag `TODO`, `FIXME`, `HACK`, temporary workarounds, or comments that admit known fragility.
- Explain whether the debt is acceptable scaffolding or a real risk that should block the change.

## Structure And Patterns

### State and side effects

- In React, flag `useEffect` blocks that derive state unnecessarily, hide imperative sync work, or depend on unstable values without care.
- Flag state that can be computed from props or existing state instead of stored redundantly.
- Flag side effects mixed into render-time logic or event flows that make re-renders unpredictable.

### Component decomposition

- Flag components that are hard to scan because rendering, state orchestration, data fetching, and domain policy all live together.
- Suggest splitting only when the extraction would create clearer ownership or reusability, not abstraction for its own sake.

### Module organization

- Flag projects where helpers, constants, services, and UI concerns are mixed without clear layering.
- Prefer clear separation when the domain is large enough to benefit from it.

### Modern syntax

- Flag outdated or verbose patterns when the project already uses modern JavaScript or TypeScript conventions.
- Examples include repeated property access instead of destructuring when it hurts clarity, callback pyramids instead of `async` / `await`, or weakly typed ad hoc objects where explicit types would help.
- Do not rewrite stable code only to chase novelty.

### Type rigor

- In TypeScript, flag missing parameter, return, or domain model types when inference is not enough to preserve intent.
- Flag broad escape hatches such as `any`, unsafe casts, or loosely shaped objects passed through many layers.
- Escalate when unclear types make invalid states easy to represent.

## Code Smells

### Magic numbers and strings

- Flag raw values like `0.7`, `1234`, or `'abc'` when they are not self-explanatory.
- Prefer named constants, enums, or comments that explain domain meaning.

### Long functions

- Flag functions above roughly 50 lines when they also mix concerns, branch heavily, or require scrolling to understand the lifecycle.
- Length alone is not the issue; mixed responsibility is.

### Nested hell

- Flag control flow that stacks `if`, `for`, `switch`, and callback nesting until the happy path disappears.
- Prefer guard clauses, helper extraction, or flattened control flow.

### Copy-paste logic

- Flag repeated logic blocks with only tiny changes.
- Escalate when later edits are likely to update one branch but not the others.

### Global state pollution

- Flag direct mutation of globals, implicit shared caches, or modules with hidden singleton state unless the pattern is deliberate and encapsulated.
- Escalate when tests, concurrency, or independent consumers may interfere with each other.

### Async complexity

- Flag nested `.then()` chains, mixed promise styles, or async flows with hidden sequencing and weak error handling.
- Prefer `async` / `await`, named steps, and explicit cancellation or cleanup when relevant.

## Engineering Maturity

### Abstraction and encapsulation

- Reward code that extracts stable domain logic into utilities, hooks, or services with clear APIs.
- Flag leaky abstractions that merely move complexity around without clarifying responsibility.

### Boundary discipline

- Flag cross-module knowledge leaks, such as a low-level helper depending on page-level UI details or presentation code knowing storage internals.
- Prefer boundaries that match the product architecture.

### Accessibility

- For UI code, flag non-semantic clickable elements, missing labels, poor keyboard support, missing `aria` relationships, or state that is only visible visually.
- Treat accessibility as a first-class quality concern, not a bonus.

### Best practices and patterns

- Flag problems that would be simpler or safer with a known pattern, such as strategy objects, state machines, composition, or clearer dependency injection.
- Do not force formal patterns when a small extraction solves the problem.

### Domain modeling

- Prefer names and types that reflect the business domain rather than transport or UI accidents.
- Flag code where important business states are represented by vague booleans, unrelated strings, or loosely coordinated values.

## Severity Guidance

- High: likely bug, stale state risk, invalid state modeling, global pollution, or architecture that will cause repeated regressions.
- Medium: meaningful maintenance drag, unclear ownership, long-term duplication, hardcoded business rules, or missing types that hide intent.
- Low: readability, structure, or comment issues that do not currently threaten correctness but still slow future work.
