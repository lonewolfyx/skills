# unstorage

## Trigger Conditions

- Abstracting cache, session, metadata, or lightweight state over pluggable backends.
- Needing a driver-agnostic asynchronous key-value layer inside server workloads.

## Architectural Constraints

- Document backend-specific semantics such as TTL, watch behavior, and metadata support.
- Define stable key namespaces and serialization rules before broad adoption.
- Keep consumers dependent on storage semantics, not on a specific backend driver.

## Implementation Guidance

1. Create a storage module that exposes namespaced operations.
1. Generate cache keys with a dedicated key policy, optionally backed by `ohash`.
1. Select drivers in deployment or composition code rather than inside business services.

## Recommended Composition

- Primary role: Driver-agnostic asynchronous key-value storage
- Typical usage: Abstracts storage backends for cache, state, session, and metadata use cases.
- Common companions: `ohash`, `fs-memo`, `nitro`
- Primary scenario family: Data, Storage, and Core Runtime Utilities

## Misuse Patterns to Avoid

- Do not treat `unstorage` as a transaction database.
- Do not let arbitrary business modules invent storage keys ad hoc.

## Verification Checklist

- Driver swaps preserve the documented invariants.
- TTL and watch semantics behave as expected in the chosen backend.
- Namespacing prevents cross-feature key collisions.
