# LJWX Docs - 知识资产化系统文档

基于 VitePress 构建的知识资产化系统文档网站，支持多语言、搜索、深色模式、评论系统和专业级视觉效果。

## ✨ 核心特性

### 📚 知识管理
- **知识资产化** - 元数据驱动的文档管理系统
- **自动化发布** - 集成 CI/CD，自动同步到知识库
- **Dify 集成** - 支持同步到 Dify 知识库系统
- **版本追踪** - Git commit hash 关联，变更可追溯

### 🎨 专业视觉
- **代码块增强** - 圆角阴影、悬浮效果、智能复制按钮、JetBrains Mono 字体
- **流程图优化** - Mermaid 专业样式、主题色节点、平滑连线、阴影效果
- **表格美化** - 渐变表头、行悬浮高亮、圆角边框、主题色强调
- **容器增强** - TIP/WARNING/DANGER 渐变背景、悬浮动效
- **动画效果** - 淡入动画、过渡效果、渐变滚动条

### 🌐 访问与交互
- **远程访问** - 支持局域网内任何设备访问（0.0.0.0:5555）
- **本地搜索** - 内置全文搜索功能（Cmd+K 快捷键）
- **深色模式** - 自动适配系统主题，所有元素完美适配
- **评论系统** - 基于 Giscus 的 GitHub Discussions
- **多语言** - 支持中英文双语，可扩展
- **响应式设计** - 完美适配桌面和移动端

## 🚀 快速开始

### 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install
```

### 本地开发

```bash
# 简短命令
pnpm dev

# 或使用完整命令
pnpm docs:dev
```

**访问地址：**
- 本地：http://localhost:5555
- 远程：http://[您的IP]:5555（局域网内其他设备）

**获取您的 IP 地址：**
```bash
# macOS/Linux
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig
```

### 构建生产版本

```bash
# 构建
pnpm build

# 预览构建结果
pnpm preview
```

### 生产环境部署

```bash
# 构建静态文件
pnpm build

# 使用 Node.js 服务器运行（需先构建）
pnpm serve
```

## 🌟 视觉特性展示

### 代码块效果
- ✨ **圆角阴影设计** - 12px 圆角 + 柔和阴影
- 🎯 **悬浮交互** - 鼠标悬停时轻微上浮效果
- 📋 **智能复制** - 悬停显示复制按钮，一键复制代码
- 🔢 **行号优化** - 可交互行号，悬停高亮
- 🎨 **语法高亮** - 浅色 GitHub Light / 深色 One Dark Pro
- 🔤 **专业字体** - JetBrains Mono, Fira Code, Monaco

### Mermaid 流程图
- 📦 **独立容器** - 白色背景 + 圆角边框
- 🎨 **主题色节点** - 品牌色边框 + 阴影效果
- ➡️ **平滑连线** - 主题色连线 + 箭头指示
- 💡 **悬浮增强** - 鼠标悬停时阴影加深
- 🌓 **深色适配** - 完美的深色模式配色

### 表格样式
- 🎯 **渐变表头** - 现代渐变背景
- 🔤 **大写标题** - 专业的视觉效果
- 🎨 **主题色强调** - 表头使用品牌色
- ✨ **行悬浮** - 鼠标经过时行高亮
- 📐 **圆角边框** - 12px 圆角 + 柔和阴影

## 📖 文档说明

- **[GETTING-STARTED.md](./GETTING-STARTED.md)** - 5分钟快速上手指南
- **[CONFIGURATION.md](./CONFIGURATION.md)** - 远程访问和视觉优化配置详解
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Docker/Nginx/K8s 部署方案
- **[PROJECT-SUMMARY.md](./PROJECT-SUMMARY.md)** - 项目完整总结

## 📁 项目结构

```
ljwx-docs/
├── docs/                          # 文档源文件
│   ├── .vitepress/                # VitePress 配置
│   │   ├── config.ts              # 主配置文件
│   │   └── theme/                 # 自定义主题
│   │       ├── components/        # Vue 组件
│   │       ├── custom.css         # 自定义样式
│   │       ├── index.ts           # 主题入口
│   │       └── Layout.vue         # 自定义布局
│   ├── en/                        # 英文文档
│   ├── guide/                     # 指南目录
│   ├── index.md                   # 中文首页
│   ├── QUICK-REFERENCE.md         # 快速参考
│   ├── knowledge-asset-automation-design.md
│   ├── knowledge-asset-usage-guide.md
│   └── dify-knowledge-sync-guide.md
├── server.js                      # Node.js 生产服务器
├── package.json                   # 项目配置
├── .gitignore                     # Git 忽略文件
└── README.md                      # 本文件
```

## 🔧 配置说明

### VitePress 配置

主配置文件位于 `docs/.vitepress/config.ts`，包括：

- 多语言配置
- 导航和侧边栏
- 搜索配置
- 主题定制

### 评论系统配置

编辑 `docs/.vitepress/theme/components/GiscusComment.vue` 中的配置：

```typescript
const repo = computed(() => 'your-username/your-repo')
const repoId = computed(() => 'R_kgDOxxxxxx')
const category = computed(() => 'General')
const categoryId = computed(() => 'DIC_kwDOxxxxxx')
```

获取这些值：
1. 访问 https://giscus.app/zh-CN
2. 输入你的 GitHub 仓库
3. 按照指引获取配置值

### 禁用评论

在文档的 frontmatter 中添加：

```yaml
---
comment: false
---
```

## 🌐 多语言支持

当前支持：
- 🇨🇳 简体中文 (默认)
- 🇺🇸 English

添加新语言：
1. 在 `docs/.vitepress/config.ts` 中添加语言配置
2. 创建对应的语言目录（如 `docs/ja/`）
3. 翻译文档内容

## 📦 部署

### Docker 部署

创建 `Dockerfile`：

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run docs:build

FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

EXPOSE 3000
CMD ["node", "server.js"]
```

