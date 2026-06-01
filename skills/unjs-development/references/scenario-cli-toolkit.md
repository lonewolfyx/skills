# CLI and Scaffolding Toolkit

## Scenario Definition

Use this scenario when the primary deliverable is a command-line binary, scaffolding utility, release command, migration utility, or local automation executable.

## Recommended Toolkit Layers

| Layer | Preferred Package(s) | Responsibility |
| --- | --- | --- |
| Command graph | `citty` | Defines the command tree, subcommands, option parsing, and execution entrypoints. |
| Terminal observability | `consola` | Standardizes leveled logs, progress feedback, warnings, and recoverable error messages. |
| Configuration resolution | `c12` / `rc9` | Resolves layered configuration from defaults, project files, and user-level rc files. |
| Template acquisition | `giget` | Downloads starter templates or repository snapshots for scaffolding flows. |
| Package-manager abstraction | `nypm` | Normalizes install and execution commands across npm, pnpm, yarn, and bun. |

## Suggested Repository Layout

```text
src/
  cli.ts
  commands/
  config/
  scaffold/
  installers/
  logger.ts
```

## Implementation Sequence

1. Model the command graph before implementing side effects.
1. Normalize command options into a typed execution context.
1. Move filesystem, network, and template orchestration into dedicated service modules.
1. Emit user-facing messages only through a shared logging facade.

## Validation Checklist

- The `--help` surface is exhaustive and consistent across subcommands.
- Invalid option combinations fail with deterministic exit codes.
- Template acquisition failures include a clear rollback or retry path.
- Package-manager suggestions match the detected workspace environment.
