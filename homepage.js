/**
 * homepage.js — 主页面（nanoSecretary）
 * 通过全局标识符 api 访问（contextBridge 注入）；不要用 const api = window.api 重复声明。
 */
let allEntries = [];
let chatHistory = [];
let currentView = 'dashboard'; // 当前视图（默认仪表盘）

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

/** 绘制单段进度环。ratio∈[0,1]。返回 svg 字符串。 */
function ringSVG(ratio, color, trackColor, size, stroke) {
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const filled = Math.max(0, Math.min(1, ratio)) * c;
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${trackColor}" stroke-width="${stroke}"/>
        <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}"
            stroke-linecap="round" stroke-dasharray="${filled.toFixed(1)} ${c.toFixed(1)}"
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
        parts += `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${seg.color}" stroke-width="${stroke}"
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
    const pending = entries.filter((e) => e.status === 'pending');
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
    // 其余待办 = 未来到期(>明后天) + 无日期；四段恒等于全部 pending（P0-1 不低报）
    const restN = pending.length - overdueN - todayDueN - dueSoonN;
    // 近7天完成（含今天，rolling）
    const since = todayLocalDate(); since.setDate(since.getDate() - 6);
    const done7N = done.filter((e) => {
        const t = e.doneAt ? new Date(e.doneAt) : (e.dueDate ? new Date(e.dueDate + 'T00:00:00') : null);
        return t && t >= since && t <= new Date();
    }).length;

    const attBox = document.getElementById('ring-attention');
    if (attBox) {
        // 四段 = 逾期(热红 #f0716a) / 今天(强调赭橙) / 明后天(轻橙) / 其余(描边色弱段)。
        // 四段之和恒等于全部 pending（P0-1 不低报）；done7N 属「已完成」轴，不混进「待处理」环。
        const segs = [
            { ratio: overdueN, color: 'var(--status-danger-text)' },
            { ratio: todayDueN, color: 'var(--status-warning-strong)' },
            { ratio: dueSoonN, color: 'var(--status-warning)' },
            { ratio: restN, color: 'var(--border-soft)' },
        ];
        attBox.innerHTML = multiRingSVG(segs, 'var(--border-soft)', 124, STROKE);
        let center = attBox.querySelector('.ring-center');
        if (!center) { center = document.createElement('div'); center.className = 'ring-center'; attBox.appendChild(center); }
        center.innerHTML = `<div class="big">${pending.length}</div><div class="sub">待处理</div>`;
    }
    const legend = document.getElementById('attention-legend');
    if (legend) {
        legend.innerHTML = `<div class="row"><span class="swatch" style="background:var(--status-danger-text)"></span>逾期<span class="n">${overdueN}</span></div>
            <div class="row"><span class="swatch" style="background:var(--status-warning-strong)"></span>今天<span class="n">${todayDueN}</span></div>
            <div class="row"><span class="swatch" style="background:var(--status-warning)"></span>明后天<span class="n">${dueSoonN}</span></div>`
            + (restN > 0 ? `<div class="row"><span class="swatch" style="background:var(--border-soft)"></span>其余待办<span class="n">${restN}</span></div>` : '')
            + `<div class="row done-note">近7天完成<span class="n">${done7N}</span></div>`;
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
            ? ringSVG(0, 'transparent', 'var(--border-soft)', 84, STROKE)
            : ringSVG(todayDone.length / totalToday, 'var(--action-primary)', 'var(--border-soft)', 84, STROKE);
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
            nextBox.onclick = () => focusEntry(nx.id);
        } else {
            nextBox.style.display = 'none';
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
        chipsEl.innerHTML = '<div class="dash-empty">没有待办</div>';
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

/** 进记录视图并定位到指定条目，短暂高亮（下一件跳转用）。 */
function focusEntry(id) {
    setTodoFilter(null); // 确保目标一定在列表中（不被无关 tag 筛掉）
    goRecords();
    requestAnimationFrame(() => {
        const el = document.querySelector(`.entry-item[data-id="${id}"]`);
        if (!el) return;
        el.scrollIntoView({ block: 'center', behavior: 'smooth' });
        el.classList.add('flash');
        setTimeout(() => el.classList.remove('flash'), 1400);
    });
}

/** 应用/清除待办 tag 筛选，并刷新列表与筛选条。tag=null 表示清除。 */
function setTodoFilter(tag) {
    todoFilterTag = tag;
    const bar = document.getElementById('todo-filter');
    const tagEl = document.getElementById('todo-filter-tag');
    if (bar && tagEl) {
        bar.hidden = !tag;
        if (tag) tagEl.textContent = '#' + tag;
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

// 可点击仪表盘卡：主卡(关注)、今日卡、本周卡 → 进记录视图（键盘可用，Enter/Space）
function bindDashCardNav() {
    const cardIds = ['card-attention', 'card-today', 'card-week'];
    const handler = (target) => (e) => {
        // 点击到子交互（如今日卡里的「下一件」）时不重复导航
        if (e.target.closest('.next-todo') || e.target.closest('.tag-chip') || e.target.closest('.tag-reveal')) return;
        if (e.key && e.key !== 'Enter' && e.key !== ' ') return;
        if (e.key === ' ') e.preventDefault();
        goRecords();
    };
    for (const id of cardIds) {
        const el = document.getElementById(id);
        if (el) { el.addEventListener('click', handler(el)); el.addEventListener('keydown', handler(el)); }
    }
    // 「下一件」是卡内子交互：自身的 role="button"（键盘 Enter/Space 也进记录）
    const next = document.getElementById('today-next');
    if (next) {
        next.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            e.preventDefault(); e.stopPropagation();
            goRecords();
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
        .filter((e) => e.status === 'pending')
        .sort((a, b) => (a.dueDate || '9999') < (b.dueDate || '9999') ? -1 : 1);
    // 应用来自仪表盘 tag 芯片的筛选（action-first）
    if (todoFilterTag) {
        todos = todos.filter((e) => {
            const set = new Set([...(e.tags || []), e.category].filter(Boolean));
            return set.has(todoFilterTag);
        });
    }
    document.getElementById('record-count').textContent = todos.length ? '(' + todos.length + ')' : '';

    if (!todos.length) {
        list.innerHTML = todoFilterTag
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
                ${e.priority === '高' ? `<span class="priority-high">${ic('fire', 'inline')}高优先级</span>` : e.priority === '中' ? `<span class="priority-mid">中</span>` : ''}
                ${e.category ? `<span class="cat">${esc(e.category)}</span>` : ''}
            </div>
            <div class="entry-actions">
                <button class="done-btn" type="button" data-action="done" data-id="${e.id}">${ic('check', 'inline')}完成</button>
                <button type="button" data-action="reschedule" data-id="${e.id}">${ic('edit', 'inline')}改期</button>
            </div>
        </div>`;
    }).join('');
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
                <span>${esc(formatTime(e.created))}</span>
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
    // 找到对应的卡片元素，先做完成动效再刷新（reduced-motion 时跳过动效）
    const card = document.querySelector(`.entry-item[data-id="${id}"]`);
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (card && !reduced) {
        card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.96) translateX(8px)';
    }
    api.markDone(id, done);
    setTimeout(loadData, reduced ? 20 : 280); // 等动效播完再刷新
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
api.onEntries((entries) => { allEntries = entries || []; renderTodos(); renderDashboard(); });
api.onAiRefined(() => setTimeout(loadData, 400));
api.onSaveSuccess(() => {});
api.onEntryUpdated(() => setTimeout(loadData, 150));
// 任意窗口数据变更 → 刷新
api.onEntriesChanged((entries) => {
    allEntries = entries || [];
    renderTodos();
    renderDashboard();
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
    aiStatus.title = '';
    api.sendChat(chatHistory);
}
api.onChatReply((reply) => {
    chatHistory.push({ role: 'assistant', content: reply });
    appendChat('ai', reply);
    const el = document.getElementById('ai-status');
    el.textContent = 'AI 在线';
    el.title = '';
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
        el.textContent = 'AI 在线';
        el.title = status.model || ''; // 完整模型号放 tooltip，避免淹没头部
        el.className = 'ai-status online';
    } else {
        el.textContent = 'AI 离线';
        el.title = 'Ollama 未启动';
        el.className = 'ai-status offline';
    }
});

// 底部按钮
document.getElementById('history-button').addEventListener('click', () => api.openHistory());
document.getElementById('sticky-button').addEventListener('click', () => api.openSticky());
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
