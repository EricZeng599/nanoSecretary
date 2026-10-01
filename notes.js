/**
 * notes.js — 小便签（像素打印终端主题：白底黑框 / 暗色黑底白框）
 * 每张便签 = 一条 note 记录（sticky:true），经主进程读写 data.json。
 * 自动保存（输入防抖）；关闭 = 收起（主进程 hide），数据保留。
 * 视觉全部由 notes.html 的 <style> + tokens.css 承担，本文件不含任何样式。
 */
const titleInput = document.getElementById('note-title');
const bodyInput = document.getElementById('note-body');
const saveState = document.getElementById('save-state');
const charCount = document.getElementById('char-count');
const noteDate = document.getElementById('note-date');
const pinBtn = document.getElementById('pin-btn');
const closeBtn = document.getElementById('close-btn');
// 「选入已有任务」浮层——引用统一放这里，mountIcons() 在下面就要用到 pickBtn
const pickBtn = document.getElementById('pick-btn');
const pickPanel = document.getElementById('pick-panel');
const pickFilter = document.getElementById('pick-filter');
const pickList = document.getElementById('pick-list');

let noteId = null; // 主进程分配
let lastSaved = 0;
let saveTimer = null;

// 图标
function mountIcons() {
    if (!window.nanoIcons) return;
    pinBtn.innerHTML = window.nanoIcons.ic('pin');
    closeBtn.innerHTML = window.nanoIcons.ic('close');
    pickBtn.innerHTML = window.nanoIcons.ic('todo');
}
mountIcons();

// 时间戳
function nowLabel() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
noteDate.textContent = nowLabel();

function setSaveState(text) {
    saveState.textContent = text || '';
}
function updateCharCount() {
    charCount.textContent = bodyInput.value.length ? bodyInput.value.length + ' 字' : '';
}

// 保存（去抖）
function scheduleSave() {
    clearTimeout(saveTimer);
    setSaveState('编辑中…');
    saveTimer = setTimeout(saveNow, 400);
}
// 空/不空交给主进程判定：全空的便签不该在历史里留下记录。
// 标题的兜底（取正文前 30 字）也在主进程，这边只报原始值。
function saveNow() {
    api.saveNote({
        id: noteId,
        title: titleInput.value.trim(),
        content: bodyInput.value.trim(),
    });
    lastSaved = Date.now();
}
titleInput.addEventListener('input', scheduleSave);
bodyInput.addEventListener('input', scheduleSave);

// 字符数
bodyInput.addEventListener('input', updateCharCount);

// IPC 响应
api.onNoteLoaded((data) => {
    if (!data) return;
    noteId = data.id;
    titleInput.value = data.title || '';
    bodyInput.value = data.content || '';
    updateCharCount();
    setSaveState('');
});
api.onNoteSaved((data) => {
    if (!data) return;
    if (data.empty) { setSaveState(''); return; } // 空便签不落库，id 保持 draft 不动
    if (data.id) noteId = data.id;
    // 首次落库才带时间戳，之后只显示「已保存」
    setSaveState(data.created && lastSaved
        ? '已保存 ' + new Date(lastSaved).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
        : '已保存');
});

// 置顶切换
let pinned = false;
pinBtn.addEventListener('click', () => {
    pinned = !pinned;
    pinBtn.classList.toggle('on', pinned);
    pinBtn.setAttribute('aria-pressed', String(pinned));
    api.setNotePinned(noteId, pinned);
});
pinBtn.setAttribute('role', 'button');
pinBtn.setAttribute('aria-pressed', 'false');

// ---- 选入已有任务 ----
// 数据源直接用现成的 get-entries / entries-changed（主进程广播给所有窗口），不需要新 IPC。
// DOM 引用见文件顶部。
let allEntries = []; // 全量记录缓存
let pickOpen = false;
let pickItems = [];  // 当前过滤后的待办
let pickActive = -1; // 高亮项下标
let insertPos = 0;   // 勾选条目插入点：顶部按钮=正文末尾；正文 / =光标处

