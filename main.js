const { app, BrowserWindow, screen, Menu, Tray, ipcMain, Notification, nativeImage, globalShortcut, nativeTheme } = require('electron');
const path = require('path');
const fs = require('fs');
const ollama = require('./ollama');

/* ================= 窗口状态 ================= */
let mainWindow;       // 悬浮球窗口
let homePageWindow;   // 主页面
let historyWindow;    // 历史记录
let stickyWindows = new Map(); // noteId -> BrowserWindow（便签多开）
let tray;
let reminderTimer = null;
let isDragging = false;
let startX, startY, startWindowX, startWindowY;

const BALLOON_SIZE = 120; // 加大窗口，给 hover/呼吸/阴影留足余量（球 40px 居中）
const INPUT_SIZE = { width: 420, height: 190 };
const INPUT_CAL_SIZE = { width: 440, height: 520 }; // 日历弹层展开时的输入窗尺寸（临时扩大）

// 默认全局快捷键。不要用 Ctrl+单字母（Ctrl+T / Ctrl+N 等）：
// Windows 应用普遍把「Ctrl+功能首字母」当约定，全局注册会静默劫持它们的同名快捷键。
const DEFAULT_SHORTCUT = 'CommandOrControl+Alt+N';
let currentShortcut = null; // 实际注册成功的键；注册失败时用它保留旧键

/* ================= 配置管理 ================= */
function getConfigFilePath() {
  const dir = path.join(__dirname, 'history_files');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, 'config.json');
}

function readConfig() {
  try {
    if (fs.existsSync(getConfigFilePath())) {
      return JSON.parse(fs.readFileSync(getConfigFilePath(), 'utf8'));
    }
  } catch (e) {
    console.error('读取配置失败:', e);
  }
  return {};
}

