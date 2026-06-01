# Library Build and Release Toolkit

## Scenario Definition

Use this scenario when the artifact is a distributable npm package, reusable internal package, or toolchain library with a public import contract.

## Recommended Toolkit Layers

| Layer | Preferred Package(s) | Responsibility |
| --- | --- | --- |
| Build orchestration | `unbuild` | Owns the package build contract and output matrix. |
| Bundleless distribution | `mkdist` | Preserves source topology when file-to-file transformation is preferable. |
| Module interoperability | `mlly` | Handles ESM/CJS adaptation and import-export analysis. |
| Development-time execution | `jiti` | Allows TypeScript and ESM-oriented config execution during build setup. |
| Project metadata | `pkg-types` | Edits exports, manifest fields, and TypeScript configuration with structured access. |
| Filesystem paths | `pathe` | Normalizes path handling across platforms and package layouts. |

## Suggested Repository Layout

```text
src/
build.config.ts
package.json
tsconfig.json
```

## Implementation Sequence

1. Define the output contract first: ESM, CJS, types, bundleless files, or a combination.
1. Align exports and generated artifacts before introducing advanced build optimizations.
1. Keep development-time loaders isolated from the runtime contract of the published package.
1. Test consumption from a downstream fixture rather than trusting build logs alone.

## Validation Checklist

- Generated exports match actual artifact locations.
- Type declarations cover all public entrypoints.
- Build-time-only dependencies do not leak into consumer runtime requirements.
- ESM and CJS consumers observe consistent behavior.
