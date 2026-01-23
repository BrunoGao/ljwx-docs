import express from 'express'
import compression from 'compression'
import sirv from 'sirv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5555
const HOST = process.env.HOST || '0.0.0.0'

// 检查构建目录是否存在
const distPath = join(__dirname, 'dist')
if (!existsSync(distPath)) {
  console.error('❌ Error: dist directory not found!')
  console.error('Please run "npm run docs:build" first to build the documentation.')
  process.exit(1)
}

// 启用 Gzip 压缩
app.use(compression())

// 添加安全响应头
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  next()
})

// 静态文件服务
const serve = sirv(distPath, {
  etag: true,
  maxAge: 31536000, // 1 year for immutable assets
  immutable: true,
  gzip: true,
  brotli: true,
  setHeaders: (res, pathname) => {
    // HTML 文件不缓存，确保内容更新
    if (pathname.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate')
    }
    // 静态资源长期缓存
    else if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    }
  }
})

app.use(serve)

// SPA 回退处理
app.get('*', (req, res) => {
  res.sendFile(join(distPath, 'index.html'))
})

// 错误处理
app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).send('Internal Server Error')
})

// 优雅关闭
const server = app.listen(PORT, HOST, () => {
  console.log('┌─────────────────────────────────────────────┐')
  console.log('│                                             │')
  console.log('│   🚀 LJWX Docs Server Started              │')
  console.log('│                                             │')
  console.log(`│   ➜  Local:   http://localhost:${PORT}        │`)
  console.log(`│   ➜  Network: http://${HOST}:${PORT}     │`)
  console.log('│                                             │')
  console.log('│   Press Ctrl+C to stop                      │')
  console.log('│                                             │')
  console.log('└─────────────────────────────────────────────┘')
})

process.on('SIGTERM', () => {
  console.log('\n⏳ SIGTERM signal received: closing HTTP server')
  server.close(() => {
    console.log('✅ HTTP server closed')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('\n⏳ SIGINT signal received: closing HTTP server')
  server.close(() => {
    console.log('✅ HTTP server closed')
    process.exit(0)
  })
})
