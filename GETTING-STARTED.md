# 快速上手指南

欢迎使用 LJWX Docs！本指南将帮助您在 5 分钟内启动文档网站。

## 🎯 第一步：安装依赖

```bash
# 确保您已安装 Node.js 18+
node --version

# 安装项目依赖
npm install
```

## 🚀 第二步：启动开发服务器

```bash
npm run docs:dev
```

访问 http://localhost:5173，您将看到文档网站。

## 📝 第三步：配置 Giscus 评论系统（可选）

如果您想启用评论功能，请按以下步骤操作：

### 3.1 准备 GitHub 仓库

1. 创建一个公开的 GitHub 仓库（或使用现有仓库）
2. 在仓库设置中启用 Discussions 功能
3. 访问 https://giscus.app/zh-CN

### 3.2 获取配置信息

在 Giscus 网站上：
1. 输入您的仓库名（格式：`username/repo`）
2. 选择页面与 discussions 映射关系（推荐：pathname）
3. 选择 Discussion 分类（推荐：General）
4. 复制生成的配置信息

### 3.3 更新配置

编辑 `docs/.vitepress/theme/components/GiscusComment.vue`：

```typescript
// 第 30-33 行
const repo = computed(() => 'your-username/your-repo')  // 替换为您的仓库
const repoId = computed(() => 'R_kgDOxxxxxx')           // 替换为您的仓库 ID
const category = computed(() => 'General')              // 讨论分类
const categoryId = computed(() => 'DIC_kwDOxxxxxx')     // 替换为您的分类 ID
```

## 🎨 第四步：自定义配置（可选）

### 修改网站信息

编辑 `docs/.vitepress/config.ts`：

```typescript
export default defineConfig({
  title: "您的文档标题",
  description: "您的文档描述",
  // ...
})
```

### 修改主题颜色

编辑 `docs/.vitepress/theme/custom.css`：

```css
:root {
  --vp-c-brand-1: #3451b2;  /* 修改为您喜欢的颜色 */
  --vp-c-brand-2: #3a5ccc;
  --vp-c-brand-3: #5672cd;
}
```

### 更新 Logo

替换 `docs/public/logo.svg` 为您自己的 Logo。

## 🏗️ 第五步：构建生产版本

```bash
# 构建
npm run docs:build

# 预览构建结果
npm run docs:preview

# 或使用 Node.js 服务器
npm run docs:serve
```

## 📦 常用命令

| 命令 | 说明 |
|------|------|
| `npm run docs:dev` | 启动开发服务器 |
| `npm run docs:build` | 构建生产版本 |
| `npm run docs:preview` | 预览构建结果 |
| `npm run docs:serve` | 使用 Node.js 服务器运行 |

## 📚 下一步

- 阅读 [README.md](./README.md) 了解项目结构
- 查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 学习部署方法
- 浏览文档网站了解更多功能

## 🎓 快速学习

### 添加新文档

1. 在 `docs/` 目录创建 `.md` 文件
2. 在 `docs/.vitepress/config.ts` 更新侧边栏
3. 保存后自动刷新

### 使用 Frontmatter

在文档顶部添加元数据：

```yaml
---
title: 文档标题
description: 文档描述
comment: false  # 禁用评论
---
```

### 添加多语言版本

1. 在 `docs/en/` 创建对应的英文文档
2. 文件路径保持一致
3. 更新 `config.ts` 中的英文侧边栏

## ❓ 常见问题

### 端口被占用

```bash
# 修改端口
npm run docs:dev -- --port 5174
```

### 构建失败

```bash
# 清理缓存重试
rm -rf node_modules .vitepress/cache dist
npm install
npm run docs:build
```

### 评论系统不显示

1. 检查 GitHub 仓库是否公开
2. 确认已启用 Discussions
3. 验证配置信息是否正确

## 💡 提示

- 开发时保存文件会自动热重载
- 使用搜索功能快速找到内容
- 主题自动跟随系统（可手动切换）
- 支持中英文切换

## 📞 获取帮助

- 查看完整文档：启动网站后访问首页
- 技术支持：brunogao
- 问题反馈：[GitHub Issues](https://github.com/ljwx/ljwx-docs/issues)

祝您使用愉快！🎉
