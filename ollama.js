/**
 * ollama.js — 本地 AI 秘书集成模块
 *
 * 封装 Ollama 本地 HTTP API（默认 http://127.0.0.1:11434），提供：
 *   - parseEntry(text)      提取待办内容 + 截止日期 + 优先级
 *   - classifyEntry(text)   自动分类（工作/生活/购物/学习/其他）
 *   - generateReminder(entry) 生成一句自然的提醒文案
 *   - chatReply(history)    对话式交互
 *   - isAvailable()         探测 Ollama 服务是否可达
 *   - listChatModels()      列出真正能对话的模型（滤掉嵌入模型）
 *
 * 所有函数都做了优雅降级：模型不可用时返回 null / 正则兜底，
 * 保证核心速记功能永远可用。
 */

const { spawn } = require('child_process');

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';
// 默认模型：qwen2.5 3b，兼顾中文理解能力和轻量（可在配置中改）
let MODEL = process.env.OLLAMA_MODEL || 'qwen2.5:3b';

/* 分层超时预算：不同用途的真实耗时差一个数量级，用一个值套所有场景
   要么把探测拖死、要么把生成掐断。

   ⚠️ 这三个值必须与 main.js 的错误文案、homepage.js 的前端兜底定时器
   对得上：前端兜底（30s）只负责「解卡」，不再据此谎报离线，
   所以后端预算可以按真实需要给足，不必迁就前端。 */
const PROBE_TIMEOUT = 3000;     // /api/tags 探测：本机 HTTP，超时即离线，要快
const GENERATE_TIMEOUT = 60000; // generate()：冷加载 ~8s + 生成结构化 JSON
const CHAT_TIMEOUT = 120000;    // chatReply()：冷加载 + 长回复，9B 模型实测可到 40s+

/**
 * 带超时的 fetch，**超时覆盖到 body 读完**。
 *
 * 旧实现（fetchWithTimeout）在 `fetch` 一返回就 clearTimeout，而 `await res.json()`
 * 是调用方才做的 —— 于是 20s 只覆盖「连上」，不覆盖「读完」：
 * 一个慢模型可以在拿到响应头之后无限期拖住，超时形同虚设。
 * 这里把解析放进同一个 try，abort 计时器到解析结束才清。
 *
 * 解析失败（非 JSON 响应）不抛错，data 记 null，由调用方看 res.status 判断。
 */
async function fetchJsonWithTimeout(url, options = {}, timeoutMs = PROBE_TIMEOUT) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    let data = null;
    try {
      data = await res.json();
    } catch (e) {
      // 解析失败（响应不是 JSON）可以吞掉，返回 data:null，由调用方看 res.status。
      // 但 abort（超时）必须往上抛 —— 否则「body 读到一半被掐断」会被这条 catch
      // 吃成 data:null，最终误判成「模型回了空白内容」，给出的建议完全是错的。
      if (e && e.name === 'AbortError') throw e;
      data = null;
    }
    return { res, data };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * 能否用于对话。新版 Ollama 的每个 model 带 `capabilities` 数组，
 * 含 'completion' 才能 chat；老版本没这个字段，只能按名字兜底
 * （嵌入模型不会存在于旧的 chat 场景里，一律排除）。
 */
function isChatCapable(m) {
  const caps = m && m.capabilities;
  if (Array.isArray(caps) && caps.length) return caps.includes('completion');
  return !/embed/i.test(String((m && m.name) || ''));
}

/** 更新模型名（从配置读取） */
function setModel(model) {
  if (model && typeof model === 'string') MODEL = model;
}

/** 探测 Ollama 服务是否可达。语义就是「服务活着」，**不代表能对话** ——
    判断能不能对话请用 listChatModels()/probeChatModel()。 */
async function isAvailable() {
  try {
    const { res } = await fetchJsonWithTimeout(`${OLLAMA_HOST}/api/tags`, {}, PROBE_TIMEOUT);
    return res.ok;
  } catch {
    return false;
  }
}

