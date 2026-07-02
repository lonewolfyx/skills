# Hard Boundaries

These rules are mandatory. If any rule below is confirmed with concrete source evidence, mark the report as `命中屎山边界`. The overall verdict becomes `是屎山` unless the hit is explicitly isolated, generated, or in short-lived migration code.

## Boundary Decision

Use this decision sentence:

```txt
命中屎山边界：<boundary-id>，因为 <file:line> 中 <具体证据> 导致 <维护风险>。
```

Do not weaken a confirmed boundary into a mild suggestion. Do not invent a hit from a raw search candidate without reading the code.

## B1 Stable Cross-Boundary Duplication

Flag when the same logic appears 2+ times and is likely to change together:
- business rules, validators, formatters, DTO to ViewModel mapping, fallback values, error handling, loading/error/data async state, query building, filters, pagination, sorting, or UI interaction flows.
- same rule implemented separately in page, component, store, service, hook, composable, or API layer.
- same default value, cache key, route, endpoint path, enum, status, regex, interval, or storage key handwritten in multiple files.

Allowed exception: local repetition with different semantics, different lifecycle, different future change direction, exploratory code, tests that intentionally show scenarios, framework-required declarations, or simpler inline expressions.

## B2 Thin Wrapper / Pseudo Encapsulation

Flag wrappers that add names without value:
- only forwards arguments: `return target(...args)` or `return await target(...args)`.
- wraps a single native API, standard library call, third-party call, or simple expression.
- creates service, manager, helper, resolver, builder, adapter, provider, repository, hook, or composable only to look layered.
- has one implementation and no real variation, dependency isolation, public API stability, lifecycle management, or test replacement need.

Valid abstraction must provide at least one: business rule, error strategy, compatibility strategy, type/behavior unification, stable entry point, external dependency boundary, runtime adaptation, testing seam, performance strategy, cache/retry/timeout/cancel strategy, or domain model.

## B3 Native API Thin Wrappers

Flag single-operation wrappers around:
- `trim`, `toLowerCase`, `toUpperCase`, `includes`, `startsWith`, `endsWith`, `replace`, `split`, `slice`, `substring`, `padStart`, `padEnd`.
- `map`, `filter`, `find`, `some`, `every`, `reduce`, `join`, `flat`, `flatMap`, `Array.from`, `Array.isArray`.
- `JSON.parse`, `JSON.stringify`, `Boolean`, `Number`, `String`, `value ?? fallback`, `{ ...value }`, `{ ...a, ...b }`, simple math, URL/path/regex one-liners.

Allow only when the wrapper defines real policy, such as schema validation, parse error behavior, cross-platform path compatibility, money precision, domain defaults, or normalized domain value rules.

## B4 Duplicate Types / Pseudo Types

Flag:
- repeated `interface`, `type`, `enum`, union, const map, DTO, VO, Form, Model with the same fields and same semantics.
- runtime constants and TypeScript value domains maintained separately by hand.
- string/number/boolean aliases with no constraint value.
- `as T`, `T extends string` plus assertion, or generic casts that pretend to validate data.
- type gymnastics that hide a simple model or compensate for unclear boundaries.

Prefer one runtime source of truth, such as `const values = [...] as const` plus derived type and real type guard.

## B5 Duplicate Components / Hooks / Composables

Flag:
- components with same structure, style, props, emits, slots, behavior, or accessibility behavior under different names.
- duplicated modal, table, pagination, filter, form, selection, keyboard shortcut, or async state logic.
- `useXxx` functions that do not use state, lifecycle, dependency injection, context, or side effects.
- pure functions disguised as hooks/composables.

## B6 Duplicate API / Request Entrypoints

Flag:
- same endpoint called through multiple entry points or libraries.
- API URL, query construction, body construction, headers, auth, error mapping, retry, timeout, cancellation, response normalization, or DTO mapping repeated in pages/components/stores/hooks.
- bypassing the approved API client, service, repository, or request instance.
- backend response shape leaking into many UI layers without a stable ViewModel boundary.

