# Configuration System Toolkit

## Scenario Definition

Use this scenario when you are building a first-class configuration system rather than merely parsing a single config file.

## Recommended Toolkit Layers

| Layer | Preferred Package(s) | Responsibility |
| --- | --- | --- |
| Configuration orchestrator | `c12` | Coordinates layered resolution, extends chains, watch behavior, and environment overrides. |
| Format parsing | `confbox` | Parses YAML, TOML, JSONC, JSON5, and adjacent config syntaxes. |
| Default inheritance | `defu` | Merges user input onto nested default values with deterministic semantics. |
| User-level config discovery | `rc9` | Resolves rc files from project and user scopes. |
| Loose input coercion | `destr` | Converts environment-style strings into structured values before validation. |
| Public contract generation | `untyped` | Emits configuration types and documentation from schema definitions. |

## Suggested Repository Layout

```text
src/
  config/
    defaults.ts
    schema.ts
    load.ts
    normalize.ts
    docs.ts
```

## Implementation Sequence

1. Define the public schema and built-in defaults before wiring loaders.
1. Document the precedence chain explicitly: internal defaults, project config, user config, environment variables, CLI overrides.
1. Run normalization and validation after load resolution, not during downstream business execution.
1. Generate documentation and public types from the same source-of-truth configuration contract.

## Validation Checklist

- Override precedence is deterministic and testable.
- Missing files degrade gracefully without corrupting defaults.
- Generated types, docs, and default values remain synchronized.
- Watch-driven reloads invalidate only the intended configuration slice.
