# UnJS Selection Principles

Use these principles before reading scenario or package-level references. They define how to think about the UnJS ecosystem as an architectural toolbox rather than a flat package catalog.

## 1. Treat UnJS as a composable toolbox, not a monolithic framework

UnJS derives most of its value from:

- narrow package responsibilities
- strong composability
- runtime portability
- explicit separation between build-time and runtime concerns

Always ask:

- What capability is missing?
- Is that capability required at build time or runtime?
- Does it have to run across multiple execution environments?
- Is a lower-level package sufficient?

## 2. Classify by deliverable before classifying by package

Start with the primary artifact:

- CLI or scaffolding tool
- Configuration subsystem
- HTTP API or middleware surface
- Universal server runtime
- Reusable library or package build pipeline
- Bundler plugin, auto-import engine, or codemod
- Cross-runtime SDK
- Storage or cache subsystem
- Documentation, media, or frontend infrastructure layer

If a problem touches several domains, identify the anchor deliverable first and only then add supporting packages.

## 3. Solve the problem at the smallest viable abstraction layer

Typical abstraction choices:

- Standalone config-file parsing: `confbox`
- Layered configuration orchestration: `c12`
- Lightweight HTTP handlers: `h3`
- Deployable universal server runtime: `nitro`
- URL manipulation: `ufo`
- Outbound HTTP policy: `ofetch`
- Auto-import workflows: `unimport`
- Multi-bundler plugin hosting: `unplugin`
- Package build orchestration: `unbuild`

Do not start at a higher abstraction unless the workload truly requires the additional coordination surface.

## 4. Make runtime boundaries explicit

Determine whether the workload targets:

- Node.js only
- Node.js plus browser
- Node.js plus Workers or edge runtimes
- Bun or Deno
- runtime-agnostic execution

Runtime-boundary mistakes are a major source of accidental complexity. Document environment assumptions early.

## 5. Separate build-time packages from runtime packages

Build-time leaning packages include:

- `unbuild`
- `mkdist`
- `jiti`
- `mlly`
- `magicast`
- `unplugin`
- `unimport`
- `knitwork`
- `untyped`

Runtime-leaning packages include:

- `h3`
- `nitro`
- `ofetch`
- `crossws`
- `cookie-es`
- `ufo`
- `unstorage`
- `uncrypto`
- `unctx`

Keep those boundaries sharp to avoid shipping unnecessary implementation dependencies.

## 6. Prefer natural ecosystem compositions

Well-aligned combinations include:

- CLI: `citty` + `consola` + `c12` + `giget`
- Configuration system: `c12` + `defu` + `confbox` + `rc9` + `untyped`
- HTTP API: `h3` + `ofetch` + `cookie-es` + `radix3`
- Universal server: `nitro` + `h3` + `unstorage` + `crossws`
- Library build: `unbuild` + `mkdist` + `mlly` + `pkg-types`
- Plugin infrastructure: `unplugin` + `unimport` + `magicast` + `knitwork`
- Cross-runtime SDK: `std-env` + `unenv` + `pathe` + `ufo` + `uncrypto`

## 7. Always explain why an adjacent package is not the right answer

Frequently confused boundaries include:

- `h3` vs `nitro`
- `confbox` vs `c12`
- `unplugin` vs `unimport`
- `jiti` vs `mlly`
- `unbuild` vs `mkdist`
- `ofetch` vs `node-fetch-native`
- `rc9` vs `c12`

When recommending a package, explain the architectural boundary that excludes the neighboring option.

## 8. Optimize for maintainable integration, not package count

The preferred output is not the largest possible stack. The preferred output is the smallest composition that keeps:

- boundaries explicit
- defaults deterministic
- runtime assumptions documented
- public contracts typed and testable
- replacement cost low
