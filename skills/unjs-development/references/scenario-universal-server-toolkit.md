# Universal Server Runtime Toolkit

## Scenario Definition

Use this scenario when you are packaging a server-side application for multiple deployment targets such as Node.js, serverless platforms, or edge runtimes.

## Recommended Toolkit Layers

| Layer | Preferred Package(s) | Responsibility |
| --- | --- | --- |
| Runtime assembly | `nitro` | Owns deployment adaptation, runtime packaging, and server entrypoint composition. |
| HTTP layer | `h3` | Keeps request handling portable and lightweight inside the runtime shell. |
| State and cache | `unstorage` | Abstracts cache, session, and metadata storage over different driver implementations. |
| Realtime transport | `crossws` | Adds WebSocket-style communication without binding to one runtime-specific socket implementation. |
| Local developer bootstrap | `listhen` / `untun` | Improves local preview and remote validation flows without polluting production architecture. |

## Suggested Repository Layout

```text
server/
  api/
  routes/
  middleware/
  services/
  storage/
  realtime/
```

## Implementation Sequence

1. Separate runtime orchestration from business services from the start.
1. Keep platform-specific APIs in adapters and deployment glue, not in domain services.
1. Treat storage drivers as interchangeable only after their semantics are normalized and documented.
1. Add WebSocket transport only when a real realtime workload exists.

## Validation Checklist

- The same service logic can execute across declared deployment targets.
- Storage driver differences are documented and tested.
- Realtime transport does not leak into unrelated HTTP flows.
- Developer-only tunnel or preview features remain isolated from production paths.
