---
name: naming-convention
description: 函数名常量变量命名规范约束 / enforce naming conventions / camelCase function / UPPER_SNAKE_CASE constant / variable naming
---

# 函数名、常量、变量及配置参数命名规范

基于标识符的语义角色和使用场景，强制执行函数、常量、变量和配置参数的一致命名规范。

## 概述

本 Skill 定义并强制执行以下 JavaScript/TypeScript 标识符的命名规范：

| 标识符类型 | 命名规范 | 模式 | 示例 |
| --- | --- | --- | --- |
| 函数 | camelCase | `[a-z][a-zA-Z0-9]*` | `getUserName`、`fetchOrderList` |
| 变量 / 属性 | camelCase | `[a-z][a-zA-Z0-9]*` | `tableName`、`currentUserId` |
| 常量 | UPPER_SNAKE_CASE | `[A-Z][A-Z0-9_]*` | `APP_PATH`、`ROOT_PATH`、`MAX_RETRY_COUNT` |
| 配置参数 | lower_snake_case | `[a-z][a-z0-9_]*` | `url_route_on`、`url_convert` |

TypeScript `interface` 和 `type` 的命名规则，请参考 [ts-type-naming](../ts-type-naming/SKILL_ZH.md) Skill。

## 工作流程

1. **检测上下文。** 识别被审查代码的业务领域和场景（如 API 层、数据模型、UI 组件、配置、工具函数等）。

2. **分类标识符。** 扫描代码并按语义角色对每个标识符进行分类：
   - 是函数/方法？→ 函数命名规则
   - 是可变或不可变的变量/属性？→ 变量命名规则
   - 是真正的常量（模块级、永不重新赋值、`const` 声明且值为原始字面量或冻结对象）？→ 常量命名规则
   - 是配置参数（通过配置对象、环境变量或配置 schema 传入）？→ 配置参数命名规则

3. **应用命名规则。** 对照相应角色的规范检查每个标识符。

4. **检查上下文对齐。** 验证名称是否准确反映其代表的业务概念和场景（参见 [references/01-scenario-based-naming.md](references/01-scenario-based-naming.md)）。

5. **报告违规项。** 对每个不符合规范的标识符，报告：
   - 当前名称
   - 违反的规则
   - 建议的正确名称
   - 文件路径和行号

6. **提供修复。** 报告完成后，询问是否执行修复。若确认：
   - 重命名不符合规范的标识符
   - 在整个代码库中更新所有引用

## 命名规则

### 函数 — camelCase（首字母小写）

- 所有函数和方法名必须使用驼峰法，首字母小写。
- 使用动词或动词短语，清晰描述函数的功能。
- 按场景的常用前缀：

| 场景 | 前缀示例 | 完整示例 |
| --- | --- | --- |
| 数据获取 | `get`、`fetch`、`load` | `getUserInfo`、`fetchOrderList` |
| 数据变更 | `set`、`update`、`delete`、`create`、`save` | `setUserName`、`deleteOrderItem` |
| 状态判断 | `is`、`has`、`can`、`should` | `isActive`、`hasPermission`、`canEdit` |
| 类型转换 | `to`、`from`、`parse`、`format` | `toDate`、`parseQueryString`、`formatCurrency` |
| 事件处理 | `on`、`handle` | `onSubmit`、`handleClick` |
| 生命周期 | `init`、`destroy`、`mount`、`unmount` | `initApp`、`destroySession` |
| 业务动作 | 领域特定动词 | `placeOrder`、`cancelSubscription` |

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

### 变量 / 属性 — camelCase（首字母小写）

- 所有变量和属性名必须使用驼峰法，首字母小写。
- 使用名词或名词短语，清晰描述变量的含义。
- 布尔类型变量应以 `is`、`has`、`can` 或 `should` 为前缀。

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

### 常量 — UPPER_SNAKE_CASE

- 真正的常量（模块级 `const`，永不重新赋值，值为原始字面量或冻结对象）必须使用大写字母和下划线命名。
- 仅当同时满足以下所有条件时，才归类为常量：
  - 在模块级别声明（不在函数或代码块内）
  - 使用 `const` 声明（非 `let` 或 `var`）
  - 值为原始字面量（字符串、数字、布尔值）或冻结的对象/数组
  - 值在代码库中永不被重新赋值

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

**重要区分**：持有计算值、函数调用结果或非冻结对象的 `const` 声明不是常量——它们是变量，应使用 camelCase：

```typescript
// 这是变量，不是常量 — 使用 camelCase
const userList = fetchUsers()
const config = loadConfig()

// 这才是常量 — 使用 UPPER_SNAKE_CASE
const DEFAULT_TIMEOUT = 3000
const API_BASE_URL = 'https://api.example.com'
```

### 配置参数 — lower_snake_case（小写字母和下划线）

- 配置参数（在配置对象、环境变量、配置文件中定义的值，或作为配置选项传入的参数）必须使用小写字母和下划线命名。
- 适用于：
  - 配置对象 / 配置 schema 中的属性
  - 映射到配置参数的环境变量值
  - 配置文件中的键名
  - 功能开关和切换标志

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
// Bad — 配置参数以常量方式命名
interface AppConfig {
    APP_PATH: string
    MAX_RETRY: number
}

// Good — 配置参数使用 lower_snake_case
interface IAppConfig {
    app_path: string
    max_retry: number
}
```

**区分配置参数与常量**：如果一个值属于配置对象/schema（从配置文件读取、作为选项传入或在运行时注入），它是配置参数，使用 `lower_snake_case`。如果它是模块级别定义的固定编译时值，它是常量，使用 `UPPER_SNAKE_CASE`。

## 上下文与场景规则

命名必须反映业务领域和场景。详细的场景命名指导请参见 [references/01-scenario-based-naming.md](references/01-scenario-based-naming.md)，涵盖：

- API 层命名模式
- 数据模型与实体命名
- UI 组件与事件命名
- 工具函数与辅助函数命名
- 状态管理命名
- 配置与环境命名

## 输出风格

- 按文件分组展示违规项。
- 按类别分类展示：函数、变量、常量、配置参数。
- 每个重命名使用「修改前 → 修改后」的清晰格式。
- 建议替代名称时包含场景上下文。
- 若无违规项，确认所有标识符均符合命名规范。

## 参考

- [references/00-naming-rules.md](references/00-naming-rules.md) — 详细原理说明与扩展示例。
- [references/01-scenario-based-naming.md](references/01-scenario-based-naming.md) — 上下文与场景命名指导。
- [ts-type-naming](../ts-type-naming/SKILL_ZH.md) — TypeScript `interface` 和 `type` 命名规则。
