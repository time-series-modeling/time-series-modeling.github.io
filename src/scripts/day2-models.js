import D from "../data/day2.json";
const $ = s => document.querySelector(s);
const NS = "http://www.w3.org/2000/svg";
const css = v => `var(--${v})`;
function el(tag, attrs = {}, parent) { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
function txt(p, x, y, s, a = {}) { const t = el("text", { x, y, ...a }, p); t.textContent = s; return t; }
function mk(id, w, h) { const host = $(id); host.innerHTML = ""; const s = el("svg", { viewBox: `0 0 ${w} ${h}`, role: "img" }, host); return s; }
const lin = (d0, d1, r0, r1) => v => r0 + (v - d0) / (d1 - d0) * (r1 - r0);
function ticks(lo, hi, n = 5) { const step = Math.pow(10, Math.floor(Math.log10((hi - lo) / n))); const m = [1, 2, 2.5, 5, 10].find(m => (hi - lo) / (m * step) <= n) * step; const out = []; for (let v = Math.ceil(lo / m) * m; v <= hi + 1e-9; v += m) out.push(+v.toFixed(10)); return out; }
const fmt = (v, d = 0) => v.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d });
function path(pts) { return pts.filter(p => isFinite(p[1])).map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(""); }
function seg(id, cb) { const host = $(id); host.querySelectorAll("button").forEach(b => b.addEventListener("click", () => { host.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); cb(b.dataset.v); })); }
function yAxis(s, y, tk, x0, x1, f = v => fmt(v)) { tk.forEach(v => { el("line", { x1: x0, x2: x1, y1: y(v), y2: y(v), class: "gl" }, s); txt(s, x0 - 6, y(v) + 4, f(v), { "text-anchor": "end" }); }); }
const dt = s => new Date(s + "T00:00:00Z").getTime();
const mon = t => new Date(t).toLocaleString("en-US", { month: "short", year: "2-digit", timeZone: "UTC" });
// seeded RNG
function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function randn(r) { let u = 0, v = 0; while (!u) u = r(); v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }

// ------------------------------------------------------------ shared for model widgets
const REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function animate(btn, frames, step, done) {
  if (btn.dataset.running) return;
  if (REDUCED) { step(frames); done && done(); return; }
  btn.dataset.running = "1"; const label = btn.textContent; btn.textContent = "■ Playing";
  let f = 0;
  const tick = () => { step(f); f++; if (f <= frames) requestAnimationFrame(tick); else { delete btn.dataset.running; btn.textContent = label; done && done(); } };
  requestAnimationFrame(tick);
}
const TEST0 = 93, HZ = 14;
const SM = D.examples.smooth, ER = D.examples.erratic;
const xTicks = (s, x, H, idx, labels) => idx.forEach((i, k) => txt(s, x(i), H - 8, labels[k], { "text-anchor": "middle" }));
const mae = (a, b) => a.reduce((z, v, i) => z + Math.abs(v - b[i]), 0) / a.length;

/* ---------------- baselines */
if (document.querySelector("#figBL")) {
  let mode = "naive", prog = 1;
  const y = SM.y, start = TEST0 - 60, act = y.slice(TEST0, TEST0 + HZ);
  const fcOf = m => m === "naive" ? Array(HZ).fill(y[TEST0 - 1]) : m === "snaive" ? y.slice(TEST0 - 52, TEST0 - 52 + HZ) : Array(HZ).fill(y.slice(TEST0 - 13, TEST0).reduce((a, b) => a + b, 0) / 13);
  function draw() {
    const W = 900, H = 280, L = 54, R = 16, T = 14, B = 26, s = mk("#figBL", W, H);
    const x = lin(start, TEST0 + HZ - 1, L, W - R), mx = Math.max(...y.slice(start)) * 1.12, yy = lin(0, mx, H - B, T);
    yAxis(s, yy, ticks(0, mx, 4), L, W - R);
    el("rect", { x: x(TEST0) - 4, y: T, width: W - R - x(TEST0) + 4, height: H - B - T, fill: css("soft") }, s);
    txt(s, x(TEST0) + 4, T + 12, "test weeks", { class: "t-ink" });
    el("path", { d: path(y.slice(start, TEST0 + HZ).map((v, i) => [x(start + i), yy(v)])), fill: "none", stroke: css("ink"), "stroke-width": 1.6 }, s);
    const fc = fcOf(mode), n = Math.max(1, Math.round(HZ * prog));
    if (mode === "snaive") {
      el("rect", { x: x(TEST0 - 52), y: T, width: x(TEST0 - 52 + HZ) - x(TEST0 - 52), height: H - B - T, fill: "color-mix(in srgb,var(--a2) 14%,transparent)" }, s);
      txt(s, x(TEST0 - 52) + 4, T + 12, "same weeks last year", { style: "fill:var(--a2)" });
      const shift = (1 - prog) * 52;
      el("path", { d: path(fc.map((v, i) => [x(TEST0 + i - shift), yy(v)])), fill: "none", stroke: css("a2"), "stroke-width": 2.6 }, s);
    } else {
      if (mode === "mean") el("rect", { x: x(TEST0 - 13), y: T, width: x(TEST0) - x(TEST0 - 13), height: H - B - T, fill: "color-mix(in srgb,var(--a3) 14%,transparent)" }, s);
      else el("circle", { cx: x(TEST0 - 1), cy: yy(y[TEST0 - 1]), r: 6, fill: css("a1") }, s);
      el("path", { d: path(fc.slice(0, n).map((v, i) => [x(TEST0 + i), yy(v)])), fill: "none", stroke: css(mode === "mean" ? "a3" : "a1"), "stroke-width": 2.6 }, s);
    }
    const lab = ["Jul 24", "Oct 24", "Jan 25", "Apr 25", "Jul 25"]; xTicks(s, x, H, [52, 65, 79, 93, 106].filter(i => i >= start), lab.slice(5 - [52, 65, 79, 93, 106].filter(i => i >= start).length));
    const scores = ["naive", "snaive", "mean"].map(m => mae(fcOf(m), act));
    $("#blOut").innerHTML = `mean absolute error on the 14 test weeks · Naive <b>${fmt(scores[0])}</b> · SeasonalNaive <b>${fmt(scores[1])}</b> · mean of last 13 <b>${fmt(scores[2])}</b> units`;
  }
  draw(); seg("#blMode", v => { mode = v; prog = 1; draw(); });
  $("#blPlay").addEventListener("click", e => animate(e.currentTarget, 50, f => { prog = f / 50; draw(); }));
}

/* ---------------- ETS */
if (document.querySelector("#figETS")) {
  const y = SM.y.slice(0, TEST0), act = SM.y.slice(TEST0, TEST0 + HZ);
  let upto = y.length;
  function ets(a, trend) { const lv = [y[0]]; let l = y[0], b = 0; const B = .1, P = .9; for (let t = 1; t < y.length; t++) { const pl = l, pb = b; l = a * y[t] + (1 - a) * (pl + (trend ? P * pb : 0)); if (trend) b = B * (l - pl) + (1 - B) * P * pb; lv.push(l); } const fc = []; let damp = 0; for (let h = 1; h <= HZ; h++) { damp += Math.pow(.9, h); fc.push(l + (trend ? damp * b : 0)); } return { lv, fc }; }
  function draw() {
    const a = $("#etsA").value / 100, tr = $("#etsTrend").checked, { lv, fc } = ets(a, tr);
    const W = 900, H = 260, L = 54, R = 16, T = 12, B = 24, s = mk("#figETS", W, H);
    const x = lin(0, TEST0 + HZ - 1, L, W - R), mx = Math.max(...SM.y) * 1.1, yy = lin(0, mx, H - B, T);
    yAxis(s, yy, ticks(0, mx, 4), L, W - R);
    el("path", { d: path(SM.y.slice(0, TEST0 + HZ).map((v, i) => [x(i), yy(v)])), fill: "none", stroke: css("muted"), "stroke-width": 1.2, opacity: .7 }, s);
    el("path", { d: path(lv.slice(0, upto).map((v, i) => [x(i), yy(v)])), fill: "none", stroke: css("a1"), "stroke-width": 2.4 }, s);
    if (upto >= y.length) el("path", { d: path(fc.map((v, i) => [x(TEST0 + i), yy(v)])), fill: "none", stroke: css("a2"), "stroke-width": 2.6 }, s);
    else el("line", { x1: x(upto - 1), x2: x(upto - 1), y1: T, y2: H - B, stroke: css("a2"), "stroke-dasharray": "3 3" }, s);
    txt(s, W - R, T + 12, "grey = actual · blue = smoothed level · orange = forecast", { "text-anchor": "end" });
    // weights
    const W2 = 900, H2 = 120, s2 = mk("#figETSw", W2, H2), n = 26, bw = (W2 - L - R) / n, yw = lin(0, Math.max(a, .05), H2 - 22, 10);
    for (let k = 0; k < n; k++) { const w = a * Math.pow(1 - a, k); el("rect", { x: W2 - R - (k + 1) * bw + 2, y: yw(w), width: bw - 4, height: H2 - 22 - yw(w), fill: css("a1"), rx: 2 }, s2); }
    txt(s2, W2 - R, H2 - 6, "this week", { "text-anchor": "end" }); txt(s2, L, H2 - 6, "26 weeks ago"); txt(s2, L, 20, "weight each past week gets in the forecast", { class: "t-ink" });
    const half = Math.log(.5) / Math.log(1 - a);
    $("#etsOut").innerHTML = `α = ${a.toFixed(2)} · half of the weight sits on the last <b>${half < 1 ? "1" : half.toFixed(1)}</b> weeks · test MAE <b>${fmt(mae(fc, act))}</b> units`;
  }
  ["#etsA", "#etsTrend"].forEach(i => $(i).addEventListener("input", () => { upto = y.length; draw(); })); draw();
  $("#etsPlay").addEventListener("click", e => animate(e.currentTarget, 90, f => { upto = Math.max(2, Math.round(y.length * f / 90)); draw(); }));
}

/* ---------------- LightGBM */
if (document.querySelector("#figGB")) {
  const pts = ER.price.slice(0, TEST0).map((p, i) => [p, ER.y[i]]).filter(p => isFinite(p[0]) && isFinite(p[1]));
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  function boost(n, lr, mono) {
    const base = ys.reduce((a, b) => a + b, 0) / ys.length; let pred = ys.map(() => base); const stumps = [];
    const cand = [...new Set(xs.map(v => +v.toFixed(3)))].sort((a, b) => a - b);
    for (let t = 0; t < n; t++) {
      const r = ys.map((v, i) => v - pred[i]); let best = null;
      for (let c = 0; c < cand.length - 1; c++) { const thr = (cand[c] + cand[c + 1]) / 2; let sl = 0, nl = 0, sr = 0, nr = 0; xs.forEach((v, i) => { if (v <= thr) { sl += r[i]; nl++; } else { sr += r[i]; nr++; } }); if (!nl || !nr) continue; let ml = sl / nl, mr = sr / nr; if (mono && ml < mr) { const m = (sl + sr) / (nl + nr); ml = mr = m; } const gain = nl * ml * ml + nr * mr * mr; if (!best || gain > best.gain) best = { thr, ml, mr, gain }; }
      if (!best) break; stumps.push(best); pred = pred.map((p, i) => p + lr * (xs[i] <= best.thr ? best.ml : best.mr));
    }
    const f = v => base + stumps.reduce((z, s) => z + lr * (v <= s.thr ? s.ml : s.mr), 0);
    return { f, pred, stumps };
  }
  function draw() {
    const n = +$("#gbN").value, lr = $("#gbLR").value / 100, mono = $("#gbMono").checked, { f, pred } = boost(n, lr, mono);
    const W = 460, H = 280, L = 50, R = 12, T = 12, B = 34, s = mk("#figGB", W, H);
    const x0 = Math.min(...xs) - .02, x1 = Math.max(...xs) + .02, my = Math.max(...ys) * 1.1, x = lin(x0, x1, L, W - R), yy = lin(0, my, H - B, T);
    yAxis(s, yy, ticks(0, my, 4), L, W - R);
    ticks(x0, x1, 4).forEach(v => txt(s, x(v), H - 18, v.toFixed(2), { "text-anchor": "middle" }));
    txt(s, (L + W) / 2, H - 3, "price index (1 = usual price)", { "text-anchor": "middle" });
    pts.forEach(([a, b]) => el("circle", { cx: x(a), cy: yy(b), r: 3, fill: css("muted"), opacity: .55 }, s));
    const grid = Array.from({ length: 200 }, (_, i) => x0 + (x1 - x0) * i / 199);
    el("path", { d: path(grid.map(v => [x(v), yy(f(v))])), fill: "none", stroke: css(mono ? "a3" : "a1"), "stroke-width": 2.6 }, s);
    const sse = ys.reduce((z, v, i) => z + (v - pred[i]) ** 2, 0), sst = ys.reduce((z, v) => z + (v - ys.reduce((a, b) => a + b, 0) / ys.length) ** 2, 0);
    const up = grid.some((v, i) => i && f(v) > f(grid[i - 1]) + 1e-9);
    $("#gbOut").innerHTML = `${n} trees · explains <b>${(100 * (1 - sse / sst)).toFixed(0)}%</b> of the variance · ${up ? "<span style='color:var(--warn)'>curve rises somewhere with price</span>" : "<span style='color:var(--a3)'>never rises with price ✓</span>"}`;
  }
  ["#gbN", "#gbLR", "#gbMono"].forEach(i => $(i).addEventListener("input", draw)); draw();
}

