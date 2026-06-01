# UnJS Scenario Playbooks

These playbooks are execution-oriented. Each scenario should answer:

- what the primary deliverable is
- how the package stack should be layered
- where code should live in the repository
- what implementation sequence is safest
- how to validate the resulting system

## 1. CLI and Scaffolding Workloads

Recommended composition:

- `citty`
- `consola`
- `c12`
- `giget`
- `nypm`
- `pkg-types`

Implementation sequence:

1. Design the command graph before coding side effects.
2. Split command definitions, option schemas, and execution handlers into dedicated modules.
3. Centralize terminal output in a shared logger module powered by `consola`.
4. Route configuration lookup through `c12` or `rc9` instead of reading ad-hoc files inside commands.
5. Move template acquisition and package-manager orchestration into scaffolding services.

Suggested layout:

```text
src/
  cli.ts
  commands/
  config/
  logger.ts
  scaffold/
  installers/
```

Validation checklist:

- Help output covers every command and option.
- Invalid flags fail deterministically.
- Template download failures have a rollback or retry path.
- Package-manager instructions match the detected environment.

## 2. Configuration Systems and Developer Tooling Config

Recommended composition:

- `c12`
- `defu`
- `confbox`
- `rc9`
- `untyped`
- `pkg-types`
- `destr`

Implementation sequence:

1. Decide whether the problem is layered configuration or single-file parsing.
2. Use `c12` only for real configuration orchestration problems.
3. Use `confbox` for pure syntax parsing and `rc9` for rc-file discovery.
4. Merge defaults through `defu` and normalize input after load resolution.
5. Generate docs and types through `untyped` once the public config contract is stable.

Suggested layout:

```text
src/
  config/
    defaults.ts
    schema.ts
    load.ts
    normalize.ts
    docs.ts
```

Validation checklist:

- Precedence order is deterministic.
- Missing files degrade gracefully.
- Generated docs and types remain synchronized with defaults.
- Watch reloads invalidate only the intended configuration surface.

## 3. Lightweight HTTP APIs and Middleware Surfaces

Recommended composition:

- `h3`
- `ofetch`
- `cookie-es`
- `radix3`
- `ufo`

Implementation sequence:

1. Define request and response boundaries first.
2. Keep handlers thin and push outbound HTTP and persistence into services.
3. Standardize cookies, query parsing, and error envelopes in middleware or utilities.
4. Introduce `radix3` only when lower-level path dispatch is genuinely useful.
5. Centralize URL construction through `ufo`.

Suggested layout:

```text
src/
  server/
    handlers/
    middleware/
    routes/
  services/
  clients/
```

Validation checklist:

- Request parsing is consistent.
- Upstream failures map to a stable error contract.
- Handlers remain lightweight orchestration shells.
- URL composition does not rely on manual string concatenation.

## 4. Universal Server Runtimes

Recommended composition:

- `nitro`
- `h3`
- `unstorage`
- `crossws`
- `ofetch`
- `listhen`

Implementation sequence:

1. Define the deployment-target matrix.
2. Keep runtime wiring inside `nitro` and keep business logic portable.
3. Introduce storage through `unstorage` and document backend semantics explicitly.
4. Add realtime transport through `crossws` only when the workload requires it.
5. Keep preview and tunneling aids outside production execution paths.

Suggested layout:

```text
server/
  api/
  routes/
  middleware/
  services/
  storage/
  realtime/
```

Validation checklist:

- Service logic survives target swaps.
- Storage-driver differences are explicit and tested.
- Realtime code does not bleed into unrelated HTTP flows.
- Developer-only utilities remain isolated.

## 5. Library Build and Release Pipelines

Recommended composition:

- `unbuild`
- `mkdist`
- `mlly`
- `jiti`
- `pkg-types`
- `pathe`

Implementation sequence:

1. Define the artifact matrix first.
2. Align exports, generated files, and declaration output.
3. Use `mkdist` only when preserving file topology is valuable.
4. Keep `jiti` confined to development-time execution.
5. Validate package consumption from a downstream fixture.

Suggested layout:

```text
src/
build.config.ts
package.json
tsconfig.json
```

