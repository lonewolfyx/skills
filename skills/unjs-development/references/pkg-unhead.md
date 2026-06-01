# unhead

## Trigger Conditions

- Use when the workload requires head and metadata manager rather than a broader framework abstraction.
- Centralizes document head state, SEO metadata, canonical tags, and social-preview attributes.

## Architectural Constraints

- Keep `unhead` at the architectural layer implied by its role: head and metadata manager.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `unhead` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Head and metadata manager
- Typical usage: Centralizes document head state, SEO metadata, canonical tags, and social-preview attributes.
- Common companions: `undocs`, `fontaine`, `theme-colors`
- Primary scenario family: UI, Content, and Media Processing

## Misuse Patterns to Avoid

- Do not spread direct `unhead` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
