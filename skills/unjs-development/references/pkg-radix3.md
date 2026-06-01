# radix3

## Trigger Conditions

- Use when the workload requires radix-tree path matcher rather than a broader framework abstraction.
- Provides high-performance route matching and path dispatch for HTTP and gateway-style workloads.

## Architectural Constraints

- Keep `radix3` at the architectural layer implied by its role: radix-tree path matcher.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `radix3` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Radix-tree path matcher
- Typical usage: Provides high-performance route matching and path dispatch for HTTP and gateway-style workloads.
- Common companions: `h3`, `ufo`
- Primary scenario family: Server, HTTP, and Network Communication

## Misuse Patterns to Avoid

- Do not spread direct `radix3` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
