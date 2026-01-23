# LJWX Docs 文档站点结构规划

## 📋 项目概述

**目标**：在未来一个月内发布 40-60 篇专业技术实践文档
**用途**：公司项目宣传、技术分享、最佳实践展示

## 🗂️ 目录结构设计

### 方案一：按技术领域分类（推荐）

```
docs/
├── index.md                          # 首页
├── QUICK-REFERENCE.md                # 快速参考
├── visual-test.md                    # 视觉测试
│
├── devops/                           # DevOps 实践
│   ├── index.md                      # DevOps 分类首页
│   ├── gitops/                       # GitOps 系列
│   │   ├── index.md                  # GitOps 系列索引
│   │   ├── gitea-setup.md            # Gitea 私有化部署
│   │   ├── harbor-registry.md        # Harbor 镜像仓库
│   │   ├── argocd-deployment.md      # Argo CD 持续部署
│   │   └── gitops-workflow.md        # GitOps 完整工作流
│   ├── ci-cd/                        # CI/CD 系列
│   │   ├── index.md
│   │   ├── github-actions.md
│   │   └── jenkins-pipeline.md
│   └── infrastructure/               # 基础设施
│       ├── kubernetes-best-practices.md
│       └── docker-optimization.md
│
├── data-analytics/                   # 数据分析
│   ├── index.md                      # 数据分析分类首页
│   ├── n8n/                          # n8n 系列
│   │   ├── index.md                  # n8n 系列索引
│   │   ├── n8n-introduction.md       # n8n 介绍
│   │   ├── n8n-data-pipeline.md      # n8n 数据管道
│   │   ├── n8n-automation.md         # n8n 自动化实践
│   │   └── n8n-integration.md        # n8n 集成案例
│   ├── visualization/                # 数据可视化
│   │   ├── grafana-dashboard.md
│   │   └── superset-analytics.md
│   └── etl/                          # ETL 工具
│       └── airflow-workflow.md
│
├── ai-ml/                            # AI 与机器学习
│   ├── index.md                      # AI/ML 分类首页
│   ├── llm/                          # 大语言模型
│   │   ├── index.md                  # LLM 系列索引
│   │   ├── qwen-deployment.md        # 千问模型部署
│   │   ├── qwen-health-report.md     # 千问解读健康报告
│   │   ├── llm-optimization.md       # 模型优化
│   │   └── prompt-engineering.md     # 提示词工程
│   ├── model-serving/                # 模型服务
│   │   └── ollama-deployment.md
│   └── applications/                 # AI 应用
│       ├── chatbot-development.md
│       └── rag-implementation.md
│
├── observability/                    # 可观测性
│   ├── index.md                      # 可观测性分类首页
│   ├── logging/                      # 日志管理
│   │   ├── index.md                  # 日志系列索引
│   │   ├── loki-setup.md             # Loki 日志系统
│   │   ├── elasticsearch-logging.md  # ELK 日志方案
│   │   └── log-best-practices.md     # 日志最佳实践
│   ├── tracing/                      # 链路追踪
│   │   ├── jaeger-tracing.md         # Jaeger 链路追踪
│   │   ├── tempo-setup.md            # Tempo 配置
│   │   └── distributed-tracing.md    # 分布式追踪
│   └── metrics/                      # 指标监控
│       ├── prometheus-monitoring.md  # Prometheus 监控
│       ├── grafana-dashboard.md      # Grafana 仪表板
│       └── alerting-rules.md         # 告警规则
│
├── project-management/               # 项目管理
│   ├── index.md                      # 项目管理分类首页
│   ├── plane/                        # Plane 系列
│   │   ├── index.md                  # Plane 系列索引
│   │   ├── plane-deployment.md       # Plane 私有化部署
│   │   ├── plane-workflow.md         # Plane 工作流配置
│   │   ├── plane-best-practices.md   # Plane 最佳实践
│   │   └── plane-integration.md      # Plane 集成方案
│   ├── agile/                        # 敏捷开发
│   │   └── scrum-practices.md
│   └── collaboration/                # 协作工具
│       └── notion-workspace.md
│
├── architecture/                     # 架构设计
│   ├── index.md                      # 架构分类首页
│   ├── microservices/                # 微服务架构
│   │   ├── service-mesh.md
│   │   └── api-gateway.md
│   ├── cloud-native/                 # 云原生
│   │   └── kubernetes-patterns.md
│   └── system-design/                # 系统设计
│       └── high-availability.md
│
├── security/                         # 安全实践
│   ├── index.md                      # 安全分类首页
│   ├── authentication/               # 认证授权
│   │   └── oauth2-implementation.md
│   └── compliance/                   # 合规性
│       └── data-privacy.md
│
├── case-studies/                     # 案例研究
│   ├── index.md                      # 案例研究首页
│   ├── e-commerce-platform.md        # 电商平台案例
│   ├── healthcare-system.md          # 医疗系统案例
│   └── fintech-solution.md           # 金融科技案例
│
└── resources/                        # 资源中心
    ├── index.md                      # 资源中心首页
    ├── tools.md                      # 工具推荐
    ├── books.md                      # 书籍推荐
    └── glossary.md                   # 术语表
```

