/**
 * history.js — 历史记录页（nanoSecretary）
 * 通过全局标识符 api 访问（contextBridge 注入）；不要用 const api = window.api 重复声明。
 */
let allEntries = [];
const filters = { status: 'all', category: 'all', tag: 'all' };

function loadEntries() { api.getEntries(); }

api.onEntries((entries) => {
    allEntries = (entries || []).sort((a, b) => new Date(b.created) - new Date(a.created));
    renderChips();
    renderEntries();
});

// 渲染筛选 chips
function renderChips() {
    // 分类
    const catGroup = document.getElementById('category-group');
    const cats = Array.from(new Set(allEntries.map((e) => e.category).filter(Boolean)));
    catGroup.innerHTML = '<span class="label">分类</span><button class="chip active" type="button" data-filter="category" data-value="all">全部</button>';
    cats.forEach((c) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chip' + (filters.category === c ? ' active' : '');
        btn.dataset.filter = 'category'; btn.dataset.value = c;
        btn.textContent = c;
        catGroup.appendChild(btn);
    });
    // 标签
    const tagGroup = document.getElementById('tag-group');
    const tags = Array.from(new Set(allEntries.flatMap((e) => e.tags || []))).slice(0, 15);
    tagGroup.innerHTML = '<span class="label">标签</span><button class="chip active" type="button" data-filter="tag" data-value="all">全部</button>';
    tags.forEach((t) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chip' + (filters.tag === t ? ' active' : '');
        btn.dataset.filter = 'tag'; btn.dataset.value = t;
        btn.textContent = '#' + t;
        tagGroup.appendChild(btn);
    });

    // 恢复所有 chip 的激活态（含静态的"全部/待办/已完成"）
    document.querySelectorAll('.chip').forEach((chip) => {
        const f = chip.dataset.filter;
        const v = chip.dataset.value;
        chip.classList.toggle('active', filters[f] === v);
    });
}

// 事件委托：在 filter-row 上绑定一次，动态/静态 chips 都生效
document.querySelector('.filter-row').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    const f = chip.dataset.filter;
    const v = chip.dataset.value;
    filters[f] = v;
    document.querySelectorAll(`.chip[data-filter="${f}"]`).forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    renderEntries();
});

