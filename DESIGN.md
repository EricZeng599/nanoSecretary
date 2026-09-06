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
| 危险（热红文字） | `#c53a2c` 列表色条 / `#f0716a` 环段文字 | 逾期、删除、仪表盘逾期环段 |
| 成功 | `#6fa86b` | 完成、AI 在线 |
| 文字主 | `#e8e4de` 暖白 | 正文 |
| 文字次 | `#c2bbb2` | 元信息 |
| 文字弱 | `#9c9388` | 占位、提示 |
| 文字更弱 | `#9c9388` | 空态、弱提示 |

## 排版

- 标题：`Georgia, "Times New Roman", "Noto Serif CJK SC", "Source Han Serif SC", "Songti SC", "STSong", "SimSun", serif`（拉丁衬线标题 + 中文宋体）；`1.125–1.25rem / 500`，负字距 `-0.02em`
- 正文：`system-ui, -apple-system, "Segoe UI", "Noto Serif CJK SC", "Source Han Serif SC", "Songti SC", "STSong", "SimSun", serif`（拉丁/数字走系统无衬线，中文按字形落宋体）`0.8125rem`
- 元信息 `0.75rem`，辅助 `0.6875rem`
- 分类列表标题：`letter-spacing 0.04em` 小字大写感
- 中文宋体（2026-09-04）：正文中文由雅黑改为宋体，现代宋优先（思源宋体 Noto/Source Han → 宋体-简 Songti/STSong → SimSun），Windows 未装现代宋时自然落 SimSun；`--font-stack` 仍以系统无衬线打头，保证拉丁/数字不衬线化

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
- **日期选择器**（`date-picker.js` 原生封装 + `date-picker-react.js` 日历本体）：
  shadcn「Popover + Calendar」模式 —— 触发字段（只读按钮，日历图标 + **完整日期**）点开
  日历弹层，点选即回填。
  **弹层 = 暖「纸卡」**：在暖黑桌面上铺开一张米白卡片（`#faf6f0`），衬线月份标题、
  深墨字、赭橙**圆日**选中、today 用赭橙**描边环**（选中日不叠加）、range 中段淡橙带，
  柔和三层投影 + 轻微入场动画；整体 `color-scheme: light`。触发字段保持暗色控件，
  悬停显清除 ×。
  日历本体为 react-day-picker（`scripts/build-datepicker.mjs` 用 esbuild 打成 IIFE，
  提交进仓库；改日历交互需 `npm run build:datepicker`），原生封装维护触发字段/定位/焦点/ARIA。

## 日期约定（civil date）

- **对外一律 `yyyy-mm-dd` 字符串**；仅在交给 react-day-picker 时用当地时区正午
  `new Date(y, m-1, d, 12)` 构造，绝不 `new Date('yyyy-mm-dd')`（会被当 UTC，
  UTC+8 地区会在 0–8 点差一天）。
- 「今天」用 `getFullYear/getMonth/getDate` 拼本地日期（见各页 `localToday()`，
  历史页/主页面已替换原 `toISOString().slice(0,10)` 的 UTC 隐患）。
- 周起始随 locale：zh-CN（date-fns `zhCN`）→ 周一起始。

## 关键交互

- **悬浮球**：暖灰球（`linear-gradient(#3a3734,#262421)`）；常驻呼吸（2.4s）；到期赭橙呼吸（1.8s）；逾期红脉冲（1.2s + 扩散光圈）；保存成功暖绿闪光；待办数角标
- **双击展开**：面板从球方向 `scale(0.96)→1` + 透明度，`cubic-bezier(0.2,0.7,0.2,1)`；`Esc` 收起
- **窗口缩放**（Win 透明窗 + `resizable:false`）：改尺寸必须用 `setBounds({x,y,width,height})` 一次性设置。若先 `setSize` 再 `setPosition`，位置会按旧的大尺寸被钳制——输入窗(420×190)收回小球(120×120)时会残留成大窗、球看似消失点不出（2026-09-04 修复）
- **输入**：快速记录（一句话 + AI 实时预览）与结构化表单双模式 Tab；`Enter` 保存。
  结构化表单截止日期 = 日期选择器；悬浮球小窗打开弹层时窗口临时加高
  （`resize-window` → `input-expand`/`input-collapse`），收起即还原。
- **改期**：主页面待办与历史页每条待办均可改期 —— 点「改期」直接展开日期弹层，
  点选即暂存，按「确定」提交 `update-due-date`。触发字段显示完整日期（yyyy年M月d日），
  title 悬停附「今天/明天」语义。