/* ---------------- N-BEATS */
if (document.querySelector("#figNB")) {
  const r = rng(21), IN = 28, N = IN + HZ;
  const truth = Array.from({ length: N }, (_, t) => 40 + 0.6 * t + 10 * Math.sin(2 * Math.PI * t / 14) + 3 * randn(r));
  const inp = truth.slice(0, IN);
  function lsq(X, yv) { // normal equations, small k
    const k = X[0].length, A = Array.from({ length: k }, () => Array(k + 1).fill(0));
    X.forEach((row, i) => { for (let a = 0; a < k; a++) { for (let b = 0; b < k; b++) A[a][b] += row[a] * row[b]; A[a][k] += row[a] * yv[i]; } });
    for (let a = 0; a < k; a++) A[a][a] += 1e-6;
    for (let c = 0; c < k; c++) { let p = c; for (let q = c + 1; q < k; q++) if (Math.abs(A[q][c]) > Math.abs(A[p][c])) p = q; [A[c], A[p]] = [A[p], A[c]]; for (let q = 0; q < k; q++) if (q !== c) { const m = A[q][c] / A[c][c]; for (let b = c; b <= k; b++) A[q][b] -= m * A[c][b]; } }
    return A.map((row, a) => row[k] / row[a]);
  }
  const tb = t => [1, t / N, (t / N) ** 2];
  const sb = t => { const o = []; for (let k = 1; k <= 4; k++) o.push(Math.sin(2 * Math.PI * k * t / HZ), Math.cos(2 * Math.PI * k * t / HZ)); return o; };
  const th1 = lsq(inp.map((_, t) => tb(t)), inp), b1 = t => tb(t).reduce((z, v, i) => z + v * th1[i], 0);
  const res1 = inp.map((v, t) => v - b1(t));
  const th2 = lsq(res1.map((_, t) => sb(t)), res1), b2 = t => sb(t).reduce((z, v, i) => z + v * th2[i], 0);
  const res2 = res1.map((v, t) => v - b2(t));
  let step = 0, fade = 1;
  function draw() {
    const W = 900, H = 280, s = mk("#figNB", W, H), Lw = 400, gap = 60, T = 26, B = 26;
    const all = truth.concat(res1), mn = Math.min(...all, 0) - 5, mx = Math.max(...truth) + 5;
    const xl = lin(0, IN - 1, 40, Lw), xr = lin(0, N - 1, Lw + gap, W - 10), y = lin(mn, mx, H - B, T);
    txt(s, 40, 14, ["input window (28 weeks)", "after block 1: input − trend backcast", "after block 2: − seasonality backcast", "left over: noise"][step], { class: "t-ink t-b" });
    txt(s, Lw + gap, 14, "forecast so far (14 weeks)", { class: "t-ink t-b" });
    [0, 20, 40, 60].filter(v => v > mn && v < mx).forEach(v => { el("line", { x1: 40, x2: W - 10, y1: y(v), y2: y(v), class: "gl" }, s); txt(s, 34, y(v) + 4, v, { "text-anchor": "end" }); });
    el("line", { x1: xr(IN - .5), x2: xr(IN - .5), y1: T, y2: H - B, stroke: css("ink"), "stroke-dasharray": "3 3" }, s);
    const cur = [inp, res1, res2, res2][step];
    el("path", { d: path(cur.map((v, t) => [xl(t), y(v)])), fill: "none", stroke: css("ink"), "stroke-width": 1.8 }, s);
    if (step >= 1) el("path", { d: path(inp.map((_, t) => [xl(t), y(step === 1 ? b1(t) : 0)])), fill: "none", stroke: css("a1"), "stroke-width": 1.2, "stroke-dasharray": "4 3", opacity: step === 1 ? 1 : 0 }, s);
    if (step === 2) el("path", { d: path(inp.map((_, t) => [xl(t), y(b2(t))])), fill: "none", stroke: css("a3"), "stroke-width": 1.4, "stroke-dasharray": "4 3" }, s);
    el("path", { d: path(truth.map((v, t) => [xr(t), y(v)])), fill: "none", stroke: css("muted"), "stroke-width": 1.2, opacity: .6 }, s);
    const hs = Array.from({ length: HZ }, (_, i) => IN + i);
    if (step >= 1) el("path", { d: path(hs.map(t => [xr(t), y(b1(t))])), fill: "none", stroke: css("a1"), "stroke-width": step === 1 ? 2.6 : 1.2, opacity: step === 1 ? fade : .6 }, s);
    if (step >= 2) el("path", { d: path(hs.map(t => [xr(t), y(b1(t) + (step >= 2 ? b2(t) : 0))])), fill: "none", stroke: css(step === 3 ? "a2" : "a3"), "stroke-width": 2.6, opacity: step === 2 ? fade : 1 }, s);
    if (step === 3) { const e = hs.map(t => Math.abs(b1(t) + b2(t) - truth[t])); txt(s, W - 10, H - 8, `mean abs. error ${(e.reduce((a, b) => a + b, 0) / HZ).toFixed(1)} · grey = what really happened`, { "text-anchor": "end" }); }
    txt(s, 40, H - 8, step === 0 ? "the block will try to explain this" : step === 1 ? "blue dashed = trend backcast (a quadratic)" : step === 2 ? "green dashed = seasonality backcast (sine waves)" : "what no block explained");
  }
  draw(); const set = v => { step = +v; fade = 1; draw(); }; seg("#nbStep", set);
  $("#nbPlay").addEventListener("click", e => { let k = 0; const btns = [...$("#nbStep").querySelectorAll("button")]; animate(e.currentTarget, 160, f => { const st = Math.min(3, Math.floor(f / 40)); if (st !== step) { step = st; btns.forEach((b, i) => b.setAttribute("aria-pressed", i === st)); } fade = Math.min(1, (f % 40) / 20); draw(); }); });
}

/* ---------------- NHITS multi-rate */
if (document.querySelector("#figNHX")) {
  const IN = 28, y = SM.y.slice(TEST0 - IN, TEST0 + HZ), inp = y.slice(0, IN), fut = y.slice(IN);
  // neuralforecast defaults: n_pool_kernel_size = [2, 2, 1], n_freq_downsample = [4, 2, 1] -> knots = max(h // d, 1) = 3, 7, 14
  const CFG = [{ pool: 2, knots: 3, col: "a1" }, { pool: 2, knots: 7, col: "a3" }, { pool: 1, knots: 14, col: "a2" }];
  let st = 0;
  // torch F.interpolate(mode="linear", align_corners=False), as in NHITS' _IdentityBasis
  function interp(knots, n) { const k = knots.length; return Array.from({ length: n }, (_, t) => { const p = Math.max(0, (t + .5) * k / n - .5), i = Math.min(Math.floor(p), k - 1), j = Math.min(i + 1, k - 1), f = p - i; return knots[i] * (1 - f) + knots[j] * f; }); }
  const kPos = (j, k) => (j + .5) * HZ / k - .5, at = p => { const i = Math.floor(p), f = p - i; return i + 1 < HZ ? fut[i] * (1 - f) + fut[i + 1] * f : fut[HZ - 1]; };
  function draw() {
    const c = CFG[st], W = 900, H = 260, L = 50, R = 12, T = 24, B = 26, s = mk("#figNHX", W, H);
    const x = lin(0, IN + HZ - 1, L, W - R), mx = Math.max(...y) * 1.1, yy = lin(0, mx, H - B, T);
    yAxis(s, yy, ticks(0, mx, 4), L, W - R);
    el("line", { x1: x(IN - .5), x2: x(IN - .5), y1: T, y2: H - B, stroke: css("ink"), "stroke-dasharray": "3 3" }, s);
    txt(s, x(2), 14, `input, max-pooled by ${c.pool}`, { class: "t-ink t-b" }); txt(s, x(IN + 1), 14, `forecast from ${c.knots} knots`, { class: "t-ink t-b" });
    el("path", { d: path(y.map((v, t) => [x(t), yy(v)])), fill: "none", stroke: css("muted"), "stroke-width": 1.2, opacity: .6 }, s);
    for (let i = 0; i < IN; i += c.pool) { const m = Math.max(...inp.slice(i, i + c.pool)); el("rect", { x: x(i) - 3, y: yy(m), width: x(i + c.pool) - x(i) - 1, height: 3, fill: css(c.col) }, s); }
    const kn = Array.from({ length: c.knots }, (_, k) => at(kPos(k, c.knots)));
    const curve = interp(kn, HZ);
    el("path", { d: path(curve.map((v, t) => [x(IN + t), yy(v)])), fill: "none", stroke: css(c.col), "stroke-width": 2.6 }, s);
    kn.forEach((v, k) => el("circle", { cx: x(IN + kPos(k, c.knots)), cy: yy(v), r: 4.5, fill: css(c.col) }, s));
    $("#nhxOut").innerHTML = `stack ${st + 1}: pool ${c.pool} · ${c.knots} knots for 14 weeks · the curve through the knots is as detailed as this stack can be (knots placed on the real future to show resolution)`;
  }
  draw(); seg("#nhxStack", v => { st = +v; draw(); });
}

/* ---------------- DLinear (fitted in the browser) */
if (document.querySelector("#figDL")) {
  const IN = 28, y = SM.y, scale = y.slice(0, TEST0).reduce((a, b) => a + b, 0) / TEST0;
  const z = y.map(v => v / scale);
  function ma(a, k) { const h = (k - 1) / 2; return a.map((_, i) => { let s = 0; for (let j = -h; j <= h; j++) s += a[Math.min(a.length - 1, Math.max(0, i + j))]; return s / k; }); }
  function solve(A, b) { const n = b.length, M = A.map((r, i) => [...r, b[i]]); for (let c = 0; c < n; c++) { let p = c; for (let q = c + 1; q < n; q++) if (Math.abs(M[q][c]) > Math.abs(M[p][c])) p = q; [M[c], M[p]] = [M[p], M[c]]; const d = M[c][c] || 1e-9; for (let q = c + 1; q < n; q++) { const m = M[q][c] / d; if (m) for (let k = c; k <= n; k++) M[q][k] -= m * M[c][k]; } } const x = Array(n).fill(0); for (let i = n - 1; i >= 0; i--) { let s = M[i][n]; for (let k = i + 1; k < n; k++) s -= M[i][k] * x[k]; x[i] = s / (M[i][i] || 1e-9); } return x; }
  function fit(k) {
    const feats = [], targ = [];
    for (let t = IN; t + HZ <= TEST0; t++) { const w = z.slice(t - IN, t), tr = ma(w, k), re = w.map((v, i) => v - tr[i]); feats.push([...tr, ...re]); targ.push(z.slice(t, t + HZ)); }
    const p = 2 * IN, lam = 1.0, XtX = Array.from({ length: p }, () => Array(p).fill(0));
    feats.forEach(f => { for (let a = 0; a < p; a++) for (let b = 0; b < p; b++) XtX[a][b] += f[a] * f[b]; });
    for (let a = 0; a < p; a++) XtX[a][a] += lam;
    const Wm = []; for (let h = 0; h < HZ; h++) { const Xty = Array(p).fill(0); feats.forEach((f, i) => { for (let a = 0; a < p; a++) Xty[a] += f[a] * targ[i][h]; }); Wm.push(solve(XtX, Xty)); }
    const w = z.slice(TEST0 - IN, TEST0), tr = ma(w, k), re = w.map((v, i) => v - tr[i]), f = [...tr, ...re];
    const fc = Wm.map(row => row.reduce((s, v, i) => s + v * f[i], 0) * scale);
    return { Wm, tr: tr.map(v => v * scale), re: re.map(v => v * scale), fc, nWin: feats.length };
  }
  function draw() {
    const k = +$("#dlK").value, { Wm, tr, re, fc, nWin } = fit(k);
    const W = 900, H = 240, L = 54, R = 12, T = 18, B = 24, s = mk("#figDL", W, H), win = y.slice(TEST0 - IN, TEST0 + HZ);
    const x = lin(0, IN + HZ - 1, L, W - R), mn = Math.min(...re, 0), mx = Math.max(...win) * 1.1, yy = lin(mn, mx, H - B, T);
    yAxis(s, yy, ticks(mn, mx, 4), L, W - R);
    el("line", { x1: x(IN - .5), x2: x(IN - .5), y1: T, y2: H - B, stroke: css("ink"), "stroke-dasharray": "3 3" }, s);
    el("path", { d: path(win.map((v, t) => [x(t), yy(v)])), fill: "none", stroke: css("muted"), "stroke-width": 1.2, opacity: .7 }, s);
    el("path", { d: path(tr.map((v, t) => [x(t), yy(v)])), fill: "none", stroke: css("a1"), "stroke-width": 2.4 }, s);
    el("path", { d: path(re.map((v, t) => [x(t), yy(v)])), fill: "none", stroke: css("a3"), "stroke-width": 1.6 }, s);
    el("path", { d: path(fc.map((v, t) => [x(IN + t), yy(v)])), fill: "none", stroke: css("a2"), "stroke-width": 2.6 }, s);
    txt(s, W - R, 12, "grey = actual · blue = trend (moving average) · green = remainder · orange = DLinear forecast", { "text-anchor": "end" });
    // heatmaps: the two learned matrices, and the single matrix they amount to (W_s + (W_t - W_s)·A, A = the moving average)
    const A = Array.from({ length: IN }, (_, i) => Array(IN).fill(0)); for (let c = 0; c < IN; c++) { const e = Array(IN).fill(0); e[c] = 1; ma(e, k).forEach((v, r) => A[r][c] = v); }
    const Wt = Wm.map(r => r.slice(0, IN)), Ws = Wm.map(r => r.slice(IN));
    const Mx = Wt.map((rt, h) => Array.from({ length: IN }, (_, i) => Ws[h][i] + rt.reduce((z, v, j) => z + (v - Ws[h][j]) * A[j][i], 0)));
    const W2 = 900, H2 = 180, s2 = mk("#figDLw", W2, H2), pw = (W2 - 40) / 3, cw = (pw - 20) / IN, ch = (H2 - 46) / HZ;
    [["trend weights Wₜ", Wt, 0], ["remainder weights Wₛ", Ws, 1], ["= one combined 14 × 28 map", Mx, 2]].forEach(([name, M, j]) => {
      const x0 = 10 + j * (pw + 10), mxw = Math.max(...M.flat().map(Math.abs)) || 1;
      txt(s2, x0, 14, name, { class: "t-ink" });
      for (let h = 0; h < HZ; h++) for (let i = 0; i < IN; i++) { const v = M[h][i] / mxw; el("rect", { x: x0 + i * cw, y: 24 + h * ch, width: cw, height: ch, fill: v >= 0 ? `color-mix(in srgb,var(--a1) ${Math.round(Math.min(1, v * 1.6) * 100)}%,var(--panel))` : `color-mix(in srgb,var(--a2) ${Math.round(Math.min(1, -v * 1.6) * 100)}%,var(--panel))` }, s2); }
    });
    txt(s2, 10, H2 - 4, "rows = forecast week (top = week 1), columns = input week (right = most recent)");
    txt(s2, W2 - 12, H2 - 4, "blue = positive weight · orange = negative", { "text-anchor": "end" });
    $("#dlOut").innerHTML = `moving average over ${k} weeks · fitted on ${nWin} training windows · test MAE <b>${fmt(mae(fc, y.slice(TEST0, TEST0 + HZ)))}</b> units`;
  }
  $("#dlK").addEventListener("input", draw); draw();
}

