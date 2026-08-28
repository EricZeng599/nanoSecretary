/**
 * index.js — 悬浮球 + 输入面板（nanoSecretary）
 * 通过全局标识符 api 访问（contextBridge 注入）；不要用 const api = window.api 重复声明。
 */
const ball = document.getElementById('floating-ball');
const badge = document.getElementById('badge');
const inputContainer = document.getElementById('input-container');
const quickPanel = document.getElementById('quick-panel');
const formPanel = document.getElementById('form-panel');
const textInput = document.getElementById('text-input');
const saveButton = document.getElementById('save-button');
const saveButtonForm = document.getElementById('save-button-form');
const aiPreview = document.getElementById('ai-preview');
const saveError = document.getElementById('save-error');
const tabQuick = document.getElementById('tab-quick');
const tabForm = document.getElementById('tab-form');
const ballIcon = document.getElementById('ball-icon');

// 悬浮球图标（统一线性图标；SVG 不可用时留空而非退回 Unicode 符号）
function setBallIcon(name) {
    if (window.nanoIcons) {
        ballIcon.innerHTML = window.nanoIcons.ic(name);
    }
}

let currentMode = 'ball';
let entryMode = 'quick';
let pendingAiPreview = null; // AI 解析结果，用户确认后保存

// 无障碍：系统要求减少动态时，不再添加常驻呼吸动画（CSS 媒体查询仍兜底停用动画）
const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 初始化
inputContainer.style.display = 'none';
ball.style.display = 'flex';
setBallIcon('diamond'); // 初始球图标
if (!prefersReducedMotion) ball.classList.add('breathe'); // 常驻呼吸动画
api.getTodoCount(); // 初始化角标（待办数）

// Tab 切换（role="tablist"）
tabQuick.addEventListener('click', () => setEntryMode('quick'));
tabForm.addEventListener('click', () => setEntryMode('form'));
function setEntryMode(mode) {
    entryMode = mode;
    const isQuick = mode === 'quick';
    tabQuick.classList.toggle('active', isQuick);
    tabForm.classList.toggle('active', !isQuick);
    tabQuick.setAttribute('aria-selected', String(isQuick));
    tabForm.setAttribute('aria-selected', String(!isQuick));
    quickPanel.style.display = isQuick ? 'block' : 'none';
    formPanel.style.display = isQuick ? 'none' : 'block';
    if (isQuick) textInput.focus();
    else document.getElementById('f-title').focus();
}

// 悬浮球：双击进入输入模式（阈值判定：拖拽距离超过 5px 不视为双击）
let lastClickTime = 0, lastClickX = 0, lastClickY = 0;
ball.addEventListener('click', (e) => {
    if (currentMode !== 'ball') return;
    const now = Date.now();
    const moved = Math.hypot(e.clientX - lastClickX, e.clientY - lastClickY);
    if (now - lastClickTime < 350 && moved < 6) {
        switchToInputMode();
        lastClickTime = 0;
    } else {
        lastClickTime = now;
        lastClickX = e.clientX;
        lastClickY = e.clientY;
    }
});

// 键盘可达：Enter / Space 也能打开输入面板（悬浮球为 role="button"）
ball.addEventListener('keydown', (e) => {
    if (currentMode !== 'ball') return;
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        switchToInputMode();
    }
});

// ---- 通用指针拖拽（Pointer Events + setPointerCapture）----
// 指针捕获后，即使光标移出窗口，move/up 事件也持续发给目标元素，
// 彻底解决小窗口拖拽过程中事件丢失的问题。
function setupDrag(elm, onStart, onMove, onEnd) {
    let dragging = false;
    let startPX = 0, startPY = 0;

    elm.addEventListener('pointerdown', (e) => {
        if (e.button !== 0) return; // 只响应左键
        dragging = true;
        startPX = e.screenX;
        startPY = e.screenY;
        try { elm.setPointerCapture(e.pointerId); } catch (_) {}
        if (onStart) onStart();
    });

    elm.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const dx = e.screenX - startPX;
        const dy = e.screenY - startPY;
        // 位移超过阈值才算拖动，避免轻微抖动触发（Apple 建议 ~10px 滞回）
        if (onMove && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) {
            if (onMove(dx, dy) === false) return; // 回调返回 false 表示不消费
        }
    });

    const endDrag = (e) => {
        if (!dragging) return;
        dragging = false;
        try { elm.releasePointerCapture(e.pointerId); } catch (_) {}
        if (onEnd) onEnd();
    };
    elm.addEventListener('pointerup', endDrag);
    elm.addEventListener('pointercancel', endDrag);
}

// 悬浮球拖拽
setupDrag(ball,
    () => api.dragStart(),
    (dx, dy) => { api.dragMove(dx, dy); },
    () => api.dragEnd()
);

// 右键菜单
ball.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    api.showBallMenu(e.clientX, e.clientY);
});

// Esc 返回小球
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentMode === 'input') switchToBallMode();
});

// 输入面板拖拽（排除输入控件）
setupDrag(inputContainer,
    () => api.dragStart(),
    (dx, dy) => { api.dragMove(dx, dy); },
    () => api.dragEnd()
);
// 输入面板只在空白区域开始拖拽
inputContainer.addEventListener('pointerdown', (e) => {
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'BUTTON' || tag === 'TEXTAREA') {
        e.stopPropagation();
    }
}, true);

