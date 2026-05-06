---
name: git-commit-message
description: 生成符合 Conventional Commits、Angular 风格提交规范以及仓库本地校验器（如 `scripts/verify-commit.js`）的 Git commit message。用于检查 staged changes、选择合法的 commit `type`、起草 `git commit` 提交信息、修正不通过 hook 的 commit header，或处理 Git 提交信息 / commit message / git comment generation 相关需求。
---

# Git 提交信息

## 概览

生成语义准确且能够通过当前仓库本地校验的提交信息。
当通用规范与仓库内的 commit hook 或校验脚本冲突时，优先遵循仓库本地规则。

## 工作流程

1. 先检查变更，再写提交信息。
   优先使用 `git status --short`、`git diff --cached --stat`、`git diff --cached` 理解本次提交内容。
   如果当前没有 staged changes，则检查用户明确指出的 diff，并说明提交信息是基于未暂存变更或文字描述生成的。

2. 优先读取仓库本地规则。
   如果仓库中存在 `scripts/verify-commit.js`、`.github/commit-convention.md`、`commitlint` 配置或等价的 commit hook，先读取这些文件，并将其视为最高优先级规则。
   对于当前仓库，`scripts/verify-commit.js` 目前接受以下 header 结构：

```text
(revert: )?<type>(<scope>)?!?: <subject>
```

3. 选择最精确且合法的 `type`。
   如果仓库已经定义了允许的 type 列表，严格按该列表生成。
   对于当前仓库，允许的 type 为：

```text
feat, fix, docs, dx, style, refactor, perf, test,
workflow, build, ci, chore, types, wip, release
```

4. 按 Angular 风格撰写 subject。
   保持祈使语气、语义具体、结尾不加句号。
   除非遇到专有名词、品牌名或标识符，否则 `type(scope):` 后的 subject 尽量使用小写开头。
   首行长度必须足够短，以满足本地校验器的限制。

5. 返回前先对照本地约束自检。
   对于当前仓库：
- `subject` 长度必须在 `1-50` 个字符之间。
- 允许在 breaking change 中使用 `type!:` 与 `type(scope)!:`。
- `scope` 是可选的；如果不能提升可读性，就省略。
- 仅当本次提交确实是在回滚之前的提交时，才使用 `revert: ` 前缀。

6. 仅在有帮助时补充 body 或 footer。
   当前本地校验器只检查 header，但如果 body/footer 能提升表达质量，仍然应保持 Angular 风格结构：
- 用空行分隔 header、body 和 footer。
- 重点说明改了什么、为什么改，而不是实现细节。
- issue 引用、breaking change 说明可以放在 body 或 footer 中。
- 如果是 breaking change，优先在 header 中使用 `!`，并按需在 body/footer 中补充影响说明。

## Type 选择规则

- `feat`：新增用户可感知的功能。
- `fix`：修复 bug 或错误行为。
- `docs`：仅修改文档。
- `dx`：改进开发者体验、工程可用性或本地工作流，不改变运行时行为。
- `style`：仅修改格式、样式或排版，不改变行为。
- `refactor`：重构代码，但不引入新功能，也不修复行为缺陷。
- `perf`：优化性能。
- `test`：新增或修改测试。
- `workflow`：修改仓库自动化流程或 workflow 定义。
- `build`：修改构建流程、打包逻辑、构建工具或依赖构建步骤。
- `ci`：修改持续集成配置。
- `chore`：无法归入更具体类型的维护性变更。
- `types`：仅修改类型定义，例如 TypeScript 类型声明或类型收紧。
- `wip`：仅在用户明确要求保留“进行中”状态时使用。
- `release`：用于发布、版本切换或生成发布产物。

优先选择更具体的 type，而不是直接使用 `chore`。
如果 diff 仅包含类型相关修改，优先使用 `types`，而不是 `refactor` 或 `chore`。
如果本次变更的核心价值是改善开发体验，优先使用 `dx`，而不是 `chore`。

## Subject 编写规则

- 使用 `type(scope): subject` 或 `type(scope)!: subject` 结构。
- 保持 subject 可执行、具体、易懂。
- 避免 `update files`、`fix stuff` 这类空泛表述。
- 不要在结尾添加标点。
- 不要把多个彼此无关的改动强行塞进一个 header。
- 如果本次变更混合了多个独立意图，应先建议拆分 commit，再生成消息。
- 仅当变更引入 breaking API、breaking behavior 或 breaking contract 时才使用 `!`。

## 输出方式

当用户要求生成 commit message 时，先返回你认为最合适的最终版本。
如果由于 diff 涉及多个意图而导致判断不够稳定，按以下顺序输出：

1. 一个推荐的 commit message。
2. 一句简短说明，指出歧义点。
3. 仅在 `type` 或 `scope` 存在明显不同解法时，再提供最多两个备选版本。

如果输出的是多行提交信息，用 fenced code block 包裹。
如果用户要求“只给 message”，则只返回提交信息本身，不附带额外解释。

## 参考资料

当需要查看 header 规则依据、Angular 风格写法，或了解 Conventional Commits 与当前仓库本地校验器之间的差异时，读取 [references/commit-rules.md](references/commit-rules.md)。
