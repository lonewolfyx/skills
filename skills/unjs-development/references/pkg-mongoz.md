# mongoz

## Trigger Conditions

- Use when the workload requires lightweight mongodb developer layer rather than a broader framework abstraction.
- Introduces a low-friction MongoDB integration pattern for prototypes and infrastructure services.

## Architectural Constraints

- Keep `mongoz` at the architectural layer implied by its role: lightweight mongodb developer layer.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `mongoz` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Lightweight MongoDB developer layer
- Typical usage: Introduces a low-friction MongoDB integration pattern for prototypes and infrastructure services.
- Common companions: `nitro`, `c12`
- Primary scenario family: Data, Storage, and Core Runtime Utilities

## Misuse Patterns to Avoid

- Do not spread direct `mongoz` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
