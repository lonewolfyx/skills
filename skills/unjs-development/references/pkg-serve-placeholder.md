# serve-placeholder

## Trigger Conditions

- Use when the workload requires fallback placeholder server rather than a broader framework abstraction.
- Returns placeholder responses when expected static or media assets are unavailable.

## Architectural Constraints

- Keep `serve-placeholder` at the architectural layer implied by its role: fallback placeholder server.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `serve-placeholder` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Fallback placeholder server
- Typical usage: Returns placeholder responses when expected static or media assets are unavailable.
- Common companions: `h3`, `nitro`, `ipx`
- Primary scenario family: Server, HTTP, and Network Communication

## Misuse Patterns to Avoid

- Do not spread direct `serve-placeholder` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
