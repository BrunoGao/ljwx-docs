# Knowledge Asset Automation Publishing - Usage Guide

::: warning Translation in Progress
The English translation of this document is currently in progress. Please refer to the [Chinese version](/knowledge-asset-usage-guide) for complete documentation.
:::

## Quick Start

### 1. Add Metadata to Existing Documents

Use `add-frontmatter.py` to batch add metadata:

```bash
# Enter project directory
cd ljwx-qwen

# Add metadata to all documents in the 06-development directory
python3 scripts/add-frontmatter.py \
  --dir docs/06-development/ \
  --level L2 \
  --visibility public \
  --publish \
  --topics spec-driven methodology

# Interactive mode (confirm one by one)
python3 scripts/add-frontmatter.py \
  --dir docs/06-development/ \
  --level L2 \
  --visibility public \
  --publish \
  --topics spec-driven methodology \
  --interactive
```

### 2. Manual Test Publishing

```bash
# Test publishing to ljwx-dify/knowledge
python3 scripts/publish-docs.py \
  --source-repo . \
  --target-repo ../ljwx-dify \
  --project-name ljwx-qwen \
  --commit-hash $(git rev-parse HEAD)
```

### 3. View Publishing Results

```bash
# View published documents
ls -la ../ljwx-dify/knowledge/assets/L2-methodologies/ljwx-qwen/

# View index
cat ../ljwx-dify/knowledge/index/manifest.json | jq .

# Query by topic
cat ../ljwx-dify/knowledge/index/by-topic.json | jq '.["spec-driven"]'

# Query by project
cat ../ljwx-dify/knowledge/index/by-project.json | jq '.["ljwx-qwen"]'
```

For complete documentation, please visit the [Chinese version](/knowledge-asset-usage-guide).