Validation checklist:

- Generated files satisfy the declared exports.
- Types cover every public entrypoint.
- Build-time helpers do not leak into the runtime contract.
- ESM and CJS behavior are equivalent where promised.

## 6. Bundler Plugins, Auto-Imports, and Codemods

Recommended composition:

- `unplugin`
- `unimport`
- `magicast`
- `knitwork`
- `magic-regexp`

Implementation sequence:

1. Implement a bundler-agnostic core first.
2. Add bundler adapters only after the core transform contract is stable.
3. Centralize declaration generation, source scanning, and configuration mutation.
4. Use `magicast` only where source structure is stable enough for deterministic mutation.
5. Cover generated artifacts with snapshot or fixture tests.

Suggested layout:

```text
src/
  core/
  integrations/
  transforms/
  dts/
  presets/
```

Validation checklist:

- Supported bundlers behave consistently.
- Generated declarations are stable and type-check.
- Codemod operations provide a clear manual fallback path.
- Regex-based transforms remain readable and test-covered.

## 7. Cross-Runtime SDKs

Recommended composition:

- `std-env`
- `unenv`
- `ufo`
- `pathe`
- `uncrypto`
- `node-fetch-native`
- `ofetch`

Implementation sequence:

1. Define the supported runtime matrix explicitly.
2. Separate environment detection from compatibility shims.
3. Hide runtime branching inside adapters.
4. Separate URL logic from filesystem logic.
5. Preserve a stable public SDK API across runtimes.

Suggested layout:

```text
src/
  core/
  runtime/
  adapters/
  clients/
  utils/
```

Validation checklist:

- Critical runtime paths have smoke coverage.
- Path and URL concerns are not conflated.
- Polyfills are injected only where necessary.
- The external API is stable across runtime targets.

## 8. Storage, Cache, and Data Layers

Recommended composition:

- `unstorage`
- `fs-memo`
- `ohash`
- `db0`
- `mongoz`
- `nanotar`

Implementation sequence:

1. Define consistency semantics and access patterns first.
2. Introduce key and namespace policy before broad storage adoption.
3. Separate cache, persistence, and archive workflows into distinct modules.
4. Use `ohash` to stabilize key generation.
5. Keep backend selection in composition code, not in domain services.

Suggested layout:

```text
src/
  storage/
  cache/
  db/
  archive/
```

Validation checklist:

- TTL and metadata semantics are explicit.
- Cache keys are deterministic.
- Driver swaps preserve invariants.
- Archive extraction remains safe and reversible.

## 9. Documentation, Content, and Media Pipelines

Recommended composition:

- `undocs`
- `automd`
- `mdbox`
- `fontaine`
- `image-meta`
- `ipx`
- `jimp-compact`
- `theme-colors`
- `unhead`
- `unpdf`
- `uqr`

Implementation sequence:

1. Separate documentation delivery from media transformation.
2. Keep generated Markdown and hand-authored Markdown in clearly bounded regions.
3. Treat image metadata, transformation, and fallback logic as independent stages.
4. Centralize head metadata and typography strategy.
5. Load heavy media capabilities only where required.

Suggested layout:

```text
src/
  docs/
  content/
  media/
  head/
  theme/
```

Validation checklist:

- Generated Markdown is idempotent.
- Media pipeline stages are separated cleanly.
- Head metadata is centralized.
- Heavy media dependencies remain optional.

## 10. Extensibility, Context, and Control Flow

Recommended composition:

- `hookable`
- `unctx`
- `perfect-debounce`
- `scule`
- `magic-regexp`
- `ufo`

Implementation sequence:

1. Model lifecycle phases before exposing hook contracts.
2. Keep execution context scopes explicit and short-lived.
3. Apply debounce at scheduling boundaries, not deep inside business logic.
4. Centralize naming and parsing utilities to avoid duplication.
5. Document hook ordering and context lifetime.

Validation checklist:

- Hook order is predictable.
- Context does not leak between concurrent requests or jobs.
- Debounced tasks preserve required ordering semantics.
- Shared parsing and naming utilities are reused consistently.
