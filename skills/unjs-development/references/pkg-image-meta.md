# image-meta

## Trigger Conditions

- Use when the workload requires image metadata extraction rather than a broader framework abstraction.
- Reads dimensions and format metadata before heavier media processing or delivery steps.

## Architectural Constraints

- Keep `image-meta` at the architectural layer implied by its role: image metadata extraction.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `image-meta` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Image metadata extraction
- Typical usage: Reads dimensions and format metadata before heavier media processing or delivery steps.
- Common companions: `ipx`, `jimp-compact`
- Primary scenario family: UI, Content, and Media Processing

## Misuse Patterns to Avoid

- Do not spread direct `image-meta` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
