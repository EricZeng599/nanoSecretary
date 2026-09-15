/**
 * preload.js — 通过 contextBridge 安全地向渲染进程暴露受控 IPC 接口
 * 渲染进程不再直接 require('electron')，降低安全风险。
 */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // 保存记录（渲染进程只发消息，不等待阻塞）
  saveEntry: (text) => ipcRenderer.send('save-entry', text),
  onSaveSuccess: (cb) => ipcRenderer.on('save-entry-success', (e, data) => cb(data)),
  onAiRefined: (cb) => ipcRenderer.on('entry-ai-refined', (e, entry) => cb(entry)),

  // 输入时实时 AI 预览（不保存）
  saveEntryPreview: (text) => ipcRenderer.send('save-entry-preview', text),
  onAiPreview: (cb) => ipcRenderer.on('entry-ai-preview', (e, preview) => cb(preview)),

  // 记录查询
  getEntries: () => ipcRenderer.send('get-entries'),
  onEntries: (cb) => ipcRenderer.on('get-entries-success', (e, data) => cb(data)),
  // 数据变更广播（任意窗口增删改后触发）
  onEntriesChanged: (cb) => ipcRenderer.on('entries-changed', (e, data) => cb(data)),
  getRecentEntries: () => ipcRenderer.send('get-recent-entries'),
  onRecentEntries: (cb) => ipcRenderer.on('recent-entries', (e, data) => cb(data)),
  deleteEntry: (id) => ipcRenderer.send('delete-entry', id),
  onDeleteSuccess: (cb) => ipcRenderer.on('delete-entry-success', (e, ok) => cb(ok)),
  restoreEntry: (entry) => ipcRenderer.send('restore-entry', entry),
  markDone: (id, done) => ipcRenderer.send('mark-done', id, done),
  updateDueDate: (id, dueDate) => ipcRenderer.send('update-due-date', id, dueDate),
  makePending: (id) => ipcRenderer.send('make-pending', id),
  onEntryUpdated: (cb) => ipcRenderer.on('entry-updated', (e, entry) => cb(entry)),

  // 窗口操作
  resizeWindow: (mode) => ipcRenderer.send('resize-window', mode),
  // 增量拖拽（主进程驱动）
  dragStart: () => ipcRenderer.send('drag-window-start'),
  dragMove: (dx, dy) => ipcRenderer.send('drag-window-move', dx, dy),
  dragEnd: () => ipcRenderer.send('drag-window-end'),
  showBallMenu: (x, y) => ipcRenderer.send('show-ball-menu', x, y),
  // 主进程唤起输入面板（全局快捷键 / 托盘单击）
  onOpenInput: (cb) => ipcRenderer.on('open-input', (e, opts) => cb(opts)),
  openHistory: () => ipcRenderer.send('open-history'),
  closeHomepage: () => ipcRenderer.send('close-homepage'),
  // 主页面窗口拖拽
  dragHomepageStart: () => ipcRenderer.send('drag-homepage-start'),
  dragHomepageMove: (dx, dy) => ipcRenderer.send('drag-homepage-move', dx, dy),
  dragHomepageEnd: () => ipcRenderer.send('drag-homepage-end'),

  // 配置
  saveConfig: (patch) => ipcRenderer.send('save-config', patch),
  onConfigSaved: (cb) => ipcRenderer.on('config-saved', (e, data) => cb(data)),

  // AI 状态
  getAiStatus: () => ipcRenderer.send('get-ai-status'),
  onAiStatus: (cb) => ipcRenderer.on('ai-status', (e, data) => cb(data)),

  // 待办数（角标）
  getTodoCount: () => ipcRenderer.send('get-todo-count'),
  onTodoCount: (cb) => ipcRenderer.on('todo-count', (e, count) => cb(count)),

  // 对话
  sendChat: (history) => ipcRenderer.send('chat-message', history),
  onChatReply: (cb) => ipcRenderer.on('chat-reply', (e, text) => cb(text)),

  // 提醒（悬浮球收到待办提醒时）
  onReminderAlert: (cb) => ipcRenderer.on('reminder-alert', (e, data) => cb(data)),

  // 便签
  saveNote: (payload) => ipcRenderer.send('note-save', payload),
  onNoteSaved: (cb) => ipcRenderer.on('note-saved', (e, data) => cb(data)),
  onNoteLoaded: (cb) => ipcRenderer.on('note-loaded', (e, data) => cb(data)),
  setNotePinned: (id, pinned) => ipcRenderer.send('note-pin', id, pinned),
  closeNote: () => ipcRenderer.send('note-close'),
  openSticky: () => ipcRenderer.send('open-sticky'),
});