## B7 Duplicate State / Store / Side Effects

Flag:
- same filter, pagination, sorting, cache, refresh, optimistic update, polling, debounce, throttle, retry, or async state repeated.
- same state stored in local state, store, URL query, and server cache with no boundary or sync strategy.
- temporary UI state lifted globally, or cross-page state left local.
- duplicated event listeners, subscriptions, timers, `watch`, `useEffect`, scroll/resize/visibility handlers without cleanup or shared owner.

## B8 Duplicate UI Styles / Variants

Flag:
- repeated Tailwind/className blocks, base button/card/input/badge styles, hover/active/disabled/error/success states, responsive layouts, dark mode rules, or class composition logic.
- multiple variant systems or design tokens that encode the same visual meaning differently.
- business components copying base UI classes instead of using a shared component or variant config.

## B9 Magic Values / Constants Drift

Flag:
- magic strings/numbers for status, route, API path, event, cache key, storage key, page size, timeout, interval, regex, default, precision, currency, unit, permission, feature flag, or fallback.
- same constant in multiple modules.
- default values scattered across schema, form, page, store, and service.
- enum and const map mirroring each other manually.

## B10 Naming / Concept Drift

Flag:
- same business concept uses multiple names without domain difference, such as user/member/account or repo/repository/project.
- vague buckets: helper, util, utils, common, shared, manager, processor, resolver, base, misc.
- function name promises more than the body does: normalize, format, transform, convert, resolve, create, build, parse, safe, ensure, clean, sanitize, toXxx, fromXxx, useXxx.
- multiple public import paths for the same capability.

## B11 Config / Dependency / Test / Docs Duplication

Flag:
- duplicated tsconfig, eslint, vite, vitest, tailwind, bundler, package scripts, env schema, CI, release, or local workflow rules.
- multiple libraries for the same capability without boundary, such as date, request, class name merge, utility helpers, validation, state, or fetch libraries.
- repeated tests with identical inputs/outputs/assertions, tests that only test wrappers, mock-only tests with no behavior value, or fixtures/helpers more complex than the system under test.
- comments and docs that duplicate code, contradict implementation, explain what instead of why, or preserve stale TODO/FIXME with no owner.

## B12 Duplicate Files / Directories / Public API Paths

Flag:
- `utils`, `helpers`, `common`, `shared`, `core`, and `base` directories overlap in responsibility.
- empty folders/modules/barrels created only to look structured.
- file names differ but content is highly similar.
- same capability exported from root and deep internal paths without a recommended public API.
- business modules import another module's private internals.

## B13 Pseudo Architecture / Over-Engineering

Flag:
- controller/service/repository/model layers only rename and forward calls.
- Strategy, Factory, Observer, Chain, Provider, Adapter, Driver, Registry, or plugin systems without real variation.
- local simple logic lifted into global framework.
- interfaces or abstract classes with one implementation and no credible multi-implementation need.
- manager classes with no state, dependency, lifecycle, policy, or orchestration.

## B14 Complexity Runaway

Flag:
- functions/components/classes/modules mixing request, state, transformation, rendering, errors, cache, permissions, side effects, and formatting.
- functions above 50 lines with multiple responsibilities, or above 80 lines without clear mechanical simplicity.
- nesting deeper than 3 control levels.
- boolean parameters selecting business paths, too many parameters without a domain object, or complex conditions without names.
- refactors that solve complexity by creating thin wrappers instead of clearer boundaries.

## B15 Agent-Generated Invalid Abstractions

Flag when generated code adds:
- helper/util/service/composable/manager/adapter/resolver/builder/normalizer without proving boundary value.
- a function only to reduce one line, create a semantic-looking name, fill a directory, make architecture look complete, or avoid duplication detection.
- new dependency for a simple standard-library-covered task.
- public API expansion without stable ownership.

The abstraction must be defensible with this sentence:

```txt
新增该抽象的原因：它统一了 <规则/策略/边界>，未来变化时只需要修改这里。
```

If that sentence cannot be filled honestly, the abstraction is a boundary violation.
