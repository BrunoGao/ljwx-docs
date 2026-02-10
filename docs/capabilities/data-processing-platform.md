# 企业级健康数据处理与分析平台 PPT 制作指南（终版）

**版本**：v2.3-final-rc1  
**更新日期**：2026-02-10  
**画布比例**：16:9（1920 × 1080 px）  
**适用场景**：政企宣讲 · 代理商宣讲 · 技术评审 · 能力介绍 · 投标方案  
**文档性质**：可直接交付设计师 / Gamma / Beautiful.ai / Figma / draw.io 落地

---

## 0 ｜ 变更记录

| 版本 | 日期 | 变更摘要 |
|------|------|----------|
| v2.0 | 2026-02-09 | 初版结构 19+1 页，煤矿/地铁场景 |
| v2.1 | 2026-02-09 | 场景替换：煤矿→能源，地铁→康养；口径初步统一 |
| v2.2 | 2026-02-09 | Data Trace 字段规范化；口径统一盒子引入；TSR→WSR 去歧义 |
| v2.3 | 2026-02-10 | 案例一人数→2000；工期→6 个月；日均→1.728 亿条；交付三阶段节奏确认 |
| v2.3-final | 2026-02-10 | 终审：对外表述分级、口径脚注定稿、品牌一致性通过、policy_id 全文替换 |
| **v2.3-final-rc1** | **2026-02-10** | **评审修订：7 项硬修正——卡片边框色统一 #60A5FA、reconcile_status 拆 4 枚举、E2E 延迟拆双链路、Flink 语义改写、去重策略化、KPI 角标标签、合规脚注日期更新；背景模板裁决规则；处置时间口径补 P50** |

---

## 1 ｜ 全局设计规范

### 1.1 品牌色系

| 色彩角色 | 色值 | 用途 |
|----------|------|------|
| 主色·深蓝 | `#0A1628` | 背景底色、标题区、侧栏 |
| 科技蓝 | `#2563EB` | 关键链路、按钮、高亮节点、KPI"目标"角标 |
| 辅助蓝 | `#60A5FA` | 次级链路、Data Trace 卡片边框与图标、悬停态 |
| 生命绿 | `#10B981` | 健康正常态、通过/成功标签、KPI"实测"角标 |
| 橙色强调 | `#F59E0B` | 告警/异常态、CTA 按钮、重点数字 |
| 正文白 | `#FFFFFF` | 正文、图表标签 |
| 次要灰 | `#94A3B8` | 注释、脚注、次级信息、KPI"推导"角标 |

### 1.2 字体规范

| 场景 | 字体 | 字重 | 字号 |
|------|------|------|------|
| 中文标题 | Source Han Sans（思源黑体） | Bold | 32–40 pt |
| 中文正文 | Source Han Sans | Regular | 16–20 pt |
| 中文注释/脚注 | Source Han Sans | Regular | 12–14 pt |
| 英文/数字标题 | Inter | Bold | 32–40 pt |
| 英文/数字正文 | Inter | Regular | 16–20 pt |
| 代码/字段名（通用上下文） | JetBrains Mono 或 Fira Code | Regular | 14–16 pt |

**卡片例外规则**：Data Trace 卡片内部字号不受上述"代码/字段名 14–16 pt"约束，固定使用字段名 12 pt（`#94A3B8`）、字段值 14 pt（`#FFFFFF`），详见第 2.2 节。

### 1.3 排版网格与规则

网格采用 12 列体系，列间距 24 px，页面边距上下左右各 64 px。线宽统一 1.5 px，圆角统一 8 px。每页严格聚焦单一核心信息，文字面积控制在页面总面积的 40% 以下，其余区域留给图形、图表或留白。禁止使用 stock 照片，优先使用自制 SVG/PNG（来源为 Figma 或 draw.io 导出），图标风格统一采用 Phosphor Icons（https://phosphoricons.com）或 Lucide Icons（https://lucide.dev）的线条风格（stroke width 1.5–2 px）。

### 1.4 五种页面模板

**封面模板**：深蓝满铺背景 `#0A1628`，左侧 60% 区域为标题+副标题+版本信息，右侧 40% 为抽象数据流视觉元素（线条+节点动效）；底部窄条使用科技蓝 `#2563EB` 渐变。

**观点模板**：上部 1/3 为标题区（深蓝底），下部 2/3 为内容区；标题区左对齐。内容区底色根据受众版本使用不同策略（见下方"背景裁决规则"）。

**图解模板**：标题置于左上角，主体区域为架构图 / 流程图 / 时间轴 / 表格，图解占页面 65–75%。底色根据受众版本使用不同策略。

**案例模板**：左侧 55% 为场景描述 + Data Trace 卡片，右侧 45% 为关键指标仪表盘（3–4 个 KPI 数字卡片，每张卡片右上角带"推导/目标/实测"角标）；底部为脚注口径声明。

**收口模板**：深蓝背景，中央大字（32–40 pt）核心主张，下方 CTA 按钮（橙色 `#F59E0B`），底部联系方式 / 二维码。

**背景裁决规则（rc1 新增）**：为避免"深蓝封面 → 大量白页 → 深蓝收口"的拼接感，观点模板与图解模板的底色按受众版本分治：

Sales 版（15–20 分钟）：允许白底 / 极浅灰底 `#F8FAFC`，以信息密度和可读性优先；深蓝页占比不低于 30%（封面 + 至少 2 个观点页标题区 + 收口 + 案例页底色使用深蓝），确保整体不散架。

Tech Review 版（25–30 分钟）：图解模板背景统一使用 `#0A1628` 深蓝底，主体图形承载在浅色卡片（`#F8FAFC` 圆角矩形）内；观点模板标题区深蓝、内容区可选深蓝底 + 浅色卡片或浅灰底。此方案与现有绘制坐标兼容，只需将底层矩形填充从白色换为深蓝。

两版共用同一套图形资产（SVG/PNG），差异仅在 PPT 母版底色设置。

### 1.5 图标使用规范

所有图标统一使用 Phosphor 或 Lucide 的线条（outline）风格，颜色跟随所在区块的主色或强调色，尺寸在 PPT 中等效 24–32 px。禁止使用填充式彩色图标或 emoji 替代专业图标。常用图标映射如下：采集层用 `Activity`（心跳线），传输层用 `ArrowRightLeft`，存储层用 `Database`，计算层用 `Cpu`，服务层用 `Globe`，展示层用 `BarChart3`，治理面用 `ShieldCheck`，告警用 `Bell`，Data Trace 用 `FileSearch`，安全用 `Lock`，时钟/延迟用 `Clock`。

### 1.6 KPI 角标标签规范（rc1 新增）

所有案例页 / 能力页中出现的 KPI 数字卡片，右上角必须放置一个 8 px 圆角小标签（高 20 px，内边距 4×8 px，字号 10 pt Inter Bold 白色），按三级分类着色：

| 标签文字 | 底色 | 含义 |
|----------|------|------|
| 实测 | `#10B981` 生命绿 | 已在真实/准生产环境测量 |
| 目标 | `#2563EB` 科技蓝 | 设计目标，需 POC 验证 |
| 推导 | `#94A3B8` 次要灰 | 基于参数公式计算所得 |

角标不替代页面底部脚注，而是辅助现场听众快速识别数据可信度。脚注仍保留完整口径定义。

---

## 2 ｜ Data Trace 卡片规范

### 2.1 统一字段定义

Data Trace 卡片是本平台全链路可追溯能力的视觉载体，贯穿架构页、能力页和案例页。每张卡片展示以下字段（展示时选取 3–4 个核心字段，完整字段列表供技术评审页使用）：

| 字段名 | 类型 | 说明 | 示例值 |
|--------|------|------|--------|
| `trace_id` | string | 全链路唯一追踪标识，UUID v4 | `a3f7...c901` |
| `source_device` | string | 数据来源设备标识 | `BAND-EN-0217` |
| `schema_version` | string | 数据契约版本号 | `v3.2.1` |
| `quality_check` | enum | 质量门禁结果：`PASS` / `WARN` / `FAIL` | `PASS` |
| `latency_ms` | int | 端到端延迟（毫秒） | `1842` |
| `is_backfill` | boolean | 是否为回补数据 | `false` |
| `reconcile_status` | enum | 对账状态：`MATCHED` / `MISSING` / `LATE` / `DUP` | `MATCHED` |
| `storage_layer` | enum | 当前所在存储层级 | `DWD` |

**reconcile_status 四枚举说明（rc1 修订）**：

`MATCHED`——源端与存储端计数一致，无差异。`MISSING`——源端已发送但存储端未收到，需触发回补。`LATE`——数据在对账窗口之后到达，需标记为迟到并决定是否补算。`DUP`——同一 `trace_id` + `event_time` 出现多次写入，需去重消解。四枚举直接对应第 8 页"对账回补"闭环中的四类处理策略，确保口径→流程→实现三层一致。

**去串台原则**：本平台 Data Trace 字段不使用 `policy_id`（该字段属于智能体平台 Evidence & Trace 域）。本平台使用 `schema_version`、`rule_version` 或 `contract_id` 替代。

### 2.2 卡片视觉规格

本平台有两种 Data Trace 卡片尺寸：

**标准卡片（DataTraceCard_Standard）**：宽 320 px，高 180–220 px。用于架构页概念示意（第 6 页）和案例页嵌入（第 12、14 页），展示 3–4 个核心字段。

**完整卡片（DataTraceCard_Full）**：宽 380 px，高 400–440 px。仅用于 Data Trace 时间线页（第 11 页）的"审计快照完整版"，展示全部 8 个字段。

