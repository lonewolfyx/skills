---
name: unjs-development
description: Choose and apply UnJS ecosystem packages for JavaScript and TypeScript development. Use when building CLIs with citty and consola, layered configuration systems with c12 and untyped, lightweight or universal servers with h3 nitro ofetch crossws and unstorage, libraries with unbuild mkdist jiti mlly and pkg-types, plugins with unplugin unimport and magicast, or when selecting the correct UnJS package family by architectural scenario and implementation constraints.
---

# UnJS Development

Use this skill to select UnJS packages by architectural scenario, runtime boundary, and implementation constraints rather than by package popularity or superficial API familiarity.

## Overview

- Think in terms of deliverables first: CLI, configuration system, HTTP service, universal runtime, library build, plugin infrastructure, cross-runtime SDK, storage layer, or documentation/media pipeline.
- Prefer the smallest viable composition. The UnJS ecosystem is strongest when several narrowly scoped packages are composed into a coherent architecture.
- Distinguish build-time tooling from runtime dependencies early. Many integration mistakes come from crossing that boundary accidentally.
- Read scenario references before package references. Scenario documents explain system shape; package documents explain integration constraints.

## Workflow

1. Classify the primary deliverable.
   - CLI or scaffolding tool
   - Configuration subsystem or developer toolchain package
   - Lightweight HTTP API, webhook, or middleware surface
   - Universal server runtime
   - Reusable library or build artifact
   - Bundler plugin, auto-import engine, or codemod
   - Cross-runtime SDK
   - Storage, cache, or data-access layer
   - Documentation, media, or frontend infrastructure subsystem

2. Declare the runtime matrix.
   - Node.js only
   - Node.js plus browser
   - Node.js plus edge or Workers
   - Bun or Deno compatibility
   - Runtime-agnostic infrastructure target

3. Choose one anchor package first, then add companion packages deliberately.
   - CLI anchor: `citty`
   - Configuration anchor: `c12`
   - Lightweight HTTP anchor: `h3`
   - Universal runtime anchor: `nitro`
   - Library build anchor: `unbuild`
   - Plugin anchor: `unplugin`

4. Read the scenario references before package references.
   - Delivery-oriented implementation playbooks: [references/01-scenario-playbooks.md](references/01-scenario-playbooks.md)
   - Scenario toolkit index: [references/04-scenario-index.md](references/04-scenario-index.md)
   - Package-specific constraints: [references/03-package-reference-index.md](references/03-package-reference-index.md)

5. Use the package catalog only after the scenario is clear.
   - Full ecosystem catalog: [references/02-package-catalog.md](references/02-package-catalog.md)

## Quick Picks

| Scenario | Recommended Composition | Why This Stack |
| --- | --- | --- |
| CLI and scaffolding | `citty` + `consola` + `c12` + `giget` | Command graph, terminal logging, layered configuration, and template acquisition |
| Configuration subsystem | `c12` + `defu` + `confbox` + `rc9` + `untyped` | Config loading, inheritance, file parsing, rc discovery, and contract generation |
| Lightweight HTTP API | `h3` + `ofetch` + `cookie-es` + `radix3` | Minimal request boundary, outbound HTTP, cookie handling, and path dispatch |
| Universal server runtime | `nitro` + `h3` + `unstorage` + `crossws` | Deployable runtime shell, portable HTTP layer, pluggable state, and realtime transport |
| Library publishing | `unbuild` + `mkdist` + `mlly` + `pkg-types` | Build orchestration, bundleless output, module interoperability, and manifest alignment |
| Plugin and codemod workflows | `unplugin` + `unimport` + `magicast` + `knitwork` | Multi-bundler integration, auto-imports, config mutation, and generated source |
| Cross-runtime SDK | `std-env` + `unenv` + `pathe` + `ufo` + `uncrypto` | Runtime detection, compatibility, path and URL utilities, and crypto abstraction |
| Storage and cache | `unstorage` + `fs-memo` + `ohash` + `db0` | Key-value abstraction, filesystem memoization, stable cache keys, and lightweight SQL access |
| Docs and media | `undocs` + `automd` + `mdbox` + `ipx` + `unpdf` | Documentation delivery, Markdown automation, image services, and PDF utilities |
| Frontend infrastructure | `unhead` + `fontaine` + `theme-colors` + `image-meta` | Head-state orchestration, typography fallback, theme generation, and image metadata extraction |

## Rules

- When a user names a specific package, do not stop at conceptual explanation.
  - Open the matching `references/pkg-<package>.md` document.
  - Cover at least: trigger conditions, architectural constraints, implementation guidance, misuse patterns, and verification.

- When a user describes a scenario but not a package, do not answer with a single package by reflex.
  - Start with [references/01-scenario-playbooks.md](references/01-scenario-playbooks.md) to classify the deliverable and runtime matrix.
  - Use [references/02-package-catalog.md](references/02-package-catalog.md) to derive the smallest viable package set.
  - Dive into the package-level reference for the anchor package and any package that introduces meaningful constraints.

- Do not default to `nitro` for every HTTP workload.
  - Choose `nitro` only when deployment targets, runtime assembly, or multi-surface server composition justify it.
  - Prefer `h3` when the workload is fundamentally a lightweight handler or middleware surface.

- Do not treat `c12` as a generic file parser.
  - Choose `confbox` for standalone config-file parsing.
  - Choose `c12` when the problem is layered configuration resolution.

- Do not use `magicast` on highly dynamic or weakly structured source unless a manual fallback path exists.

- Do not describe `unstorage` as if all storage backends were semantically identical.

- Do not conflate `unplugin` and `unimport`.
  - `unplugin` solves cross-bundler plugin hosting.
  - `unimport` solves import discovery, injection, and declaration emission.

- Do not blur build-time and runtime dependencies.
  - Build-time leaning packages include `jiti`, `mkdist`, `magicast`, and `unbuild`.
  - Runtime leaning packages include `ofetch`, `ufo`, `cookie-es`, and `unstorage`.

## Output Style

Structure recommendations in the following order:

1. Current architectural scenario
2. Recommended anchor package and companion packages
3. Why this composition fits the runtime and delivery constraints
4. Implementation steps and code-placement guidance
5. Best-practice rules
6. Misuse patterns or regression risks to avoid
7. Verification checklist
8. Heavier or lighter alternatives, if the boundary matters

## References

- [references/00-unjs-principles.md](references/00-unjs-principles.md) - Core UnJS selection principles and composition boundaries
- [references/01-scenario-playbooks.md](references/01-scenario-playbooks.md) - Delivery-oriented implementation playbooks and validation patterns
- [references/02-package-catalog.md](references/02-package-catalog.md) - Catalog of all 63 UnJS packages mapped to primary architectural scenarios
- [references/03-package-reference-index.md](references/03-package-reference-index.md) - Entry index for the 63 package-level integration-constraint documents
- [references/04-scenario-index.md](references/04-scenario-index.md) - Entry index for scenario-level toolkit summaries
