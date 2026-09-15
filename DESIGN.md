# 赛博秘书 · DESIGN.md

> 当前视觉系统的快照。记录了 2026-08 各窗口的实际设计语言。
> 它是「现在是什么样」的权威记录；任何改动前以此为基线，改动后同步更新本文件。

## 模式

**Operate** —— 用户在完成任务：速记、看待办、收提醒、问 AI。可扫描性、一致性、原生预期优先于表现欲。

## 设计世界

**暖暗色 editorial（Warm Editorial）** —— 移植自 DeepTutor（`D:\my-deeptutor`）的视觉语言。核心是「暖近黑底上的一层纸墨质感」：暖黑背景承载极简输入框与细边框卡片，赭橙只用于动作与状态锚点。无玻璃、无蓝、无渐变——靠层次分明的暖色阶与衬线标题制造编辑部气质。

## 设计原则（critique 沉淀）

两条贯穿全页的硬标准，任何一屏改动前先对照：

1. **AI 之魂应在登录核心**（2026-09-08 critique 挑衅性结论，本轮未动手、单列待重设计）：这个产品是可对话的本地 AI 秘书，招牌是「一句话→todo→提醒」。默认落地页（仪表盘 bento）不应长成任何任务 app 都能渲染的通用状态环，而该有「甩一句话给 AI」或「这些待办是 AI 抽出来的」的在场宣示。当前 AI 的在场感被关在 tab 2（记录）与 tab 3（对话），而用户 90% 看的是 dashboard——这是**战略缺口，非缺陷**，留给一次独立的 redesign/new-work 处理，不与逐项修复混修。
2. **诚实作为硬标准贯穿全页**（2026-09-08 critique）：每个数字与文案背后的事实必须自洽，尤其空态。已落地的诚实：hero 环**无日期也计入**（不低报）、近7天完成单列为「已完成」轴、关注卡筛真实关注集（逾期+今天+明后天）、标签空态区分「无待办」与「无标签」（2026-09-08 P2——有待办但未打标签时不再撒谎说「没有待办」）。审查新改动时逐条问「这个数字/文案背后的事实是什么」。

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
- 表单控件归位（2026-09-08 typeset）：`button/input/select/textarea { font-family: var(--font-stack) }` —— Chromium UA 的 `button { font: … Arial }` 简写会把按钮/标签中文落到无衬线（Arial→雅黑），与正文宋体断层；显式归位让互动文字与正文同栈。历史/便签/主页/悬浮球四页同步。
- 正文字号下限（2026-09-08 typeset）：`body { font-size: var(--text-body) }`（13px）—— 原来 body 不设字号，未打 token 的文案（如筛选栏「筛选：」）继承 UA 16px 默认，成为全页最大非展示字号、撑开 `flat-type-hierarchy` 的 16px 台阶；设下限后同栈统一。

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
- **tab 计数对比度**（2026-09-08 critique P2轻修复）：tab 角标 `.count` 改 `color: var(--text-faint)`（`#9c9388`，≥4.5:1），弃用 `opacity:.6`（叠在 `--text-tertiary` 上仅 ~3.2:1，低于 AA）——用 token 色而非透明度，确保叠加层上仍达标。
- **AI 状态兜底**（2026-09-06）：头部「AI 连接中」带脉冲点（`.loading::after` 省略动画）以示处理中；`getAiStatus` 若 4 秒未回包则兜底转「AI 离线」，避免状态永远悬置。兜底用布尔标记 `aiStatusResolved` 判据（由 `onAiStatus` 置位），而非比较 `textContent === 'AI 连接中…'`——省略号在 `.loading::after` 伪元素里，`textContent` 永远没有 `…`，字符串比较必失配，旧实现是整个兜底落空（死代码）。「思考中…」等瞬时态不受影响。
- **对话空态**（2026-09-06 critique 修复；2026-09-08 修 `[hidden]` 被覆盖回归 + `h4` 降级）：对话 tab 无消息时展示「你的 nanoSecretary 在线」衬线标题（一个 `p.chat-empty-title`，**不用 `h4`**——否则 `h1→h2→h4` 跳级，P3 skipped-heading）+ 一行能力提示 + 3 个可点建议 chip（「我今天有什么安排？」/「我这个月逾期了哪些？」/「帮我整理今天的进度」），点击填入输入框并聚焦；首条消息出现即隐藏空态。修掉对话 tab 打开只剩空区+输入行的「空窗」（首次用户最高摩擦点）。空态容器用 `.chat-empty:not([hidden])` 门控 `display:flex`——否则作者样式会覆盖 UA 的 `[hidden]{display:none}`，首条消息后空态依旧显示（与筛选栏同类 bug，同型修复）。
- **标签筛选与仪表盘脱同步**（2026-09-06 critique 修复）：`setTodoFilter(null)` 清除筛选时同步重置仪表盘 `activeTag` 与 tag 芯片 active 类、detail 行回到「全部标签 N 项待办」——原先只清列表 `todoFilterTag` 不管 `activeTag`，清除筛选返回仪表盘会留下一个仍点亮的芯片 + 断言旧 tag 计数（detail 说「#工作 7 项」但列表已 17，展示与事实不符）。
- **下一件高亮稳定**（2026-09-06）：`focusEntry` 的 `.flash` 高亮改为 `focusFlashId` 状态驱动、在 `renderTodos` 渲染末尾落地，而非事后用 rAF poke DOM 加 class——列表因数据变更重渲染时，`innerHTML` 重建会把刚加上的 `.flash` 冲掉导致高亮丢失；状态驱动让 flash 在每次重渲染后重新落在目标上，1.4s 超时后清除。
- **离线模型文案去重复**（2026-09-06）：设置弹层不可用时，模型下拉 option 简洁为「未检测到（使用默认 qwen2.5:3b）」，下方 desc「未检测到本地模型，请确认 Ollama 已启动」保留为唯一可操作引导——原先 option 也写「（未检测到，将用此默认值）」与 desc 语义重复，读起来像 bug。
- **对话回包兜底**（2026-09-08 critique P1）：`sendChat` 置状态「思考中…」后，若本地模型离线/缺失致 `onChatReply` 永不回包，对话会永久卡死、后续输入堆积。加 30s 超时兜底：超时把状态复位为「AI 离线」并追加一句安抚文案「（本地模型似乎没有回应，请确认 Ollama 已启动后再试一次。）」；回包成功则清除定时器并回到「AI 在线」，避免超时兜底残留 offline class。首载的 4s `getAiStatus` 兜底只跑一次，不覆盖对话途中。
- **低优先级不静默隐藏**（2026-09-08 critique P2）：待办优先级 badge 高→「高优先级🔥」/中→「中」/低→**「低」**（`--text-faint` 极弱色），三档齐全——原来低优先级整行消失，用户误以为「没标」。规则「无 badge=低」只在三档都显示时才无须自明。
- **tab `aria-controls`**（2026-09-08 critique P2）：三个 tab（`role="tab"`）均补 `aria-controls="view-dashboard|view-records|view-chat"`，与 panel 的 `aria-labelledby` 形成双向关联，WAI-ARIA tablist 模式满足读屏「tab→面板」关联。
- **危险双角色拆分**（2026-09-08 colorize）：**「逾期」一律用热红 `#f0716a`** —— 列表色条、`已逾期`/`高优先级` 徽标、环段、图例 swatch 同一色，对暖黑/卡片底 ≥5.49:1，远超标线 3:1；**深红 `#c53a2c` 仅作删除按钮填充**（浅字 `#f5f2ec` 叠其上 4.68:1 ≥4.5:1）。原 `--status-danger` 兼做色条 + 按钮填充，色条仅 3.03:1 贴线、且与 `--status-danger-text` 红意重复 —— 拆成「逾期=亮红、删除填充=暗红」两职，色条获得 1.8× 余量。
- **设置**：主页面中央遮罩 + 暖黑弹层，switch（40×22）

