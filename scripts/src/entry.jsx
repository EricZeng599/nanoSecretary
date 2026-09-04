/**
 * entry.jsx — 构建入口：把 React 日历渲染 API 挂到全局，供纯原生 wrapper 调用。
 * 产物（date-picker-react.js + date-picker-react.css）由 scripts/build-datepicker.mjs 生成。
 */
import { renderPicker } from './picker.jsx';
// react-day-picker v10 通过子路径导出样式（v9 的 dist/style.css 已不存在）
import 'react-day-picker/style.css';

globalThis.NSDatePickerReact = { renderPicker };
