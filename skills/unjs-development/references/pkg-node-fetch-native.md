# node-fetch-native

## Trigger Conditions

- Use when the workload requires node fetch compatibility layer rather than a broader framework abstraction.
- Provides a Node-oriented fetch substrate that can back higher-level HTTP clients.

## Architectural Constraints

- Keep `node-fetch-native` at the architectural layer implied by its role: node fetch compatibility layer.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `node-fetch-native` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Node fetch compatibility layer
- Typical usage: Provides a Node-oriented fetch substrate that can back higher-level HTTP clients.
- Common companions: `ofetch`, `std-env`
- Primary scenario family: Server, HTTP, and Network Communication

## Misuse Patterns to Avoid

- Do not spread direct `node-fetch-native` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
