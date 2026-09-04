/**
 * picker.jsx — nanoSecretary 日期选择器（构建入口，esbuild 产物 → date-picker.js）
 *
 * 遵循 shadcn/ui 的「Popover + Calendar」模式，日历本体用 react-day-picker。
 * 只负责日期选择本身；弹层视觉、触发字段等是另一个职责（由 NSDatePicker 原生封装负责）。
 *
 * 日期一律按「民用日 civil date」处理：内部始终是 yyyy-mm-dd 字符串，
 * 仅在交给 react-day-picker 时转成当地时区的 Date（new Date(y, m-1, d)），
 * 绝不用 Date-as-UTC 解析，避免经典的差一天 bug。
 *
 * React 只为内部使用，不暴露到全局。
 */
import * as React from "react";
import { createRoot } from "react-dom/client";
import { DayPicker } from "react-day-picker";
import { zhCN } from "date-fns/locale";

/* ---------- civil date 工具 ---------- */
const pad = (n) => String(n).padStart(2, "0");

/** yyyy-mm-dd（当地时区，绝不走 UTC） → local Date（正午，避开 DST 边界）。 */
function parseCivil(iso) {
  if (!iso || typeof iso !== "string") return undefined;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return undefined;
  const [, y, mo, d] = m;
  return new Date(Number(y), Number(mo) - 1, Number(d), 12, 0, 0, 0);
}

/** local Date → yyyy-mm-dd（用 getFullYear/getMonth/getDate，不用 toISOString）。 */
function toCivil(d) {
  if (!d || isNaN(d.getTime())) return undefined;
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** 友好显示：今年只显「M月d日」，跨年显「yyyy年M月d日」。 */
function pretty(iso) {
  if (!iso) return "";
  const d = parseCivil(iso);
  if (!d) return iso;
  const now = new Date();
  const md = `${d.getMonth() + 1}月${d.getDate()}日`;
  return d.getFullYear() === now.getFullYear() ? md : `${d.getFullYear()}年${md}`;
}

/* ---------- React 封装的 DayPicker（shadcn 风格 Calendar） ---------- */
function CalendarRoot({ value, mode = "single", onSelect, minDate }) {
  return (
    <DayPicker
      mode={mode}
      selected={value}
      onSelect={onSelect}
      locale={zhCN}
      weekStartsOn={1}
      defaultMonth={value && value.from ? value.from : (value || undefined)}
      autoFocus
      showOutsideDays
      disabled={minDate ? { before: minDate } : undefined}
      fixedWeeks={false}
    />
  );
}

/** 选择面板：单日 / 区间（range 预留，规则同 shadcn：start/middle/end 修饰） */
function PickerPanel(props) {
  const {
    value,          // 单日：iso 字符串；区间：{from,to}
    onChange,       // 收到完整选择就通知外层（iso / {from,to}，均为 undefined 表示清空）
    minDate,        // 可选 yyyy-mm-dd，早于它的日期禁用
    mode = "single",
  } = props;

  const handleSelect = React.useCallback(
    (sel) => {
      if (mode === "single") {
        onChange(sel ? toCivil(sel) : undefined);
      } else {
        const r = sel && sel.from ? { from: toCivil(sel.from), to: sel.to ? toCivil(sel.to) : undefined } : undefined;
        onChange(r);
      }
    },
    [mode, onChange],
  );

  const selected = React.useMemo(() => {
    if (mode === "single") return parseCivil(value);
    const r = value && (value.from || value.to) ? value : undefined;
    return r && r.from ? { from: parseCivil(r.from), to: r.to ? parseCivil(r.to) : undefined } : undefined;
  }, [mode, value]);

  return (
    <div className="nsdp-cal" data-mode={mode}>
      <CalendarRoot
        value={selected}
        mode={mode}
        onSelect={handleSelect}
        minDate={minDate ? parseCivil(minDate) : undefined}
      />
    </div>
  );
}

/* ---------- 挂载 API（供 date-picker.js 调用） ---------- */
const roots = new Map(); // container -> root

/** 把 PickerPanel 渲染进某个容器。每次都重渲（配置最新）。 */
export function renderPicker(container, config) {
  let root = roots.get(container);
  if (!root) {
    root = createRoot(container);
    roots.set(container, root);
  }
  root.render(
    <PickerPanel
      mode={config.mode || "single"}
      value={config.value}
      minDate={config.minDate}
      onChange={(v) => {
        config.onChange && config.onChange(v);
      }}
    />,
  );
  return () => {
    const r = roots.get(container);
    if (r) {
      r.unmount();
      roots.delete(container);
    }
  };
}
