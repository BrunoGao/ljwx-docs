# Dify 知识库自动同步指南

## 概述

这个方案实现了从 `ljwx-dify/knowledge/` 目录自动同步文档到 Dify 知识库系统的完整流程。

## 架构

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

## 核心特性

1. **按项目和层级组织**
   - 每个项目的每个层级创建独立的 Dataset
   - 例如：`ljwx-qwen-L2`、`ljwx-chat-L3`

2. **增量同步**
   - 检测已存在的文档，避免重复创建
   - 支持更新已有文档

3. **自动化**
   - 可集成到 CI/CD
   - 支持定时任务

4. **安全**
   - 使用 Dify API Key 认证
   - 支持 dry-run 模式测试

## 快速开始

### 1. 获取 Dify API Key

在 Dify 管理界面：
1. 进入 "设置" → "API Keys"
2. 创建新的 API Key
3. 复制 API Key（格式：`dataset-xxx`）

### 2. 手动测试同步

```bash
cd ljwx-dify

# Dry run 模式（不实际创建）
python3 scripts/sync-knowledge.py \
  --knowledge-dir knowledge \
  --dify-api-url http://localhost/v1 \
  --dify-api-key dataset-your-api-key-here \
  --dry-run

# 实际同步
python3 scripts/sync-knowledge.py \
  --knowledge-dir knowledge \
  --dify-api-url http://localhost/v1 \
  --dify-api-key dataset-your-api-key-here
```

### 3. 只同步特定层级

```bash
# 只同步 L2 层级（方法论）
python3 scripts/sync-knowledge.py \
  --knowledge-dir knowledge \
  --dify-api-url http://localhost/v1 \
  --dify-api-key dataset-your-api-key-here \
  --level L2
```

## 配置说明

### 环境变量

建议使用环境变量存储敏感信息：

```bash
# 创建 .env 文件
cat > .env <<EOF
DIFY_API_URL=http://localhost/v1
DIFY_API_KEY=dataset-your-api-key-here
EOF

# 使用环境变量
export $(cat .env | xargs)
python3 scripts/sync-knowledge.py \
  --knowledge-dir knowledge \
  --dify-api-url $DIFY_API_URL \
  --dify-api-key $DIFY_API_KEY
```

### API URL 配置

根据部署方式选择：

| 部署方式 | API URL |
|---------|---------|
| 本地开发 | `http://localhost/v1` |
| Docker Compose | `http://localhost:5001/v1` |
| Kubernetes | `http://dify-api.ljwx.svc:5001/v1` |
| 生产环境 | `https://dify.yourdomain.com/v1` |

## 自动化方案

### 方案1：Git Hook（推荐）

在 ljwx-dify 仓库中添加 post-merge hook：

```bash
# 创建 .git/hooks/post-merge
cat > .git/hooks/post-merge <<'EOF'
#!/bin/bash

# 检查 knowledge/ 目录是否有变更
if git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD | grep -q "^knowledge/"; then
    echo "检测到 knowledge/ 目录变更，开始同步..."

    cd "$(git rev-parse --show-toplevel)"

    python3 scripts/sync-knowledge.py \
        --knowledge-dir knowledge \
        --dify-api-url "${DIFY_API_URL:-http://localhost/v1}" \
        --dify-api-key "${DIFY_API_KEY}" \
        || echo "同步失败，请手动检查"
fi
EOF

chmod +x .git/hooks/post-merge
```

### 方案2：CI/CD 集成

在 ljwx-dify 的 `.gitea/workflows/sync-knowledge.yml`：

```yaml
name: Sync Knowledge to Dify

on:
  push:
    branches: [ main ]
    paths:
      - 'knowledge/**'

jobs:
  sync:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: 3.11

    - name: Install dependencies
      run: |
        pip install requests pyyaml

    - name: Sync to Dify
      env:
        DIFY_API_KEY: ${{ secrets.DIFY_API_KEY }}
      run: |
        python3 scripts/sync-knowledge.py \
          --knowledge-dir knowledge \
          --dify-api-url http://dify-api.ljwx.svc:5001/v1 \
          --dify-api-key $DIFY_API_KEY
```

### 方案3：定时任务

使用 cron 定期同步：

```bash
# 编辑 crontab
crontab -e

# 每小时同步一次
0 * * * * cd /path/to/ljwx-dify && python3 scripts/sync-knowledge.py --knowledge-dir knowledge --dify-api-url http://localhost/v1 --dify-api-key $DIFY_API_KEY >> /var/log/dify-sync.log 2>&1
```

### 方案4：Kubernetes CronJob

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: dify-knowledge-sync
  namespace: ljwx
spec:
  schedule: "0 * * * *"  # 每小时
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: sync
            image: python:3.11-slim
            command:
            - /bin/bash
            - -c
            - |
              pip install requests pyyaml
              cd /workspace
              python3 scripts/sync-knowledge.py \
                --knowledge-dir knowledge \
                --dify-api-url http://dify-api:5001/v1 \
                --dify-api-key $DIFY_API_KEY
            env:
            - name: DIFY_API_KEY
              valueFrom:
                secretKeyRef:
                  name: dify-secrets
                  key: api-key
            volumeMounts:
            - name: workspace
              mountPath: /workspace
          volumes:
          - name: workspace
            gitRepo:
              repository: http://gitea:3000/gao/ljwx-dify.git
              revision: main
          restartPolicy: OnFailure
```

## 完整工作流

### 端到端流程

```
1. 开发者在 ljwx-qwen 提交代码
   ↓
