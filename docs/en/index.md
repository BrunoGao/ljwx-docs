---
layout: home

hero:
  name: "LJWX Docs"
  text: "Knowledge Asset System"
  tagline: Automated Documentation Publishing and Knowledge Base Synchronization Solution
  image:
    src: /logo.svg
    alt: LJWX Docs
  actions:
    - theme: brand
      text: Quick Start
      link: /en/QUICK-REFERENCE
    - theme: alt
      text: Architecture
      link: /en/knowledge-asset-automation-design
    - theme: alt
      text: GitHub
      link: https://github.com/ljwx

features:
  - icon: 📚
    title: Knowledge Asset Management
    details: Transform project documentation into reusable knowledge assets through metadata-driven approach, supporting multi-dimensional organization by level, topic, and project
    link: /en/knowledge-asset-automation-design
    linkText: Learn Architecture

  - icon: 🔄
    title: Automated Publishing
    details: Integrated with CI/CD pipeline, automatically publish documentation to knowledge base upon code commit, ensuring documentation stays in sync with code
    link: /en/knowledge-asset-usage-guide
    linkText: Usage Guide

  - icon: 🤖
    title: Dify Knowledge Sync
    details: Automatically synchronize documents to Dify knowledge base system with incremental updates and version tracking for AI conversation systems
    link: /en/dify-knowledge-sync-guide
    linkText: Sync Guide

  - icon: 🔍
    title: Powerful Search
    details: Built-in local search functionality with full-text retrieval for quick content location
    linkText: Try Search

  - icon: 🌓
    title: Dark Mode
    details: Support for light/dark theme switching, providing comfortable reading experience with automatic system theme adaptation
    linkText: Switch Theme

  - icon: 💬
    title: Comment System
    details: Integrated Giscus comment system based on GitHub Discussions for document discussion and feedback
    linkText: Join Discussion

  - icon: 🌐
    title: Multi-language Support
    details: Support for Chinese and English bilingual documentation, expandable to more languages
    linkText: Switch Language

  - icon: 📊
    title: Metadata Management
    details: Comprehensive document metadata system including asset levels, visibility, topic tags, etc., supporting fine-grained management
    link: /en/QUICK-REFERENCE
    linkText: Quick Reference

  - icon: 🚀
    title: Version Tracking
    details: Each document linked to Git commit hash, traceable changes, supporting rollback to any historical version
    linkText: Version Control
---

## Quick Overview

The Knowledge Asset System is a complete document management and knowledge base synchronization solution, consisting of three core components:

### 📝 Document Publishing Workflow

```mermaid
graph LR
    A[Source Docs] --> B[Add Metadata]
    B --> C[CI/CD Publish]
    C --> D[ljwx-dify/knowledge]
    D --> E[Index Update]
```

Automated publishing workflow from source project documentation to knowledge base, supporting selective publishing, version tracking, and multi-project management.

### 🔄 Knowledge Base Sync

```mermaid
graph LR
    A[knowledge/] --> B[sync-knowledge.py]
    B --> C[Dify API]
    C --> D[Knowledge Dataset]
    D --> E[AI Chat System]
```

Automatically synchronize documents to Dify knowledge base, providing knowledge support for AI conversation systems with incremental updates and multi-level management.

### 📊 Metadata System

Document metadata includes:
- **Asset Levels**: L0-L4, from temporary documents to public content
- **Visibility**: internal/public/mixed
- **Topic Tags**: spec-driven, ai-engineering, etc.
- **Version Info**: commit hash, update time, etc.

## Core Features

- ✅ **Automation First** - Git push triggers automatic publishing without manual intervention
- ✅ **Version Traceable** - Each publication records Git commit hash
- ✅ **Metadata Driven** - Control publishing strategy through YAML frontmatter
- ✅ **Multi-project Support** - Unified management of documentation from multiple projects
- ✅ **Incremental Sync** - Intelligent detection of document changes to avoid redundant operations
- ✅ **Multi-level Organization** - Organized by asset level, topic, project, and other dimensions

## Getting Started

### 1. Install Dependencies

```bash
# Clone repository
git clone https://github.com/ljwx/ljwx-docs.git
cd ljwx-docs

# Install dependencies
npm install
```

### 2. Local Development

```bash
# Start development server
npm run docs:dev

# Visit http://localhost:5173
```

### 3. Build and Deploy

```bash
# Build for production
npm run docs:build

# Preview build
npm run docs:preview

# Deploy with Node.js service
npm run docs:serve
```

## Documentation Resources

- [Quick Reference](/en/QUICK-REFERENCE) - Common commands and configuration quick reference
- [Architecture Design](/en/knowledge-asset-automation-design) - System architecture and design principles
- [Usage Guide](/en/knowledge-asset-usage-guide) - Detailed usage documentation
- [Dify Sync Guide](/en/dify-knowledge-sync-guide) - Knowledge base synchronization configuration

## Support and Feedback

- **Technical Support**: brunogao
- **Issue Reporting**: [GitHub Issues](https://github.com/ljwx/ljwx-docs/issues)
- **Documentation Contribution**: Pull Requests are welcome
