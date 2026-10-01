/**
 * homepage.js — 主页面（nanoSecretary）
 * 通过全局标识符 api 访问（contextBridge 注入）；不要用 const api = window.api 重复声明。
 */
let allEntries = [];
let chatHistory = [];
let currentView = 'dashboard'; // 当前视图（默认仪表盘）

/** 便签（sticky）是自由记录区，不进待办列表、不计入任何待办统计。
    与主进程 main.js 的 isTodo 是同一判据，改一处要同时改另一处。 */
function isTodo(e) {
    return e.status === 'pending' && e.sticky !== true;
}

// ---- Tab 图标（统一线性图标）----
const tabIconHolders = {
    dashboard: document.getElementById('tab-dashboard-icon'),
    records: document.getElementById('tab-records-icon'),
    chat: document.getElementById('tab-chat-icon'),
};
function mountTabIcons() {
    if (!window.nanoIcons) return;
    if (tabIconHolders.dashboard) tabIconHolders.dashboard.innerHTML = window.nanoIcons.ic('todo', 'inline');
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
    currentView = view;
    viewTabs.forEach((t) => {
        const active = t.dataset.view === view;
        t.classList.toggle('active', active);
        t.setAttribute('aria-selected', String(active));
    });
    document.getElementById('view-dashboard').style.display = view === 'dashboard' ? 'flex' : 'none';
    document.getElementById('view-records').style.display = view === 'records' ? 'flex' : 'none';
    document.getElementById('view-chat').style.display = view === 'chat' ? 'flex' : 'none';
    if (view === 'dashboard') renderDashboard();
    if (view === 'chat') document.getElementById('chat-input').focus();
}
function goRecords() { setView('records'); }
function goDashboard() { setView('dashboard'); }

/* ================= 仪表盘（bento） ================= */
/** 本地日期工具（civil date，UTC+8 安全） */
function dISO(d) { const p = (n) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`; }
function localToday() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
/** 本周一（当地时区） */
function weekStart() {
    const d = new Date();
    const day = d.getDay(); // 0=周日
    const back = (day + 6) % 7; // 距周一
    d.setDate(d.getDate() - back);
    return d;
}
/** 今日 00:00 起的新 Date */
function todayLocalDate() {
    const d = new Date(); d.setHours(0, 0, 0, 0); return d;
}

/** 绘制单段进度环。ratio∈[0,1]。返回 svg 字符串。
 *  linecap 用 butt：像素打印终端世界里圆弧两端是切平的，不做圆头收尾。 */
function ringSVG(ratio, color, trackColor, size, stroke) {
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const filled = Math.max(0, Math.min(1, ratio)) * c;
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${trackColor}" stroke-width="${stroke}"/>
        <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}"
            stroke-linecap="butt" stroke-dasharray="${filled.toFixed(1)} ${c.toFixed(1)}"
            transform="rotate(-90 ${size / 2} ${size / 2})"/>
    </svg>`;
}
/** 多段环：segments = [{ratio, color}]，从顶部顺时针。 */
function multiRingSVG(segments, trackColor, size, stroke) {
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const total = segments.reduce((s, x) => s + x.ratio, 0);
    const track = (total >= 1) ? 'none' : trackColor;
    let parts = '';
    let acc = 0;
    for (const seg of segments) {
        if (seg.ratio <= 0) continue;
        const frac = seg.ratio / Math.max(total, 1e-9);
        const len = frac * c;
        const w = seg.stroke || stroke; // 每段可覆盖笔画权重（明后天/其余故让「今天」更突出）
        parts += `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${seg.color}" stroke-width="${w}"
            stroke-linecap="butt" stroke-dasharray="${len.toFixed(1)} ${c.toFixed(1)}"
            stroke-dashoffset="${(-acc).toFixed(1)}"
            transform="rotate(-90 ${size / 2} ${size / 2})"/>`;
        acc += len;
    }
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${track}" stroke-width="${stroke}"/>${parts}</svg>`;
}

/** 全盘渲染：调 entries 计算各卡并刷新 DOM。 */
function renderDashboard() {
    if (currentView !== 'dashboard') return;
    const entries = allEntries;
    const pending = entries.filter(isTodo);
    const done = entries.filter((e) => e.status === 'done');
    const today = localToday();
    const STROKE = 8;

    // —— 主卡 关注：中心 = 全部待处理（诚实计数，含无日期/未到期的）——
    const overdueN = pending.filter((e) => e.dueDate && e.dueDate < today).length;
    // 今天到期
    const todayDueN = pending.filter((e) => e.dueDate === today).length;
    // 明后天到期
    const tom = new Date(); tom.setDate(tom.getDate() + 1);
    const dayAft = new Date(); dayAft.setDate(dayAft.getDate() + 2);
    const dueSoonN = pending.filter((e) => e.dueDate === dISO(tom) || e.dueDate === dISO(dayAft)).length;
    // 其余待办拆两类：远期（>明后天到期）与无日期；二者是不同语义，图例如实分列（P2 critique）。
    const farN = pending.filter((e) => e.dueDate && e.dueDate > dISO(dayAft)).length;
    const undatedN = pending.filter((e) => !e.dueDate).length;
    // 环上「其余」仍是单一弱段（两者都不是紧迫项），但跨度与总量不变；四段恒等于全部 pending（P0-1 不低报）
    const restN = farN + undatedN;
    // 近7天完成（含今天，rolling）
    const since = todayLocalDate(); since.setDate(since.getDate() - 6);
    const done7N = done.filter((e) => {
        const t = e.doneAt ? new Date(e.doneAt) : (e.dueDate ? new Date(e.dueDate + 'T00:00:00') : null);
        return t && t >= since && t <= new Date();
    }).length;

    const attBox = document.getElementById('ring-attention');
    if (attBox) {
        // 四段 = 逾期(橙,满宽) / 今天(黄,满宽) / 明后天(主色,细) / 其余(最弱段)。
        // 新色板只有橙黄两专色，四段改用「色相 + 笔画权重」双重编码：
        // 「今天」与「明后天」都占不到新色相，故让明后天用更细的主色笔画从属，
        // 令今天成为环上唯一突出黄色。色值走 --chart-* 专用 token，不挪用状态文字色。
        // 四段之和恒等于全部 pending（P0-1 不低报）；done7N 属「已完成」轴，不混进「待处理」环。
        const segs = [
            { ratio: overdueN, color: 'var(--chart-overdue)' },
            { ratio: todayDueN, color: 'var(--chart-today)' },
            { ratio: dueSoonN, color: 'var(--chart-soon)', stroke: 5 },
            { ratio: restN, color: 'var(--chart-rest)' },
        ];
        attBox.innerHTML = multiRingSVG(segs, 'var(--chart-track)', 124, STROKE);
        let center = attBox.querySelector('.ring-center');
        if (!center) { center = document.createElement('div'); center.className = 'ring-center'; attBox.appendChild(center); }
        center.innerHTML = `<div class="big">${pending.length}</div><div class="sub">待处理</div>`;
    }
    const legend = document.getElementById('attention-legend');
    if (legend) {
        legend.innerHTML = `<div class="row"><span class="swatch" style="background:var(--chart-overdue)"></span>逾期<span class="n">${overdueN}</span></div>
            <div class="row"><span class="swatch" style="background:var(--chart-today)"></span>今天<span class="n">${todayDueN}</span></div>
            <div class="row"><span class="swatch" style="background:var(--chart-soon)"></span>明后天<span class="n">${dueSoonN}</span></div>`
            + (farN > 0 ? `<div class="row"><span class="swatch" style="background:var(--chart-rest)"></span>远期<span class="n">${farN}</span></div>` : '')
            + (undatedN > 0 ? `<div class="row"><span class="swatch undated"></span>无日期<span class="n">${undatedN}</span></div>` : '')
            + `<div class="axis-divider"></div><div class="row done-note">近7天完成<span class="n">${done7N}</span></div>`;
    }

    // —— 本周应做 / 完成（只收进侧卡一行，主卡不再重复）——
    // 单轴：以「本周到期」为队列（dueDate ∈ 本周），分子 = 该队列里已完成，分母 = 队列总数。
    // 不再用「按完成日」的另一轴，避免"本周该做但下周才做完"两边都不算。
    const ws = weekStart();
    const wsISO = dISO(ws);
    const weISO = dISO(new Date());
    const wkCohort = allEntries.filter((e) => e.dueDate && e.dueDate >= wsISO && e.dueDate <= weISO);
    const wkDueAll = wkCohort.length;
    const wkDone = wkCohort.filter((e) => e.status === 'done').length;

    // —— 侧卡 今日 ——
    const todayDue = pending.filter((e) => e.dueDate === today);
    const todayDone = done.filter((e) => (e.doneAt ? dISO(new Date(e.doneAt)) : e.dueDate) === today);
    const totalToday = todayDue.length + todayDone.length;
    const todayBox = document.getElementById('ring-today');
    if (todayBox) {
        todayBox.innerHTML = (totalToday === 0)
            ? ringSVG(0, 'transparent', 'var(--chart-track)', 84, STROKE)
            : ringSVG(todayDone.length / totalToday, 'var(--action-primary)', 'var(--chart-track)', 84, STROKE);
        let center = todayBox.querySelector('.ring-center');
        if (!center) { center = document.createElement('div'); center.className = 'ring-center'; todayBox.appendChild(center); }
        // 今日中心：无到期时显示「—」而非「0/0」（0/0 读着别扭；逾期归关注环负责）
        center.innerHTML = (totalToday === 0)
            ? '<div class="big">—</div><div class="sub">今日完成</div>'
            : `<div class="big">${todayDone.length}<small>/${totalToday}</small></div><div class="sub">今日完成</div>`;
    }
    // 下一件（带「下一件」标签；点击进记录视图并定位到该项）
    const nextBox = document.getElementById('today-next');
    if (nextBox) {
        // 下一件 = 最近的未来到期（含今日未完成）
        const future = pending
            .filter((e) => e.dueDate && e.dueDate >= today)
            .sort((a, b) => (a.dueDate + (a.time||'')) < (b.dueDate + (b.time||'')) ? -1 : 1);
        if (future.length) {
            const nx = future[0];
            const when = nx.dueDate === today ? '今天' : nx.dueDate === dISO(tom) ? '明天' : nx.dueDate;
            nextBox.innerHTML = `<span class="lbl">下一件</span><span class="hl">${esc(nx.title)}</span><span class="lbl">${when}${nx.time ? ' ' + esc(nx.time) : ''}</span>`;
            nextBox.style.display = 'flex';
            nextBox.dataset.todoId = nx.id; // 供键盘 Enter/Space 定位到该项
            nextBox.setAttribute('aria-label', '下一件：' + nx.title);
            nextBox.onclick = () => focusEntry(nx.id);
        } else {
            nextBox.style.display = 'none';
            delete nextBox.dataset.todoId;
        }
    }

    // —— 侧卡 本周：去环，压成一行进度（与主卡 week-strip 同源，不抢焦点）——
    const wkBlock = document.getElementById('week-block');
    if (wkBlock) {
        const frac = wkDueAll ? Math.min(1, wkDone / wkDueAll) : 0;
        wkBlock.innerHTML = `<div class="bar"><i style="width:${(frac * 100).toFixed(1)}%"></i></div>`;
    }
    const weekFoot = document.getElementById('week-foot');
    if (weekFoot) weekFoot.innerHTML = (wkDueAll === 0) ? '本周暂无' : `本周应做 ${wkDueAll} · 已完成 ${wkDone}`;

    renderTagRow(pending);
}