/* ---------------- covariates */
if (document.querySelector("#figCOV")) {
  let model = "nhitsx";
  function draw() {
    const wk = +$("#cvW").value, lift = Object.fromEntries(D.res.l3_lift)[model === "nhitsx" ? "NHITSx" : "LightGBMx"], base = model === "nhitsx" ? SM.fc.NHITSx : SM.fc.LightGBM;
    const IN = 28, W = 900, H = 330, L = 120, R = 12, s = mk("#figCOV", W, H), x = lin(0, IN + HZ, L, W - R);
    const rows = [["sales history", 0], ["price index", 1], ["promotion", 2], ["discount depth", 3], ["static", 4]];
    const rowY = i => 20 + i * 30;
    rows.forEach(([n, i]) => txt(s, L - 8, rowY(i) + 15, n, { "text-anchor": "end", class: "t-ink" }));
    for (let t = 0; t < IN + HZ; t++) {
      const fut = t >= IN, hz = t - IN;
      if (!fut) el("rect", { x: x(t) + 1, y: rowY(0), width: x(1) - x(0) - 2, height: 22, fill: css("ink"), opacity: .75 }, s);
      else el("rect", { x: x(t) + 1, y: rowY(0), width: x(1) - x(0) - 2, height: 22, fill: "none", stroke: css("line") }, s);
      const promo = fut ? (hz + 1 === wk ? 1 : 0) : SM.promo[TEST0 - IN + t];
      el("rect", { x: x(t) + 1, y: rowY(1), width: x(1) - x(0) - 2, height: 22, fill: css("a4"), opacity: fut ? (promo ? .9 : .45) : .45 }, s);
      el("rect", { x: x(t) + 1, y: rowY(2), width: x(1) - x(0) - 2, height: 22, fill: promo ? css("a2") : css("grid") }, s);
      el("rect", { x: x(t) + 1, y: rowY(3), width: x(1) - x(0) - 2, height: 22, fill: promo ? css("a5") : css("grid") }, s);
    }
    el("rect", { x: L, y: rowY(4), width: 3 * 60, height: 22, fill: css("a3"), rx: 3 }, s);
    txt(s, L + 8, rowY(4) + 15, "3 numbers per series", { style: "fill:var(--panel)" });
    el("line", { x1: x(IN), x2: x(IN), y1: 12, y2: rowY(5) + 140, stroke: css("ink"), "stroke-dasharray": "3 3" }, s);
    txt(s, x(IN) - 6, 12, "← 28 input weeks", { "text-anchor": "end" }); txt(s, x(IN) + 6, 12, "14 forecast weeks →");
    // forecast chart
    const fc = base.map((v, i) => (i + 1 === wk ? v * (1 + lift) : v)), mx = Math.max(...fc, ...SM.y.slice(TEST0 - IN, TEST0)) * 1.1, y = lin(0, mx, H - 8, rowY(5) + 10);
    el("path", { d: path(SM.y.slice(TEST0 - IN, TEST0).map((v, t) => [x(t + .5), y(v)])), fill: "none", stroke: css("ink"), "stroke-width": 1.6 }, s);
    el("path", { d: path(base.map((v, i) => [x(IN + i + .5), y(v)])), fill: "none", stroke: css("muted"), "stroke-width": 1.4, "stroke-dasharray": "4 3" }, s);
    el("path", { d: path(fc.map((v, i) => [x(IN + i + .5), y(v)])), fill: "none", stroke: css(model === "nhitsx" ? "a1" : "a3"), "stroke-width": 2.6 }, s);
    txt(s, L - 8, (rowY(5) + H) / 2, "forecast", { "text-anchor": "end", class: "t-ink" });
    $("#cvOut").innerHTML = wk ? `promotion in week ${wk}: forecast ${fmt(base[wk - 1])} → <b>${fmt(fc[wk - 1])}</b> units (+${Math.round(lift * 100)} %, the ${model === "nhitsx" ? "NHITSx" : "LightGBMx"} median lift in Lab 03)` : "no promotion planned in the horizon: the model's real test forecast (dashed)";
  }
  $("#cvW").addEventListener("input", draw); seg("#cvModel", v => { model = v; draw(); }); draw();
}

/* ---------------- Chronos-2 */
if (document.querySelector("#figCH")) {
  const IN = 64, P = 16, y = SM.y.slice(TEST0 - IN, TEST0), pr = SM.price.slice(TEST0 - IN, TEST0 + HZ), pm = SM.promo.slice(TEST0 - IN, TEST0 + HZ);
  const mu = y.reduce((a, b) => a + b, 0) / IN, sd = Math.sqrt(y.reduce((a, b) => a + (b - mu) ** 2, 0) / IN) || 1, ys = y.map(v => Math.asinh((v - mu) / sd) + 3);
  const CAP = ["Standardise the history with its own mean and standard deviation, then apply arcsinh to tame large values, so every series in the world looks the same size to the model (Chronos-2 report §3.1).", "Cut the scaled history into patches of 16 weeks. Each patch becomes one token, like a word in a sentence.", "Known future covariates (price, promotion) get their own rows of tokens, covering the forecast weeks too. Group attention lets the series and its covariates read each other.", "Forecast tokens attend to every past patch and to the covariates: which earlier stretches look like what comes next?", "The model outputs quantiles for every forecast week at once, then undoes the scaling. Shown here is an illustrative fan, not a Chronos-2 run."];
  let st = 0, t0 = 0;
  function draw() {
    const W = 900, H = 300, L = 70, R = 12, s = mk("#figCH", W, H), x = lin(0, IN + HZ, L, W - R);
    const mx = Math.max(...ys) * 1.15, yy = lin(0, mx, 140, 20);
    if (st === 0) txt(s, L - 8, 66, "scaled", { "text-anchor": "end", class: "t-ink" });
    txt(s, L - 8, 80, "sales", { "text-anchor": "end", class: "t-ink" });
    el("path", { d: path(ys.map((v, t) => [x(t + .5), yy(v)])), fill: "none", stroke: css("ink"), "stroke-width": 1.6 }, s);
    if (st >= 1) for (let k = 0; k < IN / P; k++) { el("rect", { x: x(k * P) + 2, y: 16, width: x(P) - x(0) - 4, height: 128, fill: "none", stroke: css("a1"), "stroke-width": 1.5, rx: 4 }, s); el("rect", { x: x(k * P) + 10, y: 152, width: x(P) - x(0) - 20, height: 20, fill: css("a1"), rx: 4 }, s); txt(s, x(k * P + P / 2), 166, `token ${k + 1}`, { "text-anchor": "middle", style: "fill:var(--panel)" }); }
    if (st >= 1) { el("rect", { x: x(IN) + 10, y: 152, width: x(IN + HZ) - x(IN) - 20, height: 20, fill: "none", stroke: css("a2"), "stroke-dasharray": "4 3", rx: 4 }, s); txt(s, x(IN + HZ / 2), 166, "forecast token", { "text-anchor": "middle", style: "fill:var(--a2)" }); }
    if (st >= 2) {
      [["price", pr, "a4"], ["promotion", pm, "a2"]].forEach(([n, arr, c], r) => { const y0 = 186 + r * 26; txt(s, L - 8, y0 + 14, n, { "text-anchor": "end", class: "t-ink" }); for (let k = 0; k < (IN + HZ) / P; k++) { const seg_ = arr.slice(k * P, k * P + P); const v = seg_.reduce((a, b) => a + b, 0) / Math.max(1, seg_.length); el("rect", { x: x(k * P) + 10, y: y0, width: Math.min(x(P) - x(0), x(IN + HZ) - x(k * P)) - 20, height: 18, fill: css(c), opacity: n === "price" ? .35 + .4 * Math.min(1, Math.abs(1 - v) * 4) : .2 + .7 * v, rx: 4 }, s); } });
    }
    if (st >= 3) { const a = (t0 % 60) / 60; for (let k = 0; k < IN / P; k++) { const xs_ = x(k * P + P / 2), xe = x(IN + HZ / 2), w = [.15, .25, .2, .4][k]; el("path", { d: `M${xe},150 Q${(xs_ + xe) / 2},${100 - 40 * w} ${xs_},150`, fill: "none", stroke: css("a2"), "stroke-width": 1 + 5 * w, opacity: .35 + .5 * Math.abs(Math.sin(Math.PI * (a + k / 4))) }, s); } }
    if (st >= 4) {
      const lvl = ys.slice(-8).reduce((p, q) => p + q, 0) / 8, med = Array.from({ length: HZ }, (_, i) => lvl * (1 + .1 * Math.sin(i / 2)));
      const band = (m, w) => path(med.map((v, i) => [x(IN + i + .5), yy(v * (1 + m * w * (1 + i / 14)))])) ;
      const poly = (w) => { const up = med.map((v, i) => [x(IN + i + .5), yy(v * (1 + w * (1 + i / 14)))]), lo = med.map((v, i) => [x(IN + i + .5), yy(Math.max(0, v * (1 - w * (1 + i / 14))))]).reverse(); return path(up) + "L" + lo.map(p => p.join(",")).join("L") + "Z"; };
      el("path", { d: poly(.45), fill: "color-mix(in srgb,var(--a2) 15%,transparent)" }, s);
      el("path", { d: poly(.22), fill: "color-mix(in srgb,var(--a2) 30%,transparent)" }, s);
      el("path", { d: band(0, 0), fill: "none", stroke: css("a2"), "stroke-width": 2.4 }, s);
    }
    $("#chCap").textContent = CAP[st];
  }
  draw(); seg("#chStep", v => { st = +v; draw(); });
  $("#chPlay").addEventListener("click", e => { const btns = [...$("#chStep").querySelectorAll("button")]; animate(e.currentTarget, 300, f => { const k = Math.min(4, Math.floor(f / 60)); if (k !== st) { st = k; btns.forEach((b, i) => b.setAttribute("aria-pressed", i === k)); } t0 = f; draw(); }); });
}

/* ---------------- TimesFM 2.5 */
if (document.querySelector("#figTF")) {
  const P = 32, PAD = 3, NP = 3, OUT = 30, y = SM.y.slice(0, TEST0), act = SM.y.slice(TEST0, TEST0 + HZ);
  const CAP = [
    "TimesFM cuts the history into patches of 32 weeks. Our 93 weeks become 3 patches; the first 3 weeks are padding and masked out. Each patch is embedded into one token.",
    "Decoder-only: each token may only look at itself and the tokens before it (the triangle). Token 2 never sees patch 3. This is how GPT-style language models read text.",
    "In training every token predicts the next 128 steps after its own 32-step patch. The output (128) is 4× longer than the input patch (32), so token 1's target covers all of patch 2, all of patch 3 and beyond, and the targets of neighbouring tokens overlap. Solid parts have true values to learn from; dashed parts lie past the end of this series. One pass gives a forecast from every position at once. (This training recipe is from the TimesFM 1.0 paper; Google has not published how 2.5 was trained, but 2.5 keeps the same 32-step input and 128-step output patches.)",
    "At forecast time the last token outputs the next 128 steps: a point forecast and 9 quantiles (10 % to 90 %). We keep the first 14 weeks. For a horizon longer than 128, TimesFM 2.5 feeds the median of those 128 steps back in as 4 new patches and runs again. Shown here is an illustrative fan, not a TimesFM run.",
  ];
  let st = 0, t0 = 0;
  function draw() {
    const W = 900, H = 250, L = 70, R = 150, s = mk("#figTF", W, H), x = lin(0, NP * P + OUT, L, W - R);
    const mx = Math.max(...y, ...act) * 1.12, yy = lin(0, mx, 140, 18);
    txt(s, L - 8, 80, "sales", { "text-anchor": "end", class: "t-ink" });
    if (st === 3) el("path", { d: path(act.map((v, i) => [x(NP * P + i + .5), yy(v)])), fill: "none", stroke: css("muted"), "stroke-width": 1.4, "stroke-dasharray": "3 3" }, s);
    el("rect", { x: x(0), y: 16, width: x(PAD) - x(0), height: 128, fill: "color-mix(in srgb,var(--muted) 18%,transparent)" }, s);
    el("path", { d: path(y.map((v, i) => [x(PAD + i + .5), yy(v)])), fill: "none", stroke: css("ink"), "stroke-width": 1.6 }, s);
    for (let k = 0; k < NP; k++) {
      el("rect", { x: x(k * P) + 2, y: 16, width: x(P) - x(0) - 4, height: 128, fill: "none", stroke: css("a1"), "stroke-width": 1.5, rx: 4 }, s);
      el("rect", { x: x(k * P) + 14, y: 154, width: x(P) - x(0) - 28, height: 20, fill: css("a1"), rx: 4 }, s);
      txt(s, x(k * P + P / 2), 168, `token ${k + 1}`, { "text-anchor": "middle", style: "fill:var(--panel)" });
    }
    txt(s, x(0), 11, "padding", {});
    if (st === 1 || st === 3) {
      // causal arcs: token k attends to tokens j <= k
      const a = (t0 % 60) / 60;
      for (let k = 1; k < NP; k++) for (let j = 0; j < k; j++) {
        const xs_ = x(j * P + P / 2), xe = x(k * P + P / 2);
        el("path", { d: `M${xe},176 Q${(xs_ + xe) / 2},${215 + 18 * (k - j)} ${xs_},176`, fill: "none", stroke: css("a1"), "stroke-width": 2, opacity: .35 + .5 * Math.abs(Math.sin(Math.PI * (a + j / 3))) }, s);
      }
      // mask matrix on the right (hidden on the forecast step to leave room)
      if (st < 3) {
      const mx0 = W - R + 30, cs = 26, my0 = 40;
      txt(s, mx0, my0 - 10, "who sees whom", {});
      for (let r = 0; r < NP; r++) for (let c = 0; c < NP; c++) el("rect", { x: mx0 + c * cs, y: my0 + r * cs, width: cs - 3, height: cs - 3, rx: 3, fill: c <= r ? css("a1") : "color-mix(in srgb,var(--muted) 20%,transparent)" }, s);
      for (let r = 0; r < NP; r++) { txt(s, mx0 - 6, my0 + r * cs + 17, `${r + 1}`, { "text-anchor": "end" }); txt(s, mx0 + r * cs + 11, my0 + NP * cs + 14, `${r + 1}`, { "text-anchor": "middle" }); }
      txt(s, mx0, my0 + NP * cs + 32, "row reads columns", {});
      }
    }
    if (st === 2) for (let k = 0; k < NP; k++) {
      // token k+1 is trained to predict the 128 steps after its own patch (TimesFM paper §4, eq. 4)
      const a = (k + 1) * P, b = a + 128, end = NP * P + OUT, ly = 184 + k * 21;
      const xa = x(Math.min(a, end)), xd = x(Math.min(b, NP * P)), xe = x(Math.min(b, end));
      if (a < NP * P) el("rect", { x: xa, y: ly, width: xd - xa, height: 16, fill: "color-mix(in srgb,var(--a2) 35%,transparent)", stroke: css("a2"), rx: 3 }, s);
      el("rect", { x: x(Math.max(a, NP * P)), y: ly, width: xe - x(Math.max(a, NP * P)), height: 16, fill: "none", stroke: css("a2"), "stroke-dasharray": "4 3", rx: 3 }, s);
      txt(s, xe + 4, ly + 12, `token ${k + 1} → steps ${a + 1}–${b}`, { style: "fill:var(--a2)" });
    }
    if (st === 2) { txt(s, x(NP * P) + 4, 178, "past the data", { style: "fill:var(--muted)" }); }
    if (st === 3) {
      const lvl = y.slice(-8).reduce((p, q) => p + q, 0) / 8, med = Array.from({ length: OUT }, (_, i) => lvl * (1 - .08 * Math.sin(i / 3)));
      const poly = w => { const up = med.map((v, i) => [x(NP * P + i + .5), yy(v * (1 + w * (1 + i / 14)))]), lo = med.map((v, i) => [x(NP * P + i + .5), yy(Math.max(0, v * (1 - w * (1 + i / 14))))]).reverse(); return path(up) + "L" + lo.map(p => p.join(",")).join("L") + "Z"; };
      el("path", { d: poly(.4), fill: "color-mix(in srgb,var(--a2) 15%,transparent)" }, s);
      el("path", { d: poly(.2), fill: "color-mix(in srgb,var(--a2) 30%,transparent)" }, s);
      el("path", { d: path(med.map((v, i) => [x(NP * P + i + .5), yy(v)])), fill: "none", stroke: css("a2"), "stroke-width": 2.4 }, s);
      el("rect", { x: x(NP * P + HZ), y: 16, width: x(NP * P + OUT) - x(NP * P + HZ), height: 128, fill: "color-mix(in srgb,var(--panel) 65%,transparent)" }, s);
      el("path", { d: `M${x(NP * P)},150 L${x(NP * P)},156 L${x(NP * P + HZ)},156 L${x(NP * P + HZ)},150`, fill: "none", stroke: css("a2"), "stroke-width": 1.5 }, s);
      txt(s, x(NP * P + HZ / 2), 170, "keep 14 weeks", { "text-anchor": "middle", style: "fill:var(--a2)" });
      txt(s, x(NP * P + OUT) + 4, 84, "… to 128", {});
      el("path", { d: `M${x(NP * P - P / 2)},176 C${x(NP * P - P / 2)},200 ${x(NP * P + 6)},200 ${x(NP * P + 6)},176`, fill: "none", stroke: css("a2"), "stroke-width": 1.8 }, s);
    }
  }
  draw(); seg("#tfStep", v => { st = +v; draw(); $("#tfCap").textContent = CAP[st]; }); $("#tfCap").textContent = CAP[0];
  $("#tfPlay").addEventListener("click", e => { const btns = [...$("#tfStep").querySelectorAll("button")]; animate(e.currentTarget, 240, f => { const k = Math.min(3, Math.floor(f / 60)); if (k !== st) { st = k; btns.forEach((b, i) => b.setAttribute("aria-pressed", i === k)); $("#tfCap").textContent = CAP[k]; } t0 = f; draw(); }); });
}