### 方案二：按应用场景分类

```
docs/
├── solutions/                        # 解决方案
│   ├── private-cloud/                # 私有云方案
│   ├── data-platform/                # 数据平台方案
│   └── ai-platform/                  # AI 平台方案
│
├── practices/                        # 实践指南
│   ├── development/                  # 开发实践
│   ├── operations/                   # 运维实践
│   └── management/                   # 管理实践
│
└── tutorials/                        # 教程系列
    ├── beginner/                     # 入门教程
    ├── intermediate/                 # 进阶教程
    └── advanced/                     # 高级教程
```

## 📝 文档元数据规范

每篇文档应包含以下 frontmatter：

```yaml
---
title: 文档标题
description: 文档描述（用于 SEO）
date: 2026-01-23
author: 作者名称
category: devops | data-analytics | ai-ml | observability | project-management
tags:
  - gitops
  - kubernetes
  - argocd
series: GitOps 实践系列
seriesOrder: 1
difficulty: beginner | intermediate | advanced
readingTime: 15 min
featured: true
cover: /images/covers/gitops.jpg
---
```

## 🎯 内容规划示例

### 第一周（10-12 篇）

**DevOps 系列**
1. ✅ Gitea 私有化部署完整指南
2. ✅ Harbor 镜像仓库搭建与配置
3. ✅ Argo CD 实现 GitOps 持续部署
4. ✅ 打造完整的私有 GitOps 工作流

**数据分析系列**
5. ✅ n8n 介绍：低代码自动化平台
6. ✅ n8n 在数据分析中的应用
7. ✅ n8n 构建数据采集管道

**项目管理系列**
8. ✅ Plane 私有化部署指南
9. ✅ Plane 在中小型项目中的最佳实践
10. ✅ Plane 与 GitOps 的集成

### 第二周（10-12 篇）

**AI/ML 系列**
11. ✅ 千问大模型私有化部署
12. ✅ 千问解读健康测试报告实战
13. ✅ LLM 提示词工程最佳实践
14. ✅ RAG 系统构建指南

**可观测性系列**
15. ✅ Prometheus + Grafana 监控体系
16. ✅ Loki 日志聚合系统搭建
17. ✅ Jaeger 分布式链路追踪
18. ✅ 优雅管理链路、日志和 Metrics

### 第三周（10-12 篇）

**架构设计系列**
19. ✅ 微服务架构设计模式
20. ✅ Kubernetes 生产环境最佳实践
21. ✅ 服务网格 Istio 实践
22. ✅ API 网关设计与实现

**安全实践系列**
23. ✅ OAuth2 认证授权实现
24. ✅ Kubernetes 安全加固
25. ✅ 数据加密与隐私保护

### 第四周（10-12 篇）

**案例研究系列**
26. ✅ 电商平台技术架构演进
27. ✅ 医疗系统私有化部署案例
28. ✅ 金融科技 DevOps 实践

**工具链系列**
29. ✅ MinIO 对象存储实践
30. ✅ PostgreSQL 高可用方案
31. ✅ Redis 缓存架构设计

## 🎨 导航结构配置

### 主导航

```typescript
nav: [
  { text: '首页', link: '/' },
  { text: '快速开始', link: '/QUICK-REFERENCE' },
  {
    text: 'DevOps',
    items: [
      { text: 'GitOps 实践', link: '/devops/gitops/' },
      { text: 'CI/CD', link: '/devops/ci-cd/' },
      { text: '基础设施', link: '/devops/infrastructure/' }
    ]
  },
  {
    text: '数据分析',
    items: [
      { text: 'n8n 自动化', link: '/data-analytics/n8n/' },
      { text: '数据可视化', link: '/data-analytics/visualization/' },
      { text: 'ETL 工具', link: '/data-analytics/etl/' }
    ]
  },
  {
    text: 'AI/ML',
    items: [
      { text: '大语言模型', link: '/ai-ml/llm/' },
      { text: '模型服务', link: '/ai-ml/model-serving/' },
      { text: 'AI 应用', link: '/ai-ml/applications/' }
    ]
  },
  {
    text: '可观测性',
    items: [
      { text: '日志管理', link: '/observability/logging/' },
      { text: '链路追踪', link: '/observability/tracing/' },
      { text: '指标监控', link: '/observability/metrics/' }
    ]
  },
  {
    text: '项目管理',
    items: [
      { text: 'Plane 实践', link: '/project-management/plane/' },
      { text: '敏捷开发', link: '/project-management/agile/' }
    ]
  },
  {
    text: '更多',
    items: [
      { text: '架构设计', link: '/architecture/' },
      { text: '安全实践', link: '/security/' },
      { text: '案例研究', link: '/case-studies/' },
      { text: '资源中心', link: '/resources/' }
    ]
  }
]
```