// 快速记录：输入时实时 AI 预览（防抖 300ms）
let aiTimer = null;
textInput.addEventListener('input', () => {
    clearTimeout(aiTimer);
    const text = textInput.value.trim();
    if (!text) { aiPreview.style.display = 'none'; pendingAiPreview = null; return; }
    aiTimer = setTimeout(() => {
        // 调主进程做 AI 解析预览
        api.saveEntryPreview && api.saveEntryPreview(text);
    }, 300);
});
api.onAiPreview && api.onAiPreview((preview) => {
    if (!preview) return;
    pendingAiPreview = preview;
    aiPreview.innerHTML = '';
    const title = document.createElement('div');
    title.className = 'ai-title';
    const ic = window.nanoIcons ? window.nanoIcons.ic(preview.type === 'task' ? 'pin' : 'note', 'inline') : '';
    title.innerHTML = ic + '<span></span>';
    title.lastChild.textContent = preview.title || '';
    const meta = document.createElement('div');
    meta.textContent = [preview.dueDate ? ('截止 ' + preview.dueDate) : '', preview.priority ? '优先级·' + preview.priority : '', preview.category ? preview.category : ''].filter(Boolean).join(' · ');
    aiPreview.appendChild(title);
    if (meta.textContent) aiPreview.appendChild(meta);
    aiPreview.style.display = 'block';
});

// 保存（快速记录）
saveButton.addEventListener('click', saveQuick);
textInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') saveQuick(); });
function saveQuick() {
    const text = textInput.value.trim();
    if (!text) return;
    hideSaveError();
    api.saveEntry(text);
    textInput.value = '';
    aiPreview.style.display = 'none';
    pendingAiPreview = null;
    switchToBallMode();
}

// 保存（结构化表单）
saveButtonForm.addEventListener('click', saveForm);
function saveForm() {
    const title = document.getElementById('f-title').value.trim();
    const due = document.getElementById('f-due').value;
    const priority = document.getElementById('f-priority').value;
    if (!title) { document.getElementById('f-title').focus(); return; }
    hideSaveError();
    let payload = title;
    if (due) payload += ' 截止' + due;
    payload += ' 优先级' + priority;
    api.saveEntry(payload);
    document.getElementById('f-title').value = '';
    document.getElementById('f-due').value = '';
    switchToBallMode();
}

// 保存结果
api.onSaveSuccess((data) => {
    if (!data || !data.ok) {
        showSaveError();
        return;
    }
    // 保存成功：球打勾闪光反馈
    showSaveSuccess();
});

function showSaveSuccess() {
    ball.classList.add('saved');
    setBallIcon('check');
    setTimeout(() => {
        ball.classList.remove('saved');
        setBallIcon('diamond');
    }, 650);
}
function showSaveError() {
    saveError.style.display = 'block';
    setTimeout(hideSaveError, 2500);
}
function hideSaveError() {
    saveError.style.display = 'none';
}

api.onAiRefined((entry) => {
    if (entry && entry.status === 'pending') updateBallStatus(true);
    api.getTodoCount(); // 刷新角标
});

// 提醒状态（主进程推送）
api.onReminderAlert((data) => {
    if (data && data.hasDue) updateBallStatus(true);
});

// 待办数角标（显示真实待办数，无待办则隐藏）
api.onTodoCount((count) => {
    const n = count || 0;
    badge.textContent = n > 99 ? '99+' : String(n);
    badge.style.display = n > 0 ? 'flex' : 'none';
    if (n > 0) {
        ball.classList.add('due');
        ball.classList.remove('breathe');
    } else {
        ball.classList.remove('due');
        if (!prefersReducedMotion) ball.classList.add('breathe');
    }
});

// 数据变更广播：刷新角标
api.onEntriesChanged((entries) => {
    const pending = (entries || []).filter((e) => e.status === 'pending').length;
    api.onTodoCount && api.getTodoCount();
    if (pending > 0) updateBallStatus(true);
});

function updateBallStatus(hasDue) {
    ball.classList.add('due');
    badge.style.display = 'flex';
}

// 模式切换
function switchToInputMode() {
    currentMode = 'input';
    ball.classList.remove('breathe', 'due', 'urgent');
    ball.style.transform = 'scale(0)';
    ball.style.opacity = '0';
    api.resizeWindow('input');
    // 面板材质化进入
    const wrapper = document.getElementById('input-wrapper');
    wrapper.classList.remove('show');
    void wrapper.offsetWidth; // 强制回流，重置过渡起点
    inputContainer.style.display = 'flex';
    requestAnimationFrame(() => requestAnimationFrame(() => {
        wrapper.classList.add('show');
    }));
    setEntryMode(entryMode);
    setTimeout(() => {
        if (entryMode === 'quick') textInput.focus();
        else document.getElementById('f-title').focus();
    }, 160);
}
function switchToBallMode() {
    currentMode = 'ball';
    const wrapper = document.getElementById('input-wrapper');
    wrapper.classList.remove('show'); // 先淡出，再切回球
    setTimeout(() => {
        if (currentMode !== 'ball') return;
        inputContainer.style.display = 'none';
        api.resizeWindow('ball');
        ball.style.display = 'flex';
        // 球 pop 出现
        ball.style.transform = 'scale(0.8)';
        ball.style.opacity = '0';
        requestAnimationFrame(() => requestAnimationFrame(() => {
            ball.style.transform = '';
            ball.style.opacity = '';
        }));
        if (!prefersReducedMotion) ball.classList.add('breathe');
    }, 180);
}
