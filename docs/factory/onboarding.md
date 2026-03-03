---
title: 模板化接入指南
description: 新项目与历史项目快速接入 Bid-MVP Factory 闭环
---

# 模板化接入指南

目标：不用每个项目手工改一遍，通过一个 catalog 批量接入。

闭环目标保持一致：

`queue -> promoter -> deploy -> smoke -> evidence -> pages`

## 适用场景

- 新创建项目：需要快速生成最小清单并纳入闭环。
- 历史项目：已有清单，但缺少 queue/smoke/evidence 映射。

## 核心做法

在 `ljwx-deploy` 仓库维护接入清单：

- `factory/onboarding/services.catalog.yaml`

使用脚本执行：

```bash
bash scripts/factory/onboard_services.sh factory/onboarding/services.catalog.yaml dry-run
bash scripts/factory/onboard_services.sh factory/onboarding/services.catalog.yaml apply
```

脚本会统一更新：

- `release/services*.yaml`
- `scripts/smoke/targets*.json`
- （可选）`apps/<service>` 骨架
- （可选）`argocd-apps/*.yaml`

## 接入后最小验收

1. 入队：`release/queue.yaml` 出现 `pending`
2. 推进：promoter 将其迁移到 `promoted`
3. 部署：Argo 应用同步到新 revision
4. 验证：smoke 写回 `tests.smoke`
5. 发布：Pages feed 出现该服务记录

## 规则约束

- 同一套代码支持本地 `k3s` 与中国大陆 `OrbStack k3s`
- 环境差异仅通过 profile/overlays/values/env 参数化
- 不允许按项目复制粘贴一套新流程
