---
name: ts-type-naming
description: TypeScript 类型命名规范约束 / enforce TypeScript naming / interface 命名 / type 命名
---

# TypeScript 类型命名规范

强制执行 TypeScript `interface` 和 `type` 声明的一致命名规范。

## 概述

本 Skill 定义并强制执行以下 TypeScript 类型规范：

**命名规则：**
- **interface**：以 `I` 开头 + 驼峰法首字母大写（PascalCase），如 `IUserInfo`、`IApiResponse`
- **type**：驼峰法首字母小写（camelCase），如 `userInfo`、`apiResponse`

**文件位置规则：**
- 所有 `interface` 和 `type` 声明必须放在专用的类型文件中，不得散落在组件或业务逻辑文件中。
- **通用 TypeScript 项目**：`types.ts`（根目录唯一的最高级类型文件）> `xxxxs.ts` > `xxxx.d.ts`
- **Nuxt 项目**：`shared/types/types.ts` > `shared/types/xxx{s,.d}.ts`
- 项目中只有一个 `types.ts`，它是全局唯一的、最全面的类型定义文件。

## 工作流程

1. **检测项目类型。** 判断项目是否为 Nuxt 项目（检查 `nuxt.config.ts`、`.nuxt/` 目录）或通用 TypeScript 项目。

2. **检查文件位置。** 验证所有 `interface` 和 `type` 声明是否位于允许的类型文件中：
   - 通用 TS 项目：根目录唯一的 `types.ts`，或 `xxxxs.ts` / `*.d.ts`
   - Nuxt 项目：`shared/types/types.ts`，或 `shared/types/*{s,.d}.ts`

3. **识别类型声明。** 扫描所提供的 TypeScript 代码中所有 `interface` 和 `type`（类型别名）声明。

4. **应用命名规则。** 对照命名规范检查每个声明：

   ```text
   interface → IPascalCase    （I + 驼峰法首字母大写）
   type      → camelCase      （驼峰法首字母小写）
   ```

5. **报告违规项。** 对每个不符合规范的声明，报告：
   - 当前名称或文件位置问题
   - 违反的规则（命名或文件位置）
   - 建议的正确名称或目标文件
   - 文件路径和行号

6. **提供修复。** 报告完成后，询问是否执行修复。若确认：
   - 将放错位置的类型声明移动到正确的文件
   - 重命名不符合规范的声明
   - 在整个代码库中更新所有引用

## 命名规则

### interface — `I` + PascalCase

- 所有 `interface` 声明必须以大写 `I` 开头，后接 PascalCase。
- 示例：
  - `interface UserProps` → `interface IUserProps`
  - `interface response` → `interface IResponse`
  - `interface apiConfig` → `interface IApiConfig`

### type — camelCase（首字母小写）

- 所有 `type` 别名声明必须使用驼峰法，首字母小写。
- 示例：
  - `type UserInfo` → `type userInfo`
  - `type APIResponse` → `type apiResponse`
  - `type Theme` → `type theme`

## 文件位置规则

### 通用 TypeScript 项目

项目根目录下只有一个 `types.ts`，它是全局唯一的、最全面的类型定义文件，包含所有共享类型定义。类型声明按优先级组织如下：

| 优先级 | 文件模式 | 说明 | 示例 |
| --- | --- | --- | --- |
| 1（最高） | `types.ts` | 根目录唯一的类型文件，包含所有全面的类型定义 | `types.ts` |
| 2 | `xxxxs.ts` | 领域特定的补充类型文件 | `models.ts`、`users.ts` |
| 3 | `xxxx.d.ts` | 环境声明文件 | `global.d.ts`、`env.d.ts` |

`types.ts` 是唯一的事实来源（single source of truth）。跨项目共享的类型均属于 `types.ts`。领域特定的 `xxxxs.ts` 文件仅应包含与特定领域紧密耦合且不被复用的类型。

如果在非类型文件中发现 `interface` 或 `type` 声明（如 `utils.ts`、`service.ts`、`index.ts`、组件文件），报告为违规并建议移至 `types.ts` 或对应的领域类型文件。

### Nuxt 项目

类型声明只能存在于 `shared/types/` 目录下：

| 优先级 | 文件模式 | 说明 | 示例 |
| --- | --- | --- | --- |
| 1（最高） | `shared/types/types.ts` | 根目录唯一的类型文件 | `shared/types/types.ts` |
| 2 | `shared/types/xxx{s,.d}.ts` | 领域特定的补充类型文件 | `shared/types/users.ts`、`shared/types/api.d.ts` |

`shared/types/types.ts` 是整个 Nuxt 项目的唯一事实来源。`shared/types/` 下的领域特定文件仅用于补充类型。

如果在 `shared/types/` 之外发现 `interface` 或 `type` 声明，报告为违规并建议移至正确的目标文件。

### 例外情况

- **Enum**：本 Skill 不约束枚举命名。
- **来自库的工具类型**（如 `Partial<T>`、`Record<K,V>`）：非用户定义，不受影响。
- **重新导出的第三方类型**：从外部库导入并重新导出的类型不受约束。
- **组件级 Props 类型**：在 Vue/React 项目中，内联的 `defineProps<{...}>()` 或未导出的组件 prop 类型定义不受文件位置规则约束，但如果被提取为命名类型则仍受命名规则约束。

## 输出风格

- 按文件分组展示违规项。
- 将命名违规和文件位置违规分为两类展示。
- 每个重命名或移动使用「修改前 → 修改后」的清晰格式。
- 若无违规项，确认所有类型均符合命名和位置规范。

## 参考

- [references/naming-rules.md](references/naming-rules.md) — 详细原理说明与扩展示例。
