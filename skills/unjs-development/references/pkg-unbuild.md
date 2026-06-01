# unbuild

## Trigger Conditions

- Publishing a reusable package with ESM, CJS, or declaration-file outputs.
- Standardizing the build contract of a monorepo package family.

## Architectural Constraints

- Treat `unbuild` as the primary build orchestrator and avoid redundant toolchains that solve the same artifact problem.
- Align exports, generated files, and type declarations from the outset.
- Keep development-only execution helpers outside the consumer runtime contract.

## Implementation Guidance

1. Define the output matrix before editing exports.
1. Use `mkdist` only for the file-to-file cases that benefit from bundleless output.
1. Validate artifacts from a downstream fixture package or integration test.

## Recommended Composition

- Primary role: Library build orchestrator
- Typical usage: Compiles reusable packages into ESM, CJS, and type-declaration artifacts with a consistent build contract.
- Common companions: `mkdist`, `mlly`, `pkg-types`
- Primary scenario family: Build, Modules, and Plugin Infrastructure

## Misuse Patterns to Avoid

- Do not patch manifest exports by hand after every build.
- Do not leak build-time-only dependencies into consumer expectations.

## Verification Checklist

- Exports resolve to real files.
- Types cover every public entrypoint.
- ESM and CJS consumers observe equivalent semantics.