function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/** 可被选入的条目 = 未完成的真待办（便签不是待办，见 main.js 的 isTodo） */
function pickableTodos() {
    return allEntries
        .filter((e) => e.status === 'pending' && e.sticky !== true)
        .sort((a, b) => {
            const ka = a.dueDate || '9999-99-99'; // 无日期的排最后
            const kb = b.dueDate || '9999-99-99';
            if (ka !== kb) return ka < kb ? -1 : 1;
            return String(a.time || '') < String(b.time || '') ? -1 : 1;
        });
}

/** 右侧那列弱色日期：`9/16 19:00`；无日期返回空串 */
function dueLabel(e) {
    if (!e.dueDate) return '';
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(e.dueDate);
    const day = m ? `${+m[2]}/${+m[3]}` : e.dueDate;
    return e.time ? `${day} ${e.time}` : day;
}

/** 正文里代表「已勾选该待办」的那一行：`- [ ] 标题（9/16 19:00）`，无日期省略括号 */
function lineFor(e) {
    const label = dueLabel(e);
    return '- [ ] ' + (e.title || e.content || '未命名') + (label ? `（${label}）` : '');
}
/** 该行是否就是这个待办的条目（`- [ ]` / `- [x]` 都认，日期尾巴需一致） */
function lineMatches(line, e) {
    const t = String(line || '').trim();
    if (!/^- \[[ xX]\] /.test(t)) return false;
    const rest = t.slice(6); // 去掉 "- [ ] " 六字符
    return rest === (e.title || e.content || '未命名') + (dueLabel(e) ? `（${dueLabel(e)}）` : '');
}
/** 这条待办当前是否已勾在正文里 */
function isPicked(e) {
    return bodyInput.value.split('\n').some((l) => lineMatches(l, e));
}
/** 在 body 的 pos 处插入一行，保证它独占一行（pos 不在行首先补换行） */
function insertLineAt(body, line, pos) {
    const before = body.slice(0, pos);
    const after = body.slice(pos);
    const prefix = (pos === 0 || before.endsWith('\n')) ? '' : '\n';
    const suffix = (pos >= body.length || after.startsWith('\n')) ? '' : '\n';
    return before + prefix + line + suffix + after;
}

function renderPickList() {
    const q = pickFilter.value.trim().toLowerCase();
    pickItems = pickableTodos().filter((e) => {
        if (!q) return true;
        const hay = [e.title, e.content, e.category].concat(e.tags || []).join(' ').toLowerCase();
        return hay.includes(q);
    });
    // 高亮只在越界时回卷，勾选一条后别把焦点跳回首项
    if (pickActive < 0 || pickActive >= pickItems.length) pickActive = pickItems.length ? 0 : -1;

    if (!pickItems.length) {
        pickList.innerHTML = `<div class="pick-empty">${q ? '没有匹配的任务' : '还没有未完成的任务'}</div>`;
        pickFilter.removeAttribute('aria-activedescendant');
        return;
    }
    pickList.innerHTML = pickItems.map((e, i) => {
        const d = dueLabel(e);
        const checked = isPicked(e); // 勾选态 = 正文里已有这一行
        return `<div class="pick-item" role="option" id="pick-opt-${i}" data-i="${i}" data-active="false" data-checked="${checked}" aria-selected="${checked}">`
            + `<span class="box">${window.nanoIcons ? window.nanoIcons.ic('check') : ''}</span>`
            + `<span class="t">${esc(e.title || e.content || '未命名')}</span>`
            + (d ? `<span class="d">${esc(d)}</span>` : '')
            + '</div>';
    }).join('');
    syncPickActive();
}

function syncPickActive() {
    pickList.querySelectorAll('.pick-item').forEach((el) => {
        const on = +el.dataset.i === pickActive;
        el.dataset.active = String(on); // 有多选时 aria-selected 已被勾选态占用，高亮只靠 active-descendant + data-active
        if (on) el.scrollIntoView({ block: 'nearest' });
    });
    const cur = pickList.querySelector(`.pick-item[data-i="${pickActive}"]`);
    if (cur) pickFilter.setAttribute('aria-activedescendant', cur.id);
}

function movePick(delta) {
    if (!pickItems.length) return;
    pickActive = (pickActive + delta + pickItems.length) % pickItems.length;
    syncPickActive();
}

