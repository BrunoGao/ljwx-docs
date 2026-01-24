# n8n + Dify 工作流示例集

本目录包含可直接导入n8n的真实工作流JSON文件，演示了AI编排方法论在数据处理中的应用。

## 📋 工作流清单

### 1. 数据清洗与标准化工作流 (`01-data-cleaning-workflow.json`)

**功能**: 演示AI驱动的数据清洗和质量评分流程

**流程**:
```
数据接入 → Schema验证 → 数据清洗 → 质量评分 → 路由决策
           ↓               ↓            ↓
      错误日志        人工复核队列    保存数据库
```

**特点**:
- 自动Schema验证
- 模拟LLM数据清洗逻辑
- 四维质量评分（完整性25% + 准确性35% + 一致性20% + 置信度20%）
- 低质量数据自动推送人工复核队列

**Webhook端点**: `POST /webhook/data-ingest`

**测试数据**:
```bash
curl -X POST http://192.168.1.83:5678/webhook/data-ingest \
  -H "Content-Type: application/json" \
  -d '{
    "timestamp": "2026-01-24T10:30:00Z",
    "deviceId": "DEV001",
    "data": {
      "temperature": 45.5,
      "pressure": 101.3,
      "status": "运行中"
    }
  }'
```

---

### 2. AI数据质量检测工作流 (`02-quality-detection-workflow.json`)

**功能**: 演示三层检测架构（规则引擎 → LLM分析 → 人工复核）

**流程**:
```
数据接收 → 第1层：规则检测（快速过滤）
              ↓
          第2层：LLM检测路由
              ↓
    第3层：LLM异常分析（仅处理不确定case）
              ↓
          异常分级（高/中/低风险）
              ↓
    高风险告警 / 中风险日志 / 低风险记录
```

**特点**:
- 三层检测策略节省90%+ LLM调用成本
- 规则检测：数值范围、必填字段、时间戳有效性
- LLM检测：逻辑矛盾、上下文理解、根因分析
- 异常分级处理：高风险立即告警，中低风险记录日志

**Webhook端点**: `POST /webhook/quality-check`

**测试数据**:
```bash
# 正常数据
curl -X POST http://192.168.1.83:5678/webhook/quality-check \
  -H "Content-Type: application/json" \
  -d '{
    "timestamp": "2026-01-24T10:30:00Z",
    "deviceId": "DEV001",
    "temperature": 45.5,
    "status": "运行中",
    "power": 120
  }'

# 逻辑矛盾数据（会触发LLM检测）
curl -X POST http://192.168.1.83:5678/webhook/quality-check \
  -H "Content-Type: application/json" \
  -d '{
    "timestamp": "2026-01-24T10:30:00Z",
    "deviceId": "DEV001",
    "temperature": 45.5,
    "status": "运行中",
    "power": 0
  }'
```

---

### 3. n8n + Dify 集成示例工作流 (`03-dify-integration-example.json`)

**功能**: 演示n8n与Dify Agent的真实API集成

**流程**:
```
数据接收 → 准备Dify输入 → 调用Dify Agent API
              ↓
        解析Dify响应 → 质量评分 → 路由决策
              ↓               ↓
        保存结果      推送复核队列
```

**特点**:
- ✅ **真实的Dify API调用**（使用HTTP Request节点）
- 使用环境变量配置API endpoint和密钥
- 结构化输入/输出处理
- 基于Dify响应的智能质量评分

**Webhook端点**: `POST /webhook/dify-analysis`

**环境变量配置**（必需）:
```bash
# 在n8n的环境变量中配置
DIFY_API_BASE_URL=http://your-dify-server:5001
DIFY_API_KEY=app-xxxxxxxxxxxxxxxxxxxxxx
```

**测试数据**:
```bash
curl -X POST http://192.168.1.83:5678/webhook/dify-analysis \
  -H "Content-Type: application/json" \
  -d '{
    "query": "请分析这个设备的运行状态",
    "data": {
      "deviceId": "DEV001",
      "temperature": 85,
      "pressure": 120,
      "vibration": 0.5,
      "status": "运行中"
    },
    "user_id": "test-user"
  }'
```

**Dify API响应格式**:
```json
{
  "answer": "根据数据分析，设备运行正常...",
  "conversation_id": "abc-123",
  "message_id": "msg-456",
  "created_at": "2026-01-24T10:30:00Z",
  "metadata": {
    "usage": {
      "tokens": 150
    }
  }
}
```

---

## 🚀 导入工作流到n8n

### 方法1：通过n8n界面导入

1. 访问 http://192.168.1.83:5678/home/workflows
2. 点击右上角 **"Import from File"** 按钮
3. 选择工作流JSON文件（如 `01-data-cleaning-workflow.json`）
4. 点击 **"Import"** 确认
5. 工作流将出现在工作流列表中

### 方法2：通过n8n CLI导入（如果已安装）

```bash
# 进入工作流目录
cd /Users/brunogao/work/codes/ljwx/ljwx-docs/docs/data-platform/workflows

# 导入工作流
n8n import:workflow --input=01-data-cleaning-workflow.json
n8n import:workflow --input=02-quality-detection-workflow.json
n8n import:workflow --input=03-dify-integration-example.json
```

### 方法3：使用n8n API导入

```bash
# 使用n8n API导入工作流
curl -X POST http://192.168.1.83:5678/rest/workflows \
  -H "Content-Type: application/json" \
  -d @01-data-cleaning-workflow.json
```