/* ================================================================ model internals
   Architecture walkthroughs for N-BEATS, NHITS and DLinear. Shapes, layer sizes and bases follow
   neuralforecast 3.2.2 with the Lab 01 settings: h = 14, input_size = 28, library defaults otherwise. */
function arch(s, mid, nodes, edges, on) {
  const lit = k => on === "all" || on.includes(k);
  edges.forEach(e => {
    const L = lit(e.id);
    el("path", { d: "M" + e.p.map(p => p.join(",")).join("L"), fill: "none", stroke: L ? css(e.col || "ink") : css("line"), "stroke-width": L ? 1.8 : 1.2, "marker-end": e.noArrow ? "" : `url(#${mid})`, ...(e.dash ? { "stroke-dasharray": "4 3" } : {}) }, s);
    if (e.label) txt(s, e.label[0], e.label[1], e.label[2], { "text-anchor": e.label[3] || "middle", opacity: L ? 1 : .35 });
  });
  nodes.forEach(n => {
    const L = lit(n.id), col = n.col || "a1", g = el("g", { opacity: L ? 1 : .32 }, s);
    if (n.op) {
      el("circle", { cx: n.x, cy: n.y, r: 12, fill: css("panel"), stroke: L ? css(col) : css("line"), "stroke-width": 1.8 }, g);
      txt(g, n.x, n.y + 5, n.op, { "text-anchor": "middle", class: "t-ink t-b", style: "font-size:15px" });
      return;
    }
    el("rect", { x: n.x, y: n.y, width: n.w, height: n.h, rx: 8, fill: L && on !== "all" ? css("soft") : css("panel"), stroke: L ? css(col) : css("line"), "stroke-width": L ? 1.8 : 1.2 }, g);
    const lh = 14, y0 = n.y + n.h / 2 - (n.lines.length - 1) * lh / 2 + 4;
    n.lines.forEach((l, i) => txt(g, n.x + n.w / 2, y0 + i * lh, l, { "text-anchor": "middle", class: i === 0 ? "t-ink t-b" : "" }));
  });
}
function arrowDefs(s, mid) { const m = el("marker", { id: mid, viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: "auto-start-reverse" }, el("defs", {}, s)); el("path", { d: "M0,0L10,5L0,10z", fill: css("muted") }, m); }
// residual stack (N-BEATS / NHITS): residual track on top, forecast track at the bottom, blocks in between
function stackLayout(blocks, inLines, outLines) {
  const yR = 56, yF = 258, bw = 152, x0s = 160, x1s = 770, sp = (x1s - x0s) / blocks.length, nodes = [], edges = [];
  nodes.push({ id: "in", x: 8, y: yR - 24, w: 124, h: 48, lines: inLines });
  nodes.push({ id: "naive", x: 8, y: yF - 24, w: 124, h: 48, lines: ["start: last observed", "week, repeated 14×"], col: "a2" });
  let rx = 132, fx = 132;
  blocks.forEach((b, i) => {
    const x0 = x0s + i * sp + (sp - bw - 34) / 2, mx = x0 + bw + 26, px = x0 + bw / 2;
    nodes.push({ id: "b" + i, x: x0, y: 108, w: bw, h: 96, lines: b, col: "a1" });
    nodes.push({ id: "m" + i, x: mx, y: yR, op: "−", col: "a1" });
    nodes.push({ id: "p" + i, x: px, y: yF, op: "+", col: "a2" });
    edges.push({ id: "r" + i, p: [[rx, yR], [mx - 12, yR]] });
    edges.push({ id: "b" + i, p: [[x0 + 24, yR], [x0 + 24, 108]] });
    edges.push({ id: "b" + i, p: [[x0 + bw - 24, 108], [x0 + bw - 24, yR + 30], [mx, yR + 30], [mx, yR + 12]], col: "a1", label: [x0 + bw - 20, yR + 25, "backcast", "end"] });
    edges.push({ id: "b" + i, p: [[px, 204], [px, yF - 12]], col: "a2", label: [px + 6, 232, "forecast", "start"] });
    edges.push({ id: "f" + i, p: [[fx, yF], [px - 12, yF]], col: "a2" });
    rx = mx + 12; fx = px + 12;
  });
  nodes.push({ id: "left", x: 790, y: yR - 24, w: 124, h: 48, lines: ["left over", "(nothing uses it)"], col: "muted" });
  nodes.push({ id: "out", x: 790, y: yF - 24, w: 124, h: 48, lines: outLines, col: "a2" });
  edges.push({ id: "left", p: [[rx, yR], [790, yR]] });
  edges.push({ id: "out", p: [[fx, yF], [790, yF]], col: "a2" });
  return { nodes, edges };
}
function stepper(fig, segId, capId, W, H, build, steps) {
  let st = 0;
  const draw = () => { const s = mk(fig, W, H), mid = fig.slice(1) + "-ah"; arrowDefs(s, mid); const { nodes, edges } = build(); arch(s, mid, nodes, edges, steps()[st].on); $(capId).innerHTML = steps()[st].cap; };
  seg(segId, v => { st = +v; draw(); });
  return { draw, reset: () => { st = 0; $(segId).querySelectorAll("button").forEach((b, i) => b.setAttribute("aria-pressed", i === 0)); draw(); } };
}
const ids = (pre, n) => Array.from({ length: n }, (_, i) => pre + i);

/* ---------------- N-BEATS: whole network */
if (document.querySelector("#figNBarch")) {
  let variant = "generic";
  const BL = { generic: [["Block 1 · identity", "MLP → θ (42)", "28 back + 14 fwd"], ["Block 2 · identity", "MLP → θ (42)", "28 back + 14 fwd"], ["Block 3 · identity", "MLP → θ (42)", "28 back + 14 fwd"]], interpretable: [["Block 1 · trend", "MLP → θ (6)", "quadratic basis"], ["Block 2 · seasonality", "MLP → θ (52)", "13 cos/sin waves"]] };
  const build = () => stackLayout(BL[variant], ["input window", "28 weeks, scaled"], ["forecast ŷ", "14 weeks"]);
  const steps = () => {
    const n = BL[variant].length, gen = variant === "generic";
    return [
      { on: "all", cap: gen ? "Generic N-BEATS as Lab 01 runs it: <code>stack_types=[\"identity\"]*3</code>, one block per stack, so three blocks in a row. Two tracks run through the network: the <b>residual</b> (top) shrinks as each block explains part of the input, the <b>forecast</b> (bottom) grows as each block adds its part." : "Interpretable N-BEATS as Lab 01 runs it: <code>stack_types=[\"trend\", \"seasonality\"]</code>, one block each. Same wiring as the generic model, but each block is forced to speak in a fixed vocabulary of shapes." },
      { on: ["in", "naive"], cap: "Each training example is one window: 28 weeks of one series in, the next 14 weeks as the target. <code>scaler_type=\"robust\"</code> centres the window on its median and divides by its mean absolute deviation, so a 2-unit item and a 2,000-unit item look alike to the network. neuralforecast also reverses the window (most recent week first) and starts the forecast from the last observed value, so the blocks only learn corrections to a naive forecast. The 2020 paper has none of these three: it feeds the raw window and deliberately avoids input scaling." },
      { on: ["b0", "r0"], cap: gen ? "Block 1 is an MLP: Linear 28 → 512, then three Linear 512 → 512 layers each followed by ReLU, then a Linear to θ. With the identity basis θ is the answer itself: the first 28 numbers are the backcast (its reconstruction of the input), the last 14 are its forecast. In the paper the generic block has one more learned linear layer after θ; two linear layers in a row act as one, so neuralforecast merges them." : "Block 1 (trend) has the same MLP, but θ has only 6 numbers: 3 coefficients for the backcast and 3 for the forecast. They multiply the polynomials 1, t, t² (see the block widget below), so whatever this block says is a smooth quadratic curve." },
      { on: ["m0", "r1"], cap: "The <b>doubly residual</b> step: the backcast is subtracted from the input, and only what block 1 could not explain goes on. Block 1's forecast goes down to the forecast track. Neither track has any other connection: the next block never sees the raw input, only the leftover." },
      { on: ids("b", n).slice(1).concat(ids("m", n).slice(1), ids("r", n).slice(1), ["left"]), cap: gen ? "Blocks 2 and 3 repeat the same pattern on what is left. Each has its own weights (<code>shared_weights=False</code>, as in the paper's generic model, which chains 30 such blocks). What is still left after the last block is thrown away: there is no loss on it, the backcast only exists to tell the next block what is already explained." : "Block 2 (seasonality) works on the input with the trend taken out, and can only answer with sums of cosine and sine waves. What is left after it is thrown away. The paper puts three blocks in each of the two stacks and shares their weights; the lab keeps one block per stack." },
      { on: ["naive", "out"].concat(ids("p", n), ids("f", n)), cap: `Forecast = last observed value + the forecasts of all ${n} blocks, then unscaled. Only this sum is compared with the 14 real weeks (MAE loss), so every block is trained by how much its piece helps the final forecast.${gen ? "" : " Because each piece has a known shape, you can plot the trend part and the seasonal part separately."}` },
    ];
  };
  const S = stepper("#figNBarch", "#nbaStep", "#nbaCap", 920, 290, build, steps);
  seg("#nbaVar", v => { variant = v; S.reset(); });
  S.draw();
}

