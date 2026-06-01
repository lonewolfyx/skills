# cookie-es

## Trigger Conditions

- Use when the workload requires cookie serialization layer rather than a broader framework abstraction.
- Handles cookie parsing and serialization at HTTP boundaries for APIs, sessions, and authentication middleware.

## Architectural Constraints

- Keep `cookie-es` at the architectural layer implied by its role: cookie serialization layer.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `cookie-es` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Cookie serialization layer
- Typical usage: Handles cookie parsing and serialization at HTTP boundaries for APIs, sessions, and authentication middleware.
- Common companions: `h3`, `ofetch`
- Primary scenario family: Server, HTTP, and Network Communication

## Misuse Patterns to Avoid

- Do not spread direct `cookie-es` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
