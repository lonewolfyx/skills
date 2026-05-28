---
name: ts-type-naming
description: Enforce TypeScript type naming conventions / TypeScript 类型命名规范约束 / interface type naming / type alias naming
---

# TypeScript Type Naming Convention

Enforce consistent naming conventions for TypeScript `interface` and `type` declarations.

## Overview

This skill defines and enforces strict conventions for TypeScript type definitions:

**Naming rules:**
- **interface**: prefixed with `I` + PascalCase (e.g., `IUserInfo`, `IApiResponse`)
- **type**: camelCase with a lowercase first letter (e.g., `userInfo`, `apiResponse`)

**File location rules:**
- All `interface` and `type` declarations must be placed in dedicated type files, not scattered across component or logic files.
- **General TypeScript projects**: `types.ts` (the single root-level file) > `xxxxs.ts` > `xxxx.d.ts`
- **Nuxt projects**: `shared/types/types.ts` > `shared/types/xxx{s,.d}.ts`
- There is only ONE `types.ts` at the root — it is the highest-level, most comprehensive type file.

## Workflow

1. **Detect project type.** Determine whether the project is a Nuxt project (check for `nuxt.config.ts`, `.nuxt/` directory) or a general TypeScript project.

2. **Check file locations.** Verify that all `interface` and `type` declarations reside in allowed type files:
   - General TS: the single `types.ts` at root level, or `xxxxs.ts` / `*.d.ts`
   - Nuxt: `shared/types/types.ts`, or `shared/types/*{s,.d}.ts`

3. **Identify type declarations.** Scan the provided TypeScript code for all `interface` and `type` (alias) declarations.

4. **Apply naming rules.** Check each declaration against the naming convention:

   ```text
   interface → IPascalCase    (I + PascalCase)
   type      → camelCase      (lowercase first letter)
   ```

5. **Report violations.** For each non-conforming declaration, report:
   - The current name or file location issue
   - The rule it violates (naming or file location)
   - The suggested correct name or target file
   - The file path and line number

6. **Offer to fix.** After reporting, ask whether to apply the fixes. If approved:
   - Move misplaced type declarations to the correct file
   - Rename non-conforming declarations
   - Update all references across the codebase

## Naming Rules

### interface — `I` + PascalCase

- Every `interface` declaration must start with an uppercase `I` followed by PascalCase.
- Examples:
  - `interface UserProps` → `interface IUserProps`
  - `interface response` → `interface IResponse`
  - `interface apiConfig` → `interface IApiConfig`

### type — camelCase (lowercase first letter)

- Every `type` alias declaration must use camelCase with a lowercase first letter.
- Examples:
  - `type UserInfo` → `type userInfo`
  - `type APIResponse` → `type apiResponse`
  - `type Theme` → `type theme`

## File Location Rules

### General TypeScript Projects

There is only ONE `types.ts` at the project root — it is the highest-level, most comprehensive type file containing all shared type definitions. Type declarations are organized by priority:

| Priority | File Pattern | Description | Example |
| --- | --- | --- | --- |
| 1 (highest) | `types.ts` | The single root-level type file, contains all comprehensive types | `types.ts` |
| 2 | `xxxxs.ts` | Domain-specific type files for supplementary types | `models.ts`, `users.ts` |
| 3 | `xxxx.d.ts` | Ambient declaration files | `global.d.ts`, `env.d.ts` |

The `types.ts` file is the single source of truth. If a type is shared across the project, it belongs in `types.ts`. Domain-specific `xxxxs.ts` files should only contain types that are tightly coupled to a specific domain and not reused elsewhere.

If `interface` or `type` declarations are found in non-type files (e.g., `utils.ts`, `service.ts`, `index.ts`, component files), report them as violations and suggest moving them to `types.ts` or the appropriate domain-specific type file.

### Nuxt Projects

Type declarations must only exist in `shared/types/`:

| Priority | File Pattern | Description | Example |
| --- | --- | --- | --- |
| 1 (highest) | `shared/types/types.ts` | The single root-level type file | `shared/types/types.ts` |
| 2 | `shared/types/xxx{s,.d}.ts` | Domain-specific type files | `shared/types/users.ts`, `shared/types/api.d.ts` |

The `shared/types/types.ts` is the single source of truth for the entire Nuxt project. Domain-specific files under `shared/types/` are for supplementary types only.

If `interface` or `type` declarations are found outside `shared/types/`, report them as violations and suggest the correct target file.

### Exceptions

- **Enum**: No naming constraint applied in this skill.
- **Utility types from libraries** (e.g., `Partial<T>`, `Record<K,V>`): These are not user-defined and are not affected.
- **Re-exported third-party types**: If a type is imported from an external library and re-exported, it is exempt.
- **Component-local Props types**: In Vue/React projects, inline `defineProps<{...}>()` or component prop type definitions that are not exported are exempt from the file location rule, but still subject to the naming rule if they are extracted as named types.

## Output Style

- Present violations as a structured list grouped by file.
- Separate naming violations and file location violations into two categories.
- Use clear before → after format for each rename or move.
- If no violations are found, confirm that all types conform to the naming and location conventions.

## Reference

- [references/naming-rules.md](references/naming-rules.md) — Detailed rationale and extended examples.
