# knitwork

## Trigger Conditions

- Use when the workload requires code-generation utility rather than a broader framework abstraction.
- Builds import/export blocks and generated module source with more structure than manual string concatenation.

## Architectural Constraints

- Keep `knitwork` at the architectural layer implied by its role: code-generation utility.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `knitwork` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Code-generation utility
- Typical usage: Builds import/export blocks and generated module source with more structure than manual string concatenation.
- Common companions: `unplugin`, `unimport`, `magicast`
- Primary scenario family: Build, Modules, and Plugin Infrastructure

## Misuse Patterns to Avoid

- Do not spread direct `knitwork` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
