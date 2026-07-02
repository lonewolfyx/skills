# Audit Rubric

Use this rubric to judge whether the project is readable, maintainable, structurally coherent, and mature enough to evolve safely. Treat the checklist as review criteria, not style preferences.

## Category Scores

Score each category from 0 to 20. Higher means worse.

1. 可读性
   - 命名语义清晰: variables, functions, components, hooks, services, and files express intent without needing comments.
   - 函数职责单一: a function or component does one conceptual job and can be explained in one sentence.
   - 层次清晰: indentation, guard clauses, paragraphs, blank lines, and branch structure make the flow easy to scan.
   - 注释合理: comments explain why, boundary constraints, compatibility, or tradeoffs. Flag comments that merely repeat what code says.
   - 重复代码: copy-paste blocks, repeated callbacks, repeated condition branches, repeated data conversion, or duplicated UI structures are visible and change-coupled.

2. 可维护性
   - 模块划分合理: files, functions, components, and packages have clear ownership. Flag God files and mixed responsibilities.
   - 层级深度控制: nesting should usually stay within 2-3 levels. Deep branches need guard clauses or extracted semantic units.
   - 硬编码: magic strings, numbers, API paths, route names, cache keys, defaults, regexes, intervals, and status values should not be scattered.
   - 技术债: TODO, FIXME, HACK, TEMP, long-lived workarounds, disabled lint, and unclear compatibility patches should be visible and owned.

3. 代码结构 / 模式使用
   - 状态和副作用合理: React `useEffect` / `useState`, Vue `watch` / composables, stores, subscriptions, timers, and async effects have clear ownership and cleanup.
   - 组件拆分合理: UI, state, data fetching, and domain logic are separated when it reduces complexity. Do not split just to create thin wrappers.
   - 模块组织规范: `utils`, `services`, `constants`, `hooks`, `composables`, `stores`, and domain modules have non-overlapping responsibilities.
   - 现代语法: use current language features that clarify intent, such as TypeScript types, destructuring, async/await, and standard library APIs.
   - 类型严谨: avoid `any`, fake generic safety, broad casts, `@ts-ignore`, duplicated runtime/type domains, and unvalidated external data.

4. 代码异味
   - Magic Numbers / Magic Strings: unexplained literals encode business rules.
   - Long Function: functions above 50 lines are suspicious; above 80 lines are high risk unless mechanically simple.
   - Nested Hell: deeply nested control flow, callbacks, Promise chains, or condition trees hide business decisions.
   - Copy-paste code: same logic appears in multiple files, pages, stores, services, or components.
   - 全局状态污染: direct global mutation, ambient variables, window/globalThis assignments, or shared mutable singletons without boundary.
   - 异步地狱: nested `then`, callback chains, mixed request/state/render side effects, missing cancellation or cleanup.

5. 开发者思维成熟度
   - 抽象/封装思想: shared logic lives in the smallest semantic owner, not in vague helper buckets.
   - 模块边界清晰: avoid cross-layer calls, deep imports into private implementation, and duplicate public entry points.
   - 可访问性考虑: semantic HTML, labels, `alt`, keyboard behavior, focus state, and ARIA are present where relevant.
   - 设计模式 / 最佳实践: patterns such as strategy, adapter, factory, provider, or chain are used only when real variation exists.
   - 领域建模思维: names and boundaries reflect business entities, rules, workflows, and invariants.

## Severity

- P0: confirmed hard boundary hit with likely repeated maintenance failures, wrong behavior, or architecture-level ambiguity.
- P1: high maintenance risk, cross-file duplication, or code that blocks safe change.
- P2: local smell that increases reading cost or future refactor cost.
- P3: minor cleanup or style issue; include only when it supports a larger pattern.

## Review Discipline

- Prefer a small number of evidence-backed findings over broad accusations.
- Confirm whether similar code has the same semantics before calling it duplication.
- Treat generated metrics as leads. Open files and verify intent before final judgment.
- If a thin abstraction is removed in the recommendation, state the missing value: no business rule, no type unification, no error strategy, no stable entry, no variation isolation, or no test value.
