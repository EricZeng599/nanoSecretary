/**
 * notes.js — 小便签（纯单色暖黑）
 * 每张便签 = 一条 note 记录（sticky:true），经主进程读写 data.json。
 * 自动保存（输入防抖）；关闭 = 收起（主进程 hide），数据保留。
 */
const titleInput = document.getElementById('note-title');
const bodyInput = document.getElementById('note-body');
const saveState = document.getElementById('save-state');
const charCount = document.getElementById('char-count');
const noteDate = document.getElementById('note-date');
const pinBtn = document.getElementById('pin-btn');
const closeBtn = document.getElementById('close-btn');

let noteId = null; // 主进程分配
let lastSaved = 0;
let saveTimer = null;

// 图标
function mountIcons() {
    if (!window.nanoIcons) return;
    pinBtn.innerHTML = window.nanoIcons.ic('pin');
    closeBtn.innerHTML = window.nanoIcons.ic('close');
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

// 保存（去抖）
function scheduleSave() {
    clearTimeout(saveTimer);
    setSaveState('编辑中…');
    saveTimer = setTimeout(saveNow, 400);
}
function saveNow() {
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();
    if (!title && !body) { setSaveState(''); return; }
    api.saveNote({
        id: noteId,
        title: title || body.slice(0, 30) || '便签',
        content: body,
    });
    lastSaved = Date.now();
    noteId = noteId || 'pending'; // 实际 id 由主进程回填
}
titleInput.addEventListener('input', scheduleSave);
bodyInput.addEventListener('input', scheduleSave);

// 字符数
bodyInput.addEventListener('input', () => {
    charCount.textContent = bodyInput.value.length ? bodyInput.value.length + ' 字' : '';
});

// IPC 响应
api.onNoteLoaded((data) => {
    if (!data) return;
    noteId = data.id;
    titleInput.value = data.title || '';
    bodyInput.value = data.content || '';
    charCount.textContent = bodyInput.value.length ? bodyInput.value.length + ' 字' : '';
    setSaveState('');
});
api.onNoteSaved((data) => {
    if (data && data.id) {
        const isNew = noteId !== data.id;
        noteId = data.id;
        if (isNew && lastSaved) setSaveState('已保存 ' + new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }));
        else setSaveState('已保存');
    }
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

// 关闭（收起）
closeBtn.addEventListener('click', () => {
    clearTimeout(saveTimer);
    saveNow(); // 立即保存再收
    api.closeNote();
});

// Esc 收起
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        clearTimeout(saveTimer);
        saveNow();
        api.closeNote();
    }
});

// 窗口内自由拖拽（主进程驱动，标题区已 -webkit-app-region: drag，
// 但输入框/按钮需要 no-drag 已在 CSS 处理；整窗拖拽用 pointer 事件兜底非 drag 区域）
