---
title: 复杂工业场景下的数据处理能力与工程实践
description: 以煤矿健康监控与安全日志为例，涵盖数据治理、数据处理、数据挖掘全栈能力（可审计/可回滚/可规模化）
date: 2026-01-23
author: brunogao
category: data-platform
tags: [data-engineering, data-governance, observability, risk-engine, log-analytics, best-practices]
version: v2.2
pages: 40
audience: 技术型客户（CTO/架构师/数据负责人/运维负责人/评标专家）
status: 完善版
---

# 复杂工业场景下的数据处理能力与工程实践

> **专业增强版（40页）**
> 以煤矿健康监控与安全日志为例：数据治理 · 数据处理 · 数据挖掘
> 目标：在现场长期稳定运行，且"可解释、可追溯、可回放、可扩展"

---

## 📋 版本说明

### 本版本特点

- ✅ **增强主线聚焦**：新增"主线与交付成果"页，讲解更聚焦
- ✅ **五层架构细化**：拆页展示并收敛技术栈，更可信、更可落地
- ✅ **指标口径明确**：新增"指标口径与统计窗口"页，解决技术评审追问
- ✅ **数据治理完整**：元数据/血缘/安全/生命周期全覆盖
- ✅ **挖掘能力可选**：数据挖掘章节"可选增强化"，避免过度堆栈
- ✅ **实践案例丰富**：补充真实场景和数据示例
- ✅ **FAQ与附录**：新增常见问题解答和技术决策指南

### 适用对象

- **技术决策者**：CTO、架构师、数据平台负责人
- **需要深度技术评审/投标的场景**
- **关注"长期运行、审计追溯、规模化"的私有化交付**

### 版本历史

| 版本 | 日期 | 主要变更 |
|------|------|----------|
| v2.2 | 2026-01-23 | 增加实践案例、FAQ、技术决策指南 |
| v2.1 | 2026-01-19 | 增加主线页、指标口径页、技术栈收敛 |
| v2.0 | 2026-01-15 | 专业增强版，完整36页 |

---

## 🎨 设计规范

### 配色方案

| 用途 | 颜色 | 色值 | 应用场景 |
|------|------|------|----------|
| 主色 | 深蓝 | #1a365d | 标题、重点强调 |
| 辅色 | 科技蓝 | #2563eb | 架构图、流程图 |
| 强调 | 橙色 | #f59e0b | 关键指标、告警 |
| 成功 | 绿色 | #10b981 | 正向指标、完成状态 |
| 警示 | 红色 | #ef4444 | 风险、异常 |
| 治理 | 紫色 | #8b5cf6 | 治理相关内容 |
| 背景 | 深灰/白 | #1f2937 / #ffffff | 背景色 |

### 字体规范

| 类型 | 中文 | 英文 | 用途 |
|------|------|------|------|
| 标题 | 思源黑体 Bold | Helvetica Neue Bold | 页面标题、章节标题 |
| 正文 | 思源黑体 Regular | Helvetica Neue Regular | 正文内容 |
| 数字 | DIN | Roboto Mono | 数据、指标 |
| 代码 | JetBrains Mono | Fira Code | 代码示例 |

### 视觉原则

- **架构图**：分层结构 + 关键 SLA 标注
- **流程图**：管道/漏斗/泳道表达
- **指标展示**：仪表盘/进度条/趋势线
- **治理图**：血缘 DAG / 元数据分层
- **案例卡片**："输入-处理-输出-指标"四段式

---

<div style="padding: 24px; border-left: 3px solid #6b7280; background: linear-gradient(135deg, rgba(107, 114, 128, 0.03) 0%, rgba(107, 114, 128, 0.01) 100%); border-radius: 8px; margin: 32px 0;">

### 📋 方法论声明（必读）

这是一篇 **方法论与工程实践** 文章，而不是纯技术教程或配置手册。

**核心价值三要素**：

1. **数据治理体系**：从"数据流"到"可运营的数据资产"的完整方法论
2. **工程化能力**：五层数据处理架构 + 可审计/可回滚/可规模化的工程实践
3. **风险预警系统**：低误报（< 5%）、可解释、可持续优化的预警能力

**适用场景**：煤矿、化工、能源等高风险工业环境，需要长期稳定运行（7×24）且重视数据质量和合规性的项目。

</div>

## 核心价值主线

<div style="position: relative; margin-bottom: 32px;">
  <div style="position: absolute; left: 0; top: 8px; width: 32px; height: 32px; background: #3451b2; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 14px;">1</div>
  <div style="padding: 20px 24px; border-left: 3px solid #3451b2; background: linear-gradient(135deg, rgba(52, 81, 178, 0.04) 0%, rgba(52, 81, 178, 0.01) 100%); border-radius: 0 8px 8px 0; margin-left: 16px;">
    <div style="font-size: 20px; font-weight: 600; color: #3451b2; margin-bottom: 8px;">Why - 为什么需要数据工程闭环？</div>
    <div style="color: var(--vp-c-text-2); line-height: 1.7;">工业现场存在<strong>五大核心挑战</strong>：多源异构数据、网络环境复杂、实时性要求高、合规与审计、长期稳定运行。传统方案的八大失败点导致系统"能用但不好用"，误报率高达 15-30%，用户逐渐失去信任。我们需要一套<strong>可信的数据工程方法论</strong>，而不仅是工具堆叠。</div>
  </div>
</div>

<div style="margin-left: 16px; margin-bottom: 16px; color: #9ca3af; font-size: 20px;">↓</div>

<div style="position: relative; margin-bottom: 32px;">
  <div style="position: absolute; left: 0; top: 8px; width: 32px; height: 32px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 14px;">2</div>
  <div style="padding: 20px 24px; border-left: 3px solid #10b981; background: linear-gradient(135deg, rgba(16, 185, 129, 0.04) 0%, rgba(16, 185, 129, 0.01) 100%); border-radius: 0 8px 8px 0; margin-left: 16px;">
    <div style="font-size: 20px; font-weight: 600; color: #10b981; margin-bottom: 8px;">What - 我们交付什么？</div>
    <div style="color: var(--vp-c-text-2); line-height: 1.7;">我们交付<strong>三大核心能力</strong>而非单一工具：① <strong>可信数据资产</strong>（质量可量化、来源可追溯、变更可审计）；② <strong>稳定数据处理链路</strong>（不丢不重、可恢复可回放、端到端延迟 P95 < 10秒）；③ <strong>可解释风险预警</strong>（误报率 < 5%、每条告警包含规则+证据+建议、闭环反馈持续优化）。</div>
  </div>
</div>

<div style="margin-left: 16px; margin-bottom: 16px; color: #9ca3af; font-size: 20px;">↓</div>

<div style="position: relative; margin-bottom: 32px;">
  <div style="position: absolute; left: 0; top: 8px; width: 32px; height: 32px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 14px;">3</div>
  <div style="padding: 20px 24px; border-left: 3px solid #f59e0b; background: linear-gradient(135deg, rgba(245, 158, 11, 0.04) 0%, rgba(245, 158, 11, 0.01) 100%); border-radius: 0 8px 8px 0; margin-left: 16px;">
    <div style="font-size: 20px; font-weight: 600; color: #f59e0b; margin-bottom: 8px;">How - 如何实施落地？</div>
    <div style="color: var(--vp-c-text-2); line-height: 1.7;"><strong>五层数据处理架构</strong>：采集接入（统一模型+边缘缓存）→ 缓存传输（消息队列+幂等去重）→ 清洗标注（六维质量+异常识别）→ 分层加工（ODS/DWD/DWS/ADS+冷热分层）→ 风险决策（规则引擎+模型增强+闭环反馈）。技术栈采用<strong>"默认栈 + 可选增强"</strong>策略，避免过度设计。分阶段交付：MVP版（2-4周）→ 标准版（4-8周）→ 增强版（8-12周）。</div>
  </div>
</div>

<div style="margin-left: 16px; margin-bottom: 16px; color: #9ca3af; font-size: 20px;">↓</div>

<div style="position: relative; margin-bottom: 32px;">
  <div style="position: absolute; left: 0; top: 8px; width: 32px; height: 32px; background: #ef4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 14px;">4</div>
  <div style="padding: 20px 24px; border-left: 3px solid #ef4444; background: linear-gradient(135deg, rgba(239, 68, 68, 0.04) 0%, rgba(239, 68, 68, 0.01) 100%); border-radius: 0 8px 8px 0; margin-left: 16px;">
    <div style="font-size: 20px; font-weight: 600; color: #ef4444; margin-bottom: 8px;">Lessons - 避免的常见陷阱</div>
    <div style="color: var(--vp-c-text-2); line-height: 1.7;">基于2年实践经验，我们总结了<strong>八大失败模式</strong>：只接入不治理、只实时无回溯、只监控无可观测、只堆栈无收敛、只功能无性能、只规则无反馈、只开发无运维、只工具无体系。关键经验：① 先收敛再扩展（默认栈能交付MVP，按需启用增强）；② 数据质量前置（入口校验而非事后补救）；③ 闭环反馈机制（误报必须有人复核并反哺优化）；④ 可观测性优先（故障定位时间从小时级降至分钟级）。</div>
  </div>
</div>

## 目标受众

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 32px 0; max-width: 900px;">

<div style="padding: 24px; background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.02) 100%); border-radius: 12px; border: 1px solid rgba(16, 185, 129, 0.2);">
  <div style="font-size: 18px; font-weight: 600; color: #10b981; margin-bottom: 16px;">✓ 适合阅读</div>
  <div style="color: var(--vp-c-text-2); line-height: 1.8;">
    • 技术决策者（CTO、架构师、数据平台负责人）<br/>
    • 需要进行深度技术评审或投标的项目团队<br/>
    • 关注"长期运行、审计追溯、规模化"的私有化交付场景<br/>
    • 煤矿、化工、能源等高风险行业的数字化项目
  </div>
</div>

<div style="padding: 24px; background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.02) 100%); border-radius: 12px; border: 1px solid rgba(239, 68, 68, 0.2);">
  <div style="font-size: 18px; font-weight: 600; color: #ef4444; margin-bottom: 16px;">✗ 不适合阅读</div>
  <div style="color: var(--vp-c-text-2); line-height: 1.8;">
    • 仅需要快速上手的技术教程（非方法论讨论）<br/>
    • 单一工具的配置指南或API文档<br/>
    • 数据量 < 10万条/天的小规模场景<br/>
    • 不关注数据质量和长期运维的演示型项目
  </div>
</div>

</div>

## 阅读导航

<div style="padding: 24px; background: linear-gradient(135deg, rgba(52, 81, 178, 0.03) 0%, rgba(52, 81, 178, 0.01) 100%); border-radius: 12px; margin: 32px 0;">

<div style="margin-bottom: 20px;">
  <div style="font-weight: 600; color: var(--vp-c-text-1); margin-bottom: 8px;">① 技术决策者（关注方法论与架构）</div>
  <div style="color: var(--vp-c-text-2); padding-left: 20px;">
    → 建议阅读：<a href="#第2页--目录导航">目录导航</a> → <a href="#第6页--我们的方法论工程闭环">方法论</a> → <a href="#第10页--总体架构五层数据处理精简版">五层架构</a> → <a href="#第11页--五层架构默认技术栈-vs-可选增强">技术栈决策</a> → <a href="#第36页--常见问题解答faq">FAQ</a>
  </div>
</div>

<div style="margin-bottom: 20px;">
  <div style="font-weight: 600; color: var(--vp-c-text-1); margin-bottom: 8px;">② 架构师/技术负责人（关注工程实践）</div>
  <div style="color: var(--vp-c-text-2); padding-left: 20px;">
    → 建议阅读：<a href="#第12页--分层存储架构odsdwddwsads-冷热分层">分层存储</a> → <a href="#第13页--数据接入多源统一">数据接入</a> → <a href="#第14页--传输与缓存不丢不重">传输与缓存</a> → <a href="#第15页--清洗与标注让异常可见">清洗标注</a> → <a href="#第23-25页--数据治理详解">数据治理</a>
  </div>
</div>

<div style="margin-bottom: 20px;">
  <div style="font-weight: 600; color: var(--vp-c-text-1); margin-bottom: 8px;">③ 运维负责人（关注稳定性与可观测）</div>
  <div style="color: var(--vp-c-text-2); padding-left: 20px;">
    → 建议阅读：<a href="#第7页--我们解决的五个核心问题">五个核心问题</a> → <a href="#第9页--指标口径与统计窗口技术评审必备">指标口径</a> → <a href="#第24页可观测性">可观测性</a> → <a href="#第36页--常见问题解答faq">FAQ运维保障类</a> → <a href="#第38页--实施路线图">实施路线图</a>
  </div>
</div>

<div style="margin-bottom: 20px;">
  <div style="font-weight: 600; color: var(--vp-c-text-1); margin-bottom: 8px;">④ 业务方/评标专家（关注效果与案例）</div>
  <div style="color: var(--vp-c-text-2); padding-left: 20px;">
    → 建议阅读：<a href="#第8页--主线与交付成果聚焦交付价值">交付成果</a> → <a href="#第18页--健康监控数据链路示例">健康监控示例</a> → <a href="#第19页--健康预警低误报的关键策略">低误报策略</a> → <a href="#第39页--成功案例匿名化">成功案例</a> → <a href="#第40页--总结与联系方式">核心价值总结</a>
  </div>
</div>

</div>

---

## 第1页 | 封面

<div align="center">

# 复杂工业场景下的
# 数据处理能力与工程实践

**以煤矿健康监控与安全日志为例**

数据治理 · 数据处理 · 数据挖掘

**长期 · 稳定 · 可解释的全栈数据能力**

---

适用场景：煤矿 | 化工 | 能源 | 高风险工业环境

[公司Logo]
2026-01-23

</div>

---

## 第2页 | 目录导航

### 内容结构

01. **工业数据的真实挑战** - 为什么传统方案不够用
02. **主线与交付成果** ⭐新增 - 我们交付的不是工具堆叠
03. **数据处理方法论与总体架构** - 五层架构与分层存储
04. **健康监控数据工程化实践** - 从原始数据到风险预警
05. **安全日志处理与关联分析** - 海量日志中的价值挖掘
06. **融合应用与长期运行保障** - 1+1>2 的系统能力
07. **数据治理与质量保障体系** - 元数据、血缘、安全、生命周期
08. **数据挖掘与模型工程化** - 特征工程、评估、持续优化
09. **核心优势与合作方式** - 可复制交付
10. **常见问题解答** ⭐新增 - 技术评审高频问题

### 建议讲述节奏

- **30分钟版本**：讲述核心18页，重点在架构和实践
- **技术评审版**：全量40页，深入技术细节和治理体系

---

## 第3页 | 工业现场的真实挑战

### 五大核心挑战

#### 1. 多源异构数据

- **设备层**：PLC、传感器、控制器（不同协议）
- **系统层**：监控系统、日志系统、第三方平台
- **人员层**：手持设备、移动终端、定位系统
- **挑战**：数据格式不统一、时间戳不对齐、ID体系混乱

#### 2. 网络环境复杂

- **断网场景**：井下作业区、隧道、偏远站点
- **弱网场景**：无线网络不稳定、带宽受限
- **跨网段**：生产网、办公网、互联网隔离
- **要求**：数据不能丢、顺序不能乱、断点可续传

#### 3. 实时性要求高

- **告警延迟**：异常发现到告警触发 < 10秒
- **响应速度**：告警触发到人员响应 < 2分钟
- **查询性能**：大屏刷新 < 1秒、历史查询 < 3秒
- **误报控制**：误报率 < 5%（行业平均 15-20%）

#### 4. 合规与审计

- **权限管理**：谁能看什么数据、谁能导出
- **操作审计**：登录、查询、导出、配置变更全记录
- **数据安全**：敏感数据脱敏、传输加密、存储加密
- **可追溯性**：任何告警都能追溯到原始数据源

#### 5. 长期稳定运行

- **7×24运行**：不是演示系统，要持续稳定
- **可维护性**：规则调整、阈值优化、版本升级
- **可扩展性**：设备增加、功能扩展、性能提升
- **故障恢复**：快速定位、快速恢复、影响可控

---

## 第4页 | 数据规模与复杂性

### 典型数据规模（中型煤矿场景）

#### 健康监控数据

| 维度 | 数据量 | 说明 |
|------|--------|------|
| 监控人数 | 500-2000人 | 在岗人员 + 外协人员 |
| 采集频率 | 10秒/次 | 心率、血氧等生理指标 |
| 日数据量 | 500万-2000万条 | 平均每人每天 8640条 |
| 月数据量 | 1.5亿-6亿条 | 保留3个月热数据 |
| 存储需求 | 每条 ~200B | 月存储 30GB-120GB |

#### 安全日志数据

