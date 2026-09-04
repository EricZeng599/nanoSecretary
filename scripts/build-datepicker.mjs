/**
 * build-datepicker.mjs — 把 React + react-day-picker 编译为静态产物：
 *   date-picker-react.js   （IIFE，仅挂 NSDatePickerReact）
 *   date-picker-react.css  （react-day-picker/dist/style.css，提取）
 *   scripts/build-datepicker.mjs 的本地依赖：需 node_modules 里有
 *   react / react-dom / react-day-picker / date-fns / @date-fns/tz / scheduler。
 *
 * 用法：node scripts/build-datepicker.mjs
 * 产物提交进仓库；改 date-picker 交互只在 src/ 下手写（date-picker.js），无需重跑。
 */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// 找到本机 esbuild 平台二进制（@esbuild/<platform>-<arch>）。包结构随 esbuild 版本演变：
//   新版直接把 esbuild(.exe) 放在包根（esbuild 0.25+）；
//   旧版在 bin/ 子目录（esbuild ≤0.24）。两处都试，先新后旧。
// 不能用 node 跑（原生 ELF），也不能靠 .bin shim 的 require.resolve（可能解析到 JS 包装），
// 直接拼路径。依赖 npm 会装 @esbuild/<platform>-<arch> 到项目 node_modules。
const esbuildCandidates = [
  path.join(ROOT, 'node_modules', '@esbuild', `${process.platform}-${process.arch}`, `esbuild${process.platform === 'win32' ? '.exe' : ''}`),
  path.join(ROOT, 'node_modules', '@esbuild', `${process.platform}-${process.arch}`, 'bin', 'esbuild'),
];
const esbuildBin = esbuildCandidates.find((p) => fs.existsSync(p));
if (!esbuildBin) {
  console.error('[build-datepicker] 未找到 esbuild 平台二进制（已试：\n  ' + esbuildCandidates.join('\n  ') + '）');
  process.exit(1);
}

const entry = path.join(ROOT, 'scripts', 'src', 'entry.jsx');
const outJs = path.join(ROOT, 'date-picker-react.js');

// 日历基础 CSS 由 esbuild 从 entry 里的 import 'react-day-picker/dist/style.css' 抽取为 date-picker-react.css。
function run() {
  console.log('[build-datepicker] bundling React calendar → date-picker-react.js + date-picker-react.css');
  const r = spawnSync(
    esbuildBin,
    [entry, '--bundle',
      `--outfile=${outJs}`,
      '--format=iife', '--jsx=automatic', '--loader:.js=jsx',
      '--preserve-symlinks', '--log-level=warning',
      '--minify-syntax',
      '--define:process.env.NODE_ENV="production"'],
    { stdio: 'inherit' },
  );
  if (r.status !== 0) process.exit(r.status || 1);
  console.log('[build-datepicker] done.');
}

run();
