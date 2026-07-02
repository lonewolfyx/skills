# Report Template

Return a Chinese report by default. Keep it factual and data-backed.

## Required Structure

```md
**屎山判定**

- 结论：是屎山 / 疑似屎山 / 暂未判定为屎山
- 屎山指数：<0-100>
- 风险等级：Critical / High / Medium / Low
- 判定依据：<1-3 条最关键原因>

**数据概览**

| 指标 | 数值 | 说明 |
|---|---:|---|
| 扫描文件数 | <n> | 排除构建产物、依赖、生成文件 |
| 源码行数 | <n> | 非空行或脚本口径 |
| 巨型文件 | <n> | 超过阈值的文件 |
| 长函数候选 | <n> | 默认 50 行以上 |
| 深层嵌套候选 | <n> | 默认 3 层以上 |
| 重复代码块候选 | <n> | 需人工确认语义 |
| TODO/FIXME/HACK | <n> | 技术债信号 |
| 魔法值候选 | <n> | 需确认是否业务规则 |
| 薄封装候选 | <n> | 需确认是否无边界价值 |
| TypeScript 逃逸 | <n> | any / ts-ignore / broad cast |

**命中屎山边界**

| 边界 | 严重级别 | 证据 | 为什么算屎山 |
|---|---|---|---|
| Bx <name> | P0/P1 | <file:line> | <维护风险> |

如果没有确认命中，写：暂未发现可确认的硬边界命中。

**分类评分**

| 分类 | 分数(0-20) | 主要问题 |
|---|---:|---|
| 可读性 | <n> | <summary> |
| 可维护性 | <n> | <summary> |
| 结构/模式 | <n> | <summary> |
| 代码异味 | <n> | <summary> |
| 成熟度 | <n> | <summary> |

**高风险文件 Top N**

| 文件 | 风险信号 | 建议优先级 |
|---|---|---|
| <file> | <long function, nesting, duplication, etc.> | P0/P1/P2 |

**关键发现**

1. [P0/P1/P2] <标题>
   - 证据：<file:line>
   - 问题：<what>
   - 影响：<why it matters>
   - 方向：<fix direction, not a full patch unless requested>

**候选信号但未确认**

- <signal>: <why it needs domain confirmation>

**修复优先级**

1. P0：<stop-the-bleeding action>
2. P1：<boundary convergence or complexity split>
3. P2：<local cleanup or type hardening>

**审计范围与不确定性**

- 已扫描：<paths / file types>
- 已排除：<generated/build/vendor paths>
- 未确认：<what was not inspected deeply>
```

## Writing Rules

- Use absolute file links when the environment supports them.
- Put confirmed findings before general commentary.
- Never output only a score. The report must include evidence.
- Keep remediation directions boundary-oriented: converge true shared rules, delete thin wrappers, move business rules to the right owner, reduce public entry points, or split responsibilities.
- Do not recommend new abstractions for local one-line logic.
