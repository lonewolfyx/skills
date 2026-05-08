# TypeScript Type Naming Rules — Detailed Reference

## Rationale

Consistent naming conventions improve code readability and make it immediately clear whether a type is an interface (structural contract) or a type alias (computed/union/utility type). The `I` prefix for interfaces is a widely adopted convention in many TypeScript codebases.

## Rules Summary

| Declaration | Convention   | Pattern         | Example             |
| ----------- | ------------ | --------------- | ------------------- |
| `interface`  | I + PascalCase | `I[A-Z][a-zA-Z]*` | `IUserInfo`        |
| `type`       | camelCase      | `[a-z][a-zA-Z]*`  | `userInfo`         |

## Extended Examples

### interface

```typescript
// Bad
interface User {
  name: string;
}

interface apiConfig {
  baseUrl: string;
}

interface data_type {
  value: unknown;
}

// Good
interface IUser {
  name: string;
}

interface IApiConfig {
  baseUrl: string;
}

interface IDataType {
  value: unknown;
}
```

### type

```typescript
// Bad
type UserRole = 'admin' | 'user' | 'guest';

type APIResponse<T> = {
  data: T;
  status: number;
};

type Theme = 'light' | 'dark';

// Good
type userRole = 'admin' | 'user' | 'guest';

type apiResponse<T> = {
  data: T;
  status: number;
};

type theme = 'light' | 'dark';
```

### Complex / Nested Types

```typescript
// Bad
type FetchOptions = {
  headers: Record<string, string>;
  timeout: number;
};

interface ResponseWrapper<T> {
  result: T;
  error: string | null;
}

// Good
type fetchOptions = {
  headers: Record<string, string>;
  timeout: number;
};

interface IResponseWrapper<T> {
  result: T;
  error: string | null;
}
```

### Extends and Implements

When renaming an interface, update all `extends` and `implements` references:

```typescript
// Before
interface BaseProps { id: string; }
interface UserProps extends BaseProps { name: string; }
class UserService implements UserProps { ... }

// After
interface IBaseProps { id: string; }
interface IUserProps extends IBaseProps { name: string; }
class UserService implements IUserProps { ... }
```

### Union and Intersection Types

When renaming type aliases used in unions/intersections, update all references:

```typescript
// Before
type Status = 'active' | 'inactive';
type ApiResponse = { status: Status; data: unknown; };

// After
type status = 'active' | 'inactive';
type apiResponse = { status: status; data: unknown; };
```

## Migration Strategy

When applying this convention to an existing codebase:

1. Run the skill to collect all violations.
2. Move misplaced type declarations to correct files first.
3. Rename interfaces second (they tend to be referenced more widely).
4. Rename type aliases third.
5. Run the TypeScript compiler (`tsc --noEmit`) to catch any missed references.
6. Run tests to verify runtime behavior is unaffected.

---

## File Location Rules

### General TypeScript Projects

There is only ONE `types.ts` at the project root — it is the single source of truth for all type definitions. All `interface` and `type` declarations must reside in dedicated type files.

**Allowed files (by priority):**

1. `types.ts` — the ONE root-level type file, contains all comprehensive types
2. `xxxxs.ts` — pluralized domain name files for supplementary types (e.g., `models.ts`, `users.ts`, `roles.ts`)
3. `xxxx.d.ts` — declaration files (e.g., `global.d.ts`, `env.d.ts`, `vite-env.d.ts`)

**Example directory structure:**

```
src/
  components/
    UserCard.vue          # component file — no type declarations allowed
  services/
    api.ts                # service logic — no type declarations allowed
  models.ts              # domain-specific types (xxxxs.ts pattern)
  types.ts               # the single root type file — all shared types go here
  global.d.ts            # ambient declarations
```

**Bad — types scattered in logic files:**

```typescript
// src/services/user.ts — mixing logic with type definitions
export interface UserResponse {
  data: IUser[];
  total: number;
}

type UserFilter = {
  role: string;
  active: boolean;
};

export async function getUsers(filter: UserFilter) { ... }
```

**Good — types extracted to the single root type file:**

```typescript
// src/types.ts — the single source of truth
export interface IUserResponse {
  data: IUser[];
  total: number;
}

export type userFilter = {
  role: string;
  active: boolean;
};

// src/services/user.ts — pure logic
import type { userFilter, IUserResponse } from '../types';

export async function getUsers(filter: userFilter): Promise<IUserResponse> { ... }
```

### Nuxt Projects

In Nuxt projects, there is only ONE `shared/types/types.ts` — it is the single source of truth for the entire project.

**Allowed files:**

```
shared/types/
  types.ts                # the single root type file — all shared types go here
  api.ts                  # domain-specific supplementary types
  api.d.ts                # ambient API declarations
  user.ts                 # user domain types
  user.d.ts               # ambient user declarations
```

**Bad — types in components or composables:**

```typescript
// components/UserProfile.vue
<script setup lang="ts">
interface UserProps {
  name: string;
  avatar: string;
}
</script>
```

**Good — types in shared/types:**

```typescript
// shared/types/user.ts
export interface IUserProps {
  name: string;
  avatar: string;
}

// components/UserProfile.vue
<script setup lang="ts">
import type { IUserProps } from '~/shared/types/user';
</script>
```

### File Naming Priority

When placing types, prefer in this order:

1. `types.ts` — the single root-level type file (use this for all shared types)
2. `xxxxs.ts` — domain-specific supplementary file
3. `xxxx.d.ts` — declaration file (for ambient/global types)

If no type file exists yet, create `types.ts` at the root as the default.