两种卡片共享以下视觉规则：外边框 1.5 px 实线，颜色 **`#60A5FA`**（辅助蓝），圆角 8 px。内部背景 `#0F172A`（深蓝偏黑）。字段名使用 `#94A3B8`（次要灰）12 pt Inter Regular，字段值使用 `#FFFFFF`（白色）14 pt JetBrains Mono。卡片左上角放置 Lucide `FileSearch` 图标 20 px，颜色 **`#60A5FA`**。`quality_check` 字段值根据状态着色：`PASS` 用 `#10B981`，`WARN` 用 `#F59E0B`，`FAIL` 用 `#EF4444`。`reconcile_status` 字段值着色：`MATCHED` 用 `#10B981`，`MISSING` 用 `#EF4444`，`LATE` 用 `#F59E0B`，`DUP` 用 `#F59E0B`。每张卡片底部留 8 px 内边距，底部可选一行脚注（12 pt `#94A3B8`）说明上下文。

### 2.3 使用位置

Data Trace 卡片在以下页面出现：第 6 页（平台架构总览，右下角 DataTraceCard_Standard 概念示意）、第 11 页（Data Trace 时间线与审计，右侧 DataTraceCard_Full 展开完整字段 + 时间轴）、第 12 页（案例一·能源，嵌入 DataTraceCard_Standard 实际示例值）、第 14 页（案例二·康养，嵌入 DataTraceCard_Standard 实际示例值）。其余页面如需引用 `trace_id` 概念，使用内联标签样式（辅助蓝 `#60A5FA` 底 + 白色等宽字体 12 pt）而非完整卡片。

---

## 3 ｜ 口径统一盒子

以下口径贯穿全 Deck，所有涉及数据指标的页面必须引用此处定义，不得自行创造口径。如有对外表述需要，按"三级分类"标注。

### 3.1 核心口径清单

| 口径项 | 定义 | 值 / 公式 | 对外表述级别 |
|--------|------|-----------|-------------|
| 日均数据量 | 人数 × 采样频率 × 86400 秒 | 2000 人 × 1 条/秒 = **1.728 亿条/天** | 推导 |
| 单条大小 | 单条消息的平均字节数 | **~200 Bytes** | 实测 |
| 日数据规模 | 日均数据量 × 单条大小 | 1.728 亿 × 200 B ≈ **34.56 GB/天** | 推导 |
| 告警端到端延迟 P95（Alert E2E P95） | event_time → 告警通知触达（短信/企微/钉钉回执确认）的第 95 百分位 | **< 3 秒** | 目标 |
| 看板端到端延迟 P95（Dashboard E2E P95） | event_time → ADS 层聚合数据可查询的第 95 百分位 | **< 5 秒** | 目标 |
| 告警处置时间提升 | 传统人工处置时间 → 平台辅助处置时间；处置时间 = 告警触达时间 → 工单首次响应/确认时间，取 P50（中位数） | **15 分钟 → 3 分钟（P50）** | 目标 |
| 写入成功率 WSR | 成功写入条数 / 总发送条数 × 100% | MVP ≥99.5% / 生产 ≥99.9% / 规模化 ≥99.95% | 目标（分阶段） |
| 数据完整性 | 对账后实际到达量 / 预期到达量 × 100% | **> 99.9%** | 目标 |
| 对账频率 | 默认执行对账的周期 | **每小时**（可配置：5 分钟 / 每日） | 实测 |
| 对账差异 | 对账发现的缺失/迟到/重复总占比 | **< 0.1%** | 目标 |
| 看板查询 P95 | 秒级看板页面加载完成时间 P95 | **< 2 秒** | 目标 |
| 系统可用性 | 月度在线时长 / 月度总时长 × 100% | **≥ 99.9%** | 目标 |
| 成本降幅 | 相比传统方案的存储+运维成本降低 | **约 70%（冷热分离+归档）** | 目标（需 POC 确认） |

### 3.2 对外表述三级分类

**实测**：已在真实或准生产环境中测量获得，可直接对外引用，标注为"项目实测"。**目标**：设计目标值，尚需 POC/生产环境验证，对外标注为"设计目标（POC 验证口径）"。**推导**：基于参数公式计算所得，对外标注为"按参数推导"并附算式。所有对外页面的 KPI 数字旁必须以角标标签（见 1.6 节）+ 脚注双重标注其所属级别。

### 3.3 脚注模板

在涉及指标的页面底部，统一放置以下脚注格式（12 pt，`#94A3B8`，左对齐）：

`† 口径定义见第 4 页；WSR = 写入成功率（Write Success Rate）；Alert E2E P95 = event_time → 通知触达第 95 百分位；Dashboard E2E P95 = event_time → ADS 可查询第 95 百分位；处置时间取 P50（中位数）；数据量按 2000 人 × 1 条/秒 × 86400 秒推导。`

### 3.4 reconcile_status 与回补策略映射（rc1 新增）

| reconcile_status | 含义 | 回补策略 | 触发条件 |
|-----------------|------|----------|----------|
| `MATCHED` | 源端与存储端一致 | 无需处理 | — |
| `MISSING` | 源端已发送、存储端未收到 | 自动回补请求，`is_backfill = true`，回补数据走同等质量门禁 | 对账窗口结束时差异 > 0 |
| `LATE` | 数据在对账窗口后到达 | 标记 `is_backfill = true`，写入 ODS 后根据策略决定是否重算 DWS/ADS | event_time 与 ingest_time 差 > 对账窗口 |
| `DUP` | 同一幂等键出现重复写入 | 去重消解（保留最新版本），不触发回补 | 幂等键命中已有记录 |

此映射在第 8 页"质量闭环"图中可视化呈现。

---

## 4 ｜ 逐页规格（第 1–20 页）

---

### 第 1 页 ｜ 封面

**模板**：封面模板

**核心信息**：一句话传达平台定位

**布局**：左 60% 文字区 + 右 40% 抽象视觉区

**标题**：企业级健康数据处理与分析平台（中文 Source Han Sans Bold 40 pt 白色）

**副标题**：从体征采集到智能告警的全链路数据工程（中文 Source Han Sans Regular 20 pt `#94A3B8`）

**版本信息**：v2.3-final-rc1 ｜ 2026-02-10（Inter Regular 14 pt `#94A3B8`，左下角）

**右侧视觉**：以抽象化的数据流为主体——底部散布的传感器节点（小圆点，生命绿 `#10B981`）通过曲线向上汇聚，经过一个"六层"示意的横向色带（每层一个渐变色阶，从采集到展示），最终输出到右上角的仪表盘轮廓（科技蓝 `#2563EB` 线条）。整体传递"多源采集 → 分层处理 → 智能输出"的叙事。不使用照片，纯线条+色块。

**底部色条**：从左到右渐变 `#2563EB` → `#0A1628`，高度 4 px，贯穿页面底部。

**Gamma Prompt**：`Create a title slide with dark navy background (#0A1628). Left-aligned title "企业级健康数据处理与分析平台" in white bold 40pt, subtitle "从体征采集到智能告警的全链路数据工程" in gray 20pt below. Bottom-left version "v2.3-final-rc1 | 2026-02-10" in small gray. Right side: abstract data flow visualization with green (#10B981) dots flowing upward through horizontal colored bands into a dashboard outline in blue (#2563EB). No photos. Bottom accent line gradient from #2563EB to #0A1628, 4px height.`

---

### 第 2 页 ｜ 价值主张

**模板**：观点模板

**核心信息**：平台解决的三大核心痛点与一句话价值锚

**布局**：上部标题区（深蓝底），下部三列卡片

**标题**：为什么需要专业的健康数据平台？

**核心主张（标题区副标题）**：企业健康数据不是"采了就完"——口径不一、链路断裂、告警滞后，是三个最昂贵的沉默成本。

**三列卡片内容**：

卡片一——标题"口径混乱"，图标 Lucide `AlertTriangle`（橙色 `#F59E0B`），文字"不同设备、不同部门对同一指标定义不同，导致数据不可比、决策失据"，Before 标签"每次取数需人工对齐 2–3 天"，After 标签"平台内置口径字典，秒级对齐"。

卡片二——标题"链路黑洞"，图标 Lucide `Unlink`（橙色 `#F59E0B`），文字"数据从穿戴设备到看板中间有多少环节丢失？没有 Trace，无从追查"，Before"数据丢失只能事后人工抽检"，After"Data Trace 全链路追溯到每一条记录"。

卡片三——标题"告警迟钝"，图标 Lucide `BellOff`（橙色 `#F59E0B`），文字"传统方案告警依赖批处理，异常发现延迟 15 分钟以上"，Before"异常到响应 15+ 分钟"，After"实时引擎 Alert E2E P95 < 3 秒（目标）†"。

**脚注**：† Alert E2E P95 = event_time → 通知触达；口径定义见第 4 页。

**Gamma Prompt**：`Insight slide with dark header (#0A1628). Title "为什么需要专业的健康数据平台?" in white. Subtitle quote in gray. Below: three equal-width cards on light background. Each card has an orange (#F59E0B) warning icon, a pain point title, description text, and a Before→After comparison with green (#10B981) "After" text. Cards: 1) 口径混乱 2) 链路黑洞 3) 告警迟钝. Footer note in small gray 12pt.`

---

### 第 3 页 ｜ 场景全景（能源 vs 康养）

**模板**：图解模板

**核心信息**：两大落地场景的对比与共性平台

**布局**：上部标题，中部左右双栏对比（55% + 45%），底部共性平台色条

**标题**：两大典型场景：能源穿戴体征监测 × 康养社区体征监测

**左栏·能源场景**：标题"能源企业穿戴体征监测"（科技蓝 `#2563EB` 标签），图标 Lucide `HardHat`。要点：覆盖 2000 人级采掘/作业人员，7×24 连续体征采集（心率、血氧、体温、运动加速度），高温/高湿/高粉尘环境下的设备抗干扰，核心诉求为实时异常检测+快速处置响应。

**右栏·康养场景**：标题"康养社区体征监测"（生命绿 `#10B981` 标签），图标 Lucide `HeartPulse`。要点：覆盖 300 人级老年住户，重点监测夜间体征异常与跌倒检测（目标 > 95%），低功耗设备+家属联动通知，核心诉求为安心看护+健康趋势周报。

**底部共性条**：横向色条（`#0A1628` 背景），文字"共享统一平台内核：六层数据面 + 治理面 ｜ Data Trace ｜ 口径字典 ｜ 质量门禁 ｜ 对账回补"（白色 16 pt）。

