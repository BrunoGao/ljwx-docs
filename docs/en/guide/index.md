# Guide

Welcome to the Knowledge Asset System documentation guide. This section contains detailed design documents, usage guides, and operation manuals.

## 📚 Documentation Navigation

### Core Documents

- [Architecture Design](/en/knowledge-asset-automation-design) - System architecture and design principles
- [Usage Guide](/en/knowledge-asset-usage-guide) - Detailed usage documentation and best practices
- [Dify Sync Guide](/en/dify-knowledge-sync-guide) - Knowledge base synchronization configuration
- [Quick Reference](/en/QUICK-REFERENCE) - Common commands and configuration reference

### Quick Navigation

#### Getting Started
1. Review the [Architecture Design](/en/knowledge-asset-automation-design) to understand how the system works
2. Read the [Quick Reference](/en/QUICK-REFERENCE) to learn core commands
3. Follow the [Usage Guide](/en/knowledge-asset-usage-guide) to start practical operations

#### Advanced Usage
- Configure CI/CD automatic publishing
- Customize metadata rules
- Multi-project integration
- Dify knowledge base management

#### Troubleshooting
- Document publishing failures
- Dify synchronization errors
- Metadata validation issues
- Index inconsistency handling

## 🎯 Common Tasks

### Add Metadata to Documents

```bash
python3 scripts/add-frontmatter.py \
  --dir docs/06-development/ \
  --level L2 \
  --visibility public \
  --publish \
  --topics spec-driven methodology
```

### Publish Documents to Knowledge Base

```bash
python3 scripts/publish-docs.py \
  --source-repo . \
  --target-repo ../ljwx-dify \
  --project-name ljwx-qwen \
  --commit-hash $(git rev-parse HEAD)
```

### Sync to Dify

```bash
python3 scripts/sync-knowledge.py \
  --knowledge-dir knowledge \
  --dify-api-url http://localhost/v1 \
  --dify-api-key $DIFY_API_KEY
```

## 💡 Best Practices

1. **Document Writing**
   - Use clear heading hierarchy
   - Add appropriate code examples
   - Keep documentation updated

2. **Metadata Management**
   - Regularly review document status
   - Set visibility appropriately
   - Use meaningful tags

3. **Version Control**
   - Create tags for important changes
   - Keep documentation in sync with code
   - Reference documentation in commit messages

## 🔗 Related Resources

- [ljwx-qwen Project](http://192.168.1.83:33000/gao/ljwx-qwen)
- [ljwx-dify Knowledge Base](http://192.168.1.83:33000/gao/ljwx-dify)
- [ljwx-chat Conversation System](http://192.168.1.83:33000/gao/ljwx-chat)

## 📞 Getting Help

If you have questions:
- Check the troubleshooting section in the relevant documentation
- Contact technical support: brunogao
- Submit an issue to the corresponding project

---

**Note**: English translations of the detailed guides are in progress. Please refer to the Chinese version for complete documentation.
