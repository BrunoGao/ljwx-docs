# 知识资产自动化发布方案

## 架构概览

```
ljwx-qwen (源项目)
├── docs/                    # 项目文档
│   ├── 01-getting-started/
│   ├── 02-architecture/
│   ├── ...
│   └── 06-development/      # 高价值方法论
├── .gitea/workflows/
│   └── cicd.yml             # 添加文档发布步骤
└── scripts/
    └── publish-docs.py      # 文档发布脚本
                ↓
                ↓ (自动发布)
                ↓
ljwx-dify (知识库)
└── knowledge/               # 知识资产仓库
    ├── sources/             # 原始文档（按项目组织）
    │   └── ljwx-qwen/
    │       ├── docs/        # 镜像的文档
    │       └── .metadata/   # 版本追踪
    ├── assets/              # 资产化文档（按层级组织）
    │   ├── L1-specs/
    │   ├── L2-methodologies/
    │   ├── L3-solutions/
    │   └── L4-public/
    └── index/               # 索引和元数据
        ├── by-project.json
        ├── by-topic.json
        ├── by-level.json
        └── manifest.json    # 全局清单
```

## 核心设计原则

### 1. 版本化为真实依据
- 每次发布记录 Git commit hash
- 文档变更可追溯到具体提交
- 支持回滚到任意历史版本

### 2. 元数据驱动
- 每个文档必须有 YAML frontmatter
- 元数据决定文档的发布策略
- 支持选择性发布（只发布标记的文档）

### 3. 自动化优先
- Git push 触发自动发布
- 无需人工干预
- 失败自动回滚

## 文档元数据 Schema

### Frontmatter 格式

```yaml
---
# 资产化元数据
asset:
  level: L2                          # L0/L1/L2/L3/L4
  visibility: public                 # internal/public/mixed
  publish: true                      # 是否发布到知识库
  topics: [spec-driven, openapi]     # 主题标签

# 版本信息（自动生成）
version:
  source_project: ljwx-qwen
  source_path: docs/06-development/openspec-workflow.md
  commit_hash: abc123def
  commit_date: 2025-01-07T10:00:00Z
  published_at: 2025-01-07T10:05:00Z

# 内容元数据
content:
  title: OpenSpec 工作流程
  author: brunogao
  reviewer:
  status: reviewed                   # draft/reviewed/public/deprecated
  created: 2025-01-06
  updated: 2025-01-07

# 对外发布配置（可选）
export:
  can_publish_external: true         # 是否可对外发布
  requires_desensitization: false    # 是否需要脱敏
  target_formats: [blog, whitepaper] # 目标格式
---

# 原有文档内容...
```

## 自动发布流程

### 阶段1：文档扫描与验证
```bash
1. 扫描 docs/ 目录下所有 .md 文件
2. 解析 frontmatter 元数据
3. 验证元数据完整性
4. 筛选 publish: true 的文档
```

### 阶段2：版本信息注入
```bash
1. 获取当前 Git commit hash
2. 获取文件最后修改时间
3. 更新 version 字段
4. 生成唯一文档 ID
```

### 阶段3：发布到 ljwx-dify/knowledge
```bash
1. Clone/Pull ljwx-dify 仓库
2. 复制文档到 knowledge/sources/{project}/
3. 根据 asset.level 分类到 knowledge/assets/
4. 更新索引文件
5. Commit & Push
```

### 阶段4：索引更新
```bash
1. 更新 manifest.json（全局清单）
2. 更新 by-project.json（按项目索引）
3. 更新 by-topic.json（按主题索引）
4. 更新 by-level.json（按层级索引）
```

## CI/CD 集成

### ljwx-qwen/.gitea/workflows/cicd.yml

在现有流程中添加新的 job：