**Gamma Prompt**：`Comparison slide with light background. Title "两大典型场景：能源穿戴体征监测 × 康养社区体征监测". Two columns: Left with blue (#2563EB) label "能源企业穿戴体征监测" showing hardhat icon, 4 key points about 2000-person industrial monitoring. Right with green (#10B981) label "康养社区体征监测" showing heart pulse icon, 4 key points about 300-person elderly care. Bottom dark navy (#0A1628) banner: shared platform kernel description in white 16pt.`

---

### 第 4 页 ｜ 口径统一

**模板**：观点模板

**核心信息**：全 Deck 核心口径的"单一事实来源"——口径统一盒子

**布局**：标题区 + 主体为一张结构化表格 + 右侧图示

**标题**：口径统一：一张表锁定全链路 KPI 定义

**主体表格**（占页面 60%）：将第 3 节"口径统一盒子"中的核心口径清单以表格形式呈现，包含口径项、定义、目标值、对外表述级别四列。表格底色白色，表头科技蓝 `#2563EB`，行交替使用极浅灰 `#F8FAFC`。**rc1 更新**：端到端延迟拆为"Alert E2E P95 < 3 秒"与"Dashboard E2E P95 < 5 秒"两行；告警处置时间补注"P50（中位数）"。

**右侧图示**（占页面 35%）：一个"口径漏斗"概念图——顶部多个不同形状（代表不同来源的口径），经过一个标有"口径字典"的漏斗，底部输出统一格式的数据流。漏斗颜色为科技蓝，输出流为生命绿。

**脚注**：WSR = Write Success Rate（写入成功率）；Alert E2E P95 = event_time → 通知触达 P95；Dashboard E2E P95 = event_time → ADS 可查询 P95；处置时间取 P50（中位数）；推导公式：2000 × 1 × 86400 = 172,800,000 条/天。

**Gamma Prompt**：`Data-focused slide. Title "口径统一：一张表锁定全链路 KPI 定义". Main 60% area: clean table with blue header (#2563EB), columns 口径项/定义/目标值/对外表述级别, ~12 rows with alternating light gray rows. Key rows: Alert E2E P95 <3s, Dashboard E2E P95 <5s, WSR 3-stage targets, reconcile_status 4 enum types. Right 35%: funnel diagram — multiple input shapes through "口径字典" funnel into unified green output stream. Footer formula note in gray 12pt.`

---

### 第 5 页 ｜ 方法论

**模板**：图解模板

**核心信息**：平台遵循的工程化方法论——不仅是工具，更是体系

**布局**：标题 + 中央水平五步流程图

**标题**：工程化方法论：Collect → Govern → Compute → Serve → Observe

**主体流程图**：水平五个圆角矩形节点，依次为"采集规范化"→"治理原生化"→"计算分层化"→"服务 API 化"→"观测全链路"。每个节点内部有图标 + 2 行文字说明。节点之间用箭头连接（`#2563EB` 1.5 px）。节点配色按层级渐变从深蓝到生命绿。每个节点下方有一行灰色注释文字。

节点一·采集规范化：图标 `Activity`，"统一接入协议 ｜ 设备注册 ｜ 数据契约"，注释"所有源头数据自带 schema_version"。

节点二·治理原生化：图标 `ShieldCheck`，"质量门禁 ｜ 口径字典 ｜ 对账回补"，注释"治理不是后置补丁，而是内建能力"。

节点三·计算分层化：图标 `Layers`，"ODS→DWD→DWS→ADS 四层计算"，注释"每层有明确输入/输出契约"。

节点四·服务 API 化：图标 `Globe`，"告警 API ｜ 看板 API ｜ 导出 API"，注释"所有能力以标准 API 对外暴露"。

节点五·观测全链路：图标 `Eye`，"Metrics / Logs / Traces ｜ Data Trace"，注释"每条数据可追溯到源头设备与时刻"。

**底部反馈回环**：从第五节点回到第一节点的虚线弧形箭头（`#94A3B8` 1 px），旁注"Observe 的结果反哺 Collect 的契约改进——持续闭环"（16 pt，`#94A3B8`）。

**Gamma Prompt**：`Methodology slide with light background (#F8FAFC). Title "工程化方法论：Collect → Govern → Compute → Serve → Observe". Central horizontal flow: 5 rounded rectangle nodes connected by blue (#2563EB) arrows. Each node has icon, 2-line label, gray annotation below. Node colors gradient: #0A1628 → #1E3A5F → #2563EB → #3B82F6 → #10B981. Dashed gray feedback arrow from node 5 back to node 1 with annotation about continuous loop.`

---

### 第 6 页 ｜ 平台架构总览

**模板**：图解模板

**核心信息**：六层数据面 + 治理面的完整架构

**布局**：标题 + 中央大型架构图（占页面 75%）+ 右下角 DataTraceCard_Standard 概念示意

**标题**：平台架构总览：六层数据面 + 治理面

**架构图规格**：

主体为左侧垂直排列的六层（从底到顶），右侧纵向贯穿的治理面色块。

六层数据面（从下到上，每层一个水平色条）：

第一层·采集层（`#1E3A5F` 深蓝）：穿戴设备 SDK ｜ 蓝牙网关 ｜ 边缘预处理节点。图标 `Activity`。

第二层·传输层（`#1E4D8C`）：Kafka 集群 ｜ 协议转换 ｜ 消息路由。图标 `ArrowRightLeft`。

第三层·存储层（`#2563EB` 科技蓝）：ClickHouse（热数据）｜ S3/MinIO（冷归档）｜ ODS/DWD/DWS/ADS 分层。图标 `Database`。

第四层·计算层（`#3B82F6`）：Flink/流计算 ｜ 批处理 ETL ｜ 质量规则引擎。图标 `Cpu`。

第五层·服务层（`#60A5FA` 辅助蓝）：告警服务 ｜ 看板服务 ｜ 数据导出 API ｜ 多租户网关。图标 `Globe`。

第六层·展示层（`#93C5FD` 浅蓝）：Grafana 仪表盘 ｜ 移动端告警推送 ｜ 管理后台。图标 `BarChart3`。

右侧治理面（纵向贯穿，`#F59E0B` 橙色侧栏，宽度约占 20%）：数据契约管理 ｜ 质量门禁（PASS/WARN/FAIL）｜ 对账与回补引擎（MISSING/LATE/DUP 三类策略）｜ 口径字典 ｜ 权限与多租户 ｜ Data Trace。图标 `ShieldCheck`。

各层之间用向上箭头连接（白色 1.5 px）。治理面与每一层之间有水平虚线连接，表示治理能力渗透到每一层。

**右下角 DataTraceCard_Standard**：按第 2 节规格，展示 3 个字段：`trace_id`、`quality_check`、`storage_layer`，标注"每条数据自带 Trace"。

**Gamma Prompt**：`Architecture slide. Title "平台架构总览：六层数据面 + 治理面". Main diagram: 6 horizontal layers stacked vertically (Collection #1E3A5F → Transport #1E4D8C → Storage #2563EB → Compute #3B82F6 → Service #60A5FA → Display #93C5FD) with icons and labels. Right side: vertical orange (#F59E0B) sidebar "治理面" spanning all layers listing governance capabilities including 4-enum reconcile strategy. Dashed orange lines connect governance to each layer. White upward arrows between layers. Bottom-right: DataTraceCard_Standard (320×200px, border #60A5FA) showing trace_id, quality_check, storage_layer.`

**draw.io 绘制规格**：画布 1920×1080。六层色条各高 100 px，宽 1200 px，左起 x=64，y 从 820（采集层）到 220（展示层），层间距 20 px。治理面色块 x=1340，宽 400 px，高 640 px，填充 `#F59E0B` opacity 15%，边框 `#F59E0B` 1.5 px。每层内左侧图标 32 px，右侧文字 Inter Bold 16 pt。层间连线白色箭头 1.5 px。治理面与各层连线橙色虚线 1 px。DataTraceCard_Standard 置于 x=1400, y=800, 320×200 px，边框 `#60A5FA`。导出 SVG + PNG @2x。

---

### 第 7 页 ｜ 核心能力一：高吞吐写入与去重

**模板**：观点模板

**核心信息**：平台如何承接亿级日数据量的高可靠写入

**布局**：左 50% 流程图 + 右 50% 关键指标卡片组

**标题**：核心能力①：高吞吐写入与精确去重

**左侧流程图**：垂直三步流程——"设备上报（1 条/秒/人）"→"Kafka 缓冲 + 分区路由"→"批量写入 + 幂等去重"。每一步用圆角矩形，步骤间箭头。在 Kafka 节点旁标注"5 节点集群"，写入节点旁标注"幂等键：trace_id + event_time"。

**去重策略说明（rc1 修订）**：写入节点下方灰色注释文字："去重策略：以 trace_id + event_time 为幂等键，明细表去重 + 汇总层重算/增量修正（按窗口）；具体存储引擎见附录第 20 页"。不在主稿写死具体引擎名称（如 ReplacingMergeTree），避免被实现细节牵着走。

**右侧指标卡片组**（3 张卡片纵向排列，每张右上角带角标标签）：

卡片一：大字"1.728 亿"（`#2563EB` 40 pt），小字"条/天·日均写入量"（16 pt 灰），角标 `推导`（灰底）。

卡片二：大字"≥ 99.9%"（`#10B981` 40 pt），小字"写入成功率 WSR（生产阶段目标）†"（16 pt 灰），角标 `目标`（蓝底）。

卡片三：大字"~200 B"（`#FFFFFF` 40 pt），小字"単条消息体积"（16 pt 灰），角标 `实测`（绿底）。

**脚注**：† WSR 三阶段目标：MVP ≥99.5% → 生产 ≥99.9% → 规模化 ≥99.95%；幂等键 = trace_id + event_time；存储引擎详见附录（第 20 页）。

