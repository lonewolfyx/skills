# crossws

## Trigger Conditions

- Use when the workload requires cross-runtime websocket abstraction rather than a broader framework abstraction.
- Normalizes WebSocket behavior across Node.js, Bun, Deno, and edge-style runtimes.

## Architectural Constraints

- Keep `crossws` at the architectural layer implied by its role: cross-runtime websocket abstraction.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `crossws` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Cross-runtime WebSocket abstraction
- Typical usage: Normalizes WebSocket behavior across Node.js, Bun, Deno, and edge-style runtimes.
- Common companions: `nitro`, `listhen`, `h3`
- Primary scenario family: Server, HTTP, and Network Communication

## Misuse Patterns to Avoid

- Do not spread direct `crossws` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
