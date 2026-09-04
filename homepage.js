/**
 * homepage.js — 主页面（nanoSecretary）
 * 通过全局标识符 api 访问（contextBridge 注入）；不要用 const api = window.api 重复声明。
 */
let allEntries = [];
let chatHistory = [];

// ---- Tab 图标（统一线性图标）----
const tabIconHolders = {
    records: document.getElementById('tab-records-icon'),
    chat: document.getElementById('tab-chat-icon'),
};
function mountTabIcons() {
    if (!window.nanoIcons) return;
    if (tabIconHolders.records) tabIconHolders.records.innerHTML = window.nanoIcons.ic('note', 'inline');
    if (tabIconHolders.chat) tabIconHolders.chat.innerHTML = window.nanoIcons.ic('chat', 'inline');
}
mountTabIcons();

// ---- Tab 切换（role="tablist"）----
const viewTabs = document.querySelectorAll('.tabs > .tab');
viewTabs.forEach((tab) => {
    tab.addEventListener('click', () => setView(tab.dataset.view));
    tab.addEventListener('keydown', (e) => {
        // 左右方向键在 tab 间移动（无障碍 tablist 交互模式）
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const idx = Array.prototype.indexOf.call(viewTabs, tab);
        const next = viewTabs[(idx + (e.key === 'ArrowRight' ? 1 : -1) + viewTabs.length) % viewTabs.length];
        setView(next.dataset.view);
        next.focus();
    });
});
function setView(view) {
    viewTabs.forEach((t) => {
        const active = t.dataset.view === view;
        t.classList.toggle('active', active);
        t.setAttribute('aria-selected', String(active));
    });
    document.getElementById('view-records').style.display = view === 'records' ? 'block' : 'none';
    document.getElementById('view-chat').style.display = view === 'chat' ? 'flex' : 'none';
    if (view === 'chat') document.getElementById('chat-input').focus();
}

// 加载数据
function loadData() {
    api.getRecentEntries();
    api.getEntries();
}

// 保存
function saveEntry() {
    const text = document.getElementById('input-text').value.trim();
    if (!text) return;
    api.saveEntry(text);
    document.getElementById('input-text').value = '';
    document.getElementById('ai-preview-box').style.display = 'none';
    loadData();
}
document.getElementById('save-button').addEventListener('click', saveEntry);
document.getElementById('input-text').addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') saveEntry();
});

// ---- 列表事件委托（替代内联 onclick，兼容 CSP 无内联脚本）----
document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = btn.dataset.id;
    if (btn.dataset.action === 'done') markDone(id, true);
    else if (btn.dataset.action === 'restore') markDone(id, false);
    else if (btn.dataset.action === 'delete') delEntry(id);
    else if (btn.dataset.action === 'reschedule') toggleDueEdit(id);
});

/** 本地时区的「今天」yyyy-mm-dd（civil date，不用 toISOString 避免 UTC 差一天）。 */
function localToday() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

// 渲染待办
function renderTodos() {
    // 若改期行打开，先清理（列表即将重绘，其 DOM 会失效）
    if (dueEditRow) removeDueEdit();
    const list = document.getElementById('todo-list');
    const todos = allEntries
        .filter((e) => e.status === 'pending')
        .sort((a, b) => (a.dueDate || '9999') < (b.dueDate || '9999') ? -1 : 1);
    document.getElementById('record-count').textContent = todos.length ? '(' + todos.length + ')' : '';

    if (!todos.length) {
        list.innerHTML = '<div class="empty">没有待办，记点什么吧</div>';
        return;
    }
    const today = localToday();
    const ic = (name, cls) => (window.nanoIcons ? window.nanoIcons.ic(name, cls) : '');
    list.innerHTML = todos.map((e) => {
        const overdue = e.dueDate && e.dueDate < today;
        const todayDue = e.dueDate === today;
        const cls = overdue ? 'overdue' : todayDue ? 'today' : '';
        const dueText = e.dueDate
            ? (overdue ? '已逾期' : todayDue ? '今天截止' : '截止 ' + e.dueDate) + (e.time ? ' ' + e.time : '')
            : (e.time ? '今天 ' + e.time : '');
        return `<div class="entry-item ${cls}" data-id="${e.id}">
            <div class="entry-title">${esc(e.title)}</div>
            <div class="entry-meta">
                ${dueText ? `<span class="due ${overdue ? 'overdue' : ''}">${ic('clock', 'inline')}${esc(dueText)}</span>` : ''}
                ${e.priority === '高' ? `<span class="priority-high">${ic('fire', 'inline')}高优先级</span>` : e.priority === '中' ? `<span class="priority-mid">中</span>` : ''}
                ${e.category ? `<span class="cat">${esc(e.category)}</span>` : ''}
            </div>
            <div class="entry-actions">
                <button class="done-btn" type="button" data-action="done" data-id="${e.id}">${ic('check', 'inline')}完成</button>
                ${e.dueDate ? `<button type="button" data-action="reschedule" data-id="${e.id}">${ic('edit', 'inline')}改期</button>` : ''}
            </div>
        </div>`;
    }).join('');
}