**Gamma Prompt**：`Capability slide with dark header. Title "核心能力①：高吞吐写入与精确去重". Left 50%: vertical 3-step flow (Device Upload → Kafka Buffer 5-node → Batch Write + Idempotent Dedup) with "idempotent key: trace_id + event_time" annotation, gray note about dedup strategy referencing appendix. Right 50%: 3 large KPI cards stacked — "1.728亿 条/天" (blue, gray "推导" tag), "≥99.9% WSR" (green, blue "目标" tag), "~200B" (white, green "实测" tag). Each card has small colored corner tag. Footer note on WSR stages and appendix reference.`

---

### 第 8 页 ｜ 核心能力二：数据质量闭环与对账回补

**模板**：图解模板

**核心信息**：质量不是事后检查，而是内建闭环；对账回补拆为四类策略

**布局**：标题 + 中央环形闭环流程图

**标题**：核心能力②：数据质量闭环——门禁 · 对账 · 回补

**中央闭环流程图**：四个主节点围成环形——"质量门禁（写入前）"→"存储确认（写入后）"→"对账引擎（每小时）"→"回补/消解触发"→ 回到"质量门禁"。

节点一·质量门禁：图标 `ShieldCheck`，文字"schema 校验 ｜ 值域检查 ｜ 空值拦截"，标注"`quality_check` = PASS / WARN / FAIL"。

节点二·存储确认：图标 `Database`，文字"写入 ACK ｜ trace_id 回写 ｜ storage_layer 标记"。

节点三·对账引擎：图标 `Scale`，文字"源端计数 vs 存储计数 ｜ 差异 < 0.1%（目标）†"，标注"`reconcile_status` 四枚举输出"。

节点四·回补/消解触发：图标 `RefreshCw`，文字分为三行对应三类处理——"`MISSING` → 自动回补请求，`is_backfill = true`"、"`LATE` → 标记迟到，决定是否重算"、"`DUP` → 去重消解，保留最新版本"。标注"回补数据走相同质量门禁，不跳过校验"。

**环的中心**：文字"数据完整性 > 99.9%†"（`#10B981` 24 pt Bold），下方小字"对账差异 < 0.1%"（14 pt `#94A3B8`）。

**rc1 新增：环外右侧迷你表格**：显示 `reconcile_status` 四枚举及对应处理策略的映射（紧凑版，4 行 2 列），用于可视化第 3.4 节的映射关系。

**脚注**：† 目标口径（POC 验证）；对账频率默认每小时，可按场景调整为 5 分钟 / 每日；reconcile_status 四枚举定义见第 4 页。

**Gamma Prompt**：`Quality loop slide. Title "核心能力②：数据质量闭环——门禁·对账·回补". Central diamond-shaped flow with 4 nodes: Quality Gate (top) → Storage Confirm (right) → Reconciliation Engine (bottom) → Backfill/Dedup Trigger (left) → back to Quality Gate. Node 4 shows 3 sub-strategies for MISSING/LATE/DUP. Center circle: "数据完整性 >99.9%" in green (#10B981). Right side outside loop: compact 4-row table mapping reconcile_status enums to strategies. Footer on reconciliation frequency and caliber reference.`

---

### 第 9 页 ｜ 核心能力三：实时告警引擎

**模板**：观点模板

**核心信息**：从事件到告警通知 Alert E2E P95 < 3 秒

**布局**：左 45% 时间轴图 + 右 55% 规则引擎示意

**标题**：核心能力③：实时告警引擎——Alert E2E P95 < 3 秒（目标）†

**左侧时间轴**：水平时间轴，起点为"event_time（设备端）"，经过三个标注节点——"Kafka 入队（~200 ms）"→"Flink CEP 规则匹配（~500 ms）"→"告警服务分发（~800 ms）"→ 终点"告警通知触达（推送/短信/企微回执确认）"。总时间标注为"Alert E2E P95 < 3 秒"，角标 `目标`（蓝底）。时间轴颜色科技蓝，节点为实心圆点。

**Flink 语义标注（rc1 修订）**：在 Flink CEP 节点下方灰色小字标注"流处理状态一致（Exactly-once state），落库采用幂等键保证结果一致；端到端语义以 POC 验证为准"。

**右侧规则引擎示意**：三行规则卡片示意——

规则一："心率 > 120 bpm 持续 30 秒 → 高优告警"（图标 `HeartPulse` 红色 `#EF4444`），优先级 P0。

规则二："血氧 < 90% 持续 60 秒 → 紧急告警 + 管理员通知"（图标 `Wind` 红色），优先级 P0。

规则三："体温 > 38.5°C → 一般告警 + 记录"（图标 `Thermometer` 橙色 `#F59E0B`），优先级 P1。

下方备注："规则可动态配置，支持 CEP 时间窗口、组合条件、抑制与降噪策略"（14 pt 灰色）。

**脚注**：† Alert E2E P95 = event_time → 告警通知触达（回执确认），第 95 百分位；区别于 Dashboard E2E P95（见第 10 页）。

**Gamma Prompt**：`Alert engine slide with dark header. Title "核心能力③：实时告警引擎——Alert E2E P95 <3秒（目标）" with blue "目标" corner tag. Left 45%: horizontal timeline from event_time through Kafka(~200ms)/Flink CEP(~500ms)/Alert Service(~800ms) to notification with receipt confirmation, totaling <3s. Small gray note under Flink about exactly-once state + idempotent sink. Right 55%: 3 alert rule cards — heart rate P0, blood oxygen P0, temperature P1 — with red/orange icons and priority labels. Note about dynamic rule configuration. Footer differentiating Alert E2E from Dashboard E2E.`

---

### 第 10 页 ｜ 核心能力四：秒级看板与多维分析

**模板**：图解模板

**核心信息**：从原始数据到业务洞察的秒级响应看板

**布局**：标题 + 模拟看板截图（线框图风格）

**标题**：核心能力④：秒级看板与多维分析——Dashboard E2E P95 < 5 秒 ｜ 查询 P95 < 2 秒（目标）†

**主体**：一个模拟看板线框图，展示四个区域——

区域一（左上，宽 50%）：实时心率分布热力图（以色块表示不同心率区间人数，模拟线框）。

区域二（右上，宽 50%）：告警趋势折线图（过去 24 小时，按小时聚合，线框示意）。

区域三（左下，宽 50%）：多维筛选器（按部门/工区/设备型号/时间范围，下拉框线框示意）。

区域四（右下，宽 50%）：关键 KPI 数字卡片组（当前在线人数 / 实时告警数 / 今日回补量 / WSR），每个卡片带角标标签。

整个看板用深蓝底 + 线框风格呈现，避免真实截图或照片。

**底部技术要点**（一行文字，14 pt 灰色）：底层基于 ClickHouse 物化视图 + ADS 层预聚合，支持 SQL-on-OLAP 多维分析。

**脚注**：† Dashboard E2E P95 = event_time → ADS 层聚合数据可查询，P95；查询 P95 = 看板页面完整加载时间 P95；两者区别：前者含上游处理链路，后者仅衡量查询响应。

**Gamma Prompt**：`Dashboard slide with dark background (#0A1628). Title "核心能力④：秒级看板与多维分析——Dashboard E2E P95 <5秒 | 查询 P95 <2秒（目标）". Main: wireframe dashboard mockup in dark blue with 4 panels — heart rate heatmap (top-left), alert trend chart (top-right), multi-dimension filters (bottom-left), KPI cards with corner tags (bottom-right). All wireframe style, no screenshots. Bottom gray tech note about ClickHouse materialized views. Footer clearly differentiating Dashboard E2E P95 from query P95.`

---

### 第 11 页 ｜ Data Trace 时间线与审计

**模板**：图解模板

**核心信息**：一条数据从设备到看板的完整生命周期追踪

**布局**：标题 + 水平 Trace 时间线（占页面 65%）+ 右侧 DataTraceCard_Full

**标题**：Data Trace：全链路追溯——一条数据的旅程

**主体时间线**：水平时间线从左到右，六个节点对应六层，每个节点上方展示该阶段的 Data Trace 字段变化。

节点一·采集（`storage_layer: ODS`）：`trace_id` 生成 ｜ `source_device: BAND-EN-0217` ｜ `schema_version: v3.2.1`。

节点二·传输（Kafka）：`latency_ms: 210`（入队延迟）。

节点三·质量门禁：`quality_check: PASS`。

节点四·存储写入（`storage_layer: DWD`）：写入确认 ｜ `is_backfill: false`。

节点五·对账：`reconcile_status: MATCHED`。

节点六·服务/展示（`storage_layer: ADS`）：告警触发 / 看板可见 ｜ `latency_ms: 1842`（端到端）。

时间线下方用一条渐变色条（从科技蓝 `#2563EB` → 生命绿 `#10B981`）表示数据流动方向。

**右侧 DataTraceCard_Full**：按第 2 节规格（380×440 px），展示全部 8 个字段及其最终值，卡片标注"完整审计快照"。`reconcile_status` 值为 `MATCHED`（绿色）。

**脚注**：trace_id 为全链路唯一标识；所有字段定义见第 4 页口径统一表；reconcile_status 四枚举（MATCHED/MISSING/LATE/DUP）定义见第 3.4 节。

**Gamma Prompt**：`Trace timeline slide. Title "Data Trace：全链路追溯——一条数据的旅程". Horizontal timeline with 6 circle nodes (Collection→Transport→Quality Gate→Storage→Reconciliation→Service/Display) left to right. Each node has floating text box above showing relevant trace fields changing at that stage. Gradient bar (#2563EB→#10B981) below timeline. Right side: DataTraceCard_Full (380×440px, border #60A5FA, dark fill #0F172A) showing all 8 fields with final values, labeled "完整审计快照". Footer on trace_id and 4-enum definition reference.`

**draw.io 绘制规格**：画布 1920×1080。时间线主轴 y=480，从 x=100 到 x=1300，节点间距 200 px。节点为 40 px 实心圆（`#2563EB`），上方文本框 180×140 px（`#F8FAFC` 填充，`#E2E8F0` 边框 1 px，圆角 4 px）。渐变条 y=510，高度 6 px，`#2563EB` → `#10B981`。DataTraceCard_Full 置于 x=1440, y=240, 380×440 px，边框 `#60A5FA` 1.5 px，内填充 `#0F172A`。导出 SVG + 2x PNG。

