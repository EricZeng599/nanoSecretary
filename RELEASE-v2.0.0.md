# nanoSecretary v2.0.0 · Release Notes

> 发布日期：2026-09-07 · 版本：v2.0.0 · 平台：Windows x64（免安装，解压即用）

一个以「诚实呈现 + 本地 AI」为底色的桌面秘书 v2 版本——本版聚焦一张更可信、更完整的仪表盘，并把整套图标切换到 NanoSecretary 专属视觉。

---

## 下载

- 安装包：`release/nanoSecretary-v2.0.0-win32-x64.zip`
- 解压后双击 `nanoSecretary.exe` 即可运行，无需安装

---

## 🎨 图标更新（本版主打）

应用图标全面切换为 **NanoSecretary 256×256** 专属视觉：

- **任务栏窗口**图标
- **系统托盘**图标
- **系统通知**图标
- **EXE 文件本身**：打包时用 `tools/rcedit-x64.exe` 把 ICO 嵌入 PE 资源（`FileDescription` / `ProductName` / 版本号同步设置），Windows 资源管理器与搜索里的文件图标也已替换
- 打包产物 `package.json` `build.icon` 与 `pack.bat` 拷贝清单同步；`pack.bat` 新增 `[4/4]` 自动嵌图标步骤

> 本次图标切换是完整的：任务栏/托盘/通知/EXE 文件图标均已换成 NanoSecretary 视觉。

---

## ✨ 仪表盘 critique 复评修复（5 项）

基于设计评审复评（34/40，强档）落地，主要解决「诚实呈现」相关的隐藏问题：

| 级别 | 问题 | 修复 |
|---|---|---|
| P1 | AI 状态可能永远悬在「连接中」 | 兜底改用布尔标记 `aiStatusResolved` 判定，`getAiStatus` 静默不回包 4 秒后转「AI 离线」（原字符串匹配因省略号在伪元素里而永不成立，是死代码） |
| P1–P2 | 对话页打开是功能空窗 | 新增空态：衬线标题「你的 nanoSecretary 在线」+ 能力提示 + 3 个可点建议（「我今天有什么安排？」等），点击填入输入框即问 |
| P2 | 仪表盘标签详情与列表筛选不同步 | 清除筛选时同步重置仪表盘选中标签与详情行，不再出现「detail 说 7 项但列表已 17」 |
| P2–轻 | 「下一件」定位高亮随重渲染丢失 | 高亮改为 `focusFlashId` 状态驱动、渲染时落地，重渲染后仍命中目标 |
| P3 | 离线模型状态文案重复 | 「未检测到（使用默认 qwen2.5:3b）」精简，保留一句可操作引导 |

> 这 5 项是对 `1.x` 上已修复的「幽灵筛选栏 / 环段对比 / 图例双轴 / formatTime 兜底 / AI 连接反馈」的再一轮深化。

---

## 🔒 安全基线（延续）

- Electron 28 · `contextIsolation:true` · `sandbox:true` · CSP 无内联脚本
- 全脚本外置 + 事件委托（`data-action`/`data-id`），无内联 `onclick`
- 暖暗 editorial 视觉系统（`tokens.css` 语义化统一维护）

---

## ⚠️ 已知限制

- **托盘图标小尺寸锐度**：新 ICO 为单帧 256×256，托盘 16px 下会缩放略淡；多帧版（16/32/48）后续可替换。
- **Ollama 联调**：真实 Ollama 联调尚未做端到端验证；设置页仍有占位实现。