// 渲染最近记录
function renderRecent(entries) {
    const list = document.getElementById('recent-list');
    if (!entries.length) {
        list.innerHTML = '<div class="empty">暂无记录</div>';
        return;
    }
    const ic = (name, cls) => (window.nanoIcons ? window.nanoIcons.ic(name, cls) : '');
    list.innerHTML = entries.map((e) => {
        const cls = e.status === 'pending' ? (e.dueDate && e.dueDate < localToday() ? 'overdue' : 'today') : 'note';
        const isPending = e.status === 'pending';
        return `<div class="entry-item ${isPending ? cls : 'note'}">
            <div class="entry-title">${esc(e.title || e.content)}</div>
            <div class="entry-meta">
                ${e.dueDate ? `<span class="due">${ic('calendar', 'inline')}截止 ${esc(e.dueDate)}</span>` : ''}
                <span>${esc(formatTime(e.created))}</span>
                ${e.category ? `<span class="cat">${esc(e.category)}</span>` : ''}
            </div>
            <div class="entry-actions">
                <button class="done-btn" type="button" data-action="${isPending ? 'done' : 'restore'}" data-id="${e.id}">${ic(isPending ? 'check' : 'restore', 'inline')}${isPending ? '完成' : '恢复'}</button>
                <button type="button" data-action="delete" data-id="${e.id}">${ic('trash', 'inline')}删除</button>
            </div>
        </div>`;
    }).join('');
}

function markDone(id, done) {
    // 找到对应的卡片元素，先做完成动效再刷新
    const card = document.querySelector(`.entry-item[data-id="${id}"]`);
    if (card) {
        card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.96) translateX(8px)';
    }
    api.markDone(id, done);
    setTimeout(loadData, 280); // 等动效播完再刷新
}

// 改期（内联编辑）：点「改期」→ 展开日历弹层 → 选择日期 → 确定
let dueEditRow = null;
let dueEditPicker = null;
let dueEditNewValue = undefined; // undefined=未改动; null=清除; 'yyyy-mm-dd'=新日期

function toggleDueEdit(id) {
    const entry = allEntries.find((e) => e.id === id);
    if (!entry) return;
    if (dueEditRow) removeDueEdit();
    const card = document.querySelector(`.entry-item[data-id="${id}"]`);
    if (!card) return;

    const row = document.createElement('div');
    row.className = 'due-edit-row';
    const mount = document.createElement('span');
    mount.className = 'nsdp-mount';
    row.appendChild(mount);
    const saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.textContent = '确定';
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.textContent = '取消';
    cancelBtn.addEventListener('click', () => { removeDueEdit(); });
    row.appendChild(saveBtn);
    row.appendChild(cancelBtn);
    card.appendChild(row);
    dueEditRow = row;
    dueEditNewValue = undefined;

    if (window.NSDatePicker) {
        dueEditPicker = window.NSDatePicker.attach({
            mount,
            id: 'hp-re-due-' + id,
            ariaLabel: '新的截止日期',
            placeholder: entry.dueDate ? '当前：' + (NSDatePicker.fullDate ? NSDatePicker.fullDate(entry.dueDate) : entry.dueDate) : '选择日期',
            clearable: true,
            value: entry.dueDate || null,
            autoOpen: true,
            onChange(iso) {
                dueEditNewValue = iso;
            },
        });
        saveBtn.addEventListener('click', () => {
            const val = dueEditNewValue !== undefined ? dueEditNewValue : (entry.dueDate || null);
            api.updateDueDate(id, val);
            removeDueEdit();
            setTimeout(loadData, 200);
        });
    } else {
        // 兜底：退化为原生 date 输入
        const input = document.createElement('input');
        input.type = 'date';
        input.value = entry.dueDate || '';
        input.style.cssText = 'flex:1;min-width:0;background:var(--surface-field);color:var(--text-primary);border:1px solid var(--border-soft);border-radius:var(--radius-field);padding:5px 8px;font-size:var(--text-meta);color-scheme:dark;';
        mount.appendChild(input);
        saveBtn.addEventListener('click', () => {
            api.updateDueDate(id, input.value || null);
            removeDueEdit();
            setTimeout(loadData, 200);
        });
        input.focus();
    }
}