/** tag 计数格：默认只露 Top-3 芯片，其余收进「更多标签」；详情一行点选进记录。 */
let activeTag = null;
/** 当前待办 tag 筛选（来自仪表盘 tag 芯片点击；null = 不过滤）。 */
let todoFilterTag = null;
/** 筛选类型：null（全过滤）/ 'tag'（按 tag）/ 'attention'（关注集：逾期+今天+明后天）。 */
let todoFilterKind = null;
let tagCountLatest = new Map();
let pendingTotalLatest = 0;
const TAG_TOP_N = 3;
function renderTagRow(pendingTodos) {
    // 收集全部 tag（pending 的 tags + category），去重
    const tagCount = new Map();
    for (const e of pendingTodos) {
        const set = new Set([...(e.tags || []), e.category].filter(Boolean));
        for (const t of set) tagCount.set(t, (tagCount.get(t) || 0) + 1);
    }
    tagCountLatest = tagCount;
    pendingTotalLatest = pendingTodos.length;
    const tags = Array.from(tagCount.entries()).sort((a, b) => b[1] - a[1]);
    const chipsEl = document.getElementById('tag-chips');
    const detailEl = document.getElementById('tag-detail');
    const revealEl = document.getElementById('tag-reveal');
    if (!chipsEl || !detailEl || !revealEl) return;
    if (!tags.length) {
        // 标签为空 ≠ 待办为空：有待办但未打标签时，别撒谎说「没有待办」（P2 critique）。
        const hasTodos = pendingTodos.length > 0;
        chipsEl.innerHTML = `<div class="dash-empty">${hasTodos ? '还没有标签，给待办加一个' : '没有待办'}</div>`;
        detailEl.innerHTML = '';
        revealEl.hidden = true;
        return;
    }
    const top = tags.slice(0, TAG_TOP_N);
    // 若当前选中 tag 不在 Top-3，把它补进常驻位（保证选中的始终可见）；
    // 被挤下的那个（原第 3 高）会进 rest，与其他 tag 一起收进 reveal，不丢失。
    if (activeTag && !top.some(([t]) => t === activeTag)) {
        const picked = tags.find(([t]) => t === activeTag);
        if (picked) top[top.length - 1] = picked;
    }
    // rest = 所有不在 top 的 tag（按 count 降序），作为「更多标签」reveal 的内容
    const rest = tags.filter(([t]) => !top.some(([t2]) => t2 === t));
    // 若当前选中 tag 已不在列表（数据刷新被清空），回退为 neutral；否则默认不预选
    if (activeTag && !tagCount.has(activeTag)) activeTag = null;
    // Top-3 常驻；选中态只在该 chip 等于 activeTag 时点亮（默认 neutral，无预选）
    chipsEl.innerHTML = top.map(([t, n]) =>
        `<button type="button" class="tag-chip${t === activeTag ? ' active' : ''}" data-tag="${esc(t)}" aria-pressed="${t === activeTag}">#${esc(t)}<span class="cnt">${n}</span></button>`
    ).join('');
    revealEl.hidden = !rest.length;
    if (rest.length) {
        revealEl.textContent = chipsEl.classList.contains('expanded') ? '收起' : `更多标签 +${rest.length}`;
        revealEl.setAttribute('aria-expanded', String(chipsEl.classList.contains('expanded')));
    }
    // 详情行：选中 tag 时显示该 tag 计数；否则显示全部（neutral，状态与事实一致）
    if (activeTag) {
        const n = tagCount.get(activeTag) || 0;
        detailEl.innerHTML = `<span>#${esc(activeTag)}</span><span class="big">${n} 项待办</span>`;
        detailEl.dataset.goTag = activeTag;
    } else {
        detailEl.innerHTML = `<span>全部标签</span><span class="big">${pendingTodos.length} 项待办</span>`;
        delete detailEl.dataset.goTag;
    }
    // 展开/收起其余标签（事件委托见 bindTagChips，展开出来的芯片同样可点）
    revealEl.onclick = () => {
        const expanded = chipsEl.classList.toggle('expanded');
        revealEl.textContent = expanded ? '收起' : `更多标签 +${rest.length}`;
        revealEl.setAttribute('aria-expanded', String(expanded));
        if (expanded) {
            const extra = rest.filter(([t]) => t !== activeTag).map(([t, n]) =>
                `<button type="button" class="tag-chip" data-tag="${esc(t)}" aria-pressed="false">#${esc(t)}<span class="cnt">${n}</span></button>`
            ).join('');
            chipsEl.insertAdjacentHTML('beforeend', extra);
        } else {
            chipsEl.querySelectorAll('.tag-chip').forEach((c) => {
                if (!top.some(([t]) => t === c.dataset.tag)) c.remove();
            });
        }
    };
}