/* ---------------- N-BEATS: inside one block, with the real bases */
if (document.querySelector("#figNBblk")) {
  const IN = 28, H = HZ, FREQ = [0, ...Array.from({ length: 12 }, (_, i) => 1 + i / 2)];
  const trendB = len => [0, 1, 2].map(i => Array.from({ length: len }, (_, t) => Math.pow(t / len, i)));
  const seasB = (len, sign) => [Math.cos, Math.sin].flatMap(fn => FREQ.map(f => Array.from({ length: len }, (_, t) => fn(sign * 2 * Math.PI * t / H * f))));
  const B = { trend: { b: trendB(IN), f: trendB(H) }, seasonality: { b: seasB(IN, -1), f: seasB(H, 1) } };
  const SPEC = {
    generic: { nb: 28, nf: 14, gb: "identity (28 × 28)", gf: "identity (14 × 14)" },
    trend: { nb: 3, nf: 3, gb: "1, t, t² over 28 wks", gf: "1, t, t² over 14 wks" },
    seasonality: { nb: 26, nf: 26, gb: "13 cos + 13 sin", gf: "13 cos + 13 sin" },
  };
  let v = "generic", k = 1, seed = 7, theta = null;
  function draw() {
    const W = 920, Ht = 360, s = mk("#figNBblk", W, Ht), mid = "nbblk-ah"; arrowDefs(s, mid);
    const sp = SPEC[v], nt = sp.nb + sp.nf;
    const nodes = [
      { id: "a", x: 8, y: 30, w: 112, h: 44, lines: ["residual in", "28 values"] },
      { id: "a", x: 146, y: 30, w: 118, h: 44, lines: ["Linear", "28 → 512"] },
      { id: "a", x: 290, y: 30, w: 168, h: 44, lines: ["3 × Linear 512 → 512", "each followed by ReLU"] },
      { id: "a", x: 484, y: 30, w: 118, h: 44, lines: ["Linear", `512 → θ (${nt})`] },
      { id: "a", x: 640, y: 4, w: 272, h: 40, lines: [`backcast = Gᵇ·θᵇ (θᵇ: ${sp.nb})`, `Gᵇ: ${sp.gb}`], col: "a1" },
      { id: "a", x: 640, y: 62, w: 272, h: 40, lines: [`forecast = Gᶠ·θᶠ (θᶠ: ${sp.nf})`, `Gᶠ: ${sp.gf}`], col: "a2" },
    ];
    const edges = [{ id: "a", p: [[120, 52], [146, 52]] }, { id: "a", p: [[264, 52], [290, 52]] }, { id: "a", p: [[458, 52], [484, 52]] }, { id: "a", p: [[602, 52], [620, 52], [620, 24], [640, 24]] }, { id: "a", p: [[620, 52], [620, 82], [640, 82]] }];
    arch(s, mid, nodes, edges, "all");
    // plot: real time, 28 input weeks then 14 forecast weeks
    const L = 50, R = 12, T = 132, Bm = 26, x = lin(0, IN + H - 1, L, W - R);
    let curves = [], cols = [];
    if (v === "trend") { curves = [0, 1, 2]; cols = ["a1", "a3", "a4"]; }
    if (v === "seasonality") { curves = [k, FREQ.length + k]; cols = ["a1", "a3"]; }
    const fcOf = th => v === "generic" ? { b: th.slice(0, IN), f: th.slice(IN) } : { b: B[v].b[0].map((_, t) => B[v].b.reduce((z, g, j) => z + g[t] * th[j], 0)), f: B[v].f[0].map((_, t) => B[v].f.reduce((z, g, j) => z + g[t] * th[sp.nb + j], 0)) };
    const out = theta ? fcOf(theta) : null;
    const vals = [-1.05, 1.05]; if (out) vals.push(...out.b, ...out.f);
    const mn = Math.min(...vals) * 1.05, mx = Math.max(...vals) * 1.05, y = lin(mn, mx, Ht - Bm, T);
    el("rect", { x: x(IN - .5), y: T, width: W - R - x(IN - .5), height: Ht - Bm - T, fill: css("soft") }, s);
    el("line", { x1: L, x2: W - R, y1: y(0), y2: y(0), class: "ax" }, s);
    txt(s, L, T - 8, "input weeks (backcast basis Gᵇ; t = 0 is the most recent week, because the input is reversed)", { class: "t-ink" });
    txt(s, x(IN) + 4, T + 14, "forecast weeks (Gᶠ)", { class: "t-ink" });
    curves.forEach((c, i) => {
      el("path", { d: path(B[v].b[c].map((g, t) => [x(IN - 1 - t), y(g)])), fill: "none", stroke: css(cols[i]), "stroke-width": 1.4 }, s);
      el("path", { d: path(B[v].f[c].map((g, t) => [x(IN + t), y(g)])), fill: "none", stroke: css(cols[i]), "stroke-width": 1.4 }, s);
    });
    if (out) {
      el("path", { d: path(out.b.map((g, t) => [x(IN - 1 - t), y(g)])), fill: "none", stroke: css("ink"), "stroke-width": 2.6 }, s);
      el("path", { d: path(out.f.map((g, t) => [x(IN + t), y(g)])), fill: "none", stroke: css("a2"), "stroke-width": 2.6 }, s);
    }
    [0, 7, 14, 21].forEach(i => txt(s, x(i), Ht - 8, `t−${IN - 1 - i}`, { "text-anchor": "middle" }));
    txt(s, x(IN - 1), Ht - 8, "now", { "text-anchor": "end" }); [IN + 6, IN + 13].forEach(i => txt(s, x(i), Ht - 8, `+${i - IN + 1}`, { "text-anchor": "middle" }));
    let msg;
    if (v === "generic") msg = "identity basis: θ is used as it is, 28 backcast values and 14 forecast values, no shape constraint";
    else if (v === "trend") msg = "trend basis (blue 1, green t, purple t²), with t = week / 28 for the backcast and week / 14 for the forecast";
    else msg = FREQ[k] === 0 ? "frequency 0: the constant term (its sine is all zeros)" : `frequency ${FREQ[k]} cycles per 14 weeks: blue cos and green sin repeat every <b>${fmt(14 / FREQ[k], 1)}</b> weeks`;
    $("#nbbOut").innerHTML = msg + (out ? ` · thick lines: one random θ (black = backcast, orange = forecast)` : "");
    $("#nbbK").parentElement.style.display = v === "seasonality" ? "" : "none";
  }
  seg("#nbbVar", val => { v = val; theta = null; draw(); });
  $("#nbbK").addEventListener("input", e => { k = +e.target.value; draw(); });
  $("#nbbRand").addEventListener("click", () => {
    const r = rng(seed++), n = SPEC[v].nb + SPEC[v].nf;
    if (v === "generic") { let a = 0; theta = Array.from({ length: n }, (_, i) => { if (i === IN) a = 0; a = .7 * a + .5 * randn(r); return a; }); }
    else theta = Array.from({ length: n }, (_, j) => randn(r) * (v === "seasonality" ? .45 / (1 + (j % 13)) : .8));
    draw();
  });
  draw();
}

/* ---------------- NHITS: whole network */
if (document.querySelector("#figNHarch")) {
  const ST = [{ k: 2, d: 4, kn: 3 }, { k: 2, d: 2, kn: 7 }, { k: 1, d: 1, kn: 14 }];
  const build = () => stackLayout(ST.map((c, i) => [`Stack ${i + 1}`, c.k > 1 ? `MaxPool ${c.k}: 28 → ${28 / c.k}` : "no pooling: 28", `MLP → θ: 28 + ${c.kn} knots`, c.kn < 14 ? `interpolate ${c.kn} → 14` : "14 knots = 14 weeks"]), ["input window", "28 weeks, scaled"], ["forecast ŷ", "14 weeks"]);
  const steps = () => [
    { on: "all", cap: "NHITS with the neuralforecast defaults used in Labs 01–03: three stacks of one block each, wired exactly like generic N-BEATS (residual track on top, forecast track at the bottom). The differences are all inside the blocks: each one looks at a pooled input and predicts a few knots instead of every week." },
    { on: ["in", "naive"], cap: "Same start as N-BEATS: one 28-week window, robust-scaled, reversed, and the forecast starts at the last observed value. The NHITSx variant also feeds price, promotion and discount (pooled the same way) and the static features into each MLP." },
    { on: ["b0", "r0", "m0"], cap: "<b>Stack 1</b> (<code>n_pool_kernel_size=2</code>, <code>n_freq_downsample=4</code>): MaxPool1d with kernel 2 turns the 28 input weeks into 14 values (the larger week of each pair), so the MLP sees a coarser version of the window. It outputs θ = 28 backcast values + 14 // 4 = <b>3 knots</b>; linear interpolation stretches the 3 knots over the 14 weeks. (The paper defines the number of knots as ⌈r·H⌉ with an expressiveness ratio r, here 1/4, which would round up to 4; neuralforecast rounds down.) Three numbers can only draw a broad rise or fall: this stack is the low-frequency specialist." },
    { on: ["b1", "r1", "m1"], cap: "<b>Stack 2</b> (pool 2, <code>n_freq_downsample=2</code>): it receives what stack 1 did not explain, again pooled to 14 values, and predicts 14 // 2 = <b>7 knots</b>, one every two weeks. Medium-frequency wiggles." },
    { on: ["b2", "r2", "m2", "left"], cap: "<b>Stack 3</b> (pool 1, downsample 1): sees the raw residual (28 values) and predicts all <b>14 weeks</b> directly, like an N-BEATS identity block. Week-to-week detail goes here. In neuralforecast the backcast is always the full 28 values taken straight from θ and only the forecast is interpolated; the paper's equations write the backcast through the same interpolation." },
    { on: ["naive", "out"].concat(ids("p", 3), ids("f", 3)), cap: "Forecast = last value + coarse curve + medium curve + fine curve. Because the coarse stacks have so few outputs, the sum is smoother than N-BEATS' unconstrained 14 values. NHITS_MQ keeps all of this and makes each knot five numbers (one per quantile), trained with the multi-quantile loss." },
  ];
  stepper("#figNHarch", "#nhaStep", "#nhaCap", 920, 290, build, steps).draw();
}

/* ---------------- DLinear: whole network */
if (document.querySelector("#figDLarch")) {
  const build = () => ({
    nodes: [
      { id: "in", x: 8, y: 95, w: 120, h: 46, lines: ["input window x", "28 weeks, scaled"] },
      { id: "ma", x: 168, y: 20, w: 182, h: 50, lines: ["moving average, k = 25", "pad 12 each end, AvgPool1d"], col: "a1" },
      { id: "tr", x: 376, y: 20, w: 112, h: 50, lines: ["trend", "28 values"], col: "a1" },
      { id: "re", x: 376, y: 166, w: 112, h: 50, lines: ["remainder", "x − trend, 28"], col: "a3" },
      { id: "lt", x: 528, y: 20, w: 160, h: 50, lines: ["Linear_trend", "28 → 14 · 406 weights"], col: "a1" },
      { id: "ls", x: 528, y: 166, w: 160, h: 50, lines: ["Linear_season", "28 → 14 · 406 weights"], col: "a3" },
      { id: "pl", x: 740, y: 118, op: "+", col: "a2" },
      { id: "out", x: 792, y: 95, w: 122, h: 46, lines: ["forecast ŷ", "14 weeks"], col: "a2" },
    ],
    edges: [
      { id: "ma", p: [[128, 118], [148, 118], [148, 45], [168, 45]] },
      { id: "re", p: [[148, 118], [148, 191], [376, 191]], label: [260, 185, "x"] },
      { id: "tr", p: [[350, 45], [376, 45]] },
      { id: "re", p: [[432, 70], [432, 166]], dash: true, label: [438, 122, "− trend", "start"] },
      { id: "lt", p: [[488, 45], [528, 45]] },
      { id: "ls", p: [[488, 191], [528, 191]] },
      { id: "pl", p: [[688, 45], [740, 45], [740, 106]], col: "a2" },
      { id: "pl", p: [[688, 191], [740, 191], [740, 130]], col: "a2" },
      { id: "out", p: [[752, 118], [792, 118]], col: "a2" },
    ],
  });
  const steps = () => [
    { on: "all", cap: "DLinear as Lab 01 runs it (neuralforecast defaults, <code>moving_avg_window=25</code>). That is the whole model: one fixed smoothing step and two linear layers, 812 trainable numbers in total (2 × 28 × 14 weights, which is the paper's 2·T·L, plus 28 biases) against about 2.4 million in NHITS." },
    { on: ["in", "ma", "tr", "re"], cap: "<b>Decompose.</b> The 28-week window is padded with 12 copies of its first value at the front and 12 of its last value at the end, then averaged over a sliding window of 25 weeks (stride 1), giving a 28-value trend. The remainder (the paper calls it the seasonal component) is the input minus that trend. Nothing here is learned. The paper takes k = 25 from Autoformer and uses windows of 336 steps; on our 28-week window a 25-week average is almost flat, and because of the padding its two ends lean on the first and last value (13 of the 25 terms at the edge)." },
    { on: ["lt", "ls"], cap: "<b>Two linear layers.</b> The trend goes through <code>Linear_trend</code> and the remainder through <code>Linear_season</code>: each is a 14 × 28 weight matrix plus 14 biases (the paper writes the layer without a bias, X̂ = W·X). Row h of a matrix says how much each input week contributes to forecast week h. No hidden layer, no activation." },
    { on: ["pl", "out"], cap: "<b>Add.</b> The two 14-week outputs are summed and unscaled. Unlike N-BEATS and NHITS there is no residual track and no naive starting point: the linear layers must produce the level themselves." },
    { on: "all", cap: "<b>One matrix in disguise.</b> The moving average is a fixed 28 × 28 matrix A, so ŷ = W<sub>t</sub>·A·x + W<sub>s</sub>·(x − A·x) + b = (W<sub>s</sub> + (W<sub>t</sub> − W<sub>s</sub>)·A)·x + b. DLinear is a single 14 × 28 linear map of the (scaled) window. The split only changes how that map is parameterised and learned, which is why it is a good test of how much the deep models' non-linearity is worth here." },
  ];
  stepper("#figDLarch", "#dlaStep", "#dlaCap", 920, 236, build, steps).draw();
}

/* ================================================================ t0-gamma and Timestral
   Architecture walkthroughs and attention-mask explorer. Sizes are read from the released weights
   (t0-gamma model.safetensors / config.json; Timestral-209M likewise); mask rules follow
   t0/mask.py (tfc-t0) and timestral/masks.py (mistralai/timestral). */
function fmLayout(extra, roll) {
  // snake: top row left to right, bottom row right to left, one extra node in the middle row
  const TY = 16, MY = 138, BY = 252, h = 60, nodes = [], edges = [];
  return (top, bottom) => {
    const tx = [8, 172, 356, 550, 744], tw = [140, 160, 170, 170, 168];
    top.forEach((n, i) => nodes.push({ id: n.id, x: tx[i], y: TY, w: tw[i], h, lines: n.lines, col: n.col }));
    const bx = [744, 550, 356, 172], bw = [168, 170, 170, 160];
    bottom.forEach((n, i) => nodes.push({ id: n.id, x: bx[i], y: BY, w: bw[i], h, lines: n.lines, col: n.col }));
    nodes.push({ id: extra.id, x: 550, y: MY, w: 170, h: 56, lines: extra.lines, col: extra.col });
    nodes.push({ id: "roll", x: 8, y: BY, w: 140, h, lines: roll, col: "muted" });
    for (let i = 0; i < 4; i++) edges.push({ id: top[i + 1].id, p: [[tx[i] + tw[i], TY + h / 2], [tx[i + 1], TY + h / 2]] });
    edges.push({ id: bottom[0].id, p: [[828, TY + h], [828, BY]] });
    for (let i = 0; i < 3; i++) edges.push({ id: bottom[i + 1].id, p: [[bx[i], BY + h / 2], [bx[i + 1] + bw[i + 1], BY + h / 2]], col: "a2" });
    edges.push({ id: "roll", p: [[172, BY + h / 2], [148, BY + h / 2]], dash: true });
    if (extra.into === "embed") edges.push({ id: extra.id, p: [[635, MY], [635, TY + h]], col: extra.col });
    else edges.push({ id: extra.id, p: [[720, MY + 28], [790, MY + 28], [790, TY + h]], col: extra.col });
    return { nodes, edges };
  };
}

