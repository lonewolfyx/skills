# changelogen

## Trigger Conditions

- Use when the workload requires release note generation rather than a broader framework abstraction.
- Generates changelog and release-note artifacts from a Conventional Commits history.

## Architectural Constraints

- Keep `changelogen` at the architectural layer implied by its role: release note generation.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `changelogen` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Release note generation
- Typical usage: Generates changelog and release-note artifacts from a Conventional Commits history.
- Common companions: `automd`, `consola`, `pkg-types`
- Primary scenario family: CLI, Documentation, and Developer Experience

## Misuse Patterns to Avoid

- Do not spread direct `changelogen` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