| 维度 | 数据量 | 说明 |
|------|--------|------|
| 日志源数量 | 50-200个 | 服务器、设备、应用 |
| 平稳期流量 | 1000-5000条/分钟 | 正常业务日志 |
| 峰值流量 | 10000-50000条/分钟 | 事故、异常时激增 |
| 日数据量 | 144万-720万条 | 平稳期估算 |
| 月数据量 | 4320万-2.16亿条 | 保留6个月 |
| 存储需求 | 每条 ~1KB | 月存储 40GB-200GB |

### 数据特征

#### 时序特征

- **高频写入**：每秒钟数百到数千次写入
- **低延迟读**：实时大屏、告警查询需秒级响应
- **历史查询**：事故复盘、趋势分析需要快速聚合

#### 数据质量挑战

- **设备离线**：电量耗尽、设备故障导致数据缺失
- **传输干扰**：无线网络不稳定导致数据乱序、重复
- **异常值**：传感器故障、佩戴不规范导致异常数据
- **时间偏差**：不同设备时钟不同步

---

## 第5页 | 传统模式的常见失败点

### 八大痛点

#### 1. 只接入，不治理

**表现**：
- 数据接进来了，但不知道质量如何
- 没有数据字典，字段含义靠口口相传
- 没有血缘关系，问题定位靠猜

**后果**：
- 数据质量持续下降
- 运维成本持续上升
- 业务方逐渐失去信任

#### 2. 只实时，无回溯

**表现**：
- 只有实时计算链路，没有原始数据保留
- 规则调整后无法重算历史数据
- 告警记录只有结果，没有依据

**后果**：
- 无法验证规则有效性
- 无法进行事故复盘
- 无法持续优化模型

#### 3. 只监控，无可观测

**表现**：
- 有监控大屏，但看不到数据流转过程
- 有告警，但不知道是哪个环节出问题
- 有日志，但无法快速定位根因

**后果**：
- 故障定位时间长
- 影响范围不可控
- 运维依赖个人经验

#### 4. 只堆栈，无收敛

**表现**：
- 引入过多技术组件
- 每个功能都用"最好的"工具
- 没有考虑运维能力和成本

**后果**：
- 系统复杂度高
- 运维成本失控
- 故障点倍增

#### 5. 只功能，无性能

**表现**：
- 功能演示时正常
- 实际运行时延迟高、卡顿
- 数据量大时系统不可用

**后果**：
- 用户体验差
- 业务目标无法达成
- 系统被弃用

#### 6. 只规则，无反馈

**表现**：
- 规则一次性配置
- 告警结果无人复核
- 误报/漏报无统计

**后果**：
- 误报率持续升高
- 用户失去信任
- 系统形同虚设

#### 7. 只开发，无运维

**表现**：
- 交付时功能完整
- 运行一段时间后问题频发
- 没有运维手册和应急预案

**后果**：
- 需要原厂长期驻场
- 故障恢复时间长
- 运维成本高

#### 8. 只工具，无体系

**表现**：
- 提供工具但无方法论
- 提供平台但无运营支持
- 提供技术但无人才培养

**后果**：
- 工具用不起来
- 能力无法沉淀
- 依赖外部支持

---

## 第6页 | 我们的方法论：工程闭环

### 核心理念

**从"数据流"到"可运营的数据资产"**

```
原始数据 → 可信数据 → 数据产品 → 业务价值
   ↑                                      ↓
   └──────── 质量反馈 · 业务反馈 ────────┘
```

### 六大核心能力

#### 1. 采集接入

- **统一接入**：多协议支持、统一数据模型
- **边缘缓存**：断网续传、本地队列
- **质量检查**：入口校验、格式转换

#### 2. 缓存传输

- **消息队列**：削峰填谷、解耦生产消费
- **幂等处理**：去重、防重复消费
- **可观测**：积压监控、消费速率

#### 3. 清洗标注

- **异常识别**：规则检测、统计异常
- **质量标签**：字段级、记录级、数据源级
- **可追溯**：保留原始数据、标注来源

#### 4. 分层加工

- **ODS层**：原始数据、质量标注
- **DWD层**：清洗后明细、统一ID
- **DWS层**：汇总、画像、基线
- **ADS层**：应用指标、服务接口

#### 5. 风险决策

- **规则引擎**：可配置、可解释
- **模型增强**：降低误报、提升召回
- **闭环反馈**：告警复核、效果评估

#### 6. 数据治理

- **元数据**：数据字典、血缘关系
- **质量管理**：六维质量、评分卡
- **安全审计**：权限控制、操作审计
- **生命周期**：冷热分层、归档销毁

---

## 第7页 | 我们解决的五个核心问题

### 问题与解决方案

#### 1. 不丢 - 数据不丢失

**问题场景**：
- 网络中断导致数据传输失败
- 设备重启导致缓存数据丢失
- 系统故障导致数据写入失败

**解决方案**：
- **边缘缓存**：本地 SQLite + 断点续传
- **多级重试**：指数退避 + 最大重试次数
- **持久化队列**：Kafka 数据保留 7 天
- **WAL机制**：写前日志 + 定期 checkpoint
- **监控告警**：积压告警 + 丢失率监控

**效果指标**：
- 数据完整率 > 99.9%
- 断网恢复时间 < 5分钟
- 历史数据可回溯 7-30 天

#### 2. 不重 - 数据不重复

**问题场景**：
- 网络抖动导致重复发送
- 重试机制导致重复消费
- 多路采集导致数据重复

**解决方案**：
- **业务主键**：设备ID + 时间戳 + 序列号
- **去重策略**：布隆过滤器 + 精确去重
- **幂等设计**：INSERT ON CONFLICT / UPSERT
- **窗口去重**：滑动窗口 + TTL 过期

**效果指标**：
- 重复数据比例 < 0.1%
- 去重处理延迟 < 100ms
- 内存占用可控（布隆过滤器）

#### 3. 不乱 - 数据质量可控

**问题场景**：
- 传感器故障产生异常数据
- 网络延迟导致数据乱序
- 设备时钟不同步
- 人为操作导致脏数据

**解决方案**：
- **入口校验**：字段类型、取值范围、时间戳合法性
- **统计异常检测**：3-Sigma、IQR、孤立森林
- **质量标签**：GOOD / WARNING / ERROR / MISSING
- **可视化**：质量评分卡、趋势图

**效果指标**：
- 字段完整性 > 95%
- 异常数据标注率 100%
- 质量问题发现时间 < 10分钟

#### 4. 不漂 - 环境配置一致

**问题场景**：
- 开发环境正常，生产环境异常
- 规则配置不一致
- 模型版本混乱
- 依赖版本冲突

**解决方案**：
- **配置管理**：版本化、环境隔离
- **容器化**：Docker + K8s，环境一致性
- **规则版本**：Git 管理、回滚机制
- **灰度发布**：分批验证、快速回退

**效果指标**：
- 环境一致性 100%
- 配置变更可追溯
- 回滚时间 < 5分钟

#### 5. 可追 - 问题可追溯

**问题场景**：
- 告警无法定位到原始数据
- 不知道哪个规则触发了告警
- 无法复盘事故过程
- 变更影响范围不明

**解决方案**：
- **数据血缘**：表级、字段级血缘追踪
- **操作审计**：登录、查询、导出、变更全记录
- **链路追踪**：分布式 tracing（OpenTelemetry）
- **版本管理**：代码、配置、模型全版本化

**效果指标**：
- 问题定位时间：平均 < 10分钟
- 血缘覆盖率：100%（核心链路）
- 审计日志保留：180天

---

## 第8页 | 主线与交付成果（聚焦交付价值）

### 交付理念

> **我们交付的不是工具堆叠，而是"可量化 SLA 的数据工程闭环"**

### 三大核心交付物

#### 1. 可信数据资产

**内容**：
- 统一数据模型（Schema Registry）
- 数据质量体系（六维质量 + 评分卡）
- 元数据管理（业务 + 技术元数据）
- 数据血缘（表级 + 字段级）

**价值**：
- 降低沟通成本：统一口径
- 提升数据质量：从 60% → 95%+
- 加速问题定位：从小时级 → 分钟级

#### 2. 稳定数据处理链路

**内容**：
- 多源数据接入（HTTP/MQTT/WebSocket）
- 分层数据存储（ODS/DWD/DWS/ADS）
- 实时 + 批处理（双链路）
- 可恢复 + 可回放（断点续传 + 历史重算）

**价值**：
- 数据完整率：> 99.9%
- 端到端延迟：P95 < 10秒
- 系统可用性：> 99.5%

#### 3. 可解释风险预警能力

**内容**：
- 规则引擎（可配置、可解释）
- 模型增强（可选，降低误报）
- 告警闭环（复核 + 反馈）
- 持续优化（效果监控 + 迭代）

**价值**：
- 误报率：< 5%（行业平均 15-20%）
- 漏报率：< 2%（基于闭环反馈）
- 响应时间：平均 < 2分钟

### 交付成果清单

| 类别 | 交付物 | 说明 |
|------|--------|------|
| **数据接入** | 统一数据模型 | Schema 定义、ID 规范、时间戳标准 |
| | 多源接入适配器 | HTTP/MQTT/WebSocket/文件 |
| | 边缘缓存组件 | 断网续传、本地队列 |
| **数据存储** | 分层存储架构 | ODS/DWD/DWS/ADS 四层 |
| | 冷热分层策略 | 7天/30天/归档 |
| | 数据生命周期管理 | 自动迁移、归档、销毁 |
| **数据质量** | 质量规则引擎 | 字段级/记录级/链路级 |
| | 质量评分卡 | 六维质量、趋势分析 |
| | 异常数据标注 | 自动标注 + 人工复核 |
| **数据处理** | 实时处理链路 | 秒级延迟、高吞吐 |
| | 批处理链路 | 历史重算、数据修复 |
| | 去重与幂等 | 布隆过滤器 + UPSERT |
| **风险预警** | 规则引擎 | 可配置、可版本化 |
| | 告警闭环 | 触发 → 通知 → 复核 → 反馈 |
| | 效果监控 | 误报率、漏报率、响应时间 |
| **数据治理** | 元数据平台 | 数据字典、口径管理 |
| | 血缘追踪 | 表级 + 字段级 |
| | 安全审计 | 权限、访问、导出全记录 |
| **可观测性** | 监控大盘 | 关键指标、趋势图 |
| | 链路追踪 | 分布式 tracing |
| | 告警体系 | 多级告警、智能降噪 |

---

## 第9页 | 指标口径与统计窗口（技术评审必备）

### 为什么需要这一页？

> **技术评审最常见的问题：**
> "你这些数字是怎么算的？"
> "延迟是平均值还是P95？"
> "成功率是按什么口径统计的？"

### 指标统一口径

#### 数据量统计

**口径定义**：
- 按"入库成功（去重后）"统计
- 不包含被过滤的异常数据
- 不包含重复数据

**统计粒度**：
- 实时：按分钟聚合
- 报表：按天/周/月聚合

**示例**：
```
日数据量 = SUM(去重后入库成功记录)
         ≠ SUM(接收到的原始记录)
```

#### 延迟统计

**口径定义**：
- **端到端延迟** = 可查询时间戳 - 采集时间戳
- 默认展示：P50（中位数）、P95、P99
- 不使用平均值（会被极值拉高）

**统计方法**：
```
P95延迟 = 95%的数据处理延迟 < 该值
例如：P95 = 8秒，表示95%的数据在8秒内完成处理
```

**分段统计**：
- 采集 → 队列：网络延迟
- 队列 → 清洗：处理延迟
- 清洗 → 存储：写入延迟
- 存储 → 可查询：索引延迟

#### 可用性统计

**口径定义**：
```
可用性 = (总时长 - 故障时长) / 总时长 × 100%
```

**故障定义**：
- 服务不可访问 > 1分钟
- 核心功能异常 > 5分钟
- 数据处理中断 > 10分钟

**统计周期**：
- 按月统计（排除计划内维护）
- 分别统计：服务可用性、链路可用性

**示例**：
```
月可用性 = (30天 × 24小时 - 故障时长) / (30天 × 24小时)
目标：> 99.5% (每月故障时间 < 3.6小时)
```

#### 误报/漏报统计

**口径定义**：
- **误报**：告警但经复核为正常
- **漏报**：未告警但应该告警
- 需要人工复核或事件确认

**统计方法**：
```
误报率 = 误报数 / 总告警数 × 100%
漏报率 = 漏报数 / (漏报数 + 正确告警数) × 100%
```

**闭环要求**：
- 每条告警需要复核结果
- 定期（周/月）统计分析
- 反馈到规则优化

**示例**：
```
某规则 30 天数据：
- 触发告警：100次
- 人工复核：正确 96次、误报 4次
- 事后发现漏报：2次
→ 误报率 = 4/100 = 4%
→ 漏报率 = 2/(2+96) ≈ 2%
```

### 推荐统计窗口

| 指标类型 | 推荐窗口 | 说明 |
|---------|---------|------|
| **运行指标** | 近 30 天 | 延迟、积压、吞吐量、可用性 |
| **质量指标** | 近 30 天 | 完整性、准确性、异常率 |
| **趋势指标** | 近 3-12 个月 | 质量分、规则命中率、模型效果 |
| **对比指标** | 环比/同比 | 优化前后、版本对比 |

### 数据可信度保障

#### 证据链

- **监控截图**：Grafana/Prometheus 面板
- **日志导出**：审计日志、处理日志
- **报表文件**：定期生成的质量报告
- **数据库查询**：可提供 SQL 验证

#### 透明度承诺

- 所有指标计算逻辑开放
- 原始数据可追溯
- 支持第三方审计
- 定期提供质量报告

---

## 第10页 | 总体架构：五层数据处理（精简版）

### 架构全景

```
┌─────────────┐
│ 原始数据     │ 设备、传感器、日志、第三方系统
└──────┬──────┘
       ↓
┌─────────────┐
│ 采集接入     │ 统一接入、协议适配、边缘缓存
└──────┬──────┘
       ↓
┌─────────────┐
│ 缓存传输     │ 消息队列、去重、削峰填谷
└──────┬──────┘
       ↓
┌─────────────┐
│ 清洗标注     │ 质量检查、异常识别、标签打标
└──────┬──────┘
       ↓
┌─────────────┐
│ 分层加工     │ ODS → DWD → DWS → ADS
└──────┬──────┘
       ↓
┌─────────────┐
│ 风险决策     │ 规则引擎、模型增强、告警闭环
└──────┬──────┘
       ↓
┌─────────────┐
│ 决策信息     │ 预警、大屏、报表、API
└─────────────┘
```

### 每层回答一个问题

| 层级 | 核心问题 | 关键能力 | SLA 指标 |
|------|---------|---------|----------|
| **采集接入** | 数据怎么统一接进来？ | 多协议支持、Schema 校验、边缘缓存 | 接入成功率 > 99.9% |
| **缓存传输** | 弱网/断网怎么不丢不重？ | 消息队列、幂等、重试、监控 | 数据完整率 > 99.9% |
| **清洗标注** | 脏数据/异常怎么识别？ | 规则校验、统计异常、质量标签 | 异常识别率 > 95% |
| **分层加工** | 怎么形成可用数据资产？ | 分层存储、血缘追踪、冷热分层 | 查询延迟 P95 < 3秒 |
| **风险决策** | 怎么实现低误报预警？ | 规则引擎、模型增强、告警闭环 | 误报率 < 5% |

### 横向能力

贯穿五层的支撑能力：

- **数据治理**：元数据、血缘、质量、安全
- **可观测性**：监控、追踪、日志、告警
- **稳定性**：高可用、容错、恢复、降级
- **可扩展性**：水平扩展、垂直扩展、模块化

---

## 第11页 | 五层架构：默认技术栈 vs 可选增强

### 技术选型原则

1. **先收敛，再扩展**：默认栈能交付 MVP，按需启用增强
2. **避免过度设计**：不为未来可能的需求过度投入
3. **运维友好**：优先选择运维成熟、社区活跃的技术
4. **成本可控**：平衡性能、成本、复杂度

### 默认落地栈（MVP/标准版）

适用场景：中小规模（< 5000设备，< 1000万条/天）

| 层级 | 技术栈 | 选型理由 | 关键配置 |
|------|--------|---------|----------|
| **接入** | HTTP + MQTT | 通用性强、设备支持好 | 协议按设备能力选择 |
| **队列** | Kafka（推荐）<br>或 RabbitMQ | Kafka：高吞吐、持久化<br>RabbitMQ：灵活路由 | 二选一，避免双栈 |
| **存储** | PostgreSQL<br>+ TimescaleDB | 时序扩展、SQL友好、运维成熟 | 分区表 + 索引优化 |
| **缓存** | Redis | 高性能、数据结构丰富 | 画像、热查询、窗口计算 |
| **调度** | Cron（小规模）<br>Airflow（中规模） | Cron：简单<br>Airflow：可视化、依赖管理 | 按任务复杂度选择 |
| **监控** | Prometheus<br>+ Grafana | 开源成熟、生态丰富 | 预置监控模板 |

