# Storage, Cache, and Data-Layer Toolkit

## Scenario Definition

Use this scenario when the deliverable includes cache management, key-value storage, data-access infrastructure, or archive persistence.

## Recommended Toolkit Layers

| Layer | Preferred Package(s) | Responsibility |
| --- | --- | --- |
| Key-value abstraction | `unstorage` | Provides an asynchronous storage boundary over multiple backend drivers. |
| Filesystem memoization | `fs-memo` | Persists reusable intermediate results on local disk. |
| Stable key generation | `ohash` | Computes reproducible hashes for cache keys and change detection. |
| SQL access | `db0` | Supplies a compact relational data-access surface. |
| MongoDB developer layer | `mongoz` | Provides low-friction MongoDB integration where document storage is appropriate. |
| Archive handling | `nanotar` | Covers archive packaging and extraction for templates and snapshots. |

## Suggested Repository Layout

```text
src/
  storage/
  cache/
  db/
  archive/
```

## Implementation Sequence

1. Define consistency requirements and storage semantics before choosing a driver.
1. Separate cache keys, storage namespaces, and serialization policy into dedicated modules.
1. Abstract storage access behind interfaces that reflect real workload semantics.
1. Treat archive workflows as separate from persistence workflows.

## Validation Checklist

- TTL, metadata, and watch semantics are explicit.
- Cache keys are deterministic and documented.
- Driver swaps do not accidentally change application invariants.
- Archive extraction paths are safe and reversible.