function renderEntries() {
    const list = document.getElementById('entries-list');
    let filtered = allEntries;
    if (filters.status === 'pending') filtered = filtered.filter((e) => e.status === 'pending');
    if (filters.status === 'done') filtered = filtered.filter((e) => e.status === 'done');
    if (filters.category !== 'all') filtered = filtered.filter((e) => e.category === filters.category);
    if (filters.tag !== 'all') filtered = filtered.filter((e) => (e.tags || []).includes(filters.tag));

    document.getElementById('count-line').textContent = `共 ${filtered.length} 条记录`;

    if (!filtered.length) {
        list.innerHTML = '<div class="empty-state">暂无记录</div>';
        return;
    }
    const today = new Date().toISOString().slice(0, 10);
    list.innerHTML = filtered.map((e) => {
        const overdue = e.status === 'pending' && e.dueDate && e.dueDate < today;
        const todayDue = e.status === 'pending' && e.dueDate === today;
        const cls = e.status === 'done' ? 'done' : overdue ? 'overdue' : todayDue ? 'today' : e.dueDate ? '' : 'note';
        const dueText = e.dueDate
            ? (overdue ? '已逾期 ' + e.dueDate : todayDue ? '今天截止' : '截止 ' + e.dueDate)
            : '';
        const doneBtn = e.status === 'pending'
            ? '<button class="action-button done" type="button" data-action="done" data-id="' + e.id + '">✓ 完成</button>'
            : e.status === 'done'
                ? '<button class="action-button" type="button" data-action="restore" data-id="' + e.id + '">↩ 恢复</button>'
                : '';
        return `<div class="entry-card ${cls}" data-id="${e.id}">
            <div class="entry-title">${esc(e.title || '(无标题)')}</div>
            <div class="entry-content">${esc(e.content)}</div>
            <div class="entry-meta">
                ${dueText ? `<span class="due ${overdue ? 'overdue' : ''}">⏰ ${esc(dueText)}</span>` : ''}
                ${e.priority === '高' ? '<span class="priority-high">🔥 高</span>' : e.priority === '中' ? '<span>中</span>' : ''}
                ${e.category ? `<span class="cat">${esc(e.category)}</span>` : ''}
                ${(e.tags || []).map((t) => `<span class="tag">#${esc(t)}</span>`).join('')}
                <span>${esc(formatTime(e.created))}</span>
                ${e.status === 'pending' ? '<span style="color:#ff8c42">待办</span>' : e.status === 'done' ? '<span style="color:#4caf50">已完成</span>' : '<span>备忘</span>'}
            </div>
            <div class="entry-actions">
                ${doneBtn}
                <button class="action-button due-edit" type="button" data-action="reschedule" data-id="${e.id}">改期</button>
                <button class="action-button" type="button" data-action="copy" data-id="${e.id}">复制</button>
                <button class="action-button delete" type="button" data-action="delete" data-id="${e.id}">删除</button>
            </div>
        </div>`;
    }).join('');
}

// ---- 列表操作事件委托（替代内联 onclick，兼容 CSP 无内联脚本）----
document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = btn.dataset.id;
    if (btn.dataset.action === 'done') markDone(id, true);
    else if (btn.dataset.action === 'restore') markDone(id, false);
    else if (btn.dataset.action === 'reschedule') toggleDueEdit(id);
    else if (btn.dataset.action === 'copy') copyContent(id);
    else if (btn.dataset.action === 'delete') deleteEntry(id);
});

// 改期（内联编辑）
let dueEditRow = null;
function toggleDueEdit(id) {
    const entry = allEntries.find((e) => e.id === id);
    if (!entry) return;
    if (dueEditRow) dueEditRow.remove();
    const card = document.querySelector(`.entry-card[data-id="${id}"]`);
    if (!card) return;
    const row = document.createElement('div');
    row.className = 'due-edit-row';
    const input = document.createElement('input');
    input.type = 'date';
    input.value = entry.dueDate || '';
    const saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.textContent = '确定';
    saveBtn.addEventListener('click', () => {
        api.updateDueDate(id, input.value || null);
        dueEditRow = null;
        setTimeout(loadEntries, 200);
    });
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.textContent = '取消';
    cancelBtn.addEventListener('click', () => { row.remove(); dueEditRow = null; });
    row.appendChild(input); row.appendChild(saveBtn); row.appendChild(cancelBtn);
    card.appendChild(row);
    dueEditRow = row;
    input.focus();
}

function markDone(id, done) { api.markDone(id, done); setTimeout(loadEntries, 200); }
function copyContent(id) {
    const entry = allEntries.find((e) => e.id === id);
    if (!entry) return;
    navigator.clipboard.writeText(entry.content || entry.title || '').then(() => {
        showToast('已复制到剪贴板');
    });
}
function deleteEntry(id) {
    if (confirm('确定删除这条记录？')) { api.deleteEntry(id); setTimeout(loadEntries, 200); }
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
    return d.toLocaleDateString();
}

// 轻量 toast
function showToast(msg) {
    let t = document.getElementById('toast');
    if (!t) {
        t = document.createElement('div');
        t.id = 'toast';
        t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:rgba(40,40,48,0.95);color:white;padding:8px 18px;border-radius:8px;font-size: 0.8125rem;z-index:999;transition:opacity 0.3s;';
        document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1';
    clearTimeout(t._timer);
    t._timer = setTimeout(() => { t.style.opacity = '0'; }, 1600);
}

api.onEntryUpdated(() => setTimeout(loadEntries, 200));
api.onDeleteSuccess(() => setTimeout(loadEntries, 200));
// 任意窗口数据变更 → 刷新
api.onEntriesChanged((entries) => {
    allEntries = (entries || []).sort((a, b) => new Date(b.created) - new Date(a.created));
    renderChips();
    renderEntries();
});

loadEntries();