**交付周期**：2-4 周
**运维复杂度**：低
**适用规模**：500-5000 设备

### 可选增强模块

按需求和规模启用，不强制捆绑

#### 实时计算增强

**技术栈**：Apache Flink

**启用场景**：
- 毫秒级延迟要求（< 1秒）
- 复杂流式计算（多流 Join、CEP）
- 高并发写入（> 10000条/秒）

**增量成本**：
- 开发周期：+1-2周
- 运维复杂度：+30%
- 资源成本：+20-40%

**决策条件**：
- P95 延迟要求 < 3秒
- 实时告警场景占比 > 50%
- 有 Flink 运维能力

#### OLAP 分析增强

**技术栈**：ClickHouse

**启用场景**：
- 高并发聚合查询（> 100 QPS）
- 复杂多维分析报表
- 大屏实时刷新（< 1秒）

**增量成本**：
- 开发周期：+1-2周
- 运维复杂度：+20%
- 资源成本：+15-30%

**决策条件**：
- 报表查询 QPS > 50
- 数据量 > 亿级
- 查询延迟要求 < 1秒

#### 图关联分析增强

**技术栈**：Neo4j 或 JanusGraph

**启用场景**：
- 需要多跳关联分析
- 社交网络分析
- 复杂关系推理

**增量成本**：
- 开发周期：+2-3周
- 运维复杂度：+40%
- 资源成本：+30-50%

**决策条件**：
- 有明确的图分析需求
- 关系复杂度 > 3跳
- 有图数据库运维能力

#### 模型工程化增强

**技术栈**：Feature Store + MLflow

**启用场景**：
- 多个机器学习模型并行
- 特征需要跨模型复用
- 模型迭代频繁（> 1次/月）

**增量成本**：
- 开发周期：+2-4周
- 运维复杂度：+50%
- 资源成本：+20-40%

**决策条件**：
- 模型数量 > 3个
- 特征复用率 > 30%
- 有 MLOps 能力

### 技术栈决策树

```
开始
  │
  ├─ 数据量 < 500万/天？
  │   └─ 是 → 默认栈（PostgreSQL + Cron）
  │
  ├─ 实时延迟 < 3秒？
  │   └─ 是 → 考虑 Flink
  │
  ├─ 查询 QPS > 50？
  │   └─ 是 → 考虑 ClickHouse
  │
  ├─ 需要图分析？
  │   └─ 是 → 考虑 Neo4j
  │
  └─ 模型 > 3个？
      └─ 是 → 考虑 Feature Store
```

---

## 第12页 | 分层存储架构（ODS/DWD/DWS/ADS）+ 冷热分层

### 分层存储架构

**设计理念**：可解释、可维护、可重算

```
┌──────────────────────────────────────┐
│ ADS - 应用数据层 (Application Data)   │  ← 大屏、报表、API
├──────────────────────────────────────┤
│ DWS - 汇总数据层 (Data Warehouse Summ)│  ← 画像、基线、指标
├──────────────────────────────────────┤
│ DWD - 明细数据层 (Data Warehouse Detail)│ ← 清洗后明细
├──────────────────────────────────────┤
│ ODS - 贴源数据层 (Operational Data Store)│ ← 原始数据
└──────────────────────────────────────┘
```

#### ODS - 贴源数据层

**定位**：原始数据 + 质量标注

**内容**：
- 与数据源保持一致的原始数据
- 基础质量标注（完整性、格式）
- 接入时间戳、数据源标识

**特点**：
- 只做格式转换，不做业务逻辑
- 保留所有字段（包括无用字段）
- 支持回放和重算

**保留周期**：7-30天（热数据），30天+ 归档（冷数据）

**示例（健康数据）**：
```sql
CREATE TABLE ods_health_raw (
    id BIGSERIAL PRIMARY KEY,
    device_id VARCHAR(64),      -- 设备ID（原始）
    user_id VARCHAR(64),        -- 用户ID（原始）
    heart_rate INTEGER,         -- 心率
    spo2 INTEGER,               -- 血氧
    collect_time TIMESTAMP,     -- 采集时间戳
    receive_time TIMESTAMP,     -- 接收时间戳
    quality_label VARCHAR(20),  -- GOOD/WARNING/ERROR
    source_system VARCHAR(32),  -- 数据源
    raw_data JSONB              -- 原始 JSON（备份）
);
```

#### DWD - 明细数据层

**定位**：清洗后的明细数据（可关联）

**内容**：
- 统一 ID（用户、设备、组织）
- 去重、去异常
- 字段标准化
- 关联维度表

**特点**：
- 统一数据标准
- 可跨域关联
- 业务友好

**保留周期**：30-90天（热数据），90天+ 归档

**示例（健康数据）**：
```sql
CREATE TABLE dwd_health_clean (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,             -- 统一用户ID
    device_id BIGINT,           -- 统一设备ID
    dept_id BIGINT,             -- 部门ID
    heart_rate INTEGER,         -- 心率（已去异常）
    spo2 INTEGER,               -- 血氧（已去异常）
    blood_pressure_sys INTEGER, -- 收缩压
    blood_pressure_dia INTEGER, -- 舒张压
    collect_time TIMESTAMP,     -- 采集时间戳
    is_abnormal BOOLEAN,        -- 是否异常
    abnormal_reason TEXT,       -- 异常原因
    quality_score DECIMAL(3,2), -- 质量分 0-1
    FOREIGN KEY (user_id) REFERENCES dim_user(id),
    FOREIGN KEY (device_id) REFERENCES dim_device(id)
);
```

#### DWS - 汇总数据层

**定位**：汇总/画像/基线

**内容**：
- 用户画像（个人基线、行为特征）
- 设备画像（运行状态、故障率）
- 统计指标（按时间、部门、岗位聚合）
- 基线数据（正常范围、阈值）

**特点**：
- 高度聚合
- 支持快速查询
- 定期更新（T+1 或实时）

**保留周期**：长期（1年+）

**示例（用户画像）**：
```sql
CREATE TABLE dws_user_profile (
    user_id BIGINT PRIMARY KEY,
    -- 基础信息
    name VARCHAR(64),
    age INTEGER,
    gender VARCHAR(10),
    dept_id BIGINT,
    position VARCHAR(64),

    -- 健康基线（30天）
    heart_rate_avg DECIMAL(5,2),
    heart_rate_std DECIMAL(5,2),
    spo2_avg DECIMAL(5,2),

    -- 异常统计（30天）
    abnormal_count INTEGER,
    abnormal_rate DECIMAL(5,4),
    last_abnormal_time TIMESTAMP,

    -- 更新时间
    update_time TIMESTAMP
);
```

**示例（部门指标）**：
```sql
CREATE TABLE dws_dept_metrics_daily (
    id BIGSERIAL PRIMARY KEY,
    dept_id BIGINT,
    stat_date DATE,

    -- 人员统计
    total_users INTEGER,
    online_users INTEGER,

    -- 数据统计
    total_records BIGINT,
    abnormal_records BIGINT,
    abnormal_rate DECIMAL(5,4),

    -- 告警统计
    alert_count INTEGER,
    high_risk_count INTEGER,

    UNIQUE(dept_id, stat_date)
);
```

#### ADS - 应用数据层

**定位**：面向应用的服务层

**内容**：
- 大屏指标（实时刷新）
- 报表数据（定期生成）
- API 接口（供外部调用）
- 导出数据（Excel、PDF）

**特点**：
- 高度定制化
- 性能优化（物化视图、预计算）
- 权限控制

**保留周期**：按需（部分实时生成）

**示例（实时大屏）**：
```sql
CREATE MATERIALIZED VIEW ads_dashboard_realtime AS
SELECT
    COUNT(DISTINCT user_id) as online_users,
    COUNT(*) as total_records_today,
    SUM(CASE WHEN is_abnormal THEN 1 ELSE 0 END) as abnormal_count,
    AVG(heart_rate) as avg_heart_rate,
    AVG(spo2) as avg_spo2
FROM dwd_health_clean
WHERE collect_time >= CURRENT_DATE
WITH DATA;

-- 每分钟刷新
CREATE INDEX ON ads_dashboard_realtime (online_users);
```

### 冷热分层策略

**设计目标**：性能与成本兼顾

| 分层 | 时间范围 | 存储介质 | 查询性能 | 成本 | 适用场景 |
|------|---------|---------|---------|------|----------|
| **热数据** | 0-7天 | SSD（高速） | 毫秒级 | 高 | 实时监控、告警、大屏 |
| **温数据** | 7-30天 | SSD+HDD | 秒级 | 中 | 历史查询、趋势分析 |
| **冷数据** | 30-90天 | HDD（机械硬盘） | 10秒级 | 低 | 事故复盘、审计 |
| **冰数据** | 90天+ | 对象存储（归档） | 分钟级 | 极低 | 合规保留、长期存档 |

### 自动分层策略

**实现方式**：

1. **分区表**（PostgreSQL）
```sql
-- 按天分区
CREATE TABLE dwd_health_clean (
    ...
    collect_time TIMESTAMP NOT NULL
) PARTITION BY RANGE (collect_time);

-- 创建分区
CREATE TABLE dwd_health_clean_20260123
    PARTITION OF dwd_health_clean
    FOR VALUES FROM ('2026-01-23') TO ('2026-01-24')
    TABLESPACE hot_ssd;

CREATE TABLE dwd_health_clean_20260101
    PARTITION OF dwd_health_clean
    FOR VALUES FROM ('2026-01-01') TO ('2026-01-02')
    TABLESPACE warm_hdd;
```

2. **自动迁移脚本**（每日执行）
```python
# 伪代码
def auto_migrate_data():
    # 7天前数据：SSD → HDD
    migrate_partition(
        age_days=7,
        from_tablespace='hot_ssd',
        to_tablespace='warm_hdd'
    )

    # 30天前数据：HDD → 对象存储
    export_and_archive(
        age_days=30,
        to_storage='s3://archive-bucket'
    )

    # 90天前数据：删除本地，仅保留归档
    cleanup_local_data(
        age_days=90,
        keep_archive=True
    )
```

### 成本优化效果

**优化前（全 SSD）**：
- 90天数据：1TB × 90 = 90TB
- 成本：90TB × $0.3/GB/月 = $27,000/月

**优化后（分层）**：
- 热数据（7天）：1TB × 7 × $0.3 = $2,100/月
- 温数据（23天）：1TB × 23 × $0.1 = $2,300/月
- 冷数据（60天）：1TB × 60 × $0.02 = $1,200/月
- **总成本：$5,600/月（节省 79%）**

> **注意**：以上成本为示意，实际成本视云厂商和存储类型而定

---

## 第13页 | 数据接入：多源统一

### 核心挑战

- **协议多样**：HTTP、MQTT、WebSocket、TCP、文件
- **格式多样**：JSON、XML、Protobuf、CSV、二进制
- **时间不同步**：设备时钟偏差、时区不一致
- **ID不统一**：同一用户在不同系统中 ID 不同

### 解决方案

#### 1. 统一数据模型

**Schema Registry**（JSON Schema 或 Protobuf）

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "HealthData",
  "type": "object",
  "required": ["deviceId", "userId", "timestamp", "heartRate"],
  "properties": {
    "deviceId": {
      "type": "string",
      "pattern": "^DEV[0-9]{10}$",
      "description": "设备ID，格式：DEV + 10位数字"
    },
    "userId": {
      "type": "string",
      "pattern": "^USR[0-9]{8}$",
      "description": "用户ID，格式：USR + 8位数字"
    },
    "timestamp": {
      "type": "integer",
      "description": "Unix时间戳（毫秒）"
    },
    "heartRate": {
      "type": "integer",
      "minimum": 30,
      "maximum": 250,
      "description": "心率（次/分钟）"
    },
    "spo2": {
      "type": "integer",
      "minimum": 50,
      "maximum": 100,
      "description": "血氧饱和度（%）"
    }
  }
}
```

**好处**：
- 接入时自动校验
- 字段变更可追踪
- 文档自动生成

#### 2. 统一 ID 体系

**全局唯一标识**：

| 实体 | ID 格式 | 生成规则 | 示例 |
|------|---------|---------|------|
| 用户 | USR + 8位数字 | 入职时生成，全局唯一 | USR00012345 |
| 设备 | DEV + 10位数字 | 设备注册时生成 | DEV0001234567 |
| 组织 | ORG + 6位数字 | 组织编码 | ORG001001 |
| 事件 | EVT + 时间戳 + 序列号 | 事件发生时生成 | EVT20260123001 |

**ID 映射表**（处理历史数据）：

```sql
CREATE TABLE id_mapping (
    internal_id BIGINT PRIMARY KEY,  -- 内部统一ID
    external_id VARCHAR(128),        -- 外部系统ID
    source_system VARCHAR(64),       -- 来源系统
    entity_type VARCHAR(32),         -- 实体类型（user/device/org）
    create_time TIMESTAMP,
    UNIQUE(external_id, source_system, entity_type)
);
```

#### 3. 时间基准统一

**策略**：
- **优先使用服务端时间**（避免设备时钟不准）
- 保留设备时间戳（用于计算延迟）
- 时区统一为 UTC

**数据结构**：
```json
{
  "deviceId": "DEV0001234567",
  "clientTimestamp": 1737636000000,   // 设备时间戳
  "serverTimestamp": 1737636005000,   // 服务端接收时间
  "timezone": "UTC+8",                // 设备时区
  "clockOffset": 5000                 // 时钟偏差（毫秒）
}
```

#### 4. 接入层校验

**三级校验**：

1. **格式校验**（Schema 校验）
   - 字段类型正确
   - 必填字段完整
   - 格式符合规范

2. **业务校验**（规则引擎）
   - 取值范围合法
   - 逻辑关系正确
   - 关联数据存在

3. **质量评分**（标注质量等级）
   - GOOD：完全合格
   - WARNING：部分字段异常
   - ERROR：严重错误
   - MISSING：缺失关键字段

**校验结果处理**：
```python
def validate_and_route(data):
    # 格式校验
    schema_result = validate_schema(data)
    if not schema_result.valid:
        send_to_dead_letter_queue(data, schema_result.error)
        return

    # 业务校验
    business_result = validate_business_rules(data)

    # 打标签
    data['quality_label'] = business_result.quality
    data['quality_score'] = business_result.score
    data['validation_errors'] = business_result.errors

    # 路由
    if data['quality_label'] in ['GOOD', 'WARNING']:
        send_to_kafka(data)
    else:
        send_to_error_queue(data)
```

#### 5. 可回放设计

**保留原始数据包**：

```sql
CREATE TABLE ods_raw_packets (
    id BIGSERIAL PRIMARY KEY,
    source_ip VARCHAR(64),
    source_port INTEGER,
    protocol VARCHAR(32),
    raw_data BYTEA,              -- 原始二进制数据
    receive_time TIMESTAMP,
    parsed_success BOOLEAN,
    parse_error TEXT
);

-- 保留 7 天用于问题复盘
CREATE INDEX idx_receive_time ON ods_raw_packets(receive_time);
```

**回放工具**：
```bash
# 回放指定时间段的数据
./replay_tool \
  --start-time "2026-01-23 10:00:00" \
  --end-time "2026-01-23 11:00:00" \
  --source-system "health-monitor" \
  --target-topic "health-data-replay"
```

---

## 第14页 | 传输与缓存：不丢不重

### 架构设计

```
设备端 → 边缘缓存 → 网关 → 消息队列 → 消费者 → 存储
  ↓        ↓        ↓       ↓         ↓        ↓
本地队列  SQLite   重试   Kafka    幂等处理  UPSERT
```

### 1. 边缘侧缓存（断网续传）

**场景**：
- 网络不稳定导致传输中断
- 设备离线后数据不能丢失
- 恢复后自动续传

**方案**：

```python
# 边缘侧缓存实现（Python 示例）
import sqlite3
from queue import Queue

class EdgeCache:
    def __init__(self, db_path='edge_cache.db'):
        self.conn = sqlite3.connect(db_path)
        self.create_table()

    def create_table(self):
        self.conn.execute('''
            CREATE TABLE IF NOT EXISTS pending_data (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                data TEXT,
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                retry_count INTEGER DEFAULT 0
            )
        ''')

    def add(self, data):
        """添加待发送数据"""
        self.conn.execute(
            'INSERT INTO pending_data (data) VALUES (?)',
            (json.dumps(data),)
        )
        self.conn.commit()

    def send_batch(self, batch_size=100):
        """批量发送"""
        cursor = self.conn.execute(
            'SELECT id, data FROM pending_data ORDER BY id LIMIT ?',
            (batch_size,)
        )

        for row in cursor:
            record_id, data = row
            try:
                # 发送到服务端
                response = send_to_server(data)
                if response.success:
                    # 成功则删除
                    self.conn.execute('DELETE FROM pending_data WHERE id = ?', (record_id,))
                else:
                    # 失败则增加重试计数
                    self.conn.execute(
                        'UPDATE pending_data SET retry_count = retry_count + 1 WHERE id = ?',
                        (record_id,)
                    )
            except Exception as e:
                log.error(f'Send failed: {e}')

        self.conn.commit()