/** 列出本地已安装模型（用于设置页展示/选择） */
async function listModels() {
  try {
    const { res, data } = await fetchJsonWithTimeout(`${OLLAMA_HOST}/api/tags`, {}, PROBE_TIMEOUT);
    if (!res.ok || !data) return [];
    return (data.models || []).map((m) => m.name);
  } catch {
    return [];
  }
}

/**
 * 列出**真正能对话**的模型。
 * 「服务可达」和「有模型能对话」是两件事：/api/tags 的第一项常常是
 * `qwen3-embedding:latest` —— 按 models[0] 兜底必然选中一个不能 chat 的嵌入模型，
 * 拿到 400 "does not support chat"。这个函数是那条错误路径的修复根。
 */
async function listChatModels() {
  try {
    const { res, data } = await fetchJsonWithTimeout(`${OLLAMA_HOST}/api/tags`, {}, PROBE_TIMEOUT);
    if (!res.ok || !data) return [];
    return (data.models || []).filter(isChatCapable).map((m) => m.name);
  } catch {
    return [];
  }
}

/** 「AI 在线」的诚实判据：服务可达 **且** 至少有一个能对话的模型 */
async function probeChatModel() {
  const chatModels = await listChatModels();
  return { chatModels, hasChatModel: chatModels.length > 0 };
}

/* ---------------- 思维链（thinking）处理 ---------------- */

/**
 * `think:false` 是 Ollama ≥0.9 的 /api/chat、/api/generate 参数，用来让「会思考的模型」
 * 别吐思维链。带上它没坏处：本机实测 0.32.13 上连不思考的模型（glm-4-9b / qwen2.5）
 * 也照单全收，不会报错，只是白给。
 *
 * ⚠️ 但它**关不住全部**，所以不能只靠它：本机 MiMo-VL 实测在 `think:false` 下
 * `message.content` 里照样是 `<think>…</think>` —— 它的思维链是**当普通文本吐出来的**，
 * 不归 Ollama 的思考模板管，参数拦不住。于是 stripThinking 不是「保底」而是**主力**，
 * 两者各管一类：参数掐掉 qwen3 / deepseek-r1 那类真·思考模型的思维链开销（顺带省掉
 * 它们吃掉 120s 预算的风险），字符串规整负责兜住「把标签当正文写」的那一类。
 *
 * 老版本 Ollama 不认这个字段会回 400，所以第一次撞上就把开关永久关掉，之后不再带。
 */
let thinkParamOk = true;

/**
 * POST 一个 JSON 体，自动处理 `think` 参数的兼容性。
 *
 * 老版本 Ollama 不认 `think` 字段 → 400。但我们无法只凭状态码断定 400 就是这个原因
 * （嵌入模型回的是 "does not support chat"，也是 400），所以退路取交集：
 * 去掉 think 原样重发一次，仍 400 就照常交给上层按 400 分类。只重发一次。
 */
async function postJson(url, body, timeoutMs) {
  const send = (b) => fetchJsonWithTimeout(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(b),
  }, timeoutMs);

  const first = await send(thinkParamOk ? { ...body, think: false } : body);
  if (first.res.status !== 400 || !thinkParamOk) return first;
  thinkParamOk = false; // 老版本 Ollama：永久去掉 think，别再让每次请求都白撞一次
  return send(body);
}