- **AI 预览**：赭橙浅底卡片
- **列表操作**：hover 增亮；完成时卡片淡出；删除用内联双步确认条
- **Esc 分级收放**（2026-09-05 critique 修复）：Esc 从最内层逐层关 —— 设置弹层 → 改期行/日历 → 输入框（失焦）→ 无编辑面才真正收起窗口。绝不一步关掉整窗（原先任意处按 Esc 就 `closeHomepage`，正在输入/改期会丢草稿）。
- **最近记录与待办事项不相交**（2026-09-05）：`getRecentEntries` 排除 `status==='pending'`，最新 5 条 non-pending（note/done）。同一待办不再一屏两处渲染、操作不冲突，`markDone` 淡出动效也就不会命中错卡。
- **筛选栏如实隐藏**（2026-09-06 critique 修复）：`.filter-bar` 用 `:not([hidden])` 门控 `display:flex`，而非让作者样式覆盖 UA 的 `[hidden]{display:none}` —— 清除筛选/「下一件」跳转后，筛选条不被旧 tag 文字冒充已清（原来会残留一条「幽灵筛选栏」，展示与事实不符）。
- **AI 状态兜底**（2026-09-06）：头部「AI 连接中」带脉冲点（`.loading::after` 省略动画）以示处理中；`getAiStatus` 若 4 秒未回包则兜底转「AI 离线」，避免状态永远悬置。「思考中…」等瞬时态不受影响。
- **设置**：主页面中央遮罩 + 暖黑弹层，switch（40×22）

## 图标系统

- `icons.js` 暴露 `window.nanoIcons.ic(name)`：统一 24×24 线性 SVG（1.8px 描边、`currentColor` 继承）
- 图标名：note/pin/todo/fire/clock/calendar/tag/chat/book/check/check-circle/restore/trash/edit/copy/close/diamond/chevron-right/settings/dots

## 便签与仪表盘（2026-09-04 新增）

- **仪表盘**（主页面默认视图，640×700）：暖黑 bento —— 单一主导指标 + 两张让位侧卡 + 底部 Top-3 标签格。
  环图手写 SVG（`stroke-dasharray`），不引图表库。**关注卡（hero）** = 大环 + 中心**唯一大数字 = 全部待处理**（诚实含无日期项）。
  环分四段：**逾期**（热红 `#f0716a`，满宽）/ **今天**（赭橙 `#d4734b`，满宽，突出）/ **明后天**（浅橙 `#e0a06c`，**细分笔画**从属）/ **其余待办**（弱描边色），四段恒等于全部 pending（P0-1 不低报）。
  「近7天完成」是独立的**「已完成」轴**计数行（无 swatch + `axis-divider` 分隔线），明确分离于「待处理」环段，不混进环。
  环段支持**每段覆盖笔画权重**（`seg.stroke`），用更细笔画让「今天」成为环上唯一突出赭橙、与「明后天」拉开对比。
  右侧 **今日卡**（今日完成/待办小环 + 「下一件」点击**跳转到该目标记录**而非打开输入框，无到期显示「—」）与 **本周卡**（去环，压成一行进度 + 计数）。
  本周卡为**单轴**：以**本周六天内到期**的项为 cohort（`dueDate` 落在周一→今/周末），分子=已完成、分母=应做总数；周六空则显「本周暂无」。
  关注/今日/本周三卡整卡可点（`role="button"`，键盘 Enter/Space）→ 进记录视图；「下一件」是卡内子交互，点它不重复导航。
  标签格默认**不预选**（起始中性，`activeTag` 为空），只露 **Top-3** 芯片（`aria-pressed`），其余收进「更多标签 +N」reveal 展开；点芯片 → 进记录视图并按该 tag 筛选（action-first），再点一次取消（toggle 回中性），「清除」还原。
  芯片点击用**事件委托**绑定（`chipsEl` 挂一个 `click` 监听 + `closest('.tag-chip')`），expand 后的芯片也命中同一委托，不再逐颗绑 onclick。选中的外部标签会自动提入 Top-3 位置、相应芯片挤入 reveal，避免「选中但看不到芯片」。
- **小便签**（notes.html 独立 frameless 窗，240×230）：纯单色暖黑（面板底 + 赭橙识别点 + serif 标题行），
  自动保存（防抖 400ms 写 data.json 为 sticky:true 的 note 记录）、关闭即收起数据保留、置顶可切、
  时间戳。入口：托盘菜单「新建便签」+ 悬浮球右键 + 主页面底部「便签」。数据出现在历史页备忘区。
- **随手记→待办**：无日期的随手记按「备忘」归到主页面最近记录/历史页（README 语义：记得买牛奶 → 备忘）。
  备忘卡提供**「转为待办」**（绿色 pin）一键升级为待办（`status: note→pending`，不设截止日期，
  `make-pending` IPC），升级后进主页面「待办事项」并可勾选完成。（2026-09-04 按用户选择新增）
- **补截止日期**：便签贴与快速记录进入主页面后，卡片上**始终显示「改期」**（含 note 与无日期的 pending）
  —— 点「改期」用日历选日期 → 确定，`update-due-date` 设 dueDate 并翻转 `note→pending`，该项带日期进待办。
  同一 pending 项可能同时出现在「待办列表」与「最近记录」，改期行用点击处卡片定位（`btn.closest('.entry-item')`），
  避免按 id 反查永远命中第一张。（2026-09-05 新增）

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
