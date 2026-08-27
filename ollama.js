/**
 * ollama.js — 本地 AI 秘书集成模块
 *
 * 封装 Ollama 本地 HTTP API（默认 http://127.0.0.1:11434），提供：
 *   - parseEntry(text)      提取待办内容 + 截止日期 + 优先级
 *   - classifyEntry(text)   自动分类（工作/生活/购物/学习/其他）
 *   - generateReminder(entry) 生成一句自然的提醒文案
 *   - chatReply(history)    对话式交互
 *   - isAvailable()         探测模型是否可用
 *
 * 所有函数都做了优雅降级：模型不可用时返回 null / 正则兜底，
 * 保证核心速记功能永远可用。
 */

const { spawn } = require('child_process');

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';
// 默认模型：qwen2.5 3b，兼顾中文理解能力和轻量（可在配置中改）
let MODEL = process.env.OLLAMA_MODEL || 'qwen2.5:3b';
const REQUEST_TIMEOUT = 20000; // 单次请求超时 20s

/** 简单的超时封装 */
async function fetchWithTimeout(url, options = {}, timeoutMs = REQUEST_TIMEOUT) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

/** 更新模型名（从配置读取） */
function setModel(model) {
  if (model && typeof model === 'string') MODEL = model;
}

/** 探测 Ollama 服务是否可用 */
async function isAvailable() {
  try {
    const res = await fetchWithTimeout(`${OLLAMA_HOST}/api/tags`, {}, 3000);
    return res.ok;
  } catch {
    return false;
  }
}

/** 列出本地已安装模型（用于设置页展示/选择） */
async function listModels() {
  try {
    const res = await fetchWithTimeout(`${OLLAMA_HOST}/api/tags`, {}, 3000);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.models || []).map((m) => m.name);
  } catch {
    return [];
  }
}

/**
 * 调用 Ollama 生成文本。
 * 传入系统提示词 + 用户消息，返回纯文本回复；失败/超时返回 null。
 */
