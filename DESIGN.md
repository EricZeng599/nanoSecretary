# 赛博秘书 · DESIGN.md

> 当前视觉系统的快照。记录了 2026-08 各窗口手工 CSS 的实际设计语言。
> 它是「现在是什么样」的权威记录；任何改动前以此为基线，改动后同步更新本文件。

## 模式

**Operate** —— 用户在完成任务：速记、看待办、收提醒、问 AI。可扫描性、一致性、原生预期优先于表现欲。

## 设计世界

**深色玻璃拟态（Dark Glass）**：所有窗口为无边框透明 Electron 窗口，承载半透明毛玻璃卡片。核心语言是「一层深色玻璃浮在桌面上」，用 `backdrop-filter: blur + saturate`、半透明白色边框、内高光/外投影制造材质感。

## 设计 token（2026-08 起，`tokens.css` 统一维护）

> 三个页面 `<link>` 共享 `tokens.css`。语义命名（surface/text/action/status/border）；调色必须改 token，不再逐文件手写。

- **主 CTA**：`--action-gradient` = `linear-gradient(135deg,#5a8dff,#3f6ae0)`（深蓝，白字 ≥ 4.5:1，替代原 2.6:1 不达标值）
- **红色徽标**：`--status-danger` `#f2555a`（白字 4.5:1，替代原 `#e5484d` 3.9:1）
- 文字：primary 0.95 / secondary 0.75 / tertiary 0.6 / faint 0.5（对玻璃底均 ≥ 4.5:1）
- 圆角 / 阴影 / 动效时长均有 token；类型尺度收敛为 4 档（title 18 / body 13 / meta 12 / tiny 11）

## 图标系统（2026-08 起）

- `icons.js` 暴露 `window.nanoIcons.ic(name)`：统一 24×24 线性 SVG（1.8px 描边、`currentColor` 继承），替代散落 emoji（📋💬📌⏰🔥 等已清除）
- 图标名：note/pin/todo/fire/clock/calendar/tag/chat/book/check/check-circle/restore/trash/edit/copy/close/diamond/chevron-right/settings/dots

## 色彩 token（手工值，未抽变量）

| Token | 值 | 用途 |
|---|---|---|
| 玻璃底 | `rgba(24-30, 24-30, 28-36, 0.85-0.97)` | 卡片/面板底色 |
| 面板底（输入面板） | `rgba(28,28,32,0.9)` | 悬浮球展开面板 |
| 主蓝 | `rgba(120,180,255,…)` / `#78b4ff` 系 | 激活态、主按钮、AI 高亮、对话气泡 |
| 主蓝渐变 | `linear-gradient(135deg, rgba(120,180,255,0.9), rgba(90,140,255,0.9))` | 主 CTA 按钮 |
| 中性按钮底 | `rgba(120,130,150,0.9)→rgba(80,88,104,0.9)` | 次级按钮（球面板） |
| 红（逾期/高危） | `#e5484d` | 逾期、高优先级、删除 |
| 橙（今天/提醒） | `#ff8c42` / `#ffa844` | 今天截止、到期、改期 |
| 绿（完成/成功） | `#4caf50` / `#50c878` | 已完成、保存成功 |
| 状态蓝绿（AI 在线） | `#8be8b2` | AI 在线徽标 |
| 文字主 | `white` / `rgba(255,255,255,0.85)` | 正文 |
| 文字次 | `rgba(255,255,255,0.6-0.75)` | 元信息、说明 |
| 文字弱 | `rgba(255,255,255,0.45-0.55)` | 占位、空态、提示 |
| 分隔/边框 | `rgba(255,255,255,0.07-0.12)` | 卡片描边、分割线 |
| 悬浮球本体 | 灰蓝渐变 + 左上径向高光 | 静止态 |

## 排版

