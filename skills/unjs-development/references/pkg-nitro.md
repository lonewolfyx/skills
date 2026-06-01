# nitro

## Trigger Conditions

- Packaging a server application for multiple deployment targets such as Node.js, serverless functions, or edge runtimes.
- Needing a runtime shell that can coordinate routes, storage, tasks, and realtime transport.

## Architectural Constraints

- Keep `nitro` as the runtime assembly layer rather than a container for domain logic.
- Isolate platform-specific APIs behind adapters so service logic remains portable.
- Only adopt `nitro` when the application genuinely needs multi-target runtime composition.

## Implementation Guidance

1. Separate `routes/`, `middleware/`, `services/`, `storage/`, and `realtime/` from the start.
1. Keep HTTP logic in `h3` handlers and push persistent state behind `unstorage` or dedicated repositories.
1. Document driver-specific behavior any time runtime storage differs across targets.

## Recommended Composition

- Primary role: Universal server runtime
- Typical usage: Packages server-side application logic for deployment across Node.js, serverless platforms, and edge runtimes.
- Common companions: `h3`, `unstorage`, `crossws`
- Primary scenario family: Server, HTTP, and Network Communication

## Misuse Patterns to Avoid

- Do not introduce `nitro` for a workload that only needs a few standalone handlers.
- Do not let tunnel, preview, or debug-only flows leak into production runtime paths.

## Verification Checklist

- Declared deployment targets boot the same business services.
- Driver differences are tested and documented.
- Platform APIs do not appear inside core service modules.