async function generate(systemPrompt, userPrompt, options = {}) {
  const { format = null, temperature = 0.2 } = options;
  try {
    const body = {
      model: MODEL,
      system: systemPrompt,
      prompt: userPrompt,
      stream: false,
      temperature,
    };
    if (format) body.format = format;

    const res = await fetchWithTimeout(`${OLLAMA_HOST}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return (data.response || '').trim() || null;
  } catch {
    return null;
  }
}

/** 从 AI 返回的 JSON 字符串里稳妥地抠出 JSON（容忍围栏、前后废话） */
function extractJson(raw) {
  if (!raw) return null;
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1] : raw;
  const start = candidate.indexOf('{');
  const end = candidate.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(candidate.slice(start, end + 1));
  } catch {
    return null;
  }
}

/* ---------------- 日期解析工具 ---------------- */

const WEEK_MAP = { 日: 0, 天: 0, 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6 };

/** 把字符串转成 YYYY-MM-DD（本地日期），失败返回 null */
function toISODate(d) {
  if (!d) return null;
  if (typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  const date = new Date(d);
  if (isNaN(date.getTime())) return null;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** 核心：把中文日期表达解析为 YYYY-MM-DD */
function parseChineseDate(text) {
  if (!text) return null;
  const now = new Date();
  const year = now.getFullYear();

  // 1. 明确日期：2026年9月1日 / 2026-09-01 / 2026/09/01 / 9月1日
  const explicit =
    /(\d{4})[年/\-.](\d{1,2})[月/\-.](\d{1,2})日?/.exec(text) ||
    /(\d{4})-(\d{1,2})-(\d{1,2})/.exec(text);
  if (explicit) {
    return toISODate(new Date(+explicit[1], +explicit[2] - 1, +explicit[3]));
  }
  // 今年内日期：9月1日
  const monthDay = /(\d{1,2})月(\d{1,2})[日号]?/.exec(text);
  if (monthDay) {
    return toISODate(new Date(year, +monthDay[1] - 1, +monthDay[2]));
  }

  // 2. 明天 / 后天 / 今天
  if (/后天/.test(text)) {
    const d = new Date(now); d.setDate(d.getDate() + 2); return toISODate(d);
  }
  if (/明天/.test(text)) {
    const d = new Date(now); d.setDate(d.getDate() + 1); return toISODate(d);
  }
  if (/(今天|今日|今晚|今天?下午|今天?晚上|现在)/.test(text)) return toISODate(now);

  // 3. 周X / 星期X：下周三 / 这个周五 / 本周六
  const weekMatch = /(下|这|本|上)?(?:周|星期)([一二三四五六日天两])/.exec(text);
  if (weekMatch) {
    const target = WEEK_MAP[weekMatch[2]];
    if (target !== undefined) {
      const pref = weekMatch[1];
      const d = new Date(now);
      const todayIdx = d.getDay();
      const diff = target - todayIdx;
      if (pref === '下') {
        // 下X：如果目标日在本周内（含今天）就推到下一周；否则下周内该目标日
        const base = (diff + 7) % 7 || 7;
        d.setDate(d.getDate() + base);
      } else if (pref === '上') {
        const base = (diff + 7) % 7; // 本周内该目标日（允许今天）
        d.setDate(d.getDate() + base - 7);
      } else {
        // 这/本/无前缀：本周内最近的目标日（今天也算）
        const base = (diff + 7) % 7;
        d.setDate(d.getDate() + base);
      }
      return toISODate(d);
    }
  }

  // 4. N天后 / N天以内 / N天内
  const dayCount = /(\d+)\s*天(?:后|之内|以内|内|以后)/.exec(text);
  if (dayCount) {
    const d = new Date(now); d.setDate(d.getDate() + +dayCount[1]); return toISODate(d);
  }
  // "下周"（不带具体星期）→ 下周一
  if (/下周/.test(text)) {
    const d = new Date(now);
    d.setDate(d.getDate() + ((8 - d.getDay()) % 7 || 7));
    return toISODate(d);
  }
  return null;
}

/** 正则兜底：从文本里抠截止日期（AI 不可用时用） */
function fallbackParse(text) {
  return parseChineseDate(text);
}

/* ---------------- 智能解析：待办 + 截止日期 + 优先级 ---------------- */

const PARSE_SYSTEM = `你是"赛博秘书"的意图解析器。用户会随手记录一段话，可能包含待办事项和截止时间。
请从文本中提取结构化信息，只输出 JSON，格式：
{"title":"简短的任务标题(去除时间词)","dueDate":"YYYY-MM-DD 或 null(没有截止日期)","priority":"高|中|低","type":"task|note"}
规则：
- 若内容是待办/任务（含有要做的事），type 为 task；纯信息记录 type 为 note。
- dueDate 仅当文本包含明确或可推断的日期（如"明天""下周三""9月1日""3天后"）时才填，否则 null。
- 优先级：紧急/尽快/今天=高；下周内/几天后=中；其他=低。
- title 用简洁中文，去掉日期和时间词。`;

/**
 * 解析一条记录。返回：
 * { title, dueDate, priority, type }；AI 失败时用正则兜底。
 */
async function parseEntry(text) {
  const raw = await generate(PARSE_SYSTEM, text, { temperature: 0 });
  const parsed = extractJson(raw);
  if (parsed && (parsed.title || parsed.dueDate || parsed.type)) {
    const due = parsed.dueDate && parsed.dueDate !== 'null' ? toISODate(parsed.dueDate) : null;
    return {
      title: (parsed.title || text).slice(0, 200),
      dueDate: due,
      priority: ['高', '中', '低'].includes(parsed.priority) ? parsed.priority : '低',
      type: parsed.type === 'task' ? 'task' : 'note',
    };
  }
  // 兜底
  const due = fallbackParse(text);
  const type = due ? 'task' : 'note';
  return { title: text.slice(0, 200), dueDate: due, priority: '低', type };
}

/* ---------------- 自动分类 ---------------- */

const CLASSIFY_SYSTEM = `你是分类器。把用户的一条记录分到最合适的类别，只输出 JSON：
{"category":"工作|生活|购物|学习|健康|其他"}
- 会议/汇报/项目/同事/客户等 → 工作
- 家里/家人/做饭/家务等 → 生活
- 买/下单/快递/购物等 → 购物
- 复习/看书/考试/课程等 → 学习
- 运动/体检/吃药/睡觉等 → 健康
拿不准 → 其他`;

async function classifyEntry(text) {
  const raw = await generate(CLASSIFY_SYSTEM, text, { temperature: 0 });
  const parsed = extractJson(raw);
  const valid = ['工作', '生活', '购物', '学习', '健康', '其他'];
  if (parsed && valid.includes(parsed.category)) return parsed.category;
  return '其他';
}

/* ---------------- 提醒文案生成 ---------------- */

const REMIND_SYSTEM = `你是"赛博秘书"，一个贴心的私人助理。根据一条待办事项生成一句简洁、自然的中文提醒。
要求：不超过25字，口语化，像真人助理在说话，别用感叹号和"亲爱的"，直接说重点。只输出提醒文案本身。`;

async function generateReminder(entry) {
  const text = entry.title || '';
  const due = entry.dueDate ? `，截止${entry.dueDate}` : '';
  const raw = await generate(REMIND_SYSTEM, `${text}${due}`, { temperature: 0.7 });
  return raw || `${text}${due ? '快到截止时间了' : '别忘了处理'}`;
}

/* ---------------- 对话式交互 ---------------- */

const CHAT_SYSTEM = `你是"赛博秘书"，运行在本地的轻量私人助理。性格简洁、靠谱、有点贴心。
用户可能会问你日程安排、待办事项，或闲聊。用中文回答，控制在两三句话以内。
如果用户问"我有什么待办"，你会在上下文里看到他的记录列表，据此回答。
不要说你是AI模型，就以"秘书"自称。`;

/**
 * 对话回复。history 形如 [{role:'user'|'assistant', content:'...'}]。
 * 可在 user 消息里附带当前待办列表做上下文。
 */
async function chatReply(history) {
  if (!Array.isArray(history) || history.length === 0) {
    return '你好，我是你的赛博秘书。记下想做的事情，我会在截止前提醒你。';
  }
  // 组装成 Ollama 的 chat 消息格式
  const messages = [{ role: 'system', content: CHAT_SYSTEM }];
  for (const h of history) {
    if (h.role === 'user' || h.role === 'assistant') {
      messages.push({ role: h.role, content: String(h.content || '').slice(0, 2000) });
    }
  }
  // 只保留最近 8 条，避免超出小模型上下文
  const trimmed = messages.slice(0, 1).concat(messages.slice(-8));

  try {
    const res = await fetchWithTimeout(`${OLLAMA_HOST}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: MODEL, messages: trimmed, stream: false, temperature: 0.6 }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return (data.message && data.message.content || '').trim() || null;
  } catch {
    return null;
  }
}

/* ---------------- 模型拉取（首次使用引导） ---------------- */

/** 尝试拉取默认模型（异步，用户可在设置页触发） */
function pullModel(model = MODEL, onProgress) {
  return new Promise((resolve, reject) => {
    const child = spawn('ollama', ['pull', model], { stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '';
    child.stdout.on('data', (d) => {
      out += d.toString();
      if (onProgress) onProgress(d.toString());
    });
    child.stderr.on('data', (d) => { out += d.toString(); });
    child.on('close', (code) => {
      if (code === 0) resolve(true);
      else reject(new Error(out.slice(-500)));
    });
    child.on('error', (err) => reject(err));
  });
}

module.exports = {
  OLLAMA_HOST,
  get MODEL() { return MODEL; },
  setModel,
  isAvailable,
  listModels,
  parseEntry,
  classifyEntry,
  generateReminder,
  chatReply,
  pullModel,
  parseChineseDate,
  toISODate,
};
