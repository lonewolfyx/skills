# bundle-runner

## Trigger Conditions

- Use when the workload requires bundle execution harness rather than a broader framework abstraction.
- Executes generated bundles in Node.js for post-build validation and integration testing.

## Architectural Constraints

- Keep `bundle-runner` at the architectural layer implied by its role: bundle execution harness.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `bundle-runner` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Bundle execution harness
- Typical usage: Executes generated bundles in Node.js for post-build validation and integration testing.
- Common companions: `unbuild`, `mlly`
- Primary scenario family: Build, Modules, and Plugin Infrastructure

## Misuse Patterns to Avoid

- Do not spread direct `bundle-runner` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
