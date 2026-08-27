const { app, BrowserWindow, screen, Menu, Tray, ipcMain, Notification, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');
const ollama = require('./ollama');

/* ================= 窗口状态 ================= */
let mainWindow;       // 悬浮球窗口
let homePageWindow;   // 主页面
let historyWindow;    // 历史记录
let tray;
let reminderTimer = null;
let isDragging = false;
let startX, startY, startWindowX, startWindowY;

const BALLOON_SIZE = 120; // 加大窗口，给 hover/呼吸/阴影留足余量（球 40px 居中）
const INPUT_SIZE = { width: 420, height: 190 };

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
        priority: e.priority || '低',
        status: e.status || (e.dueDate ? 'pending' : 'note'),
        category: e.category || '其他',
        tags: e.tags || [],
        reminded: e.reminded || false,
        created: e.created || new Date().toISOString(),
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

function getIconPath() {
  const ico = path.join(__dirname, 'cyber-secretary.ico');
  if (fs.existsSync(ico)) return ico;
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
      sandbox: false,
    },
  });

  // 渲染进程通过 IPC 请求移动窗口，这里统一处理（去掉主进程自己的拖拽逻辑）
  mainWindow.loadFile('index.html');

  // —— 诊断日志：捕获渲染进程是否正常执行（定位"拖不动/不呼吸"根因）——
  mainWindow.webContents.on('console-message', (e, level, message, line, sourceId) => {
    console.log(`[renderer:${level}] ${message} (${sourceId}:${line})`);
  });
  mainWindow.webContents.on('preload-error', (e, preloadPath, error) => {
    console.error('[preload-error]', preloadPath, error);
  });
  mainWindow.webContents.on('did-fail-load', (e, code, desc) => {
    console.error('[did-fail-load]', code, desc);
  });
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.webContents
      .executeJavaScript('typeof window.api')
      .then((r) => console.log('[diag] window.api typeof =', r))
      .catch((err) => console.log('[diag] executeJavaScript error:', err.message));
    // 打印实际窗口尺寸，验证是否真的是 BALLOON_SIZE
    const [w, h] = mainWindow.getSize();
    console.log('[diag] window size =', w, 'x', h, '(期望', BALLOON_SIZE, 'x', BALLOON_SIZE + ')');
  });

  createTray();
}

