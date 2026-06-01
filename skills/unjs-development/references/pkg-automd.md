# automd

## Trigger Conditions

- Use when the workload requires markdown automation rather than a broader framework abstraction.
- Automates controlled Markdown regions such as README sections, generated tables of contents, badges, and embedded snippets.

## Architectural Constraints

- Keep `automd` at the architectural layer implied by its role: markdown automation.
- Separate transport concerns, orchestration concerns, and domain concerns instead of collapsing them into a single module.
- Prefer deterministic composition points and explicitly documented boundaries over implicit framework behavior.

## Implementation Guidance

1. Place `automd` behind a feature-local module boundary so the rest of the codebase consumes a stable interface.
1. Normalize inputs at the boundary layer before invoking deeper services or transforms.
1. Co-locate package-specific policy such as defaults, naming conventions, caching, or error handling with the integration module.

## Recommended Composition

- Primary role: Markdown automation
- Typical usage: Automates controlled Markdown regions such as README sections, generated tables of contents, badges, and embedded snippets.
- Common companions: `changelogen`, `mdbox`, `undocs`
- Primary scenario family: CLI, Documentation, and Developer Experience

## Misuse Patterns to Avoid

- Do not spread direct `automd` calls across unrelated business modules.
- Do not use the package as a substitute for higher-level architecture decisions it does not actually solve.

## Verification Checklist

- Boundary behavior is covered by scenario-oriented tests or fixtures.
- Failure modes are observable and easy to diagnose from logs or output artifacts.
- The integration remains replaceable without invasive refactoring.