/* ---------------- t0-gamma: whole network */
if (document.querySelector("#figT0arch")) {
  const build = () => fmLayout({ id: "role", lines: ["+ role embedding", "target · past cov ·", "known-future cov"], col: "a4", into: "embed" }, ["> 1,024 steps:", "roll out, feed", "forecast back"])(
    [
      { id: "in", lines: ["history y, x", "+ known future z", "over the horizon"] },
      { id: "scale", lines: ["causal scaling", "mean, std up to t", "then arcsinh"], col: "a1" },
      { id: "patch", lines: ["patches of 32", "horizon appended", "as blanked patches"], col: "a1" },
      { id: "embed", lines: ["patch embedding", "[values‖time‖valid]", "residual MLP 96→1024"], col: "a1" },
      { id: "tf", lines: ["24 layers", "(time, time, variate)", "× 8 · width 1024"], col: "a4" },
    ],
    [
      { id: "dec", lines: ["decoder per token", "residual MLP", "1024 → 32 × 21"], col: "a2" },
      { id: "qnt", lines: ["monotone quantiles", "lowest + cumsum of", "softplus steps"], col: "a2" },
      { id: "unscale", lines: ["unscale", "μ_T + σ_T · sinh(·)"], col: "a2" },
      { id: "out", lines: ["21 quantiles", "per step, ≤ 1,024", "steps in one pass"], col: "a2" },
    ]);
  const steps = () => [
    { on: "all", cap: "t0-gamma end to end, as its released weights and the tfc-t0 code define it. Data goes in at the top left and is turned into one token per patch of 32 steps; the 24-layer transformer mixes tokens along time and across variates; the bottom row turns each token back into 32 steps × 21 quantiles. The only part that grows with the data is the number of tokens: a 10,000-step history with 3 covariates is 4 rows × 313 patches." },
    { on: ["in", "scale"], cap: "<b>Scale.</b> Each variate is standardised on its own. For the target y and past covariates x the mean and standard deviation at step t use only steps 1 … t (causal running statistics), so nothing from the future enters through the scaling; then arcsinh squashes heavy tails while staying linear near zero (a trick Chronos-2 popularised). Known-future covariates z are standardised over the whole window, since they are known over it. The forecast is mapped back with the statistics frozen at the forecast origin T, so the model itself must predict any change of level or spread (report §4.1, eq. 2)." },
    { on: ["patch"], cap: "<b>Patch.</b> Every row is cut into patches of 32 steps; the context is left-padded to a whole number of patches. The forecast horizon, rounded up to whole patches, is appended to each row: for y and x those patches are <b>blanked</b> (values 0, flagged as withheld), for z they carry the known future values. This is how the model was trained: runs of 1 to 16 patches were blanked at random (contiguous patch masking, from TiRex), so an empty horizon is a familiar sight. On our weekly data: 93 weeks of history = 2.9 patches, and the 14-week forecast is less than half a patch." },
    { on: ["embed", "role"], cap: "<b>Embed.</b> Each patch becomes one 1,024-number token. The input is 96 numbers: the 32 scaled values, a within-patch time index (0, 1/32 … 31/32) and the 32 validity bits, so a missing value and a real zero look different. A residual MLP (96 → 1,024 → 1,024 with ReLU, plus a linear skip) projects them, adapted from Chronos-2's encoder. A learned vector for the row's role (target, past covariate, known-future covariate) is added. No date or frequency feature is used anywhere." },
    { on: ["tf"], cap: "<b>24 layers</b>, two time layers then one variate layer, eight times (16 + 8). <b>Time attention</b> runs along one row's patches: causal for y and x, bidirectional for z, with rotary positions per patch and an xPos-style decay so far-away patches weigh less. <b>Variate attention</b> runs across the rows of one series at the same patch position, with no positional encoding (the order of covariates does not matter); z is read by y and x but reads only other z (see <a href=\"#m-fm-masks\">who sees what</a>). Every layer: pre-RMSNorm, QK-norm (queries and keys normalised per head), SwiGLU feed-forward 1,024 → 2 × 2,048 → 1,024. 8 heads of 128." },
    { on: ["dec", "qnt", "unscale", "out", "roll"], cap: "<b>Decode.</b> The same residual MLP (1,024 → 1,024 → 672) runs on every token and outputs 32 steps × 21 quantiles. The token at patch p forecasts patch p + 1: the last context patch gives forecast steps 1–32, the first blanked patch steps 33–64, and so on. The quantiles cannot cross: the lowest level is predicted directly and each next level adds a softplus (always positive) step. Then the scaling is undone. Up to 1,024 steps come out of one pass; for longer horizons the model forecasts 1,024 steps, folds them into the context and repeats (the report describes carrying several quantile paths, as Chronos-2 does)." },
  ];
  stepper("#figT0arch", "#t0Step", "#t0Cap", 920, 320, build, steps).draw();
}

/* ---------------- Timestral: whole network */
if (document.querySelector("#figTSarch")) {
  const build = () => fmLayout({ id: "pred", lines: ["prediction tokens", "one learned vector,", "at each forecast patch"], col: "a2", into: "tf" }, ["> 1,024 steps:", "block by block,", "medians fed back"])(
    [
      { id: "in", lines: ["history y, x", "+ known future z", "over the horizon"] },
      { id: "scale", lines: ["causal scaling", "mean, std to patch", "end, then asinh"], col: "a1" },
      { id: "patch", lines: ["patches of 32", "context up to", "32,768 steps"], col: "a1" },
      { id: "embed", lines: ["context tokens", "[values‖missing]", "residual MLP 64→768"], col: "a1" },
      { id: "tf", lines: ["24 blocks: time;", "every 4th + variate", "gated · width 768"], col: "a4" },
    ],
    [
      { id: "dec", lines: ["quantile head", "on target prediction", "tokens: 768 → 32×21"], col: "a2" },
      { id: "qnt", lines: ["monotone quantiles", "median ± cumsum", "of softplus steps"], col: "a2" },
      { id: "unscale", lines: ["unscale with stats", "up to the end of", "the previous patch"], col: "a2" },
      { id: "out", lines: ["21 quantiles", "per step, ≤ 1,024", "steps in one pass"], col: "a2" },
    ]);
  const steps = () => [
    { on: "all", cap: "Timestral-209M end to end, as its released weights and inference code define it. The difference from t0 is the middle row: the forecast is not read from the data tokens but from a second stream of <b>prediction tokens</b> that sit at the forecast positions and look back at the context." },
    { on: ["in", "scale"], cap: "<b>Scale.</b> Each patch of a variate is standardised with the mean and standard deviation of all its observed values up to the end of that patch (causal, as in Toto), then put through asinh (as in Chronos-2). Known-future covariates use statistics over the whole window, and binary ones such as holiday flags are left as 0/1. Missing values are set to 0 and flagged." },
    { on: ["patch", "embed"], cap: "<b>Patch and embed.</b> 32 steps per patch, up to 32,768 steps (1,024 patches) of context, the length used in post-training. Each patch becomes one 768-number <b>context token</b> from 64 inputs: the 32 values and 32 missing flags, through a residual MLP 64 → 3,072 → 768 (SiLU, plus a linear skip). There is no time index inside the patch, no date, and no role embedding: targets and covariates get the same kind of token." },
    { on: ["pred"], cap: "<b>Prediction tokens</b> (the report's Decoupled Horizon Forecasting). For every forecast patch j, every variate gets a copy of one learned 768-number vector, placed at position j. It carries no data, only a position, through the rotary embedding. A prediction token reads the context tokens before its forecast block and the earlier prediction tokens of the same block; context tokens never read prediction tokens. So the context is encoded once, causally, and the horizon is a separate stream on top of it." },
    { on: ["tf"], cap: "<b>24 blocks.</b> Every block does time attention then a SwiGLU feed-forward (768 → 2 × 2,048 → 768); blocks 4, 8, … 24 add variate attention in between, so 24 time and 6 variate attentions. Both attention types have a sigmoid output gate (gated attention, Qiu et al. 2025). Time attention rotates 32 of each head's 64 dimensions with RoPE; variate attention has no positions. Pre-norm RMSNorm, no biases, no dropout. 12 heads of 64. Roles enter only through the masks: covariates never read targets, and known-future covariates read only each other." },
    { on: ["dec", "qnt", "unscale", "out", "roll"], cap: "<b>Quantile head.</b> After a final RMSNorm, only the target rows' prediction tokens are read: a residual MLP 768 → 3,072 → 672 = 32 steps × 21 quantiles. The token at position j forecasts patch j itself. The median is predicted directly and the other levels fan out below and above it by cumulative softplus steps, so they cannot cross. Patch j is unscaled with the statistics up to the end of patch j − 1; inside the block those earlier patches are unknown, so the predicted medians stand in. One pass covers up to 32 patches (1,024 steps); longer horizons are forecast block by block, appending each block's median." },
  ];
  stepper("#figTSarch", "#tsStep", "#tsCap", 920, 320, build, steps).draw();
}

/* ---------------- who can see what: attention masks of t0-gamma and Timestral */
if (document.querySelector("#figFMmask")) {
  const NC = 6, NH = 3, NP = NC + NH, ROLE = ["y", "x", "z"], RCOL = ["a1", "a3", "a4"];
  const RNAME = ["target y", "past covariate x", "known-future z"];
  let model = "t0", layer = "time";
  const sel = { t0: { s: "c", r: 0, i: 5 }, ts: { s: "p", r: 0, i: 7 } };
  // which tokens exist
  const exists = (m, t) => m === "t0" ? t.s === "c" : t.s === "c" ? (t.i < NC || t.r === 2) : t.i >= NC;
  // may query q read key k? (diagonal always open)
  function sees(m, L, q, k) {
    if (q.s === k.s && q.r === k.r && q.i === k.i) return true;
    if (m === "t0") {
      if (L === "time") return k.r === q.r && (q.r === 2 || k.i <= q.i);
      return k.i === q.i && (q.r !== 2 || k.r === 2);
    }
    if (L === "time") {
      if (k.r !== q.r) return false;
      if (q.s === "c") return k.s === "c" && (q.r === 2 || k.i <= q.i);
      return (k.s === "c" && k.i < NC) || (k.s === "p" && k.i <= q.i);
    }
    if (k.s !== q.s || k.i !== q.i) return false;
    return q.r === 0 || (q.r === 1 ? k.r !== 0 : k.r === 2);
  }
  function explain(m, L, q) {
    const who = (q.s === "p" ? "prediction token of " : "") + RNAME[q.r] + (q.i < NC ? `, context patch ${q.i + 1}` : `, forecast patch ${q.i - NC + 1}`);
    let t = "";
    if (m === "t0") {
      if (L === "time") t = q.r === 2 ? "Known-future rows attend in both directions along time: z at any patch reads its whole row, including the forecast patches where its planned values are." : q.i >= NC ? "A blanked forecast patch reads its own row up to itself (causal), including earlier blanked patches. It holds no data, but its token still carries the role vector and a position, and its output forecasts the next patch." : "Causal: this patch reads its own row up to and including itself. Its output forecasts the next patch" + (q.i === NC - 1 ? ", here forecast patch 1." : ".");
      else t = q.r === 2 ? "At each patch position z reads only other known-future rows, never y or x. This closes the two-hop leak." : "At this patch position it reads every row of its series: target, past covariate and known-future covariate. At a forecast patch, this is where a planned promotion reaches the target's blanked token directly.";
    } else {
      if (q.s === "c") {
        if (L === "time") t = q.r === 2 ? "Context tokens of known-future rows read their whole row along time, the forecast patches included, but never any prediction token." : "Context tokens are causal and never read prediction tokens, so the context is encoded once and shared by every forecast block. Context outputs get no loss and are not decoded.";
        else t = q.r === 0 ? "Context token of the target: reads the context tokens of every row at this position." : q.r === 1 ? "Past covariates read other covariates but not the target: Timestral treats covariates as exogenous (report §3.2)." : "Known-future rows read only other known-future rows.";
      } else {
        if (L === "time") t = "A prediction token reads its own row's context tokens before the forecast block, and the prediction tokens of its block up to itself. Even z's prediction tokens skip z's context tokens inside the horizon: the planned future reaches the forecast through z's context tokens before the block (which have read the whole row) and then through variate attention.";
        else t = q.r === 0 ? "Prediction tokens exchange information with prediction tokens of other rows at the same position, never with context tokens. The target's prediction token reads both covariates' prediction tokens; its output is the forecast of this patch." : q.r === 1 ? "The past covariate's prediction token reads x and z, not the target. Its output is never decoded; it exists to pass information along." : "z's prediction token reads only z. Its output is never decoded.";
      }
    }
    const nk = []; ["c", "p"].forEach(s => [0, 1, 2].forEach(r => { for (let i = 0; i < NP; i++) { const k = { s, r, i }; if (exists(m, k) && sees(m, L, q, k) && !(k.s === q.s && k.r === q.r && k.i === q.i)) nk.push(k); } }));
    return `<b>${who}</b> · ${L === "time" ? "time" : "variate"} attention · reads <b>${nk.length}</b> other token${nk.length === 1 ? "" : "s"}. ${t}`;
  }
  function draw() {
    const W = 920, H = model === "t0" ? 206 : 316, s = mk("#figFMmask", W, H), q = sel[model];
    const X0 = 178, cw = 72, gap = 6, rh = 30, rg = 8, cx = i => X0 + i * (cw + gap) + (i >= NC ? 14 : 0);
    const streams = model === "t0" ? [{ s: "c", y0: 40, title: "one token per patch" }] : [{ s: "c", y0: 40, title: "context tokens" }, { s: "p", y0: 172, title: "prediction tokens" }];
    txt(s, (cx(0) + cx(NC - 1) + cw) / 2, 18, "context", { "text-anchor": "middle", class: "t-ink t-b" });
    txt(s, (cx(NC) + cx(NP - 1) + cw) / 2, 18, "forecast horizon", { "text-anchor": "middle", class: "t-ink t-b" });
    el("line", { x1: cx(NC) - 10, x2: cx(NC) - 10, y1: 8, y2: H - 30, stroke: css("muted"), "stroke-dasharray": "4 3" }, s);
    streams.forEach(st => {
      txt(s, 8, st.y0 - 8, st.title, { class: "t-ink t-b" });
      [0, 1, 2].forEach(r => {
        const y = st.y0 + r * (rh + rg);
        txt(s, 8, y + rh / 2 + 4, RNAME[r], { style: `fill:var(--${RCOL[r]})` });
        for (let i = 0; i < NP; i++) {
          const k = { s: st.s, r, i };
          if (!exists(model, k)) { if (model === "ts" && st.s === "c") txt(s, cx(i) + cw / 2, y + rh / 2 + 4, "—", { "text-anchor": "middle", opacity: .5 }); continue; }
          const isQ = q.s === k.s && q.r === r && q.i === i, ok = sees(model, layer, q, k);
          const lab = st.s === "p" ? "p" : i < NC ? "data" : r === 2 ? "known" : "blanked";
          const g = el("g", { style: "cursor:pointer", tabindex: 0, role: "button", "aria-label": `${st.s === "p" ? "prediction token" : "token"} ${RNAME[r]} patch ${i + 1}` }, s);
          el("rect", { x: cx(i), y, width: cw, height: rh, rx: 6, fill: ok ? `color-mix(in srgb,var(--${RCOL[r]}) ${isQ ? 45 : 22}%,var(--panel))` : css("panel"), stroke: isQ ? css("a2") : ok ? css(RCOL[r]) : css("line"), "stroke-width": isQ ? 3 : ok ? 1.6 : 1, ...(lab === "blanked" ? { "stroke-dasharray": "4 3" } : {}) }, g);
          txt(g, cx(i) + cw / 2, y + rh / 2 + 4, lab, { "text-anchor": "middle", class: ok ? "t-ink" : "", opacity: ok ? 1 : .45 });
          const pick = () => { sel[model] = k; draw(); };
          g.addEventListener("click", pick);
          g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); } });
        }
      });
    });
    // what each output forecasts
    const yb = H - 14;
    if (model === "t0") {
      for (let i = NC - 1; i < NP - 1; i++) el("path", { d: `M${cx(i) + cw / 2},150Q${(cx(i) + cx(i + 1)) / 2 + cw / 2},176 ${cx(i + 1) + cw / 2 - 4},152`, fill: "none", stroke: css("a2"), "stroke-width": 1.3, "marker-end": "url(#fm-ah)" }, s);
      txt(s, X0, yb, "orange arrows: the target token at each patch forecasts the next patch (last context patch → forecast patch 1)", { style: "fill:var(--a2)" });
    } else {
      txt(s, X0, yb, "the target's prediction token at a forecast patch forecasts that same patch; only those three tokens are decoded", { style: "fill:var(--a2)" });
    }
    arrowDefs(s, "fm-ah");
    $("#fmOut").innerHTML = explain(model, layer, q);
  }
  seg("#fmModel", v => { model = v; draw(); });
  seg("#fmLayer", v => { layer = v; draw(); });
  draw();

  // layer pattern strip
  const W = 920, H = 132, s = mk("#figFMlayers", W, H), X0 = 150, bw = 24, bg = 4;
  const rows = [
    { name: "t0-gamma", y: 26, cells: Array.from({ length: 24 }, (_, i) => (i % 3 === 2 ? "V" : "T")) },
    { name: "Timestral-209M", y: 82, cells: Array.from({ length: 24 }, (_, i) => (i % 4 === 3 ? "TV" : "T")) },
  ];
  txt(s, X0, 12, "layer 1 → 24 · T = time attention · V = variate attention · each followed by a feed-forward", { class: "t-ink" });
  rows.forEach(r => {
    txt(s, 8, r.y + 20, r.name, { class: "t-ink t-b" });
    r.cells.forEach((c, i) => {
      const x = X0 + i * (bw + bg);
      if (c === "TV") {
        el("rect", { x, y: r.y, width: bw, height: 15, rx: 3, fill: "color-mix(in srgb,var(--a1) 25%,var(--panel))", stroke: css("a1") }, s);
        el("rect", { x, y: r.y + 17, width: bw, height: 15, rx: 3, fill: "color-mix(in srgb,var(--a4) 25%,var(--panel))", stroke: css("a4") }, s);
        txt(s, x + bw / 2, r.y + 11, "T", { "text-anchor": "middle", class: "t-ink" });
        txt(s, x + bw / 2, r.y + 28, "V", { "text-anchor": "middle", class: "t-ink" });
      } else {
        const col = c === "V" ? "a4" : "a1";
        el("rect", { x, y: r.y, width: bw, height: 32, rx: 3, fill: `color-mix(in srgb,var(--${col}) 25%,var(--panel))`, stroke: css(col) }, s);
        txt(s, x + bw / 2, r.y + 20, c, { "text-anchor": "middle", class: "t-ink" });
      }
    });
    txt(s, X0 + 24 * (bw + bg) + 6, r.y + 20, r.name === "t0-gamma" ? "16 T + 8 V" : "24 T + 6 V", { class: "t-ink" });
  });
}

