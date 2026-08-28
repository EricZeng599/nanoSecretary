# 赛博秘书 · DESIGN.md

> 当前视觉系统的快照。记录了 2026-08 各窗口的实际设计语言。
> 它是「现在是什么样」的权威记录；任何改动前以此为基线，改动后同步更新本文件。

## 模式

**Operate** —— 用户在完成任务：速记、看待办、收提醒、问 AI。可扫描性、一致性、原生预期优先于表现欲。

## 设计世界

**暖暗色 editorial（Warm Editorial）** —— 移植自 DeepTutor（`D:\my-deeptutor`）的视觉语言。核心是「暖近黑底上的一层纸墨质感」：暖黑背景承载极简输入框与细边框卡片，赭橙只用于动作与状态锚点。无玻璃、无蓝、无渐变——靠层次分明的暖色阶与衬线标题制造编辑部气质。

## 色彩 token（`tokens.css` 统一维护，语义命名）

| Token 族 | 值 | 用途 |
|---|---|---|
| 主表面 | `#1a1918` | 页面底（暖近黑，同 deeptutor） |
| 面板/卡片 | `#201e1c` `#242220` | 输入面板、列表卡 |
| 弹层/激活 | `#2a2725` `#302d2a` | 设置弹层、导航激活 |
| 边框 | `#2e2b28` `#3a3634` | 分隔线、控件描边 |
| 主色（赭橙） | `#d4734b` | 主按钮、tab 下划线、focus、switch |
| 按钮文字 | `#1a1918` 深字 | 赭橙按钮上的深色字（5.31:1） |
| 危险 | `#c53a2c` | 逾期、删除 |
| 成功 | `#6fa86b` | 完成、AI 在线 |
| 文字主 | `#e8e4de` 暖白 | 正文 |
| 文字次 | `#c2bbb2` | 元信息 |
| 文字弱 | `#a39c93` | 占位、提示 |
| 文字更弱 | `#8a837a` | 空态、弱提示 |

## 排版

- 标题：`Georgia, "Times New Roman", "Songti SC", "SimSun", serif`（Lora 的 Windows 回退，deeptutor 用 Lora）；`1.125–1.25rem / 500`，负字距 `-0.02em`
- 正文：`system-ui, "Microsoft YaHei", sans-serif`（deeptutor 用 Geist）；`0.8125rem`
- 元信息 `0.75rem`，辅助 `0.6875rem`
- 分类列表标题：`letter-spacing 0.04em` 小字大写感

## 形状与层级

- 圆角：极简 editorial —— 输入框 2px、按钮 6px、卡片 8px、面板 10px（deeptutor 输入框 0 圆角）
- 阴影：柔和深影（无玻璃高光），`0 8px 30-40px rgba(0,0,0,0.5)` + 极淡内高光
- 卡片左侧 2px 色条作为状态锚：逾期红 / 今天赭橙 / 完成绿 / 备忘暖灰
- 滚动条：细窄 6–8px，暖灰

## 关键组件

- **Tab**：下划线式（底部 2px 赭橙线标示激活），无胶囊背景 —— deeptutor 导航气质
- **主按钮**：赭橙实底 + 深字（hover 提亮 `#e08a5e`，深字 6.66:1）
- **输入框**：近透明底 + 1px 暖边框 + 2px 圆角，focus 赭橙描边 —— deeptutor 极简 editorial
- **次级按钮**：透明底 + 暖描边
- **状态 chip**：透明底 + 描边，激活暖黑底
- **对话气泡**：user = 赭橙浅底描边，ai = 暖黑卡片描边

## 关键交互

- **悬浮球**：暖灰球（`linear-gradient(#3a3734,#262421)`）；常驻呼吸（2.4s）；到期赭橙呼吸（1.8s）；逾期红脉冲（1.2s + 扩散光圈）；保存成功暖绿闪光；待办数角标
- **双击展开**：面板从球方向 `scale(0.96)→1` + 透明度，`cubic-bezier(0.2,0.7,0.2,1)`；`Esc` 收起
- **输入**：快速记录（一句话 + AI 实时预览）与结构化表单双模式 Tab；`Enter` 保存
- **AI 预览**：赭橙浅底卡片
- **列表操作**：hover 增亮；完成时卡片淡出；删除用内联双步确认条
- **设置**：主页面中央遮罩 + 暖黑弹层，switch（40×22）

## 图标系统

- `icons.js` 暴露 `window.nanoIcons.ic(name)`：统一 24×24 线性 SVG（1.8px 描边、`currentColor` 继承）
- 图标名：note/pin/todo/fire/clock/calendar/tag/chat/book/check/check-circle/restore/trash/edit/copy/close/diamond/chevron-right/settings/dots

## 平台注意

- 无边框透明窗口：顶部 24px `-webkit-app-region: drag` 拖拽条；悬浮球/面板用 Pointer Events + `setPointerCapture` 防拖拽事件丢失
- `select option` 强制 `#201e1c` 底暖白字，避免系统白底白字
- `color-scheme: dark` 保证日期/下拉控件暗色原生控件
- 无障碍：`prefers-reduced-motion` 停动画；悬浮球 `role="button"`（键盘 Enter/Space 打开）；对话输入框 focus outline 四向留白 ≥4px 防裁边

## 实现安全基线

- 三个 HTML 均带 CSP：`default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'`；`lang="zh-CN"`
- 脚本外置 + 事件委托（`data-action`/`data-id`），无内联 `onclick`
- 全局 `:focus-visible` 焦点环（赭橙）；设置弹层 `role="dialog"` + 焦点圈定 + Esc；AI 开关 `role="switch"`
- 呼吸动画 `matchMedia('(prefers-reduced-motion: reduce)')` 门控
- `sandbox: true`；打包 `pack.bat` 拷贝 tokens.css/icons.js 及全部 JS

## 已知不一致（供后续 critique 引用）

1. 空态文案风格不一（「没有待办，记点什么吧」「暂无记录」）
2. 待补：设置页仍为占位实现；真实 Ollama 联调未做
3. deeptutor 的中文界面是它自己的语言体系（主页/伙伴/智能体等），赛博秘书保留自身功能命名（速记/待办/对话），不照搬 deeptutor 的导航词汇
