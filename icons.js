/**
 * icons.js — 统一图标集（nanoSecretary）
 *
 * 像素打印终端语言下的图标规格：
 *   · 24×24 viewBox，stroke-width 2 —— **显示尺寸取 12 / 24 / 36px**。
 *     24 格映射到 12px 时 1 格 = 0.5px，2 格描边正好 1px，落在整数像素上才锐利；
 *     14px 这类非整数倍会把描边重采样成 1.17px，糊。与点阵字体同一条网格纪律。
 *   · stroke-linecap: square / stroke-linejoin: miter —— 方头方角，无圆头。
 *   · shape-rendering: crispEdges —— 关掉抗锯齿。圆弧因此呈阶梯状，
 *     这正是「点阵打印机画圆」的样子，是想要的效果，不是缺陷。
 *   · 所有坐标取整数，端点不贴边（方头会向外多出半个描边宽）。
 *
 * 用法：window.nanoIcons.ic('calendar') 返回 SVG 字符串。
 * 颜色继承 currentColor，由使用处的 CSS 控制。
 */
const ICON_PATHS = {
    // 记录 / 待办
    'note': 'M6 3h9l4 4v13H6z M15 3v4h4',
    'pin': 'M8 3h8l-2 6 3 3H7l3-3-2-6z M12 12v8',
    'todo': 'M4 6h16 M4 12h16 M4 18h8 M14 17l2 2 3-3',
    'fire': 'M12 3c3 3 5 5 5 9a5 5 0 0 1-10 0c0-2 1-4 2-5.5C10 8 11 9.5 12 3z M10 17a2 2 0 0 0 4 0c0-1.5-1-2.5-2-4',
    'clock': 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 7v5l3 2',
    'calendar': 'M4 5h16v15H4z M8 3v4 M16 3v4 M4 10h16',
    'tag': 'M20 12l-8 8-9-9V4h7l10 8z M7 6h4v4H7z',
    'chat': 'M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5z',
    'book': 'M5 4h12a2 2 0 0 1 2 2v13H7a2 2 0 0 0-2 2V4z M19 19H7a2 2 0 0 1 0-4h12',
    // 操作
    'check': 'M5 12l5 5L20 7',
    'check-circle': 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M8 12l3 3 5-6',
    'restore': 'M4 4v6h6 M4 10a8 8 0 1 1-1 5 M20 20v-6h-6',
    'trash': 'M4 7h16 M9 7V5h6v2 M6 7l1 14h10l1-14 M10 11v6 M14 11v6',
    'edit': 'M12 20h9 M17 3l4 4L8 20l-5 1 1-5L17 3z',
    'copy': 'M9 5h11v11H9z M5 9h4v10H5z',
    'close': 'M6 6l12 12 M18 6L6 18',
    'diamond': 'M12 4l6 8-6 8-6-8 6-8z',
    // 导航 / 状态
    'chevron-right': 'M9 6l6 6-6 6',
    'settings': 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7 7 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2L10 21h4l.5-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.06-.4.1-.8.1-1.2z',
    'dots': 'M5 11h2v2H5z M11 11h2v2H11z M17 11h2v2H17z',
};

window.nanoIcons = {
    ic(name, cls) {
        const d = ICON_PATHS[name] || ICON_PATHS.note;
        return `<svg class="icon ${cls || ''}" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter" shape-rendering="crispEdges" aria-hidden="true" focusable="false"><path d="${d}"/></svg>`;
    },
};
