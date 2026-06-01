# consola

## Trigger Conditions

- Use when the workload requires structured terminal logging rather than a broader framework abstraction.
- Provides a leveled logging facade for CLIs, developer tooling, local servers, and release workflows.

## Architectural Constraints

- Keep `consola` at the architectural layer implied by its role: structured terminal logging.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `consola` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Structured terminal logging
- Typical usage: Provides a leveled logging facade for CLIs, developer tooling, local servers, and release workflows.
- Common companions: `citty`, `listhen`, `changelogen`
- Primary scenario family: CLI, Documentation, and Developer Experience

## Misuse Patterns to Avoid

- Do not spread direct `consola` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