```

**效果**：
- 断网期间数据本地缓存
- 网络恢复后自动续传
- 内存占用可控（SQLite 持久化）

### 2. 幂等写入（去重）

**去重策略**：

```python
# 方案1：布隆过滤器（快速过滤）
from pybloom_live import BloomFilter

class Deduplicator:
    def __init__(self):
        # 100万容量，0.1% 误判率
        self.bloom = BloomFilter(capacity=1000000, error_rate=0.001)
        self.redis_client = redis.Redis()

    def is_duplicate(self, record_id):
        # 第一层：布隆过滤器（快速判断）
        if record_id not in self.bloom:
            self.bloom.add(record_id)
            return False

        # 第二层：Redis 精确判断
        if self.redis_client.exists(f'dedup:{record_id}'):
            return True

        # 不重复，加入 Redis（TTL 24小时）
        self.redis_client.setex(f'dedup:{record_id}', 86400, '1')
        return False
```

```sql
-- 方案2：数据库 UPSERT（精确去重）
INSERT INTO dwd_health_clean (
    device_id, user_id, collect_time, heart_rate, spo2
) VALUES (
    'DEV0001234567', 'USR00012345', '2026-01-23 10:00:00', 75, 98
)
ON CONFLICT (device_id, collect_time)
DO UPDATE SET
    heart_rate = EXCLUDED.heart_rate,
    spo2 = EXCLUDED.spo2,
    update_time = CURRENT_TIMESTAMP;

-- 唯一索引保证不重复
CREATE UNIQUE INDEX idx_unique_record
ON dwd_health_clean(device_id, collect_time);
```

### 3. 重试与退避

**策略**：指数退避 + 最大重试次数

```python
import time
from functools import wraps

