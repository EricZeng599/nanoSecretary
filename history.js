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

/** 本地时区的「今天」yyyy-mm-dd（civil date，不用 toISOString 避免 UTC 差一天）。 */
function localToday() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function renderEntries() {
    // 若改期行打开则先清理（列表即将重绘，DOM 会失效）
    if (dueEditRow) removeDueEdit();
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
    const today = localToday();
    const ic = (name, cls) => (window.nanoIcons ? window.nanoIcons.ic(name, cls) : '');
    list.innerHTML = filtered.map((e) => {
        const overdue = e.status === 'pending' && e.dueDate && e.dueDate < today;
        const todayDue = e.status === 'pending' && e.dueDate === today;
        const cls = e.status === 'done' ? 'done' : overdue ? 'overdue' : todayDue ? 'today' : e.dueDate ? '' : 'note';
        const dueText = e.dueDate
            ? (overdue ? '已逾期 ' + e.dueDate : todayDue ? '今天截止' : '截止 ' + e.dueDate)
            : '';
        const doneBtn = e.status === 'pending'
            ? '<button class="action-button done" type="button" data-action="done" data-id="' + e.id + '">' + ic('check', 'inline') + '完成</button>'
            : e.status === 'done'
                ? '<button class="action-button" type="button" data-action="restore" data-id="' + e.id + '">' + ic('restore', 'inline') + '恢复</button>'
                : '';
        const promoteBtn = e.status === 'note'
            ? '<button class="action-button promote" type="button" data-action="topending" data-id="' + e.id + '">' + ic('pin', 'inline') + '转为待办</button>'
            : '';
        return `<div class="entry-card ${cls}" data-id="${e.id}">
            <div class="entry-title">${esc(e.title || '(无标题)')}</div>
            <div class="entry-content">${esc(e.content)}</div>
            <div class="entry-meta">
                ${dueText ? `<span class="due ${overdue ? 'overdue' : ''}">${ic('clock', 'inline')}${esc(dueText)}</span>` : ''}
                ${e.priority === '高' ? '<span class="priority-high">' + ic('fire', 'inline') + '高</span>' : e.priority === '中' ? '<span>中</span>' : ''}
                ${e.category ? `<span class="cat">${esc(e.category)}</span>` : ''}
                ${(e.tags || []).map((t) => `<span class="tag">${ic('tag', 'inline')}#${esc(t)}</span>`).join('')}
                <span>${esc(formatTime(e.created))}</span>
                ${e.status === 'pending' ? '<span style="color:#ff8c42">待办</span>' : e.status === 'done' ? '<span style="color:#4caf50">已完成</span>' : '<span>备忘</span>'}
            </div>
            <div class="entry-actions">
                ${doneBtn}
                ${promoteBtn}
                <button class="action-button due-edit" type="button" data-action="reschedule" data-id="${e.id}">${ic('edit', 'inline')}改期</button>
                <button class="action-button" type="button" data-action="copy" data-id="${e.id}">${ic('copy', 'inline')}复制</button>
                <button class="action-button delete" type="button" data-action="delete" data-id="${e.id}">${ic('trash', 'inline')}删除</button>
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
    else if (btn.dataset.action === 'topending') makePending(id);
    else if (btn.dataset.action === 'copy') copyContent(id);
    else if (btn.dataset.action === 'delete') deleteEntry(id);
});

// 改期（内联编辑）：点「改期」→ 展开日历弹层 → 选择日期 → 确定
let dueEditRow = null;
let dueEditPicker = null;
let dueEditNewValue = undefined; // undefined=未改动; null=清除; 'yyyy-mm-dd'=新日期

function toggleDueEdit(id) {
    const entry = allEntries.find((e) => e.id === id);
    if (!entry) return;
    if (dueEditRow) removeDueEdit();
    const card = document.querySelector(`.entry-card[data-id="${id}"]`);
    if (!card) return;

    const row = document.createElement('div');
    row.className = 'due-edit-row';
    // 挂载点：NSDatePicker.attach 会在这里生成触发字段
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

    // 有日历本体：NSDatePicker.attach 生成字段并自动展开弹层
    if (window.NSDatePicker) {
        dueEditPicker = window.NSDatePicker.attach({
            mount,
            id: 're-due-' + id,
            ariaLabel: '新的截止日期',
            placeholder: entry.dueDate ? '当前：' + (NSDatePicker.fullDate ? NSDatePicker.fullDate(entry.dueDate) : entry.dueDate) : '选择日期',
            clearable: true,
            value: entry.dueDate || null,
            autoOpen: true,
            onChange(iso) {
                dueEditNewValue = iso; // 点选即暂存，等待「确定」（iso 可为 null=清除）
            },
        });
        saveBtn.addEventListener('click', () => {
            const val = dueEditNewValue !== undefined ? dueEditNewValue : (entry.dueDate || null);
            api.updateDueDate(id, val);
            removeDueEdit();
            setTimeout(loadEntries, 200);
        });
    } else {
        // 兜底：无日历本体时退化为原生 date 输入（理论不会出现）
        const input = document.createElement('input');
        input.type = 'date';
        input.value = entry.dueDate || '';
        input.style.cssText = 'flex:1;min-width:0;background:var(--surface-field);color:var(--text-primary);border:1px solid var(--border-soft);border-radius:var(--radius-field);padding:5px 8px;font-size:var(--text-meta);color-scheme:dark;';
        mount.appendChild(input);
        saveBtn.addEventListener('click', () => {
            api.updateDueDate(id, input.value || null);
            removeDueEdit();
            setTimeout(loadEntries, 200);
        });
        input.focus();
    }
}

function removeDueEdit() {
    if (dueEditPicker) { dueEditPicker.destroy(); dueEditPicker = null; }
    if (dueEditRow) { dueEditRow.remove(); dueEditRow = null; }
    dueEditNewValue = undefined;
}

function markDone(id, done) { api.markDone(id, done); setTimeout(loadEntries, 200); }
function makePending(id) { api.makePending(id); setTimeout(loadEntries, 200); }
function copyContent(id) {
    const entry = allEntries.find((e) => e.id === id);
    if (!entry) return;
    navigator.clipboard.writeText(entry.content || entry.title || '').then(() => {
        showToast('已复制到剪贴板');
    });
}
function deleteEntry(id) {
    const card = document.querySelector(`.entry-card[data-id="${id}"]`);
    if (!card || card.querySelector('.confirm-bar')) return;
    const bar = document.createElement('div');
    bar.className = 'confirm-bar';
    bar.innerHTML = '<span>确认删除？</span><span class="confirm-btns"><button type="button" data-confirm="yes">删除</button><button type="button" class="confirm-no" data-confirm="no">取消</button></span>';
    bar.querySelector('[data-confirm="yes"]').addEventListener('click', () => {
        api.deleteEntry(id);
        bar.remove();
        setTimeout(loadEntries, 200);
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
