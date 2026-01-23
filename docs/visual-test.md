---
title: 视觉效果测试文档
description: 测试流程图、架构图、视频和各种视觉元素
---

# 视觉效果测试文档

本文档用于测试 LJWX Docs 的各种视觉效果，包括流程图、架构图、视频嵌入等功能。

## 📊 流程图测试

### 1. 基础流程图

```mermaid
graph TD
    A[开始] --> B{是否登录?}
    B -->|是| C[显示主页]
    B -->|否| D[跳转登录页]
    D --> E[输入凭证]
    E --> F{验证成功?}
    F -->|是| C
    F -->|否| G[显示错误]
    G --> E
    C --> H[结束]
```

### 2. 横向流程图

```mermaid
graph LR
    A[用户请求] --> B[负载均衡]
    B --> C[Web服务器]
    B --> D[Web服务器]
    B --> E[Web服务器]
    C --> F[应用服务]
    D --> F
    E --> F
    F --> G[数据库]
    F --> H[缓存]
```

### 3. 复杂业务流程

```mermaid
graph TB
    Start[用户提交文档] --> Validate{格式验证}
    Validate -->|通过| Extract[提取元数据]
    Validate -->|失败| Error1[返回错误]

    Extract --> Parse[解析内容]
    Parse --> Enrich[内容增强]

    Enrich --> Store{存储选择}
    Store -->|本地| Local[本地存储]
    Store -->|MinIO| MinIO[对象存储]
    Store -->|Dify| Dify[知识库]

    Local --> Index[建立索引]
    MinIO --> Index
    Dify --> Index

    Index --> Notify[发送通知]
    Notify --> End[完成]

    Error1 --> End
```

## 🏗️ 架构图测试

### 1. 系统架构图

```mermaid
graph TB
    subgraph "前端层"
        Web[Web界面]
        Mobile[移动端]
        API[API接口]
    end

    subgraph "应用层"
        Gateway[API网关]
        Auth[认证服务]
        Doc[文档服务]
        Search[搜索服务]
    end

    subgraph "数据层"
        DB[(PostgreSQL)]
        Cache[(Redis)]
        MinIO[(MinIO存储)]
        ES[(Elasticsearch)]
    end

    Web --> Gateway
    Mobile --> Gateway
    API --> Gateway

    Gateway --> Auth
    Gateway --> Doc
    Gateway --> Search

    Auth --> DB
    Auth --> Cache

    Doc --> DB
    Doc --> MinIO

    Search --> ES
    Search --> Cache
```

### 2. 微服务架构

```mermaid
graph TB
    subgraph "客户端"
        Browser[浏览器]
        App[移动应用]
    end

    subgraph "边缘层"
        CDN[CDN]
        LB[负载均衡]
    end

    subgraph "服务网格"
        Gateway[API Gateway]

        subgraph "核心服务"
            UserSvc[用户服务]
            DocSvc[文档服务]
            StorageSvc[存储服务]
            SearchSvc[搜索服务]
        end

        subgraph "支撑服务"
            AuthSvc[认证服务]
            NotifySvc[通知服务]
            LogSvc[日志服务]
        end
    end

    subgraph "数据层"
        UserDB[(用户数据库)]
        DocDB[(文档数据库)]
        MinIO[(MinIO)]
        ES[(Elasticsearch)]
        MQ[消息队列]
    end

    Browser --> CDN
    App --> CDN
    CDN --> LB
    LB --> Gateway

    Gateway --> UserSvc
    Gateway --> DocSvc
    Gateway --> StorageSvc
    Gateway --> SearchSvc

    UserSvc --> AuthSvc
    DocSvc --> StorageSvc
    DocSvc --> NotifySvc
    SearchSvc --> LogSvc

    UserSvc --> UserDB
    DocSvc --> DocDB
    StorageSvc --> MinIO
    SearchSvc --> ES

    NotifySvc --> MQ
    LogSvc --> MQ
```

### 3. 数据流架构

```mermaid
graph LR
    subgraph "数据源"
        A1[用户输入]
        A2[文件上传]
        A3[API调用]
    end

    subgraph "数据处理"
        B1[数据验证]
        B2[格式转换]
        B3[内容解析]
        B4[元数据提取]
    end

    subgraph "数据存储"
        C1[(关系数据库)]
        C2[(对象存储)]
        C3[(搜索引擎)]
        C4[(缓存)]
    end

    subgraph "数据消费"
        D1[Web展示]
        D2[API输出]
        D3[报表生成]
        D4[数据分析]
    end

    A1 --> B1
    A2 --> B1
    A3 --> B1

    B1 --> B2
    B2 --> B3
    B3 --> B4

    B4 --> C1
    B4 --> C2
    B4 --> C3
    B4 --> C4

    C1 --> D1
    C2 --> D1
    C3 --> D2
    C4 --> D3

    D1 --> D4
    D2 --> D4
    D3 --> D4
```

## 📈 时序图测试

### 用户认证流程

