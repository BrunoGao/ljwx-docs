# Knowledge Asset Automation Publishing Solution

::: warning Translation in Progress
The English translation of this document is currently in progress. Please refer to the [Chinese version](/knowledge-asset-automation-design) for complete documentation.
:::

## Architecture Overview

```
ljwx-qwen (Source Project)
├── docs/                    # Project documentation
│   ├── 01-getting-started/
│   ├── 02-architecture/
│   ├── ...
│   └── 06-development/      # High-value methodologies
├── .gitea/workflows/
│   └── cicd.yml             # Add documentation publishing step
└── scripts/
    └── publish-docs.py      # Documentation publishing script
                ↓
                ↓ (Automated publishing)
                ↓
ljwx-dify (Knowledge Base)
└── knowledge/               # Knowledge asset repository
    ├── sources/             # Original documents (organized by project)
    ├── assets/              # Asset documents (organized by level)
    └── index/               # Indexes and metadata
```

## Core Design Principles

### 1. Version Control as Source of Truth
- Record Git commit hash for each publication
- Document changes traceable to specific commits
- Support rollback to any historical version

### 2. Metadata-Driven
- Each document must have YAML frontmatter
- Metadata determines document publishing strategy
- Support selective publishing (only publish marked documents)

### 3. Automation First
- Git push triggers automatic publishing
- No manual intervention required
- Automatic rollback on failure

For complete documentation, please visit the [Chinese version](/knowledge-asset-automation-design).
