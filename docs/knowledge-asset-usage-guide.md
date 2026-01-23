# 知识资产自动化发布 - 使用指南

## 快速开始

### 1. 为现有文档添加元数据

使用 `add-frontmatter.py` 批量添加元数据：

```bash
# 进入项目目录
cd ljwx-qwen

# 为 06-development 目录下的所有文档添加元数据
python3 scripts/add-frontmatter.py \
  --dir docs/06-development/ \
  --level L2 \
  --visibility public \
  --publish \
  --topics spec-driven methodology

# 交互模式（逐个确认）
python3 scripts/add-frontmatter.py \
  --dir docs/06-development/ \
  --level L2 \
  --visibility public \
  --publish \
  --topics spec-driven methodology \
  --interactive
```

### 2. 手动测试发布

```bash
# 测试发布到 ljwx-dify/knowledge
python3 scripts/publish-docs.py \
  --source-repo . \
  --target-repo ../ljwx-dify \
  --project-name ljwx-qwen \
  --commit-hash $(git rev-parse HEAD)
```

### 3. 查看发布结果

```bash
# 查看发布的文档
ls -la ../ljwx-dify/knowledge/assets/L2-methodologies/ljwx-qwen/

# 查看索引
cat ../ljwx-dify/knowledge/index/manifest.json | jq .

# 按主题查询
cat ../ljwx-dify/knowledge/index/by-topic.json | jq '.["spec-driven"]'

# 按项目查询
cat ../ljwx-dify/knowledge/index/by-project.json | jq '.["ljwx-qwen"]'
```

## 元数据配置指南

### 资产层级选择

| 层级 | 适用场景 | 示例 |
|------|---------|------|
| L0 | 临时文档、日志 | CI日志、调试记录 |
| L1 | 项目规格 | Feature Spec、API Spec |
| L2 | 方法论 | OpenSpec工作流、AI执行协议 |
| L3 | 行业方案 | 医疗系统架构、康养平台 |
| L4 | 对外内容 | 技术博客、白皮书 |

### 可见性配置

- `internal`: 仅内部使用，不对外
- `public`: 可对外发布
- `mixed`: 部分内容可对外

### 主题标签建议

常用主题标签：
- `spec-driven` - 规范驱动开发
- `openapi` - OpenAPI 相关
- `methodology` - 方法论
- `gitops` - GitOps 实践
- `ai-engineering` - AI 工程化
- `code-quality` - 代码质量
- `best-practices` - 最佳实践
- `architecture` - 架构设计
- `security` - 安全相关
- `compliance` - 合规相关

## CI/CD 集成

### 方案1：在现有 CI/CD 中添加步骤

编辑 `.gitea/workflows/cicd.yml`，添加新的 job：

```yaml
publish-docs:
  needs: test
  runs-on: ubuntu-latest
  if: github.event_name == 'push' && (github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop')

  steps:
  - uses: actions/checkout@v3
    with:
      fetch-depth: 0

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
      git commit -m "docs: update knowledge from ljwx-qwen@${{ github.sha }}" || echo "No changes"
      git push || echo "Push failed, may need manual intervention"
```

### 方案2：独立的文档发布工作流

创建 `.gitea/workflows/publish-docs.yml`：

```yaml
name: Publish Documentation

on:
  push:
    branches: [ main, develop ]
    paths:
      - 'docs/**'

jobs:
  publish:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
      with:
        fetch-depth: 0

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

    - name: Publish docs
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
        git commit -m "docs: update knowledge from ljwx-qwen@${{ github.sha }}" || echo "No changes"
        git push || echo "Push failed"
```

## 常见场景

### 场景1：新项目接入

1. 复制脚本到新项目：
```bash
cp ljwx-qwen/scripts/publish-docs.py new-project/scripts/
cp ljwx-qwen/scripts/add-frontmatter.py new-project/scripts/
```

2. 为文档添加元数据：
```bash
cd new-project
python3 scripts/add-frontmatter.py \
  --dir docs/ \
  --level L1 \
  --visibility internal \
  --publish \
  --interactive
```

3. 配置 CI/CD（参考上面的方案）

4. 测试发布：
```bash
python3 scripts/publish-docs.py \
  --source-repo . \
  --target-repo ../ljwx-dify \
  --project-name new-project \
  --commit-hash $(git rev-parse HEAD)
```

### 场景2：批量更新元数据

如果需要修改已有文档的元数据：

