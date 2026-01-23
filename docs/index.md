---
layout: home

hero:
  name: "LJWX Docs"
  text: "知识资产化系统"
  tagline: 自动化文档发布与知识库同步解决方案
  image:
    src: /logo.svg
    alt: LJWX Docs
  actions:
    - theme: brand
      text: 快速开始
      link: /QUICK-REFERENCE
    - theme: alt
      text: 架构设计
      link: /knowledge-asset-automation-design
    - theme: alt
      text: GitHub
      link: https://github.com/ljwx

features:
  - icon: 📚
    title: 知识资产化
    details: 通过元数据驱动的方式，将项目文档转化为可复用的知识资产，支持按层级、主题、项目等多维度组织
    link: /knowledge-asset-automation-design
    linkText: 了解架构

  - icon: 🔄
    title: 自动化发布
    details: 集成 CI/CD 流程，代码提交即自动发布文档到知识库，无需人工干预，确保文档与代码同步
    link: /knowledge-asset-usage-guide
    linkText: 使用指南

  - icon: 🤖
    title: Dify 知识库同步
    details: 自动同步文档到 Dify 知识库系统，支持增量更新和版本追踪，为 AI 对话系统提供知识支撑
    link: /dify-knowledge-sync-guide
    linkText: 同步指南

  - icon: 🔍
    title: 强大的搜索
    details: 内置本地搜索功能，支持全文检索，快速定位所需文档内容
    linkText: 体验搜索

  - icon: 🌓
    title: 深色模式
    details: 支持明亮/深色主题切换，提供舒适的阅读体验，自动适配系统主题
    linkText: 切换主题

  - icon: 💬
    title: 评论系统
    details: 集成 Giscus 评论系统，基于 GitHub Discussions，支持文档交流与反馈
    linkText: 参与讨论

  - icon: 🌐
    title: 多语言支持
    details: 支持中英文双语文档，可根据需要扩展更多语言
    linkText: 语言切换

  - icon: 📊
    title: 元数据管理
    details: 完善的文档元数据系统，包括资产层级、可见性、主题标签等，支持精细化管理
    link: /QUICK-REFERENCE
    linkText: 快速参考

  - icon: 🚀
    title: 版本追踪
    details: 每个文档关联 Git commit hash，变更可追溯，支持回滚到任意历史版本
    linkText: 版本管理
---

## 快速了解

知识资产化系统是一个完整的文档管理和知识库同步解决方案，包含三个核心部分：

### 📝 文档发布流程

```mermaid
graph LR
    A[源项目文档] --> B[添加元数据]
    B --> C[CI/CD 发布]
    C --> D[ljwx-dify/knowledge]
    D --> E[索引更新]
```

从源项目文档到知识库的自动化发布流程，支持选择性发布、版本追踪和多项目管理。

### 🔄 知识库同步

```mermaid
graph LR
    A[knowledge/] --> B[sync-knowledge.py]
    B --> C[Dify API]
    C --> D[知识库 Dataset]
    D --> E[AI 对话系统]
```

自动将文档同步到 Dify 知识库，为 AI 对话系统提供知识支撑，支持增量更新和多层级管理。

### 📊 元数据系统

文档元数据包括：
- **资产层级**：L0-L4，从临时文档到对外内容
- **可见性**：internal/public/mixed
- **主题标签**：spec-driven、ai-engineering 等
- **版本信息**：commit hash、更新时间等

## 核心特性

- ✅ **自动化优先** - Git push 触发自动发布，无需人工干预
- ✅ **版本可追溯** - 每次发布记录 Git commit hash
- ✅ **元数据驱动** - 通过 YAML frontmatter 控制发布策略
- ✅ **多项目支持** - 统一管理多个项目的文档
- ✅ **增量同步** - 智能检测文档变更，避免重复操作
- ✅ **多层级组织** - 按资产层级、主题、项目等多维度组织

## 开始使用

### 1. 安装依赖

```bash
# 克隆仓库
git clone https://github.com/ljwx/ljwx-docs.git
cd ljwx-docs

# 安装依赖
npm install
```

### 2. 本地开发

```bash
# 启动开发服务器
npm run docs:dev

# 访问 http://localhost:5173
```

### 3. 构建部署

```bash
# 构建生产版本
npm run docs:build

# 预览构建结果
npm run docs:preview

# 使用 Node.js 服务部署
npm run docs:serve
```

## 文档资源

- [快速参考](/QUICK-REFERENCE) - 常用命令和配置速查
- [架构设计](/knowledge-asset-automation-design) - 系统架构和设计原则
- [使用指南](/knowledge-asset-usage-guide) - 详细的使用文档
- [Dify 同步指南](/dify-knowledge-sync-guide) - 知识库同步配置

## 支持与反馈

- **技术支持**：brunogao
- **问题反馈**：[GitHub Issues](https://github.com/ljwx/ljwx-docs/issues)
- **文档贡献**：欢迎提交 Pull Request
