# Lightweight HTTP API Toolkit

## Scenario Definition

Use this scenario when the primary artifact is an HTTP API, webhook receiver, middleware chain, or request proxy rather than a full universal application runtime.

## Recommended Toolkit Layers

| Layer | Preferred Package(s) | Responsibility |
| --- | --- | --- |
| HTTP boundary | `h3` | Hosts request handlers, middleware, and response composition. |
| Outbound HTTP client | `ofetch` | Standardizes retries, timeout policy, base URLs, and error normalization for upstream calls. |
| Cookie handling | `cookie-es` | Serializes and parses cookies at the request/response boundary. |
| Path dispatch | `radix3` | Supports lower-level path matching when route control needs to be explicit. |
| URL composition | `ufo` | Centralizes query manipulation and URL normalization. |

## Suggested Repository Layout

```text
src/
  server/
    handlers/
    middleware/
    routes/
  services/
  clients/
```

## Implementation Sequence

1. Keep handlers thin and push side-effect orchestration into services and clients.
1. Normalize request parsing, cookie access, and error envelopes in middleware or utility layers.
1. Assign one client module per upstream system instead of using a single global HTTP client.
1. Use explicit URL helpers rather than ad-hoc string concatenation.

## Validation Checklist

- Error envelopes are stable across handler implementations.
- Cookies and query parameters are parsed consistently.
- Upstream client policy is centralized and reusable.
- Routing behavior remains predictable under dynamic and static path overlap.