## 图标系统

- `icons.js` 暴露 `window.nanoIcons.ic(name)`：统一 24×24 线性 SVG（1.8px 描边、`currentColor` 继承）
- 图标名：note/pin/todo/fire/clock/calendar/tag/chat/book/check/check-circle/restore/trash/edit/copy/close/diamond/chevron-right/settings/dots

## 便签与仪表盘（2026-09-04 新增）

- **仪表盘**（主页面默认视图，640×700）：暖黑 bento —— 单一主导指标 + 两张让位侧卡 + 底部 Top-3 标签格。
  环图手写 SVG（`stroke-dasharray`），不引图表库。**关注卡（hero）** = 大环 + 中心**唯一大数字 = 全部待处理**（诚实含无日期项）。
  环分四段：**逾期**（热红 `#f0716a`，满宽）/ **今天**（赭橙 `#d4734b`，满宽，突出）/ **明后天**（浅橙 `#e0a06c`，**细分笔画**从属）/ **其余待办**（弱描边色），四段恒等于全部 pending（P0-1 不低报）。
  「其余待办」在环上是单一弱段（远期与无日期都不紧迫，归一），但**图例拆成「远期」与「无日期」两行**（2026-09-08 critique P2）——无日期项用**空心框 swatch**（`background:transparent` + 1px 弱描边 + `box-sizing:border-box`，8×8 齐平；2026-09-08 由斜纹 `repeating-linear-gradient` 改为空框，因斜纹触发检测器 `repeating-stripes-gradient` 判定，且空框更贴合「无日期=空、共享弱段」的语义）；两者语义不同，不浑称「其余」。
  「近7天完成」是独立的**「已完成」轴**计数行（无 swatch + `axis-divider` 分隔线），明确分离于「待处理」环段，不混进环。
  环段支持**每段覆盖笔画权重**（`seg.stroke`），用更细笔画让「今天」成为环上唯一突出赭橙、与「明后天」拉开对比。
  右侧 **今日卡**（今日完成/待办小环 + 「下一件」点击**跳转到该目标记录**而非打开输入框，无到期显示「—」）与 **本周卡**（去环，压成一行进度 + 计数）。
  本周卡为**单轴**：以**本周六天内到期**的项为 cohort（`dueDate` 落在周一→今/周末），分子=已完成、分母=应做总数；周六空则显「本周暂无」。
  关注/今日/本周三卡整卡可点（`role="button"`，键盘 Enter/Space）→ 进记录视图；**关注卡** 点击即筛到真实「关注集」= 逾期+今天+明后天（`setTodoFilter(null,'attention')`，filter-bar 显「关注」，与环图例同语义，非裸列表）；「下一件」是卡内子交互，点它不重复导航，鼠标/键盘（`keydown` Enter/Space）都调 `focusEntry(todoId)` 定位到该目标项并短暂高亮。
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
