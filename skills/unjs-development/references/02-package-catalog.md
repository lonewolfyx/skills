# UnJS Package Catalog

This catalog covers the 63 packages listed under the UnJS package surface and maps each package to a primary architectural role. Use it after the scenario has been classified, not before.

## CLI, Documentation, and Developer Experience

| Package | Primary Role | Typical Use | Common Companions | Constraint Reference |
| --- | --- | --- | --- | --- |
| `automd` | Markdown automation | Automates controlled Markdown regions such as README sections, generated tables of contents, badges, and embedded snippets. | `changelogen`, `mdbox`, `undocs` | [pkg-automd.md](pkg-automd.md) |
| `changelogen` | Release note generation | Generates changelog and release-note artifacts from a Conventional Commits history. | `automd`, `consola`, `pkg-types` | [pkg-changelogen.md](pkg-changelogen.md) |
| `citty` | Command-line interface framework | Implements command trees, subcommands, option parsing, and execution entrypoints for CLIs and scaffolding tools. | `consola`, `c12`, `giget`, `nypm` | [pkg-citty.md](pkg-citty.md) |
| `consola` | Structured terminal logging | Provides a leveled logging facade for CLIs, developer tooling, local servers, and release workflows. | `citty`, `listhen`, `changelogen` | [pkg-consola.md](pkg-consola.md) |
| `get-port-please` | Port allocation utility | Selects an available TCP port for local development servers, previews, and tunnel entrypoints. | `listhen`, `nitro`, `untun` | [pkg-get-port-please.md](pkg-get-port-please.md) |
| `giget` | Remote template acquisition | Downloads starter templates and repository snapshots for scaffolding and project bootstrap flows. | `citty`, `nypm`, `c12` | [pkg-giget.md](pkg-giget.md) |
| `listhen` | Developer-oriented local listener | Bootstraps local HTTP listeners with a polished developer experience for previews and debugging. | `get-port-please`, `h3`, `crossws`, `untun` | [pkg-listhen.md](pkg-listhen.md) |
| `nypm` | Package-manager abstraction | Normalizes npm, pnpm, yarn, and bun command generation for scaffolding and automation. | `citty`, `giget`, `c12` | [pkg-nypm.md](pkg-nypm.md) |
| `undocs` | Developer documentation system | Provides a documentation-oriented delivery layer for developer portals, package docs, and knowledge surfaces. | `automd`, `mdbox`, `unhead` | [pkg-undocs.md](pkg-undocs.md) |
| `untun` | Temporary public tunneling | Exposes local development services to remote clients for webhook validation, demos, and device testing. | `listhen`, `nitro`, `h3` | [pkg-untun.md](pkg-untun.md) |
| `webpackbar` | Webpack progress instrumentation | Improves webpack observability with build-phase progress and profiling output. | `consola`, `unplugin` | [pkg-webpackbar.md](pkg-webpackbar.md) |

## Configuration, Schemas, and Project Metadata

| Package | Primary Role | Typical Use | Common Companions | Constraint Reference |
| --- | --- | --- | --- | --- |
| `c12` | Layered configuration loader | Implements multi-source configuration resolution with defaults, extends chains, environment overrides, and watch support. | `defu`, `confbox`, `rc9`, `untyped` | [pkg-c12.md](pkg-c12.md) |
| `confbox` | Configuration file parser | Parses and serializes YAML, TOML, JSONC, JSON5, and adjacent configuration formats. | `c12`, `defu`, `destr` | [pkg-confbox.md](pkg-confbox.md) |
| `defu` | Deterministic deep-default merge | Performs deep merge operations optimized for default-value inheritance and configuration normalization. | `c12`, `rc9`, `untyped` | [pkg-defu.md](pkg-defu.md) |
| `destr` | Safe string deserializer | Converts loosely structured string input such as environment-variable payloads into structured JavaScript values. | `c12`, `confbox`, `rc9` | [pkg-destr.md](pkg-destr.md) |
| `fs-memo` | Filesystem-backed memoization | Persists cache artifacts and intermediate computation results on disk for developer tooling and build pipelines. | `ohash`, `unstorage` | [pkg-fs-memo.md](pkg-fs-memo.md) |
| `pkg-types` | Project metadata I/O | Reads and writes structured metadata such as package manifests and TypeScript configuration files. | `unbuild`, `jiti`, `untyped` | [pkg-pkg-types.md](pkg-pkg-types.md) |
| `rc9` | .rc discovery and loading | Resolves user-level and project-level rc files for lightweight CLI and tool configuration. | `c12`, `defu`, `destr` | [pkg-rc9.md](pkg-rc9.md) |
| `untyped` | Configuration contract generation | Derives public configuration types and documentation artifacts from schema-oriented configuration definitions. | `c12`, `defu`, `pkg-types` | [pkg-untyped.md](pkg-untyped.md) |

