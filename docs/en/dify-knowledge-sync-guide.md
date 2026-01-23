# Dify Knowledge Base Automatic Synchronization Guide

::: warning Translation in Progress
The English translation of this document is currently in progress. Please refer to the [Chinese version](/dify-knowledge-sync-guide) for complete documentation.
:::

## Overview

This solution implements a complete workflow for automatically synchronizing documents from the `ljwx-dify/knowledge/` directory to the Dify knowledge base system.

## Architecture

```
knowledge/                    Dify API
├── sources/                     ↓
│   └── ljwx-qwen/          → Dataset: ljwx-qwen-L2
│       └── docs/               ├── Document 1
├── assets/                     ├── Document 2
│   └── L2-methodologies/       └── ...
└── index/
    └── manifest.json       → Dataset: ljwx-qwen-L1
                                ├── Document 1
                                └── ...
```

## Core Features

1. **Organized by Project and Level**
   - Create independent Dataset for each project and level
   - Example: `ljwx-qwen-L2`, `ljwx-chat-L3`

2. **Incremental Sync**
   - Detect existing documents to avoid duplicate creation
   - Support updating existing documents

3. **Automation**
   - Can be integrated into CI/CD
   - Support scheduled tasks

4. **Security**
   - Use Dify API Key authentication
   - Support dry-run mode for testing

## Quick Start

### 1. Get Dify API Key

In the Dify admin interface:
1. Go to "Settings" → "API Keys"
2. Create a new API Key
3. Copy the API Key (format: `dataset-xxx`)

### 2. Manual Test Sync

```bash
cd ljwx-dify

# Dry run mode (no actual creation)
python3 scripts/sync-knowledge.py \
  --knowledge-dir knowledge \
  --dify-api-url http://localhost/v1 \
  --dify-api-key dataset-your-api-key-here \
  --dry-run

# Actual sync
python3 scripts/sync-knowledge.py \
  --knowledge-dir knowledge \
  --dify-api-url http://localhost/v1 \
  --dify-api-key dataset-your-api-key-here
```

For complete documentation, please visit the [Chinese version](/dify-knowledge-sync-guide).