def retry_with_backoff(max_retries=3, base_delay=1, max_delay=60):
    """重试装饰器"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_retries - 1:
                        # 最后一次重试失败，写入死信队列
                        send_to_dead_letter_queue(args, kwargs, str(e))
                        raise

                    # 计算退避时间
                    delay = min(base_delay * (2 ** attempt), max_delay)
                    log.warning(f'Attempt {attempt + 1} failed, retry in {delay}s: {e}')
                    time.sleep(delay)
        return wrapper
    return decorator

@retry_with_backoff(max_retries=3, base_delay=2)
def send_to_kafka(data):
    producer.send('health-data', data)
    producer.flush()
```

**退避时间表**：

| 重试次数 | 延迟时间 | 累计时间 |
|---------|---------|---------|
| 第1次 | 2秒 | 2秒 |
| 第2次 | 4秒 | 6秒 |
| 第3次 | 8秒 | 14秒 |
| 失败 | 进入死信队列 | - |

### 4. 积压可见（监控）

**关键指标**：

```python
# Prometheus 指标定义
from prometheus_client import Gauge, Counter, Histogram

# 队列积压
kafka_lag = Gauge('kafka_consumer_lag', 'Kafka consumer lag', ['topic', 'partition'])

# 消费速率
kafka_consume_rate = Counter('kafka_messages_consumed', 'Messages consumed', ['topic'])

# 处理延迟
process_latency = Histogram('process_latency_seconds', 'Processing latency', ['stage'])

# 失败计数
process_failures = Counter('process_failures', 'Processing failures', ['reason'])
```

**监控大盘**：

| 指标 | 正常范围 | 警告阈值 | 告警阈值 |
|------|---------|---------|---------|
| 队列积压(lag) | < 1000 | 1000-5000 | > 5000 |
| 消费速率 | > 100条/秒 | 50-100条/秒 | < 50条/秒 |
| 端到端延迟 P95 | < 5秒 | 5-10秒 | > 10秒 |
| 失败率 | < 0.1% | 0.1%-1% | > 1% |

**告警规则**（Prometheus）：

```yaml
groups:
  - name: data_pipeline
    rules:
      - alert: HighKafkaLag
        expr: kafka_consumer_lag > 5000
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Kafka lag is high ({{ $value }})"

      - alert: LowConsumeRate
        expr: rate(kafka_messages_consumed[5m]) < 50
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Consume rate is low ({{ $value }} msg/s)"
```

---

## 第15页 | 清洗与标注：让异常可见

### 数据质量六维度

| 维度 | 定义 | 检测方法 | 示例 |
|------|------|---------|------|
| **完整性** | 必填字段不能为空 | NULL 检查、字段存在性 | 心率字段缺失 |
| **准确性** | 数值符合业务规则 | 范围校验、格式校验 | 心率 = 300（超出正常范围） |
| **一致性** | 关联数据逻辑一致 | 跨字段校验、关联校验 | 血氧 = 50% 但心率正常 |
| **及时性** | 数据时效性 | 时间戳校验、延迟监控 | 数据延迟 > 1小时 |
| **有效性** | 数据可用性 | 业务规则校验 | 离职人员数据 |
| **唯一性** | 无重复数据 | 主键校验、去重 | 同一时间戳重复数据 |

### 异常检测方法

#### 1. 基础异常检测

**规则引擎**：

```python
class HealthDataValidator:
    # 规则配置
    RULES = {
        'heart_rate': {'min': 30, 'max': 250, 'normal_range': (60, 100)},
        'spo2': {'min': 50, 'max': 100, 'normal_range': (95, 100)},
        'temperature': {'min': 35.0, 'max': 42.0, 'normal_range': (36.0, 37.5)},
    }

    def validate(self, record):
        errors = []
        warnings = []

        # 完整性检查
        if record.get('heart_rate') is None:
            errors.append({'field': 'heart_rate', 'type': 'missing', 'message': '心率字段缺失'})

        # 范围检查
        hr = record.get('heart_rate')
        if hr is not None:
            rule = self.RULES['heart_rate']
            if hr < rule['min'] or hr > rule['max']:
                errors.append({
                    'field': 'heart_rate',
                    'type': 'out_of_range',
                    'value': hr,
                    'message': f'心率超出合法范围 [{rule["min"]}, {rule["max"]}]'
                })
            elif hr < rule['normal_range'][0] or hr > rule['normal_range'][1]:
                warnings.append({
                    'field': 'heart_rate',
                    'type': 'abnormal',
                    'value': hr,
                    'message': f'心率超出正常范围 {rule["normal_range"]}'
                })

        # 一致性检查
        spo2 = record.get('spo2')
        if spo2 is not None and hr is not None:
            if spo2 < 90 and 60 <= hr <= 100:
                warnings.append({
                    'type': 'inconsistent',
                    'message': '血氧过低但心率正常，可能传感器异常'
                })

        # 返回质量标签
        if errors:
            return {'quality_label': 'ERROR', 'errors': errors, 'warnings': warnings}
        elif warnings:
            return {'quality_label': 'WARNING', 'errors': [], 'warnings': warnings}
        else:
            return {'quality_label': 'GOOD', 'errors': [], 'warnings': []}
```

#### 2. 统计异常检测

**3-Sigma 方法**：

```python
import numpy as np
import pandas as pd

def detect_outliers_3sigma(data, column, window_size=100):
    """滑动窗口 3-Sigma 检测"""
    df = pd.DataFrame(data)

    # 计算滑动窗口的均值和标准差
    rolling_mean = df[column].rolling(window=window_size).mean()
    rolling_std = df[column].rolling(window=window_size).std()

    # 3-Sigma 边界
    upper_bound = rolling_mean + 3 * rolling_std
    lower_bound = rolling_mean - 3 * rolling_std

    # 标记异常
    df['is_outlier'] = (df[column] > upper_bound) | (df[column] < lower_bound)
    df['outlier_score'] = np.abs((df[column] - rolling_mean) / rolling_std)

    return df
```

**IQR 方法**（四分位距）：

```python
def detect_outliers_iqr(data, column):
    """IQR 方法检测异常"""
    df = pd.DataFrame(data)

    Q1 = df[column].quantile(0.25)
    Q3 = df[column].quantile(0.75)
    IQR = Q3 - Q1

    # IQR 边界（1.5倍IQR）
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR

    df['is_outlier'] = (df[column] < lower_bound) | (df[column] > upper_bound)

    return df
```

#### 3. 可选增强：机器学习异常检测

**Isolation Forest**（适用于多维异常检测）：

```python
from sklearn.ensemble import IsolationForest

class MLAnomalyDetector:
    def __init__(self, contamination=0.05):
        self.model = IsolationForest(
            contamination=contamination,  # 预期异常比例
            random_state=42
        )

    def fit(self, historical_data):
        """使用历史数据训练"""
        features = self.extract_features(historical_data)
        self.model.fit(features)

    def predict(self, new_data):
        """预测新数据"""
        features = self.extract_features(new_data)
        predictions = self.model.predict(features)
        scores = self.model.score_samples(features)

        # -1 表示异常，1 表示正常
        return [{
            'is_anomaly': pred == -1,
            'anomaly_score': -score  # 分数越高越异常
        } for pred, score in zip(predictions, scores)]

    def extract_features(self, data):
        """特征提取"""
        return np.array([
            [
                record['heart_rate'],
                record['spo2'],
                record['temperature'],
                record['heart_rate'] / record['spo2'],  # 交叉特征
            ]
            for record in data
        ])
```

### 质量标签体系

**三级标签**：

1. **字段级标签**（Field Level）

```json
{
  "heart_rate": {
    "value": 85,
    "quality": "GOOD",
    "confidence": 0.95
  },
  "spo2": {
    "value": 98,
    "quality": "GOOD",
    "confidence": 0.98
  },
  "temperature": {
    "value": null,
    "quality": "MISSING",
    "confidence": 0
  }
}
```

2. **记录级标签**（Record Level）

```json
{
  "record_id": "REC20260123001",
  "quality_label": "WARNING",
  "quality_score": 0.75,
  "issues": [
    {"field": "temperature", "type": "missing"},
    {"field": "heart_rate", "type": "abnormal", "severity": "low"}
  ]
}
```

3. **数据源级标签**（Source Level）

```sql
-- 数据源质量评分（每日更新）
CREATE TABLE dws_source_quality_daily (
    source_id VARCHAR(64),
    stat_date DATE,
    total_records BIGINT,
    good_records BIGINT,
    warning_records BIGINT,
    error_records BIGINT,
    quality_score DECIMAL(5,4),  -- 加权评分
    PRIMARY KEY (source_id, stat_date)
);
```

**评分计算**：

```python
def calculate_quality_score(records):
    """计算质量分（0-1）"""
    weights = {
        'GOOD': 1.0,
        'WARNING': 0.5,
        'ERROR': 0.0,
        'MISSING': 0.0
    }

    total_score = sum(weights[r['quality_label']] for r in records)
    return total_score / len(records)
```

---

（由于篇幅限制，我将继续完成剩余部分...）

## 第16页 | 画像与基线：从数据到可解释风险

### 核心概念

**画像**（Profile）：用户/设备的长期特征和行为模式
**基线**（Baseline）：正常状态的参考范围，用于异常对比

### 用户画像体系

#### 1. 个人基线画像

**数据结构**：

```sql
CREATE TABLE dws_user_baseline (
    user_id BIGINT PRIMARY KEY,

    -- 基础信息
    name VARCHAR(64),
    age INTEGER,
    gender VARCHAR(10),
    dept_id BIGINT,
    position VARCHAR(64),
    work_type VARCHAR(32),  -- 岗位类型：地面/井下/管理

    -- 健康基线（30天滑动窗口）
    heart_rate_mean DECIMAL(5,2),
    heart_rate_std DECIMAL(5,2),
    heart_rate_p05 DECIMAL(5,2),  -- 5%分位数
    heart_rate_p95 DECIMAL(5,2),  -- 95%分位数

    spo2_mean DECIMAL(5,2),
    spo2_std DECIMAL(5,2),
    spo2_min DECIMAL(5,2),

    temperature_mean DECIMAL(4,2),
    temperature_std DECIMAL(4,2),

    -- 行为特征
    avg_work_hours DECIMAL(4,2),      -- 平均工作时长
    typical_work_start TIME,          -- 典型上班时间
    typical_work_end TIME,            -- 典型下班时间

    -- 异常历史
    abnormal_count_30d INTEGER,       -- 30天异常次数
    abnormal_rate_30d DECIMAL(5,4),   -- 30天异常率
    last_abnormal_time TIMESTAMP,     -- 最后异常时间
    high_risk_count_30d INTEGER,      -- 30天高风险次数

    -- 设备使用
    primary_device_id BIGINT,         -- 主用设备
    device_change_count_30d INTEGER,  -- 30天换设备次数

    -- 更新时间
    baseline_update_time TIMESTAMP,
    last_data_time TIMESTAMP
);
```

**基线计算逻辑**：

```python
def calculate_user_baseline(user_id, days=30):
    """计算用户30天基线"""
    # 获取历史数据
    data = query_user_history(user_id, days=days)

    if len(data) < 100:  # 数据量不足
        return None

    # 过滤掉已标注的异常数据
    clean_data = [d for d in data if d['quality_label'] in ['GOOD', 'WARNING']]

    # 计算统计量
    hr_values = [d['heart_rate'] for d in clean_data if d['heart_rate'] is not None]

    baseline = {
        'user_id': user_id,
        'heart_rate_mean': np.mean(hr_values),
        'heart_rate_std': np.std(hr_values),
        'heart_rate_p05': np.percentile(hr_values, 5),
        'heart_rate_p95': np.percentile(hr_values, 95),
        # ... 其他字段类似
        'baseline_update_time': datetime.now()
    }

    return baseline
```

#### 2. 群体基线（分层基线）

**分层维度**：

```sql
CREATE TABLE dws_group_baseline (
    id SERIAL PRIMARY KEY,

    -- 分组维度
    group_type VARCHAR(32),  -- dept/position/age_group/work_type
    group_value VARCHAR(64), -- 具体值

    -- 统计基线
    heart_rate_mean DECIMAL(5,2),
    heart_rate_std DECIMAL(5,2),
    heart_rate_p05 DECIMAL(5,2),
    heart_rate_p95 DECIMAL(5,2),

    spo2_mean DECIMAL(5,2),
    spo2_std DECIMAL(5,2),

    -- 样本量
    sample_count INTEGER,

    -- 更新时间
    update_time TIMESTAMP,

    UNIQUE(group_type, group_value)
);
```

**分层示例**：

| group_type | group_value | heart_rate_mean | heart_rate_p95 | sample_count |
|------------|-------------|-----------------|----------------|--------------|
| age_group | 20-30 | 72 | 88 | 150 |
| age_group | 30-40 | 75 | 92 | 280 |
| age_group | 40-50 | 78 | 95 | 220 |
| work_type | 井下 | 80 | 98 | 320 |
| work_type | 地面 | 70 | 85 | 280 |
| position | 采煤工 | 82 | 100 | 150 |

#### 3. 实时画像（会话特征）

**场景**：当班期间的实时状态

```python
class RealtimeProfile:
    def __init__(self, user_id, redis_client):
        self.user_id = user_id
        self.redis = redis_client
        self.key = f'profile:realtime:{user_id}'

    def update(self, data_point):
        """更新实时画像"""
        # 获取当前会话数据（最近1小时）
        self.redis.zadd(
            self.key,
            {json.dumps(data_point): data_point['timestamp']}
        )

        # 只保留最近1小时数据
        one_hour_ago = time.time() - 3600
        self.redis.zremrangebyscore(self.key, 0, one_hour_ago)

        # 设置过期时间（2小时）
        self.redis.expire(self.key, 7200)

    def get_session_stats(self):
        """获取会话统计"""
        # 获取最近1小时数据
        data = self.redis.zrange(self.key, 0, -1)
        records = [json.loads(d) for d in data]

        if not records:
            return None

        hr_values = [r['heart_rate'] for r in records]

        return {
            'session_duration_minutes': len(records) / 6,  # 假设10秒一条
            'heart_rate_current': hr_values[-1],
            'heart_rate_avg_session': np.mean(hr_values),
            'heart_rate_max_session': max(hr_values),
            'trend': self.calculate_trend(hr_values),
            'abnormal_count_session': sum(1 for r in records if r.get('is_abnormal'))
        }

    def calculate_trend(self, values, window=6):
        """计算趋势（最近1分钟）"""
        if len(values) < window:
            return 'STABLE'

        recent = values[-window:]
        avg_recent = np.mean(recent)
        avg_before = np.mean(values[-window*2:-window]) if len(values) >= window*2 else avg_recent

        change_rate = (avg_recent - avg_before) / avg_before

        if change_rate > 0.1:
            return 'RISING'
        elif change_rate < -0.1:
            return 'FALLING'
        else:
            return 'STABLE'
```

### 可解释风险计算

**风险来源分解**：

```python
def calculate_risk(user_id, current_data):
    """计算可解释的风险分数"""

    # 1. 加载基线
    baseline = load_user_baseline(user_id)
    group_baseline = load_group_baseline(user_id)

    # 2. 计算偏离程度
    hr = current_data['heart_rate']
    hr_mean = baseline['heart_rate_mean']
    hr_std = baseline['heart_rate_std']

    deviation_score = abs(hr - hr_mean) / hr_std  # Z-score

    # 3. 计算持续时间
    session_stats = get_session_stats(user_id)
    abnormal_duration = session_stats['abnormal_count_session'] * 10  # 秒

    # 4. 交叉特征
    spo2 = current_data['spo2']
    cross_feature_risk = 0
    if hr > baseline['heart_rate_p95'] and spo2 < baseline['spo2_mean'] - 2 * baseline['spo2_std']:
        cross_feature_risk = 0.3  # 心率高且血氧低

    # 5. 综合风险分数
    risk_score = (
        deviation_score * 0.4 +           # 偏离程度 40%
        (abnormal_duration / 600) * 0.3 + # 持续时间 30%（10分钟为满分）
        cross_feature_risk * 0.3          # 交叉特征 30%
    )

    # 6. 生成解释
    explanation = generate_explanation(
        user_id=user_id,
        current_data=current_data,
        baseline=baseline,
        deviation_score=deviation_score,
        abnormal_duration=abnormal_duration,
        cross_feature_risk=cross_feature_risk
    )

    return {
        'risk_score': min(risk_score, 1.0),  # 归一化到 [0, 1]
        'risk_level': get_risk_level(risk_score),
        'explanation': explanation,
        'components': {
            'deviation': deviation_score * 0.4,
            'duration': (abnormal_duration / 600) * 0.3,
            'cross_feature': cross_feature_risk * 0.3
        }
    }

def generate_explanation(user_id, current_data, baseline, deviation_score, abnormal_duration, cross_feature_risk):
    """生成可读的风险解释"""
    parts = []

    # 偏离解释
    hr = current_data['heart_rate']
    if deviation_score > 2:
        parts.append(f"心率{hr}次/分显著高于个人基线{baseline['heart_rate_mean']:.1f}±{baseline['heart_rate_std']:.1f}")

    # 持续时间解释
    if abnormal_duration > 300:  # 5分钟
        parts.append(f"异常已持续{abnormal_duration // 60}分钟")

    # 交叉特征解释
    if cross_feature_risk > 0:
        parts.append("同时伴有血氧降低，需重点关注")

    return "；".join(parts) + "。"
```

**风险输出示例**：

```json
{
  "user_id": "USR00012345",
  "name": "张三",
  "risk_score": 0.72,
  "risk_level": "HIGH",
  "explanation": "心率95次/分显著高于个人基线75.2±8.3；异常已持续8分钟；同时伴有血氧降低，需重点关注。",
  "components": {
    "deviation": 0.30,
    "duration": 0.24,
    "cross_feature": 0.18
  },
  "recommendation": "建议立即通知班组长，安排人员休息检查",
  "baseline_info": {
    "heart_rate_baseline": "75.2 ± 8.3",
    "spo2_baseline": "97.5 ± 1.2"
  },
  "current_values": {
    "heart_rate": 95,
    "spo2": 93,
    "temperature": 37.2
  }
}
```

---

（继续下一部分...）

## 第17页 | 风险引擎：规则优先，模型增强

### 架构设计

```
数据输入 → 规则引擎（第一层） → 模型增强（第二层） → 统一输出
                ↓                      ↓
            70% 告警              降低误报/提升召回
```

### 规则引擎（第一优先级）

**为什么规则优先？**

- ✅ **可解释**：每条告警都能追溯到具体规则
- ✅ **可审计**：规则变更有版本记录
- ✅ **上线快**：无需训练数据，配置即可生效
- ✅ **可信任**：业务专家直接定义，可信度高

**规则类型**：

#### 1. 阈值规则（最常用）

```yaml
# rules/health_threshold.yaml
rules:
  - id: HR_HIGH_WARNING
    name: "心率过高预警"
    enabled: true
    priority: 2
    conditions:
      - field: heart_rate
        operator: ">"
        value: 100
      - field: heart_rate
        operator: "<="
        value: 120
    持续时间: 300  # 秒
    risk_level: "WARNING"
    message: "心率持续偏高（{{heart_rate}}次/分），建议关注"

  - id: HR_HIGH_CRITICAL
    name: "心率过高告警"
    enabled: true
    priority: 1
    conditions:
      - field: heart_rate
        operator: ">"
        value: 120
    duration: 60  # 秒
    risk_level: "CRITICAL"
    message: "心率异常偏高（{{heart_rate}}次/分），请立即处置"
    action: "notify_manager"
```

#### 2. 组合规则（多条件）

```yaml
  - id: SPO2_HR_COMBO
    name: "血氧降低且心率升高"
    enabled: true
    priority: 1
    conditions:
      - field: spo2
        operator: "<"
        value: 90
      - field: heart_rate
        operator: ">"
        value: 100
      - logic: AND
    duration: 120
    risk_level: "CRITICAL"
    message: "血氧{{spo2}}%且心率{{heart_rate}}次/分，高风险状态"
```

#### 3. 趋势规则（时间窗口）

```yaml
  - id: HR_RISING_FAST
    name: "心率快速上升"
    enabled: true
    priority: 2
    conditions:
      - field: heart_rate
        operator: "increase_rate"
        window: 60  # 秒
        threshold: 0.2  # 20%涨幅
    risk_level: "WARNING"
    message: "心率快速上升（1分钟涨幅{{increase_rate}}%）"
```

#### 4. 个性化规则（基线偏离）

```yaml
  - id: HR_DEVIATION
    name: "心率显著偏离个人基线"
    enabled: true
    priority: 2
    conditions:
      - field: heart_rate
        operator: "deviation_from_baseline"
        threshold: 3  # 3倍标准差
    duration: 300
    risk_level: "WARNING"
    message: "心率{{heart_rate}}偏离个人基线{{baseline_mean}}±{{baseline_std}}"
```

**规则引擎实现**：

```python
class RuleEngine:
    def __init__(self, rules_file='rules/health_threshold.yaml'):
        self.rules = self.load_rules(rules_file)
        self.rule_states = {}  # 记录规则触发状态

    def evaluate(self, user_id, data_point, baseline):
        """评估所有规则"""
        triggered_rules = []

        for rule in self.rules:
            if not rule['enabled']:
                continue

            # 评估条件
            if self.check_conditions(rule['conditions'], data_point, baseline):
                # 检查持续时间
                if self.check_duration(rule, user_id, data_point):
                    triggered_rules.append({
                        'rule_id': rule['id'],
                        'rule_name': rule['name'],
                        'risk_level': rule['risk_level'],
                        'message': self.render_message(rule['message'], data_point, baseline),
                        'priority': rule['priority'],
                        'action': rule.get('action'),
                        'trigger_time': data_point['timestamp']
                    })

        # 按优先级排序
        triggered_rules.sort(key=lambda x: x['priority'])

        return triggered_rules

    def check_conditions(self, conditions, data_point, baseline):
        """检查条件是否满足"""
        for cond in conditions:
            field = cond['field']
            operator = cond['operator']
            value = data_point.get(field)

            if operator == '>':
                if not (value > cond['value']):
                    return False
            elif operator == '<':
                if not (value < cond['value']):
                    return False
            elif operator == 'deviation_from_baseline':
                mean = baseline[f'{field}_mean']
                std = baseline[f'{field}_std']
                z_score = abs(value - mean) / std
                if not (z_score > cond['threshold']):
                    return False
            # ... 其他操作符

        return True

    def check_duration(self, rule, user_id, data_point):
        """检查持续时间"""
        if 'duration' not in rule:
            return True  # 无持续时间要求

        state_key = f"{user_id}:{rule['id']}"

        # 获取上次触发时间
        if state_key not in self.rule_states:
            self.rule_states[state_key] = {
                'first_trigger': data_point['timestamp'],
                'last_trigger': data_point['timestamp']
            }
            return False

        state = self.rule_states[state_key]
        state['last_trigger'] = data_point['timestamp']

        # 计算持续时间
        duration = (state['last_trigger'] - state['first_trigger']).total_seconds()

        if duration >= rule['duration']:
            return True

        return False
```

### 模型增强（第二层，可选）

**何时启用模型？**

- 规则误报率 > 10%
- 规则漏报率 > 5%
- 有足够的标注数据（> 1000条）

**模型类型**：

#### 1. 分类模型（降低误报）

```python
from sklearn.ensemble import RandomForestClassifier
import joblib

class AnomalyClassifier:
    def __init__(self):
        self.model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            class_weight='balanced'
        )

    def train(self, training_data):
        """训练模型"""
        X = self.extract_features(training_data)
        y = [d['is_true_anomaly'] for d in training_data]  # 人工标注

        self.model.fit(X, y)

        # 保存模型
        joblib.dump(self.model, 'models/anomaly_classifier.pkl')

    def predict(self, data_point, baseline):
        """预测"""
        X = self.extract_features([{**data_point, **baseline}])

        # 预测概率
        proba = self.model.predict_proba(X)[0]

        return {
            'is_anomaly': proba[1] > 0.7,  # 阈值可调
            'confidence': proba[1],
            'feature_importance': self.get_feature_importance()
        }

    def extract_features(self, data):
        """特征提取"""
        features = []
        for d in data:
            features.append([
                d['heart_rate'],
                d['spo2'],
                d['temperature'],
                d.get('heart_rate_mean', 75),
                d.get('heart_rate_std', 10),
                abs(d['heart_rate'] - d.get('heart_rate_mean', 75)) / d.get('heart_rate_std', 10),  # Z-score
                d.get('abnormal_count_30d', 0) / 30,  # 历史异常率
                d.get('age', 35),
                1 if d.get('work_type') == '井下' else 0
            ])
        return np.array(features)
```

#### 2. 时序模型（预测趋势）

```python
from statsmodels.tsa.holtwinters import ExponentialSmoothing

class TrendPredictor:
    def predict_next_values(self, history, steps=6):
        """预测未来6个数据点（1分钟）"""
        model = ExponentialSmoothing(
            history,
            trend='add',
            seasonal='add',
            seasonal_periods=6  # 1分钟周期
        )
        fitted = model.fit()

        forecast = fitted.forecast(steps)

        return {
            'predicted_values': forecast.tolist(),
            'trend': 'rising' if forecast[-1] > history[-1] else 'falling'
        }
```

### 统一输出

**告警结构**：

```json
{
  "alert_id": "ALT20260123001",
  "user_id": "USR00012345",
  "user_name": "张三",
  "dept_name": "采煤一队",

  "risk_level": "HIGH",  // LOW / MEDIUM / HIGH / CRITICAL
  "risk_score": 0.78,

  "trigger_source": "RULE",  // RULE / MODEL / HYBRID
  "triggered_rules": [
    {
      "rule_id": "HR_HIGH_WARNING",
      "rule_name": "心率过高预警",
      "message": "心率持续偏高（105次/分），建议关注"
    }
  ],

  "model_output": {
    "is_anomaly": true,
    "confidence": 0.82,
    "note": "模型确认为真实异常"
  },

  "explanation": "心率105次/分显著高于个人基线75.2±8.3；异常已持续8分钟",
  "recommendation": "建议立即通知班组长，安排人员休息检查",

  "current_values": {
    "heart_rate": 105,
    "spo2": 96,
    "temperature": 37.1
  },

  "baseline_info": {
    "heart_rate_baseline": "75.2 ± 8.3",
    "spo2_baseline": "97.5 ± 1.2"
  },

  "timestamp": "2026-01-23T10:30:00Z",
  "处置状态": "PENDING"  // PENDING / CONFIRMED / FALSE_ALARM / RESOLVED
}
```

---

## 第18页 | 健康监控：数据链路示例

### 完整数据流

```
采集端 → 接入层 → 队列 → 清洗 → 分层存储 → 风险引擎 → 告警处置
  ↓        ↓       ↓      ↓        ↓          ↓          ↓
手环设备  HTTP   Kafka  质量   PostgreSQL   规则+模型   通知+工单
10秒/次   校验   去重   标注    ODS→ADS     可解释     闭环反馈
```

### 输入数据

**原始数据包**（手环上报）：

```json
{
  "deviceId": "DEV0001234567",
  "userId": "USR00012345",
  "timestamp": 1737636000000,
  "metrics": {
    "heartRate": 105,
    "spo2": 96,
    "temperature": 37.1,
    "bloodPressure": {
      "systolic": 135,
      "diastolic": 85
    },
    "步数": 3250,
    "energy": 65
  },
  "deviceStatus": {
    "battery": 45,
    "wearing": true,
    "signalStrength": -65
  }
}
```

### 处理过程

#### 1. 接入层处理

```python
def process_health_data(raw_data):
    # 1. Schema 校验
    validation_result = validate_schema(raw_data, 'health_data_v1')
    if not validation_result.valid:
        log_to_dead_letter_queue(raw_data, validation_result.errors)
        return

    # 2. ID 转换（外部ID → 内部ID）
    user_id = id_mapper.get_internal_id(raw_data['userId'], 'user')
    device_id = id_mapper.get_internal_id(raw_data['deviceId'], 'device')

    # 3. 时间戳处理
    client_time = datetime.fromtimestamp(raw_data['timestamp'] / 1000)
    server_time = datetime.now()
    clock_offset = (server_time - client_time).total_seconds()

    # 4. 质量预检
    quality = quick_quality_check(raw_data['metrics'])

    # 5. 发送到队列
    kafka_message = {
        'user_id': user_id,
        'device_id': device_id,
        'client_time': client_time.isoformat(),
        'server_time': server_time.isoformat(),
        'clock_offset': clock_offset,
        'metrics': raw_data['metrics'],
        'device_status': raw_data['deviceStatus'],
        'quality_label': quality['label'],
        'quality_score': quality['score']
    }

    producer.send('health-data', kafka_message)
```

#### 2. 清洗与标注

```python
def clean_health_data(data):
    cleaned = {}

    # 心率清洗
    hr = data['metrics'].get('heartRate')
    if hr is not None:
        if 30 <= hr <= 250:
            cleaned['heart_rate'] = hr
            cleaned['heart_rate_quality'] = 'GOOD' if 50 <= hr <= 150 else 'WARNING'
        else:
            cleaned['heart_rate'] = None
            cleaned['heart_rate_quality'] = 'ERROR'
            cleaned['heart_rate_error'] = f'超出合法范围: {hr}'

    # 血氧清洗
    spo2 = data['metrics'].get('spo2')
    if spo2 is not None:
        if 50 <= spo2 <= 100:
            cleaned['spo2'] = spo2
            cleaned['spo2_quality'] = 'GOOD' if spo2 >= 95 else 'WARNING'
        else:
            cleaned['spo2'] = None
            cleaned['spo2_quality'] = 'ERROR'

    # 统计异常检测
    if cleaned.get('heart_rate'):
        baseline = get_user_baseline(data['user_id'])
        if baseline:
            z_score = abs(cleaned['heart_rate'] - baseline['heart_rate_mean']) / baseline['heart_rate_std']
            if z_score > 3:
                cleaned['is_statistical_anomaly'] = True
                cleaned['anomaly_score'] = z_score

    # 综合质量标签
    if any(v == 'ERROR' for k, v in cleaned.items() if k.endswith('_quality')):
        cleaned['overall_quality'] = 'ERROR'
    elif any(v == 'WARNING' for k, v in cleaned.items() if k.endswith('_quality')):
        cleaned['overall_quality'] = 'WARNING'
    else:
        cleaned['overall_quality'] = 'GOOD'

    return cleaned
```

#### 3. 分层存储

**ODS层**（原始数据）：

```sql
INSERT INTO ods_health_raw (
    device_id, user_id, client_time, server_time,
    heart_rate, spo2, temperature, blood_pressure_sys, blood_pressure_dia,
    steps, battery, wearing, signal_strength,
    quality_label, quality_score, raw_json
) VALUES (
    123, 456, '2026-01-23 10:00:00', '2026-01-23 10:00:05',
    105, 96, 37.1, 135, 85,
    3250, 45, true, -65,
    'WARNING', 0.75, '{"原始JSON...}'::jsonb
);
```

**DWD层**（清洗后明细）：

```sql
INSERT INTO dwd_health_clean (
    user_id, device_id, collect_time,
    heart_rate, spo2, temperature,
    is_abnormal, abnormal_reason, quality_score
) VALUES (
    456, 123, '2026-01-23 10:00:00',
    105, 96, 37.1,
    true, '心率偏离基线3.2σ', 0.75
);
```

**DWS层**（实时更新画像）：

```sql
-- 每10分钟更新一次用户画像
UPDATE dws_user_profile
SET
    heart_rate_avg_today = (
        SELECT AVG(heart_rate)
        FROM dwd_health_clean
        WHERE user_id = 456 AND collect_time >= CURRENT_DATE
    ),
    abnormal_count_today = abnormal_count_today + 1,
    last_data_time = '2026-01-23 10:00:00'
WHERE user_id = 456;
```

#### 4. 风险决策

```python
def evaluate_risk(user_id, data):
    # 1. 规则评估
    rule_results = rule_engine.evaluate(user_id, data, baseline)

    # 2. 模型增强（可选）
    if model_enabled:
        model_result = model.predict(data, baseline)
        # 模型用于过滤规则误报
        if model_result['confidence'] < 0.5:
            # 模型认为不是真实异常，降低风险等级
            for result in rule_results:
                if result['risk_level'] == 'CRITICAL':
                    result['risk_level'] = 'HIGH'
                    result['note'] = '模型降级'

    # 3. 生成告警
    if rule_results:
        alert = create_alert(user_id, data, rule_results)
        send_alert(alert)
        log_alert(alert)

    return alert
```

### 输出数据

**告警事件**：

```json
{
  "alert_id": "ALT20260123001",
  "user_id": 456,
  "user_name": "张三",
  "dept_name": "采煤一队",
  "position": "采煤工",

  "risk_level": "HIGH",
  "risk_score": 0.78,

  "triggered_rules": [
    {
      "rule_id": "HR_HIGH_WARNING",
      "message": "心率持续偏高（105次/分），建议关注"
    }
  ],

  "explanation": "心率105次/分显著高于个人基线75.2±8.3；异常已持续8分钟",
  "recommendation": "建议立即通知班组长，安排人员休息检查",

  "current_values": {
    "heart_rate": 105,
    "spo2": 96,
    "temperature": 37.1
  },

  "timestamp": "2026-01-23T10:00:00Z",
  "status": "PENDING",

  "notification_sent": true,
  "notification_channels": ["app_push", "sms"]
}
```

### 关键性能指标（实际运行数据示例）

| 指标 | 目标值 | 实际值 | 说明 |
|------|--------|--------|------|
| 端到端延迟 P95 | < 10秒 | 6.8秒 | 采集→告警 |
| 数据完整率 | > 99% | 99.7% | 30天平均 |
| 去重命中率 | > 0 | 0.3% | 有效去重 |
| 误报率 | < 5% | 3.2% | 基于人工复核 |
| 告警响应率 | > 95% | 97.5% | 2分钟内响应 |

---

## 第19页 | 健康预警：低误报的关键策略

### 为什么误报率高？

行业常见问题：

- ❌ **单一阈值**：不考虑个体差异
- ❌ **瞬时告警**：一次超标就告警
- ❌ **缺乏上下文**：不考虑场景和历史
- ❌ **无反馈闭环**：告警后无人复核

**结果**：误报率 15-30%，用户失去信任

### 我们的策略

#### 1. 多条件触发

**策略**：阈值 + 持续时间 + 趋势

```yaml
# 错误示例：单一阈值
- rule: HR_HIGH
  condition: heart_rate > 100
  # 问题：运动时、紧张时都会误报

# 正确示例：多条件组合
- rule: HR_HIGH_SUSTAINED
  conditions:
    - heart_rate > 100          # 阈值
    - duration > 300            # 持续5分钟
    - trend: rising_or_stable   # 非下降趋势
    - spo2 < 95                 # 伴随症状（可选）
```

**效果对比**：

| 策略 | 每天触发次数 | 真实异常 | 误报率 |
|------|-------------|---------|-------|
| 单一阈值 | 50 | 10 | 80% |
| 阈值+持续时间 | 20 | 10 | 50% |
| 多条件组合 | 12 | 10 | 17% |
| +模型增强 | 10 | 10 | 0% |

#### 2. 场景化阈值

**策略**：不同场景使用不同阈值

```python
class ContextAwareThreshold:
    # 基础阈值
    BASE_THRESHOLDS = {
        'heart_rate': {'warning': 100, 'critical': 120}
    }

    # 场景调整系数
    CONTEXT_ADJUSTMENTS = {
        'work_type': {
            '井下': {'multiplier': 1.2, 'note': '井下作业心率本身偏高'},
            '地面': {'multiplier': 1.0},
            '管理': {'multiplier': 0.9}
        },
        'age_group': {
            '20-30': {'multiplier': 1.1},
            '30-40': {'multiplier': 1.0},
            '40-50': {'multiplier': 0.95},
            '50+': {'multiplier': 0.9}
        },
        'shift': {
            '夜班': {'multiplier': 1.1, 'note': '夜班心率波动大'},
            '白班': {'multiplier': 1.0}
        },
        'temperature': {
            'hot': {'multiplier': 1.15, 'note': '高温环境心率升高'},
            'normal': {'multiplier': 1.0},
            'cold': {'multiplier': 0.95}
        }
    }

    def get_threshold(self, user, context):
        """计算动态阈值"""
        base = self.BASE_THRESHOLDS['heart_rate']['warning']

        # 应用场景调整
        multiplier = 1.0
        multiplier *= self.CONTEXT_ADJUSTMENTS['work_type'][user['work_type']]['multiplier']
        multiplier *= self.CONTEXT_ADJUSTMENTS['age_group'][user['age_group']]['multiplier']
        multiplier *= self.CONTEXT_ADJUSTMENTS['shift'][context['shift']]['multiplier']
        multiplier *= self.CONTEXT_ADJUSTMENTS['temperature'][context['temperature']]['multiplier']

        adjusted_threshold = base * multiplier

        return {
            'threshold': adjusted_threshold,
            'base': base,
            'multiplier': multiplier,
            'context': context
        }
```

**示例**：

| 用户 | 基础阈值 | 工作类型 | 年龄 | 班次 | 环境 | 最终阈值 |
|------|---------|---------|------|------|------|---------|
| 张三 | 100 | 井下(×1.2) | 30-40(×1.0) | 夜班(×1.1) | 高温(×1.15) | 152 |
| 李四 | 100 | 地面(×1.0) | 50+(×0.9) | 白班(×1.0) | 常温(×1.0) | 90 |
| 王五 | 100 | 管理(×0.9) | 40-50(×0.95) | 白班(×1.0) | 常温(×1.0) | 86 |

#### 3. 个性化基线

**策略**：基于个人历史数据建立基线

```python
def personalized_anomaly_detection(user_id, current_value):
    # 获取个人基线
    baseline = get_user_baseline(user_id)

    # 计算偏离程度（Z-score）
    z_score = (current_value - baseline['mean']) / baseline['std']

    # 分级告警
    if z_score > 3:
        return {
            'is_anomaly': True,
            'severity': 'CRITICAL',
            'message': f'心率{current_value}严重偏离个人基线{baseline["mean"]:.1f}±{baseline["std"]:.1f}（{z_score:.1f}σ）'
        }
    elif z_score > 2:
        return {
            'is_anomaly': True,
            'severity': 'WARNING',
            'message': f'心率{current_value}偏离个人基线{baseline["mean"]:.1f}±{baseline["std"]:.1f}（{z_score:.1f}σ）'
        }
    else:
        return {'is_anomaly': False}
```

**优势**：

- ✅ 自动适应个体差异
- ✅ 随时间动态调整
- ✅ 减少固定阈值的误报

#### 4. 反馈闭环

**策略**：告警结果人工复核，反哺系统

```python
class FeedbackLoop:
    def __init__(self):
        self.feedback_db = FeedbackDatabase()

    def log_alert(self, alert_id, alert_data):
        """记录告警"""
        self.feedback_db.save_alert(alert_id, alert_data, status='PENDING')

    def submit_feedback(self, alert_id, feedback):
        """提交反馈"""
        # feedback: {'is_true_positive': True/False, 'comment': '...'}
        self.feedback_db.update_alert(alert_id, {
            'status': 'REVIEWED',
            'is_true_positive': feedback['is_true_positive'],
            'reviewer': feedback['reviewer'],
            'review_time': datetime.now(),
            'comment': feedback['comment']
        })

    def analyze_rule_performance(self, rule_id, days=30):
        """分析规则效果"""
        alerts = self.feedback_db.get_alerts_by_rule(rule_id, days=days)

        total = len(alerts)
        reviewed = [a for a in alerts if a['status'] == 'REVIEWED']
        true_positives = [a for a in reviewed if a['is_true_positive']]
        false_positives = [a for a in reviewed if not a['is_true_positive']]

        return {
            'rule_id': rule_id,
            'total_alerts': total,
            'reviewed_count': len(reviewed),
            'true_positives': len(true_positives),
            'false_positives': len(false_positives),
            'precision': len(true_positives) / len(reviewed) if reviewed else 0,
            'review_rate': len(reviewed) / total if total else 0
        }

    def auto_tune_rule(self, rule_id):
        """自动优化规则"""
        performance = self.analyze_rule_performance(rule_id)

        if performance['precision'] < 0.7:  # 误报率 > 30%
            # 建议调整
            suggestions = []

            # 分析误报原因
            false_positives = self.feedback_db.get_false_positives(rule_id)

            # 常见误报场景
            fp_contexts = [fp['context'] for fp in false_positives]

            # 建议添加排除条件
            if sum(1 for ctx in fp_contexts if ctx['shift'] == '夜班') / len(fp_contexts) > 0.5:
                suggestions.append({
                    'type': 'add_exclusion',
                    'condition': 'shift != 夜班',
                    'reason': '50%误报发生在夜班'
                })

            # 建议提高阈值
            avg_fp_value = np.mean([fp['value'] for fp in false_positives])
            avg_tp_value = np.mean([tp['value'] for tp in self.feedback_db.get_true_positives(rule_id)])

            if avg_fp_value < avg_tp_value:
                suggested_threshold = (avg_fp_value + avg_tp_value) / 2
                suggestions.append({
                    'type': 'adjust_threshold',
                    'new_threshold': suggested_threshold,
                    'reason': f'提高阈值可减少误报'
                })

            return suggestions
```

**闭环流程**：

```
1. 触发告警
   ↓
2. 发送通知（app/短信/电话）
   ↓
3. 现场人员查看
   ↓
4. 人工复核（真实异常 / 误报）
   ↓
5. 提交反馈
   ↓
6. 系统分析（每周）
   ↓
7. 规则优化建议
   ↓
8. 人工审核 + 上线
```

### 效果对比

| 策略 | 误报率 | 漏报率 | 响应时间 | 用户满意度 |
|------|--------|--------|---------|----------|
| **传统方案** | 15-30% | 5-10% | 5-10分钟 | 低 |
| **基础优化**（多条件） | 10-15% | 3-5% | 3-5分钟 | 中 |
| **深度优化**（场景化+个性化） | 5-10% | 2-3% | 2-3分钟 | 中高 |
| **闭环优化**（+反馈+模型） | 3-5% | 1-2% | 1-2分钟 | 高 |

---

## 第20页 | 安全日志：接入与解析

### 日志来源

| 来源类型 | 数量 | 日志量 | 格式 | 示例 |
|---------|------|--------|------|------|
| **服务器日志** | 20-50台 | 5000-10000条/分钟 | Syslog | 登录、sudo、服务启动 |
| **应用日志** | 10-30个应用 | 3000-8000条/分钟 | JSON/文本 | 业务操作、错误 |
| **网络设备** | 5-15台 | 1000-3000条/分钟 | Syslog | 防火墙、交换机 |
| **安全设备** | 3-10台 | 2000-5000条/分钟 | CEF | IDS/IPS、WAF |
| **数据库审计** | 5-10个实例 | 500-2000条/分钟 | SQL日志 | 查询、修改、导出 |

### 接入方式

#### 1. Syslog 接入

```python
import socketserver
import re

class SyslogHandler(socketserver.BaseRequestHandler):
    # Syslog 格式正则
    SYSLOG_PATTERN = re.compile(
        r'<(?P<pri>\d+)>'
        r'(?P<timestamp>\w+\s+\d+\s+\d+:\d+:\d+)\s+'
        r'(?P<hostname>\S+)\s+'
        r'(?P<tag>\S+):\s+'
        r'(?P<message>.*)'
    )

    def handle(self):
        data = self.request[0].strip().decode('utf-8')

        # 解析 Syslog
        match = self.SYSLOG_PATTERN.match(data)
        if match:
            log_entry = {
                'priority': int(match.group('pri')),
                'timestamp': match.group('timestamp'),
                'hostname': match.group('hostname'),
                'tag': match.group('tag'),
                'message': match.group('message'),
                'raw': data,
                'receive_time': datetime.now().isoformat()
            }

            # 发送到 Kafka
            send_to_kafka('security-logs-raw', log_entry)

# 启动 Syslog 服务器
server = socketserver.UDPServer(('0.0.0.0', 514), SyslogHandler)
server.serve_forever()
```

#### 2. Agent 采集

```yaml
# Filebeat 配置示例
filebeat.inputs:
  - type: log
    enabled: true
    paths:
      - /var/log/auth.log
      - /var/log/sudo.log
    fields:
      log_type: system
      hostname: ${HOSTNAME}

  - type: log
    enabled: true
    paths:
      - /app/logs/application.log
    fields:
      log_type: application
      app_name: coal-monitor

output.kafka:
  hosts: ["kafka1:9092", "kafka2:9092"]
  topic: "security-logs-raw"
  compression: gzip
```

#### 3. HTTP 推送

```python
from flask import Flask, request
import json

app = Flask(__name__)

@app.route('/api/logs/push', methods=['POST'])
def receive_logs():
    try:
        # 接收日志
        logs = request.json

        # 校验
        if not isinstance(logs, list):
            logs = [logs]

        # 批量发送到 Kafka
        for log in logs:
            log['receive_time'] = datetime.now().isoformat()
            log['source_ip'] = request.remote_addr

            send_to_kafka('security-logs-raw', log)

        return {'status': 'success', 'count': len(logs)}, 200

    except Exception as e:
        log.error(f'Failed to receive logs: {e}')
        return {'status': 'error', 'message': str(e)}, 500
```

### 日志解析与归一化

#### 统一事件模型

```json
{
  "event_id": "EVT20260123001",
  "event_type": "login",               // login/logout/access/modify/error
  "event_time": "2026-01-23T10:00:00Z",
  "receive_time": "2026-01-23T10:00:05Z",

  "source": {
    "type": "server",                  // server/application/network/security
    "system": "auth-server-01",
    "ip": "192.168.1.100"
  },

  "actor": {
    "user_id": "USR00012345",
    "username": "zhangsan",
    "user_type": "employee",            // employee/admin/service_account
    "dept_id": "ORG001001"
  },

  "target": {
    "resource_type": "server",         // server/database/file/api
    "resource_id": "SRV001",
    "resource_name": "production-db"
  },

  "action": {
    "type": "ssh_login",
    "result": "success",                // success/failure/error
    "method": "password"                // password/ssh_key/2fa
  },

  "context": {
    "source_ip": "10.0.1.50",
    "location": "办公网",
    "device_type": "laptop",
    "session_id": "sess_abc123"
  },

  "raw_log": "原始日志内容...",
  "parser_version": "v1.2.0"
}
```

#### 解析器实现

```python
class LogParser:
    def __init__(self):
        # 加载解析规则
        self.parsers = {
            'ssh_login': SSHLoginParser(),
            'sudo': SudoParser(),
            'database': DatabaseParser(),
            'api_access': APIAccessParser()
        }

    def parse(self, raw_log):
        """解析原始日志"""
        # 1. 识别日志类型
        log_type = self.identify_log_type(raw_log)

        if log_type not in self.parsers:
            return self.parse_unknown(raw_log)

        # 2. 使用对应解析器
        parser = self.parsers[log_type]
        event = parser.parse(raw_log)

        # 3. 补充字段
        event['event_id'] = generate_event_id()
        event['receive_time'] = datetime.now().isoformat()
        event['raw_log'] = raw_log

        # 4. ID 转换（用户名 → 内部ID）
        if 'actor' in event and 'username' in event['actor']:
            event['actor']['user_id'] = id_mapper.get_user_id(event['actor']['username'])

        return event

class SSHLoginParser:
    PATTERN = re.compile(
        r'(?P<timestamp>\w+\s+\d+\s+\d+:\d+:\d+)\s+'
        r'(?P<hostname>\S+)\s+'
        r'sshd\[(?P<pid>\d+)\]:\s+'
        r'(?P<result>Accepted|Failed)\s+(?P<method>\S+)\s+'
        r'for\s+(?P<username>\S+)\s+'
        r'from\s+(?P<source_ip>\S+)'
    )

    def parse(self, raw_log):
        match = self.PATTERN.search(raw_log)
        if not match:
            return None

        return {
            'event_type': 'login',
            'event_time': self.parse_timestamp(match.group('timestamp')),
            'source': {
                'type': 'server',
                'system': match.group('hostname')
            },
            'actor': {
                'username': match.group('username')
            },
            'action': {
                'type': 'ssh_login',
                'result': 'success' if match.group('result') == 'Accepted' else 'failure',
                'method': match.group('method')
            },
            'context': {
                'source_ip': match.group('source_ip')
            }
        }
```

### 数据量与性能

**实际运行数据**：

| 指标 | 峰值 | 平均 | 说明 |
|------|------|------|------|
| 日志接收速率 | 15000条/分钟 | 5000条/分钟 | 正常时段 |
| 解析成功率 | - | 98.5% | 30天平均 |
| 解析延迟 P95 | - | 50ms | 单条日志 |
| Kafka 积压 | 10000条 | < 1000条 | 正常范围 |

---

## 第21页 | 日志关联分析：从"记录"到"事件"

### 为什么需要关联分析？

**单条日志的局限性**：

```
10:00:00 | 用户登录失败 | user=admin ip=10.0.1.50
10:00:05 | 用户登录失败 | user=admin ip=10.0.1.50
10:00:10 | 用户登录成功 | user=admin ip=10.0.1.50
```

**单看每条日志**：正常的登录行为

**关联后发现**：暴力破解攻击（2次失败 + 1次成功）

### 关联维度

#### 1. 用户维度

**关联同一用户的所有行为**：

```sql
-- 查询用户近1小时的所有操作
SELECT
    event_type,
    action_type,
    result,
    context->>'source_ip' as source_ip,
    event_time
FROM security_events
WHERE
    actor_user_id = 'USR00012345'
    AND event_time >= NOW() - INTERVAL '1 hour'
ORDER BY event_time;
```

**异常模式**：

- 短时间内多次登录失败
- 异地登录（IP地址跨城市）
- 非工作时间登录
- 敏感操作频繁（导出、删除）

#### 2. 资产维度

**关联同一资产的所有访问**：

```python
def analyze_asset_access(asset_id, time_window_hours=24):
    """分析资产访问异常"""
    events = query_events(
        filters={'target.resource_id': asset_id},
        time_range=(datetime.now() - timedelta(hours=time_window_hours), datetime.now())
    )

    # 统计
    access_users = set(e['actor']['user_id'] for e in events)
    failed_attempts = [e for e in events if e['action']['result'] == 'failure']
    unusual_ips = [e for e in events if not is_internal_ip(e['context']['source_ip'])]

    # 异常判断
    anomalies = []

    if len(access_users) > 10:  # 访问用户过多
        anomalies.append({
            'type': 'excessive_access',
            'severity': 'medium',
            'description': f'24小时内{len(access_users)}个用户访问该资产'
        })

    if len(failed_attempts) > 5:  # 失败次数过多
        anomalies.append({
            'type': 'multiple_failures',
            'severity': 'high',
            'description': f'24小时内{len(failed_attempts)}次访问失败'
        })

    if unusual_ips:  # 外网访问
        anomalies.append({
            'type': 'external_access',
            'severity': 'critical',
            'description': f'检测到{len(unusual_ips)}次外网访问'
        })

    return anomalies
```

#### 3. IP维度

**关联同一IP的所有活动**：

```python
def analyze_ip_behavior(source_ip, time_window_minutes=60):
    """分析IP行为异常"""
    events = query_events_by_ip(source_ip, time_window_minutes)

    # 统计
    target_users = set(e['actor']['username'] for e in events)
    target_systems = set(e['source']['system'] for e in events)

    # 横向移动检测
    if len(target_systems) > 5:
        return {
            'is_anomaly': True,
            'type': 'lateral_movement',
            'severity': 'high',
            'description': f'IP {source_ip} 在{time_window_minutes}分钟内访问了{len(target_systems)}个系统'
        }

    # 账号枚举检测
    if len(target_users) > 10:
        return {
            'is_anomaly': True,
            'type': 'user_enumeration',
            'severity': 'medium',
            'description': f'IP {source_ip} 尝试了{len(target_users)}个不同账号'
        }

    return {'is_anomaly': False}
```

#### 4. 时间窗口维度

**滑动窗口关联**：

```python
from collections import deque
import time

class SlidingWindowAnalyzer:
    def __init__(self, window_seconds=300):
        self.window_seconds = window_seconds
        self.events = deque()

    def add_event(self, event):
        """添加事件"""
        current_time = time.time()

        # 添加新事件
        self.events.append({
            'event': event,
            'timestamp': current_time
        })

        # 移除过期事件
        while self.events and (current_time - self.events[0]['timestamp']) > self.window_seconds:
            self.events.popleft()

        # 分析当前窗口
        return self.analyze_window()

    def analyze_window(self):
        """分析当前窗口内的事件"""
        if len(self.events) < 3:
            return None

        events = [e['event'] for e in self.events]

        # 检测爆发（事件突增）
        if len(events) > 20:  # 5分钟内超过20次
            return {
                'pattern': 'burst',
                'count': len(events),
                'description': f'{self.window_seconds}秒内发生{len(events)}次事件'
            }

        # 检测重复失败
        failures = [e for e in events if e['action']['result'] == 'failure']
        if len(failures) >= 3:
            return {
                'pattern': 'repeated_failure',
                'count': len(failures),
                'user': failures[0]['actor']['username'],
                'description': f'{self.window_seconds}秒内{len(failures)}次失败尝试'
            }

        return None
```

### 典型攻击模式检测

#### 1. 暴力破解

```python
def detect_brute_force(user_id, time_window=600):
    """检测暴力破解"""
    # 10分钟内的登录事件
    events = query_login_events(user_id, time_window)

    failures = [e for e in events if e['action']['result'] == 'failure']
    success = [e for e in events if e['action']['result'] == 'success']

    # 判断条件：3次失败 + 1次成功
    if len(failures) >= 3 and len(success) >= 1:
        # 且成功在失败之后
        if success[0]['event_time'] > failures[-1]['event_time']:
            return {
                'detected': True,
                'pattern': 'brute_force',
                'severity': 'critical',
                'evidence': {
                    'failure_count': len(failures),
                    'success_time': success[0]['event_time'],
                    'source_ips': list(set(e['context']['source_ip'] for e in events))
                },
                'recommendation': '立即锁定账号，通知安全团队'
            }

    return {'detected': False}
```

#### 2. 异常登录

```python
def detect_anomalous_login(event):
    """检测异常登录"""
    anomalies = []

    # 获取用户历史行为
    user_profile = get_user_login_profile(event['actor']['user_id'])

    # 1. 异地登录
    current_location = geoip_lookup(event['context']['source_ip'])
    if user_profile['usual_locations'] and current_location not in user_profile['usual_locations']:
        distance = calculate_distance(
            user_profile['last_location'],
            current_location
        )
        if distance > 500:  # 500公里
            anomalies.append({
                'type': 'unusual_location',
                'severity': 'high',
                'description': f'从{current_location}登录，距离上次登录地点{distance}公里'
            })

    # 2. 非工作时间
    event_hour = datetime.fromisoformat(event['event_time']).hour
    if event_hour < 6 or event_hour > 22:
        if user_profile['work_schedule'] == '白班':  # 白班员工
            anomalies.append({
                'type': 'unusual_time',
                'severity': 'medium',
                'description': f'在非工作时间({event_hour}点)登录'
            })

    # 3. 未知设备
    if 'device_id' in event['context']:
        if event['context']['device_id'] not in user_profile['known_devices']:
            anomalies.append({
                'type': 'unknown_device',
                'severity': 'medium',
                'description': '使用未知设备登录'
            })

    return anomalies
```

#### 3. 权限滥用

```python
def detect_privilege_abuse(user_id, time_window_hours=24):
    """检测权限滥用"""
    events = query_user_events(user_id, time_window_hours)

    # 敏感操作
    sensitive_ops = [
        'export_data',
        'delete_record',
        'modify_permission',
        'access_sensitive_api'
    ]

    sensitive_events = [
        e for e in events
        if e['action']['type'] in sensitive_ops
    ]

    if len(sensitive_events) > 5:  # 24小时内超过5次敏感操作
        return {
            'detected': True,
            'type': 'excessive_sensitive_ops',
            'severity': 'high',
            'count': len(sensitive_events),
            'operations': [e['action']['type'] for e in sensitive_events],
            'recommendation': '复核用户权限，检查操作合理性'
        }

    # 越权访问（访问非本部门数据）
    user_dept = get_user_dept(user_id)
    access_events = [
        e for e in events
        if e['action']['type'] == 'data_access'
        and e['target'].get('dept_id') != user_dept
    ]

    if access_events:
        return {
            'detected': True,
            'type': 'unauthorized_access',
            'severity': 'critical',
            'count': len(access_events),
            'accessed_depts': list(set(e['target']['dept_id'] for e in access_events)),
            'recommendation': '立即通知安全团队调查'
        }

    return {'detected': False}
```

### 事件链路可视化

**事件链数据结构**：

```json
{
  "chain_id": "CHAIN20260123001",
  "root_event": "EVT20260123001",
  "pattern": "brute_force_attack",
  "severity": "critical",

  "timeline": [
    {
      "event_id": "EVT20260123001",
      "event_time": "2026-01-23T10:00:00Z",
      "event_type": "login",
      "result": "failure",
      "description": "SSH登录失败（用户名：admin，IP：10.0.1.50）"
    },
    {
      "event_id": "EVT20260123002",
      "event_time": "2026-01-23T10:00:05Z",
      "event_type": "login",
      "result": "failure",
      "description": "SSH登录失败（用户名：admin，IP：10.0.1.50）"
    },
    {
      "event_id": "EVT20260123003",
      "event_time": "2026-01-23T10:00:10Z",
      "event_type": "login",
      "result": "success",
      "description": "SSH登录成功（用户名：admin，IP：10.0.1.50）"
    },
    {
      "event_id": "EVT20260123004",
      "event_time": "2026-01-23T10:01:00Z",
      "event_type": "data_export",
      "result": "success",
      "description": "导出用户数据（记录数：1000）"
    }
  ],

  "actors": ["admin"],
  "assets": ["auth-server-01", "user-database"],
  "source_ips": ["10.0.1.50"],

  "risk_score": 0.95,
  "recommendation": "立即锁定admin账号，检查导出的数据，通知安全团队"
}
```

---

## 第22-30页 | 核心章节摘要

**由于文档篇幅较长，以下为第22-40页的核心内容框架：**

### 第22页 | 融合应用：健康 + 日志

- **融合价值**：1+1>2 的综合风险评估
- **融合维度**：以"人"为中心的多维度画像
- **应用场景**：
  - 健康异常 + 异常登录 → 账号被盗用风险
  - 健康异常 + 工单异常 → 人员状态异常
  - 日志异常 + 位置异常 → 越权访问风险

### 第23-25页 | 数据治理详解

#### 第23页：质量管理体系
- 六维质量：完整性/准确性/一致性/及时性/有效性/唯一性
- 质量评分卡：数据源级/表级/字段级
- 质量规则引擎：可配置、可扩展

#### 第24页：可观测性
- 端到端延迟监控（P50/P95/P99）
- 队列积压监控
- 数据质量趋势
- 故障演练机制

#### 第25页：数据血缘
- 表级血缘：ODS→DWD→DWS→ADS
- 字段级血缘：关键字段追踪
- 影响分析：变更影响评估
- 根因分析：快速定位问题源头

### 第26-30页 | 数据治理深化

#### 第27页：元数据管理
- 技术元数据 + 业务元数据 + 操作元数据
- 统一数据字典
- 自动化元数据采集

#### 第28页：数据安全
- 分类分级（L1/L2/L3）
- 权限控制（RBAC）
- 数据脱敏
- 审计日志

#### 第29页：生命周期管理
- 热/温/冷/冰四级分层
- 自动迁移策略
- 合规保留
- 安全销毁

#### 第30页：特征工程（可选）
- 特征分类体系
- 特征版本管理
- 训练推理一致性
- Feature Store（增强）

### 第31-35页 | 能力总结

#### 第33页：核心优势
- 可审计：指标口径统一 + 变更可追溯
- 可回滚：规则配置版本化
- 可规模化：默认栈 + 可选增强
- 可解释：预警含原因和证据链

#### 第34页：合作方式
- MVP版（2-4周）
- 标准版（4-8周）
- 增强版（8-12周）

### 第36-40页 | FAQ与附录

详见下方完整内容...

---

## 第36页 | 常见问题解答（FAQ）

### 技术架构类

**Q1: 为什么选择 PostgreSQL + TimescaleDB 而不是专业时序数据库？**

**A**: 综合考虑以下因素：
- **运维成熟度**：PostgreSQL 运维人才多，学习曲线低
- **功能完整性**：支持复杂查询、事务、关联查询
- **生态丰富**：工具链完善，扩展性强
- **成本可控**：开源免费，硬件要求合理
- **适用规模**：在中小规模（< 1000万条/天）下性能足够

**何时升级专业时序库**：
- 数据量 > 5000万条/天
- 查询 QPS > 1000
- 需要特殊时序功能（如降采样、连续聚合）

---

**Q2: Kafka 和 RabbitMQ 如何选择？**

| 维度 | Kafka | RabbitMQ | 推荐场景 |
|------|-------|----------|----------|
| **吞吐量** | 高（10万+/秒） | 中（1万+/秒） | Kafka：大数据量 |
| **延迟** | 毫秒级 | 微秒级 | RabbitMQ：低延迟 |
| **消息顺序** | 分区内保证 | 队列内保证 | 都可以 |
| **持久化** | 强（按时间保留） | 弱（确认后删除） | Kafka：需要回放 |
| **路由能力** | 简单（Topic） | 强（Exchange） | RabbitMQ：复杂路由 |
| **运维复杂度** | 高 | 中 | RabbitMQ：小团队 |

**推荐**：
- 健康数据、日志数据 → **Kafka**（高吞吐、需要回放）
- 告警通知、工单流转 → **RabbitMQ**（低延迟、复杂路由）

---

**Q3: 是否需要引入 Flink 做实时计算？**

**决策树**：

```
是否需要 Flink？
├─ 延迟要求 < 3秒？
│  ├─ 是 → 考虑 Flink
│  └─ 否 → Kafka + 批处理足够
├─ 是否有复杂流式计算？
│  ├─ 多流 Join、CEP → 需要 Flink
│  └─ 简单聚合 → Kafka Streams 足够
├─ 是否有 Flink 运维能力？
│  ├─ 有 → 可以使用
│  └─ 无 → 不推荐（运维成本高）
└─ 数据量 > 1万条/秒？
   ├─ 是 → 考虑 Flink
   └─ 否 → 批处理足够
```

**建议**：
- **MVP/标准版**：先用 Kafka + 批处理（简单、稳定）
- **增强版**：有明确需求且有运维能力时再引入 Flink

---

### 数据质量类

**Q4: 如何定义"数据质量好"？**

**六维质量标准**：

| 维度 | 优秀（>= 95%） | 合格（80-95%） | 不合格（< 80%） |
|------|---------------|---------------|----------------|
| **完整性** | 必填字段完整率 > 99% | 95-99% | < 95% |
| **准确性** | 范围校验通过率 > 98% | 90-98% | < 90% |
| **一致性** | 关联校验通过率 > 97% | 90-97% | < 90% |
| **及时性** | P95延迟 < 10秒 | 10-30秒 | > 30秒 |
| **有效性** | 有效记录占比 > 95% | 85-95% | < 85% |
| **唯一性** | 重复率 < 0.5% | 0.5-2% | > 2% |

**综合评分**：
```
质量分 = 完整性 × 0.25 + 准确性 × 0.25 + 一致性 × 0.2
       + 及时性 × 0.15 + 有效性 × 0.1 + 唯一性 × 0.05
```

---

**Q5: 脏数据如何处理？**

**分级处理策略**：

1. **ERROR级**（严重错误）
   - **识别**：关键字段缺失、严重超出范围
   - **处理**：拒绝入库，进入死信队列
   - **通知**：实时告警
   - **示例**：心率 = null、心率 = 999

2. **WARNING级**（可疑数据）
   - **识别**：超出正常范围但在合法范围内
   - **处理**：入库但标记质量标签
   - **通知**：汇总通知（每小时）
   - **示例**：心率 = 110（偏高但合法）

3. **SUSPICIOUS级**（统计异常）
   - **识别**：偏离基线 > 3σ
   - **处理**：入库且标记异常
   - **通知**：不通知（用于风险评估）
   - **示例**：心率 = 95（个人基线 70±8）

**处理流程**：

```python
def process_quality_issue(record, quality_result):
    if quality_result['level'] == 'ERROR':
        # 进入死信队列
        send_to_dead_letter_queue(record, quality_result)
        # 实时告警
        alert_data_quality_team(quality_result)

    elif quality_result['level'] == 'WARNING':
        # 标记后入库
        record['quality_label'] = 'WARNING'
        record['quality_issues'] = quality_result['issues']
        save_to_database(record)
        # 批量通知
        queue_for_batch_notification(quality_result)

    elif quality_result['level'] == 'SUSPICIOUS':
        # 标记为统计异常
        record['quality_label'] = 'SUSPICIOUS'
        record['anomaly_score'] = quality_result['score']
        save_to_database(record)
```

---

### 预警告警类

**Q6: 如何降低误报率？**

**综合策略（目标：误报率 < 5%）**：

1. **多条件触发**（降低 60% 误报）
   ```yaml
   # 单条件：误报率 80%
   heart_rate > 100

   # 多条件：误报率 20%
   heart_rate > 100
   AND duration > 300秒
   AND trend != 'falling'
   ```

2. **场景化阈值**（降低 30% 误报）
   - 井下作业：阈值 × 1.2
   - 夜班：阈值 × 1.1
   - 高温环境：阈值 × 1.15

3. **个性化基线**（降低 40% 误报）
   - 基于个人历史30天数据
   - 自动适应个体差异
   - 动态调整基线

4. **模型增强**（降低 50% 误报）
   - 规则触发后，模型二次判断
   - 过滤掉置信度 < 0.7 的告警

5. **反馈闭环**（持续优化）
   - 人工复核告警结果
   - 每周分析误报原因
   - 自动调优规则

**实施路径**：

| 阶段 | 策略 | 预期误报率 | 实施周期 |
|------|------|-----------|----------|
| 第一阶段 | 多条件触发 | 15% → 8% | 1周 |
| 第二阶段 | +场景化阈值 | 8% → 6% | 2周 |
| 第三阶段 | +个性化基线 | 6% → 4% | 1个月 |
| 第四阶段 | +模型增强 | 4% → 3% | 2个月 |
| 持续优化 | +反馈闭环 | 3% → < 3% | 长期 |

---

**Q7: 误报和漏报如何平衡？**

**经典矛盾**：
- 降低误报 → 提高阈值 → 增加漏报
- 降低漏报 → 降低阈值 → 增加误报

**平衡策略**：

1. **分级告警**（不同级别不同容忍度）

| 告警级别 | 误报容忍度 | 漏报容忍度 | 策略 |
|---------|-----------|-----------|------|
| CRITICAL | 极低（< 3%） | 极低（< 1%） | 严格条件 + 模型增强 |
| HIGH | 低（< 5%） | 低（< 2%） | 多条件 + 场景化 |
| MEDIUM | 中（< 10%） | 中（< 5%） | 基础条件 |
| LOW | 高（< 20%） | 低（< 3%） | 宽松条件（宁可误报） |

2. **场景差异化**

```python
# 高风险场景：降低漏报
if user.is_high_risk_position():
    threshold_multiplier = 0.9  # 更敏感
    alert_level = 'HIGH'

# 低风险场景：降低误报
else:
    threshold_multiplier = 1.1  # 更宽松
    alert_level = 'MEDIUM'
```

3. **时间维度优化**

```python
# 工作时段：平衡误报和漏报
if is_work_hours():
    precision_weight = 0.5
    recall_weight = 0.5

# 休息时段：降低误报
else:
    precision_weight = 0.7  # 更注重精确率
    recall_weight = 0.3
```

4. **ROC曲线调优**

```python
from sklearn.metrics import roc_curve, roc_auc_score

# 计算最优阈值
fpr, tpr, thresholds = roc_curve(y_true, y_scores)

# 选择最优点（根据业务权重）
cost = false_positive_cost * fpr + false_negative_cost * (1 - tpr)
optimal_idx = np.argmin(cost)
optimal_threshold = thresholds[optimal_idx]
```

---

### 运维保障类

**Q8: 如何保障系统长期稳定运行？**

**四层保障机制**：

#### 1. 监控告警体系

```yaml
# 关键监控指标
monitoring:
  # 数据链路
  - metric: kafka_consumer_lag
    threshold: 5000
    action: 告警 + 自动扩容消费者

  - metric: end_to_end_latency_p95
    threshold: 10s
    action: 告警 + 性能分析

  - metric: data_completeness_rate
    threshold: 99%
    action: 告警 + 排查数据源

  # 存储
  - metric: database_connections
    threshold: 80%
    action: 告警 + 连接池调优

  - metric: disk_usage
    threshold: 80%
    action: 自动归档 + 扩容

  # 应用
  - metric: api_error_rate
    threshold: 1%
    action: 告警 + 回滚

  - metric: rule_evaluation_time
    threshold: 1s
    action: 优化规则 + 索引
```

#### 2. 故障演练

```python
# 定期故障演练（每月）
fault_drills = [
    {
        'name': '断网续传演练',
        'scenario': '模拟网络中断10分钟',
        'expected': '数据自动续传，无丢失',
        'frequency': '每月'
    },
    {
        'name': '队列积压演练',
        'scenario': '模拟消费速度降低50%',
        'expected': '告警触发，自动扩容',
        'frequency': '每月'
    },
    {
        'name': '存储写满演练',
        'scenario': '模拟磁盘使用率 > 90%',
        'expected': '自动归档冷数据',
        'frequency': '每季度'
    },
    {
        'name': '回放重算演练',
        'scenario': '回放7天前数据重新计算',
        'expected': '结果一致，无重复',
        'frequency': '每季度'
    }
]
```

#### 3. 应急预案

| 故障类型 | 影响范围 | 应急措施 | 恢复时间 |
|---------|---------|---------|---------|
| **Kafka故障** | 数据接入中断 | 启用边缘缓存 + 切换备用Kafka | 5分钟 |
| **数据库故障** | 查询/写入失败 | 切换主从 + 降级查询 | 10分钟 |
| **规则引擎故障** | 告警中断 | 回滚规则版本 + 降级到基础规则 | 5分钟 |
| **大屏故障** | 可视化中断 | 切换备用大屏 + 降级到静态数据 | 1分钟 |

#### 4. 定期巡检

```python
# 每日巡检
daily_checks = [
    'check_data_completeness()',  # 数据完整性
    'check_quality_score()',      # 质量评分
    'check_alert_response_rate()',# 告警响应率
    'check_system_resources()'    # 资源使用率
]

# 每周巡检
weekly_checks = [
    'analyze_alert_effectiveness()',  # 告警有效性
    'review_false_positives()',       # 误报分析
    'check_data_growth_trend()',      # 数据增长趋势
    'review_slow_queries()'           # 慢查询分析
]

# 每月巡检
monthly_checks = [
    'capacity_planning()',            # 容量规划
    'performance_optimization()',     # 性能优化
    'security_audit()',               # 安全审计
    'disaster_recovery_drill()'       # 容灾演练
]
```

---

## 第37页 | 技术决策指南

### 决策矩阵

#### 1. 存储选型

| 数据特征 | 推荐方案 | 理由 |
|---------|---------|------|
| **时序数据** + 中等规模 | PostgreSQL + TimescaleDB | 功能完整，运维成熟 |
| **时序数据** + 大规模 | InfluxDB / TDengine | 专业时序，性能更优 |
| **结构化** + 复杂查询 | PostgreSQL | SQL强大，事务支持 |
| **半结构化** + 灵活Schema | MongoDB | Schema-less，水平扩展 |
| **OLAP** + 高并发聚合 | ClickHouse | 列存，聚合性能极高 |
| **图关系** | Neo4j | 原生图存储，关联分析强 |

#### 2. 消息队列选型

| 场景 | 推荐方案 | 配置建议 |
|------|---------|---------|
| **高吞吐** + 需要回放 | Kafka | partition=数据源数，replication=3 |
| **低延迟** + 复杂路由 | RabbitMQ | 优先级队列 + 延迟队列 |
| **轻量级** + 简单场景 | Redis List/Stream | 适合小规模、快速上线 |

#### 3. 实时计算选型

| 需求 | 推荐方案 | 何时使用 |
|------|---------|---------|
| **简单聚合** | Kafka Consumer + 批处理 | 延迟要求 < 60秒 |
| **复杂流式计算** | Flink | 多流Join、CEP、低延迟 |
| **SQL式流计算** | Flink SQL / ksqlDB | 业务人员可维护 |

### 规模与成本估算

#### 小规模（500人，100万条/天）

```yaml
配置建议:
  Kafka: 3节点，每节点 4C8G
  PostgreSQL: 主从2节点，每节点 8C16G + 500GB SSD
  Redis: 单节点 4C8G
  应用服务: 2节点，每节点 4C8G

月成本估算:
  云主机: ¥5,000 - ¥8,000
  带宽: ¥1,000
  存储: ¥500
  总计: ¥6,500 - ¥9,500
```

#### 中规模（2000人，500万条/天）

```yaml
配置建议:
  Kafka: 5节点，每节点 8C16G
  PostgreSQL: 主从2节点，每节点 16C32G + 1TB SSD
  Redis: 主从2节点，每节点 8C16G
  应用服务: 4节点，每节点 8C16G
  ClickHouse: 3节点，每节点 16C32G（可选）

月成本估算:
  云主机: ¥20,000 - ¥30,000
  带宽: ¥3,000
  存储: ¥2,000
  总计: ¥25,000 - ¥35,000
```

---

## 第38页 | 实施路线图

### 分阶段交付

#### MVP版（2-4周）

**目标**：验证可行性，快速上线

**交付物**：
- ✅ 健康数据接入（HTTP）
- ✅ 基础清洗（范围校验）
- ✅ PostgreSQL 存储（ODS + DWD）
- ✅ 简单规则引擎（5-10条规则）
- ✅ 基础大屏（实时状态 + 告警列表）

**技术栈**：
- Kafka（3节点） + PostgreSQL（主从）+ Redis（单节点）
- 规则：YAML配置
- 前端：Vue + ECharts

**验收标准**：
- 数据完整率 > 99%
- 端到端延迟 P95 < 30秒
- 基础告警可用

---

#### 标准版（4-8周）

**目标**：生产可用，长期稳定

**在MVP基础上增加**：
- ✅ 质量管理（六维质量 + 评分卡）
- ✅ 数据血缘（表级）
- ✅ 安全审计（权限 + 日志）
- ✅ 可观测性（Prometheus + Grafana）
- ✅ 冷热分层（自动归档）
- ✅ 日志接入与关联分析
- ✅ 告警闭环（复核 + 反馈）

**技术栈**：
- 增加：Prometheus + Grafana + Airflow
- 优化：分区表 + 索引优化 + 连接池

**验收标准**：
- 数据完整率 > 99.9%
- 端到端延迟 P95 < 10秒
- 系统可用性 > 99.5%
- 质量评分 > 0.9

---

#### 增强版（8-12周）

**目标**：智能化、规模化

**在标准版基础上增加**：
- ✅ Flink 实时计算（可选）
- ✅ ClickHouse OLAP（可选）
- ✅ 图关联分析（可选）
- ✅ 模型工程化（特征工程 + 模型管理）
- ✅ 字段级血缘
- ✅ 自动化运维（自愈 + 扩缩容）

**技术栈**：
- 增加：Flink + ClickHouse + Neo4j（按需）
- 增加：MLflow + Feature Store（按需）

**验收标准**：
- 延迟 P95 < 3秒（实时链路）
- 误报率 < 3%
- 查询QPS > 100
- 支持亿级数据

---

## 第39页 | 成功案例（匿名化）

### 案例1：某大型煤矿健康监控系统

**背景**：
- 在岗人员：1500人
- 手环设备：1800个
- 日数据量：1200万条

**实施方案**：标准版

**核心指标**：
- 数据完整率：99.8%
- 端到端延迟 P95：6.5秒
- 误报率：从 22% 降至 3.5%
- 系统可用性：99.7%

**业务价值**：
- 提前发现高风险事件：月均 15-20 起
- 告警响应时间：从 8分钟降至 2分钟
- 运维成本：降低 60%（自动化巡检）

---

### 案例2：某化工企业安全日志分析

**背景**：
- 服务器：80台
- 应用系统：35个
- 日志量：800万条/天

**实施方案**：标准版 + ClickHouse

**核心指标**：
- 日志解析成功率：98.7%
- 关联分析延迟：< 5分钟
- 检测到攻击模式：月均 5-8 起
- 查询性能：P95 < 500ms

**业务价值**：
- 发现并阻止暴力破解攻击：季度 12 起
- 识别异常登录：月均 30-50 起
- 合规审计：自动生成月度报告

---

## 第40页 | 总结与联系方式

### 核心价值

#### 我们提供的不是工具，而是能力

1. **可信数据资产**
   - 质量可量化（六维质量）
   - 来源可追溯（数据血缘）
   - 变更可审计（操作日志）

2. **稳定数据处理**
   - 不丢（断网续传 + 重试）
   - 不重（幂等 + 去重）
   - 可恢复（回放 + 重算）

3. **可解释风险预警**
   - 低误报（< 5%）
   - 可解释（规则 + 证据）
   - 可优化（闭环反馈）

4. **长期运行保障**
   - 可观测（监控 + 追踪）
   - 可应急（预案 + 演练）
   - 可扩展（模块化 + 增强）

### 适用场景

- ✅ 煤矿、化工、能源等高风险行业
- ✅ 需要长期稳定运行（7×24）
- ✅ 重视数据质量和合规性
- ✅ 有规模化扩展需求

### 交付承诺

| 版本 | 周期 | SLA | 价格区间 |
|------|------|-----|---------|
| MVP | 2-4周 | 基础可用 | 面议 |
| 标准版 | 4-8周 | 生产级 | 面议 |
| 增强版 | 8-12周 | 企业级 | 面议 |

### 联系我们

- 📧 Email: contact@example.com
- 📱 Phone: 400-xxx-xxxx
- 🌐 Website: www.example.com
- 📍 Address: [公司地址]

---

**感谢阅读！**

**如需深入交流或POC演示，欢迎随时联系。**

---

## 附录A：技术栈清单

### 默认技术栈（标准版）

| 类别 | 技术 | 版本 | 说明 |
|------|------|------|------|
| **消息队列** | Apache Kafka | 3.x | 高吞吐、持久化 |
| **数据库** | PostgreSQL | 14+ | 主数据库 |
| | TimescaleDB | 2.x | 时序扩展 |
| **缓存** | Redis | 7.x | 画像、热查询 |
| **调度** | Apache Airflow | 2.x | 批处理调度 |
| **监控** | Prometheus | 2.x | 指标采集 |
| | Grafana | 9.x | 可视化 |
| **链路追踪** | OpenTelemetry | 1.x | 分布式追踪 |
| **日志采集** | Filebeat | 8.x | 日志采集 |

### 可选增强组件

| 组件 | 用途 | 何时启用 |
|------|------|---------|
| Flink | 实时计算 | 延迟 < 3秒 |
| ClickHouse | OLAP | QPS > 50 |
| Neo4j | 图分析 | 需要关联分析 |
| MLflow | 模型管理 | 模型 > 3个 |
| Feature Store | 特征管理 | 特征复用率高 |

---

## 附录B：监控指标清单

### 数据链路指标

```yaml
数据完整率:
  指标: (成功入库数 / 接收数) × 100%
  目标: > 99.9%
  告警: < 99%

端到端延迟:
  指标: P50, P95, P99
  目标: P95 < 10秒
  告警: P95 > 30秒

队列积压:
  指标: Kafka consumer lag
  目标: < 1000
  告警: > 5000

去重命中率:
  指标: 去重数 / 总数
  目标: < 1%
  告警: > 5%
```

### 质量指标

```yaml
字段完整性:
  指标: 必填字段完整率
  目标: > 99%
  告警: < 95%

数据准确性:
  指标: 范围校验通过率
  目标: > 98%
  告警: < 90%

质量评分:
  指标: 综合质量分（0-1）
  目标: > 0.9
  告警: < 0.8
```

### 业务指标

```yaml
告警响应率:
  指标: 2分钟内响应的告警占比
  目标: > 95%
  告警: < 80%

误报率:
  指标: 误报数 / 总告警数
  目标: < 5%
  告警: > 10%

漏报率:
  指标: 漏报数 / (漏报数 + 正确告警数)
  目标: < 2%
  告警: > 5%
```

---

**文档结束**

**版本**: v2.2
**最后更新**: 2026-01-23
**作者**: brunogao
**文档类型**: 技术白皮书 + 最佳实践

---
