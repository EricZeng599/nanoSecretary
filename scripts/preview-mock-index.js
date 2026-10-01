/**
 * preview-mock-index.js — 【仅开发期】悬浮球 + 输入窗静态预览用的 window.api 替身。
 *
 * 与 preview-mock.js（主页面用）分开：index.js 只关心球/角标/保存回包这几条链路，
 * 给它一整套假记录集反而是噪音 —— 这里只喂「待办 N 条」和一次保存成功回包。
 *
 * **不进 pack.bat 的拷贝清单，不随发行包发布。** 只被 scripts/preview-server.mjs
 * 在本地预览时注入，index.html 磁盘文件本身不含任何预览专用代码。
 *
 * 预览控制台（浏览器控制台里可用）：
 *   __preview.open()      展开输入面板
 *   __preview.ball()      收回悬浮球
 *   __preview.saveOk()    触发一次「保存成功」反相闪光
 *   __preview.count(3)    改角标数字（0 则隐藏角标）
 *   __preview.status('due' | 'urgent' | 'saved' | null)
 */
(function () {
  'use strict';

  const listeners = {
    openInput: [], saveSuccess: [], aiPreview: [], aiRefined: [],
    reminder: [], todoCount: [], entriesChanged: [],
  };
  const fire = (key, payload) => listeners[key].forEach((cb) => {
    try { cb(payload); } catch (e) { console.error(e); }
  });
  const on = (key) => (cb) => listeners[key].push(cb);

  window.api = {
    // —— 悬浮球 ——
    getTodoCount: () => setTimeout(() => fire('todoCount', 3), 0),
    onTodoCount: on('todoCount'),
    onOpenInput: on('openInput'),
    onReminderAlert: on('reminder'),
    onEntriesChanged: on('entriesChanged'),
    showBallMenu: () => console.info('[preview] showBallMenu'),

    // —— 保存链路 ——
    saveEntry: () => setTimeout(() => fire('saveSuccess', { ok: true }), 120),
    onSaveSuccess: on('saveSuccess'),
    saveEntryPreview: () => {},
    onAiPreview: on('aiPreview'),
    onAiRefined: on('aiRefined'),

    // —— 窗口：预览里全部无副作用 ——
    resizeWindow: () => {},
    dragStart: () => {}, dragMove: () => {}, dragEnd: () => {},
  };

  window.__preview = {
    open: () => fire('openInput', {}),
    ball: () => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })),
    saveOk: () => fire('saveSuccess', { ok: true }),
    count: (n) => fire('todoCount', n | 0),
    status(cls) {
      const ball = document.getElementById('floating-ball');
      ball.classList.remove('breathe', 'due', 'urgent', 'saved');
      if (cls) ball.classList.add(cls);
      else ball.classList.add('breathe');
    },
    // 输入面板的「AI 预览」分支：真实链路里由主进程回包，这里手工喂一条
    preview(text) {
      fire('aiPreview', {
        type: 'task',
        title: text || '交季度报告给王总',
        dueDate: new Date().toISOString().slice(0, 10),
        time: '18:00',
        priority: '高',
        category: '工作',
      });
    },
  };

  console.info('[preview] window.api mock 已注入（悬浮球）—— 试试 __preview.open()');
})();