## Server, HTTP, and Network Communication

| Package | Primary Role | Typical Use | Common Companions | Constraint Reference |
| --- | --- | --- | --- | --- |
| `cookie-es` | Cookie serialization layer | Handles cookie parsing and serialization at HTTP boundaries for APIs, sessions, and authentication middleware. | `h3`, `ofetch` | [pkg-cookie-es.md](pkg-cookie-es.md) |
| `crossws` | Cross-runtime WebSocket abstraction | Normalizes WebSocket behavior across Node.js, Bun, Deno, and edge-style runtimes. | `nitro`, `listhen`, `h3` | [pkg-crossws.md](pkg-crossws.md) |
| `h3` | Lightweight HTTP application layer | Implements request handlers, middleware, and routing-adjacent HTTP composition with minimal runtime overhead. | `ofetch`, `cookie-es`, `radix3` | [pkg-h3.md](pkg-h3.md) |
| `httpxy` | HTTP and WebSocket proxy layer | Implements proxying, upstream forwarding, and request transformation for middle-tier services and developer tooling. | `h3`, `nitro`, `ofetch` | [pkg-httpxy.md](pkg-httpxy.md) |
| `nitro` | Universal server runtime | Packages server-side application logic for deployment across Node.js, serverless platforms, and edge runtimes. | `h3`, `unstorage`, `crossws` | [pkg-nitro.md](pkg-nitro.md) |
| `node-fetch-native` | Node fetch compatibility layer | Provides a Node-oriented fetch substrate that can back higher-level HTTP clients. | `ofetch`, `std-env` | [pkg-node-fetch-native.md](pkg-node-fetch-native.md) |
| `ofetch` | Ergonomic fetch client | Standardizes outbound HTTP with base URLs, interceptors, retry semantics, timeout policy, and normalized error handling. | `h3`, `ufo`, `node-fetch-native` | [pkg-ofetch.md](pkg-ofetch.md) |
| `radix3` | Radix-tree path matcher | Provides high-performance route matching and path dispatch for HTTP and gateway-style workloads. | `h3`, `ufo` | [pkg-radix3.md](pkg-radix3.md) |
| `serve-placeholder` | Fallback placeholder server | Returns placeholder responses when expected static or media assets are unavailable. | `h3`, `nitro`, `ipx` | [pkg-serve-placeholder.md](pkg-serve-placeholder.md) |

## Build, Modules, and Plugin Infrastructure

