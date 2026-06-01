# listhen

## Trigger Conditions

- Use when the workload requires developer-oriented local listener rather than a broader framework abstraction.
- Bootstraps local HTTP listeners with a polished developer experience for previews and debugging.

## Architectural Constraints

- Keep `listhen` at the architectural layer implied by its role: developer-oriented local listener.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `listhen` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Developer-oriented local listener
- Typical usage: Bootstraps local HTTP listeners with a polished developer experience for previews and debugging.
- Common companions: `get-port-please`, `h3`, `crossws`, `untun`
- Primary scenario family: CLI, Documentation, and Developer Experience

## Misuse Patterns to Avoid

- Do not spread direct `listhen` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