---

### 第 12 页 ｜ 案例一：能源企业穿戴体征监测

**模板**：案例模板

**核心信息**：2000 人规模能源场景的完整案例

**布局**：左 55% 场景描述 + DataTraceCard_Standard，右 45% KPI 仪表盘

**标题**：案例一：能源企业穿戴体征监测（2000 人级）

**左侧场景描述**：

场景概述：某大型能源集团下属生产基地，2000 名一线作业人员佩戴智能手环，7×24 小时连续采集心率、血氧、体温、运动加速度四项体征指标。

核心挑战：高温高湿环境信号干扰大、设备型号多（3+ 厂商）、传统方案告警延迟 > 15 分钟。

平台应用：统一接入 + 数据契约管理 → 质量门禁过滤无效数据 → 实时告警引擎 → 秒级看板 → 对账回补确保完整性。

**DataTraceCard_Standard**（嵌入左下方，320×200 px）：展示 4 个字段——`trace_id: a3f7...c901`、`source_device: BAND-EN-0217`、`quality_check: PASS`（绿色）、`latency_ms: 1842`。

**右侧 KPI 仪表盘**（4 个数字卡片，每张右上角带角标标签）：

"1.728 亿条/天"——日均写入量，角标 `推导`（灰底）

"Alert E2E P95 < 3 秒"——告警端到端延迟，角标 `目标`（蓝底）

"15 分钟 → 3 分钟（P50）"——告警处置时间提升，角标 `目标`（蓝底）

"> 99.9%"——数据完整性，角标 `目标`（蓝底）

**脚注**：† 数据口径见第 4 页；上述指标标签含义：推导 = 按参数公式计算（2000 × 1 × 86400）；目标 = 设计目标（POC 验证口径）；处置时间取 P50（中位数）。

**Gamma Prompt**：`Case study slide, dark theme. Title "案例一：能源企业穿戴体征监测（2000 人级）". Left 55%: 3-section scenario description (Overview/Challenge/Solution), DataTraceCard_Standard at bottom (320×200, border #60A5FA) showing trace_id, source_device, quality_check (green PASS), latency_ms. Right 45%: 4 KPI cards with colored corner tags — "1.728亿条/天" (gray 推导 tag), "Alert E2E P95 <3秒" (blue 目标 tag), "15→3分钟 P50" (blue 目标 tag), ">99.9%" (blue 目标 tag). Footer explaining tag meanings and P50.`

---

### 第 13 页 ｜ 案例一交付物切片

**模板**：图解模板

**核心信息**：能源案例的交付成果与硬件配置概览

**布局**：标题 + 左侧交付物清单 + 右侧硬件拓扑简图

**标题**：案例一交付物切片：从 POC 到规模化

**左侧交付物清单**（三阶段时间轴，纵向）：

阶段一·POC/MVP（4–6 周）：100 人试点 ｜ 单链路端到端验证 ｜ 基础告警 + 看板 ｜ WSR ≥ 99.5%。

阶段二·生产可用（3–4 个月累计）：2000 人全量接入 ｜ 多设备统一适配 ｜ 对账回补上线 ｜ WSR ≥ 99.9%。

阶段三·规模化稳定（5–6 个月累计）：集团级扩展能力验证 ｜ 冷热分离归档 ｜ WSR ≥ 99.95% ｜ 系统可用性 ≥ 99.9%。

总工期标注："完整交付周期 6 个月，团队 6–8 人"。

**右侧硬件拓扑简图**：简洁的三组节点图——"5 节点 Kafka 集群"、"5 节点 ClickHouse 集群"、"3 节点应用服务"，用线条连接，标注配置摘要。具体存储引擎与参数见附录第 20 页。

**脚注**：硬件配置为参考方案，实际按 POC 评估结果调整；工期含客户配合时间；存储引擎选型（含去重引擎）详见附录。

**Gamma Prompt**：`Deliverable slice slide. Title "案例一交付物切片：从 POC 到规模化". Left: vertical 3-phase timeline with colored bars — POC/MVP (4-6wk, #2563EB), Production (3-4mo, #60A5FA), Scale (5-6mo, #10B981) — each listing key deliverables and WSR targets. "6 months, 6-8 people" total annotation. Right: simple hardware topology (Kafka 5-node, ClickHouse 5-node, App 3-node) connected by lines, with "see Appendix p.20 for engine details" note. Footer on configuration flexibility.`

---

### 第 14 页 ｜ 案例二：康养社区体征监测

**模板**：案例模板

**核心信息**：300 人规模康养场景的差异化价值

**布局**：左 55% 场景描述 + DataTraceCard_Standard，右 45% KPI 仪表盘

**标题**：案例二：康养社区体征监测（300 人级）

**左侧场景描述**：

场景概述：某康养社区 300 位老年住户佩戴低功耗体征手环，重点监测夜间心率异常、血氧骤降及跌倒事件。

核心诉求：夜间告警优先级最高、跌倒检测准确率 > 95%（目标）、异常自动通知值班护理员 + 家属。

平台应用：低频采集模式（可配置为 0.2 条/秒节省电量）→ 夜间告警规则强化 → 家属联动通知（微信/短信）→ 每周生成健康趋势周报。

**DataTraceCard_Standard**（320×200 px）：展示 4 个字段——`trace_id: b8e2...d413`、`source_device: BAND-KY-0089`、`quality_check: PASS`（绿色）、`latency_ms: 2103`。

**右侧 KPI 仪表盘**（4 个数字卡片，带角标标签）：

"~2600 万条/天"——日均数据量（推导：300 × 1 × 86400，按 1 条/秒上限），角标 `推导`（灰底）

"跌倒检测 > 95%"——检测准确率，角标 `目标`（蓝底）

"MVP 4 周"——首阶段交付周期，角标 `目标`（蓝底）

"家属联动 + 周报"——差异化服务输出（无角标，为功能描述）

**脚注**：† 实际采样频率可按场景降低至 0.2 条/秒，日均数据量相应为 ~520 万条/天；跌倒检测准确率为算法设计目标（POC 验证口径）。

**Gamma Prompt**：`Case study slide, dark theme. Title "案例二：康养社区体征监测（300 人级）". Left 55%: scenario description (Overview/Core Need/Platform Application) with DataTraceCard_Standard at bottom (320×200, border #60A5FA) showing trace_id b8e2...d413, source_device BAND-KY-0089, quality_check PASS (green), latency_ms 2103. Right 45%: 4 KPI cards with corner tags — "~2600万条/天" (gray 推导), "跌倒检测>95%" (blue 目标), "MVP 4周" (blue 目标), "家属联动+周报" (no tag, feature). Footer on adjustable sampling and accuracy caveat.`

---

### 第 15 页 ｜ 案例二交付物切片

**模板**：图解模板

**核心信息**：康养场景的差异化交付与家属联动示意

**布局**：标题 + 左侧交付时间线 + 右侧家属联动流程示意

**标题**：案例二交付物切片：轻量部署 + 家属联动

**左侧交付时间线**（两阶段）：

阶段一·MVP（4 周）：50 人试点 ｜ 夜间告警规则 ｜ 护理员通知 ｜ 基础看板。

阶段二·全量上线（2–3 个月累计）：300 人全量 ｜ 跌倒检测集成 ｜ 家属通知 ｜ 偢康周报自动生成。

**右侧家属联动流程**：简洁四步流程——"异常检测"→"护理员告警（即时）"→"家属通知（3 分钟内）"→"周报推送（每周一）"。流程用水平箭头连接，每步有对应图标（`Bell` → `User` → `Users` → `FileText`）。

**底部差异化备注**："康养场景与能源场景共享平台内核，差异仅在采集频率配置、告警规则模板、输出通道（家属联动 vs 安全管理员）、对账窗口（康养场景可放宽至每日）"。

**Gamma Prompt**：`Deliverable slice slide for case 2. Title "案例二交付物切片：轻量部署 + 家属联动". Left: 2-phase vertical timeline (MVP 4wk #2563EB, Full 2-3mo #10B981) with deliverables. Right: 4-step horizontal flow showing Alert Detection(Bell) → Nurse Notification(User) → Family Notification(Users) → Weekly Report(FileText), connected by arrows. Bottom note about shared platform kernel with scenario-specific differences including reconciliation frequency.`

---

### 第 16 页 ｜ 成本与技术选型

**模板**：观点模板

**核心信息**：以开源为主、冷热分离实现成本可控

**布局**：标题 + 左侧技术选型表 + 右侧成本优化三策略

**标题**：成本与技术选型：开源为主 · 冷热分离 · 运维可观测

**左侧技术选型表**（占 55%）：

| 维度 | 选型 | 说明 |
|------|------|------|
| 消息传输 | Apache Kafka | 高吞吐、分区有序、社区成熟 |
| 分析存储 | ClickHouse | 列式 OLAP、物化视图、高压缩比 |
| 流计算 | Apache Flink | CEP、窗口聚合；状态一致性 + 幂等落库（端到端以 POC 验证）† |
| 冷存储 | S3 / MinIO | 归档数据低成本存储 |
| 可观性 | Prometheus + Grafana | Metrics + 看板 + 告警 |
| 日志/追踪 | OpenTelemetry | 统一 Traces / Logs / Metrics |
| 应用框架 | 按需（Java/Go/Python） | 微服务 / API Gateway |

表格底色白色，表头科技蓝 `#2563EB`。

**Flink 行说明 rc1 修订**：由原"Exactly-once"改为"CEP、窗口聚合；流处理支持一致性状态（Exactly-once state），落库采用幂等键 + 去重策略保证结果一致（端到端语义以 POC 验证为准）"。

**右侧三策略卡片**（纵向排列，各含图标 + 标题 + 一句话）：

策略一·开源优先（图标 `Code`）："核心组件 100% 开源，无 License 锁定"。

