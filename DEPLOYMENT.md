# 部署指南

本文档介绍如何在不同环境中部署 LJWX Docs 文档网站。

## 📋 前置要求

- Node.js 18+
- npm 或 yarn
- Git

## 🚀 快速部署

### 1. 构建项目

```bash
# 克隆仓库（如果还没有）
git clone https://github.com/ljwx/ljwx-docs.git
cd ljwx-docs

# 安装依赖
npm install

# 构建生产版本
npm run docs:build
```

构建完成后，静态文件将生成在 `dist/` 目录。

### 2. 本地测试

```bash
# 方式 1: 使用 VitePress 内置预览
npm run docs:preview

# 方式 2: 使用 Node.js 服务器
npm run docs:serve
```

## 🐳 Docker 部署

### 创建 Dockerfile

在项目根目录创建 `Dockerfile`：

```dockerfile
# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

# 复制依赖文件
COPY package*.json ./
RUN npm ci

# 复制源代码
COPY . .

# 构建文档
RUN npm run docs:build

# 生产阶段
FROM node:18-alpine

WORKDIR /app

# 从构建阶段复制文件
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./
COPY --from=builder /app/package*.json ./

# 只安装生产依赖
RUN npm ci --only=production

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# 启动服务
CMD ["node", "server.js"]
```

### 构建和运行

```bash
# 构建镜像
docker build -t ljwx-docs:latest .

# 运行容器
docker run -d \
  --name ljwx-docs \
  -p 3000:3000 \
  --restart unless-stopped \
  ljwx-docs:latest

# 查看日志
docker logs -f ljwx-docs

# 停止容器
docker stop ljwx-docs

# 删除容器
docker rm ljwx-docs
```

### Docker Compose

创建 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  ljwx-docs:
    build: .
    container_name: ljwx-docs
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - HOST=0.0.0.0
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

运行：

```bash
# 启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止
docker-compose down
```

## 🌐 Nginx 部署

### 方式 1: 静态文件托管

适合纯静态部署，性能最佳。

```nginx
server {
    listen 80;
    server_name docs.ljwx.local;

    root /var/www/ljwx-docs/dist;
    index index.html;

    # 日志
    access_log /var/log/nginx/ljwx-docs-access.log;
    error_log /var/log/nginx/ljwx-docs-error.log;

    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # HTML 文件不缓存
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/rss+xml
        font/truetype
        font/opentype
        application/vnd.ms-fontobject
        image/svg+xml;

    # 安全头
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
```

部署步骤：

```bash
# 1. 构建项目
npm run docs:build

# 2. 复制到服务器
scp -r dist/* user@server:/var/www/ljwx-docs/dist/

# 3. 配置 Nginx
sudo cp nginx.conf /etc/nginx/sites-available/ljwx-docs
sudo ln -s /etc/nginx/sites-available/ljwx-docs /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 方式 2: 反向代理 Node.js

使用 Node.js 服务器 + Nginx 反向代理。

```nginx
upstream ljwx_docs {
    server localhost:3000;
}