/** 点选 tag：切换选中并据此筛选待办；点已选中者取消（toggle off → neutral）。 */
function selectTag(name) {
    const chipsEl = document.getElementById('tag-chips');
    const detailEl = document.getElementById('tag-detail');
    const wasActive = activeTag === name;
    activeTag = wasActive ? null : name;
    chipsEl.querySelectorAll('.tag-chip').forEach((c) => {
        const on = c.dataset.tag === activeTag;
        c.classList.toggle('active', on);
        c.setAttribute('aria-pressed', String(on));
    });
    if (activeTag) {
        const n = tagCountLatest.get(activeTag) || 0;
        detailEl.innerHTML = `<span>#${esc(activeTag)}</span><span class="big">${n} 项待办</span>`;
        detailEl.dataset.goTag = activeTag;
        setTodoFilter(activeTag);
    } else {
        detailEl.innerHTML = `<span>全部标签</span><span class="big">${pendingTotalLatest} 项待办</span>`;
        delete detailEl.dataset.goTag;
        setTodoFilter(null);
    }
    goRecords();
    scrollListTo();
}

/** 事件委托：芯片容器上只绑一次，动态插入（更多标签展开）的芯片也能点。 */
function bindTagChips() {
    const chipsEl = document.getElementById('tag-chips');
    if (!chipsEl || chipsEl.dataset.bound) return;
    chipsEl.dataset.bound = '1';
    chipsEl.addEventListener('click', (e) => {
        const chip = e.target.closest('.tag-chip');
        if (!chip || !chip.dataset.tag) return;
        e.stopPropagation();
        selectTag(chip.dataset.tag);
    });
    const detailEl = document.getElementById('tag-detail');
    if (detailEl && !detailEl.dataset.bound) {
        detailEl.dataset.bound = '1';
        detailEl.onclick = () => {
            const go = detailEl.dataset.goTag || null;
            setTodoFilter(go);
            goRecords();
            scrollListTo();
        };
    }
}

/** 进记录视图后滚动到列表第一条（落在待办而非空输入框）。 */
function scrollListTo() {
    requestAnimationFrame(() => {
        const list = document.getElementById('todo-list');
        if (!list) return;
        const first = list.querySelector('.entry-item');
        if (first) first.scrollIntoView({ block: 'center', behavior: 'smooth' });
        else { const ls = list.closest('.list-section'); if (ls) ls.scrollTop = 0; }
    });
}

/** 进记录视图并定位到指定条目，短暂高亮（下一件跳转用）。
 *  高亮由 focusFlashId 状态驱动、在 renderTodos 里落地，而非事后 poke DOM——
 *  这样即使列表因数据变更重渲染，flash 也会重新落在目标上，不会随 innerHTML 重建丢失。 */
let focusFlashId = null;
let focusFlashTimer = null;
function focusEntry(id) {
    focusFlashId = id;
    setTodoFilter(null); // 确保目标一定在列表中（不被无关 tag 筛掉）
    goRecords();
    requestAnimationFrame(() => {
        const el = document.querySelector(`.entry-item[data-id="${id}"]`);
        if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
    if (focusFlashTimer) clearTimeout(focusFlashTimer);
    focusFlashTimer = setTimeout(() => {
        focusFlashId = null;
        document.querySelectorAll('.entry-item.flash').forEach((n) => n.classList.remove('flash'));
    }, 1400);
}

/** 应用/清除待办筛选，并刷新列表与筛选条。
 *  tag（string）= 按 tag 筛选；'attention'（特值）= 关注集（逾期+今天+明后天）；null/undefined = 清除。 */
function setTodoFilter(tag, kind) {
    todoFilterTag = tag;
    // kind 只有显式传入才生效（关注集特值）；否则按 tag 归一。避免把真实名叫 "attention" 的 tag 误读成关注集。
    todoFilterKind = kind || (tag ? 'tag' : null);
    const bar = document.getElementById('todo-filter');
    const tagEl = document.getElementById('todo-filter-tag');
    if (bar && tagEl) {
        if (todoFilterKind === 'attention') {
            bar.hidden = false;
            tagEl.textContent = '关注';
        } else {
            bar.hidden = !tag;
            if (tag) tagEl.textContent = '#' + tag;
        }
    }
    // 清除筛选时同步重置仪表盘 tag 选中态，避免 detail 行与真实筛选不一致
    if ((tag === null || tag === undefined) && activeTag !== null) {
        activeTag = null;
        const chipsEl = document.getElementById('tag-chips');
        if (chipsEl) chipsEl.querySelectorAll('.tag-chip').forEach((c) => {
            c.classList.remove('active');
            c.setAttribute('aria-pressed', 'false');
        });
        const detailEl = document.getElementById('tag-detail');
        if (detailEl) {
            detailEl.innerHTML = `<span>全部标签</span><span class="big">${pendingTotalLatest} 项待办</span>`;
            delete detailEl.dataset.goTag;
        }
    }
    renderTodos();
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
// 待办 tag 筛选条「清除」
const todoFilterClear = document.getElementById('todo-filter-clear');
if (todoFilterClear) todoFilterClear.addEventListener('click', () => setTodoFilter(null));

// ---- 列表事件委托（替代内联 onclick，兼容 CSP 无内联脚本）----
document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = btn.dataset.id;
    if (btn.dataset.action === 'done') markDone(id, true);
    else if (btn.dataset.action === 'restore') markDone(id, false);
    else if (btn.dataset.action === 'delete') delEntry(id);
    else if (btn.dataset.action === 'topending') makePending(id);
    else if (btn.dataset.action === 'reschedule') toggleDueEdit(id, btn.closest('.entry-item'));
});

// 可点击仪表盘卡：关注卡(筛到关注集)、今日卡、本周卡 → 进记录视图（键盘可用，Enter/Space）
function bindDashCardNav() {
    const cardIds = ['card-attention', 'card-today', 'card-week'];
    const handler = (target) => (e) => {
        // 点击到子交互（如今日卡里的「下一件」）时不重复导航
        if (e.target.closest('.next-todo') || e.target.closest('.tag-chip') || e.target.closest('.tag-reveal')) return;
        if (e.key && e.key !== 'Enter' && e.key !== ' ') return;
        if (e.key === ' ') e.preventDefault();
        // 关注卡：筛到「逾期+今天+明后天」的真实关注集，而非裸列表（语义与图例一致）。
        // 显式传 kind='attention'，避免字符串推断。
        if (target === 'card-attention') setTodoFilter(null, 'attention');
        goRecords();
    };
    for (const id of cardIds) {
        const el = document.getElementById(id);
        if (el) { el.addEventListener('click', handler(id)); el.addEventListener('keydown', handler(id)); }
    }
    // 「下一件」是卡内子交互：鼠标/键盘都定位到具体项并滚动（键盘不再只进列表）
    const next = document.getElementById('today-next');
    if (next) {
        next.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            e.preventDefault(); e.stopPropagation();
            if (next.dataset.todoId) focusEntry(next.dataset.todoId);
            else goRecords();
        });
    }
}
bindDashCardNav();
bindTagChips();

