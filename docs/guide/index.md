# 指南

欢迎来到知识资产化系统文档指南。这里包含了系统的详细设计文档、使用指南和操作手册。

## 📚 文档导航

### 核心文档

- [架构设计](/knowledge-asset-automation-design) - 系统架构和设计原则
- [使用指南](/knowledge-asset-usage-guide) - 详细的使用文档和最佳实践
- [Dify 同步指南](/dify-knowledge-sync-guide) - 知识库同步配置和操作
- [快速参考](/QUICK-REFERENCE) - 常用命令和配置速查

### 快速导航

#### 新手入门
1. 了解[架构设计](/knowledge-asset-automation-design)，理解系统工作原理
2. 阅读[快速参考](/QUICK-REFERENCE)，掌握核心命令
3. 参考[使用指南](/knowledge-asset-usage-guide)，开始实际操作

#### 进阶使用
- 配置 CI/CD 自动发布
- 自定义元数据规则
- 多项目集成
- Dify 知识库管理

#### 故障排查
- 文档发布失败
- Dify 同步错误
- 元数据验证问题
- 索引不一致处理

## 🎯 常见任务

### 为文档添加元数据

```bash
python3 scripts/add-frontmatter.py \
  --dir docs/06-development/ \
  --level L2 \
  --visibility public \
  --publish \
  --topics spec-driven methodology
```

### 发布文档到知识库

```bash
python3 scripts/publish-docs.py \
  --source-repo . \
  --target-repo ../ljwx-dify \
  --project-name ljwx-qwen \
  --commit-hash $(git rev-parse HEAD)
```

### 同步到 Dify

```bash
python3 scripts/sync-knowledge.py \
  --knowledge-dir knowledge \
  --dify-api-url http://localhost/v1 \
  --dify-api-key $DIFY_API_KEY
```

## 💡 最佳实践

1. **文档编写**
   - 使用清晰的标题层级
   - 添加适当的代码示例
   - 保持文档更新

2. **元数据管理**
   - 定期审查文档状态
   - 合理设置可见性
   - 使用有意义的标签

3. **版本控制**
   - 重要变更创建标签
   - 保持文档与代码同步
   - 在 commit message 中引用文档

## 🔗 相关资源

- [ljwx-qwen 项目](http://192.168.1.83:33000/gao/ljwx-qwen)
- [ljwx-dify 知识库](http://192.168.1.83:33000/gao/ljwx-dify)
- [ljwx-chat 对话系统](http://192.168.1.83:33000/gao/ljwx-chat)

## 📞 获取帮助

如有问题，请：
- 查看对应文档的故障排查部分
- 联系技术支持：brunogao
- 提交 Issue 到相应项目
