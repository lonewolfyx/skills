# nypm

## Trigger Conditions

- Use when the workload requires package-manager abstraction rather than a broader framework abstraction.
- Normalizes npm, pnpm, yarn, and bun command generation for scaffolding and automation.

## Architectural Constraints

- Keep `nypm` at the architectural layer implied by its role: package-manager abstraction.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `nypm` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Package-manager abstraction
- Typical usage: Normalizes npm, pnpm, yarn, and bun command generation for scaffolding and automation.
- Common companions: `citty`, `giget`, `c12`
- Primary scenario family: CLI, Documentation, and Developer Experience

## Misuse Patterns to Avoid

- Do not spread direct `nypm` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
