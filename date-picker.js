/**
 * date-picker.js — nanoSecretary 日期选择器（纯原生封装，无运行时依赖）
 *
 * 交互遵循 shadcn/ui「Popover + Calendar」模式：
 *   触发字段（只读，日历图标 + 当前值）→ 点击展开日历弹层 → 选择即回填并关闭。
 *
 * 组成：
 *   本文件            —— 触发字段 / 弹层 / 定位 / 关闭 / ARIA
 *   date-picker-react.js  —— esbuild 产物（React + react-day-picker 的日历本体），
 *                            仅暴露 window.NSDatePickerReact.renderPicker()
 *   date-picker-react.css  —— react-day-picker 基础样式（构建产物）
 *   date-picker.css        —— 本组件专属样式（暖暗主题，与 tokens.css 一致）
 *
 * 日期约定（civil date）：对外一律 yyyy-mm-dd 字符串；
 * 仅在交给 react-day-picker 时转「当地时区正午」Date，绝不 new Date('yyyy-mm-dd')
 * （那会被当 UTC，UTC+8 地区凌晨差一天）。
 *
 * 用法（每个需要日期的地方一行）：
 *   const inst = NSDatePicker.attach({
 *     mount:  '#due-cal',                       // 容器，attach 会生成触发字段
 *     value:  entry.dueDate || null,            // yyyy-mm-dd
 *     onChange(iso) { ... },                    // iso=null 表示已清除
 *     onOpenStateChange(open) { ... },          // 可选：悬浮窗需要 expand
 *     clearable: true,
 *   });
 *   inst.setValue('2026-10-01');                // 外部改值
 *   inst.destroy();                             // 移除监听与触发字段
 */