| Package | Primary Role | Typical Use | Common Companions | Constraint Reference |
| --- | --- | --- | --- | --- |
| `bundle-runner` | Bundle execution harness | Executes generated bundles in Node.js for post-build validation and integration testing. | `unbuild`, `mlly` | [pkg-bundle-runner.md](pkg-bundle-runner.md) |
| `jiti` | Runtime TypeScript and ESM loader | Loads TypeScript and modern module syntax during development-time and build-time execution. | `unbuild`, `mlly`, `c12` | [pkg-jiti.md](pkg-jiti.md) |
| `knitwork` | Code-generation utility | Builds import/export blocks and generated module source with more structure than manual string concatenation. | `unplugin`, `unimport`, `magicast` | [pkg-knitwork.md](pkg-knitwork.md) |
| `magicast` | Programmatic source-file mutation | Applies structured mutations to configuration files and relatively stable JavaScript or TypeScript modules. | `unplugin`, `unimport`, `knitwork` | [pkg-magicast.md](pkg-magicast.md) |
| `mkdist` | Bundleless distribution builder | Generates file-to-file transformed distribution output while preserving package directory structure. | `unbuild`, `pkg-types` | [pkg-mkdist.md](pkg-mkdist.md) |
| `mlly` | Module-interop toolkit | Resolves ESM/CJS interoperability, import analysis, and module boundary adaptation. | `unbuild`, `jiti`, `pathe` | [pkg-mlly.md](pkg-mlly.md) |
| `pathe` | Cross-platform path toolkit | Normalizes filesystem path manipulation in ways that are friendlier to multi-environment tooling. | `mlly`, `pkg-types`, `ufo` | [pkg-pathe.md](pkg-pathe.md) |
| `std-env` | Runtime environment detector | Detects execution-environment capabilities across Node.js, Bun, Deno, Workers, and browsers. | `unenv`, `ofetch`, `uncrypto` | [pkg-std-env.md](pkg-std-env.md) |
| `unbuild` | Library build orchestrator | Compiles reusable packages into ESM, CJS, and type-declaration artifacts with a consistent build contract. | `mkdist`, `mlly`, `pkg-types` | [pkg-unbuild.md](pkg-unbuild.md) |
| `unenv` | Runtime compatibility substrate | Bridges Node-oriented assumptions into broader multi-runtime execution targets. | `std-env`, `uncrypto`, `ofetch` | [pkg-unenv.md](pkg-unenv.md) |
| `unimport` | Auto-import engine | Scans and injects importable APIs while emitting declaration files and integration metadata. | `unplugin`, `magicast`, `knitwork` | [pkg-unimport.md](pkg-unimport.md) |
| `unplugin` | Multi-bundler plugin framework | Hosts shared plugin logic across Vite, Rollup, webpack, and esbuild integration layers. | `unimport`, `magicast`, `knitwork` | [pkg-unplugin.md](pkg-unplugin.md) |

## Data, Storage, and Core Runtime Utilities

| Package | Primary Role | Typical Use | Common Companions | Constraint Reference |
| --- | --- | --- | --- | --- |
| `db0` | Lightweight SQL access layer | Provides a compact SQL-oriented data-access surface for infrastructure and service workloads. | `unstorage`, `c12` | [pkg-db0.md](pkg-db0.md) |
| `mongoz` | Lightweight MongoDB developer layer | Introduces a low-friction MongoDB integration pattern for prototypes and infrastructure services. | `nitro`, `c12` | [pkg-mongoz.md](pkg-mongoz.md) |
| `nanotar` | TAR archive primitive | Handles archive packaging and extraction for templates, snapshots, and distribution workflows. | `giget`, `fs-memo` | [pkg-nanotar.md](pkg-nanotar.md) |
| `ohash` | Stable object hashing | Computes reproducible hashes for cache keys, content fingerprints, and incremental state comparison. | `fs-memo`, `unstorage` | [pkg-ohash.md](pkg-ohash.md) |
| `uncrypto` | Cross-runtime cryptography facade | Exposes Web Crypto style primitives across heterogeneous runtimes. | `unenv`, `std-env` | [pkg-uncrypto.md](pkg-uncrypto.md) |
| `ungh` | GitHub client abstraction | Consumes repository and release metadata from GitHub for documentation, automation, and tooling flows. | `automd`, `changelogen` | [pkg-ungh.md](pkg-ungh.md) |
| `unstorage` | Driver-agnostic asynchronous key-value storage | Abstracts storage backends for cache, state, session, and metadata use cases. | `ohash`, `fs-memo`, `nitro` | [pkg-unstorage.md](pkg-unstorage.md) |

## UI, Content, and Media Processing

