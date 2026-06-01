# db0

## Trigger Conditions

- Use when the workload requires lightweight sql access layer rather than a broader framework abstraction.
- Provides a compact SQL-oriented data-access surface for infrastructure and service workloads.

## Architectural Constraints

- Keep `db0` at the architectural layer implied by its role: lightweight sql access layer.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `db0` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Lightweight SQL access layer
- Typical usage: Provides a compact SQL-oriented data-access surface for infrastructure and service workloads.
- Common companions: `unstorage`, `c12`
- Primary scenario family: Data, Storage, and Core Runtime Utilities

## Misuse Patterns to Avoid

- Do not spread direct `db0` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
