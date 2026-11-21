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
  const truth = Array.from({ length: N }, (_, t) => 40 + 0.6 * t + 10 * Math.sin(2 * Math.PI * t / 13) + 3 * randn(r));
  const inp = truth.slice(0, IN);
  function lsq(X, yv) { // normal equations, small k
    const k = X[0].length, A = Array.from({ length: k }, () => Array(k + 1).fill(0));
    X.forEach((row, i) => { for (let a = 0; a < k; a++) { for (let b = 0; b < k; b++) A[a][b] += row[a] * row[b]; A[a][k] += row[a] * yv[i]; } });
    for (let a = 0; a < k; a++) A[a][a] += 1e-6;
    for (let c = 0; c < k; c++) { let p = c; for (let q = c + 1; q < k; q++) if (Math.abs(A[q][c]) > Math.abs(A[p][c])) p = q; [A[c], A[p]] = [A[p], A[c]]; for (let q = 0; q < k; q++) if (q !== c) { const m = A[q][c] / A[c][c]; for (let b = c; b <= k; b++) A[q][b] -= m * A[c][b]; } }
    return A.map((row, a) => row[k] / row[a]);
  }
  const tb = t => [1, t / N, (t / N) ** 2];
  const sb = t => { const o = []; for (let k = 1; k <= 4; k++) o.push(Math.sin(2 * Math.PI * k * t / N), Math.cos(2 * Math.PI * k * t / N)); return o; };
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
  const CFG = [{ pool: 2, knots: 4, col: "a1" }, { pool: 2, knots: 7, col: "a3" }, { pool: 1, knots: 14, col: "a2" }];
  let st = 0;
  function interp(knots, n) { const k = knots.length; if (k === n) return knots.slice(); return Array.from({ length: n }, (_, t) => { const p = t * (k - 1) / (n - 1), i = Math.floor(p), f = p - i; return i >= k - 1 ? knots[k - 1] : knots[i] * (1 - f) + knots[i + 1] * f; }); }
  function draw() {
    const c = CFG[st], W = 900, H = 260, L = 50, R = 12, T = 24, B = 26, s = mk("#figNHX", W, H);
    const x = lin(0, IN + HZ - 1, L, W - R), mx = Math.max(...y) * 1.1, yy = lin(0, mx, H - B, T);
    yAxis(s, yy, ticks(0, mx, 4), L, W - R);
    el("line", { x1: x(IN - .5), x2: x(IN - .5), y1: T, y2: H - B, stroke: css("ink"), "stroke-dasharray": "3 3" }, s);
    txt(s, x(2), 14, `input, max-pooled by ${c.pool}`, { class: "t-ink t-b" }); txt(s, x(IN + 1), 14, `forecast from ${c.knots} knots`, { class: "t-ink t-b" });
    el("path", { d: path(y.map((v, t) => [x(t), yy(v)])), fill: "none", stroke: css("muted"), "stroke-width": 1.2, opacity: .6 }, s);
    for (let i = 0; i < IN; i += c.pool) { const m = Math.max(...inp.slice(i, i + c.pool)); el("rect", { x: x(i) - 3, y: yy(m), width: x(i + c.pool) - x(i) - 1, height: 3, fill: css(c.col) }, s); }
    const kn = Array.from({ length: c.knots }, (_, k) => fut[Math.round(k * (HZ - 1) / (c.knots - 1))]);
    const curve = interp(kn, HZ);
    el("path", { d: path(curve.map((v, t) => [x(IN + t), yy(v)])), fill: "none", stroke: css(c.col), "stroke-width": 2.6 }, s);
    kn.forEach((v, k) => el("circle", { cx: x(IN + Math.round(k * (HZ - 1) / (c.knots - 1))), cy: yy(v), r: 4.5, fill: css(c.col) }, s));
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
    // heatmaps
    const W2 = 900, H2 = 170, s2 = mk("#figDLw", W2, H2), cw = (W2 / 2 - 40) / IN, ch = (H2 - 40) / HZ;
    const mxw = Math.max(...Wm.flat().map(Math.abs)) || 1;
    [["trend weights", 0, 20], ["remainder weights", IN, W2 / 2 + 20]].forEach(([name, off, x0]) => {
      txt(s2, x0, 14, name + " (rows = forecast week, columns = input week)", { class: "t-ink" });
      for (let h = 0; h < HZ; h++) for (let i = 0; i < IN; i++) { const v = Wm[h][off + i] / mxw; el("rect", { x: x0 + i * cw, y: 24 + h * ch, width: cw, height: ch, fill: v >= 0 ? `color-mix(in srgb,var(--a1) ${Math.round(Math.min(1, v * 1.6) * 100)}%,var(--panel))` : `color-mix(in srgb,var(--a2) ${Math.round(Math.min(1, -v * 1.6) * 100)}%,var(--panel))` }, s2); }
    });
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
  const sc = y.reduce((a, b) => a + Math.abs(b), 0) / IN, ys = y.map(v => v / sc);
  const CAP = ["Divide the history by its mean absolute value, so every series in the world looks the same size to the model.", "Cut the scaled history into patches of 16 weeks. Each patch becomes one token, like a word in a sentence.", "Known future covariates (price, promotion) get their own rows of tokens, covering the forecast weeks too. Group attention lets the series and its covariates read each other.", "Forecast tokens attend to every past patch and to the covariates: which earlier stretches look like what comes next?", "The model outputs quantiles for every forecast week at once, then undoes the scaling. Shown here is an illustrative fan, not a Chronos-2 run."];
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
    "In pretraining every token learns to predict the stretch that follows its own patch. So the model trains on many forecasts per series at once.",
    "At forecast time the last token outputs a long output patch (128 steps in TimesFM 2.5) with a median and quantiles. We keep the first 14 weeks. Shown here is an illustrative fan, not a TimesFM run.",
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
    if (st >= 1) {
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
    if (st === 2) for (let k = 0; k < NP - 1; k++) {
      const x0 = x((k + 1) * P), x1 = x(Math.min((k + 1) * P + 24, NP * P));
      el("rect", { x: x0, y: 20, width: x1 - x0, height: 120, fill: "color-mix(in srgb,var(--a2) 18%,transparent)", stroke: css("a2"), "stroke-dasharray": "4 3" }, s);
      el("path", { d: `M${x(k * P + P / 2)},154 C${x(k * P + P / 2)},120 ${x0 + 10},150 ${x0 + 10},140`, fill: "none", stroke: css("a2"), "stroke-width": 1.8 }, s);
      txt(s, (x0 + x1) / 2, 34, `target for token ${k + 1}`, { "text-anchor": "middle", style: "fill:var(--a2)" });
    }
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