```yaml
publish-docs:
  needs: test
  runs-on: ubuntu-latest
  if: github.event_name == 'push' && (github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop')

  steps:
  - uses: actions/checkout@v3
    with:
      fetch-depth: 0  # 获取完整历史

  - name: Set up Python
    uses: actions/setup-python@v4
    with:
      python-version: 3.11

  - name: Install dependencies
    run: |
      pip install pyyaml gitpython

  - name: Clone ljwx-dify repository
    run: |
      git clone http://192.168.1.83:33000/gao/ljwx-dify.git /tmp/ljwx-dify

  - name: Publish docs to knowledge base
    run: |
      python scripts/publish-docs.py \
        --source-repo . \
        --target-repo /tmp/ljwx-dify \
        --project-name ljwx-qwen \
        --commit-hash ${{ github.sha }}

  - name: Push to ljwx-dify
    run: |
      cd /tmp/ljwx-dify
      git config user.name "CI Bot"
      git config user.email "ci@ljwx.local"
      git add knowledge/
      git commit -m "docs: update knowledge from ljwx-qwen@${{ github.sha }}"
      git push
```

## 脚本实现

### scripts/publish-docs.py

核心功能：
1. 扫描并解析文档
2. 验证元数据
3. 注入版本信息
4. 复制到目标仓库
5. 更新索引

### scripts/add-frontmatter.py

辅助工具：
- 批量为现有文档添加 frontmatter
- 交互式配置元数据
- 验证元数据格式

## 索引结构

### manifest.json
```json
{
  "version": "1.0",
  "last_updated": "2025-01-07T10:05:00Z",
  "total_documents": 42,
  "projects": ["ljwx-qwen", "ljwx-chat"],
  "documents": [
    {
      "id": "ljwx-qwen-openspec-workflow-abc123",
      "title": "OpenSpec 工作流程",
      "source_project": "ljwx-qwen",
      "source_path": "docs/06-development/openspec-workflow.md",
      "asset_level": "L2",
      "visibility": "public",
      "topics": ["spec-driven", "openapi"],
      "commit_hash": "abc123def",
      "published_at": "2025-01-07T10:05:00Z"
    }
  ]
}
```

### by-project.json
```json
{
  "ljwx-qwen": {
    "total": 15,
    "by_level": {
      "L1": 8,
      "L2": 5,
      "L3": 2
    },
    "documents": ["ljwx-qwen-openspec-workflow-abc123", ...]
  }
}
```

### by-topic.json
```json
{
  "spec-driven": ["ljwx-qwen-openspec-workflow-abc123", ...],
  "openapi": ["ljwx-qwen-openapi-design-def456", ...]
}
```

## 使用场景

### 场景1：开发者提交代码
```bash
# 开发者正常工作
git add docs/06-development/new-feature.md
git commit -m "docs: add new feature spec"
git push origin main

# CI 自动触发
# → 测试通过
# → 构建镜像
# → 发布文档到 ljwx-dify/knowledge
# → 更新索引
```

### 场景2：批量添加元数据
```bash
# 为现有文档添加 frontmatter
python scripts/add-frontmatter.py \
  --dir docs/06-development/ \
  --level L2 \
  --visibility public \
  --publish true
```

### 场景3：查询知识库
```bash
# 在 ljwx-dify 中查询
cat knowledge/index/by-topic.json | jq '.["spec-driven"]'

# 查看某个项目的所有文档
cat knowledge/index/by-project.json | jq '.["ljwx-qwen"]'
```

## 下一步实施计划

1. ✅ 设计架构（本文档）
2. ⏳ 创建 ljwx-dify/knowledge 目录结构
3. ⏳ 实现 publish-docs.py 脚本
4. ⏳ 实现 add-frontmatter.py 脚本
5. ⏳ 为 ljwx-qwen/docs/06-development/ 添加元数据（试点）
6. ⏳ 集成到 CI/CD
7. ⏳ 测试完整流程
8. ⏳ 推广到其他项目

## 风险与缓解

### 风险1：元数据不一致
- **缓解**：CI 阶段验证元数据格式
- **缓解**：提供元数据模板和工具

### 风险2：发布失败导致 CI 阻塞
- **缓解**：文档发布失败不阻塞代码发布
- **缓解**：独立的 job，失败不影响其他步骤

### 风险3：知识库仓库冲突
- **缓解**：使用 Git pull --rebase
- **缓解**：失败时发送通知，人工介入

### 风险4：敏感信息泄露
- **缓解**：40-truth.md 强制 publish: false
- **缓解**：CI 检查敏感文件路径
- **缓解**：人工审核 public 文档