| Package | Primary Role | Typical Use | Common Companions | Constraint Reference |
| --- | --- | --- | --- | --- |
| `fontaine` | Typography fallback optimization | Improves perceived rendering stability with metric-aware fallback-font strategies. | `unhead`, `theme-colors` | [pkg-fontaine.md](pkg-fontaine.md) |
| `image-meta` | Image metadata extraction | Reads dimensions and format metadata before heavier media processing or delivery steps. | `ipx`, `jimp-compact` | [pkg-image-meta.md](pkg-image-meta.md) |
| `ipx` | Image transformation proxy | Implements image delivery, transformation, and parameterized media serving at runtime. | `image-meta`, `serve-placeholder`, `nitro` | [pkg-ipx.md](pkg-ipx.md) |
| `jimp-compact` | Pure-JavaScript image processing | Performs image manipulation without depending on native binaries. | `image-meta`, `ipx` | [pkg-jimp-compact.md](pkg-jimp-compact.md) |
| `mdbox` | Markdown utility layer | Provides Markdown manipulation utilities for docs automation and content workflows. | `automd`, `undocs` | [pkg-mdbox.md](pkg-mdbox.md) |
| `theme-colors` | Theme-token generation | Derives color palettes and theme tokens for design systems and branded interfaces. | `fontaine`, `unhead` | [pkg-theme-colors.md](pkg-theme-colors.md) |
| `unhead` | Head and metadata manager | Centralizes document head state, SEO metadata, canonical tags, and social-preview attributes. | `undocs`, `fontaine`, `theme-colors` | [pkg-unhead.md](pkg-unhead.md) |
| `unpdf` | Cross-runtime PDF utility | Processes PDF workflows in server, browser, and worker-compatible execution environments. | `nitro`, `mdbox` | [pkg-unpdf.md](pkg-unpdf.md) |
| `unwasm` | WebAssembly integration utility | Integrates WebAssembly assets and execution strategies into JavaScript-oriented toolchains. | `unenv`, `std-env` | [pkg-unwasm.md](pkg-unwasm.md) |
| `uqr` | QR code generator | Generates ANSI, Unicode, or SVG QR codes for terminal, web, and service outputs. | `citty`, `consola`, `h3` | [pkg-uqr.md](pkg-uqr.md) |

## Control Flow, Context, and General Utilities

| Package | Primary Role | Typical Use | Common Companions | Constraint Reference |
| --- | --- | --- | --- | --- |
| `hookable` | Hook lifecycle system | Defines extensibility points and lifecycle hooks for frameworks, SDKs, and infrastructure tooling. | `unctx`, `perfect-debounce` | [pkg-hookable.md](pkg-hookable.md) |
| `magic-regexp` | Composable regular-expression builder | Improves readability and maintainability for advanced regex-driven parsing or transformation rules. | `magicast`, `unplugin` | [pkg-magic-regexp.md](pkg-magic-regexp.md) |
| `perfect-debounce` | Async-aware debounce primitive | Stabilizes high-frequency asynchronous triggers with deterministic debounce semantics. | `c12`, `ofetch`, `hookable` | [pkg-perfect-debounce.md](pkg-perfect-debounce.md) |
| `scule` | Identifier and string-case transformer | Normalizes casing strategies for generated identifiers, route names, and configuration keys. | `knitwork`, `untyped` | [pkg-scule.md](pkg-scule.md) |
| `ufo` | URL utility toolkit | Handles URL joining, normalization, encoding, decoding, and query manipulation. | `ofetch`, `h3`, `pathe` | [pkg-ufo.md](pkg-ufo.md) |
| `unctx` | Composable context container | Provides execution-scoped context propagation for runtime, tooling, and framework internals. | `hookable`, `perfect-debounce` | [pkg-unctx.md](pkg-unctx.md) |

## Fast Routing Hints

- Pure CLI workload: start with `citty`
- Leveled terminal logging: start with `consola`
- Standalone config-file parsing: start with `confbox`
- Layered configuration resolution: start with `c12`
- Lightweight HTTP handler surface: start with `h3`
- Universal runtime shell: start with `nitro`
- Outbound HTTP client: start with `ofetch`
- Package build contract: start with `unbuild`
- Bundleless file distribution: start with `mkdist`
- Development-time TS/ESM execution: start with `jiti`
- Multi-bundler plugin hosting: start with `unplugin`
- Auto-import injection: start with `unimport`
- Driver-agnostic key-value storage: start with `unstorage`
- Runtime portability and compatibility: start with `unenv`