策略二·冷热分离（图标 `Layers`）："热数据 ClickHouse（7–30 天），冷数据 S3 归档，成本降幅约 70%（需 POC 确认）†"，角标 `目标`（蓝底）。

策略三·运维可观测（图标 `Eye`）："Prometheus + Grafana + OpenTelemetry 覆盖 Metrics/Logs/Traces，降低运维人力"。

**脚注**：† 70% 成本降幅基于冷热分离 + 列式压缩 vs 传统行式数据库对比估算，实际以 POC 数据为准；Flink 端到端语义在 Kafka → Flink → ClickHouse 链路上采用"状态一致 + 幂等写"模式，具体验证见 POC 阶段；成本视数据量、留存周期与硬件配置而定。

**Gamma Prompt**：`Cost and tech selection slide. Title "成本与技术选型：开源为主·冷热分离·运维可观测". Left 55%: clean 7-row table with blue header (#2563EB) — Kafka, ClickHouse, Flink (updated description: "exactly-once state + idempotent sink, E2E verified in POC"), S3, Prometheus, OpenTelemetry, App framework. Right 45%: 3 vertical cards with icons — Open Source First (Code), Hot/Cold Separation (Layers, blue "目标" tag on 70% claim), Observable Ops (Eye). Footer with Flink semantics clarification and cost caveat.`

---

### 第 17 页 ｜ 数据安全与合规

**模板**：观点模板

**核心信息**：健康数据的安全合规是底线，不是可选项

**布局**：标题 + 五层安全体系图（左 60%）+ 合规要点列表（右 40%）

**标题**：数据安全与合规：分级分类 · 多租户隔离 · 审计留痕

**左侧五层安全体系**（纵向堆叠的五个色条，从底到顶）：

第一层·数据分级分类：体征数据标记为"敏感个人信息"，按分类定义访问策略。

第二层·多租户隔离：逻辑隔离（租户标签 + 行级权限）/ 物理隔离（独立集群，按需）。

第三层·访问控制与审计：RBAC + 操作审计日志 ｜ 所有查询/导出可追溯。

第四层·传输与存储加密：TLS 传输加密 ｜ 静态加密（AES-256）。

第五层·脱敏与留存：查询脱敏（姓名、身份证号）｜ 留存周期可配置（默认 90 天热 + 365 天冷）。

每层使用渐变蓝色条，从深到浅。

**右侧合规要点**：

"符合《个人信息保护法》《数据安全法》《网络安全法》相关要求（具体条款以客户法务确认为准）"——标签"合规设计"。

"健康数据留存周期可配置，默认策略：热存储 90 天 + 冷归档 365 天"——标签"留存策略"。

"支持数据主体权利：查询、更正、删除请求处理"——标签"数据主体权利"。

"审计日志独立存储，留存 ≥ 180 天"——标签"审计"。

**脚注**：合规设计基于截至 2026 年 2 月的法规理解，实际部署前应由客户法务团队确认适用条款；留存周期可按行业监管要求调整。

**Gamma Prompt**：`Security & compliance slide. Title "数据安全与合规：分级分类·多租户隔离·审计留痕". Left 60%: 5 stacked horizontal bars forming security layers (Classification #2563EB → Multi-tenant #3B82F6 → Access Control #60A5FA → Encryption #93C5FD → Anonymization #BAE6FD). Each bar with icon and description. Right 40%: 4 compliance points with colored tags (合规设计/留存策略/数据主体权利/审计). Footer: "合规设计基于截至 2026 年 2 月的法规理解" — updated date.`

---

### 第 18 页 ｜ 交付路径与验收指标

**模板**：图解模板

**核心信息**：三阶段交付节奏与量化验收标准

**布局**：标题 + 上部水平三阶段甘特图 + 下部验收矩阵表

**标题**：交付路径：三阶段交付 · 量化验收 · 持续演进

**上部甘特图**（水平时间轴）：

阶段一·POC/MVP（第 1–6 周）：色条科技蓝 `#2563EB`。里程碑节点："100 人试点上线"、"端到端链路验证"。

阶段二·生产可用（第 7–16 周，累计 3–4 个月）：色条辅助蓝 `#60A5FA`。里程碑节点："2000 人全量接入"、"对账回补上线"。

阶段三·规模化稳定（第 17–24 周，累计 5–6 个月）：色条生命绿 `#10B981`。里程碑节点："集团级扩展验证"、"SLA 达标确认"。

**下部验收矩阵表（rc1 修订：E2E 延迟拆双链路）**：

| 验收指标 | MVP 阶段 | 生产阶段 | 规模化阶段 |
|----------|----------|----------|------------|
| 写入成功率 WSR | ≥ 99.5% | ≥ 99.9% | ≥ 99.95% |
| Alert E2E P95 | < 5 秒 | < 3 秒 | < 3 秒 |
| Dashboard E2E P95 | < 10 秒 | < 5 秒 | < 5 秒 |
| 数据完整性 | > 99% | > 99.9% | > 99.9% |
| 对账差异 | < 1% | < 0.1% | < 0.1% |
| 看板查询 P95 | < 5 秒 | < 2 秒 | < 2 秒 |
| 系统可用性 | ≥ 99% | ≥ 99.9% | ≥ 99.9% |

**脚注**：验收指标定义见第 4 页口径统一表；Alert E2E P95 = event_time → 通知触达 P95；Dashboard E2E P95 = event_time → ADS 可查询 P95；阶段时间含客户配合与数据准备周期。

**Gamma Prompt**：`Delivery roadmap slide. Title "交付路径：三阶段交付·量化验收·持续演进". Top: horizontal Gantt with 3 phases — POC 6wk (#2563EB), Production 3-4mo (#60A5FA), Scale 5-6mo (#10B981) — with diamond milestone markers. Bottom: 7-row acceptance matrix table (WSR, Alert E2E P95, Dashboard E2E P95, Completeness, Reconciliation, Dashboard Query, Availability) × 3 phase columns. Blue header row (#2563EB). Footer differentiating Alert E2E from Dashboard E2E.`

---

### 第 19 页 ｜ 差异化优势与下一步行动

**模板**：收口模板

**核心信息**：为什么选择我们 + 明确的下一步

**布局**：上部 50% 四项差异化 + 下部 50% 三步行动 CTA

**标题**：差异化优势与下一步行动

**上部四项差异化**（水平四列，每列一个图标 + 标题 + 一句话）：

差异化一（图标 `Wrench`，科技蓝 `#2563EB`）："工程化方法论"——不是工具堆砌，是从契约到观测的体系化工程。

差异化二（图标 `FileSearch`，辅助蓝 `#60A5FA`）："全链路可追溯"——Data Trace 让每一条数据有身份、有历史、有审计。

差异化三（图标 `ShieldCheck`，生命绿 `#10B981`）："治理原生"——质量门禁、对账回补（四枚举策略）、口径字典不是插件，是平台内核。

差异化四（图标 `HeartPulse`，生命绿 `#10B981`）："健康场景深耕"——不是通用平台硬套，是针对体征数据特性优化的架构。

**下部三步行动 CTA**（水平三步，箭头连接，渐进色从蓝到绿到橙）：

步骤一（科技蓝底 `#2563EB`）："明确试点场景"——确认首个落地场景（能源/康养），对齐业务目标与数据接口。

步骤二（生命绿底 `#10B981`）："启动 POC"——4–6 周内交付可演示的 MVP，用数据说话。

步骤三（橙色底 `#F59E0B`）："规模化扩展"——从百人验证到千人落地，从单场景到集团级覆盖。

**底部联系信息**（居中，16 pt 白色）：准备好了吗？让我们在 4 周内见到第一个可运行的 Demo。

**Gamma Prompt**：`Closing slide with dark navy background (#0A1628). Title "差异化优势与下一步行动" in white. Top half: 4 equal columns — Engineering Methodology (Wrench #2563EB), Full Traceability (FileSearch #60A5FA), Native Governance (ShieldCheck #10B981), Health Scenario Expertise (HeartPulse #10B981). Each with icon, title, one-line description. Bottom half: 3-step CTA arrow flow — "明确试点场景" (#2563EB) → "启动 POC" (#10B981) → "规模化扩展" (#F59E0B). Center bottom: "准备好了吗？让我们在 4 周内见到第一个可运行的 Demo" in white 16pt.`

---

### 第 20 页 ｜ 附录：技术栈参考（隐藏页）

**模板**：图解模板

**核心信息**：完整技术栈与存储引擎细节，供技术评审按需查阅

**布局**：标题 + 五维技术栈表格 + 存储引擎补充说明

**标题**：附录：技术栈参考（仅技术评审场景启用）

**页面标记**：右上角标注"APPENDIX · 默认隐藏"（橙色 `#F59E0B` 标签）

**五维技术栈表格**：

| 维度 | 组件 | 版本/说明 | 角色 |
|------|------|-----------|------|
| **传输** | Apache Kafka | 3.x | 消息缓冲、分区有序、高吞吐 |
| **传输** | Kafka Connect | 3.x | 数据集成连接器 |
| **存储** | ClickHouse | 24.x | 列式 OLAP 热存储 |
| **存储** | S3 / MinIO | — | 冷数据归档 |
| **计算** | Apache Flink | 1.18+ | 流计算、CEP、窗口聚合（状态 Exactly-once） |
| **计算** | dbt / 自研 ETL | — | 批处理转换、DWD→DWS→ADS |
| **观测** | Prometheus | 2.x | 指标采集与告警 |
| **观测** | Grafana | 10.x | 看板与可视化 |
| **观测** | OpenTelemetry | 1.x | 分布式追踪与日志 |
| **服务** | API Gateway | 按需 | 多租户路由、限流、鉴权 |
| **服务** | 微服务框架 | Java/Go/Python | 告警服务、对账服务、导出服务 |

**存储引擎补充说明（rc1 新增）**：

