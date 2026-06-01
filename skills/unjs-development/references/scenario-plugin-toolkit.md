# Bundler Plugin, Auto-Import, and Codemod Toolkit

## Scenario Definition

Use this scenario when the deliverable is a reusable bundler plugin, auto-import system, codemod, or build-time source transform.

## Recommended Toolkit Layers

| Layer | Preferred Package(s) | Responsibility |
| --- | --- | --- |
| Multi-bundler integration | `unplugin` | Connects shared plugin logic to Vite, Rollup, webpack, and esbuild lifecycles. |
| Auto-import generation | `unimport` | Scans export surfaces and emits declarations for auto-imported APIs. |
| Source mutation | `magicast` | Mutates configuration files and relatively stable modules with structured transforms. |
| Code generation | `knitwork` | Produces generated import/export source and helper modules. |
| Regex composition | `magic-regexp` | Supports readable and testable pattern definitions when regex is still the right abstraction. |

## Suggested Repository Layout

```text
src/
  core/
  integrations/
  transforms/
  dts/
  presets/
```

## Implementation Sequence

1. Implement bundler-agnostic core logic before adapter code.
1. Keep declaration generation, scanning, and source transforms deterministic and independently testable.
1. Use codemod-style mutation only on sources with stable structural assumptions.
1. Treat generated code as a build artifact with snapshot coverage.

## Validation Checklist

- Behavior is consistent across supported bundlers.
- Generated declarations are stable and type-check successfully.
- Codemod paths include a rollback or manual remediation strategy.
- Regex-heavy transforms remain readable and covered by boundary-case tests.
