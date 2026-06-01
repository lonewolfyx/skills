# citty

## Trigger Conditions

- Building a CLI binary, scaffolder, release command, or local automation entrypoint.
- Needing a typed command graph with subcommands, option parsing, and a well-defined execution context.

## Architectural Constraints

- Keep `citty` at the command-boundary layer; do not turn command handlers into a dumping ground for orchestration logic.
- Normalize parsed options into a typed execution object before invoking business services.
- Store command definitions by feature area instead of centralizing every handler in one file.

## Implementation Guidance

1. Model the command graph first, including aliases and help output.
1. Split commands into `commands/*` modules and keep shared options in reusable definitions.
1. Delegate filesystem, network, and template side effects to services or scaffolding modules.

## Recommended Composition

- Primary role: Command-line interface framework
- Typical usage: Implements command trees, subcommands, option parsing, and execution entrypoints for CLIs and scaffolding tools.
- Common companions: `consola`, `c12`, `giget`, `nypm`
- Primary scenario family: CLI, Documentation, and Developer Experience

## Misuse Patterns to Avoid

- Do not couple command parsing to file I/O or remote API calls inline.
- Do not use `citty` as a configuration resolver or interactive TUI framework.

## Verification Checklist

- `--help` is complete and stable.
- Invalid option combinations return deterministic exit codes.
- Each subcommand can be tested without a live terminal.