/** 备忘/随手记 → 待办（无截止日期，直接进待办列表） */
function makePending(id) {
    api.makePending(id);
    setTimeout(loadData, 200);
}

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
    let todos = allEntries
        .filter(isTodo)
        .sort((a, b) => (a.dueDate || '9999') < (b.dueDate || '9999') ? -1 : 1);
    // 应用来自仪表盘 tag 芯片 / 关注卡的筛选（action-first）
    if (todoFilterKind === 'attention') {
        const today = localToday();
        const tom = new Date(); tom.setDate(tom.getDate() + 1);
        const dayAft = new Date(); dayAft.setDate(dayAft.getDate() + 2);
        const tomISO = dISO(tom), dayAftISO = dISO(dayAft);
        todos = todos.filter((e) => e.dueDate && (e.dueDate < today || e.dueDate === today || e.dueDate === tomISO || e.dueDate === dayAftISO));
    } else if (todoFilterTag) {
        todos = todos.filter((e) => {
            const set = new Set([...(e.tags || []), e.category].filter(Boolean));
            return set.has(todoFilterTag);
        });
    }
    document.getElementById('record-count').textContent = todos.length ? '(' + todos.length + ')' : '';

    if (!todos.length) {
        list.innerHTML = todoFilterKind === 'attention'
            ? '<div class="empty">没有逾期/今天的待办，一切都在计划内</div>'
            : todoFilterTag
                ? `<div class="empty">没有「#${esc(todoFilterTag)}」的待办</div>`
                : '<div class="empty">没有待办，记点什么吧</div>';
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
                ${e.priority === '高' ? `<span class="priority-high">${ic('fire', 'inline')}高优先级</span>` : e.priority === '中' ? `<span class="priority-mid">中</span>` : e.priority === '低' ? `<span class="priority-low">低</span>` : ''}
                ${e.category ? `<span class="cat">${esc(e.category)}</span>` : ''}
            </div>
            <div class="entry-actions">
                <button class="done-btn" type="button" data-action="done" data-id="${e.id}">${ic('check', 'inline')}完成</button>
                <button type="button" data-action="reschedule" data-id="${e.id}">${ic('edit', 'inline')}改期</button>
            </div>
        </div>`;
    }).join('');
    // 下一件跳转定位：focusFlashId 由 renderTodos 落地，重渲染也能重新命中
    if (focusFlashId) {
        const keep = list.querySelector(`.entry-item[data-id="${focusFlashId}"]`);
        if (keep) keep.classList.add('flash');
    }
}

// 渲染最近记录
function renderRecent(entries) {
    const list = document.getElementById('recent-list');
    if (!entries.length) {
        list.innerHTML = '<div class="empty">没有记录</div>';
        return;
    }
    const ic = (name, cls) => (window.nanoIcons ? window.nanoIcons.ic(name, cls) : '');
    list.innerHTML = entries.map((e) => {
        const st = e.status; // done | note（pending 已在 main.js 排除，不与待办事项重复）
        const cls = st === 'done' ? 'done' : 'note';
        const primary = st === 'done'
            ? `<button type="button" data-action="restore" data-id="${e.id}">${ic('restore', 'inline')}恢复</button>`
            : `<button type="button" class="promote-btn" data-action="topending" data-id="${e.id}">${ic('pin', 'inline')}转为待办</button>`;
        return `<div class="entry-item ${cls}" data-id="${e.id}">
            <div class="entry-title">${esc(e.title || e.content)}</div>
            <div class="entry-meta">
                ${e.dueDate ? `<span class="due">${ic('calendar', 'inline')}截止 ${esc(e.dueDate)}</span>` : ''}
                ${formatTime(e.created) ? `<span>${esc(formatTime(e.created))}</span>` : ''}
                ${e.category ? `<span class="cat">${esc(e.category)}</span>` : ''}
            </div>
            <div class="entry-actions">
                ${primary}
                <button type="button" data-action="reschedule" data-id="${e.id}">${ic('edit', 'inline')}改期</button>
                <button type="button" data-action="delete" data-id="${e.id}">${ic('trash', 'inline')}删除</button>
            </div>
        </div>`;
    }).join('');
}

function markDone(id, done) {
    // 找到对应的数据行，先做完成动效再刷新（reduced-motion 时跳过动效）
    const card = document.querySelector(`.entry-item[data-id="${id}"]`);
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (card && !reduced) {
        // 只做透明度 + 横向位移：像素字体一旦被 scale 会重采样发虚
        card.style.transition = 'opacity var(--dur-med) ease, transform var(--dur-med) ease';
        card.style.opacity = '0';
        card.style.transform = 'translateX(8px)';
    }
    api.markDone(id, done);
    setTimeout(loadData, reduced ? 20 : 180); // 等动效播完再刷新
}

// 改期（内联编辑）：点「改期」→ 展开日历弹层 → 选择日期 → 确定
let dueEditRow = null;
let dueEditPicker = null;
let dueEditNewValue = undefined; // undefined=未改动; null=清除; 'yyyy-mm-dd'=新日期

function toggleDueEdit(id, card) {
    const entry = allEntries.find((e) => e.id === id);
    if (!entry) return;
    if (dueEditRow) removeDueEdit();
    // 用点击处的卡片（同一 pending 项可能同时出现在「待办列表」和「最近记录」，
    // 不能按 id 反查，否则永远命中第一张）
    if (!card) card = document.querySelector(`.entry-item[data-id="${id}"]`);
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
        input.style.cssText = 'flex:1;min-width:0;background:var(--surface-field);color:var(--text-primary);border:1px solid var(--border-strong);border-radius:0;padding:5px 8px;font-size:var(--text-meta);color-scheme:inherit;';
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
    bar.innerHTML = '<span>确认删除？（删除后可在提示里撤销）</span><span class="confirm-btns"><button type="button" data-confirm="yes">删除</button><button type="button" class="confirm-no" data-confirm="no">取消</button></span>';
    bar.querySelector('[data-confirm="yes"]').addEventListener('click', () => {
        const entry = allEntries.find((e) => e.id === id);
        api.deleteEntry(id);
        bar.remove();
        if (entry) showToast('已删除', { undo: entry }); // 提供撤销
        setTimeout(loadData, 150);
    });
    bar.querySelector('[data-confirm="no"]').addEventListener('click', () => bar.remove());
    card.appendChild(bar);
    bar.querySelector('[data-confirm="yes"]').focus();
}

// 轻量 toast：msg + 可选撤销（undo = 被删的记录对象）
let toastTimer = null;
function showToast(msg, opts) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.innerHTML = '';
    el.appendChild(document.createTextNode(msg));
    if (opts && opts.undo) {
        const undoBtn = document.createElement('button');
        undoBtn.className = 'toast-undo';
        undoBtn.type = 'button';
        undoBtn.textContent = '撤销';
        undoBtn.addEventListener('click', () => {
            api.restoreEntry(opts.undo);
            showToast('已恢复');
            loadData();
        });
        el.appendChild(undoBtn);
    }
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
}

function esc(str) {
    return String(str || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function formatTime(iso) {
    if (!iso) return ''; // 防御：缺时间时不渲染中文外的裸 "Invalid Date"（真实数据 readData() 总回填 created）
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
api.onEntries((entries) => {
    allEntries = entries || [];
    renderTodos();
    renderDashboard();
    // 设置页右栏吃的是真实记录（解析样张 / 提醒时间轴），开着就跟着重画
    if (isSettingsOpen()) refreshSee();
});
api.onAiRefined(() => setTimeout(loadData, 400));
api.onSaveSuccess(() => {});
api.onEntryUpdated(() => setTimeout(loadData, 150));
// 任意窗口数据变更 → 刷新
api.onEntriesChanged((entries) => {
    allEntries = entries || [];
    renderTodos();
    renderDashboard();
    api.getRecentEntries();
    if (isSettingsOpen()) { refreshSee(); api.getDataStats(); }
});

// 对话
let chatReplyTimer = null; // 对话回包兜底：AI 不回包时复位状态，避免「思考中…」永久卡死（P1 critique）
function sendChat() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;
    chatHistory.push({ role: 'user', content: text });
    appendChat('user', text);
    input.value = '';
    const aiStatus = document.getElementById('ai-status');
    aiStatus.textContent = '思考中…';
    aiStatus.title = '';
    clearTimeout(chatReplyTimer);
    // 本地模型若迟迟不回包，给 30s 兜底：说一句话安抚，但**不改状态、不判离线**。
    //
    // 旧实现到这里会把状态改成「AI 离线」并说「请确认 Ollama 已启动」——
    // 可后端最坏预算是 解析 60s + 回复 120s，30s 时什么都没失败，
    // 那句话纯属无依据的谎报（用户看到的正是「AI 在线」和「Ollama 未启动」同屏）。
    // 后端改造后单次 chat 预算就有 120s，前端更不该抢在最前面下结论。
    // 这个定时器的职责只剩「解卡提示」，最终态一律等主进程回包。
    chatReplyTimer = setTimeout(() => {
        appendChat('ai', '（还在生成中…本地模型较慢时可以再等一会儿；要放弃就按 Esc 收起窗口，稍后再试。）');
    }, 30000);
    api.sendChat(chatHistory);
}
api.onChatReply((payload) => {
    clearTimeout(chatReplyTimer);
    // 主进程回包形如 { ok, text }；兼容旧的纯文本回包
    const reply = typeof payload === 'string' ? payload : (payload && payload.text) || '';
    if (!reply) return;
    // 失败提示只给用户看，**不进对话历史** —— 否则下一轮模型会把
    // 「模型没安装」当成自己说过的话，越聊越偏
    if (typeof payload === 'string' || payload.ok) {
        chatHistory.push({ role: 'assistant', content: reply });
    }
    appendChat('ai', reply);
    // 头部按真实状态刷新：成功 → 在线；模型缺失/没装 → 无对话模型。
    // 不再无条件写「AI 在线」—— 那正是「界面说在线、模型没回应」的成因。
    api.getAiStatus();
});
function appendChat(role, content) {
    const box = document.getElementById('chat-messages');
    // 首条消息出现时移除空态引导
    const empty = document.getElementById('chat-empty');
    if (empty) empty.hidden = true;
    const div = document.createElement('div');
    div.className = 'chat-msg ' + role;
    div.textContent = content;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}
// 空态建议 chip：点击填入输入框并聚焦，用户按 Enter 或「发送」即问
const chatEmpty = document.getElementById('chat-empty');
if (chatEmpty) chatEmpty.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-chat]');
    if (!btn) return;
    const input = document.getElementById('chat-input');
    if (input) { input.value = btn.dataset.chat; input.focus(); }
});
document.getElementById('chat-send').addEventListener('click', sendChat);
document.getElementById('chat-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') sendChat(); });

// AI 状态
api.getAiStatus();
let aiStatusTimer = null;
let aiStatusResolved = false; // getAiStatus 是否已回包（用布尔判据，胜过字符串匹配）
// 「连接中」兜底：若几秒内 getAiStatus 未回包，转成明确的离线提示，避免状态永远悬置
aiStatusTimer = setTimeout(() => {
    if (aiStatusResolved) return;
    const el = document.getElementById('ai-status');
    if (el) {
        el.textContent = 'AI 离线';
        el.title = 'Ollama 未启动';
        el.className = 'ai-status offline';
    }
}, 4000);
api.onAiStatus((status) => {
    aiStatusResolved = true;
    const el = document.getElementById('ai-status');
    // 三态：服务不可达 / 服务可达但无对话模型 / 正常。
    // hasChatModel 为 undefined 时按「有」处理（兼容旧主进程，不误报）。
    if (!status.available) {
        el.textContent = 'AI 离线';
        el.title = 'Ollama 未启动';
        el.className = 'ai-status offline';
    } else if (status.hasChatModel === false) {
        el.textContent = '无对话模型';
        el.title = '本地的模型都不能对话（只有嵌入模型）。到设置里换一个，或 ollama pull qwen2.5:7b';
        el.className = 'ai-status warn';
    } else {
        el.textContent = 'AI 在线';
        el.title = status.model || ''; // 完整模型号放 tooltip，避免淹没头部
        el.className = 'ai-status online';
    }
    // 一旦拿到状态就撤销「连接中」超时兜底（避免离线判定被覆盖）
    if (aiStatusTimer) { clearTimeout(aiStatusTimer); aiStatusTimer = null; }
});

// 底部按钮
document.getElementById('history-button').addEventListener('click', () => api.openHistory());
document.getElementById('sticky-button').addEventListener('click', () => api.openSticky());
document.getElementById('settings-button').addEventListener('click', openSettings);
document.getElementById('close-button').addEventListener('click', () => api.closeHomepage());

// ================= 设置页：左栏改，右栏看 =================
// 旧版是主页面正中的一个 320×604 浮层：吃掉窗口 86% 的高度、内部已经零滚动余量
// （再加一行「开机自启」就顶出去，所以它一直只能待在托盘菜单里），
// 六行同构同重、一个模块编号都没有，而且「主题」是全键盘设置里唯一免费可预览的一项，
// 偏偏只有它没有预览。现在改成与主容器同几何的一整屏：左 5/12 改、右 7/12 看。
//
// 右栏的约定：每个设置项用 data-see 声明「生效之后会变出什么」，
// 焦点或点击落在哪一项，右栏就画哪一项的后果。内容全部取自本机真实数据 ——
// 没有可展示的真实数据时老实说没有，不摆假样本。
const settingsOverlay = document.getElementById('settings-overlay');
const settingsPanel = document.getElementById('settings-panel');
const setListEl = document.getElementById('set-list');
const seeEl = document.getElementById('set-see');
let settingsTrigger = null;   // 打开设置前的焦点锚点（关闭后归还焦点）
let settingsData = null;      // 最近一次 ai-status 回包
let dataStats = null;         // 最近一次 data-stats 回包
let themeOnOpen = 'system';   // 进来时的主题取值（取消 / 直接关掉要退回它）

/* 草稿态＝面板上控件的当前值。右栏画的永远是草稿而不是盘上的值：
   「保存才生效」这条约定下，草稿才是用户正在做的那一个决定。 */
const draft = { theme: 'system', model: '', ai: true, lead: 24, ball: true, shortcut: '', autoStart: false };
function syncDraft() {
    draft.theme = themeValue;
    draft.model = document.getElementById('set-model').value;
    draft.ai = aiSwitch.classList.contains('on');
    draft.ball = ballSwitch.classList.contains('on');
    draft.autoStart = autoSwitch.classList.contains('on');
    const n = parseInt(document.getElementById('set-lead').value, 10);
    draft.lead = (isNaN(n) || n < 0 || n > 168) ? 24 : n;
    draft.shortcut = shortcutValue;
}
function refreshSee() { syncDraft(); renderSee(); }

// 开关（role="switch"）：AI 解析 / 悬浮球 / 开机自启共用同一套交互
function bindSwitch(id, onChange) {
    const sw = document.getElementById(id);
    const toggle = () => {
        const on = !sw.classList.contains('on');
        sw.classList.toggle('on', on);
        sw.setAttribute('aria-checked', String(on));
        if (onChange) onChange(on);
    };
    sw.addEventListener('click', toggle);
    sw.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
    return sw;
}
const aiSwitch = bindSwitch('set-ai-switch', refreshSee);
const ballSwitch = bindSwitch('set-ball-switch', refreshSee);
const autoSwitch = bindSwitch('set-autostart-switch', refreshSee);

// ---- 全局快捷键录制 ----
const shortcutField = document.getElementById('set-shortcut');
const shortcutDesc = document.getElementById('set-shortcut-desc');
const SHORTCUT_DESC_DEFAULT = shortcutDesc.textContent;
let shortcutValue = ''; // 规范化后的 accelerator，如 CommandOrControl+Alt+N

// accelerator（Electron 形式）→ 人读形式
function prettyAccel(accel) {
    if (!accel) return '';
    return accel.split('+').map((p) => {
        if (p === 'CommandOrControl' || p === 'Control') return 'Ctrl';
        if (p === 'Super') return 'Win';
        return p;
    }).join('+');
}

// 键盘事件 → accelerator。返回 null 表示这次按键还构不成合法组合。
function accelFromEvent(e) {
    if (['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) return null; // 只按住了修饰键
    if (e.key === 'Escape') return null; // Esc 让给「取消录制」
    const mods = [];
    if (e.ctrlKey) mods.push('CommandOrControl');
    if (e.altKey) mods.push('Alt');
    if (e.shiftKey) mods.push('Shift');
    if (e.metaKey) mods.push('Super');
    if (!mods.length) return null; // 必须至少一个修饰键
    let key = e.key;
    if (key.length === 1) key = key.toUpperCase();
    else if (key === ' ') key = 'Space';
    return mods.concat(key).join('+');
}

shortcutField.addEventListener('focus', () => {
    shortcutField.classList.add('recording');
    shortcutDesc.textContent = '请按下组合键…（Esc 取消）';
});
shortcutField.addEventListener('blur', () => {
    shortcutField.classList.remove('recording');
    shortcutField.value = prettyAccel(shortcutValue);
    shortcutDesc.textContent = SHORTCUT_DESC_DEFAULT;
});
shortcutField.addEventListener('keydown', (e) => {
    e.preventDefault(); // readonly 输入框：拦下所有按键，只做录制
    if (e.key === 'Escape') { shortcutField.blur(); return; }
    const accel = accelFromEvent(e);
    if (!accel) {
        shortcutDesc.textContent = '需要至少一个修饰键（Ctrl / Alt / Shift）';
        return;
    }
    shortcutValue = accel;
    shortcutField.value = prettyAccel(accel);
    shortcutDesc.textContent = '已记录，保存后生效';
    refreshSee();
});

// ---- 主题三态（跟随系统 / 亮色 / 暗色）----
// 真正的换肤由主进程的 nativeTheme.themeSource 完成，渲染层只用
// prefers-color-scheme 媒体查询取色，所以这里不碰样式。
// 这一项是全页唯一「即点即生效」的设置 —— 右栏那块样张演示的就是这件事本身，
// 让用户先点保存再看见效果，等于把唯一当场能证明的东西藏起来。
// 代价是多一条回滚路径：取消 / 直接关掉时按进来时记下的取值翻回去（见 closeSettings）。
// 盘上的 config.json 全程没被写过，所以回滚是精确的 —— 一个值，没有数据。
const THEME_VALUES = ['system', 'light', 'dark'];
const THEME_LABELS = { system: '跟随系统', light: '亮色', dark: '暗色' };
let themeValue = 'system';
const themeSeg = document.getElementById('set-theme');

/** 同步分段控制的选中态，并把未选中项移出 Tab 序列（ARIA radiogroup 的漫游焦点约定）。 */
function paintThemeSeg() {
    themeSeg.querySelectorAll('button[data-theme]').forEach((b) => {
        const on = b.dataset.theme === themeValue;
        b.setAttribute('aria-checked', String(on));
        b.tabIndex = on ? 0 : -1;
    });
}
function pickTheme(next) {
    if (!THEME_VALUES.includes(next) || next === themeValue) return;
    themeValue = next;
    paintThemeSeg();
    api.previewTheme(themeValue); // 即时换肤（不落盘）
    refreshSee();
}
themeSeg.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-theme]');
    if (btn) pickTheme(btn.dataset.theme);
});
themeSeg.addEventListener('keydown', (e) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
    e.preventDefault();
    const btns = Array.from(themeSeg.querySelectorAll('button[data-theme]'));
    const i = btns.indexOf(document.activeElement);
    if (i < 0) return;
    const step = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : -1;
    const next = btns[(i + step + btns.length) % btns.length];
    next.focus();
    pickTheme(next.dataset.theme);
});
paintThemeSeg(); // 初始把未选中的两项移出 Tab 序列

// ---- 右栏：后果样张 ----
let seeKey = 'theme';

/* 右栏一律对读屏隐藏（见 homepage.html 的 aria-hidden）：它是视觉扩写，
   信息在左栏都有对应的可读文本，念两遍是噪音。 */

function seeLine(k, v) {
    if (v === null || v === undefined || v === '') return '';
    return `<div class="see-line"><span class="k">${esc(k)}</span><span class="v">${esc(String(v))}</span></div>`;
}
function fmtBytes(n) {
    if (!n) return '0 B';
    if (n < 1024) return n + ' B';
    if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
    return (n / 1024 / 1024).toFixed(1) + ' MB';
}
function fmtDT(d) {
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}
/** 最近一条非便签记录。 */
function latestRecord() {
    const list = allEntries.filter((e) => !e.sticky && (e.content || e.title));
    if (!list.length) return null;
    return list.reduce((a, b) => ((a.created || '') >= (b.created || '') ? a : b));
}
/** 最近一条「真的抽出了结构化字段」的记录；没有就退回最近一条。
    判据只认日期和优先级：只有分类的（比如随手记）不算「被拆过」。 */
function latestStructured() {
    const list = allEntries.filter((e) => !e.sticky
        && (e.dueDate || (e.priority && e.priority !== '低')));
    if (!list.length) return latestRecord();
    return list.reduce((a, b) => ((a.created || '') >= (b.created || '') ? a : b));
}
/** 到期时刻：与主进程 getDueMoment 同一套算法（dueDate + T(具体时刻或 00:00)）。 */
function dueMoment(e) {
    if (e.time && /^\d{1,2}:\d{2}$/.test(e.time)) {
        const [h, m] = e.time.split(':').map(Number);
        return new Date(e.dueDate + `T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`);
    }
    return new Date(e.dueDate + 'T00:00:00');
}
function ic(name, cls) { return window.nanoIcons ? window.nanoIcons.ic(name, cls) : ''; }
/** 一条真实记录的行内样式，用于外观样张。 */
function demoRowHTML(e) {
    if (!e) {
        return `<div class="entry-item">
            <div class="entry-title">还没有记录</div>
            <div class="entry-meta"><span class="cat">记点什么，这里就换成你自己的</span></div>
        </div>`;
    }
    const overdue = e.status === 'pending' && e.dueDate && e.dueDate < localToday();
    return `<div class="entry-item${overdue ? ' overdue' : ''}">
        <div class="entry-title">${esc(e.title || e.content)}</div>
        <div class="entry-meta">
            ${e.dueDate ? `<span class="due${overdue ? ' overdue' : ''}">${ic('clock', 'inline')}${esc(e.dueDate < localToday() && e.status === 'pending' ? '已逾期 ' + e.dueDate : '截止 ' + e.dueDate)}</span>` : ''}
            ${e.priority === '高' ? `<span class="priority-high">${ic('fire', 'inline')}高优先级</span>` : ''}
            ${e.category ? `<span class="cat">${esc(e.category)}</span>` : ''}
        </div>
    </div>`;
}

/** 最该被看见的一条逾期待办——样张里用来说明亮色/暗色下橙色标记怎么落。 */
function overdueSample(excludeId) {
    const list = allEntries.filter((e) => !e.sticky && e.status === 'pending'
        && e.dueDate && e.dueDate < localToday() && e.id !== excludeId);
    if (!list.length) return null;
    return list.reduce((a, b) => (dueMoment(a) <= dueMoment(b) ? a : b));
}

const SEE = {
    theme: {
        head: '主题',
        body: () => {
            const label = THEME_LABELS[draft.theme] || '跟随系统';
            const first = latestStructured();
            return `
                <div class="see-big">${esc(label)}</div>
                ${seeLine('取值', draft.theme === 'system' ? '跟着 Windows 的明暗设置走' : '不跟系统，固定用' + label)}
                <div class="see-demo">
                    <div class="tabs">
                        <div class="tab active">仪表盘</div>
                        <div class="tab">记录</div>
                        <div class="tab">对话</div>
                    </div>
                    ${demoRowHTML(first)}
                    ${demoRowHTML(overdueSample(first && first.id))}
                    <div class="demo-switch-row">
                        <span class="t">AI 智能解析</span>
                        <span class="switch on" aria-hidden="true"></span>
                    </div>
                    <div class="demo-actions"><span class="save-btn">保存</span></div>
                </div>
                <div class="see-note">这块样张就是真身：同一批类名、同一份 token，只是窄一点。点上面的按钮，它当场翻。</div>`;
        },
    },

    model: {
        head: 'Ollama 模型',
        body: () => {
            const s = settingsData;
            if (!s) return '<div class="see-empty">正在问 Ollama…</div>';
            const models = Array.isArray(s.chatModels) ? s.chatModels : (s.models || []);
            const lines = seeLine('当前使用', draft.model || s.model || '未配置')
                + seeLine('配置的模型', s.configuredModel && s.configuredModel !== draft.model ? s.configuredModel : '')
                + seeLine('可对话的模型', models.length ? models.length + ' 个' : '0 个');
            if (!models.length) {
                return `<div class="see-big">没有可用的对话模型</div>${lines}
                    <div class="see-note">${s.available
                        ? 'Ollama 在跑，但本地没有能对话的模型。执行 ollama pull qwen2.5:7b 之后回到这里。'
                        : '没连上本机 Ollama（127.0.0.1:11434）。先把它启动起来。'}</div>`;
            }
            return `<div class="see-big">${esc(draft.model || s.model || '未配置')}</div>${lines}
                <div class="see-note">改这里只是换一个回答问题的人，记录本身还是存在你机器上。</div>`;
        },
    },

    parse: {
        head: 'AI 智能解析',
        body: () => {
            const e = latestStructured();
            if (!e) {
                return '<div class="see-empty">还没有记录。去输入面板记一条，这里就会显示那句话被拆成了什么。</div>';
            }
            const src = e.content || e.title || '';
            const fields = [
                ['标题', e.title],
                ['截止', e.dueDate ? e.dueDate + (e.time ? ' ' + e.time : '') : null],
                ['优先级', e.priority && e.priority !== '低' ? e.priority : null],
                ['分类', e.category && e.category !== '其他' ? e.category : null],
            ].filter(([, v]) => v);
            const on = draft.ai;
            const body = fields.length
                ? fields.map(([k, v]) => `<div class="see-line${on ? '' : ' see-off'}"><span class="k">${esc(k)}</span><span class="v">${esc(String(v))}</span></div>`).join('')
                : '<div class="see-empty">这条没有拆出任何结构化字段。</div>';
            return `<div class="see-src">${esc(src)}</div>
                <div class="see-arrow">↓</div>
                ${body}
                <div class="see-note">${on
                    ? '右栏这些字段就是从左边那句话里拆出来的。关掉「AI 智能解析」，新记录只留原文，日期、优先级、分类都不会再有。'
                    : '已关掉：新记录只会原样存成一条文本，上面这些字段不会再产生（已经存过的保持原样）。'}</div>`;
        },
    },

    lead: {
        head: '提醒提前量',
        body: () => {
            // 与主进程 scanReminders / getDueMoment 用同一套判据与算法：
            // 候选只算「没提醒过的待办」，到期时刻取 dueDate + T(具体时刻或 00:00)，
            // 提醒窗口 = [到期 − 提前量, 到期 + 8 天)，进入窗口响一次。
            const todos = allEntries.filter(isTodo)
                .filter((e) => e.dueDate && e.reminded !== true)
                .sort((a, b) => dueMoment(a) - dueMoment(b));
            const next = todos[0];
            if (!next) {
                const anyTodo = allEntries.filter((e) => isTodo(e) && e.dueDate).length;
                return `<div class="see-empty">${anyTodo
                    ? '带日期的待办都已经提醒过了，不会重复打扰。'
                    : '现在没有带截止时间的待办。'}${seeLine('当前提前量', draft.lead + ' 小时')}记一条带日期的，这里就会画出它的提醒时刻。</div>`;
            }
            const due = dueMoment(next);
            const fire = new Date(due.getTime() - draft.lead * 3600 * 1000);
            const late = fire.getTime() < Date.now();
            return `<div class="see-src">${esc(next.title || next.content)}</div>
                ${seeLine('提前量', draft.lead + ' 小时')}
                ${seeLine(late ? '提醒已经该响' : '什么时候响', fmtDT(fire))}
                ${seeLine('截止', fmtDT(due))}
                <div class="see-note">进入这个窗口就提醒一次，之后不再重复。如果在截止后 8 天内才启动，下次扫描会补上；超过 8 天就不提了。</div>`;
        },
    },

    ball: {
        head: '显示悬浮球',
        body: () => {
            const on = draft.ball;
            return `<div class="see-big">${on ? '球在桌面上' : '球已隐藏'}</div>
                ${seeLine('输入面板', on ? '点球打开' : '只能在托盘或快捷键打开')}
                ${seeLine('托盘图标', '一直在，' + (on ? '右键可以再把它显示回来' : '右键「显示/隐藏悬浮球」可以把它叫回来'))}
                ${seeLine('全局快捷键', draft.shortcut ? prettyAccel(draft.shortcut) + ' 照常可用' : '尚未设置')}
                <div class="see-note">${on ? '球是本应用的常驻入口，关掉之后它不会再占桌面。' : '关的是桌面上的球，程序还在托盘里跑着，记录和提醒都不受影响。'}</div>`;
        },
    },

    shortcut: {
        head: '全局快捷键',
        body: () => {
            const pretty = prettyAccel(draft.shortcut);
            return `<div class="see-big">${esc(pretty || '未设置')}</div>
                ${seeLine('作用', '在任何程序里按一下，直接从桌面唤起输入面板')}
                ${seeLine('注册情况', pretty ? '保存时向系统注册' : '没有快捷键时只能用托盘或悬浮球打开')}
                <div class="see-note">快捷键是全局独占的：和别的程序撞了会注册失败，那时这一项会告诉你撞的是哪个键，并且继续用原来那个 —— 不会静默失效。</div>`;
        },
    },

    autostart: {
        head: '开机自启',
        body: () => {
            const on = draft.autoStart;
            return `<div class="see-big">${on ? '随系统启动' : '不自动启动'}</div>
                ${seeLine('登录之后', on ? '程序自动运行，悬浮球自己出现' : '需要你自己打开它')}
                ${seeLine('托盘', on ? '和手动打开时一样常驻' : '手动打开后照常常驻')}
                <div class="see-note">这一项写进 Windows 的登录启动项；托盘菜单里也有同一个开关，改哪边另一边都会跟着变。</div>`;
        },
    },

    data: {
        head: '本地数据',
        body: () => {
            const s = dataStats;
            if (!s) return '<div class="see-empty">正在读取…</div>';
            // 主进程读不到（文件被占用 / 权限 / 还没写过）时回 error，别停在「正在读取…」
            if (s.error) return '<div class="see-empty">读不到本地数据。文件可能正被占用，或者还没写入过。</div>';
            return seeLine('记录', s.total + ' 条')
                + seeLine('其中', `待办 ${s.pending} · 已完成 ${s.done} · 便签 ${s.note} · 纯记录 ${s.free}`)
                + seeLine('占用', fmtBytes(s.dataBytes + s.configBytes))
                + seeLine('最后写入', s.lastWrite ? fmtDT(new Date(s.lastWrite)) : '还没有写过')
                + `<div class="see-line"><span class="k">位置</span><span class="v">${esc(s.dir)}</span></div>`
                + '<div class="see-note">全部在这台机器上：记录就存在上面这个目录里，AI 走本机 Ollama，不经过任何服务器。</div>';
        },
    },
};

// 右栏表头沿用左栏的分节标题形状（编号 + 下边线 + 吸顶），不是压在标题上的小字眉题。
// 文字与左栏那一行的标签逐一对应，左栏滚走了也能认出在看哪一项。
const SEE_GROUP = {
    theme: '01', model: '02', parse: '02', lead: '03',
    ball: '04', shortcut: '04', autostart: '04', data: '05',
};

function renderSee() {
    const spec = SEE[seeKey] || SEE.theme;
    seeEl.innerHTML = `<div class="see-head"><span class="mod-code">${SEE_GROUP[seeKey] || '01'}</span>${esc(spec.head)}</div>`
        + spec.body();
}

// 焦点或点击落在哪一行，右栏就画哪一行的后果。
// 焦点走两条：捕获相的 focus（focus 不冒泡，必须 capture，这也是 React onFocus 走的那条）
// 加 focusin 兜底。两条都幂等 —— seeKey 已经是这一行就直接返回。
function seeRowFrom(target) {
    const row = target && target.closest ? target.closest('.set-row') : null;
    if (!row || !row.dataset.see || seeKey === row.dataset.see) return;
    seeKey = row.dataset.see;
    renderSee();
}
setListEl.addEventListener('focus', (e) => seeRowFrom(e.target), true);
setListEl.addEventListener('focusin', (e) => seeRowFrom(e.target));
setListEl.addEventListener('pointerdown', (e) => seeRowFrom(e.target));

function openSettings() {
    themeOnOpen = themeValue;
    seeKey = 'theme'; // 每次进来都从 01 外观开始，不沿用上次看到哪一项
    settingsOverlay.classList.add('show');
    settingsTrigger = document.getElementById('settings-button');
    syncDraft();
    renderSee();
    // 焦点圈定：进入左栏第一个可聚焦元素（主题分段控制）
    const first = setListEl.querySelector('select, input, button, [tabindex]');
    if (first) first.focus();
    api.getAiStatus();  // 刷新后填充左栏控件与右栏样张
    api.getConfig();    // 回填主题与开机自启
    api.getDataStats();
}

/* role="dialog" 的焦点圈定：**只圈左栏**。
   右栏是 aria-hidden 的样张，本来就没有可聚焦元素，圈进来只会多绕一圈。 */
settingsOverlay.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusables = settingsPanel.querySelectorAll('select, input, button, [tabindex]');
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

function closeSettings(opts) {
    // 主题是即点即生效的，但「取消」的意思是没同意保存 —— 把预览翻回进来时的取值。
    // 保存路径不走进这里（saved: true），因为那时这个值已经落盘，翻回去就是撤销用户的决定。
    if (!(opts && opts.saved) && themeValue !== themeOnOpen) {
        themeValue = themeOnOpen;
        paintThemeSeg();
        api.previewTheme(themeOnOpen);
    }
    settingsOverlay.classList.remove('show');
    if (settingsTrigger) { settingsTrigger.focus(); settingsTrigger = null; }
}
function isSettingsOpen() { return settingsOverlay.classList.contains('show'); }

// 左栏控件改动 → 草稿变 → 右栏重画
document.getElementById('set-model').addEventListener('change', refreshSee);
document.getElementById('set-lead').addEventListener('input', refreshSee);
document.getElementById('set-open-folder').addEventListener('click', () => api.openDataFolder());

api.onConfig((cfg) => {
    if (!cfg) return;
    if (THEME_VALUES.includes(cfg.theme)) {
        themeValue = cfg.theme;
        themeOnOpen = cfg.theme; // 盘上的取值就是「进来时」的取值
        paintThemeSeg();
    }
    // 开机自启：以主进程报回来的系统登录项状态为准
    if (typeof cfg.autoStart === 'boolean') {
        autoSwitch.classList.toggle('on', cfg.autoStart);
        autoSwitch.setAttribute('aria-checked', String(cfg.autoStart));
    }
    refreshSee();
});

api.onDataStats((s) => { dataStats = s; refreshSee(); });

api.onAiStatus((status) => {
    settingsData = status;
    // 模型下拉框：只列**能对话**的模型。
    // 把嵌入模型摆进下拉框，用户选中它就等于亲手把对话打死（400 does not support chat）——
    // 那正是这条问题的一个入口，堵在这里。
    const select = document.getElementById('set-model');
    const all = status.models && status.models.length ? status.models : [];
    const models = Array.isArray(status.chatModels) ? status.chatModels : all; // 旧主进程无此字段则退回全量
    const desc = document.getElementById('set-model-desc');
    select.innerHTML = '';
    if (models.length) {
        models.forEach((m) => {
            const opt = document.createElement('option');
            opt.value = m;
            opt.textContent = m;
            if (m === status.model) opt.selected = true;
            select.appendChild(opt);
        });
        if (status.configuredModel && !models.includes(status.configuredModel)) {
            // 点名说清楚，否则用户看不出「我设的模型为什么没被用上」
            desc.textContent = '配置的 ' + status.configuredModel + ' 不能对话，已回退到 ' + status.model;
        } else if (all.length > models.length) {
            desc.textContent = 'Ollama 在线（已隐藏 ' + (all.length - models.length) + ' 个不能对话的模型）';
        } else {
            desc.textContent = 'Ollama 在线';
        }
    } else {
        const opt = document.createElement('option');
        opt.value = status.model || 'qwen2.5:3b';
        opt.textContent = status.available ? '未检测到可对话的模型' : '未检测到（使用默认 ' + (status.model || 'qwen2.5:3b') + '）';
        select.appendChild(opt);
        desc.textContent = status.available
            ? '本地没有可用于对话的模型，请执行 ollama pull qwen2.5:7b'
            : '未检测到本地模型，请确认 Ollama 已启动';
    }
    // 提醒提前量
    document.getElementById('set-lead').value = status.remindLeadHours || 24;
    // AI 开关（role="switch"，状态与配置同步）
    const aiOn = status.enabled !== false;
    aiSwitch.classList.toggle('on', aiOn);
    aiSwitch.setAttribute('aria-checked', String(aiOn));
    // 显示悬浮球
    const ballOn = status.showBall !== false;
    ballSwitch.classList.toggle('on', ballOn);
    ballSwitch.setAttribute('aria-checked', String(ballOn));
    // 全局快捷键
    shortcutValue = status.shortcut || '';
    shortcutField.value = prettyAccel(shortcutValue);
    shortcutDesc.textContent = SHORTCUT_DESC_DEFAULT;
    refreshSee();
});

// 保存设置
document.getElementById('set-save').addEventListener('click', () => {
    api.saveConfig({
        model: document.getElementById('set-model').value,
        remindLeadHours: draft.lead,
        aiEnabled: aiSwitch.classList.contains('on'),
        showBall: ballSwitch.classList.contains('on'),
        autoStart: autoSwitch.classList.contains('on'),
        shortcut: shortcutValue,
        theme: themeValue,
    });
});

// 保存回执：按注册结果给出诚实提示，再关闭面板
api.onConfigSaved((saved) => {
    const s = saved && saved._shortcut;
    if (s && !s.ok) {
        // 主进程保留了旧键，这里必须说清楚——不能假装保存成功
        shortcutValue = s.registered || '';
        shortcutField.value = prettyAccel(shortcutValue);
        shortcutField.focus(); // 焦点触发的提示文案会覆盖下面这行，所以放在前面
        shortcutDesc.textContent = `「${prettyAccel(s.shortcut)}」已被占用，仍沿用上一个快捷键`;
        refreshSee();
        return;
    }
    closeSettings({ saved: true });
});

document.getElementById('set-close').addEventListener('click', () => closeSettings());
document.getElementById('set-cancel').addEventListener('click', () => closeSettings());


// 窗口拖拽（顶部区域，Pointer Events + 指针捕获）
function attachWindowDrag(el) {
    let isDrag = false, dragSX = 0, dragSY = 0;
    el.addEventListener('pointerdown', (e) => {
        if (e.button !== 0) return;
        // 落在控件里的指针不参与拖窗：一旦 setPointerCapture，click 就改派给捕获元素，
        // 控件自己的 click 根本收不到（这条坑记在 DESIGN.md 里，输入面板为此吃过一次亏）。
        if (e.target.closest('input, select, button, textarea, [role="switch"]')) return;
        isDrag = true;
        dragSX = e.screenX;
        dragSY = e.screenY;
        try { el.setPointerCapture(e.pointerId); } catch (_) {}
        api.dragHomepageStart();
    });
    el.addEventListener('pointermove', (e) => {
        if (!isDrag) return;
        api.dragHomepageMove(e.screenX - dragSX, e.screenY - dragSY);
    });
    const end = (e) => {
        if (!isDrag) return;
        isDrag = false;
        try { el.releasePointerCapture(e.pointerId); } catch (_) {}
        api.dragHomepageEnd();
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
}
attachWindowDrag(document.querySelector('.header'));
// 设置页整屏盖住了 .header：标题行也做成拖拽区，否则进了设置就再也挪不动窗口
attachWindowDrag(document.querySelector('.set-head'));

// Esc：从最内层向上逐层关闭（critique P1：不能按一下就把整窗关掉）
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    // 1) 最内层：设置弹层
    const overlay = document.getElementById('settings-overlay');
    if (overlay.classList.contains('show')) { closeSettings(); return; }
    // 2) 改期内联行（日历弹层）打开 → 只取消改期，不动窗口
    if (dueEditRow) { removeDueEdit(); return; }
    // 3) 输入框聚焦 → 只失焦清草稿缓冲，不关窗
    const input = document.getElementById('input-text');
    if (document.activeElement === input) { input.blur(); return; }
    const chatInput = document.getElementById('chat-input');
    if (document.activeElement === chatInput) { chatInput.blur(); return; }
    // 4) 无编辑面 → 真正收起窗口
    api.closeHomepage();
});

loadData();
// 初始视图 = 仪表盘（隐藏记录/对话面板；数据到达后自动渲染）
setView('dashboard');
