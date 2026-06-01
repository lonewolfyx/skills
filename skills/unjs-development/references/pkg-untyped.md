# untyped

## Trigger Conditions

- Use when the workload requires configuration contract generation rather than a broader framework abstraction.
- Derives public configuration types and documentation artifacts from schema-oriented configuration definitions.

## Architectural Constraints

- Keep `untyped` at the architectural layer implied by its role: configuration contract generation.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `untyped` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Configuration contract generation
- Typical usage: Derives public configuration types and documentation artifacts from schema-oriented configuration definitions.
- Common companions: `c12`, `defu`, `pkg-types`
- Primary scenario family: Configuration, Schemas, and Project Metadata

## Misuse Patterns to Avoid

- Do not spread direct `untyped` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