/* ================= 托盘 ================= */
function createTray() {
  tray = new Tray(loadIcon());
  tray.setToolTip('赛博秘书');

  const rebuildMenu = () => {
    const config = readConfig();
    const contextMenu = Menu.buildFromTemplate([
      { label: '显示/隐藏悬浮球', click: () => toggleMainWindow() },
      { label: '主页面', click: () => createHomePageWindow() },
      { label: '历史记录', click: () => createHistoryWindow() },
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
  tray.on('click', () => toggleMainWindow());
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
  if (mainWindow.isVisible()) mainWindow.hide();
  else mainWindow.show();
}

/* ================= 主页面窗口 ================= */
function createHomePageWindow() {
  if (homePageWindow) {
    homePageWindow.show();
    return;
  }
  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  const width = 560, height = 620;
  homePageWindow = new BrowserWindow({
    width, height,
    x: Math.floor((screenSize.width - width) / 2),
    y: Math.floor((screenSize.height - height) / 2),
    title: '赛博秘书',
    frame: false,
    transparent: true,
    autoHideMenuBar: true,
    icon: getIconPath(),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
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
    title: '历史记录 - 赛博秘书',
    autoHideMenuBar: false,
    icon: getIconPath(),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
    },
  });
  historyWindow.loadFile('history.html');
  historyWindow.on('closed', () => { historyWindow = null; });
}

/* ================= 提醒调度器 ================= */
const REMIND_LEAD_HOURS = 24; // 提前 24 小时提醒
const CHECK_INTERVAL = 60 * 1000; // 每 60 秒扫一次

function startReminderScheduler() {
  if (reminderTimer) clearInterval(reminderTimer);
  // 启动后先立刻扫一次，再进入定时
  scanReminders();
  reminderTimer = setInterval(scanReminders, CHECK_INTERVAL);
}

function scanReminders() {
  try {
    const data = readData();
    const now = new Date();
    const leadMs = REMIND_LEAD_HOURS * 3600 * 1000;
    let changed = false;

    for (const entry of data) {
      if (entry.status !== 'pending' || !entry.dueDate || entry.reminded) continue;
      const due = new Date(entry.dueDate + 'T00:00:00');
      if (isNaN(due.getTime())) continue;
      const diff = due - now;
      // 提醒窗口：截止前 24 小时内，或已过期但不超过 8 天（只提醒一次）
      if (diff <= leadMs && diff > -8 * 24 * 3600 * 1000) {
        entry.reminded = true;
        changed = true;
        fireReminder(entry, diff);
      }
    }

    if (changed) writeData(data);
  } catch (e) {
    console.error('提醒扫描失败:', e);
  }
}

function fireReminder(entry, diffMs) {
  const hours = Math.round(diffMs / 3600 / 1000);
  const diffText = diffMs > 0 ? `还剩约 ${hours} 小时` : `已超时 ${-hours} 小时`;

  // 1. 系统通知
  if (Notification.isSupported()) {
    const n = new Notification({
      title: '赛博秘书 · 待办提醒',
      body: `${entry.title}\n${diffText}（原定 ${entry.dueDate}）`,
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
    tray.setToolTip(`赛博秘书 · 待办提醒：${entry.title}`);
    tray.displayBalloon && tray.displayBalloon({
      title: '赛博秘书 · 待办提醒',
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

    // 2. 后台用 AI 解析：提取待办/截止日期/分类，解析成功则回填
    const aiEnabled = readConfig().aiEnabled !== false;
    if (aiEnabled) {
      try {
        const parsed = await ollama.parseEntry(cleanText);
        const category = await ollama.classifyEntry(cleanText);
        const updated = { ...entry };
        if (parsed.title) updated.title = parsed.title;
        if (parsed.dueDate) updated.dueDate = parsed.dueDate;
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
        }
      } catch (e) {
        console.error('AI 解析失败:', e);
      }
    }
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

/* 获取最近记录 */
ipcMain.on('get-recent-entries', (event) => {
  const data = readData();
  const sorted = [...data].sort((a, b) => new Date(b.created) - new Date(a.created)).slice(0, 5);
  event.reply('recent-entries', sorted);
});

/* 删除记录 */
ipcMain.on('delete-entry', (event, id) => {
  const data = readData();
  const newData = data.filter((e) => e.id !== id);
  writeData(newData);
  event.reply('delete-entry-success', true);
});

/* 标记完成/未完成 */
ipcMain.on('mark-done', (event, id, done) => {
  const data = readData();
  const entry = data.find((e) => e.id === id);
  if (entry) {
    entry.status = done ? 'done' : (entry.dueDate ? 'pending' : 'note');
    writeData(data);
    event.reply('entry-updated', entry);
  }
});

/* 更新截止日期 */
ipcMain.on('update-due-date', (event, id, dueDate) => {
  const data = readData();
  const entry = data.find((e) => e.id === id);
  if (entry) {
    entry.dueDate = dueDate || null;
    if (dueDate) entry.status = entry.status === 'done' ? 'done' : 'pending';
    else entry.status = entry.status === 'pending' ? 'note' : entry.status;
    writeData(data);
    event.reply('entry-updated', entry);
  }
});

/* 对话 */
ipcMain.on('chat-message', async (event, history) => {
  try {
    // 附加待办上下文
    const entries = readData();
    const pending = entries
      .filter((e) => e.status === 'pending' && e.dueDate)
      .sort((a, b) => (a.dueDate < b.dueDate ? -1 : 1))
      .slice(0, 10)
      .map((e) => `${e.title}（截止${e.dueDate}）`);
    const ctx = pending.length ? `\n\n我的待办清单：\n- ${pending.join('\n- ')}` : '';
    const userMsg = history.length ? history[history.length - 1].content : '';
    const reply = await ollama.chatReply([
      ...history.slice(0, -1),
      { role: 'user', content: userMsg + ctx },
    ]);
    event.reply('chat-reply', reply || '（本地模型暂时不可用，请确认 Ollama 已启动）');
  } catch (e) {
    console.error('对话失败:', e);
    event.reply('chat-reply', '（对话出错了，稍后再试）');
  }
});

/* 获取配置 */
ipcMain.on('get-config', (event) => {
  event.reply('config-data', readConfig());
});

/* 保存配置 */
ipcMain.on('save-config', (event, patch) => {
  const config = { ...readConfig(), ...patch };
  if (patch.autoStart !== undefined) {
    app.setLoginItemSettings({ openAtLogin: !!patch.autoStart });
  }
  if (patch.model) ollama.setModel(patch.model);
  writeConfig(config);
  event.reply('config-saved', config);
});

/* 窗口操作 */
let ballPosBeforeInput = null;  // 进入输入模式前的球位置
let inputWindowPosAtOpen = null; // 输入面板初始放置位置

ipcMain.on('resize-window', (event, mode) => {
  if (!mainWindow) return;
  const work = screen.getPrimaryDisplay().workArea;

  if (mode === 'input') {
    // 记录球位置，把输入面板放到球附近（优先球上方，空间不够则下方）
    const [bx, by] = mainWindow.getPosition();
    ballPosBeforeInput = { x: bx, y: by };
    const inputW = INPUT_SIZE.width;
    const inputH = INPUT_SIZE.height;
    const ballCenterX = bx + BALLOON_SIZE / 2;
    let x = Math.round(ballCenterX - inputW / 2);
    let y = by - inputH - 10;
    if (y < work.y) y = by + BALLOON_SIZE + 10;
    x = Math.max(work.x, Math.min(x, work.x + work.width - inputW));
    y = Math.max(work.y, Math.min(y, work.y + work.height - inputH));
    inputWindowPosAtOpen = { x, y };
    mainWindow.setSize(inputW, inputH);
    mainWindow.setPosition(x, y);
    // 确保输入框窗口能获得焦点，否则键盘事件收不到
    mainWindow.focus();
  } else {
    // 回到小球：若面板被拖过，保持相对位移
    const config = readConfig();
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
    mainWindow.setSize(BALLOON_SIZE, BALLOON_SIZE);
    mainWindow.setPosition(x, y);
    ballPosBeforeInput = null;
    inputWindowPosAtOpen = null;
  }
});

/* 拖拽移动窗口（主进程驱动，增量模式，避免异步取位置的时序问题）
   renderer 在 mousedown 时发 'drag-window-start'，随后持续发 'drag-window-move' delta */
let dragStart = null;

ipcMain.on('drag-window-start', (event) => {
  if (!mainWindow) return;
  const [x, y] = mainWindow.getPosition();
  dragStart = { x, y };
});

ipcMain.on('drag-window-move', (event, dx, dy) => {
  if (!mainWindow || !dragStart) return;
  const nx = Math.round(dragStart.x + dx);
  const ny = Math.round(dragStart.y + dy);
  mainWindow.setPosition(nx, ny);
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
});

/* 兼容旧接口：移动窗口 */
ipcMain.on('move-window', (event, x, y) => {
  if (!mainWindow) return;
  const intX = Math.floor(x);
  const intY = Math.floor(y);
  mainWindow.setPosition(intX, intY);
  const config = readConfig();
  config.windowPosition = { x: intX, y: intY };
  writeConfig(config);
});

ipcMain.on('get-window-position', (event) => {
  if (mainWindow) {
    const [x, y] = mainWindow.getPosition();
    event.reply('window-position', x, y);
  }
});

/* 悬浮球右键菜单 */
ipcMain.on('show-ball-menu', (event, x, y) => {
  if (!mainWindow) return;
  const config = readConfig();
  const menu = Menu.buildFromTemplate([
    { label: '打开主页面', click: () => createHomePageWindow() },
    { label: '历史记录', click: () => createHistoryWindow() },
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

ipcMain.on('drag-homepage-start', () => {
  if (!homePageWindow) return;
  homepageDragStart = homePageWindow.getPosition();
});

ipcMain.on('drag-homepage-move', (event, dx, dy) => {
  if (!homePageWindow || !homepageDragStart) return;
  homePageWindow.setPosition(
    Math.round(homepageDragStart[0] + dx),
    Math.round(homepageDragStart[1] + dy)
  );
});

ipcMain.on('drag-homepage-end', () => {
  homepageDragStart = null;
});

ipcMain.on('get-homepage-position', (event) => {
  if (homePageWindow) {
    const [x, y] = homePageWindow.getPosition();
    event.reply('homepage-position', x, y);
  }
});

ipcMain.on('move-homepage', (event, x, y) => {
  if (homePageWindow) homePageWindow.setPosition(Math.floor(x), Math.floor(y));
});

ipcMain.on('get-ai-status', async (event) => {
  const available = await ollama.isAvailable();
  const models = available ? await ollama.listModels() : [];
  event.reply('ai-status', {
    available,
    model: ollama.MODEL,
    models,
    enabled: readConfig().aiEnabled !== false,
  });
});

/* ================= 生命周期 ================= */
app.whenReady().then(() => {
  const config = readConfig();
  if (config.model) ollama.setModel(config.model);
  createWindow();
  startReminderScheduler();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
