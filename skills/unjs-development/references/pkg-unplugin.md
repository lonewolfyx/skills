# unplugin

## Trigger Conditions

- Authoring a plugin that must support multiple bundlers without duplicating core transform logic.
- Wrapping a shared transform engine for Vite, Rollup, webpack, and esbuild.

## Architectural Constraints

- Keep bundler adapters thin and place transform semantics in a bundler-agnostic core.
- Centralize option normalization before entering bundler-specific hooks.
- Treat declaration generation and generated side effects as first-class artifacts.

## Implementation Guidance

1. Build a `core/` module that has no bundler dependency.
1. Add one adapter per supported bundler under `integrations/`.
1. Write snapshot or fixture tests against the shared transform layer.

## Recommended Composition

- Primary role: Multi-bundler plugin framework
- Typical usage: Hosts shared plugin logic across Vite, Rollup, webpack, and esbuild integration layers.
- Common companions: `unimport`, `magicast`, `knitwork`
- Primary scenario family: Build, Modules, and Plugin Infrastructure

## Misuse Patterns to Avoid

- Do not duplicate transform logic across bundler adapters.
- Do not let one bundler-specific hook shape the public plugin contract.

## Verification Checklist

- All supported bundlers produce equivalent transform results.
- Adapter code remains substantially thinner than core transform code.
- Generated declarations type-check successfully.