ClickHouse 去重引擎选型：明细表推荐 ReplacingMergeTree（version 列为 `ingest_timestamp`），去重在后台 merge 时自动执行；查询时可选 FINAL 关键字或通过应用层窗口去重。汇总层（DWS/ADS）使用 AggregatingMergeTree 或物化视图（Materialized View）实现增量聚合。分区策略按 `toYYYYMMDD(event_time)` 日分区，TTL 策略热存储 30 天 + 冷迁移至 S3。此为参考方案，实际以 POC 验证后确定。

建模理念概要：少表高效、宽表 + 动态字段、分区对齐业务查询模式、物化视图承担常用聚合计算。

**底部备注**："技术栈以开源为主，版本号为推荐参考，实际部署按客户环境和安全策略调整。本页仅在技术评审场景下启用，默认演示时隐藏。"

**Gamma Prompt**：`Appendix slide. Title "附录：技术栈参考（仅技术评审场景启用）". Orange (#F59E0B) "APPENDIX · 默认隐藏" tag in top-right. Main: 5-category table (Transport/Storage/Compute/Observability/Service) listing 11 components with blue header. Below table: "存储引擎补充说明" section with ClickHouse dedup engine details (ReplacingMergeTree, version column, FINAL, partition strategy, TTL, cold migration). Modeling principles note. Bottom: disclaimer about open-source preference and slide being hidden by default.`

---

## 5 ｜ 页序总览表

| 页码 | 标题 | 模板类型 | 核心图形 | Data Trace | KPI 角标 |
|------|------|----------|----------|------------|----------|
| 1 | 封面 | 封面 | 抽象数据流 | — | — |
| 2 | 价值主张 | 观点 | 三列痛点卡片 | — | — |
| 3 | 场景全景 | 图解 | 双栏对比 | — | — |
| 4 | 口径统一 | 观点 | 口径表 + 漏斗 | — | — |
| 5 | 方法论 | 图解 | 五步闭环流程 | — | — |
| 6 | 平台架构总览 | 图解 | 六层 + 治理面 | ✓ Standard | — |
| 7 | 核心能力①高吞吐 | 观点 | 流程 + KPI 卡片 | — | ✓ 三枚 |
| 8 | 核心能力②质量闭环 | 图解 | 环形闭环 + 四枚举表 | — | — |
| 9 | 核心能力③实时告警 | 观点 | 时间轴 + 规则卡片 | — | ✓ 一枚 |
| 10 | 核心能力④秒级看板 | 图解 | 看板线框 | — | ✓ 四枚 |
| 11 | Data Trace 时间线 | 图解 | Trace 时间轴 | ✓ Full | — |
| 12 | 案例一·能源 | 案例 | 场景 + KPI | ✓ Standard | ✓ 四枚 |
| 13 | 案例一交付物 | 图解 | 甘特 + 拓扑 | — | — |
| 14 | 案例二·康养 | 案例 | 场景 + KPI | ✓ Standard | ✓ 三枚 |
| 15 | 案例二交付物 | 图解 | 时间线 + 联动流程 | — | — |
| 16 | 成本与选型 | 观点 | 选型表 + 策略卡片 | — | ✓ 一枚 |
| 17 | 安全与合规 | 观点 | 五层安全 + 合规要点 | — | — |
| 18 | 交付路径与验收 | 图解 | 甘特 + 验收矩阵（7 行） | — | — |
| 19 | 差异化与下一步 | 收口 | 四列差异 + CTA | — | — |
| 20 | 技术栈附录（隐藏） | 图解 | 五维表 + 引擎补充 | — | — |

---

## 6 ｜ 演讲节奏与页序建议

### 场景 A：Sales / 售前宣讲（15–20 分钟）

| 时段 | 页码 | 时长 | 要点 |
|------|------|------|------|
| 开场 | 1→2 | 2 分钟 | 快速亮出痛点与价值锚 |
| 场景 | 3 | 2 分钟 | 能源与康养双场景概览 |
| 方法论 | 5 | 1 分钟 | 一句话工程化方法论 |
| 架构 | 6 | 2 分钟 | 六层 + 治理面快速过 |
| 核心能力 | 7→9 | 3 分钟 | 高吞吐 + 质量 + 告警各 1 分钟，关注角标标签增强可信度 |
| 案例 | 12→14 | 4 分钟 | 能源 2 分钟 + 康养 2 分钟，用 Data Trace 卡片展示追溯能力 |
| 差异化 | 19 | 2 分钟 | 为什么选我们 + CTA |
| 预留 | — | 2–4 分钟 | Q&A |

**跳过页**：4（口径统一）、8（质量闭环细节）、10（看板）、11（Data Trace 时间线）、13/15（交付物切片）、16（成本选型）、17（安全合规）、18（交付路径）、20（附录）

**售前焦点**：价值、案例、差异化。避免过多技术细节，用 KPI 数字和 Before/After 对比打动业务决策者。角标标签帮助建立可信度（"这不是吹牛，我们区分了推导和实测"）。

### 场景 B：Tech Review / 技术评审（25–30 分钟）

| 时段 | 页码 | 时长 | 要点 |
|------|------|------|------|
| 开场 | 1→2 | 2 分钟 | 定位与痛点 |
| 场景 | 3 | 1 分钟 | 场景概览 |
| 口径 | 4 | 2 分钟 | 口径统一——技术评审必看，重点讲 Alert vs Dashboard 双 E2E 拆分 |
| 方法论 | 5 | 2 分钟 | 工程化五步展开 |
| 架构 | 6 | 3 分钟 | 六层 + 治理面深入讲解，强调四枚举对账策略 |
| 核心能力 | 7→10 | 8 分钟 | 四项能力各 2 分钟；第 7 页强调幂等去重策略而非具体引擎；第 9 页说明 Flink 状态一致性 + 幂等落库 |
| Data Trace | 11 | 2 分钟 | 全链路追踪时间线 + Full 卡片 |
| 案例 | 12→15 | 4 分钟 | 两案例含交付物切片 |
| 成本/安全 | 16→17 | 3 分钟 | 选型逻辑 + 安全体系；Flink 语义标注重点过 |
| 交付/验收 | 18 | 2 分钟 | 三阶段 + 7 行验收矩阵 |
| 差异化 | 19 | 1 分钟 | 快速收口 |
| 附录 | 20 | 按需 | 技术栈答疑；存储引擎补充说明重点备用 |
| 预留 | — | 2–4 分钟 | Q&A |

**技术评审焦点**：口径定义（Alert vs Dashboard 双 E2E）、reconcile_status 四枚举与回补策略映射、Flink 端到端语义（状态一致 + 幂等落库 vs 全链路 Exactly-once）、去重策略而非引擎绑死、验收指标可量化性、技术选型依据。

**技术评审常见追问预案**：

Q：端到端 Exactly-once 怎么保证？——A：流处理层状态一致（Flink checkpoint），落库采用幂等键（trace_id + event_time）；端到端结果一致性以 POC 验证为准，我们不承诺 Kafka→ClickHouse 全链路 Exactly-once，而是 At-least-once + 幂等去重。

Q：ClickHouse ReplacingMergeTree 的 FINAL 查询开销？——A：明细查询可选 FINAL 或应用层窗口去重；常用场景走 ADS 物化视图预聚合，不依赖 FINAL。引擎选型见附录。

Q：reconcile_status GAP 太笼统？——A：已拆为 MISSING/LATE/DUP 三类 + MATCHED，各有独立回补/消解策略。

Q：告警延迟和看板延迟为什么混在一起？——A：已拆为 Alert E2E P95 < 3 秒（通知触达）和 Dashboard E2E P95 < 5 秒（ADS 可查询），两条独立链路独立验收。

### 场景 C：代理商宣讲（参考，20–25 分钟）

以场景 A 为基础，额外强调第 16 页成本优势和第 13/15 页交付物切片（代理商关注可复制性与交付周期），弱化第 11 页 Data Trace 技术细节。增加第 18 页交付路径（代理商需评估资源投入）。

---

## 7 ｜ 品牌一致性备注（与智能体平台 PPT 对齐）

本 PPT 与企业智能体平台 PPT（v1.0）共享同一品牌体系，需确保以下维度一致：

**配色**：两份 PPT 使用完全相同的色系（`#0A1628` / `#2563EB` / `#60A5FA` / `#10B981` / `#F59E0B` / `#FFFFFF` / `#94A3B8`），不得任一 PPT 引入额外品牌色。

**字体**：中文思源黑体 + 英文 Inter，字号体系一致（标题 32–40 pt / 正文 16–20 pt / 注释 12–14 pt）。

**模板**：五种模板（封面/观点/图解/案例/收口）的结构布局在两份 PPT 中保持一致，仅内容不同。

**CTA 风格**：收口页的 CTA 按钮均使用橙色 `#F59E0B` 圆角矩形（圆角 8 px），文字白色 Bold。

**图标风格**：统一使用 Phosphor 或 Lucide 线条图标，不混用。

**Trace 卡片域隔离（关键规则）**：健康数据平台使用"Data Trace"卡片，边框 `#60A5FA`，字段以 `trace_id`、`source_device`、`schema_version`、`quality_check`、`reconcile_status`（MATCHED/MISSING/LATE/DUP）等为核心。智能体平台使用"Evidence & Trace"卡片（字段以 `trace_id`、`policy_id`、`kb_snapshot`、`tool_calls` 等为核心）。两个域的字段命名不得交叉引用，避免"串台"。健康数据平台不使用 `policy_id`；智能体平台不使用 `reconcile_status`、`is_backfill`、`storage_layer`。

**验收口径风格**：两份 PPT 的验收指标表格均采用相同的表头配色（科技蓝 `#2563EB`）、分阶段列结构（MVP / 生产 / 规模化），脚注格式一致。

**架构表达风格**：健康数据平台为"六层数据面 + 治理面"，智能体平台为"五层模型 + 四核心组件"。两者图示风格一致（水平色条堆叠 + 右侧纵向贯穿色块），仅层数与标签不同。

**KPI 角标标签**：两份 PPT 共享同一角标规范（1.6 节），颜色与含义一致。

---

