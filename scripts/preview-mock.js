/**
 * preview-mock.js — 【仅开发期】主页面静态预览用的 window.api 替身。
 *
 * 这个文件**不进 pack.bat 的拷贝清单，不随发行包发布**。它只被
 * scripts/preview-server.mjs 在本地预览时注入，用来让 homepage.html
 * 在没有 Electron 主进程的情况下也能渲染出真实形态（环图/图例/列表/标签）。
 *
 * 关键约定：homepage.html 磁盘文件本身不含任何预览专用代码，
 * 注入发生在 HTTP 响应里，生产路径零污染。
 */
(function () {
  'use strict';

  const pad = (n) => String(n).padStart(2, '0');
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  /** 相对今天偏移 n 天的 yyyy-mm-dd（civil date，与页面同一套算法） */
  const shift = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return iso(d); };
  const hoursAgo = (n) => new Date(Date.now() - n * 3600e3).toISOString();

  // 故意覆盖全部分支：逾期 / 今天 / 明后天 / 远期 / 无日期 / 已完成 / 备忘。
  // 三档优先级都出现，方便核对「低」不再整行消失。
  const ENTRIES = [
    { id: 'p1', title: '交季度报告给王总', content: '交季度报告给王总', status: 'pending', dueDate: shift(-4), time: '18:00', priority: '高', category: '工作', tags: ['工作', '汇报'], created: hoursAgo(120), reminded: true },
    { id: 'p2', title: '续订域名并核对发票抬头', content: '续订域名', status: 'pending', dueDate: shift(-2), priority: '中', category: '工作', tags: ['工作'], created: hoursAgo(96), reminded: true },
    { id: 'p3', title: '把上个月的报销单交了', content: '报销单', status: 'pending', dueDate: shift(-1), priority: '低', category: '行政', tags: ['行政'], created: hoursAgo(80), reminded: true },
    { id: 'p4', title: '读完《设计中的设计》第三章', content: '读书', status: 'pending', dueDate: shift(-1), priority: '低', category: '个人', tags: [], created: hoursAgo(72), reminded: true },

    { id: 'p5', title: '下午三点跟李工对接口联调', content: '联调', status: 'pending', dueDate: shift(0), time: '15:00', priority: '高', category: '工作', tags: ['工作', '联调'], created: hoursAgo(20) },
    { id: 'p6', title: '把体检预约改到下周', content: '体检预约', status: 'pending', dueDate: shift(0), priority: '中', category: '个人', tags: ['个人'], created: hoursAgo(18) },

    { id: 'p7', title: '准备周四的评审材料', content: '评审材料', status: 'pending', dueDate: shift(1), priority: '高', category: '工作', tags: ['工作', '汇报'], created: hoursAgo(14) },
    { id: 'p8', title: '给妈妈打电话', content: '打电话', status: 'pending', dueDate: shift(2), priority: '低', category: '个人', tags: ['个人'], created: hoursAgo(12) },

    { id: 'p9', title: '下季度预算初稿', content: '预算初稿', status: 'pending', dueDate: shift(9), priority: '中', category: '工作', tags: ['工作'], created: hoursAgo(10) },
    { id: 'p10', title: '换季衣服送洗', content: '送洗', status: 'pending', dueDate: shift(21), priority: '低', category: '生活', tags: ['生活'], created: hoursAgo(9) },

    { id: 'p11', title: '记得买牛奶和咖啡豆', content: '记得买牛奶和咖啡豆', status: 'pending', dueDate: null, priority: '低', category: '生活', tags: ['生活'], created: hoursAgo(6) },

    { id: 'd1', title: '把首页的环图改成手写 SVG', content: '环图', status: 'done', dueDate: shift(-1), doneAt: hoursAgo(30), priority: '中', category: '工作', tags: ['工作'], created: hoursAgo(200) },
    { id: 'd2', title: '给便签加上置顶', content: '便签置顶', status: 'done', dueDate: shift(-2), doneAt: hoursAgo(52), priority: '低', category: '工作', tags: ['工作'], created: hoursAgo(220) },
    { id: 'd3', title: '整理本周会议纪要', content: '会议纪要', status: 'done', doneAt: hoursAgo(70), priority: '低', category: '行政', tags: ['行政'], created: hoursAgo(240) },

    { id: 'n1', title: '随手记：下周三可能要去趟上海', content: '下周三可能要去趟上海', status: 'note', dueDate: null, priority: '低', category: '其他', tags: [], created: hoursAgo(3) },
    { id: 'n2', title: '记一下：会议室投影仪经常连不上', content: '投影仪经常连不上', status: 'note', dueDate: null, priority: '低', category: '其他', tags: [], created: hoursAgo(28) },

    // 便签：默认不进「全部/待办/已完成」三个视图，只有点「便签」chip 才调出来
    { id: 's1', title: '便签：周五前把发票寄出', content: '周五前把发票寄出', status: 'note', sticky: true, dueDate: null, priority: '低', category: '行政', tags: ['行政'], created: hoursAgo(5) },
  ];

  // 深拷贝一份发给页面：页面会随交互改数组，别让下一次回调拿到被改过的数据
  const clone = () => JSON.parse(JSON.stringify(ENTRIES));

  const listeners = { entries: [], recent: [], ai: [], config: [], chat: [], configSaved: [] };
  const fire = (key, payload) => listeners[key].forEach((cb) => { try { cb(payload); } catch (e) { console.error(e); } });

  const AI_STATUS = {
    available: true,
    // 与主进程 get-ai-status 的新回包对齐：在线 = 服务可达 **且** 有能对话的模型。
    // chatModels 只列能对话的（嵌入模型不该出现在设置下拉框里）。
    hasChatModel: true,
    chatModels: ['qwen2.5:3b', 'llama3.2:3b'],
    configuredModel: 'qwen2.5:3b',
    model: 'qwen2.5:3b',
    models: ['qwen2.5:3b', 'llama3.2:3b'],
    remindLeadHours: 24,
    enabled: true,
    showBall: true,
    shortcut: 'CommandOrControl+Alt+N',
  };

  /* 预览三态头部用。控制台执行即可切换，例如：
       __previewAiStatus({ available: false })                        → 「AI 离线」
       __previewAiStatus({ hasChatModel: false, chatModels: [] })     → 「无对话模型」
       __previewAiStatus({ available: true, hasChatModel: true, chatModels: ['qwen2.5:3b'] })
     改完调一次 api.getAiStatus() 重渲染。 */
  window.__previewAiStatus = (patch) => Object.assign(AI_STATUS, patch);

  // 预览态配置。主题走 <html data-preview-theme>：preview-server 会把 tokens.css 里
  // 亮/暗两套 token 各复制一份到 [data-preview-theme=...] 选择器下，所以这里改属性
  // 就能真实地翻主题（而不是给预览造一套假样式）。
  let config = { ...AI_STATUS, theme: 'system' };

  window.api = {
    // —— 记录查询 ——
    getEntries: () => setTimeout(() => fire('entries', clone()), 0),
    onEntries: (cb) => listeners.entries.push(cb),
    getRecentEntries: () => setTimeout(() => fire('recent', clone().filter((e) => e.status !== 'pending').slice(0, 5)), 0),
    onRecentEntries: (cb) => listeners.recent.push(cb),
    onEntriesChanged: (cb) => listeners.entries.push(cb),

    // —— 写入（预览里只回放一次数据变更，让动效/重渲染路径能跑到）——
    saveEntry: () => setTimeout(() => fire('entries', clone()), 60),
    onSaveSuccess: () => {},
    onAiRefined: () => {},
    saveEntryPreview: () => {},
    onAiPreview: () => {},
    markDone: () => setTimeout(() => fire('entries', clone()), 60),
    deleteEntry: () => setTimeout(() => fire('entries', clone()), 60),
    restoreEntry: () => setTimeout(() => fire('entries', clone()), 60),
    updateDueDate: () => setTimeout(() => fire('entries', clone()), 60),
    makePending: () => setTimeout(() => fire('entries', clone()), 60),
    onEntryUpdated: () => {},
    onDeleteSuccess: () => {},

    // —— AI 状态 ——
    getAiStatus: () => setTimeout(() => fire('ai', AI_STATUS), 120),
    onAiStatus: (cb) => listeners.ai.push(cb),

    // —— 配置 / 主题 ——
    getConfig: () => setTimeout(() => fire('config', { ...config }), 0),
    onConfig: (cb) => listeners.config.push(cb),
    saveConfig: (patch) => {
      config = { ...config, ...patch };
      if (patch.theme) {
        if (patch.theme === 'system') delete document.documentElement.dataset.previewTheme;
        else document.documentElement.dataset.previewTheme = patch.theme;
      }
      setTimeout(() => fire('configSaved', { ...config, _shortcut: { ok: true, shortcut: config.shortcut } }), 80);
    },
    onConfigSaved: (cb) => listeners.configSaved.push(cb),

    // —— 对话 ——
    sendChat: () => setTimeout(() => fire('chat', '（预览态没有接本地模型，这里是一段占位回复，用来核对气泡的对齐与边框。）'), 400),
    onChatReply: (cb) => listeners.chat.push(cb),

    // —— 窗口 / 托盘：预览里全部无副作用 ——
    resizeWindow: () => {},
    dragStart: () => {}, dragMove: () => {}, dragEnd: () => {},
    dragHomepageStart: () => {}, dragHomepageMove: () => {}, dragHomepageEnd: () => {},
    showBallMenu: () => {}, onOpenInput: () => {},
    openHistory: () => console.info('[preview] openHistory'),
    openSticky: () => console.info('[preview] openSticky'),
    closeHomepage: () => console.info('[preview] closeHomepage'),
    getTodoCount: () => {}, onTodoCount: () => {},
    onReminderAlert: () => {},

    // —— 便签：预览不涉 ——
    saveNote: () => {}, onNoteSaved: () => {}, onNoteLoaded: () => {},
    setNotePinned: () => {}, closeNote: () => {},
  };

  console.info('[preview] window.api mock 已注入 —— 这是开发期静态预览，不是真实应用');
})();
