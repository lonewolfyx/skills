# magicast

## Trigger Conditions

- Use when the workload requires programmatic source-file mutation rather than a broader framework abstraction.
- Applies structured mutations to configuration files and relatively stable JavaScript or TypeScript modules.

## Architectural Constraints

- Keep `magicast` at the architectural layer implied by its role: programmatic source-file mutation.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `magicast` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Programmatic source-file mutation
- Typical usage: Applies structured mutations to configuration files and relatively stable JavaScript or TypeScript modules.
- Common companions: `unplugin`, `unimport`, `knitwork`
- Primary scenario family: Build, Modules, and Plugin Infrastructure

## Misuse Patterns to Avoid

- Do not spread direct `magicast` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
