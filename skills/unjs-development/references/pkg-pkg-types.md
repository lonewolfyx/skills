# pkg-types

## Trigger Conditions

- Use when the workload requires project metadata i/o rather than a broader framework abstraction.
- Reads and writes structured metadata such as package manifests and TypeScript configuration files.

## Architectural Constraints

- Keep `pkg-types` at the architectural layer implied by its role: project metadata i/o.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `pkg-types` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Project metadata I/O
- Typical usage: Reads and writes structured metadata such as package manifests and TypeScript configuration files.
- Common companions: `unbuild`, `jiti`, `untyped`
- Primary scenario family: Configuration, Schemas, and Project Metadata

## Misuse Patterns to Avoid

- Do not spread direct `pkg-types` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
