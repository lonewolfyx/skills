# Naming Rules — Detailed Reference

## Rationale

Consistent naming conventions make code self-documenting. When you see a name, you immediately know what kind of identifier it is and how it should be used:

- **camelCase** functions and variables are standard JavaScript/TypeScript conventions, matching the ecosystem's native APIs (`getElementById`, `addEventListener`).
- **UPPER_SNAKE_CASE** constants signal "do not reassign" at a glance and are a long-standing convention from C/Java traditions.
- **lower_snake_case** config parameters clearly distinguish runtime configuration from code-level identifiers, making config files and schemas visually consistent.

## Rules Summary

| Identifier | Convention | Pattern | Regex |
| --- | --- | --- | --- |
| Function | camelCase | `[a-z][a-zA-Z0-9]*` | `^[a-z][a-zA-Z0-9]*$` |
| Variable / Property | camelCase | `[a-z][a-zA-Z0-9]*` | `^[a-z][a-zA-Z0-9]*$` |
| Constant | UPPER_SNAKE_CASE | `[A-Z][A-Z0-9_]*` | `^[A-Z][A-Z0-9_]*$` |
| Config parameter | lower_snake_case | `[a-z][a-z0-9_]*` | `^[a-z][a-z0-9_]*$` |

## Extended Examples

### Function Naming

```typescript
// Bad — PascalCase (looks like a class)
function GetUserName(id: string) { ... }

// Bad — snake_case (Python/Ruby style)
function get_user_name(id: string) { ... }

// Bad — SCREAMING_CASE (looks like a constant)
function GET_USER_NAME(id: string) { ... }

// Good — camelCase with verb prefix
function getUserName(id: string) { ... }
```

```typescript
// Bad — noun without verb (unclear behavior)
function userName(id: string) { ... }

// Good — verb + noun clearly describes action
function fetchUserName(id: string) { ... }
```

```typescript
// Bad — inconsistent casing
function fetchORDERList() { ... }

// Good — consistent camelCase
function fetchOrderList() { ... }
```

### Variable and Property Naming

```typescript
// Bad — PascalCase for a variable
const UserList = fetchUsers()

// Bad — SCREAMING_CASE for a variable
const USER_LIST = fetchUsers()

// Bad — snake_case for a variable
const user_list = fetchUsers()

// Good — camelCase
const userList = fetchUsers()
```

```typescript
// Bad — boolean without indicator prefix
const active = true
const edit = checkPermission()

// Good — boolean with is/has/can/should prefix
const isActive = true
const canEdit = checkPermission()
```

```typescript
// Bad — property with UPPER_SNAKE_CASE
const obj = {
    USER_NAME: 'John',
    TABLE_NAME: 'orders',
}

// Good — property with camelCase
const obj = {
    userName: 'John',
    tableName: 'orders',
}
```

### Constant Naming

```typescript
// Bad — camelCase for a true constant
const appPath = '/usr/local'
const maxRetryCount = 3

// Bad — lower_snake_case for a true constant
const app_path = '/usr/local'
const max_retry_count = 3

// Good — UPPER_SNAKE_CASE for true constants
const APP_PATH = '/usr/local'
const MAX_RETRY_COUNT = 3
const DEFAULT_TIMEOUT = 3000
const API_VERSION = 'v2'
```

```typescript
// These are NOT constants — they hold computed or runtime values
// Use camelCase, even with const

// Bad — computed value treated as constant
const USER_LIST = await fetchUsers()
const CONFIG = loadConfig()

// Good — computed value as camelCase variable
const userList = await fetchUsers()
const config = loadConfig()
```

```typescript
// Frozen objects can be constants

// Bad — frozen object with camelCase
const defaultHeaders = Object.freeze({
    contentType: 'application/json',
})

// Good — frozen object as constant
const DEFAULT_HEADERS = Object.freeze({
    'Content-Type': 'application/json',
})
```

### Config Parameter Naming

```typescript
// Bad — camelCase config parameters
const appConfig = {
    urlRouteOn: true,
    urlConvert: false,
    maxRetryCount: 3,
    apiBaseUrl: 'https://api.example.com',
}

// Good — lower_snake_case config parameters
const appConfig = {
    url_route_on: true,
    url_convert: false,
    max_retry_count: 3,
    api_base_url: 'https://api.example.com',
}
```

```typescript
// Bad — config interface with PascalCase or UPPER_SNAKE_CASE properties
interface AppConfig {
    URL_ROUTE_ON: boolean
    MaxRetryCount: number
}

// Good — config interface with lower_snake_case properties
interface IAppConfig {
    url_route_on: boolean
    max_retry_count: number
}
```

```typescript
// Environment variables mapping to config
// .env file uses UPPER_SNAKE_CASE (standard convention)
// But the config object properties use lower_snake_case

// .env
API_BASE_URL=https://api.example.com
MAX_RETRY_COUNT=3

// config.ts — properties use lower_snake_case
const config: IAppConfig = {
    api_base_url: process.env.API_BASE_URL,
    max_retry_count: Number(process.env.MAX_RETRY_COUNT),
}
```

## Constant vs Variable — Decision Guide

Use this decision tree to determine whether a `const` declaration is a constant or a variable:

```text
Is it declared at module level (not inside a function/block)?
├── No  → Variable (camelCase)
└── Yes
    ├── Is the value a primitive literal (string, number, boolean)?
    │   ├── Yes → Constant (UPPER_SNAKE_CASE)
    │   └── No
    │       ├── Is it a frozen object/array (Object.freeze)?
    │       │   ├── Yes → Constant (UPPER_SNAKE_CASE)
    │       │   └── No → Variable (camelCase)
    │       └── Is the value a function call, import, or computed expression?
    │           └── Yes → Variable (camelCase)
    └── Is the value ever reassigned (even in a different file)?
        ├── Yes → Variable (should use let, not const)
        └── No  → Follow primitive/frozen checks above
```

## Config Parameter vs Constant — Decision Guide

```text
Is the value defined in a config object, schema, or config file?
├── Yes → Config parameter (lower_snake_case)
└── No
    └── Is it injected or read at runtime (env vars, config loader)?
        ├── Yes → Config parameter (lower_snake_case)
        └── No
            └── Is it a fixed compile-time value in source code?
                └── Yes → Constant (UPPER_SNAKE_CASE)
```

## Migration Strategy

When applying this convention to an existing codebase:

1. Run the skill to collect all violations.
2. Fix constants first (rename to UPPER_SNAKE_CASE) — these are the least ambiguous.
3. Fix config parameters second (rename to lower_snake_case).
4. Fix variables third (rename to camelCase).
5. Fix functions last — they tend to be referenced most widely.
6. Run the TypeScript compiler (`tsc --noEmit`) to catch any missed references.
7. Run tests to verify runtime behavior is unaffected.