## 🏷️ 标签系统

建议使用的标签：

**技术栈标签**
- `kubernetes`, `docker`, `gitops`, `argocd`, `gitea`, `harbor`
- `n8n`, `grafana`, `prometheus`, `loki`, `jaeger`
- `plane`, `jira`, `notion`
- `llm`, `qwen`, `ollama`, `rag`
- `postgresql`, `redis`, `minio`, `elasticsearch`

**场景标签**
- `private-deployment`, `cloud-native`, `microservices`
- `data-pipeline`, `automation`, `monitoring`
- `ci-cd`, `devops`, `gitops`
- `project-management`, `agile`

**难度标签**
- `beginner`, `intermediate`, `advanced`

## 📊 首页设计建议

### Hero 区域
- 突出公司技术实力
- 展示文档数量和更新频率
- 快速导航到热门分类

### 特色文章
- 最新发布的 6 篇文章
- 精选推荐文章
- 系列文章展示

### 分类导航
- 6 大主要分类卡片
- 每个分类显示文章数量
- 快速跳转

### 统计数据
- 总文章数
- 覆盖技术栈数量
- 代码示例数量
- 实战案例数量

## 🔍 搜索优化

### 搜索配置
```typescript
search: {
  provider: 'local',
  options: {
    miniSearch: {
      searchOptions: {
        fuzzy: 0.2,
        prefix: true,
        boost: {
          title: 4,
          text: 2,
          titles: 1
        }
      }
    }
  }
}
```

## 📈 SEO 优化

### 站点地图
- 自动生成 sitemap.xml
- 提交到搜索引擎

### Meta 标签
- 每篇文章独立的 title 和 description
- Open Graph 标签支持社交分享
- 结构化数据（JSON-LD）

## 🎯 实施步骤

### 第一阶段：基础结构（1-2 天）
1. ✅ 创建目录结构
2. ✅ 配置导航和侧边栏
3. ✅ 创建分类索引页面
4. ✅ 设置文档模板

### 第二阶段：内容迁移（1 天）
1. ✅ 迁移现有文档到新结构
2. ✅ 添加元数据
3. ✅ 更新内部链接

### 第三阶段：功能增强（2-3 天）
1. ✅ 添加标签页面
2. ✅ 实现系列文章导航
3. ✅ 添加阅读时间估算
4. ✅ 实现相关文章推荐

### 第四阶段：内容创作（持续）
1. ✅ 按计划创作文档
2. ✅ 定期审核和更新
3. ✅ 收集用户反馈

## 📝 文档模板

### 技术实践文档模板
```markdown
---
title: 文档标题
description: 简短描述
date: 2026-01-23
author: 作者名
category: devops
tags: [gitops, kubernetes]
series: GitOps 实践系列
seriesOrder: 1
difficulty: intermediate
readingTime: 15 min
---

# 文档标题

## 📋 概述

简要介绍本文内容和目标。

## 🎯 适用场景

- 场景 1
- 场景 2

## 🔧 前置要求

- 要求 1
- 要求 2

## 📖 正文内容

### 步骤 1：准备工作

### 步骤 2：配置

### 步骤 3：部署

## 💡 最佳实践

## ⚠️ 常见问题

## 🔗 相关资源

## 📝 总结
```

## 🎨 视觉元素

### 封面图片
- 尺寸：1200x630px
- 存储：`docs/public/images/covers/`
- 命名：`category-topic.jpg`

### 图表和截图
- 存储：`docs/public/images/articles/`
- 或使用 MinIO：`http://192.168.1.83:32001/ljwx-docs/images/`

### 视频
- 存储：MinIO `http://192.168.1.83:32001/ljwx-docs/videos/`

## 📊 内容管理

### Git 工作流
```bash
# 创建新文档分支
git checkout -b docs/gitops-argocd

# 编写文档
# ...

# 提交
git add .
git commit -m "docs: 添加 Argo CD 部署指南"

# 推送并创建 PR
git push origin docs/gitops-argocd
```

### 文档审核清单
- [ ] 标题清晰准确
- [ ] 元数据完整
- [ ] 代码示例可运行
- [ ] 图片清晰
- [ ] 链接有效
- [ ] 语法正确
- [ ] SEO 优化

## 🚀 下一步行动

1. **立即执行**：创建目录结构
2. **本周完成**：配置导航和首页
3. **持续进行**：按计划创作内容
4. **定期审核**：每周回顾和优化

---

**文档版本**：v1.0
**创建日期**：2026-01-23
**维护者**：brunogao
