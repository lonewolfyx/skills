# magic-regexp

## Trigger Conditions

- Use when the workload requires composable regular-expression builder rather than a broader framework abstraction.
- Improves readability and maintainability for advanced regex-driven parsing or transformation rules.

## Architectural Constraints

- Keep `magic-regexp` at the architectural layer implied by its role: composable regular-expression builder.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `magic-regexp` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Composable regular-expression builder
- Typical usage: Improves readability and maintainability for advanced regex-driven parsing or transformation rules.
- Common companions: `magicast`, `unplugin`
- Primary scenario family: Control Flow, Context, and General Utilities

## Misuse Patterns to Avoid

- Do not spread direct `magic-regexp` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