```bash
# 1. 使用脚本批量更新（会覆盖现有 frontmatter）
python3 scripts/add-frontmatter.py \
  --dir docs/06-development/ \
  --level L2 \
  --visibility public \
  --publish \
  --topics spec-driven methodology ai-engineering

# 2. 或者手动编辑文档的 frontmatter
vim docs/06-development/openspec-workflow.md
```

### 场景3：选择性发布

只发布特定目录的文档：

```bash
# 方法1：只为需要发布的文档设置 publish: true
python3 scripts/add-frontmatter.py \
  --dir docs/06-development/ \
  --publish  # 其他目录不加 --publish

# 方法2：修改 publish-docs.py，添加路径过滤
# （需要修改脚本代码）
```

### 场景4：查询知识库

```bash
# 查看所有项目
cat ../ljwx-dify/knowledge/index/by-project.json | jq 'keys'

# 查看某个项目的文档数量
cat ../ljwx-dify/knowledge/index/by-project.json | jq '.["ljwx-qwen"].total'

# 查看所有主题
cat ../ljwx-dify/knowledge/index/by-topic.json | jq 'keys'

# 查看某个主题的所有文档
cat ../ljwx-dify/knowledge/index/by-topic.json | jq '.["spec-driven"]'

# 查看某个文档的完整信息
cat ../ljwx-dify/knowledge/index/manifest.json | jq '.documents[] | select(.id == "ljwx-qwen-openspec-workflow-test123")'
```

## 故障排查

### 问题1：脚本执行失败

```bash
# 检查 Python 版本
python3 --version  # 需要 3.11+

# 安装依赖
pip install pyyaml gitpython

# 检查脚本权限
chmod +x scripts/publish-docs.py
chmod +x scripts/add-frontmatter.py
```

### 问题2：没有文档被发布

检查：
1. 文档是否有 frontmatter？
2. `asset.publish` 是否为 `true`？
3. frontmatter 格式是否正确？

```bash
# 验证 YAML 格式
python3 -c "import yaml; yaml.safe_load(open('docs/xxx.md').read().split('---')[1])"
```

### 问题3：索引不一致

重新发布所有文档：

```bash
# 清空索引
rm -rf ../ljwx-dify/knowledge/index/*

# 重新发布
python3 scripts/publish-docs.py \
  --source-repo . \
  --target-repo ../ljwx-dify \
  --project-name ljwx-qwen \
  --commit-hash $(git rev-parse HEAD)
```

### 问题4：Git 冲突

如果多个项目同时发布导致冲突：

```bash
cd ../ljwx-dify
git pull --rebase
# 解决冲突
git add knowledge/
git rebase --continue
git push
```

## 最佳实践

### 1. 文档编写规范

- 每个文档必须有清晰的标题
- 使用 Markdown 标准格式
- 避免硬编码敏感信息
- 添加适当的主题标签

### 2. 元数据管理

- 定期审查文档的 `status` 字段
- 及时更新 `updated` 日期
- 为重要文档指定 `reviewer`
- 合理设置 `visibility`

### 3. 版本控制

- 重要变更创建 Git tag
- 在 commit message 中引用文档
- 保持文档和代码同步更新

### 4. 安全检查

- 定期审查 `visibility: public` 的文档
- 确保 40-truth.md 不被发布
- 检查是否有敏感信息泄露

## 进阶功能

### 自定义发布规则

修改 `publish-docs.py` 的 `should_publish` 方法：

```python
def should_publish(self, frontmatter: Optional[Dict]) -> bool:
    """判断文档是否应该发布"""
    if not frontmatter:
        return False

    asset = frontmatter.get("asset", {})

    # 自定义规则
    if not asset.get("publish", False):
        return False

    # 只发布 reviewed 状态的文档
    content = frontmatter.get("content", {})
    if content.get("status") != "reviewed":
        return False

    return True
```

### 添加发布钩子

在发布前/后执行自定义操作：

```python
# 在 DocumentPublisher 类中添加
def pre_publish_hook(self, doc_path: Path):
    """发布前钩子"""
    # 例如：检查敏感信息
    pass

def post_publish_hook(self, doc_path: Path):
    """发布后钩子"""
    # 例如：发送通知
    pass
```

## 相关文档

- [知识资产自动化发布方案](knowledge-asset-automation-design.md)
- [ljwx-dify 知识库 README](../ljwx-dify/knowledge/README.md)
- [ljwx-qwen 文档规范](../ljwx-qwen/docs/08-reference/01-documentation-structure.md)

## 支持

如有问题，请联系：
- 技术支持：brunogao
- 文档维护：知识库团队