---

## ⚙️ 配置指南

### 前置条件

1. **n8n已安装并运行**
   - 访问 http://192.168.1.83:5678 确认n8n可访问

2. **Dify已部署（仅用于工作流03）**
   - Dify服务地址（如 http://localhost:5001）
   - 已创建Dify应用并获取API Key

### 配置步骤

#### 工作流 01 和 02（无需额外配置）
这两个工作流使用模拟的LLM逻辑，导入后即可使用。

#### 工作流 03（需要配置Dify API）

1. **设置n8n环境变量**

   在n8n部署环境中添加环境变量：

   ```bash
   # 如果使用Docker部署
   docker run -it --rm \
     --name n8n \
     -p 5678:5678 \
     -e DIFY_API_BASE_URL=http://your-dify-server:5001 \
     -e DIFY_API_KEY=app-xxxxxxxxxxxxxxxxxxxxxx \
     -v ~/.n8n:/home/node/.n8n \
     n8nio/n8n

   # 如果使用npm部署
   export DIFY_API_BASE_URL=http://your-dify-server:5001
   export DIFY_API_KEY=app-xxxxxxxxxxxxxxxxxxxxxx
   n8n start
   ```

2. **验证环境变量**

   在n8n的代码节点中测试：
   ```javascript
   return [{
     json: {
       dify_url: $env.DIFY_API_BASE_URL,
       api_key_exists: !!$env.DIFY_API_KEY
     }
   }];
   ```

3. **激活工作流**

   - 在n8n界面中打开导入的工作流
   - 点击右上角 **"Active"** 开关激活
   - Webhook端点将自动生成

---

## 🧪 测试工作流

### 测试工作流 01（数据清洗）

```bash
# 发送有效数据
curl -X POST http://192.168.1.83:5678/webhook/data-ingest \
  -H "Content-Type: application/json" \
  -d '{
    "timestamp": "2026-01-24T10:30:00Z",
    "deviceId": "DEV001",
    "data": {
      "temperature": 45.5,
      "pressure": 101.3
    }
  }'

# 预期响应：
# {
#   "success": true,
#   "message": "数据已保存到数据库",
#   "savedAt": "2026-01-24T10:30:01Z"
# }
```

### 测试工作流 02（质量检测）

```bash
# 测试逻辑矛盾检测
curl -X POST http://192.168.1.83:5678/webhook/quality-check \
  -H "Content-Type: application/json" \
  -d '{
    "timestamp": "2026-01-24T10:30:00Z",
    "deviceId": "DEV001",
    "temperature": 85,
    "status": "运行中",
    "power": 0
  }'

# 预期：触发LLM检测，返回异常分析结果
```

### 测试工作流 03（Dify集成）

```bash
# 测试Dify API调用
curl -X POST http://192.168.1.83:5678/webhook/dify-analysis \
  -H "Content-Type: application/json" \
  -d '{
    "query": "分析设备状态",
    "data": {
      "temperature": 85,
      "pressure": 120
    }
  }'

# 预期：调用Dify API并返回AI分析结果
```

---

## 🔍 常见问题排查

### 问题1：导入后工作流无法激活

**原因**: Webhook端点冲突或端口占用

**解决方案**:
1. 检查是否有其他工作流使用相同的Webhook路径
2. 修改Webhook节点的 `path` 参数为唯一值
3. 重新激活工作流

### 问题2：工作流 03 调用Dify失败

**可能原因**:
- 环境变量未配置
- Dify服务未启动
- API Key无效

**排查步骤**:
```bash
# 1. 检查环境变量
echo $DIFY_API_BASE_URL
echo $DIFY_API_KEY

# 2. 测试Dify API连通性
curl -X POST http://your-dify-server:5001/v1/chat-messages \
  -H "Authorization: Bearer app-xxxxxxxxxxxxxxxxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "inputs": {"query": "test"},
    "response_mode": "blocking",
    "user": "test"
  }'

# 3. 查看n8n执行日志
# 在n8n界面 -> Executions 查看详细错误信息
```

### 问题3：Webhook返回404

**原因**: 工作流未激活或路径错误

**解决方案**:
1. 确认工作流已激活（右上角Active开关为绿色）
2. 检查Webhook路径是否正确
3. 在n8n界面查看 Webhook 节点的 "Test URL" 获取正确地址

---

## 📚 相关文档

- [AI编排方法论与工程实践](../ai-orchestration-best-practices.md) - 完整方法论文档
- [n8n官方文档](https://docs.n8n.io/)
- [Dify官方文档](https://docs.dify.ai/)

---

## 💡 后续扩展

基于这三个示例工作流，可以扩展的场景：

1. **智能字段映射工作流**
   - 自动推断不同数据源的字段映射关系
   - 使用Dify Agent + 知识库（RAG）

2. **异常根因分析工作流**
   - 调用Dify Agent进行复杂推理
   - 查询历史异常案例库
   - 生成根因分析报告

3. **智能文档解析工作流**
   - 上传PDF/Word文档
   - 使用Dify Workflow提取结构化信息
   - 自动入库到知识库

4. **批量数据处理工作流**
   - 定时任务触发
   - 批量读取数据
   - 并行调用LLM处理
   - 结果汇总和统计

欢迎基于这些示例进行定制和扩展！
