# Knowledge Asset System - Quick Reference

::: warning Translation in Progress
The English translation of this document is currently in progress. Please refer to the [Chinese version](/QUICK-REFERENCE) for complete documentation.
:::

## System Architecture

```
ljwx-qwen (Source Project)
    ↓ publish-docs.py
ljwx-dify/knowledge/ (Knowledge Repository)
    ↓ sync-knowledge.py
Dify Knowledge Base (Vector Database)
    ↓ RAG
ljwx-chat (Chat System)
```

## Core Scripts

### 1. Publish Documents to knowledge/

```bash
# Location: ljwx-qwen/scripts/publish-docs.py
cd ljwx-qwen
python3 scripts/publish-docs.py \
  --source-repo . \
  --target-repo ../ljwx-dify \
  --project-name ljwx-qwen \
  --commit-hash $(git rev-parse HEAD)
```

### 2. Sync knowledge/ to Dify

```bash
# Location: ljwx-dify/scripts/sync-knowledge.py
cd ljwx-dify
python3 scripts/sync-knowledge.py \
  --knowledge-dir knowledge \
  --dify-api-url http://localhost/v1 \
  --dify-api-key $DIFY_API_KEY
```

### 3. Add Metadata to Documents

```bash
# Location: ljwx-qwen/scripts/add-frontmatter.py
cd ljwx-qwen
python3 scripts/add-frontmatter.py \
  --dir docs/06-development/ \
  --level L2 \
  --visibility public \
  --publish \
  --topics spec-driven methodology
```

## Document Metadata Template

```yaml
---
asset:
  level: L2                    # L0/L1/L2/L3/L4
  visibility: public           # internal/public/mixed
  publish: true                # Whether to publish
  topics: [spec-driven, ai]    # Topic tags

content:
  title: Document Title
  author: brunogao
  status: reviewed             # draft/reviewed/public
  created: 2025-01-06
  updated: 2025-01-07

export:
  can_publish_external: true   # Can publish externally
  requires_desensitization: false
  target_formats: [blog]
---
```

For complete documentation, please visit the [Chinese version](/QUICK-REFERENCE).
