---
name: naming-convention
description: Enforce naming conventions for functions, constants, variables, and config parameters / 函数名常量变量命名规范约束 / camelCase function / UPPER_SNAKE_CASE constant / variable naming
---

# Naming Convention for Functions, Constants, Variables, and Config Parameters

Enforce consistent naming conventions for functions, constants, variables, and configuration parameters based on their semantic role and usage context.

## Overview

This skill defines and enforces strict naming conventions for JavaScript/TypeScript identifiers:

| Identifier | Convention | Pattern | Example |
| --- | --- | --- | --- |
| Function | camelCase | `[a-z][a-zA-Z0-9]*` | `getUserName`, `fetchOrderList` |
| Variable / Property | camelCase | `[a-z][a-zA-Z0-9]*` | `tableName`, `currentUserId` |
| Constant | UPPER_SNAKE_CASE | `[A-Z][A-Z0-9_]*` | `APP_PATH`, `ROOT_PATH`, `MAX_RETRY_COUNT` |
| Config parameter | lower_snake_case | `[a-z][a-z0-9_]*` | `url_route_on`, `url_convert` |

For TypeScript `interface` and `type` naming rules, reference the [ts-type-naming](../ts-type-naming/SKILL.md) skill.

## Workflow

1. **Detect context.** Identify the business domain and scenario of the code being reviewed (e.g., API layer, data models, UI components, configuration, utilities).

2. **Classify identifiers.** Scan the code and classify each identifier by its semantic role:
   - Is it a function/method? → Function naming rules
   - Is it a mutable or immutable variable/property? → Variable naming rules
   - Is it a true constant (module-level, never reassigned, `const` with primitive literal or frozen object)? → Constant naming rules
   - Is it a configuration parameter (passed via config objects, env files, or config schemas)? → Config parameter naming rules

3. **Apply naming rules.** Check each identifier against the convention for its role.

4. **Check context alignment.** Verify that the name accurately reflects the business concept and scenario it represents (see [references/01-scenario-based-naming.md](references/01-scenario-based-naming.md)).

5. **Report violations.** For each non-conforming identifier, report:
   - The current name
   - The rule it violates
   - The suggested correct name
   - The file path and line number

6. **Offer to fix.** After reporting, ask whether to apply the fixes. If approved:
   - Rename non-conforming identifiers
   - Update all references across the codebase

## Naming Rules

### Function — camelCase (首字母小写)

- All function and method names must use camelCase with a lowercase first letter.
- Use a verb or verb phrase that clearly describes what the function does.
- Common prefixes by scenario:

| Scenario | Prefix Examples | Full Example |
| --- | --- | --- |
| Data fetching | `get`, `fetch`, `load` | `getUserInfo`, `fetchOrderList` |
| Data mutation | `set`, `update`, `delete`, `create`, `save` | `setUserName`, `deleteOrderItem` |
| State check | `is`, `has`, `can`, `should` | `isActive`, `hasPermission`, `canEdit` |
| Conversion | `to`, `from`, `parse`, `format` | `toDate`, `parseQueryString`, `formatCurrency` |
| Event handler | `on`, `handle` | `onSubmit`, `handleClick` |
| Lifecycle | `init`, `destroy`, `mount`, `unmount` | `initApp`, `destroySession` |
| Business action | domain-specific verbs | `placeOrder`, `cancelSubscription` |

```typescript
// Bad
function GetUserName() {}
function user_info() {}
function FETCH_DATA() {}

// Good
function getUserName() {}
function userInfo() {}
function fetchData() {}
```

### Variable / Property — camelCase (首字母小写)

- All variable and property names must use camelCase with a lowercase first letter.
- Use a noun or noun phrase that clearly describes what the variable holds.
- Boolean variables should use `is`, `has`, `can`, or `should` as prefix.

```typescript
// Bad
const User_Name = 'John'
let Table_Name = 'orders'
const IS_ACTIVE = true

// Good
const userName = 'John'
let tableName = 'orders'
const isActive = true
```

### Constant — UPPER_SNAKE_CASE

- True constants (module-level `const` that is never reassigned, with a primitive literal or frozen value) must use UPPER_SNAKE_CASE.
- A constant is only classified as such when ALL of the following hold:
  - Declared at module level (not inside a function or block)
  - Declared with `const` (not `let` or `var`)
  - The value is a primitive literal (string, number, boolean) or a frozen object/array
  - The value is never reassigned in the codebase

```typescript
// Bad
const appPath = '/usr/local'
const MaxRetryCount = 3
const root_path = '/'

// Good
const APP_PATH = '/usr/local'
const MAX_RETRY_COUNT = 3
const ROOT_PATH = '/'
```

**Important**: `const` declarations that hold computed values, function calls, or non-frozen objects are NOT constants — they are variables and should use camelCase:

```typescript
// This is a variable, NOT a constant — use camelCase
const userList = fetchUsers()
const config = loadConfig()

// This IS a constant — use UPPER_SNAKE_CASE
const DEFAULT_TIMEOUT = 3000
const API_BASE_URL = 'https://api.example.com'
```

### Config Parameter — lower_snake_case (小写字母和下划线)

- Configuration parameters (values defined in config objects, environment variables, config files, or passed as configuration options) must use lowercase with underscores.
- This applies to:
  - Properties in configuration objects / config schemas
  - Environment variable values that map to config parameters
  - Configuration file keys
  - Feature flags and toggle switches

```typescript
// Bad
const config = {
    urlRouteOn: true,
    urlConvert: false,
    maxRetryCount: 3,
}

// Good
const config = {
    url_route_on: true,
    url_convert: false,
    max_retry_count: 3,
}
```

```typescript
// Bad — config parameter named as constant
interface AppConfig {
    APP_PATH: string
    MAX_RETRY: number
}

// Good — config parameter uses lower_snake_case
interface IAppConfig {
    app_path: string
    max_retry: number
}
```

**Distinguish config parameters from constants**: If a value is part of a configuration object/schema (read from config files, passed as options, or injected at runtime), it is a config parameter and uses `lower_snake_case`. If it is a fixed compile-time value defined at module level, it is a constant and uses `UPPER_SNAKE_CASE`.

## Context and Scenario Rules

Naming must reflect the business domain and scenario. See [references/01-scenario-based-naming.md](references/01-scenario-based-naming.md) for detailed guidance on:

- API layer naming patterns
- Data model and entity naming
- UI component and event naming
- Utility and helper function naming
- Store / state management naming
- Configuration and environment naming

## Output Style

- Present violations as a structured list grouped by file.
- Separate violations by category: function, variable, constant, config parameter.
- Use a clear before → after format for each rename.
- Include the scenario context when suggesting alternative names.
- If no violations are found, confirm that all identifiers conform to the naming conventions.

## Reference

- [references/00-naming-rules.md](references/00-naming-rules.md) — Detailed rationale and extended examples.
- [references/01-scenario-based-naming.md](references/01-scenario-based-naming.md) — Context and scenario-based naming guidance.
- [ts-type-naming](../ts-type-naming/SKILL.md) — TypeScript `interface` and `type` naming rules.