- 字体栈：`system-ui, -apple-system, "Segoe UI", "Microsoft YaHei", sans-serif`（全系统统一）
- 根字号 `1rem = 16px`，随系统缩放
- 标题：`1.125–1.25rem / 700`，负字距 `-0.015em ~ -0.02em`
- 正文/列表：`0.8125rem`；元信息/按钮/标签：`0.6875rem`；弱提示：`0.625rem`
- 行高：正文 `1.5`

## 形状与层级

- 圆角：卡片 10–12px，面板 14–16px，胶囊（chips/tabs/状态徽标）16–20px，按钮 6–10px
- 阴影：面板 `0 8px 30-40px rgba(0,0,0,0.4)` + `inset 0 1px 0 rgba(255,255,255,0.08)` 内高光
- 卡片内左边框色条（3px）作为状态视觉锚：逾期红 / 今天橙 / 完成绿 / 备忘灰
- 滚动条：细窄 6–8px，`rgba(255,255,255,0.12-0.15)` 圆角

## 关键交互

- **悬浮球**：常驻呼吸动画（2.4s）；到期橙色呼吸（1.8s）；逾期/紧急红色脉冲（1.2s + 扩散光圈）；保存成功绿色闪光 + `✓` 图标；待办数角标（红点数字）
- **双击展开**：面板从球方向 `scale(0.92)→1` + 透明度，`cubic-bezier(0.2,0.9,0.3,1.2)` 微弹；`Esc` 收起
- **输入**：快速记录（一句话 + AI 实时预览）与结构化表单双模式 Tab；`Enter` 保存
- **AI 预览**：蓝调浅底卡片，显示识别出的标题/截止/优先级/分类
- **列表操作**：hover 增亮；完成时卡片 `opacity→0 + scale(0.96) translateX(8px)` 淡出；删除用系统 `confirm()`
- **设置**：主页面中央遮罩 + 深色毛玻璃弹层，iOS 风格 switch（40×22，滑珠 18px）

## 平台注意

- 无边框透明窗口：顶部 24px `-webkit-app-region: drag` 拖拽条；悬浮球/面板用 Pointer Events + `setPointerCapture` 防拖拽事件丢失
- `select option` 强制 `#1e1e24` 底白字，避免系统白底白字
- `color-scheme: dark` 保证日期/下拉控件暗色原生控件
- 无障碍：`prefers-reduced-motion` 停动画、`prefers-reduced-transparency` 提不透明度降模糊；悬浮球为 `role="button"`（键盘 Enter/Space 打开输入面板）

## 实现安全基线（2026-08 加固）

- 三个 HTML 均带 CSP：`default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'`（无构建工具链，样式需内联）；`lang="zh-CN"`
- 内联 `<script>` 已全部外置为 `index.js` / `homepage.js` / `history.js`；列表操作用事件委托 + `data-action`/`data-id`，无内联 `onclick`（否则 CSP 会拦）
- 全局 `:focus-visible` 焦点环（`rgba(120,180,255,0.9)` 描边）；设置弹层 `role="dialog"` + 焦点圈定 + Esc 关闭；AI 开关 `role="switch"` + `aria-checked`
- 常驻呼吸动画由 `index.js` 里的 `matchMedia('(prefers-reduced-motion: reduce)')` 门控，不再无条件添加 `.breathe`（修复原 CSS 媒体查询死代码）
- 打包脚本 `pack.bat` 需同步拷贝三个 `.js` 文件

## 已知不一致（供后续 critique 引用）

1. ~~无统一设计 token~~ → 已由 `tokens.css` 统一（2026-08）
2. ~~主页面 CTA 蓝渐变 vs 输入面板灰蓝渐变~~ → 已统一语义：主 CTA 用 `--action-gradient`；输入面板保存为中性次级按钮（不同层级，非不同色相）
3. 空态文案风格不一（「没有待办，记点什么吧」「暂无记录」）
4. ~~删除确认用系统 `confirm()`~~ → 已改内联双步确认条
5. ~~状态表达有 emoji 混排~~ → 已换统一线性 SVG 图标
6. 待补：设置页仍为占位实现（模型选择/提前量可读写，交互偏简陋）；真实 Ollama 联调未做
