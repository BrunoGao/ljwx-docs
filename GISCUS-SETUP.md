# Giscus 评论系统配置指南

## 📋 前置要求

1. 需要一个 **公开的** GitHub 仓库
2. 仓库需要启用 **Discussions** 功能
3. 需要在仓库上安装 **Giscus App**

## 🚀 配置步骤

### 第 1 步：准备 GitHub 仓库

**选项 A：使用现有的 Git 仓库（如果在 GitHub 上）**

如果您的仓库 `http://192.168.1.83:33000/gao/ljwx-docs.git` 是私有 Gitea 服务器，您需要：
- 在 GitHub 上创建一个新的公开仓库用于评论
- 或者将现有仓库镜像到 GitHub

**选项 B：创建新的 GitHub 仓库**

1. 访问 https://github.com/new
2. 创建一个公开仓库（例如：`ljwx-docs` 或 `ljwx-docs-comments`）
3. 仓库可以为空，只用于存储评论

### 第 2 步：启用 Discussions

1. 进入您的 GitHub 仓库
2. 点击 **Settings**（设置）
3. 滚动到 **Features**（功能）部分
4. 勾选 ✅ **Discussions**

### 第 3 步：安装 Giscus App

1. 访问 https://github.com/apps/giscus
2. 点击 **Install**（安装）
3. 选择您要安装的仓库：
   - **All repositories**（所有仓库）
   - **Only select repositories**（仅选定的仓库）- 推荐，选择您的文档仓库
4. 点击 **Install**

### 第 4 步：获取 Giscus 配置

1. 访问 https://giscus.app/zh-CN
2. 在 **配置** 部分填写：
   - **仓库**：输入您的 GitHub 仓库（格式：`用户名/仓库名`）
   - 例如：`ljwx/ljwx-docs`
3. 页面会自动检查仓库是否满足条件：
   ```
   ✅ 公开仓库
   ✅ 已安装 giscus app
   ✅ 已启用 Discussions
   ```
4. **Discussion 分类**：选择 **General**（或创建新分类）
5. 向下滚动到 **启用 giscus** 部分
6. 复制生成的配置，您会看到类似这样的代码：

```html
<script src="https://giscus.app/client.js"
        data-repo="您的用户名/仓库名"
        data-repo-id="R_kgDOxxxxxxxxx"
        data-category="General"
        data-category-id="DIC_kwDOxxxxxxxxx"
        ...
</script>
```

### 第 5 步：更新配置文件

从上面的脚本中提取这四个值：
- `data-repo`：您的 GitHub 仓库
- `data-repo-id`：仓库 ID（以 R_kgDO 开头）
- `data-category`：Discussion 分类名称
- `data-category-id`：分类 ID（以 DIC_kwDO 开头）

编辑文件 `docs/.vitepress/theme/components/GiscusComment.vue`：

```typescript
// 第 31-34 行，替换为您的真实配置
const repo = computed(() => '您的GitHub用户名/仓库名')
const repoId = computed(() => 'R_kgDOxxxxxxxxx')  // 从 giscus.app 获取
const category = computed(() => 'General')
const categoryId = computed(() => 'DIC_kwDOxxxxxxxxx')  // 从 giscus.app 获取
```

### 第 6 步：测试评论系统

1. 保存配置文件
2. 重启开发服务器：
   ```bash
   pnpm dev
   ```
3. 访问任意文档页面（不是首页）
4. 滚动到页面底部，应该能看到 Giscus 评论框

## 🔧 配置示例

```typescript
// 真实配置示例（您需要替换为自己的值）
const repo = computed(() => 'brunogao/ljwx-docs')
const repoId = computed(() => 'R_kgDOKZ3q5Q')
const category = computed(() => 'General')
const categoryId = computed(() => 'DIC_kwDOKZ3q5c4Cc8c0')
```

## 🎨 深色模式支持

配置完成后，Giscus 会自动跟随 VitePress 的深色模式切换。

## 📱 移动端优化

Giscus 已自动适配移动端，无需额外配置。

## 🚫 禁用评论

如果某个页面不想显示评论，在 Markdown 文件的 frontmatter 中添加：

```yaml
---
comment: false
---
```

## ❓ 常见问题

### Q1: 仓库必须是公开的吗？
是的，Giscus 只支持公开仓库。私有仓库无法使用。

### Q2: 我的主仓库是私有的 Gitea，怎么办？
您可以在 GitHub 创建一个单独的公开仓库，仅用于存储评论。文档仍然托管在您的 Gitea 服务器上。

### Q3: 评论数据存储在哪里？
评论存储在 GitHub Discussions 中，作为讨论主题。每个页面对应一个讨论。

### Q4: 可以迁移评论吗？
可以，评论存储在 GitHub Discussions 中，可以通过 GitHub API 导出和导入。

### Q5: 如何修改评论框样式？
编辑 `docs/.vitepress/theme/components/GiscusComment.vue` 的 `<style>` 部分。

## 🔗 相关链接

- [Giscus 官网](https://giscus.app/zh-CN)
- [Giscus GitHub](https://github.com/giscus/giscus)
- [GitHub Discussions 文档](https://docs.github.com/en/discussions)

## 💡 提示

如果您暂时不想配置评论系统，可以：

1. **完全移除评论组件**（在 Layout.vue 中）
2. **或保持现状**（配置错误时 Giscus 会显示友好的错误提示）
3. **或在所有页面禁用**（在 frontmatter 添加 `comment: false`）

---

配置完成后，您的文档网站将拥有一个现代化的评论系统！🎉
