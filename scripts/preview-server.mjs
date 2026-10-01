/**
 * preview-server.mjs — 【仅开发期】把主页面放进浏览器里看的静态预览器。
 *
 * 为什么需要它：主页面是 Electron 无边框窗，浏览器预览工具够不着；而这轮改的
 * 是纯 CSS/HTML，用真浏览器截图验收最直接。这个服务只做两件事：
 *
 *   1. 发 homepage.html 时，在 homepage.js **之前**插一行 preview-mock.js
 *      （同源脚本，过得了页面 CSP 的 script-src 'self'），给页面一个假的
 *      window.api，让它能渲染出环图/图例/数据行/标签的真实形态。
 *   2. 发 tokens.css 时，把里面亮/暗两套 token 各复制一份挂到
 *      [data-preview-theme="light"|"dark"] 下，好让设置面板里点主题能真翻
 *      （而不是给预览另造一套假样式）。属性选择器优先级高于 :root，
 *      所以设了属性就以属性为准，没设就照旧跟随系统 prefers-color-scheme。
 *
 * homepage.html / index.html / history.html / notes.html 磁盘文件本身不含
 * 任何预览专用代码，注入只发生在 HTTP 响应里，生产路径零污染。本文件不进 pack.bat。
 *
 *   node scripts/preview-server.mjs [port]
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PORT = Number(process.argv[2]) || 3158;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
};

/** 取出 `head` 之后第一个 `{` 配对到的那段原文（含花括号），配对失败返回 null。
 *  只为拆 tokens.css 的两个块用，不追求通用 CSS 解析。 */
function extractBlock(css, head) {
  const start = css.indexOf(head);
  if (start < 0) return null;
  const open = css.indexOf('{', start + head.length);
  if (open < 0) return null;
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') {
      depth--;
      if (depth === 0) return { body: css.slice(open + 1, i), end: i };
    }
  }
  return null;
}

/** tokens.css → 追加两段把亮/暗 token 挂到 data-preview-theme 上的规则。
 *  两段都是从原文件里**原样抽出**的，色板只有一份，不会漂移。 */
async function themedCss() {
  const raw = await readFile(join(ROOT, 'tokens.css'), 'utf8');
  const light = extractBlock(raw, ':root');
  const dark = extractBlock(raw, '@media (prefers-color-scheme: dark)');
  const darkInner = dark && extractBlock(dark.body, ':root');
  if (!light || !darkInner) {
    console.warn('[preview] 未能从 tokens.css 拆出亮/暗 token —— 主题预览不可用，其余照常');
    return raw;
  }
  return `${raw}

/* ---- 以下由 scripts/preview-server.mjs 在响应时追加，不在磁盘文件里 ---- */
html[data-preview-theme="light"] {${light.body}}
html[data-preview-theme="dark"] {${darkInner.body}}
`;
}

const HTML_INJECT = {
  'homepage.html': {
    from: '    <script src="homepage.js"></script>',
    to: '    <script src="scripts/preview-mock.js"></script>\n    <script src="homepage.js"></script>',
  },
  // 悬浮球窗：窗口按真实尺寸只有 420×190 / 120×120，预览时把视口调到同尺寸再截图
  'index.html': {
    from: '    <script src="index.js"></script>',
    to: '    <script src="scripts/preview-mock-index.js"></script>\n    <script src="index.js"></script>',
  },
  // 历史页：窗口 720×820，正常尺寸，直接开就行
  'history.html': {
    from: '    <script src="history.js"></script>',
    to: '    <script src="scripts/preview-mock.js"></script>\n    <script src="history.js"></script>',
  },
  'notes.html': {
    from: '    <script src="notes.js"></script>',
    to: '    <script src="scripts/preview-mock.js"></script>\n    <script src="notes.js"></script>',
  },
};

const server = createServer(async (req, res) => {
  const url = decodeURIComponent((req.url || '/').split('?')[0]);
  const rel = url === '/' ? 'homepage.html' : url.replace(/^\/+/, '');

  // 防目录穿越：规范化后必须仍在项目根内
  const target = normalize(join(ROOT, rel));
  if (!target.startsWith(ROOT.endsWith(sep) ? ROOT : ROOT + sep)) {
    res.writeHead(403).end('forbidden');
    return;
  }

  try {
    let body = await readFile(target);
    const type = MIME[extname(target).toLowerCase()] || 'application/octet-stream';

    const inject = HTML_INJECT[rel];
    if (inject) {
      const html = body.toString('utf8');
      if (!html.includes(inject.from)) {
        console.warn(`[preview] ${rel} 里找不到注入锚点，mock 未注入`);
      }
      body = Buffer.from(html.replace(inject.from, inject.to), 'utf8');
    } else if (rel === 'tokens.css') {
      body = Buffer.from(await themedCss(), 'utf8');
    }

    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' }).end(body);
  } catch (e) {
    const code = e.code === 'ENOENT' ? 404 : 500;
    if (code === 500) console.error('[preview]', e);
    res.writeHead(code, { 'Content-Type': 'text/plain; charset=utf-8' })
      .end(code === 404 ? `not found: ${rel}` : 'internal error');
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[preview] 主页面静态预览 → http://localhost:${PORT}`);
  console.log('[preview] 这是开发期替身，不是真实应用（无 Electron 主进程、无本地模型）');
});
