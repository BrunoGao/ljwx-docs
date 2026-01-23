# Giscus 配置步骤（BrunoGao/ljwx-docs）

## ✅ 已完成
- [x] GitHub 仓库已创建：`BrunoGao/ljwx-docs`
- [x] 代码已推送到 GitHub

## 📋 接下来的步骤

### 第 1 步：启用 Discussions（2 分钟）

1. 访问您的 GitHub 仓库：
   ```
   https://github.com/BrunoGao/ljwx-docs
   ```

2. 点击仓库顶部的 **Settings**（设置）标签

3. 在左侧菜单中，找到 **General**（常规）部分

4. 向下滚动到 **Features**（功能）区域

5. 勾选 ✅ **Discussions** 复选框

6. 点击页面底部的 **Save changes**（保存更改）

### 第 2 步：安装 Giscus App（1 分钟）

1. 访问 Giscus App 安装页面：
   ```
   https://github.com/apps/giscus
   ```

2. 点击绿色的 **Install** 按钮

3. 选择安装位置：
   - 选择 **Only select repositories**（仅选定的仓库）
   - 在下拉菜单中选择 `BrunoGao/ljwx-docs`

4. 点击 **Install** 确认安装

### 第 3 步：获取 Giscus 配置（2 分钟）

1. 访问 Giscus 配置页面：
   ```
   https://giscus.app/zh-CN
   ```

2. 在 **仓库** 输入框中填写：
   ```
   BrunoGao/ljwx-docs
   ```

3. 页面会自动验证，您应该看到：
   ```
   ✅ 公开仓库
   ✅ 已安装 giscus app
   ✅ 已启用 Discussions
   ```

4. 在 **Discussion 分类** 部分：
   - 选择 **Announcements** 或 **General**（推荐 General）

5. 向下滚动到 **启用 giscus** 部分

6. 复制生成的配置代码，找到这四个值：
   ```html
   data-repo="BrunoGao/ljwx-docs"
   data-repo-id="R_kgDO..."           ← 复制这个值
   data-category="General"
   data-category-id="DIC_kwDO..."     ← 复制这个值
   ```

### 第 4 步：更新配置文件

**请将您获取的配置值告诉我，格式如下：**

```
repo-id: R_kgDO...
category: General
category-id: DIC_kwDO...
```

我会帮您更新配置文件。

---

## 🎯 快速链接

- GitHub 仓库：https://github.com/BrunoGao/ljwx-docs
- Giscus App：https://github.com/apps/giscus
- Giscus 配置：https://giscus.app/zh-CN

## 💡 提示

- 如果看不到 Settings 标签，请确认您已登录 GitHub 且有仓库的管理权限
- Discussions 启用后，仓库顶部会出现 **Discussions** 标签
- Giscus App 安装后，可以在 Settings → Integrations 中查看

## ❓ 遇到问题？

如果遇到任何问题，请告诉我具体的错误信息或截图，我会帮您解决。