/** 勾选/取消勾选一条待办：在正文里加/删那一行勾选条目。多选——浮层不关。 */
function toggleTask(e) {
    const lines = bodyInput.value.split('\n');
    const idx = lines.findIndex((l) => lineMatches(l, e));
    if (idx !== -1) {
        lines.splice(idx, 1); // 取消勾选 = 删掉那一行
        bodyInput.value = lines.join('\n');
    } else {
        const next = insertLineAt(bodyInput.value, lineFor(e), insertPos);
        // 插入点跟着往后挪：连勾多条时按勾选先后排，而不是次次插在同一处、把后勾的顶到前面
        insertPos += next.length - bodyInput.value.length;
        bodyInput.value = next;
    }
    updateCharCount();
    scheduleSave();
    renderPickList(); // 勾选态即时刷新；浮层保持打开，可继续勾下一条
}

function openPicker(atPos) {
    insertPos = (typeof atPos === 'number') ? atPos : bodyInput.value.length;
    pickOpen = true;
    pickPanel.hidden = false;
    pickBtn.setAttribute('aria-expanded', 'true');
    pickFilter.value = '';
    renderPickList();
    pickFilter.focus();
}

function closePicker(refocus) {
    if (!pickOpen) return;
    pickOpen = false;
    pickPanel.hidden = true;
    pickBtn.setAttribute('aria-expanded', 'false');
    pickFilter.removeAttribute('aria-activedescendant');
    pickActive = -1;
    pickItems = [];
    // 焦点还回正文末尾，接着写
    if (refocus) {
        bodyInput.focus();
        bodyInput.setSelectionRange(bodyInput.value.length, bodyInput.value.length);
    }
}

pickBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // 别让下面的 document 关掉刚打开的浮层
    if (pickOpen) closePicker(true); else openPicker(bodyInput.value.length);
});

// 点浮层以外的地方（拖拽条等）关闭
document.addEventListener('click', (e) => {
    if (!pickOpen) return;
    if (pickPanel.contains(e.target) || pickBtn.contains(e.target)) return;
    closePicker(false);
});

pickList.addEventListener('click', (e) => {
    const el = e.target.closest('.pick-item');
    if (!el) return;
    // 必须在 toggleTask 之前截住：它会重渲染列表，被点的这一项随即脱离文档，
    // 等事件冒到 document 时 pickPanel.contains(target) 已是 false，
    // 下面那个「点外面关闭」会把刚勾完的浮层一并关掉。
    e.stopPropagation();
    const item = pickItems[+el.dataset.i];
    if (item) toggleTask(item);
});

// 正文里打 `/`（行首）唤出下拉；吞掉这个 /，不落进正文
bodyInput.addEventListener('keydown', (e) => {
    if (e.key !== '/') return;
    const pos = bodyInput.selectionStart;
    const before = bodyInput.value.slice(0, pos);
    if (before && before[before.length - 1] !== '\n') return; // 只有行首的 / 才触发
    e.preventDefault();
    openPicker(pos);
});

pickFilter.addEventListener('input', renderPickList);
pickFilter.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); movePick(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); movePick(-1); }
    else if (e.key === 'Enter') {
        e.preventDefault();
        if (pickActive >= 0 && pickItems[pickActive]) toggleTask(pickItems[pickActive]); // 勾一下，不收浮层
    }
    // Esc 不在这里处理：留给下面的分层 Esc，关浮层而不关便签
});

api.onEntries((entries) => {
    allEntries = entries || [];
    if (pickOpen) renderPickList();
});
api.onEntriesChanged((entries) => {
    allEntries = entries || [];
    if (pickOpen) renderPickList();
});
api.getEntries();

// 关闭（收起）
closeBtn.addEventListener('click', () => {
    clearTimeout(saveTimer);
    saveNow(); // 立即保存再收
    api.closeNote();
});

// Esc：分层——先关浮层，再关便签（否则浮层开着时一按 Esc 整张便签就没了）
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (pickOpen) { closePicker(true); return; }
    clearTimeout(saveTimer);
    saveNow();
    api.closeNote();
});

// 窗口内自由拖拽（主进程驱动，标题区已 -webkit-app-region: drag，
// 但输入框/按钮需要 no-drag 已在 CSS 处理；整窗拖拽用 pointer 事件兜底非 drag 区域）