/* ---------------- how one forecasting task enters each foundation model
   Schematic: 4 context patches + 2 horizon patches per row. Behaviour per model follows the Chronos-2 report
   (§3.1–3.4), the TimesFM 2.5 code (univariate decoder + XReg), and the t0 / Timestral codes. */
if (document.querySelector("#figFMtask")) {
  let model = "ch", task = "uni";
  const NC = 4, NH = 2;
  const ROWS = {
    uni: [{ n: "target y", r: "y", c: "a1" }],
    multi: [{ n: "target y₁", r: "y", c: "a1" }, { n: "target y₂", r: "y", c: "a1" }, { n: "target y₃", r: "y", c: "a1" }],
    cov: [{ n: "target y", r: "y", c: "a1" }, { n: "past-only x", r: "x", c: "a3" }, { n: "known-future z", r: "z", c: "a4" }],
  };
  const TXT = {
    ch: {
      uni: "One row, one group. Scaled with its context mean and standard deviation, then asinh; 16-step patches with a time-index and mask channel; a REG token separates context from the empty future patches. Time attention runs both ways over everything; the future patch tokens are decoded into 21 quantiles.",
      multi: "All three variates get the same group id. In every one of the 12 blocks, group attention mixes the three rows at each patch position (no order among them), so the forecasts are joint. Give each variate its own id and you get three univariate forecasts instead.",
      cov: "Target, past-only and known-future rows share one group. The past-only row's future patches are masked like the target's; the known-future row's future patches hold the planned values. Group attention lets the target read both, in both directions; the model's outputs for covariate rows are ignored.",
    },
    tf: {
      uni: "One row, read left to right. Values and a padding mask go through a residual block into 32-step tokens; 20 causal layers; the last token predicts the next 128 steps (mean + 9 quantiles). Longer horizons append the forecast and decode again.",
      multi: "TimesFM 2.5 has no cross-variate attention: the three variates are three separate forecasts, each blind to the others.",
      cov: "Covariates never enter the network. XReg fits a ridge linear regression of y on the known-future z over the context; by default TimesFM then forecasts what the regression leaves over, and the two are added. Past-only x cannot be used: XReg needs covariate values over the horizon.",
    },
    t0: {
      uni: "One row. Causal running scaling and arcsinh; 32-step patches with values, a within-patch time index and validity flags; a role vector is added. The horizon is appended as blanked patches; each token predicts the next patch, so the last context patch and the blanked ones together cover the horizon in one pass.",
      multi: "The three rows share a group id. Time attention is causal within each row; every third layer is variate attention across the rows at each patch position, where targets read each other.",
      cov: "x is blanked over the horizon like y; z carries its planned values. In time attention z looks both ways along its row; in variate attention y and x read z and each other, but z reads only other known-future rows, which closes the two-hop leak.",
    },
    ts: {
      uni: "One row of causal context tokens (values + missing flags, 32 steps) and, over the horizon, prediction tokens: copies of one learned vector. Prediction tokens read the context; context never reads them. The target's prediction token at patch j is decoded into patch j's 21 quantiles.",
      multi: "The three rows share a group id. Every fourth block adds variate attention: context tokens mix with context tokens, prediction tokens with prediction tokens, at the same position.",
      cov: "Covariates are extra rows. z also has context tokens over the horizon with its planned values and reads its whole row; it reads only other known-future rows. x reads covariates but never the target. Only the target's prediction tokens are decoded.",
    },
  };
  function draw() {
    const rows = ROWS[task], W = 920, X0 = 150, cw = 78, gap = 6, rh = 30, rg = 10, T0 = 34;
    const sep = model === "ch" ? 34 : 14, cx = i => X0 + i * (cw + gap) + (i >= NC ? sep : 0);
    const H = T0 + rows.length * (rh + rg) + 44, s = mk("#figFMtask", W, H);
    arrowDefs(s, "fc-ah");
    txt(s, (cx(0) + cx(NC - 1) + cw) / 2, 18, model === "ch" ? "context (16-step patches)" : "context (32-step patches)", { "text-anchor": "middle", class: "t-ink t-b" });
    txt(s, (cx(NC) + cx(NC + NH - 1) + cw) / 2, 18, "forecast horizon", { "text-anchor": "middle", class: "t-ink t-b" });
    const xo = cx(NC) - (model === "ch" ? sep / 2 + 3 : 10);
    el("line", { x1: xo, x2: xo, y1: 24, y2: T0 + rows.length * (rh + rg), stroke: css("muted"), "stroke-dasharray": "4 3" }, s);
    const xreg = model === "tf" && task === "cov";
    rows.forEach((rw, k) => {
      const y = T0 + k * (rh + rg), unused = xreg && rw.r === "x", isCov = xreg && rw.r === "z";
      txt(s, 8, y + rh / 2 + 4, rw.n, { style: `fill:var(--${rw.c})` });
      if (model === "ch") { el("rect", { x: cx(NC) - sep + 3, y, width: sep - 12, height: rh, rx: 4, fill: css("grid"), stroke: css("muted") }, s); if (k === rows.length - 1) txt(s, cx(NC) - sep / 2 - 3, y + rh + 14, "REG token", { "text-anchor": "middle" }); }
      for (let i = 0; i < NC + NH; i++) {
        const fut = i >= NC;
        let lab = "data", dash = false, on = true;
        if (fut) {
          if (model === "tf") { lab = rw.r === "y" ? "forecast" : ""; on = rw.r === "y"; }
          else if (model === "ts") lab = rw.r === "z" ? "known + p" : "p";
          else if (model === "t0") { lab = rw.r === "z" ? "known" : "blanked"; dash = rw.r !== "z"; }
          else { lab = rw.r === "z" ? "known" : "masked"; dash = rw.r !== "z"; }
        }
        if (unused || isCov) { on = false; lab = fut ? (isCov ? "known" : "") : "data"; }
        if (!lab && fut) continue;
        el("rect", { x: cx(i), y, width: cw, height: rh, rx: 6, fill: on ? `color-mix(in srgb,var(--${rw.c}) ${fut ? 12 : 24}%,var(--panel))` : css("panel"), stroke: on ? css(rw.c) : css("line"), "stroke-width": 1.4, ...(dash ? { "stroke-dasharray": "4 3" } : {}) }, s);
        txt(s, cx(i) + cw / 2, y + rh / 2 + 4, lab, { "text-anchor": "middle", class: on ? "t-ink" : "", opacity: on ? 1 : .5 });
      }
      if (unused) txt(s, cx(NC) + 8, y + rh / 2 + 4, "not used", { class: "t-ink" });
    });
    const right = cx(NC + NH - 1) + cw + 12, yb = T0 + rows.length * (rh + rg) - rg;
    if (xreg) {
      el("rect", { x: right, y: T0 + 2 * (rh + rg) - 30, width: W - right - 6, height: 60, rx: 8, fill: css("soft"), stroke: css("a2") }, s);
      txt(s, right + (W - right - 6) / 2, T0 + 2 * (rh + rg) - 6, "XReg: ridge linear", { "text-anchor": "middle", class: "t-ink t-b" });
      txt(s, right + (W - right - 6) / 2, T0 + 2 * (rh + rg) + 10, "regression, outside", { "text-anchor": "middle" });
      txt(s, right + (W - right - 6) / 2, T0 + 2 * (rh + rg) + 24, "the network", { "text-anchor": "middle" });
      el("path", { d: `M${right + 40},${T0 + 2 * (rh + rg) - 30}L${right + 40},${T0 + rh / 2}L${right + 2},${T0 + rh / 2}`, fill: "none", stroke: css("a2"), "stroke-width": 1.6, "marker-end": "url(#fc-ah)" }, s);
      txt(s, right + 46, T0 + rh + 10, "+ its forecast", { style: "fill:var(--a2)" });
    } else if (rows.length > 1) {
      const lab = model === "tf" ? ["no link between rows:", "3 separate forecasts"] : model === "ch" ? ["one group: group", "attention, every block"] : model === "t0" ? ["variate attention,", "every 3rd layer"] : ["variate attention,", "every 4th block"];
      if (model !== "tf") el("path", { d: `M${right},${T0 + 2}L${right + 10},${T0 + 2}L${right + 10},${yb - 2}L${right},${yb - 2}`, fill: "none", stroke: css("a4"), "stroke-width": 2 }, s);
      lab.forEach((l, i) => txt(s, right + 18, (T0 + yb) / 2 - 4 + i * 14, l, { class: "t-ink" }));
    }
    const dirs = { ch: "time attention: both directions", tf: "time attention: causal", t0: "time attention: causal (known-future rows both ways)", ts: "time attention: causal; prediction tokens read the context" };
    txt(s, X0, H - 14, dirs[model], { style: "fill:var(--a2)" });
    $("#fcOut").innerHTML = TXT[model][task];
  }
  seg("#fcModel", v => { model = v; draw(); });
  seg("#fcTask", v => { task = v; draw(); });
  draw();
}