function removeDueEdit() {
    if (dueEditPicker) { dueEditPicker.destroy(); dueEditPicker = null; }
    if (dueEditRow) { dueEditRow.remove(); dueEditRow = null; }
    dueEditNewValue = undefined;
}
function delEntry(id) {
    const card = document.querySelector(`.entry-item[data-id="${id}"]`);
    if (!card || card.querySelector('.confirm-bar')) return;
    const bar = document.createElement('div');
    bar.className = 'confirm-bar';
    bar.innerHTML = '<span>确认删除？</span><span class="confirm-btns"><button type="button" data-confirm="yes">删除</button><button type="button" class="confirm-no" data-confirm="no">取消</button></span>';
    bar.querySelector('[data-confirm="yes"]').addEventListener('click', () => {
        api.deleteEntry(id);
        bar.remove();
        setTimeout(loadData, 150);
    });
    bar.querySelector('[data-confirm="no"]').addEventListener('click', () => bar.remove());
    card.appendChild(bar);
    bar.querySelector('[data-confirm="yes"]').focus();
}

function esc(str) {
    return String(str || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function formatTime(iso) {
    const d = new Date(iso), now = new Date();
    const diff = now - d;
    if (diff < 60000) return '刚刚';
    if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
    if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
    if (diff < 7 * 86400000) return Math.floor(diff / 86400000) + '天前';
    // 本地化日期（中文环境为 2026/8/28 形式）
    return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' });
}

// IPC 回调
api.onRecentEntries((entries) => { renderRecent(entries || []); });
api.onEntries((entries) => { allEntries = entries || []; renderTodos(); });
api.onAiRefined(() => setTimeout(loadData, 400));
api.onSaveSuccess(() => {});
api.onEntryUpdated(() => setTimeout(loadData, 150));
// 任意窗口数据变更 → 刷新
api.onEntriesChanged((entries) => {
    allEntries = entries || [];
    renderTodos();
    api.getRecentEntries();
});

// 对话
function sendChat() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;
    chatHistory.push({ role: 'user', content: text });
    appendChat('user', text);
    input.value = '';
    const aiStatus = document.getElementById('ai-status');
    aiStatus.textContent = '思考中…';
    api.sendChat(chatHistory);
}
api.onChatReply((reply) => {
    chatHistory.push({ role: 'assistant', content: reply });
    appendChat('ai', reply);
    document.getElementById('ai-status').textContent = '在线';
});
function appendChat(role, content) {
    const box = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-msg ' + role;
    div.textContent = content;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}
document.getElementById('chat-send').addEventListener('click', sendChat);
document.getElementById('chat-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') sendChat(); });

// AI 状态
api.getAiStatus();
api.onAiStatus((status) => {
    const el = document.getElementById('ai-status');
    if (status.available) {
        el.textContent = 'AI 在线 · ' + status.model;
        el.className = 'ai-status online';
    } else {
        el.textContent = 'AI 离线（Ollama 未启动）';
        el.className = 'ai-status offline';
    }
});

// 底部按钮
document.getElementById('history-button').addEventListener('click', () => api.openHistory());
document.getElementById('settings-button').addEventListener('click', openSettings);
document.getElementById('close-button').addEventListener('click', () => api.closeHomepage());

// ---- 设置面板 ----
let settingsData = null; // 从 ai-status 获取的配置数据
let settingsTrigger = null; // 打开设置前的焦点锚点（关闭后归还焦点）

