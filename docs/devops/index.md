---
title: DevOps 实践
description: DevOps 工具链、GitOps、CI/CD 和基础设施最佳实践
---

# DevOps 实践

探索现代 DevOps 实践，包括 GitOps 工作流、CI/CD 流水线、容器化和基础设施即代码。

## 📚 系列文章

### GitOps 实践系列

打造完整的私有 GitOps 工作流，实现高效的持续部署。

- [Gitea 私有化部署完整指南](./gitops/gitea-setup)
- [Harbor 镜像仓库搭建与配置](./gitops/harbor-registry)
- [Argo CD 实现 GitOps 持续部署](./gitops/argocd-deployment)
- [打造完整的私有 GitOps 工作流](./gitops/gitops-workflow)

### CI/CD 系列

持续集成和持续部署的最佳实践。

- GitHub Actions 实战指南
- Jenkins Pipeline 配置
- GitLab CI/CD 实践

### 基础设施系列

容器化和编排平台的生产环境实践。

- Kubernetes 生产环境最佳实践
- Docker 镜像优化技巧
- Helm Chart 开发指南

## 🎯 快速导航

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0;">
  <div style="padding: 20px; border: 1px solid var(--vp-c-divider); border-radius: 12px;">
    <h3>🔄 GitOps</h3>
    <p>基于 Git 的声明式基础设施和应用部署</p>
    <a href="./gitops/">查看文章 →</a>
  </div>

  <div style="padding: 20px; border: 1px solid var(--vp-c-divider); border-radius: 12px;">
    <h3>⚙️ CI/CD</h3>
    <p>自动化构建、测试和部署流水线</p>
    <a href="./ci-cd/">查看文章 →</a>
  </div>

  <div style="padding: 20px; border: 1px solid var(--vp-c-divider); border-radius: 12px;">
    <h3>🏗️ 基础设施</h3>
    <p>容器化、编排和基础设施即代码</p>
    <a href="./infrastructure/">查看文章 →</a>
  </div>
</div>

## 🛠️ 核心工具

- **Gitea** - 轻量级 Git 服务
- **Harbor** - 企业级镜像仓库
- **Argo CD** - GitOps 持续部署
- **Kubernetes** - 容器编排平台
- **Docker** - 容器化技术
- **Helm** - Kubernetes 包管理器

## 💡 最佳实践

::: tip 基础设施即代码
使用 Git 管理所有基础设施配置，实现版本控制和可追溯性。
:::

::: tip 自动化优先
尽可能自动化所有重复性任务，减少人为错误。
:::

::: tip 安全第一
在 CI/CD 流程中集成安全扫描，及早发现漏洞。
:::

## 📖 相关资源

- [Kubernetes 官方文档](https://kubernetes.io/docs/)
- [Argo CD 文档](https://argo-cd.readthedocs.io/)
- [CNCF 云原生全景图](https://landscape.cncf.io/)