2. ljwx-qwen CI/CD 发布文档到 ljwx-dify/knowledge/
   ↓
3. ljwx-dify 检测到 knowledge/ 变更
   ↓
4. 触发 sync-knowledge.py
   ↓
5. 文档同步到 Dify 知识库
   ↓
6. ljwx-chat 可以检索到最新文档
```

### 示例：从提交到可用

```bash
# 1. 在 ljwx-qwen 中更新文档
cd ljwx-qwen
vim docs/06-development/new-feature.md
git add docs/
git commit -m "docs: add new feature spec"
git push origin main

# 2. CI/CD 自动发布到 ljwx-dify/knowledge/
# （publish-docs.py 自动运行）

# 3. ljwx-dify 检测到变更
cd ljwx-dify
git pull

# 4. 自动同步到 Dify（通过 Git hook 或 CI/CD）
# 或手动触发：
python3 scripts/sync-knowledge.py \
  --knowledge-dir knowledge \
  --dify-api-url http://localhost/v1 \
  --dify-api-key $DIFY_API_KEY

# 5. 在 ljwx-chat 中测试
# 现在可以检索到新文档了
```

## 故障排查

### 问题1：API Key 无效

```bash
# 错误信息
❌ 创建 dataset 失败: 401 Unauthorized

# 解决方案
# 1. 检查 API Key 是否正确
# 2. 确认 API Key 类型为 dataset（不是 app）
# 3. 在 Dify 管理界面重新生成
```

### 问题2：无法连接 Dify API

```bash
# 错误信息
❌ 创建 dataset 失败: Connection refused

# 解决方案
# 1. 检查 Dify 服务是否运行
docker ps | grep dify

# 2. 检查 API URL 是否正确
curl http://localhost/v1/datasets

# 3. 检查网络连接
ping dify-api.ljwx.svc
```

### 问题3：文档同步失败

```bash
# 错误信息
❌ 创建文档失败: 400 Bad Request

# 解决方案
# 1. 检查文档内容是否有效
cat knowledge/sources/ljwx-qwen/docs/xxx.md

# 2. 检查文档大小（Dify 有限制）
du -h knowledge/sources/ljwx-qwen/docs/xxx.md

# 3. 查看详细错误
python3 scripts/sync-knowledge.py --dry-run  # 先测试
```

### 问题4：重复创建 Dataset

```bash
# 如果发现重复的 dataset，手动清理：
# 1. 在 Dify 管理界面删除重复的 dataset
# 2. 清空缓存重新同步
python3 scripts/sync-knowledge.py \
  --knowledge-dir knowledge \
  --dify-api-url http://localhost/v1 \
  --dify-api-key $DIFY_API_KEY
```

## 高级配置

### 自定义 Dataset 命名

修改 `sync-knowledge.py` 的 `get_or_create_dataset` 方法：

```python
def get_or_create_dataset(self, project_name: str, level: str) -> Optional[str]:
    # 自定义命名规则
    dataset_name = f"LJWX-{project_name}-{level}-Knowledge"
    # ...
```

### 过滤特定文档

只同步特定主题的文档：

```python
def should_sync(self, doc_info: Dict) -> bool:
    """判断是否应该同步"""
    # 只同步包含特定主题的文档
    topics = doc_info.get("topics", [])
    return "spec-driven" in topics or "methodology" in topics
```

### 批量处理

同步大量文档时，添加批处理和重试：

```python
import time
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=10))
def sync_document_with_retry(self, dataset_id: str, doc_info: Dict) -> bool:
    """带重试的文档同步"""
    result = self.sync_document(dataset_id, doc_info)
    time.sleep(0.5)  # 避免 API 限流
    return result
```

## 监控和日志

### 添加日志记录

```bash
# 创建日志目录
mkdir -p logs

# 运行时记录日志
python3 scripts/sync-knowledge.py \
  --knowledge-dir knowledge \
  --dify-api-url http://localhost/v1 \
  --dify-api-key $DIFY_API_KEY \
  2>&1 | tee logs/sync-$(date +%Y%m%d-%H%M%S).log
```

### 监控同步状态

```bash
# 查看最近的同步日志
tail -f logs/sync-*.log

# 统计同步结果
grep "✅ 成功" logs/sync-*.log | wc -l
grep "❌ 失败" logs/sync-*.log | wc -l
```

## 性能优化

### 并发同步

对于大量文档，可以使用并发：

```python
from concurrent.futures import ThreadPoolExecutor, as_completed

def sync_documents_concurrent(self, dataset_id: str, docs: List[Dict], max_workers: int = 5):
    """并发同步文档"""
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {
            executor.submit(self.sync_document, dataset_id, doc): doc
            for doc in docs
        }

        for future in as_completed(futures):
            doc = futures[future]
            try:
                future.result()
            except Exception as e:
                print(f"❌ 同步失败 {doc['title']}: {e}")
```

### 增量同步

只同步变更的文档：

```bash
# 记录上次同步的 commit
echo $LAST_COMMIT > .last-sync-commit

# 只同步变更的文档
git diff $LAST_COMMIT HEAD --name-only | grep "^knowledge/" | while read file; do
    # 同步该文档
    ...
done
```

## 相关文档

- [知识资产自动化发布方案](../../ljwx-docs/knowledge-asset-automation-design.md)
- [知识库 README](../knowledge/README.md)
- [Dify API 文档](https://docs.dify.ai/api-reference)

## 支持

如有问题，请联系：
- 技术支持：brunogao
- Dify 管理员：知识库团队