function writeConfig(config) {
  try {
    fs.writeFileSync(getConfigFilePath(), JSON.stringify(config, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error('写入配置失败:', e);
    return false;
  }
}

/* ---- 主题（跟随系统 / 亮色 / 暗色）----
 * 只在主进程设 nativeTheme.themeSource，四个窗口的 prefers-color-scheme 会一起翻转，
 * 各页 CSS 里的 @media (prefers-color-scheme: dark) 自动生效。
 * 这样渲染层不需要主题 JS、不需要给每个窗口注入脚本，也不会出现首帧闪白/闪黑。
 * 必须在创建任何窗口之前调用，否则第一帧会按旧主题画。 */
const THEME_VALUES = ['system', 'light', 'dark'];
function applyTheme(value) {
  nativeTheme.themeSource = THEME_VALUES.includes(value) ? value : 'system';
  return nativeTheme.themeSource;
}

/* ================= 数据管理 ================= */
function getDataFilePath() {
  const dir = path.join(__dirname, 'history_files');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, 'data.json');
}

function readData() {
  try {
    if (fs.existsSync(getDataFilePath())) {
      const data = JSON.parse(fs.readFileSync(getDataFilePath(), 'utf8'));
      // 迁移旧数据：补齐新字段
      return (Array.isArray(data) ? data : []).map((e) => ({
        id: e.id || Date.now().toString(),
        content: e.content || '',
        title: e.title || e.content || '',
        dueDate: e.dueDate || null,
        time: e.time || null,
        priority: e.priority || '低',
        status: e.status || (e.dueDate ? 'pending' : 'note'),
        category: e.category || '其他',
        tags: e.tags || [],
        reminded: e.reminded || false,
        created: e.created || new Date().toISOString(),
        sticky: e.sticky === true,           // 便签标记
        doneAt: e.doneAt || undefined,       // 完成时间（仪表盘/统计用）
      }));
    }
  } catch (e) {
    console.error('读取数据失败:', e);
  }
  return [];
}

function writeData(data) {
  try {
    fs.writeFileSync(getDataFilePath(), JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error('写入数据失败:', e);
    return false;
  }
}

/**
 * 便签（sticky）是自由记录区，不参与待办体系：
 * 不进待办列表、不计入角标与统计、不触发提醒、不可被升级为待办。
 * 所有「判定是不是待办」的地方都必须走这里，否则便签会从某条缝里漏回待办。
 */
function isTodo(e) {
  return e.status === 'pending' && e.sticky !== true;
}

/** 记录 id：时间戳(36) + 6 位随机(36)，全小写字母数字 */
function newEntryId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
/** 只接受 newEntryId() 那种形状的 id；渲染层递过来的字符串要先过这一关 */
const ID_SHAPE = /^[a-z0-9]{6,32}$/;

/* 向所有窗口广播数据变更，确保主页面/历史/悬浮球实时刷新 */
function broadcastEntriesChanged() {
  const data = readData();
  for (const win of BrowserWindow.getAllWindows()) {
    if (!win.isDestroyed()) {
      win.webContents.send('entries-changed', data);
    }
  }
  sendTodoCount();
}

function getIconPath() {
  const ico = path.join(__dirname, 'Nanosecretary_256x256.ico');
  if (fs.existsSync(ico)) return ico;
  const legacy = path.join(__dirname, 'nanoSecretary.ico');
  if (fs.existsSync(legacy)) return legacy;
  return path.join(__dirname, 'icon.png');
}

/* ================= 悬浮球窗口 ================= */
function createWindow() {
  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  const config = readConfig();
  let x, y;
  if (config.windowPosition && typeof config.windowPosition.x === 'number') {
    x = config.windowPosition.x;
    y = config.windowPosition.y;
  } else {
    x = screenSize.width - BALLOON_SIZE - 20;
    y = screenSize.height - BALLOON_SIZE - 20;
  }

  mainWindow = new BrowserWindow({
    width: BALLOON_SIZE,
    height: BALLOON_SIZE,
    x, y,
    // 悬浮球关闭时不创建可见窗口（而非事后 hide），避免透明窗口闪现。
    // 注意：窗口本身必须存在——它还承载快捷键唤起的输入面板。
    show: config.showBall !== false,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    resizable: false,
    autoHideMenuBar: true,
    icon: getIconPath(),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });

  // 渲染进程通过 IPC 请求移动窗口，这里统一处理（去掉主进程自己的拖拽逻辑）
  mainWindow.loadFile('index.html');

  // 异常监听：只记录真正的错误，不再打印常规诊断
  mainWindow.webContents.on('preload-error', (e, preloadPath, error) => {
    console.error('[preload-error]', preloadPath, error);
  });
  mainWindow.webContents.on('did-fail-load', (e, code, desc) => {
    console.error('[did-fail-load]', code, desc);
  });

  createTray();
}

/* ================= 托盘 ================= */
function createTray() {
  tray = new Tray(loadIcon());
  tray.setToolTip('nanoSecretary');

  const rebuildMenu = () => {
    const config = readConfig();
    const contextMenu = Menu.buildFromTemplate([
      { label: '显示/隐藏悬浮球', click: () => toggleMainWindow() },
      { label: '主页面', click: () => createHomePageWindow() },
      { label: '历史记录', click: () => createHistoryWindow() },
      { type: 'separator' },
      { label: '新建便签', click: () => openNewSticky() },
      { type: 'separator' },
      {
        label: '开机自启',
        type: 'checkbox',
        checked: config.autoStart || false,
        click: (item) => {
          config.autoStart = item.checked;
          writeConfig(config);
          app.setLoginItemSettings({ openAtLogin: item.checked });
        },
      },
      { label: '退出', click: () => app.quit() },
    ]);
    tray.setContextMenu(contextMenu);
  };

  rebuildMenu();
  // 托盘与快捷键行为一致：单击打开输入面板。
  // 「显示/隐藏悬浮球」的切换能力保留在右键菜单第一项。
  tray.on('click', () => openInputFromShortcut());
}

function loadIcon() {
  const iconPath = getIconPath();
  try {
    if (fs.existsSync(iconPath)) return nativeImage.createFromPath(iconPath);
  } catch (e) {}
  return nativeImage.createEmpty();
}

function toggleMainWindow() {
  if (!mainWindow) return;
  if (mainWindow.isVisible()) {
    mainWindow.hide();
    return;
  }
  // 重新显示前先恢复成球尺寸：窗口可能刚以输入面板形态（420×190）被隐藏
  const config = readConfig();
  const work = screen.getPrimaryDisplay().workArea;
  const pos = (config.windowPosition && typeof config.windowPosition.x === 'number')
    ? config.windowPosition
    : { x: work.x + work.width - BALLOON_SIZE - 20, y: work.y + work.height - BALLOON_SIZE - 20 };
  mainWindow.setBounds({ x: pos.x, y: pos.y, width: BALLOON_SIZE, height: BALLOON_SIZE });
  mainWindow.show();
}

/* ================= 全局快捷键 ================= */
/** 配置里的快捷键；空值回落默认。 */
function getShortcut() {
  const s = readConfig().shortcut;
  return (typeof s === 'string' && s.trim()) ? s.trim() : DEFAULT_SHORTCUT;
}

/**
 * 让配置里的快捷键生效。
 * 先注册新键、成功了再注销旧键——注册失败时旧的仍然可用，不会两头落空。
 */
function applyShortcut() {
  const want = getShortcut();
  if (want === currentShortcut) {
    return { ok: true, shortcut: want, registered: currentShortcut };
  }

  let ok = false;
  try {
    ok = globalShortcut.register(want, openInputFromShortcut);
  } catch (e) {
    // 非法 accelerator 会抛异常，与「被别的程序占用」一样按失败处理
    console.warn('快捷键注册失败:', want, e && e.message);
    ok = false;
  }
  if (!ok) return { ok: false, shortcut: want, registered: currentShortcut };

  if (currentShortcut) {
    try { globalShortcut.unregister(currentShortcut); } catch (e) {}
  }
  currentShortcut = want;
  return { ok: true, shortcut: want, registered: want };
}

/* ================= 主页面窗口 ================= */
function createHomePageWindow() {
  if (homePageWindow) {
    homePageWindow.show();
    return;
  }
  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  const width = 640, height = 700;
  homePageWindow = new BrowserWindow({
    width, height,
    x: Math.floor((screenSize.width - width) / 2),
    y: Math.floor((screenSize.height - height) / 2),
    title: 'nanoSecretary',
    frame: false,
    transparent: true,
    resizable: false, // transparent 窗口在 Windows 上不应 resizable，否则拖拽会触发尺寸异常（与悬浮球一致）
    autoHideMenuBar: true,
    icon: getIconPath(),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });
  homePageWindow.loadFile('homepage.html');
  homePageWindow.on('closed', () => { homePageWindow = null; });
}

/* ================= 历史记录窗口 ================= */
function createHistoryWindow() {
  if (historyWindow) {
    historyWindow.show();
    return;
  }
  historyWindow = new BrowserWindow({
    width: 720,
    height: 820,
    // 无系统描边，与另外三个窗口一致 —— 顶部不再叠「原生标题栏 + 菜单栏」两层，
    // 只剩 history.html 里那条兼作拖拽条的单行标题。
    // 这里原先四个窗口里唯一的 frame 默认(true) + autoHideMenuBar:false 组合，
    // 而全仓库没有任何 Menu.setApplicationMenu() 调用（下面两处 Menu.buildFromTemplate
    // 是托盘/悬浮球的右键菜单，不是应用菜单），于是 Electron 装了默认菜单 ——
    // 就是用户看到的 File / Edit / View / Window / Help。
    // title 保留：无边框后它只在任务栏/Alt-Tab 显示，那里正需要说清是哪个窗口。
    title: '历史记录 - nanoSecretary',
    frame: false,
    autoHideMenuBar: true,
    icon: getIconPath(),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });
  historyWindow.loadFile('history.html');
  historyWindow.on('closed', () => { historyWindow = null; });
}

/* ================= 便签窗口 ================= */
function createStickyWindow(entry) {
  // entry 存在：打开既有便签；否则新建一条
  const id = entry && entry.id ? entry.id : null;
  if (id && stickyWindows.has(id)) {
    const w = stickyWindows.get(id);
    if (w && !w.isDestroyed()) { w.show(); w.focus(); return w; }
    stickyWindows.delete(id);
  }

  const win = new BrowserWindow({
    width: 240,
    height: 230,
    frame: false,
    transparent: true,
    resizable: false, // transparent 窗口在 Windows 上不应 resizable
    alwaysOnTop: false,
    skipTaskbar: true,
    icon: getIconPath(),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });

  // 新便签：只分配一个 id 占住窗口槽位，**不落库**。
  // 便签只有在真正写了东西之后才成为一条记录 —— 否则「开一张、什么也不写、关掉」
  // 就会在历史里永久留下一条空便签（见 docs/决策日志.md 2026-09-15）。
  // 首次保存时 note-save 拿这个 id 建记录，所以 id 必须在这里先分配好。
  if (!id) {
    const draftId = newEntryId();
    stickyWindows.set(draftId, win);
    win.webContents.once('did-finish-load', () => {
      win.webContents.send('note-loaded', { id: draftId, title: '', content: '' });
    });
    win.loadFile('notes.html');
  } else {
    stickyWindows.set(id, win);
    win.webContents.once('did-finish-load', () => {
      win.webContents.send('note-loaded', { id, title: entry.title || '', content: entry.content || '' });
    });
    win.loadFile('notes.html');
  }

  win.on('closed', () => {
    for (const [k, w] of stickyWindows) {
      if (w === win) stickyWindows.delete(k);
    }
  });
  win.on('close', (e) => {
    // 点关闭按钮 = 收起（数据已存），不让窗口真正销毁
    if (!win.__reallyClose) {
      e.preventDefault();
      win.hide();
    }
  });

  return win;
}

// 新便签入口（托盘/悬浮球菜单/主页面共用）
function openNewSticky() {
  // 让新便签出现在主屏中央偏下，多个便签稍错开
  const count = stickyWindows.size;
  const baseX = 200 + (count % 5) * 30;
  const baseY = 160 + (count % 4) * 28;
  const win = createStickyWindow(null);
  if (win) { win.setPosition(baseX, baseY); win.show(); }
}

/* 便签 IPC */
ipcMain.on('note-save', (event, payload) => {
  if (!payload || typeof payload !== 'object') return;
  const title = String(payload.title || '').trim();
  const content = String(payload.content || '');
  const data = readData();
  const idx = data.findIndex((e) => e.id === payload.id && e.sticky === true);

  // 全空的便签不是一条记录：从没落过库的就什么也不做（窗口开着而已），
  // 落过库的（写了又全删光）顺手删掉，免得留一条空壳。
  if (!title && !content.trim()) {
    if (idx !== -1) {
      data.splice(idx, 1);
      writeData(data);
      broadcastEntriesChanged();
    }
    event.reply('note-saved', { id: payload.id || null, empty: true });
    return;
  }

  let entry = idx !== -1 ? data[idx] : null;
  const created = !entry;
  if (created) {
    // 首次保存才落库。id 用窗口创建时分配的那个（过了形状校验才认），
    // 这样便签窗口、stickyWindows 槽位、记录三者始终是同一个 id。
    entry = {
      id: ID_SHAPE.test(String(payload.id || '')) ? payload.id : newEntryId(),
      dueDate: null, time: null, priority: '低', status: 'note',
      category: '其他', tags: [], reminded: false, sticky: true,
      created: new Date().toISOString(),
    };
    data.push(entry);
  }
  entry.title = title || content.trim().slice(0, 30) || '便签';
  entry.content = content;
  entry.sticky = true;
  writeData(data);
  event.reply('note-saved', { id: entry.id, created });
  broadcastEntriesChanged();
});

ipcMain.on('note-pin', (event, id, pinned) => {
  const win = stickyWindows.get(id);
  if (win && !win.isDestroyed()) win.setAlwaysOnTop(!!pinned);
});

ipcMain.on('note-close', (event) => {
  // 收起当前便签（从 sender 找窗口）
  const sender = event.sender;
  for (const [, w] of stickyWindows) {
    if (w.webContents === sender) { w.hide(); break; }
  }
});

ipcMain.on('open-sticky', () => openNewSticky());

/* ================= 提醒调度器 ================= */
const DEFAULT_LEAD_HOURS = 24; // 默认提前 24 小时提醒
const CHECK_INTERVAL = 60 * 1000; // 每 60 秒扫一次

function getLeadHours() {
  const config = readConfig();
  const h = parseInt(config.remindLeadHours, 10);
  return (isNaN(h) || h < 0 || h > 168) ? DEFAULT_LEAD_HOURS : h;
}

function startReminderScheduler() {
  if (reminderTimer) clearInterval(reminderTimer);
  // 启动后先立刻扫一次，再进入定时
  scanReminders();
  reminderTimer = setInterval(scanReminders, CHECK_INTERVAL);
}

function getDueMoment(entry) {
  // 用记录的具体时间（HH:MM）构造到期时刻；无时间则按当天 00:00 算
  let due = new Date(entry.dueDate + 'T00:00:00');
  if (entry.time && /^\d{1,2}:\d{2}$/.test(entry.time)) {
    const [h, m] = entry.time.split(':').map(Number);
    due = new Date(entry.dueDate + `T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`);
  }
  return due;
}

function scanReminders() {
  try {
    const data = readData();
    const now = new Date();
    const leadMs = getLeadHours() * 3600 * 1000;
    let changed = false;

    for (const entry of data) {
      if (!isTodo(entry) || !entry.dueDate || entry.reminded) continue;
      const due = getDueMoment(entry);
      if (isNaN(due.getTime())) continue;
      const diff = due - now;
      // 提醒窗口：截止前 N 小时内，或已过期但不超过 8 天（只提醒一次）
      if (diff <= leadMs && diff > -8 * 24 * 3600 * 1000) {
        entry.reminded = true;
        changed = true;
        fireReminder(entry, diff, due);
      }
    }

    if (changed) writeData(data);
  } catch (e) {
    console.error('提醒扫描失败:', e);
  }
}

function fireReminder(entry, diffMs, due) {
  const hours = Math.round(diffMs / 3600 / 1000);
  const diffText = diffMs > 0 ? `还剩约 ${hours} 小时` : `已超时 ${Math.abs(hours)} 小时`;
  const dueText = due
    ? (entry.time
        ? `${entry.dueDate} ${entry.time}`
        : `${entry.dueDate}（当天）`)
    : String(entry.dueDate || '');

  // 1. 系统通知
  if (Notification.isSupported()) {
    const n = new Notification({
      title: 'nanoSecretary · 待办提醒',
      body: `${entry.title}\n${diffText}（原定 ${dueText}）`,
      icon: getIconPath(),
      silent: false,
    });
    n.on('click', () => {
      createHomePageWindow();
    });
    n.show();
  }

  // 2. 悬浮球视觉状态
  if (mainWindow) {
    mainWindow.webContents.send('reminder-alert', { hasDue: true, count: 1 });
  }

  // 3. 托盘提示
  if (tray) {
    tray.setToolTip(`nanoSecretary · 待办提醒：${entry.title}`);
    tray.displayBalloon && tray.displayBalloon({
      title: 'nanoSecretary · 待办提醒',
      content: `${entry.title}\n${diffText}`,
    });
  }

  // 异步生成更自然的提醒文案（不阻塞提醒本身）
  ollama.generateReminder(entry).then((text) => {
    if (text && mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('reminder-alert', { hasDue: true, count: 1, message: text });
    }
  }).catch(() => {});
}

/* ================= 记录逻辑 ================= */
function extractTags(text) {
  const tagRegex = /#([一-龥a-zA-Z0-9]+)/g;
  const tags = [];
  let match;
  while ((match = tagRegex.exec(text)) !== null) tags.push(match[1]);
  return tags;
}

/** 保存一条记录：同步保存，AI 解析异步补全 */
ipcMain.on('save-entry', async (event, text) => {
  try {
    const raw = String(text || '').trim();
    if (!raw) return;

    const tags = extractTags(raw);
    const cleanText = raw.replace(/#([一-龥a-zA-Z0-9]+)/g, '').trim() || raw;

    // 1. 先同步保存基础记录，保证不丢
    const entry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      content: cleanText,
      title: cleanText,
      dueDate: null,
      time: null,
      priority: '低',
      status: 'note',
      category: '其他',
      tags,
      reminded: false,
      created: new Date().toISOString(),
    };

    const data = readData();
    data.push(entry);
    writeData(data);
    event.reply('save-entry-success', { ok: true, entry });
    broadcastEntriesChanged(); // 立即广播，主页面/历史实时出现新条目

    // 2. 后台用 AI 解析：提取待办/截止日期/分类，解析成功则回填
    const aiEnabled = readConfig().aiEnabled !== false;
    if (aiEnabled) {
      try {
        const parsed = await ollama.parseEntry(cleanText);
        const category = await ollama.classifyEntry(cleanText);
        const updated = { ...entry };
        if (parsed.title) updated.title = parsed.title;
        if (parsed.dueDate) updated.dueDate = parsed.dueDate;
        // 「明天 19:00」里的时刻要留住，否则提醒会退化成当天 00:00（提前 24h 就成了立刻响）
        if (parsed.dueDate && parsed.time) updated.time = parsed.time;
        if (parsed.type === 'task' || parsed.dueDate) updated.status = 'pending';
        updated.priority = parsed.priority || updated.priority;
        updated.category = category;
        updated.tags = Array.from(new Set([...tags, category]));

        const idx = data.findIndex((d) => d.id === entry.id);
        if (idx !== -1) {
          data[idx] = updated;
          writeData(data);
          // 通知前端刷新（如果有 AI 解析结果展示）
          event.reply('entry-ai-refined', updated);
          broadcastEntriesChanged(); // AI 解析完成后广播，主页面/历史实时更新
        }
      } catch (e) {
        console.error('AI 解析失败:', e);
      }
    }
    sendTodoCount(); // 保存后更新角标
  } catch (e) {
    console.error('保存记录失败:', e);
    event.reply('save-entry-success', { ok: false });
  }
});

/* 输入时实时 AI 预览（不保存，仅返回解析结果） */
ipcMain.on('save-entry-preview', async (event, text) => {
  try {
    const clean = String(text || '').trim().replace(/#([一-龥a-zA-Z0-9]+)/g, '').trim() || String(text || '');
    const parsed = await ollama.parseEntry(clean);
    const category = await ollama.classifyEntry(clean);
    event.reply('entry-ai-preview', {
      title: parsed.title,
      dueDate: parsed.dueDate,
      time: parsed.time,
      priority: parsed.priority,
      type: parsed.type,
      category,
    });
  } catch (e) {
    // 预览失败静默忽略，不打扰输入
  }
});

/* 获取所有记录 */
ipcMain.on('get-entries', (event) => {
  event.reply('get-entries-success', readData());
});

/* 获取最近记录：与主页「待办事项」不相交 —— 已转 pending 的项在列表里，不再重复进最近记录
   （否则同一待办一屏两处渲染、操作还不同，且 markDone 会淡出错卡。critique P1）
   便签同样排除：它属便签窗口自己的地盘，不进首页任何一栏。 */
ipcMain.on('get-recent-entries', (event) => {
  const data = readData();
  const sorted = [...data]
    .filter((e) => e.status !== 'pending' && e.sticky !== true) // note/done 且非便签才进最近记录
    .sort((a, b) => new Date(b.created) - new Date(a.created))
    .slice(0, 5);
  event.reply('recent-entries', sorted);
});

/* 删除记录 */
ipcMain.on('delete-entry', (event, id) => {
  const data = readData();
  const newData = data.filter((e) => e.id !== id);
  writeData(newData);
  event.reply('delete-entry-success', true);
  broadcastEntriesChanged();
});

/* 撤销删除：把被删记录原样插回（保留原 id） */
ipcMain.on('restore-entry', (event, entry) => {
  if (!entry || !entry.id) return;
  const data = readData();
  if (data.some((e) => e.id === entry.id)) return; // 已存在则不重复
  data.push(entry);
  writeData(data);
  broadcastEntriesChanged();
});

/* 标记完成/未完成 */
ipcMain.on('mark-done', (event, id, done) => {
  const data = readData();
  const entry = data.find((e) => e.id === id);
  if (entry) {
    entry.status = done ? 'done' : (entry.dueDate ? 'pending' : 'note');
    if (done) entry.doneAt = new Date().toISOString(); // 仪表盘「完成趋势/进度」用
    else delete entry.doneAt;
    writeData(data);
    event.reply('entry-updated', entry);
    broadcastEntriesChanged(); // 更新角标 + 广播
  }
});

/* 备忘/随手记 → 转为待办（用户主动升级，不设截止日期，进待办列表）
   便签不在此列：它是自由记录区，只存在于便签窗口与历史页。 */
ipcMain.on('make-pending', (event, id) => {
  const data = readData();
  const entry = data.find((e) => e.id === id);
  if (entry && entry.status === 'note' && entry.sticky !== true) {
    entry.status = 'pending';
    writeData(data);
    event.reply('entry-updated', entry);
    broadcastEntriesChanged();
  }
});

/* 更新截止日期 */
ipcMain.on('update-due-date', (event, id, dueDate) => {
  const data = readData();
  const entry = data.find((e) => e.id === id);
  if (entry) {
    entry.dueDate = dueDate || null;
    // 便签只存日期、不改状态 —— 否则「改期」会变成一条隐形升级路径（见 isTodo 注释）
    if (entry.sticky === true) {
      writeData(data);
      event.reply('entry-updated', entry);
      broadcastEntriesChanged();
      return;
    }
    if (dueDate) entry.status = entry.status === 'done' ? 'done' : 'pending';
    else entry.status = entry.status === 'pending' ? 'note' : entry.status;
    writeData(data);
    event.reply('entry-updated', entry);
    broadcastEntriesChanged();
  }
});

/* 对话 */
ipcMain.on('chat-message', async (event, history) => {
  try {
    const userMsg = history.length ? history[history.length - 1].content : '';
    let actionNote = ''; // 实际执行的动作，注入上下文让 AI 基于事实回答

    // 检测创建任务意图 → 真实保存
    try {
      const task = await ollama.extractTaskFromMessage(userMsg);
      if (task) {
        const entry = {
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
          content: task.title,
          title: task.title,
          dueDate: task.dueDate,
          time: task.time || null,
          priority: task.priority || '低',
          status: task.dueDate ? 'pending' : 'pending',
          category: '其他',
          tags: [],
          reminded: false,
          created: new Date().toISOString(),
        };
        // 截止日期：若有时间，拼到 dueDate 上（用于提醒文案更精确）
        const data = readData();
        data.push(entry);
        writeData(data);
        broadcastEntriesChanged();
        // 尝试自动分类（后台）
        ollama.classifyEntry(task.title).then((cat) => {
          const d = readData();
          const idx = d.findIndex((e) => e.id === entry.id);
          if (idx !== -1) {
            d[idx].category = cat;
            d[idx].tags = [cat];
            writeData(d);
            broadcastEntriesChanged();
          }
        }).catch(() => {});

        const whenText = task.dueDate
          ? (task.time ? ` ${task.dueDate} ${task.time}` : ` ${task.dueDate}`)
          : (task.time ? ` 今天 ${task.time}` : '');
        actionNote = `\n\n[系统] 用户要求创建任务，你已经成功创建了任务「${task.title}」${whenText ? '，时间' + whenText : ''}。请在回复中明确告知用户已创建成功，并复述任务内容和时间。`;
      }
    } catch (e) {
      console.error('对话创建任务失败:', e);
    }

    // 附加待办上下文
    const entries = readData();
    const pending = entries
      .filter((e) => isTodo(e) && e.dueDate)
      .sort((a, b) => (a.dueDate < b.dueDate ? -1 : 1))
      .slice(0, 10)
      .map((e) => `${e.title}（截止${e.dueDate}${e.time ? ' ' + e.time : ''}）`);
    const ctx = pending.length ? `\n\n我的待办清单：\n- ${pending.join('\n- ')}` : '';

    const result = await ollama.chatReply([
      ...history.slice(0, -1),
      { role: 'user', content: userMsg + actionNote + ctx },
    ]);
    // 回包带 ok：渲染层据此决定要不要把这句话写进对话历史
    // （失败提示只是给用户看的，不能当成「秘书说过的话」喂回模型）
    event.reply('chat-reply', {
      ok: result.ok,
      text: result.ok ? result.text : chatFailText(result.reason),
    });
  } catch (e) {
    console.error('对话失败:', e);
    // 同样带 ok:false —— 否则这条提示会被渲染层当成正常回复写进对话历史
    event.reply('chat-reply', { ok: false, text: '（对话出错了，稍后再试）' });
  }
});

/**
 * 对话失败的文案：按真实原因分别说清楚。
 * 旧实现一律回「请确认 Ollama 已启动」—— 在服务明明可达、头部还写着
 * 「AI 在线」的时候，那句话是自相矛盾的假信息，用户照着做也修不好。
 */
function chatFailText(reason) {
  const secs = Math.round(ollama.CHAT_TIMEOUT / 1000);
  switch (reason) {
    case 'model_missing':
      return `（配置的模型 ${ollama.MODEL} 没有安装。到设置里换一个，或在终端执行 ollama pull ${ollama.MODEL}。）`;
    case 'no_chat_model':
      return '（本地没找到可用于对话的模型（只有嵌入模型）。先执行 ollama pull qwen2.5:7b。）';
    case 'timeout':
      return `（本地模型超过 ${secs} 秒没有返回，可能是首次加载较慢，再试一次通常就快了。）`;
    case 'empty':
      // 两种成因合并在这一个 reason 里：模型真的回了空白，或**只输出了思维链**
      // （推理模型被截断时的典型表现，见 ollama.js 的 stripThinking）。
      // 后者的处理动作是「换个模型」，所以文案要把这条路也指出来。
      return '（本地模型没有给出正文，多半只输出了推理过程。再试一次，或到设置里换一个对话模型。）';
    default:
      return '（本地模型返回了错误，稍后再试。）';
  }
}

/* 保存配置 */
ipcMain.on('save-config', (event, patch) => {
  const config = { ...readConfig(), ...patch };
  if (patch.autoStart !== undefined) {
    app.setLoginItemSettings({ openAtLogin: !!patch.autoStart });
  }
  if (patch.model) ollama.setModel(patch.model);

  // 主题：即时生效（nativeTheme 一改，四个窗口的 prefers-color-scheme 同步翻转，无需重启）
  if (patch.theme !== undefined) applyTheme(patch.theme);

  // 悬浮球开关：即时生效（关 → 隐藏窗口；开 → 恢复成球并显示）
  if (patch.showBall !== undefined && mainWindow && !mainWindow.isDestroyed()) {
    if (patch.showBall === false) {
      mainWindow.hide();
    } else {
      const work = screen.getPrimaryDisplay().workArea;
      const pos = (config.windowPosition && typeof config.windowPosition.x === 'number')
        ? config.windowPosition
        : { x: work.x + work.width - BALLOON_SIZE - 20, y: work.y + work.height - BALLOON_SIZE - 20 };
      mainWindow.setBounds({ x: pos.x, y: pos.y, width: BALLOON_SIZE, height: BALLOON_SIZE });
      mainWindow.show();
    }
  }

  writeConfig(config);

  // 快捷键：重新注册。结果一并回传，注册失败时不静默（旧键仍然有效）
  const shortcutResult = patch.shortcut !== undefined ? applyShortcut() : null;
  event.reply('config-saved', { ...config, _shortcut: shortcutResult });
});

/* 读取配置（设置面板回填当前主题选择用） */
ipcMain.on('get-config', (event) => {
  event.reply('config', readConfig());
});

/* 窗口操作 */
let ballPosBeforeInput = null;  // 进入输入模式前的球位置
let inputWindowPosAtOpen = null; // 输入面板初始放置位置
let inputExpanded = false;       // 输入窗是否处于「日历弹层展开」状态

/** 把矩形钳制进工作区。 */
function clampToWorkArea(x, y, w, h) {
  const work = screen.getPrimaryDisplay().workArea;
  return {
    x: Math.max(work.x, Math.min(Math.round(x), work.x + work.width - w)),
    y: Math.max(work.y, Math.min(Math.round(y), work.y + work.height - h)),
  };
}

/** 输入面板锚定悬浮球（优先球上方，空间不够则下方）。 */
function inputPosNearBall(height) {
  const [bx, by] = mainWindow.getPosition();
  const work = screen.getPrimaryDisplay().workArea;
  let y = by - height - 10;
  if (y < work.y) y = by + BALLOON_SIZE + 10;
  return clampToWorkArea(bx + BALLOON_SIZE / 2 - INPUT_SIZE.width / 2, y, INPUT_SIZE.width, height);
}

/** 输入面板锚定鼠标（悬浮球关闭时，按下快捷键的一刻你人在哪，面板就在哪）。 */
function inputPosNearCursor(height) {
  const pt = screen.getCursorScreenPoint();
  return clampToWorkArea(
    pt.x - INPUT_SIZE.width / 2,
    pt.y - height / 2,
    INPUT_SIZE.width,
    height
  );
}

/** 输入面板该出现在哪：球开着锚定球，球关着锚定鼠标。 */
function inputPosForCurrentMode(height) {
  return readConfig().showBall !== false ? inputPosNearBall(height) : inputPosNearCursor(height);
}

/** 把输入窗口放到球附近（优先球上方，空间不够则下方）。 */
function placeInputWindow(height) {
  const { x, y } = inputPosForCurrentMode(height);
  mainWindow.setSize(INPUT_SIZE.width, height);
  mainWindow.setPosition(x, y);
}

/**
 * 全局快捷键 / 托盘单击：把输入面板唤到眼前。
 * 只负责「开」——收起统一交给 Esc（渲染层 switchToBallMode → resizeWindow('ball')）。
 */
function openInputFromShortcut() {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  const height = INPUT_SIZE.height;
  const { x, y } = inputPosForCurrentMode(height);

  // 记录锚点，供日历弹层展开/收起时还原（与 resize-window 的 'input' 分支一致）
  const [bx, by] = mainWindow.getPosition();
  ballPosBeforeInput = { x: bx, y: by };
  inputWindowPosAtOpen = { x, y };
  inputExpanded = false;

  if (!mainWindow.isVisible()) mainWindow.show();
  // 用 setBounds 一次性带尺寸移动：避免先 setSize 后 setPosition 时，
  // Windows 把 x/y 按旧的大窗口尺寸钳制（见 resize-window 里的同类说明）
  mainWindow.setBounds({ x, y, width: INPUT_SIZE.width, height });
  mainWindow.webContents.send('open-input', { skipResize: true });
  mainWindow.focus();
}

ipcMain.on('resize-window', (event, mode) => {
  if (!mainWindow) return;
  const work = screen.getPrimaryDisplay().workArea;

  if (mode === 'input') {
    // 记录球位置（退出输入态时还原用）
    const [bx, by] = mainWindow.getPosition();
    ballPosBeforeInput = { x: bx, y: by };
    const inputH = INPUT_SIZE.height;
    const { x, y } = inputPosForCurrentMode(inputH);
    inputWindowPosAtOpen = { x, y };
    inputExpanded = false;
    mainWindow.setSize(INPUT_SIZE.width, inputH);
    mainWindow.setPosition(x, y);
    // 确保输入框窗口能获得焦点，否则键盘事件收不到
    mainWindow.focus();
  } else if (mode === 'input-expand') {
    // 日历弹层展开：临时加高输入窗（锚点不变，向右下伸展）
    if (inputExpanded) return;
    inputExpanded = true;
    const [px, py] = mainWindow.getPosition();
    const w = INPUT_CAL_SIZE.width;
    const h = INPUT_CAL_SIZE.height;
    let x = Math.min(px, work.x + work.width - w);
    x = Math.max(work.x, x);
    // 若原窗口贴近屏幕底，向上扩展（保留弹层在输入窗内）
    let y = py;
    if (y + h > work.y + work.height) y = Math.max(work.y, work.y + work.height - h);
    // setBounds 一次性带尺寸设置：先 setSize 再 setPosition 会被 Windows 按旧尺寸回滚
    // （与下方 'ball' 分支同一个坑，见那里的注释与 DESIGN.md「窗口缩放」）
    mainWindow.setBounds({ x: Math.round(x), y: Math.round(y), width: w, height: h });
  } else if (mode === 'input-collapse') {
    // 弹层关闭：还原输入窗
    if (!inputExpanded) return;
    inputExpanded = false;
    const inputH = INPUT_SIZE.height;
    // 回到展开前的锚点（若展开时挪了位置，尽量靠回）
    // 同样必须 setBounds：原先是 setSize + setPosition，2026-09-29 真机实测
    // **位置回得来、尺寸回不去** —— 关掉日历后输入窗滞留在 440x520，
    // 底部空一大片，看起来就像问题 3 没修好。
    if (inputWindowPosAtOpen) {
      mainWindow.setBounds({
        x: Math.round(inputWindowPosAtOpen.x),
        y: Math.round(inputWindowPosAtOpen.y),
        width: INPUT_SIZE.width,
        height: inputH,
      });
    } else {
      placeInputWindow(inputH);
    }
  } else {
    // mode === 'ball'：回到小球；若面板被拖过，保持相对位移
    const config = readConfig();
    // 悬浮球已关闭：不回到球，直接隐藏窗口（下次由快捷键/托盘重新唤出）
    if (config.showBall === false) {
      inputExpanded = false;
      ballPosBeforeInput = null;
      inputWindowPosAtOpen = null;
      mainWindow.hide();
      return;
    }
    let x, y;
    if (ballPosBeforeInput && inputWindowPosAtOpen) {
      const [px, py] = mainWindow.getPosition();
      x = ballPosBeforeInput.x + (px - inputWindowPosAtOpen.x);
      y = ballPosBeforeInput.y + (py - inputWindowPosAtOpen.y);
    } else if (config.windowPosition && typeof config.windowPosition.x === 'number') {
      x = config.windowPosition.x;
      y = config.windowPosition.y;
    } else {
      x = work.x + work.width - BALLOON_SIZE - 20;
      y = work.y + work.height - BALLOON_SIZE - 20;
    }
    x = Math.max(work.x, Math.min(x, work.x + work.width - BALLOON_SIZE));
    y = Math.max(work.y, Math.min(y, work.y + work.height - BALLOON_SIZE));
    inputExpanded = false;
    // 用 setBounds 一次性带尺寸移动：避免先 setSize 后 setPosition 时，
    // Windows 把 x/y 按旧的大窗口尺寸钳制（透明窗口 resizable:false 的怪癖），
    // 导致小球落在超大窗口一角、看似消失且无法点出（Enter 保存后必现）。
    mainWindow.setBounds({ x: Math.round(x), y: Math.round(y), width: BALLOON_SIZE, height: BALLOON_SIZE });
    ballPosBeforeInput = null;
    inputWindowPosAtOpen = null;
  }
});

/* 拖拽移动窗口（主进程驱动，增量模式，避免异步取位置的时序问题）
   renderer 在 mousedown 时发 'drag-window-start'，随后持续发 'drag-window-move' delta */
let dragStart = null;
let dragSize = null;

ipcMain.on('drag-window-start', (event) => {
  if (!mainWindow) return;
  const [x, y] = mainWindow.getPosition();
  dragStart = { x, y };
  dragSize = mainWindow.getSize(); // 记住拖拽开始时的尺寸
});

ipcMain.on('drag-window-move', (event, dx, dy) => {
  if (!mainWindow || !dragStart || !dragSize) return;
  const nx = Math.round(dragStart.x + dx);
  const ny = Math.round(dragStart.y + dy);
  // setBounds 显式带上拖拽开始时的尺寸，避免 Windows 高缩放下窗口逐次变大
  mainWindow.setBounds({ x: nx, y: ny, width: dragSize[0], height: dragSize[1] });
});

ipcMain.on('drag-window-end', () => {
  // 拖动结束时保存位置
  if (mainWindow && dragStart) {
    const [x, y] = mainWindow.getPosition();
    const config = readConfig();
    config.windowPosition = { x, y };
    writeConfig(config);
  }
  dragStart = null;
  dragSize = null;
});

/* 悬浮球右键菜单 */
ipcMain.on('show-ball-menu', (event, x, y) => {
  if (!mainWindow) return;
  const config = readConfig();
  const menu = Menu.buildFromTemplate([
    { label: '打开主页面', click: () => createHomePageWindow() },
    { label: '历史记录', click: () => createHistoryWindow() },
    { type: 'separator' },
    { label: '新建便签', click: () => openNewSticky() },
    { type: 'separator' },
    {
      label: '开机自启',
      type: 'checkbox',
      checked: config.autoStart || false,
      click: (item) => {
        config.autoStart = item.checked;
        writeConfig(config);
        app.setLoginItemSettings({ openAtLogin: item.checked });
      },
    },
    { label: '退出', click: () => app.quit() },
  ]);
  menu.popup({ window: mainWindow, x, y });
});

ipcMain.on('open-history', () => createHistoryWindow());
ipcMain.on('close-homepage', () => {
  if (homePageWindow) homePageWindow.hide();
});

/* 主页面窗口拖拽（增量模式） */
let homepageDragStart = null;
let homepageDragSize = null;

ipcMain.on('drag-homepage-start', () => {
  if (!homePageWindow) return;
  homepageDragStart = homePageWindow.getPosition();
  // 记住拖拽开始时的尺寸，全程用初始值，避免 getSize() 返回已放大值形成正反馈
  homepageDragSize = homePageWindow.getSize();
});

ipcMain.on('drag-homepage-move', (event, dx, dy) => {
  if (!homePageWindow || !homepageDragStart || !homepageDragSize) return;
  // setBounds 显式带上拖拽开始时的尺寸，位置+尺寸一起设置
  homePageWindow.setBounds({
    x: Math.round(homepageDragStart[0] + dx),
    y: Math.round(homepageDragStart[1] + dy),
    width: homepageDragSize[0],
    height: homepageDragSize[1],
  });
});

ipcMain.on('drag-homepage-end', () => {
  homepageDragStart = null;
  homepageDragSize = null;
});

/* 历史记录窗口：无边框后由 history.html 的单行标题兼作拖拽条，与主页面同款增量模式 */
ipcMain.on('close-history', () => {
  if (historyWindow) historyWindow.hide();
});

let historyDragStart = null;
let historyDragSize = null;

ipcMain.on('drag-history-start', () => {
  if (!historyWindow) return;
  historyDragStart = historyWindow.getPosition();
  // 全程用拖拽开始时的尺寸：getSize() 在高缩放下可能返回已放大的值，形成正反馈
  historyDragSize = historyWindow.getSize();
});

ipcMain.on('drag-history-move', (event, dx, dy) => {
  if (!historyWindow || !historyDragStart || !historyDragSize) return;
  // setBounds 位置+尺寸一起设 —— 先 setSize 再 setPosition 会被旧尺寸钳制
  historyWindow.setBounds({
    x: Math.round(historyDragStart[0] + dx),
    y: Math.round(historyDragStart[1] + dy),
    width: historyDragSize[0],
    height: historyDragSize[1],
  });
});

ipcMain.on('drag-history-end', () => {
  historyDragStart = null;
  historyDragSize = null;
});

ipcMain.on('get-ai-status', async (event) => {
  const available = await ollama.isAvailable();
  const models = available ? await ollama.listModels() : [];
  /* 「AI 在线」的诚实判据：服务可达 ≠ 能对话。
     旧实现只问 isAvailable()，于是配置的模型没装、甚至本地只剩嵌入模型时，
     头部照样写「AI 在线」—— 用户提问却得不到回复，界面和事实互相打脸。
     chatModels 为空时头部改报「无对话模型」。 */
  const chatModels = available ? await ollama.listChatModels() : [];
  const hasChatModel = chatModels.length > 0;
  const config = readConfig();
  // 配置的模型优先；它不在能对话的列表里就退回第一个能对话的（与实际回退一致）
  let effectiveModel = ollama.MODEL;
  if (hasChatModel && !chatModels.includes(ollama.MODEL)) {
    effectiveModel = chatModels[0];
  }
  event.reply('ai-status', {
    available,
    hasChatModel,
    chatModels,
    configuredModel: ollama.MODEL,
    model: effectiveModel,
    models,
    enabled: config.aiEnabled !== false,
    remindLeadHours: getLeadHours(),
    showBall: config.showBall !== false,
    shortcut: getShortcut(),
    shortcutRegistered: currentShortcut,
  });
});

/* 推送当前待办数给渲染进程（角标用） */
function countTodos() {
  return readData().filter(isTodo).length;
}

function sendTodoCount() {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  mainWindow.webContents.send('todo-count', countTodos());
}

ipcMain.on('get-todo-count', (event) => {
  event.reply('todo-count', countTodos());
});

/* ================= 生命周期 ================= */
app.whenReady().then(() => {
  const config = readConfig();
  if (config.model) ollama.setModel(config.model);
  // 先定主题再开窗：晚一步第一帧会按系统默认主题画，出现闪一下的换肤
  applyTheme(config.theme);
  createWindow();
  applyShortcut();
  startReminderScheduler();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 不释放会在系统里留下残留的全局热键
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  currentShortcut = null;
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