## 8 ｜ 六张核心图的 draw.io / Figma 绘制规格

以下为本 PPT 中 6 张最复杂图形的独立绘制规格，可交付给设计师或直接在 draw.io / Figma 中执行。

### 图 1 ｜ 平台架构总览（第 6 页）

画布：1920 × 1080 px。背景：Sales 版 `#FFFFFF`，Tech Review 版 `#0A1628`（图形承载在 `#F8FAFC` 卡片内）。六层色条各高 100 px，宽 1200 px，起始 x=64，y 从 820（采集层）到 220（展示层），层间距 20 px。治理面色块 x=1340, y=200, 宽=400, 高=640，填充 `#F59E0B` opacity 15%，边框 `#F59E0B` 1.5 px。每层内左侧放图标（32 px），右侧文字标签（Inter Bold 16 pt）。层间连线：白色箭头 1.5 px（Tech Review 版）或深蓝箭头（Sales 版白底时）。治理面与各层连线：橙色虚线 1 px。DataTraceCard_Standard 置于 x=1400, y=800, 320×200 px，边框 `#60A5FA`。导出 SVG + PNG @2x。

### 图 2 ｜ 方法论五步闭环（第 5 页）

画布：1920 × 1080 px。背景同模板规则。五个圆角矩形（180×120 px，圆角 8 px），水平排列，y=400，起始 x=140，间距 300 px。填充从左到右渐变：`#0A1628` → `#1E3A5F` → `#2563EB` → `#3B82F6` → `#10B981`。连线科技蓝箭头 1.5 px。每个节点上方：图标 24 px。节点内文字白色 14 pt Inter Bold + 12 pt Regular。节点下方注释灰色 12 pt，y=540。底部回环箭头从第五节点回到第一节点（虚线 `#94A3B8` 1 px，弯曲路由）。

### 图 3 ｜ 质量闭环环形（第 8 页）

画布：1920 × 1080 px。背景同模板规则。四个圆角矩形（220×110 px）排成菱形，中心 (860, 480)。节点一（上，y=240）→ 节点二（右，x=1240）→ 节点三（下，y=720）→ 节点四（左，x=480）→ 回到节点一。连线科技蓝箭头 1.5 px，弯曲路由。中心圆形文字区域（半径 80 px），填充 `#10B981` opacity 10%，文字 `#10B981` Bold 24 pt。每个节点左侧图标 24 px，内部两行文字 14/12 pt。**rc1 新增**：环外右侧（x=1400, y=280）放置四枚举映射迷你表格，4 行 2 列（状态 / 策略），宽 360 px，行高 36 px，表头 `#2563EB`。

### 图 4 ｜ Data Trace 时间线（第 11 页）

画布：1920 × 1080 px。主轴 y=480，从 x=100 到 x=1300。六个节点（实心圆 40 px `#2563EB`），x 间距 200 px。每个节点上方文本框 180×140 px（`#F8FAFC` 填充，`#E2E8F0` 边框 1 px，圆角 4 px），内含字段名值对（字段名 12 pt `#94A3B8`，值 14 pt `#0A1628`）。主轴下方渐变条 y=510, 高 6 px，从 `#2563EB` → `#10B981`。右侧 DataTraceCard_Full x=1440, y=240, 380×440 px，边框 `#60A5FA` 1.5 px，内填充 `#0F172A`。

### 图 5 ｜ 交付甘特图（第 18 页）

画布：1920 × 1080 px。时间轴 y=280，从 x=200 到 x=1700。三段色条（高 48 px，圆角 4 px）：阶段一 x=200 至 x=600 `#2563EB`，阶段二 x=620 至 x=1200 `#60A5FA`，阶段三 x=1220 至 x=1700 `#10B981`。里程碑节点为色条上方菱形标记 16 px。时间轴下方标注周数。验收矩阵表格 y=440，宽 1400 px，**7 行 4 列**（rc1：新增 Dashboard E2E P95 行），表头 `#2563EB`，行交替 `#F8FAFC` / `#FFFFFF`。

### 图 6 ｜ 五层安全体系（第 17 页）

画布：1920 × 1080 px。五个水平色条，宽 900 px，高 80 px，圆角 8 px。y 从 200 到 680，间距 40 px。颜色从上到下渐变：`#2563EB` → `#3B82F6` → `#60A5FA` → `#93C5FD` → `#BAE6FD`。每层内左侧图标 24 px，右侧标题 + 一行描述。右侧（x=1080）合规要点四行，各含标签色块 + 文字。

---

## 9 ｜ 制作执行清单

| 序号 | 执行项 | 负责角色 | 状态 |
|------|--------|----------|------|
| 1 | 确认画布比例 16:9 | PM / 客户 | ✅ 已确认 |
| 2 | 确认案例一规模口径对外可写 | PM / 法务 | ✅ 2000 人，1.728 亿条/天 |
| 3 | 确认对外表述分级（实测/目标/推导） | PM | ✅ 见 1.6 节 + 3.2 节 |
| 4 | Data Trace 卡片边框统一为 #60A5FA | 设计师 | ✅ rc1 修订 |
| 5 | reconcile_status 统一为 4 枚举 | 内容 / QA | ✅ rc1 修订 |
| 6 | E2E 延迟拆双链路（Alert / Dashboard） | 内容 | ✅ rc1 修订 |
| 7 | Flink 语义改写（状态一致 + 幂等落库） | 内容 | ✅ rc1 修订 |
| 8 | ClickHouse 引擎移至附录 | 内容 | ✅ rc1 修订 |
| 9 | KPI 角标标签规范落地 | 设计师 | ☐ 待执行 |
| 10 | 合规脚注日期更新为 2026 | 内容 | ✅ rc1 修订 |
| 11 | 制作 6 张核心图（draw.io/Figma） | 设计师 | ☐ 待执行 |
| 12 | 撰写 Gamma/Beautiful.ai Prompt 序列 | 内容 | ✅ 见各页 Gamma Prompt |
| 13 | 统一图标下载（Phosphor/Lucide） | 设计师 | ☐ 待执行 |
| 14 | 口径脚注全页检查（含双 E2E 拆分） | QA | ☐ 待执行 |
| 15 | Data Trace 卡片字段一致性检查（含 4 枚举） | QA | ☐ 待执行 |
| 16 | 品牌一致性交叉审查（vs 智能体 PPT） | 设计师 | ☐ 待执行 |
| 17 | 演讲备注撰写（Speaker Notes，含追问预案） | 内容 | ☐ 待执行 |
| 18 | 技术评审场景试讲（30 分钟） | 主讲 | ☐ 待安排 |
| 19 | 售前场景试讲（20 分钟） | 主讲 | ☐ 待安排 |
| 20 | Sales 版 / Tech Review 版母版底色分版确认 | 设计师 / PM | ☐ 待执行 |

---

## 10 ｜ 输出物选项

本指南支持两种落地路径，可并行输出：

**路径 A：Gamma / Beautiful.ai 逐页 Prompt 序列**——每一页的 Gamma Prompt 已内嵌于第 4 节各页规格中（以 `Gamma Prompt:` 标记）。设计师可直接将 Prompt 粘贴至 Gamma 或 Beautiful.ai 的 AI 生成界面，逐页生成初稿后微调配色与字体。rc1 版本的 Prompt 已更新：含角标标签指示、双 E2E 拆分、四枚举标注、Flink 语义改写。

**路径 B：draw.io / Figma 逐图绘制说明**——6 张核心图的完整绘制规格已写在第 8 节，包含画布尺寸、坐标、颜色值、线宽、圆角、导出格式。rc1 版本更新：图 3 新增四枚举迷你表格、图 5 验收矩阵增至 7 行、图 1/图 4 边框色统一 `#60A5FA`。设计师在 draw.io 或 Figma 中按规格绘制，导出 SVG + PNG @2x，嵌入 PPT 模板中。

两种路径可结合使用：先用路径 A 快速生成页面框架，再用路径 B 替换其中的 6 张核心图为高精度自制版本。

---

## 11 ｜ rc1 修订追溯矩阵

以下矩阵将评审提出的每一项硬修正 / 增强建议映射到本文档的具体修改位置，确保可审计。

| 评审编号 | 评审要点 | 修订位置 | 修订内容摘要 |
|----------|----------|----------|-------------|
| A1 | Data Trace 卡片边框色不一致 | §2.2 | 边框统一为 `#60A5FA`；图标色同步 |
| A2 | reconcile_status 枚举笼统 | §2.1, §3.4, §8 页 | 拆为 MATCHED/MISSING/LATE/DUP 四枚举 + 策略映射表 |
| A3 | 图解模板白底与深蓝风冲突 | §1.4 | 新增"背景裁决规则"，按 Sales/Tech Review 分治 |
| A4 | Flink Exactly-once 表述被挑战 | §9 页, §16 页, §20 页 | 改为"状态一致 + 幂等落库，E2E 以 POC 验证" |
| A5 | ReplacingMergeTree 写死在主稿 | §7 页, §20 页 | 主稿改为"幂等键 + 去重策略"，引擎细节移至附录 |
| B1 | E2E 延迟未拆双链路 | §3.1, §4 页, §9 页, §10 页, §18 页 | 拆为 Alert E2E P95 < 3s 与 Dashboard E2E P95 < 5s |
| B2 | 处置时间缺统计口径 | §3.1, §12 页 | 补"P50（中位数）"定义 |
| B3 | 案例 KPI 缺视觉标记 | §1.6（新增）, 所有案例/能力页 | 新增角标标签规范 + 逐页标注 |
| C1 | 卡片字号与全局代码字号冲突 | §1.2 | 新增"卡片例外规则"声明 |
| C2 | 卡片尺寸不一致 | §2.2 | 定义 Standard（320×200）与 Full（380×440）两种组件 |
| C3 | 合规脚注日期过时 | §17 页 | 更新为"截至 2026 年 2 月" |

---

**— 文档结束 —**

**版本**：v2.3-final-rc1 ｜ **日期**：2026-02-10 ｜ **状态**：可交付（7 项硬修正已全部落地）