function openSettings() {
    const overlay = document.getElementById('settings-overlay');
    overlay.classList.add('show');
    settingsTrigger = document.getElementById('settings-button');
    // 焦点圈定：进入面板第一个可聚焦元素
    const first = overlay.querySelector('select, input, button, [tabindex]');
    if (first) first.focus();
    api.getAiStatus(); // 刷新后填充面板
}

api.onAiStatus((status) => {
    settingsData = status;
    // 模型下拉框
    const select = document.getElementById('set-model');
    const models = status.models && status.models.length ? status.models : [];
    select.innerHTML = '';
    if (models.length) {
        models.forEach((m) => {
            const opt = document.createElement('option');
            opt.value = m;
            opt.textContent = m;
            if (m === status.model) opt.selected = true;
            select.appendChild(opt);
        });
        document.getElementById('set-model-desc').textContent = status.available ? 'Ollama 在线' : 'Ollama 离线';
    } else {
        const opt = document.createElement('option');
        opt.value = status.model || 'qwen2.5:3b';
        opt.textContent = (status.model || 'qwen2.5:3b') + '（未检测到，将用此默认值）';
        select.appendChild(opt);
        document.getElementById('set-model-desc').textContent = '未检测到本地模型，请确认 Ollama 已启动';
    }
    // 提醒提前量
    document.getElementById('set-lead').value = status.remindLeadHours || 24;
    // AI 开关（role="switch"，状态与配置同步）
    const sw = document.getElementById('set-ai-switch');
    const on = status.enabled !== false;
    sw.classList.toggle('on', on);
    sw.setAttribute('aria-checked', String(on));
});

// 设置面板：焦点圈定 + Esc 关闭（role="dialog"）
const settingsOverlay = document.getElementById('settings-overlay');
const settingsPanel = document.getElementById('settings-panel');
function closeSettings() {
    settingsOverlay.classList.remove('show');
    if (settingsTrigger) { settingsTrigger.focus(); settingsTrigger = null; }
}
settingsOverlay.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeSettings(); return; }
    if (e.key !== 'Tab') return;
    // 焦点圈定在面板内
    const focusables = settingsPanel.querySelectorAll('select, input, button');
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

// AI 开关点击（role="switch"）
document.getElementById('set-ai-switch').addEventListener('click', () => {
    const sw = document.getElementById('set-ai-switch');
    const on = !sw.classList.contains('on');
    sw.classList.toggle('on', on);
    sw.setAttribute('aria-checked', String(on));
});
document.getElementById('set-ai-switch').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        document.getElementById('set-ai-switch').click();
    }
});

// 保存设置
document.getElementById('set-save').addEventListener('click', () => {
    const model = document.getElementById('set-model').value;
    const lead = parseInt(document.getElementById('set-lead').value, 10) || 24;
    const aiOn = document.getElementById('set-ai-switch').classList.contains('on');
    api.saveConfig({
        model,
        remindLeadHours: lead,
        aiEnabled: aiOn,
    });
    api.onConfigSaved(() => {
        closeSettings();
    });
});

// 取消
document.getElementById('set-cancel').addEventListener('click', closeSettings);
// 点击遮罩关闭
settingsOverlay.addEventListener('click', (e) => {
    if (e.target.id === 'settings-overlay') closeSettings();
});

// 窗口拖拽（顶部区域，Pointer Events + 指针捕获）
const header = document.querySelector('.header');
let isDrag = false, dragSX = 0, dragSY = 0;
header.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    isDrag = true;
    dragSX = e.screenX;
    dragSY = e.screenY;
    try { header.setPointerCapture(e.pointerId); } catch (_) {}
    api.dragHomepageStart();
});
header.addEventListener('pointermove', (e) => {
    if (!isDrag) return;
    api.dragHomepageMove(e.screenX - dragSX, e.screenY - dragSY);
});
const endHomeDrag = (e) => {
    if (!isDrag) return;
    isDrag = false;
    try { header.releasePointerCapture(e.pointerId); } catch (_) {}
    api.dragHomepageEnd();
};
header.addEventListener('pointerup', endHomeDrag);
header.addEventListener('pointercancel', endHomeDrag);

// Esc 收起
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('settings-overlay');
        if (overlay.classList.contains('show')) closeSettings();
        else api.closeHomepage();
    }
});

loadData();