构建和运行：

```bash
docker build -t ljwx-docs .
docker run -p 3000:3000 ljwx-docs
```

### Nginx 部署

构建静态文件后，使用 Nginx 托管：

```nginx
server {
    listen 80;
    server_name docs.ljwx.local;
    root /var/www/ljwx-docs/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # HTML 文件不缓存
    location ~* \.html$ {
        add_header Cache-Control "no-cache, must-revalidate";
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### Kubernetes 部署

创建 `k8s-deployment.yaml`：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ljwx-docs
spec:
  replicas: 2
  selector:
    matchLabels:
      app: ljwx-docs
  template:
    metadata:
      labels:
        app: ljwx-docs
    spec:
      containers:
      - name: ljwx-docs
        image: ljwx-docs:latest
        ports:
        - containerPort: 3000
        resources:
          limits:
            memory: "256Mi"
            cpu: "500m"
          requests:
            memory: "128Mi"
            cpu: "250m"
---
apiVersion: v1
kind: Service
metadata:
  name: ljwx-docs
spec:
  selector:
    app: ljwx-docs
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ljwx-docs
spec:
  rules:
  - host: docs.ljwx.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: ljwx-docs
            port:
              number: 80
```

部署：

```bash
kubectl apply -f k8s-deployment.yaml
```

## 🛠️ 开发指南

### 添加新文档

1. 在 `docs/` 目录下创建 `.md` 文件
2. 添加 frontmatter（可选）
3. 在 `docs/.vitepress/config.ts` 中更新导航/侧边栏
4. 如需英文版，在 `docs/en/` 创建对应文件

### 自定义主题

编辑 `docs/.vitepress/theme/custom.css` 修改样式：

```css
:root {
  --vp-c-brand-1: #3451b2;  /* 主题色 */
  --vp-c-brand-2: #3a5ccc;
  --vp-c-brand-3: #5672cd;
}
```

### 添加 Vue 组件

1. 在 `docs/.vitepress/theme/components/` 创建组件
2. 在 `docs/.vitepress/theme/index.ts` 注册
3. 在 markdown 中使用

## 🔗 仓库信息

- **Git 仓库**: http://192.168.1.83:33000/gao/ljwx-docs.git
- **在线访问**: http://192.168.1.83:5555（开发服务器运行时）

## 📄 许可证

MIT License

## 👥 贡献

欢迎提交 Issue 和 Pull Request！

### 克隆仓库

```bash
git clone http://192.168.1.83:33000/gao/ljwx-docs.git
cd ljwx-docs
pnpm install
pnpm dev
```

## 📞 支持与反馈

- **技术支持**: brunogao
- **文档仓库**: http://192.168.1.83:33000/gao/ljwx-docs
- **问题反馈**: 提交 Issue 到仓库

## 🎯 下一步

1. ✅ 配置 Giscus 评论系统（可选）
2. ✅ 自定义主题颜色和样式
3. ✅ 添加/更新文档内容
4. ✅ 配置 CI/CD 自动部署
5. ✅ 配置域名和 HTTPS

## 🌟 项目亮点

- 🚀 **即开即用** - 5分钟快速启动
- 🎨 **专业视觉** - 媲美顶级文档站点
- 🌐 **远程访问** - 局域网内任意设备访问
- 📱 **移动优化** - 完美的响应式设计
- 🌓 **深色模式** - 所有元素完美适配
- ⚡ **性能优异** - 流畅的动画和交互
- 📚 **丰富文档** - 详细的配置和部署指南

---

**版本**: 1.0.0
**更新日期**: 2025-01-23
**技术栈**: VitePress 1.0 + Vue 3 + TypeScript
**维护者**: brunogao