/* ---------------- attention in one picture: full vs causal */
if (document.querySelector("#figAT")) {
  const NPAT = 5, PL = 16, y = SM.y.slice(TEST0 - NPAT * PL, TEST0);
  // per patch: level and slope, standardised across patches, then unit length
  const feat = Array.from({ length: NPAT }, (_, k) => {
    const s = y.slice(k * PL, k * PL + PL), m = s.reduce((a, b) => a + b, 0) / PL;
    const tm = (PL - 1) / 2; let num = 0, den = 0; s.forEach((v, i) => { num += (i - tm) * (v - m); den += (i - tm) ** 2; });
    return [m, num / den];
  });
  const z = j => { const c = feat.map(f => f[j]), mu = c.reduce((a, b) => a + b, 0) / NPAT, sd = Math.sqrt(c.reduce((a, b) => a + (b - mu) ** 2, 0) / NPAT) || 1; return c.map(v => (v - mu) / sd); };
  const L0 = z(0), S0 = z(1), vec = L0.map((l, k) => { const n = Math.hypot(l, S0[k]) || 1; return [l / n, S0[k] / n]; });
  let q = NPAT - 1, mode = "full";
  function weights(qi) {
    const sc = vec.map(k => 3 * (vec[qi][0] * k[0] + vec[qi][1] * k[1]));
    const ok = sc.map((_, j) => mode === "full" || j <= qi);
    const ex = sc.map((v, j) => ok[j] ? Math.exp(v) : 0), Z = ex.reduce((a, b) => a + b, 0);
    return { sc, ok, w: ex.map(v => v / Z) };
  }
  function draw() {
    const W = 900, H = 330, L = 30, R = 300, s = mk("#figAT", W, H), x = lin(0, NPAT * PL, L, W - R);
    const mx = Math.max(...y) * 1.1, yy = lin(0, mx, 120, 16);
    const { sc, ok, w } = weights(q);
    el("path", { d: path(y.map((v, i) => [x(i + .5), yy(v)])), fill: "none", stroke: css("ink"), "stroke-width": 1.6 }, s);
    for (let k = 0; k < NPAT; k++) {
      const x0 = x(k * PL) + 3, ww = x(PL) - x(0) - 6, isq = k === q;
      el("rect", { x: x0, y: 10, width: ww, height: 116, fill: "none", stroke: css(isq ? "a2" : "a1"), "stroke-width": isq ? 2.5 : 1.2, rx: 4 }, s);
      const g = el("g", { role: "button", tabindex: 0, style: "cursor:pointer", "aria-label": `make patch ${k + 1} the query` }, s);
      el("rect", { x: x0 + 8, y: 136, width: ww - 16, height: 24, rx: 5, fill: css(isq ? "a2" : "a1"), opacity: ok[k] || isq ? 1 : .25 }, g);
      txt(g, x0 + ww / 2, 152, isq ? `query ${k + 1}` : `token ${k + 1}`, { "text-anchor": "middle", style: "fill:var(--panel)" });
      g.addEventListener("click", () => { q = k; draw(); });
      g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); q = k; draw(); } });
      // weight bar
      const bx = x0 + 8, bw = ww - 16, by = 176, bh = 90;
      el("rect", { x: bx, y: by, width: bw, height: bh, fill: "color-mix(in srgb,var(--muted) 10%,transparent)", rx: 3 }, s);
      if (ok[k]) el("rect", { x: bx, y: by + bh * (1 - w[k]), width: bw, height: bh * w[k], fill: css("a2"), opacity: .85, rx: 3 }, s);
      txt(s, bx + bw / 2, by + bh + 16, ok[k] ? `w = ${w[k].toFixed(2)}` : "blocked", { "text-anchor": "middle", style: ok[k] ? "" : "fill:var(--muted)" });
      txt(s, bx + bw / 2, by + bh + 32, `score ${sc[k].toFixed(1)}`, { "text-anchor": "middle", style: "fill:var(--muted)" });
      if (ok[k] && k !== q) { const xs_ = x(k * PL + PL / 2), xe = x(q * PL + PL / 2); el("path", { d: `M${xs_},134 Q${(xs_ + xe) / 2},${100 - 30 * Math.abs(k - q) / NPAT} ${xe},134`, fill: "none", stroke: css("a2"), "stroke-width": .6 + 8 * w[k], opacity: .7 }, s); }
    }
    txt(s, L, by_ = 172, "attention weights of the query (they sum to 1)", { style: "fill:var(--muted)" });
    // full weight matrix
    const mx0 = W - R + 60, cs = 34, my0 = 40;
    txt(s, mx0, my0 - 14, mode === "full" ? "all queries, full attention" : "all queries, causal mask", {});
    for (let r = 0; r < NPAT; r++) { const wr = weights(r); for (let c = 0; c < NPAT; c++) { const on = wr.ok[c]; el("rect", { x: mx0 + c * cs, y: my0 + r * cs, width: cs - 3, height: cs - 3, rx: 3, fill: on ? "var(--a2)" : "color-mix(in srgb,var(--muted) 15%,transparent)", opacity: on ? .15 + .85 * wr.w[c] : 1, stroke: r === q ? css("ink") : "none", "stroke-width": 1.2 }, s); if (on) txt(s, mx0 + c * cs + cs / 2 - 1.5, my0 + r * cs + 21, wr.w[c].toFixed(2).replace(/^0/, ""), { "text-anchor": "middle", style: "font-size:10px" }); } }
    for (let r = 0; r < NPAT; r++) { txt(s, mx0 - 6, my0 + r * cs + 21, `${r + 1}`, { "text-anchor": "end" }); txt(s, mx0 + r * cs + cs / 2 - 1.5, my0 + NPAT * cs + 14, `${r + 1}`, { "text-anchor": "middle" }); }
    txt(s, mx0, my0 + NPAT * cs + 32, "row = query, column = key", { style: "fill:var(--muted)" });
    const terms = w.map((v, j) => ok[j] ? `${v.toFixed(2)}·v${j + 1}` : null).filter(Boolean).join(" + ");
    $("#atOut").innerHTML = `new token ${q + 1} = ${terms}` + (mode === "causal" && q < NPAT - 1 ? `   (tokens ${q + 2}–${NPAT} are later in time: blocked)` : "");
  }
  let by_;
  seg("#atMode", v => { mode = v; draw(); }); draw();
}

/* ---------------- encoder-decoder, encoder-only, decoder-only */
if (document.querySelector("#figST")) {
  // token kinds: c context, r REG, f future placeholder, w withheld horizon patch, p prediction token, d decoder output token
  const M = {
    ed: { toks: ["c", "c", "c", "c", "d", "d", "d"], lab: ["x1", "x2", "x3", "x4", "out1", "out2", "out3"],
      sees: (i, j, t) => t[i] === "c" ? t[j] === "c" : (t[j] === "c" || j <= i),
      out: (i, t) => t[i] === "d" ? "next value" : null, hi: i => i === 6,
      title: "Encoder-decoder (original Transformer; Chronos 1 uses T5)" },
    ch: { toks: ["c", "c", "c", "c", "r", "f", "f"], lab: ["p1", "p2", "p3", "p4", "REG", "f1", "f2"],
      sees: () => true, out: (i, t) => t[i] === "f" ? `patch ${i - 4 + 4}` : null, hi: (i, t) => t[i] === "f",
      title: "Chronos-2: encoder-only, everything reads everything" },
    tf: { toks: ["c", "c", "c", "c"], lab: ["p1", "p2", "p3", "p4"],
      sees: (i, j) => j <= i, out: () => "next 128 steps", hi: i => i === 3,
      title: "TimesFM 2.5: decoder-only, causal (20 layers, 1,280 wide)" },
    t0: { toks: ["c", "c", "c", "c", "w", "w"], lab: ["p1", "p2", "p3", "p4", "blank5", "blank6"],
      sees: (i, j) => j <= i, out: i => `patch ${i + 2}`, hi: i => i === 3 || i === 4,
      title: "t0-gamma: decoder-style, causal, horizon appended as blank patches" },
    ts: { toks: ["c", "c", "c", "c", "p", "p"], lab: ["p1", "p2", "p3", "p4", "pred5", "pred6"],
      sees: (i, j, t) => t[i] === "c" ? (t[j] === "c" && j <= i) : (t[j] === "c" || j <= i),
      out: (i, t) => t[i] === "p" ? `patch ${i + 1}` : null, hi: (i, t) => t[i] === "p",
      title: "Timestral: causal context + separate prediction tokens" },
  };
  const TXT = {
    ed: ["<b>Stack.</b> An encoder reads the context with full attention. A separate decoder generates the output one token at a time: it reads its own earlier outputs causally and reads all encoder tokens through cross-attention (the left block of the grid).",
      "<b>Training.</b> Each decoder token learns to predict the next output token (teacher forcing: the true previous value is fed in).",
      "<b>Forecasting.</b> One full decoder pass per output token: predict, append, repeat. Chronos 1 turns each value into one of 4,096 bins and samples paths this way, so long horizons are slow."],
    ch: ["<b>Stack.</b> 12 T5-encoder blocks, each with time attention and group attention, no causal mask. The context patches, a REG separator token and placeholder patches for the forecast window all read each other. The future placeholders carry the known-future covariate values and a mask saying the target is missing there.",
      "<b>Training.</b> Each example is split into a context and a future window; the quantile loss is computed on the future window only. One forecast origin per example.",
      "<b>Forecasting.</b> One pass. The head reads the future tokens and outputs 21 quantiles for every forecast step at once (multi-patch output), so there is no loop for horizons the model supports."],
    tf: ["<b>Stack.</b> 20 causal transformer layers, like a GPT. Token <i>j</i> reads tokens 1..<i>j</i> only. There are no future tokens: the series simply ends.",
      "<b>Training.</b> Every token predicts the <b>128</b> steps that follow its own 32-step patch, all in one pass: patch 1 forecasts steps 33–160, patches 1–2 forecast 65–192, and so on. One series gives many training forecasts, one per position. This is the recipe in the TimesFM paper, which describes version 1.0; 2.5 has no paper, but its code keeps the 32-in / 128-out design.",
      "<b>Forecasting.</b> Read the context (up to 16k steps in 2.5) once and take the output of the <b>last</b> token: the next 128 steps. For a longer horizon, the median of those 128 steps is appended as 4 new patches and the model runs again (autoregressive, in the 2.5 code). Our 14-week horizon needs one pass."],
    t0: ["<b>Stack.</b> 24 layers (time, time, variate) × 8. Time attention is causal for the target and past covariates, like a decoder; known-future covariates read their whole row in both directions.",
      "<b>Training.</b> Each token predicts the next 32-step patch (teacher forcing). Contiguous spans of patches are also blanked at random, so the model learns to fill in or continue past missing stretches (contiguous patch masking, t0 report §2).",
      "<b>Forecasting.</b> The horizon is appended as blank (withheld) patches. The last context token forecasts horizon patch 1, the first blank token forecasts patch 2, and so on, all in one pass up to the maximum horizon; beyond it the model continues autoregressively (<code>t0/rollout.py</code>)."],
    ts: ["<b>Stack.</b> 24 blocks. Context tokens attend causally to the context only, so each context token summarises the series up to its patch. Separate learned prediction tokens sit at the forecast positions; they read the context before the forecast block and the earlier prediction tokens of the same block.",
      "<b>Training.</b> Decoupled Horizon Forecasting: forecast blocks are placed at several origins in one sequence. Each observed value is both a target for an earlier origin and context for a later one, without masking out context.",
      "<b>Forecasting.</b> One pass: each prediction token outputs 21 quantiles for its own 32-step patch. Timestral's report calls this a causal encoder-only model."],
  };
  let m = "ch";
  function draw() {
    const W = 900, H = 300, s = mk("#figST", W, H), d = M[m], t = d.toks, n = t.length;
    const x0 = 30, sp = 70, tw = 60, ty = 190;
    const col = k => ({ c: "a1", r: "muted", f: "a2", w: "a2", p: "a2", d: "a3" })[k];
    txt(s, x0, 22, d.title, { class: "t-ink", style: "font-weight:600" });
    if (m === "ed") { txt(s, x0 + 2 * sp + tw / 2 - 30, ty + 52, "encoder", { "text-anchor": "middle", style: "fill:var(--a1)" }); txt(s, x0 + 5 * sp + tw / 2, ty + 52, "decoder", { "text-anchor": "middle", style: "fill:var(--a3)" }); }
    else { const nc = t.filter(k => k === "c").length; txt(s, x0 + (nc - 1) * sp / 2 + tw / 2, ty + 52, "context (what we observed)", { "text-anchor": "middle", style: "fill:var(--a1)" }); if (n > nc) txt(s, x0 + (nc + (n - 1)) * sp / 2 + tw / 2, ty + 52, m === "ch" ? "separator + future" : "forecast window", { "text-anchor": "middle", style: "fill:var(--a2)" }); }
    for (let i = 0; i < n; i++) {
      const x = x0 + i * sp, dashed = t[i] === "f" || t[i] === "w" || t[i] === "p";
      el("rect", { x, y: ty, width: tw, height: 30, rx: 5, fill: dashed ? "color-mix(in srgb,var(--a2) 14%,transparent)" : css(col(t[i])), stroke: css(col(t[i])), "stroke-dasharray": dashed ? "4 3" : "none" }, s);
      txt(s, x + tw / 2, ty + 20, d.lab[i], { "text-anchor": "middle", style: dashed ? "fill:var(--a2)" : "fill:var(--panel)" });
      const o = d.out(i, t);
      if (o) {
        const h = d.hi(i, t), yo = 92 + (i % 2) * 28;
        el("line", { x1: x + tw / 2, x2: x + tw / 2, y1: ty - 4, y2: yo + 8, stroke: css(h ? "a2" : "muted"), "stroke-width": h ? 2 : 1, "marker-end": "url(#stArr)" }, s);
        txt(s, x + tw / 2, yo, "→ " + o, { "text-anchor": "middle", style: h ? "fill:var(--a2);font-weight:600" : "fill:var(--muted)" });
      }
    }
    const mk_ = el("marker", { id: "stArr", viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 6, markerHeight: 6, orient: "auto-start-reverse" }, el("defs", {}, s)); el("path", { d: "M0,0L10,5L0,10z", fill: css("muted") }, mk_);
    txt(s, x0, 62, m === "tf" ? "trained: every token predicts what follows it; forecast: take the last one" : m === "ed" ? "each decoder token predicts the next value; generated one at a time" : "highlighted outputs make the forecast", { style: "fill:var(--muted)" });
    // mask grid
    const cs = 26, gx = 560 + (7 - n) * cs / 2, gy = 50;
    txt(s, gx, gy - 12, "who may read whom (time)", {});
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
      const on = d.sees(r, c, t);
      el("rect", { x: gx + c * cs + 34, y: gy + r * cs, width: cs - 3, height: cs - 3, rx: 3, fill: on ? css(col(t[c])) : "color-mix(in srgb,var(--muted) 15%,transparent)", opacity: on ? (t[c] === "f" || t[c] === "w" || t[c] === "p" ? .55 : .9) : 1 }, s);
    }
    for (let r = 0; r < n; r++) { txt(s, gx + 30, gy + r * cs + 16, d.lab[r], { "text-anchor": "end", style: "font-size:10px" }); const tt = txt(s, gx + r * cs + 34 + cs / 2, gy + n * cs + 6, d.lab[r], { "text-anchor": "end", style: "font-size:10px", transform: `rotate(-60 ${gx + r * cs + 34 + cs / 2} ${gy + n * cs + 6})` }); }
    txt(s, gx + 34, gy + n * cs + 48, "row reads column", { style: "fill:var(--muted)" });
    $("#stOut").innerHTML = TXT[m].map(p => `<p>${p}</p>`).join("");
  }
  seg("#stModel", v => { m = v; draw(); }); draw();
}