```mermaid
sequenceDiagram
    participant U as 用户
    participant W as Web界面
    participant G as API Gateway
    participant A as 认证服务
    participant D as 数据库
    participant C as 缓存

    U->>W: 输入用户名密码
    W->>G: POST /api/login
    G->>A: 验证请求
    A->>D: 查询用户信息
    D-->>A: 返回用户数据
    A->>A: 验证密码

    alt 验证成功
        A->>A: 生成JWT Token
        A->>C: 存储Session
        A-->>G: 返回Token
        G-->>W: 200 OK + Token
        W-->>U: 登录成功
    else 验证失败
        A-->>G: 401 Unauthorized
        G-->>W: 401 错误
        W-->>U: 显示错误信息
    end
```

### 文档上传流程

```mermaid
sequenceDiagram
    participant U as 用户
    participant W as Web界面
    participant G as Gateway
    participant D as 文档服务
    participant S as 存储服务
    participant M as MinIO
    participant Q as 消息队列
    participant I as 索引服务

    U->>W: 选择文件上传
    W->>W: 前端验证
    W->>G: POST /api/upload
    G->>D: 处理上传请求

    D->>D: 验证文件格式
    D->>D: 提取元数据

    par 并行处理
        D->>S: 存储文件
        S->>M: 上传到MinIO
        M-->>S: 返回URL
        S-->>D: 存储成功
    and
        D->>Q: 发送索引消息
        Q->>I: 触发索引任务
        I->>I: 建立搜索索引
    end

    D-->>G: 上传完成
    G-->>W: 200 OK + 文件信息
    W-->>U: 显示上传成功
```

## 🎯 状态图测试

### 文档生命周期

```mermaid
stateDiagram-v2
    [*] --> 草稿
    草稿 --> 审核中: 提交审核
    审核中 --> 已发布: 审核通过
    审核中 --> 草稿: 审核拒绝
    已发布 --> 已归档: 归档
    已发布 --> 草稿: 撤回编辑
    已归档 --> [*]

    草稿: 编辑中
    审核中: 等待审核
    已发布: 公开可见
    已归档: 只读状态
```

## 🗂️ 类图测试

### 文档管理系统类图

```mermaid
classDiagram
    class Document {
        +String id
        +String title
        +String content
        +String author
        +Date createdAt
        +Date updatedAt
        +String status
        +save()
        +publish()
        +archive()
    }

    class User {
        +String id
        +String username
        +String email
        +String role
        +login()
        +logout()
        +updateProfile()
    }

    class Storage {
        +String bucket
        +String endpoint
        +upload(file)
        +download(key)
        +delete(key)
    }

    class SearchIndex {
        +String indexName
        +buildIndex(doc)
        +search(query)
        +update(doc)
    }

    User "1" --> "*" Document: creates
    Document "1" --> "1" Storage: stores in
    Document "1" --> "1" SearchIndex: indexed by
```

## 🎬 视频测试

### 方式 1：HTML5 视频播放器

::: tip 视频说明
以下视频存储在内部 MinIO 服务中。MinIO 地址：http://192.168.1.83:32001
:::

<video width="100%" controls>
  <source src="http://192.168.1.83:32001/ljwx-docs/videos/demo.mp4" type="video/mp4">
  您的浏览器不支持视频播放。
</video>

### 方式 2：带样式的视频容器

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; background: #000; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.1);">
  <video
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    controls
    poster="http://192.168.1.83:32001/ljwx-docs/images/video-poster.jpg">
    <source src="http://192.168.1.83:32001/ljwx-docs/videos/tutorial.mp4" type="video/mp4">
    您的浏览器不支持视频播放。
  </video>
</div>

### 方式 3：多个视频示例

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0;">
  <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <video width="100%" controls>
      <source src="http://192.168.1.83:32001/ljwx-docs/videos/intro.mp4" type="video/mp4">
    </video>
    <p style="padding: 10px; background: var(--vp-c-bg-soft); margin: 0;">系统介绍视频</p>
  </div>

  <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <video width="100%" controls>
      <source src="http://192.168.1.83:32001/ljwx-docs/videos/tutorial.mp4" type="video/mp4">
    </video>
    <p style="padding: 10px; background: var(--vp-c-bg-soft); margin: 0;">使用教程视频</p>
  </div>
</div>

## 📋 MinIO 视频上传指南

### 1. 访问 MinIO 控制台

```
URL: http://192.168.1.83:32001/browser/ljwx-docs
用户名: minioadmin
密码: minioadmin123
```

### 2. 创建目录结构

建议在 `ljwx-docs` bucket 中创建以下目录：

```
ljwx-docs/
├── videos/          # 视频文件
│   ├── demo.mp4
│   ├── intro.mp4
│   └── tutorial.mp4
├── images/          # 图片文件
│   └── video-poster.jpg
└── documents/       # 文档文件
```

### 3. 上传视频文件

