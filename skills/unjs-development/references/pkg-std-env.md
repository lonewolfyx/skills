# std-env

## Trigger Conditions

- Use when the workload requires runtime environment detector rather than a broader framework abstraction.
- Detects execution-environment capabilities across Node.js, Bun, Deno, Workers, and browsers.

## Architectural Constraints

- Keep `std-env` at the architectural layer implied by its role: runtime environment detector.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `std-env` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Runtime environment detector
- Typical usage: Detects execution-environment capabilities across Node.js, Bun, Deno, Workers, and browsers.
- Common companions: `unenv`, `ofetch`, `uncrypto`
- Primary scenario family: Build, Modules, and Plugin Infrastructure

## Misuse Patterns to Avoid

- Do not spread direct `std-env` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
