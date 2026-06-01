# Cross-Runtime SDK Toolkit

## Scenario Definition

Use this scenario when a reusable SDK must execute across Node.js, browsers, Bun, Deno, Workers, or a subset of those targets.

## Recommended Toolkit Layers

| Layer | Preferred Package(s) | Responsibility |
| --- | --- | --- |
| Environment detection | `std-env` | Determines runtime capability without scattering environment probes through business code. |
| Compatibility substrate | `unenv` | Bridges Node-centric assumptions into other execution contexts when necessary. |
| HTTP substrate | `ofetch` / `node-fetch-native` | Normalizes outbound HTTP behavior while preserving a stable external API. |
| URL and path utilities | `ufo` / `pathe` | Separates URL semantics from filesystem semantics. |
| Cryptography facade | `uncrypto` | Presents Web Crypto style primitives across runtimes. |

## Suggested Repository Layout

```text
src/
  core/
  runtime/
  adapters/
  clients/
  utils/
```

## Implementation Sequence

1. Explicitly define the supported runtime matrix before choosing compatibility shims.
1. Hide runtime branching inside adapter modules instead of exposing it through the SDK API.
1. Separate capability detection from capability emulation.
1. Use one HTTP abstraction per upstream concern, not one per runtime.

## Validation Checklist

- Critical runtime paths have at least smoke coverage.
- URL operations and filesystem operations are never conflated.
- Polyfills or compatibility layers are loaded only where required.
- Public API signatures remain stable across runtime targets.
