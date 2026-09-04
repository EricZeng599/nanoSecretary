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
const INPUT_CAL_SIZE = { width: 440, height: 520 }; // 日历弹层展开时的输入窗尺寸（临时扩大）

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
        time: e.time || null,
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
  const ico = path.join(__dirname, 'nanoSecretary.ico');
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
    title: '历史记录 - nanoSecretary',
    autoHideMenuBar: false,
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
      if (entry.status !== 'pending' || !entry.dueDate || entry.reminded) continue;
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
  broadcastEntriesChanged();
});

/* 标记完成/未完成 */
ipcMain.on('mark-done', (event, id, done) => {
  const data = readData();
  const entry = data.find((e) => e.id === id);
  if (entry) {
    entry.status = done ? 'done' : (entry.dueDate ? 'pending' : 'note');
    writeData(data);
    event.reply('entry-updated', entry);
    broadcastEntriesChanged(); // 更新角标 + 广播
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
      .filter((e) => e.status === 'pending' && e.dueDate)
      .sort((a, b) => (a.dueDate < b.dueDate ? -1 : 1))
      .slice(0, 10)
      .map((e) => `${e.title}（截止${e.dueDate}${e.time ? ' ' + e.time : ''}）`);
    const ctx = pending.length ? `\n\n我的待办清单：\n- ${pending.join('\n- ')}` : '';

    const reply = await ollama.chatReply([
      ...history.slice(0, -1),
      { role: 'user', content: userMsg + actionNote + ctx },
    ]);
    event.reply('chat-reply', reply || '（本地模型暂时不可用，请确认 Ollama 已启动）');
  } catch (e) {
    console.error('对话失败:', e);
    event.reply('chat-reply', '（对话出错了，稍后再试）');
  }
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
let inputExpanded = false;       // 输入窗是否处于「日历弹层展开」状态

/** 把输入窗口放到球附近（优先球上方，空间不够则下方）。 */
function placeInputWindow(height) {
  const work = screen.getPrimaryDisplay().workArea;
  const [bx, by] = mainWindow.getPosition();
  const inputW = INPUT_SIZE.width;
  const inputH = height;
  const ballCenterX = bx + BALLOON_SIZE / 2;
  let x = Math.round(ballCenterX - inputW / 2);
  let y = by - inputH - 10;
  if (y < work.y) y = by + BALLOON_SIZE + 10;
  x = Math.max(work.x, Math.min(x, work.x + work.width - inputW));
  y = Math.max(work.y, Math.min(y, work.y + work.height - inputH));
  mainWindow.setSize(inputW, inputH);
  mainWindow.setPosition(x, y);
}

ipcMain.on('resize-window', (event, mode) => {
  if (!mainWindow) return;
  const work = screen.getPrimaryDisplay().workArea;

  if (mode === 'input') {
    // 记录球位置，把输入面板放到球附近
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
    inputExpanded = false;
    mainWindow.setSize(inputW, inputH);
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
    mainWindow.setSize(w, h);
    mainWindow.setPosition(x, y);
  } else if (mode === 'input-collapse') {
    // 弹层关闭：还原输入窗
    if (!inputExpanded) return;
    inputExpanded = false;
    const inputH = INPUT_SIZE.height;
    const [px, py] = mainWindow.getPosition();
    // 回到展开前的锚点（若展开时挪了位置，尽量靠回）
    if (inputWindowPosAtOpen) {
      mainWindow.setSize(INPUT_SIZE.width, inputH);
      mainWindow.setPosition(inputWindowPosAtOpen.x, inputWindowPosAtOpen.y);
    } else {
      placeInputWindow(inputH);
    }
  } else {
    // mode === 'ball'：回到小球；若面板被拖过，保持相对位移
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
    inputExpanded = false;
    mainWindow.setSize(BALLOON_SIZE, BALLOON_SIZE);
    mainWindow.setPosition(x, y);
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

ipcMain.on('get-ai-status', async (event) => {
  const available = await ollama.isAvailable();
  const models = available ? await ollama.listModels() : [];
  const config = readConfig();
  let effectiveModel = ollama.MODEL;
  // 若配置的模型不在已安装列表里，报告第一个可用的模型（与实际对话回退一致）
  if (available && models.length && !models.includes(ollama.MODEL)) {
    effectiveModel = models[0];
  }
  event.reply('ai-status', {
    available,
    model: effectiveModel,
    models,
    enabled: config.aiEnabled !== false,
    remindLeadHours: getLeadHours(),
  });
});

/* 推送当前待办数给渲染进程（角标用） */
function sendTodoCount() {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  const data = readData();
  const count = data.filter((e) => e.status === 'pending').length;
  mainWindow.webContents.send('todo-count', count);
}

ipcMain.on('get-todo-count', (event) => {
  const data = readData();
  const count = data.filter((e) => e.status === 'pending').length;
  event.reply('todo-count', count);
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