/**
 * 剥掉模型吐出的思维链块，只留正文。
 *
 * 判据是「有没有**配对**」，不是「有没有出现过 `<think` 字样」：
 *  1. 成对的 `<think>…</think>` / `<thinking>…</thinking>` 整块删掉
 *     （跨行、大小写、带属性都认）；
 *  2. 删完之后整段**以没闭合的 `<think>` 开头** → 说明思维链没写完就被掐断了
 *     （max_tokens / 超时；本机 MiMo 小预算下实测就是这种，句子断在中间），
 *     此时整段都是思维链，返回 '' —— **绝不能把思维链当答案回给用户**；
 *  3. 反过来，没闭合的 `<think>` 若**前面已经有正文**，就一个字都不动：
 *     那种形状多半是正文里真的在讨论这个标签（「`<think>` 是做什么的」），
 *     宁可少剥一次，也不要把用户拿到的答案从中间截断。
 *
 * 已知不处理：只有 `</think>` 闭标签、没有开标签的泄漏（某些 r1 系模板会把思维链
 * 直接拼在正文前）。那种形状与「正文里提到闭标签」在字符串上无法区分，
 * 按第 3 条的精神选择不动 —— 本机 4 个模型实测都不产生这种形状。
 */
function stripThinking(text) {
  if (!text) return '';
  const paired = /<think(?:ing)?\b[^>]*>[\s\S]*?<\/think(?:ing)?\s*>/gi;
  let out = String(text).replace(paired, '');
  if (/^\s*<think(?:ing)?\b[^>]*>/i.test(out)) return '';
  // 删块会留下多余空行，收一下（别把正文里的空行也吃掉，只收敛 3 行以上）
  return out.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
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

    const res = await postJson(`${OLLAMA_HOST}/api/generate`, body, GENERATE_TIMEOUT);
    if (!res.res.ok || !res.data) return null;
    // 必须剥思维链再返回：推理模型会把整段思维链塞进 response（本机 MiMo 实测），
    // 而 extractJson 取的是「第一个 { 到最后一个 }」—— 思维链里恰好把提示词中的
    // 示例 JSON 复述了一遍，抠出来的很可能就是那个**示例**，而不是模型的答案。
    // 剥完若为空（整段都是没写完的思维链）就返回 null，让调用方走各自的正则兜底。
    return stripThinking(res.data.response) || null;
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
const WEEK_CN = ['日', '一', '二', '三', '四', '五', '六'];

/** JS 的周日=0 换算成「周一为一周之始」的 0..6 */
function isoWeekday(d) {
  return (d.getDay() + 6) % 7;
}

/**
 * 给模型的时间锚。
 * 必须每次调用时现算：本应用常驻托盘，进程可能跨天甚至跨周不重启，
 * 在 require 时算一次会让日期永远停在启动那天。
 */
function nowContext() {
  const now = new Date();
  const p = (n) => String(n).padStart(2, '0');
  const iso = `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
  return `【当前时间】今天是 ${iso}，星期${WEEK_CN[now.getDay()]}。` +
    `"明天""后天""下周三""N天后"等相对日期一律以上述日期为基准推算，禁止使用其他年份。`;
}

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
  //    以「周一为一周之始」推算：本周一 + (0=周一 … 6=周日)
  const weekMatch = /(下|这|本|上)?(?:周|星期)([一二三四五六日天两])/.exec(text);
  if (weekMatch) {
    const target = WEEK_MAP[weekMatch[2]];
    if (target !== undefined) {
      const pref = weekMatch[1];
      const monday = new Date(now);
      monday.setHours(0, 0, 0, 0);
      monday.setDate(monday.getDate() - isoWeekday(now)); // 本周一
      const targetIdx = (target + 6) % 7; // 周一=0 … 周日=6
      const d = new Date(monday);
      if (pref === '下') {
        d.setDate(monday.getDate() + 7 + targetIdx); // 下一周的同一天
      } else if (pref === '上') {
        d.setDate(monday.getDate() - 7 + targetIdx);
      } else {
        d.setDate(monday.getDate() + targetIdx);
        // 无前缀的「周三」= 最近的周三：已过去就顺延到下周（「这/本周」则严格指本周，可为过去）
        const today0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if (pref === undefined && d < today0) d.setDate(d.getDate() + 7);
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

/** 规范成 HH:MM（兼容全角冒号 / 一位数小时）；非法返回 null */
function normalizeTime(t) {
  if (typeof t !== 'string') return null;
  const m = /^\s*(\d{1,2})\s*[:：]\s*(\d{1,2})\s*$/.exec(t);
  if (!m) return null;
  const h = +m[1];
  const min = +m[2];
  if (h > 23 || min > 59) return null;
  return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
}

/** 正则抠时刻：19:00 / 19：00（中文全角冒号很常见） */
function parseTime(text) {
  if (!text) return null;
  const m = /(\d{1,2})\s*[:：]\s*(\d{1,2})/.exec(text);
  return m ? normalizeTime(`${m[1]}:${m[2]}`) : null;
}

/**
 * 过滤模型编造的日期。
 * 小模型没有"今天"的概念时会拿训练数据的时间当现在（实测产出过 2022/2023 年，
 * 用户遇到过 3023 年）。只在正则也解析不出日期、必须采信模型时才用它兜底。
 * 注意：不影响用户手写的明确日期——那种情况走 parseChineseDate，不经过这里。
 */
function sanitizeAiDate(v) {
  const iso = toISODate(v && typeof v === 'string' ? v.trim() : v);
  if (!iso) return null;
  const y = +iso.slice(0, 4);
  const nowY = new Date().getFullYear();
  if (y < nowY - 1 || y > nowY + 10) return null;
  return iso;
}

/* ---------------- 智能解析：待办 + 截止日期 + 优先级 ---------------- */

// 按调用时的时间现算，不能提成常量（常驻进程会跨天）
function buildParseSystem() {
  return `你是"nanoSecretary"的意图解析器。用户会随手记录一段话，可能包含待办事项和截止时间。
请从文本中提取结构化信息，只输出 JSON，格式：
{"title":"简短的任务标题(去除时间词)","dueDate":"YYYY-MM-DD 或 null(没有截止日期)","time":"HH:MM 或 null(没有具体时刻)","priority":"高|中|低","type":"task|note"}
${nowContext()}
规则：
- 若内容是待办/任务（含有要做的事），type 为 task；纯信息记录 type 为 note。
- dueDate 仅当文本包含明确或可推断的日期（如"明天""下周三""9月1日""3天后"）时才填，否则 null。
- time 仅在文本含具体时刻时填 24 小时制 HH:MM（"晚上7点"→"19:00"，"下午3点半"→"15:30"），否则 null。
- 优先级：紧急/尽快/今天=高；下周内/几天后=中；其他=低。
- title 用简洁中文，去掉日期和时间词。`;
}

/**
 * 解析一条记录。返回：
 * { title, dueDate, time, priority, type }；AI 失败时用正则兜底。
 *
 * 日期策略：**正则优先，模型兜底**。
 * 小模型的日期算术不可靠（实测把"明天"算成 2023 年、"下周三"算错两天），
 * 而常见中文日期表达正则是确定性的。正则认不出的（"国庆前""下个月初"）
 * 才交给模型，且用 sanitizeAiDate 挡掉明显编造的年份。
 */
async function parseEntry(text) {
  const src = String(text || '');
  const ruleDate = parseChineseDate(src);
  const ruleTime = parseTime(src);

  const raw = await generate(buildParseSystem(), src, { temperature: 0 });
  const parsed = extractJson(raw);
  if (parsed && (parsed.title || parsed.dueDate || parsed.type)) {
    const due = ruleDate || sanitizeAiDate(parsed.dueDate);
    return {
      title: (parsed.title || src).slice(0, 200),
      dueDate: due,
      // 有截止日才谈得上时刻，避免存下没有归属的时间
      time: due ? (normalizeTime(parsed.time) || ruleTime) : null,
      priority: ['高', '中', '低'].includes(parsed.priority) ? parsed.priority : '低',
      type: parsed.type === 'task' ? 'task' : 'note',
    };
  }
  // 兜底
  const due = ruleDate;
  const type = due ? 'task' : 'note';
  return { title: src.slice(0, 200), dueDate: due, time: due ? ruleTime : null, priority: '低', type };
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

const REMIND_SYSTEM = `你是"nanoSecretary"，一个贴心的私人助理。根据一条待办事项生成一句简洁、自然的中文提醒。
要求：不超过25字，口语化，像真人助理在说话，别用感叹号和"亲爱的"，直接说重点。只输出提醒文案本身。`;

async function generateReminder(entry) {
  const text = entry.title || '';
  const due = entry.dueDate ? `，截止${entry.dueDate}` : '';
  const raw = await generate(REMIND_SYSTEM, `${text}${due}`, { temperature: 0.7 });
  return raw || `${text}${due ? '快到截止时间了' : '别忘了处理'}`;
}

/* ---------------- 对话式交互 ---------------- */

const CHAT_SYSTEM = `你是"nanoSecretary"，运行在本地的轻量私人助理。性格简洁、靠谱、有点贴心。
用户可能会问你日程安排、待办事项，或闲聊。用中文回答，控制在两三句话以内。
如果用户说"我有什么待办"，你会在上下文里看到他的记录列表，据此回答。
不要说你是AI模型，就以"秘书"自称。`;

/* 创建任务意图检测 + 提取（按调用时的时间现算，不能提成常量） */
function buildTaskExtractSystem() {
  return `判断用户这句话是不是"要我创建一个待办/任务/提醒"。判断依据：包含"创建/新建/添加/记一下/帮我记/安排/提醒我/记得/要做"等表示要记录任务意图的动词。
只输出 JSON，格式：{"isTask":true/false,"title":"任务内容","dueDate":"YYYY-MM-DD 或 null","priority":"高|中|低","time":"HH:MM 或 null"}
${nowContext()}
规则：
- isTask：仅当用户明确要你创建一个新任务/待办时才为 true；闲聊、提问、查询待办一律 false
- title：任务内容，去除时间词和"帮我/请/记得"等前缀
- dueDate：从"明天/后天/下周X/N月X日/X天后"等提取，并换算成上述当前时间对应的真实日期；提到具体时间(如"下午3点")时，若是"明天下午3点"这种，dueDate 取对应日期
- time：如有具体时刻（如"下午3点""15:00"）则填 24 小时制 HH:MM，否则 null
- 无法确定时 dueDate/time 用 null，不要瞎编`;
}

async function extractTaskFromMessage(text) {
  const src = String(text || '');
  const ruleDate = parseChineseDate(src);
  const ruleTime = parseTime(src);

  const raw = await generate(buildTaskExtractSystem(), src, { temperature: 0 });
  const parsed = extractJson(raw);
  if (!parsed || parsed.isTask !== true) return null;
  // 与 parseEntry 同一策略：日期正则优先，模型兜底
  const due = ruleDate || sanitizeAiDate(parsed.dueDate);
  return {
    title: (parsed.title || src).slice(0, 200),
    dueDate: due,
    time: normalizeTime(parsed.time) || ruleTime,
    priority: ['高', '中', '低'].includes(parsed.priority) ? parsed.priority : '低',
  };
}

/**
 * 对话回复。history 形如 [{role:'user'|'assistant', content:'...'}]。
 * 可在 user 消息里附带当前待办列表做上下文。
 *
 * 返回 `{ ok, text, reason }`：
 *   ok=true  → text 是回复内容（已剥掉思维链，见 stripThinking）
 *   ok=false → reason ∈ 'model_missing' | 'no_chat_model' | 'timeout' | 'http' | 'empty'
 *
 * 失败原因**必须**透传。旧实现把四种完全不同的失败都压成一个 null，
 * 上层唯一能说的话就只有「请确认 Ollama 已启动」—— 而 Ollama 明明在跑、
 * 头部还写着「AI 在线」。那是自相矛盾的假信息，也是这条问题里最该修的一处。
 *
 * ⚠️ `text` 必须是**剥完思维链**的正文。返回前的最后一道关：宁可回 empty
 * 让上层提示「没给出正文」，也不能把原始思维链当成秘书说过的话显示出来。
 */
async function chatReply(history) {
  if (!Array.isArray(history) || history.length === 0) {
    return { ok: true, text: '你好，我是 nanoSecretary。记下想做的事情，我会在截止前提醒你。' };
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

  /** 单次 chat 调用。成功 `{ok:true,text}`；失败 `{ok:false,reason,status,detail}` */
  async function chatWith(model) {
    const { res, data } = await postJson(`${OLLAMA_HOST}/api/chat`, {
      model, messages: trimmed, stream: false, temperature: 0.6,
    }, CHAT_TIMEOUT);
    if (!res.ok) {
      // Ollama 的错误体形如 {"error":"model 'x' not found"}，抠出来用于分类
      const detail = (data && (data.error || data.message)) || '';
      return { ok: false, reason: /not found/i.test(detail) ? 'model_missing' : 'http', status: res.status, detail };
    }
    const raw = (data && data.message && data.message.content) || '';
    // 剥思维链。剥完可能是 ''（推理模型只想了没答）—— 那是 ok:true 但 text 为空，
    // 由下面的调用方决定是换下一个候选还是回 empty，绝不能把 raw 直接当答案。
    return { ok: true, text: stripThinking(raw) };
  }

  try {
    // 1. 先用当前配置的模型
    const first = await chatWith(MODEL);
    if (first.ok && first.text) return { ok: true, text: first.text };

    // 2. 当前模型不可用（没安装 / 名字不对 / 不是 chat 模型）→ 在**能对话的**模型里按顺序试。
    //    旧实现在 listModels()（全量）里 find，而 /api/tags 的第一项常常是嵌入模型，
    //    于是兜底必然选中它并拿到 400 "does not support chat" —— 越兜越错。
    //
    //    ⚠️ 进入条件包含 `first.ok && !first.text`：模型答了、但剥完思维链是空的
    //    （本机 MiMo 被截断时的表现）也要往下试。旧写法在这里直接 return empty，
    //    等于让一次截断把整轮对话判死，而隔壁明明有 glm 好好地等着。
    const chatModels = await listChatModels();
    for (const cand of chatModels.filter((m) => m !== MODEL).slice(0, 3)) {
      const r = await chatWith(cand);
      if (r.ok && r.text) {
        MODEL = cand; // 命中即记住，后续对话直接用这个模型
        return { ok: true, text: r.text };
      }
    }

    // 3. 全部失败：报最贴切的原因。
    //    一个能对话的模型都没有 → no_chat_model（比 model_missing 更根本，优先报）；
    //    模型都答上了、只是剥完思维链没正文 → empty（比 model_missing 诚实得多）；
    //    否则优先报 model_missing —— 它最可操作（点名校对配置里那个模型）。
    if (!chatModels.length) return { ok: false, reason: 'no_chat_model' };
    if (first.ok) return { ok: false, reason: 'empty' };
    return { ok: false, reason: first.reason === 'model_missing' ? 'model_missing' : first.reason };
  } catch (e) {
    // abort（超时）与真实网络错误必须分开：前者是「再等等」，后者是「起服务」
    return { ok: false, reason: e && e.name === 'AbortError' ? 'timeout' : 'http' };
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
  // 超时预算导出给上层做文案（「超过 N 秒没有返回」不该在 main.js 里手抄一个数）
  PROBE_TIMEOUT,
  GENERATE_TIMEOUT,
  CHAT_TIMEOUT,
  get MODEL() { return MODEL; },
  setModel,
  isAvailable,
  listModels,
  listChatModels,
  probeChatModel,
  parseEntry,
  classifyEntry,
  generateReminder,
  chatReply,
  extractTaskFromMessage,
  pullModel,
  parseChineseDate,
  parseTime,
  sanitizeAiDate,
  toISODate,
  // 导出是为了能**脱离真实模型**直接验那几条例外（配对才剥、没配对不动、未闭合判空）——
  // 真机跑一轮推理模型要十几秒，回归时拿它单测秒级出结果。
  stripThinking,
};
