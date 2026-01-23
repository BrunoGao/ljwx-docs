# 知识资产化系统 - 快速参考

## 系统架构

```
ljwx-qwen (源项目)
    ↓ publish-docs.py
ljwx-dify/knowledge/ (知识仓库)
    ↓ sync-knowledge.py
Dify 知识库 (向量数据库)
    ↓ RAG
ljwx-chat (对话系统)
```

## 核心脚本

### 1. 发布文档到 knowledge/

```bash
# 位置：ljwx-qwen/scripts/publish-docs.py
cd ljwx-qwen
python3 scripts/publish-docs.py \
  --source-repo . \
  --target-repo ../ljwx-dify \
  --project-name ljwx-qwen \
  --commit-hash $(git rev-parse HEAD)
```

### 2. 同步 knowledge/ 到 Dify

```bash
# 位置：ljwx-dify/scripts/sync-knowledge.py
cd ljwx-dify
python3 scripts/sync-knowledge.py \
  --knowledge-dir knowledge \
  --dify-api-url http://localhost/v1 \
  --dify-api-key $DIFY_API_KEY
```

### 3. 为文档添加元数据

```bash
# 位置：ljwx-qwen/scripts/add-frontmatter.py
cd ljwx-qwen
python3 scripts/add-frontmatter.py \
  --dir docs/06-development/ \
  --level L2 \
  --visibility public \
  --publish \
  --topics spec-driven methodology
```

## 文档元数据模板

```yaml
---
asset:
  level: L2                    # L0/L1/L2/L3/L4
  visibility: public           # internal/public/mixed
  publish: true                # 是否发布
  topics: [spec-driven, ai]    # 主题标签

content:
  title: 文档标题
  author: brunogao
  status: reviewed             # draft/reviewed/public
  created: 2025-01-06
  updated: 2025-01-07

export:
  can_publish_external: true   # 可对外
  requires_desensitization: false
  target_formats: [blog]
---
```

## 资产层级

| 层级 | 说明 | 示例 | 对外 |
|------|------|------|------|
| L0 | 临时文档 | CI日志 | ❌ |
| L1 | 项目规格 | Feature Spec | ❌ |
| L2 | 方法论 | OpenSpec工作流 | ✅ |
| L3 | 行业方案 | 医疗系统架构 | ✅ |
| L4 | 对外内容 | 技术博客 | ✅ |

## 目录结构

```
ljwx-dify/knowledge/
├── sources/              # 原始文档（按项目）
│   └── ljwx-qwen/
│       └── docs/
├── assets/               # 资产化文档（按层级）
│   ├── L1-specs/
│   ├── L2-methodologies/
│   └── L3-solutions/
└── index/                # 索引
    ├── manifest.json     # 全局清单
    ├── by-project.json   # 按项目
    ├── by-topic.json     # 按主题
    └── by-level.json     # 按层级
```

## 常用命令

### 查询知识库

```bash
# 查看所有项目
jq '.projects' knowledge/index/manifest.json

# 查看某个项目的文档
jq '.["ljwx-qwen"]' knowledge/index/by-project.json

# 查看某个主题的文档
jq '.["spec-driven"]' knowledge/index/by-topic.json

# 查看某个层级的文档
jq '.["L2"]' knowledge/index/by-level.json
```

### 测试发布流程

```bash
# 1. 添加元数据（dry run）
python3 scripts/add-frontmatter.py \
  --dir docs/06-development/ \
  --level L2 \
  --publish \
  --dry-run

# 2. 发布到 knowledge/（dry run）
python3 scripts/publish-docs.py \
  --source-repo . \
  --target-repo ../ljwx-dify \
  --project-name ljwx-qwen \
  --commit-hash test123

# 3. 同步到 Dify（dry run）
python3 scripts/sync-knowledge.py \
  --knowledge-dir knowledge \
  --dify-api-url http://localhost/v1 \
  --dify-api-key $DIFY_API_KEY \
  --dry-run
```

## CI/CD 集成

### ljwx-qwen: 自动发布文档

```yaml
# .gitea/workflows/cicd.yml
publish-docs:
  needs: test
  runs-on: ubuntu-latest
  steps:
  - name: Publish docs
    run: |
      python scripts/publish-docs.py \
        --source-repo . \
        --target-repo /tmp/ljwx-dify \
        --project-name ljwx-qwen \
        --commit-hash ${{ github.sha }}
```

### ljwx-dify: 自动同步到 Dify

```yaml
# .gitea/workflows/sync-knowledge.yml
sync:
  runs-on: ubuntu-latest
  steps:
  - name: Sync to Dify
    run: |
      python3 scripts/sync-knowledge.py \
        --knowledge-dir knowledge \
        --dify-api-url http://dify-api:5001/v1 \
        --dify-api-key ${{ secrets.DIFY_API_KEY }}
```

## 环境变量

```bash
# .env
DIFY_API_URL=http://localhost/v1
DIFY_API_KEY=dataset-your-api-key-here

# 使用
export $(cat .env | xargs)
```

## 故障排查

### 文档没有被发布

```bash
# 检查 frontmatter
head -20 docs/xxx.md

# 确认 publish: true
grep "publish:" docs/xxx.md
```

### 同步到 Dify 失败

```bash
# 检查 API 连接
curl http://localhost/v1/datasets \
  -H "Authorization: Bearer $DIFY_API_KEY"

# 检查 Dify 服务
docker ps | grep dify
```

### 索引不一致

```bash
# 重新发布
rm -rf ../ljwx-dify/knowledge/index/*
python3 scripts/publish-docs.py \
  --source-repo . \
  --target-repo ../ljwx-dify \
  --project-name ljwx-qwen \
  --commit-hash $(git rev-parse HEAD)
```

## 关键文件

```
ljwx-docs/
├── knowledge-asset-automation-design.md  # 架构设计
├── knowledge-asset-usage-guide.md        # 使用指南
└── dify-knowledge-sync-guide.md          # Dify同步指南

ljwx-qwen/scripts/
├── publish-docs.py                       # 发布脚本
└── add-frontmatter.py                    # 元数据工具

ljwx-dify/scripts/
└── sync-knowledge.py                     # Dify同步脚本

ljwx-dify/knowledge/
├── README.md                             # 知识库文档
└── index/                                # 索引文件
```

## 下一步

1. ✅ 为更多文档添加元数据
2. ✅ 集成到 CI/CD
3. ✅ 测试完整流程
4. ⏳ 推广到其他项目
5. ⏳ 开发 Web 查询界面
6. ⏳ 实现自动脱敏工具

## 支持

- 技术支持：brunogao
- 文档：ljwx-docs/
- Issues：提交到对应项目的 issue tracker
