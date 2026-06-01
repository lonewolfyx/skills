# get-port-please

## Trigger Conditions

- Use when the workload requires port allocation utility rather than a broader framework abstraction.
- Selects an available TCP port for local development servers, previews, and tunnel entrypoints.

## Architectural Constraints

- Keep `get-port-please` at the architectural layer implied by its role: port allocation utility.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `get-port-please` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Port allocation utility
- Typical usage: Selects an available TCP port for local development servers, previews, and tunnel entrypoints.
- Common companions: `listhen`, `nitro`, `untun`
- Primary scenario family: CLI, Documentation, and Developer Experience

## Misuse Patterns to Avoid

- Do not spread direct `get-port-please` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
