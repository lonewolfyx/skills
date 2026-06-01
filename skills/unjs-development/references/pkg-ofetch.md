# ofetch

## Trigger Conditions

- Building a reusable HTTP client layer for upstream APIs or service-to-service communication.
- Needing centralized timeout, retry, base URL, and interceptor policy.

## Architectural Constraints

- Instantiate clients per upstream concern rather than relying on one global catch-all client.
- Normalize errors at the client boundary instead of reinterpreting low-level HTTP failures across handlers.
- Keep `ofetch` inside client or service modules, not arbitrary UI or route files.

## Implementation Guidance

1. Create one client module per upstream API.
1. Co-locate base URL, auth headers, and retry policy with that client.
1. Return typed domain objects or normalized response envelopes from the client layer.

## Recommended Composition

- Primary role: Ergonomic fetch client
- Typical usage: Standardizes outbound HTTP with base URLs, interceptors, retry semantics, timeout policy, and normalized error handling.
- Common companions: `h3`, `ufo`, `node-fetch-native`
- Primary scenario family: Server, HTTP, and Network Communication

## Misuse Patterns to Avoid

- Do not repeat base URLs and auth headers at every callsite.
- Do not enable retries indiscriminately for non-idempotent mutations.

## Verification Checklist

- Timeouts and retries behave deterministically.
- Error envelopes remain stable across upstream failures.
- URL composition is delegated to helpers rather than manual concatenation.