server {
    listen 80;
    server_name docs.ljwx.local;

    # 日志
    access_log /var/log/nginx/ljwx-docs-access.log;
    error_log /var/log/nginx/ljwx-docs-error.log;

    # 反向代理
    location / {
        proxy_pass http://ljwx_docs;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
```

## ☸️ Kubernetes 部署

### Deployment 配置

创建 `k8s/deployment.yaml`：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ljwx-docs
  namespace: ljwx
  labels:
    app: ljwx-docs
spec:
  replicas: 2
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
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
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
          name: http
          protocol: TCP
        env:
        - name: NODE_ENV
          value: "production"
        - name: PORT
          value: "3000"
        - name: HOST
          value: "0.0.0.0"
        resources:
          limits:
            memory: "256Mi"
            cpu: "500m"
          requests:
            memory: "128Mi"
            cpu: "250m"
        livenessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 5
          timeoutSeconds: 3
          failureThreshold: 3
```

### Service 配置

创建 `k8s/service.yaml`：

```yaml
apiVersion: v1
kind: Service
metadata:
  name: ljwx-docs
  namespace: ljwx
  labels:
    app: ljwx-docs
spec:
  type: ClusterIP
  selector:
    app: ljwx-docs
  ports:
  - port: 80
    targetPort: 3000
    protocol: TCP
    name: http
  sessionAffinity: ClientIP
```

### Ingress 配置

创建 `k8s/ingress.yaml`：

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ljwx-docs
  namespace: ljwx
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "false"
spec:
  ingressClassName: nginx
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

### 部署

```bash
# 创建命名空间
kubectl create namespace ljwx

# 应用配置
kubectl apply -f k8s/

# 查看状态
kubectl get pods -n ljwx -l app=ljwx-docs
kubectl get svc -n ljwx ljwx-docs
kubectl get ingress -n ljwx ljwx-docs

# 查看日志
kubectl logs -n ljwx -l app=ljwx-docs -f

# 扩容
kubectl scale deployment ljwx-docs -n ljwx --replicas=3

# 更新镜像
kubectl set image deployment/ljwx-docs ljwx-docs=ljwx-docs:v2 -n ljwx

# 回滚
kubectl rollout undo deployment/ljwx-docs -n ljwx
```

## 🔒 HTTPS 配置

### Let's Encrypt (Certbot)

```bash
# 安装 Certbot
sudo apt-get install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d docs.ljwx.local

# 自动续期
sudo certbot renew --dry-run
```

### 手动证书

```nginx
server {
    listen 443 ssl http2;
    server_name docs.ljwx.local;

    ssl_certificate /etc/nginx/ssl/docs.ljwx.local.crt;
    ssl_certificate_key /etc/nginx/ssl/docs.ljwx.local.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # 其他配置...
}

server {
    listen 80;
    server_name docs.ljwx.local;
    return 301 https://$server_name$request_uri;
}
```

## 🔧 环境变量

可用的环境变量：

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `NODE_ENV` | 运行环境 | `production` |
| `PORT` | 服务端口 | `3000` |
| `HOST` | 监听地址 | `0.0.0.0` |

## 📊 监控和日志

### PM2 部署（推荐）

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start server.js --name ljwx-docs

# 查看状态
pm2 status

# 查看日志
pm2 logs ljwx-docs

# 重启
pm2 restart ljwx-docs

# 开机自启
pm2 startup
pm2 save
```

### Systemd 服务

创建 `/etc/systemd/system/ljwx-docs.service`：

```ini
[Unit]
Description=LJWX Docs Service
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/ljwx-docs
ExecStart=/usr/bin/node server.js
Restart=on-failure
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=ljwx-docs
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```

管理服务：

```bash
# 启动服务
sudo systemctl start ljwx-docs

# 开机自启
sudo systemctl enable ljwx-docs

# 查看状态
sudo systemctl status ljwx-docs

# 重启
sudo systemctl restart ljwx-docs

# 查看日志
sudo journalctl -u ljwx-docs -f
```

## 🚨 故障排查

### 构建失败

```bash
# 清理缓存
rm -rf node_modules dist .vitepress/cache
npm install
npm run docs:build
```

### 服务启动失败

```bash
# 检查端口占用
lsof -i :3000

# 检查 dist 目录
ls -la dist/

# 查看详细日志
NODE_ENV=production node server.js
```

### Nginx 502 错误

```bash
# 检查 Node.js 服务是否运行
curl http://localhost:3000

# 检查 Nginx 配置
sudo nginx -t

# 查看 Nginx 错误日志
sudo tail -f /var/log/nginx/error.log
```

## 📞 获取帮助

如遇到部署问题：
- 查看项目 [Issues](https://github.com/ljwx/ljwx-docs/issues)
- 联系技术支持：brunogao
