---
name: unjs-development
description: 基于开发场景、运行时边界和工程约束选择与组合 UnJS 生态包。适用于 CLI、配置系统、HTTP 服务、通用服务端 runtime、库构建、插件基础设施、跨 runtime SDK、存储层和文档媒体链路的选型与最佳实践。
---

# UnJS Development

这个 Skill 的英文主文档位于 [SKILL.md](./SKILL.md)。

## 用途

当你需要从工程实现角度选择 UnJS 包，而不是只解释某个包的概念时，使用这个 Skill。

## 使用方式

1. 先判断交付物类型。
   - CLI / scaffolding
   - 配置系统
   - 轻量 HTTP API
   - 通用 server runtime
   - 库构建
   - Bundler 插件 / auto-import / codemod
   - 跨 runtime SDK
   - 存储 / 缓存 / 数据层
   - 文档 / 内容 / 媒体 / 前端基础设施

2. 再判断运行时矩阵。
   - Node.js only
   - Node.js + browser
   - Node.js + Workers / edge
   - Bun / Deno compatibility
   - runtime-agnostic

3. 优先读取英文场景文档。
   - 场景剧本：[references/01-scenario-playbooks.md](references/01-scenario-playbooks.md)
   - 场景索引：[references/04-scenario-index.md](references/04-scenario-index.md)
   - 包级约束索引：[references/03-package-reference-index.md](references/03-package-reference-index.md)

## 输出要求

回答时不要只给“概念介绍”，而要覆盖：

1. 当前场景
2. 推荐包组合
3. 架构原因
4. 实施步骤
5. 风险与误用边界
6. 验证清单

## 说明

- 主 `SKILL.md` 与 `references/*.md` 已统一采用英文技术文档风格，便于在实际技能调用时直接作为英文工程知识库使用。
- 本文件仅作为中文入口说明，不替代英文主文档。
