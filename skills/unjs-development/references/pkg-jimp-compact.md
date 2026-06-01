# jimp-compact

## Trigger Conditions

- Use when the workload requires pure-javascript image processing rather than a broader framework abstraction.
- Performs image manipulation without depending on native binaries.

## Architectural Constraints

- Keep `jimp-compact` at the architectural layer implied by its role: pure-javascript image processing.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `jimp-compact` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Pure-JavaScript image processing
- Typical usage: Performs image manipulation without depending on native binaries.
- Common companions: `image-meta`, `ipx`
- Primary scenario family: UI, Content, and Media Processing

## Misuse Patterns to Avoid

- Do not spread direct `jimp-compact` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
