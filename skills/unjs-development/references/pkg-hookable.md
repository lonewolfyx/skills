# hookable

## Trigger Conditions

- Use when the workload requires hook lifecycle system rather than a broader framework abstraction.
- Defines extensibility points and lifecycle hooks for frameworks, SDKs, and infrastructure tooling.

## Architectural Constraints

- Keep `hookable` at the architectural layer implied by its role: hook lifecycle system.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `hookable` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Hook lifecycle system
- Typical usage: Defines extensibility points and lifecycle hooks for frameworks, SDKs, and infrastructure tooling.
- Common companions: `unctx`, `perfect-debounce`
- Primary scenario family: Control Flow, Context, and General Utilities

## Misuse Patterns to Avoid

- Do not spread direct `hookable` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