1. 登录 MinIO 控制台
2. 选择 `ljwx-docs` bucket
3. 创建 `videos` 文件夹
4. 点击 **Upload** 上传视频文件
5. 设置文件为公开访问（如需要）

### 4. 获取视频 URL

上传后，视频的访问 URL 格式为：
```
http://192.168.1.83:32001/ljwx-docs/videos/文件名.mp4
```

### 5. 更新文档中的视频链接

将上面的 URL 替换到文档中的 `<source src="...">` 标签中。

## 🎨 代码块测试

### TypeScript 代码

```typescript
interface VideoConfig {
  src: string
  poster?: string
  width?: string | number
  height?: string | number
  controls?: boolean
  autoplay?: boolean
}

class VideoPlayer {
  private config: VideoConfig
  private element: HTMLVideoElement

  constructor(config: VideoConfig) {
    this.config = config
    this.element = this.createVideoElement()
  }

  private createVideoElement(): HTMLVideoElement {
    const video = document.createElement('video')
    video.src = this.config.src
    video.controls = this.config.controls ?? true

    if (this.config.poster) {
      video.poster = this.config.poster
    }

    return video
  }

  play(): void {
    this.element.play()
  }

  pause(): void {
    this.element.pause()
  }
}

// 使用示例
const player = new VideoPlayer({
  src: 'http://192.168.1.83:32001/ljwx-docs/videos/demo.mp4',
  poster: 'http://192.168.1.83:32001/ljwx-docs/images/poster.jpg',
  controls: true
})
```

### Python 代码

```python
from minio import Minio
from minio.error import S3Error

class MinIOClient:
    def __init__(self, endpoint: str, access_key: str, secret_key: str):
        self.client = Minio(
            endpoint,
            access_key=access_key,
            secret_key=secret_key,
            secure=False
        )

    def upload_video(self, bucket: str, object_name: str, file_path: str):
        """上传视频到 MinIO"""
        try:
            self.client.fput_object(
                bucket,
                object_name,
                file_path,
                content_type='video/mp4'
            )
            print(f"视频上传成功: {object_name}")
        except S3Error as e:
            print(f"上传失败: {e}")

    def get_video_url(self, bucket: str, object_name: str) -> str:
        """获取视频访问 URL"""
        return f"http://{self.client._base_url.netloc}/{bucket}/{object_name}"

# 使用示例
client = MinIOClient(
    endpoint='192.168.1.83:32001',
    access_key='minioadmin',
    secret_key='minioadmin123'
)

client.upload_video('ljwx-docs', 'videos/demo.mp4', '/path/to/demo.mp4')
url = client.get_video_url('ljwx-docs', 'videos/demo.mp4')
print(f"视频 URL: {url}")
```

## 📊 表格测试

### MinIO 配置参数

| 参数 | 值 | 说明 |
|------|-----|------|
| Endpoint | 192.168.1.83:32001 | MinIO 服务地址 |
| Access Key | minioadmin | 访问密钥 |
| Secret Key | minioadmin123 | 密钥 |
| Bucket | ljwx-docs | 存储桶名称 |
| Region | us-east-1 | 区域（默认） |
| Secure | false | 是否使用 HTTPS |

### 支持的视频格式

| 格式 | MIME Type | 浏览器支持 | 推荐 |
|------|-----------|-----------|------|
| MP4 | video/mp4 | ✅ 所有现代浏览器 | ⭐⭐⭐⭐⭐ |
| WebM | video/webm | ✅ Chrome, Firefox | ⭐⭐⭐⭐ |
| OGG | video/ogg | ✅ Firefox, Chrome | ⭐⭐⭐ |
| MOV | video/quicktime | ⚠️ Safari | ⭐⭐ |

## 💡 自定义容器测试

::: tip 提示
视频文件建议使用 MP4 格式，H.264 编码，以获得最佳兼容性。
:::

::: warning 注意
大视频文件可能需要较长的加载时间，建议：
- 视频大小控制在 50MB 以内
- 使用适当的分辨率（1080p 或 720p）
- 考虑使用视频压缩工具
:::

::: danger 重要
MinIO 服务器的访问权限设置很重要：
- 确保 bucket 策略允许公开读取
- 或者使用预签名 URL
- 注意视频文件的版权问题
:::

## 🔗 相关链接

- [MinIO 官方文档](https://min.io/docs/minio/linux/index.html)
- [HTML5 Video 规范](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)
- [Mermaid 图表文档](https://mermaid.js.org/)
- [VitePress 文档](https://vitepress.dev/)

## 📝 测试清单

- [x] 基础流程图渲染
- [x] 复杂架构图渲染
- [x] 时序图渲染
- [x] 状态图渲染
- [x] 类图渲染
- [ ] 视频播放测试（需要上传视频文件）
- [x] 代码块高亮测试
- [x] 表格样式测试
- [x] 自定义容器测试

---

**测试文档创建时间**：2026-01-23
**MinIO 服务**：http://192.168.1.83:32001
**文档路径**：`/visual-test`