(function () {
  const pad = (n) => String(n).padStart(2, "0");

  /* ================= civil date 工具 ================= */
  function parseCivil(iso) {
    if (!iso || typeof iso !== "string") return undefined;
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
    if (!m) return undefined;
    return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12, 0, 0, 0);
  }
  function toCivil(d) {
    if (!d || isNaN(d.getTime())) return undefined;
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }
  function localTodayISO() {
    const d = new Date();
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }
  function pretty(iso) {
    if (!iso) return "";
    const d = parseCivil(iso);
    if (!d) return iso;
    const now = new Date();
    const md = `${d.getMonth() + 1}月${d.getDate()}日`;
    return d.getFullYear() === now.getFullYear()
      ? md
      : `${d.getFullYear()}年${md}`;
  }
  /** 今天/明天/后天…之外用 pretty。 */
  function labelFor(iso) {
    if (!iso) return "";
    const t = parseCivil(localTodayISO());
    const d = parseCivil(iso);
    if (!d) return iso;
    const diff = Math.round((d - t) / 86400000);
    if (diff === 0) return "今天";
    if (diff === 1) return "明天";
    if (diff === 2) return "后天";
    if (diff === -1) return "昨天";
    return pretty(iso);
  }
  /** 完整日期：2026年9月4日（触发字段用，语义确定不随今天漂移）。 */
  function fullDate(iso) {
    if (!iso) return "";
    const d = parseCivil(iso);
    if (!d) return iso;
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  }
  /** 完整 ISO + 友好短语义（title 提示用）。 */
  function titleFor(iso) {
    if (!iso) return "";
    const rel = labelFor(iso);
    return rel === pretty(iso) || rel === iso ? iso : `${rel} · ${fullDate(iso)}`;
  }

  /* ================= 弹层单例 ================= */
  let active = null;   // 当前打开的实例
  let popEl = null;
  let hostEl = null;   // React 挂载点

  function ensurePopover() {
    if (popEl) return;
    popEl = document.createElement("div");
    popEl.className = "nsdp-pop";
    popEl.setAttribute("role", "dialog");
    popEl.setAttribute("aria-label", "日期选择");

    hostEl = document.createElement("div");
    hostEl.className = "nsdp-cal-host";
    popEl.appendChild(hostEl);

    document.body.appendChild(popEl);
    // 弹层是单例、长期存在，观测一次即可（不做 open/close 来回 connect）
    if (hostObserver) hostObserver.observe(hostEl);
  }

  function renderCalendar() {
    if (!active || !hostEl || !window.NSDatePickerReact) return;
    const inst = active;
    window.NSDatePickerReact.renderPicker(hostEl, {
      mode: "single",
      value: inst.value || undefined,
      minDate: inst.minDate || undefined,
      onChange: (iso) => {
        // 点选后立即回填并关闭
        inst._apply(iso || null);
      },
    });
  }

  /* ================= 定位弹层 ================= */
  /* 只写 left/top/width —— 绝不动 display。
     旧实现在这里用 `display:none` 收尾来做测量，把「恢复可见」的责任推给调用方；
     而 reposition() 走的正是这条路径，它由宿主在窗口扩张后调用，
     执行时机在 openPop 的双 rAF **之后** —— 于是把刚显示出来的日历又藏掉，
     且全文件再没有任何代码恢复它。
     这台机器是 240Hz（单帧 4.2ms），双 rAF 约 8ms 就跑完，30ms 的定时器必然最后执行，
     所以是「每次点必现」而不是偶发；60Hz 下 rAF #2 约 32ms 反而更晚，结果正常 ——
     这正是此前测不出来的原因。
     现在测量期间不遮挡（offsetHeight 在 display:block 下就是真值，不需要隐藏），
     可见性完全由 openPop / closePop 独占。 */
  function positionPop() {
    const field = active.fieldEl;
    const r = field.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    const popW = 320;
    popEl.style.width = popW + "px";
    let left = Math.round(r.left);
    if (left + popW > vw - 8) left = Math.max(8, vw - popW - 8);
    // 调用方保证 display 已是 block（openPop 置的），否则量到 0
    const popH = popEl.offsetHeight;
    const spaceBelow = vh - r.bottom;
    let top;
    if (spaceBelow >= popH + 6 || spaceBelow >= r.top) {
      top = Math.round(r.bottom + 6);
    } else {
      top = Math.max(8, Math.round(r.top - popH - 6));
    }
    popEl.style.left = left + "px";
    popEl.style.top = top + "px";
  }

  /* 弹层是 position:fixed —— 视口一变就必须重新定位（宿主把小窗临时加高就走这里） */
  window.addEventListener("resize", () => {
    if (active) positionPop();
  });

  /* 内容高度会变：React 是 createRoot().render() 异步提交的，双 rAF 时
     .nsdp-cal-host 可能只是 min-height 的占位高；换月份、字体加载同样会变。
     旧实现靠宿主猜一个固定延迟（setTimeout 30ms）去躲这件事，既躲不过双 rAF 的时序，
     也躲不过 React 的提交时机。改成观测真实尺寸，尺寸一变就重定位，不再猜。 */
  const hostObserver =
    typeof ResizeObserver === "function"
      ? new ResizeObserver(() => {
          if (active) positionPop();
        })
      : null;

  /* ================= 开合 ================= */
  function openPop(inst) {
    ensurePopover();
    active = inst;
    renderCalendar();
    // 告知宿主（例如悬浮球小窗需先临时扩大窗口，日历才放得下）
    if (inst.onOpenStateChange) inst.onOpenStateChange(true);
    // display 归本函数独占：先置 block 让它可量，但用 visibility 遮住 ——
    // 等宿主完成窗口扩张/布局后再揭晓，避免日历被小窗裁剪着闪一下。
    // 绝不再写 display:none（那是旧的测量手法，会被 reposition 复用成「藏起来」）
    popEl.style.display = "block";
    popEl.style.visibility = "hidden";
    inst.fieldEl.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (active !== inst) return;
      positionPop();
      popEl.style.visibility = "";
      // 焦点进日历
      const btn = popEl.querySelector(".rdp-day_button[tabindex='0'], .rdp-day_button");
      if (btn) btn.focus();
      else { const b = popEl.querySelector("button"); if (b) b.focus(); }
    }));
    document.addEventListener("keydown", onKeyDown, true);
  }

  function closePop({ refocus = true } = {}) {
    if (!active) return;
    const inst = active;
    active = null;
    if (popEl) {
      popEl.style.display = "none";
      popEl.style.visibility = "";   // 复位，否则下次 openPop 前的测量窗口会残留隐藏态
    }
    if (inst.fieldEl) inst.fieldEl.setAttribute("aria-expanded", "false");
    document.removeEventListener("keydown", onKeyDown, true);
    if (refocus && inst.fieldEl && inst.fieldEl.isConnected) inst.fieldEl.focus();
    if (inst.onOpenStateChange) inst.onOpenStateChange(false);
  }

  function togglePop(inst) {
    if (active === inst) { closePop(); return; }
    if (active) closePop({ refocus: false });
    openPop(inst);
  }

  function onKeyDown(e) {
    if (!active) return;
    if (e.key === "Escape") {
      // 与 shadcn Popover 一致：Esc 关闭；stopPropagation 避免外层「Esc 收起输入窗」同时触发
      e.preventDefault();
      e.stopPropagation();
      closePop();
    }
    // 其余键（方向/PageUp/PageDown/Home/End…）由 react-day-picker 自行处理，这里不拦截
  }

  /* 点外部关闭：mousedown 阶段判断，避免和日历点选冲突 */
  document.addEventListener("pointerdown", (e) => {
    if (!active) return;
    if (popEl && popEl.contains(e.target)) return;    // 弹层内不关
    if (active.fieldEl && active.fieldEl.contains(e.target)) return; // 字段内不关（click 负责 toggle）
    closePop({ refocus: false });
  }, true);

  /* ================= 实例构造 ================= */
  const instances = new Map(); // mountEl -> instance

  function attach(opts) {
    const mountEl =
      typeof opts.mount === "string" ? document.querySelector(opts.mount) : opts.mount;
    if (!mountEl) return null;
    if (instances.has(mountEl)) return instances.get(mountEl);

    const inst = {
      mountEl,
      value: opts.value || null,
      minDate: opts.minDate || null,
      placeholder: opts.placeholder || "选择日期",
      clearable: opts.clearable !== false,
      onChange: opts.onChange || function () {},
      onOpenStateChange: opts.onOpenStateChange || null,
    };

    // ---- 构建触发字段：外层 span 容纳 [主按钮] + [清除×] ----
    const wrap = document.createElement("span");
    wrap.className = "nsdp-field-wrap";

    const fieldEl = document.createElement("button");
    fieldEl.type = "button";
    fieldEl.className = "nsdp-field";
    fieldEl.setAttribute("aria-haspopup", "dialog");
    fieldEl.setAttribute("aria-expanded", "false");
    if (opts.id) fieldEl.id = opts.id;
    fieldEl.setAttribute("aria-label", opts.ariaLabel || opts.placeholder || "选择日期");
    fieldEl.innerHTML =
      '<span class="nsdp-field-icon">' + calIcon() + "</span>" +
      '<span class="nsdp-field-value"></span>';
    wrap.appendChild(fieldEl);
    inst.fieldEl = fieldEl;

    // 清除按钮（有值才显示）
    let clearEl = null;
    if (inst.clearable) {
      clearEl = document.createElement("button");
      clearEl.type = "button";
      clearEl.className = "nsdp-clear";
      clearEl.setAttribute("tabindex", "-1");
      clearEl.setAttribute("aria-label", "清除日期");
      clearEl.innerHTML = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" shape-rendering="crispEdges" aria-hidden="true"><path d="M6 6l12 12 M18 6L6 18"/></svg>';
      clearEl.addEventListener("click", (e) => {
        e.stopPropagation();
        inst._apply(null);
      });
      wrap.appendChild(clearEl);
    }
    inst.clearEl = clearEl;
    mountEl.appendChild(wrap);
    inst.wrapEl = wrap;

    function renderValue() {
      const valEl = fieldEl.querySelector(".nsdp-field-value");
      if (!valEl) return;
      valEl.textContent = inst.value ? fullDate(inst.value) : inst.placeholder;
      valEl.title = inst.value ? titleFor(inst.value) : "";
      fieldEl.title = inst.value ? titleFor(inst.value) : (opts.ariaLabel || "");
      valEl.classList.toggle("empty", !inst.value);
      fieldEl.classList.toggle("has-value", !!inst.value);
      wrap.classList.toggle("has-value", !!inst.value);
    }
    renderValue();

    inst._apply = function (iso) {
      inst.value = iso;
      renderValue();
      inst.onChange && inst.onChange(iso);
      closePop();
    };

    fieldEl.addEventListener("click", () => {
      togglePop(inst);
    });
    fieldEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        togglePop(inst);
      }
    });

    const api = {
      setValue(iso) { inst.value = iso || null; renderValue(); if (active === inst) renderCalendar(); },
      getValue() { return inst.value; },
      open() { openPop(inst); },
      close() { closePop(); },
      // 幂等、安全：只重算 left/top，任何时刻调都不会改变弹层的可见性
      reposition() { if (active === inst) positionPop(); },
      destroy() {
        if (active === inst) closePop();
        if (inst.wrapEl) inst.wrapEl.remove();
        instances.delete(mountEl);
      },
      el: fieldEl,
    };
    instances.set(mountEl, api);

    // 需要挂载即展开（改期流程：点击「改期」直接出日历）
    if (opts.autoOpen) {
      requestAnimationFrame(() => openPop(inst));
    }
    return api;
  }

  /* 图标：与 icons.js 同一套合同（24×24 / stroke-width 2 / 方头 / crispEdges），
     复制最小 SVG 以避免依赖 icons.js 的加载顺序。
     显示尺寸锁 12px —— 24 格映射到 12px 时 1 格 = 0.5px，2 格描边正好落在 1px 整数像素上；
     原来的 14px + 1.8px 圆头是旧世界的残留，非整数倍会重采样发糊。 */
  function calIcon() {
    return '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter" shape-rendering="crispEdges" aria-hidden="true"><path d="M4 5h16v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5z M8 3v4 M16 3v4 M4 10h16"/></svg>';
  }

  window.NSDatePicker = {
    attach,
    pretty,
    fullDate,
    titleFor,
    labelFor,
    localTodayISO,
    parseCivil,
    toCivil,
    close: closePop,
  };
})();
