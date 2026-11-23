// Day 2 bonus: delay embeddings (Takens) on the workshop data. Standalone: every figure is drawn here from
// src/data/day2-embedding.json (curves and panel numbers computed offline with teaspoon, neurokit2, pyEDM, pyunicorn;
// portraits and recurrence plots are computed in the browser from the raw series).
import E from "../data/day2-embedding.json";

if (document.querySelector("#embSeries")) {
  const $ = s => document.querySelector(s);
  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, attrs = {}, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const txt = (p, x, y, s, a = {}) => { const t = el("text", { x, y, ...a }, p); t.textContent = s; return t; };
  const mk = (id, w, h) => { const host = $(id); host.innerHTML = ""; return el("svg", { viewBox: `0 0 ${w} ${h}`, role: "img" }, host); };
  const lin = (d0, d1, r0, r1) => v => r0 + (v - d0) / ((d1 - d0) || 1) * (r1 - r0);
  const ticks = (lo, hi, n = 5) => { if (!(hi > lo)) return [lo]; const step = Math.pow(10, Math.floor(Math.log10((hi - lo) / n))); const m = [1, 2, 2.5, 5, 10].find(m => (hi - lo) / (m * step) <= n) * step; const out = []; for (let v = Math.ceil(lo / m) * m; v <= hi + 1e-9; v += m) out.push(+v.toFixed(10)); return out; };
  const fmt = (v, d = 0) => v == null ? "–" : v.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d });
  const short = v => Math.abs(v) >= 1e6 ? fmt(v / 1e6, 0) + "M" : Math.abs(v) >= 1e4 ? fmt(v / 1e3, 0) + "k" : fmt(v, Math.abs(v) < 10 && v % 1 ? 1 : 0);
  const path = pts => pts.filter(p => p && isFinite(p[0]) && isFinite(p[1])).map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join("");
  const yAxis = (s, y, tk, x0, x1, f = short) => tk.forEach(v => { el("line", { x1: x0, x2: x1, y1: y(v), y2: y(v), class: "gl" }, s); txt(s, x0 - 6, y(v) + 4, f(v), { "text-anchor": "end" }); });
  const css = v => `var(--${v})`;
  const rng = seed => { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; };
  const mon = s => new Date(s + "T00:00:00Z").toLocaleString("en-US", { month: "short", year: "2-digit", timeZone: "UTC" });

  const ST = { k: E.order[0], tau: E.ex[E.order[0]].tau_mi, dim: 3, col: "time", log: false, t: null, rr: 10, yaw: -0.6, pitch: 0.45, playing: null };
  const cur = () => E.ex[ST.k];
  const series = () => { const y = cur().y.map(v => v ?? NaN); return ST.log ? y.map(v => Math.log1p(Math.max(v, 0))) : y; };
  const isRef = () => !cur().promo && !["total", "dept"].includes(ST.k);

  // ---------- series selector ----------
  const segS = $("#embSeries");
  E.order.forEach(k => { const b = document.createElement("button"); b.textContent = E.ex[k].short; b.dataset.v = k; b.setAttribute("aria-pressed", k === ST.k); segS.appendChild(b); });
  segS.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
    segS.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
    ST.k = b.dataset.v; ST.tau = cur().tau_mi; ST.t = null; $("#embTau").value = ST.tau; drawAll();
  }));
  const seg = (id, key, cb) => $(id).querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
    $(id).querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); ST[key] = isNaN(+b.dataset.v) ? b.dataset.v : +b.dataset.v; (cb || drawAll)();
  }));
  seg("#embDim", "dim"); seg("#embCol", "col", () => { drawTs(); drawPortrait(); });
  $("#embTau").addEventListener("input", e => { ST.tau = +e.target.value; drawAll(); });
  $("#embLog").addEventListener("change", e => { ST.log = e.target.checked; drawAll(); });
  $("#embT").addEventListener("input", e => { ST.t = +e.target.value; drawTs(); drawPortrait(); drawNb(); });
  $("#embPlay").addEventListener("click", () => {
    if (ST.playing) { clearInterval(ST.playing); ST.playing = null; $("#embPlay").textContent = "Play"; return; }
    $("#embPlay").textContent = "Pause";
    const y = series(), lo = (ST.dim - 1) * ST.tau;
    if (ST.t == null || ST.t >= y.length - 1) ST.t = lo;
    ST.playing = setInterval(() => { ST.t++; if (ST.t > y.length - 1) ST.t = lo; $("#embT").value = ST.t; drawTs(); drawPortrait(); drawNb(); }, y.length > 300 ? 25 : 90);
  });
  $("#embRR").addEventListener("input", e => { ST.rr = +e.target.value; drawRP(); });

  // ---------- embedding ----------
  function embed(y, m, tau) { const pts = []; for (let t = (m - 1) * tau; t < y.length; t++) { const v = []; for (let j = 0; j < m; j++) v.push(y[t - j * tau]); if (v.every(isFinite)) pts.push({ t, v }); } return pts; }
  const nTrain = () => cur().n_train;
  const nowT = () => ST.t ?? (cur().y.length === E.dates.length ? nTrain() - 1 : cur().y.length - 1 - 8);
  function colOf(t) {
    const N = cur().y.length;
    if (ST.col === "split") return t >= nTrain() ? css("a2") : css("a1");
    if (ST.col === "promo") return cur().promo && cur().promo[t] ? css("a2") : "#94a3b8";
    const u = t / (N - 1); return `hsl(${220 - 200 * u} 70% ${45 + 5 * u}%)`;
  }

  function drawTs() {
    const y = series(), N = y.length, W = 720, H = 210, L = 58, R = 12, T = 14, B = 26;
    const s = mk("#embTs", W, H), fin = y.filter(isFinite);
    const lo = Math.min(...fin), hi = Math.max(...fin), x = lin(0, N - 1, L, W - R), yy = lin(lo - 0.05 * (hi - lo), hi + 0.05 * (hi - lo), H - B, T);
    if (N === E.dates.length) {
      el("rect", { x: x(nTrain() - 0.5), y: T, width: x(N - 1) - x(nTrain() - 0.5), height: H - B - T, fill: "color-mix(in srgb,var(--a2) 12%,transparent)" }, s);
      txt(s, x(nTrain()) + 4, T + 12, "test", {});
      if (cur().promo) cur().promo.forEach((p, i) => { if (p) el("rect", { x: x(i - 0.5), y: H - B - 5, width: Math.max(1, x(1) - x(0)), height: 5, fill: css("a2"), opacity: 0.55 }, s); });
      for (let i = 0; i < N; i += 13) txt(s, x(i), H - 8, mon(E.dates[i]), { "text-anchor": "middle" });
    } else for (const v of ticks(0, N - 1, 8)) txt(s, x(v), H - 8, fmt(v), { "text-anchor": "middle" });
    yAxis(s, yy, ticks(lo, hi, 4), L, W - R);
    el("path", { d: path(y.map((v, i) => [x(i), yy(v)])), fill: "none", stroke: css("ink"), "stroke-width": N > 300 ? 1 : 1.4 }, s);
    const t = nowT(), lab = ["x(t)", "x(t−τ)", "x(t−2τ)"];
    for (let j = ST.dim - 1; j >= 0; j--) {
      const tj = t - j * ST.tau; if (tj < 0) continue;
      el("line", { x1: x(tj), x2: x(tj), y1: T, y2: H - B, stroke: [css("a1"), css("a3"), css("a4")][j], "stroke-dasharray": "3 3" }, s);
      el("circle", { cx: x(tj), cy: yy(y[tj]), r: 4.5, fill: [css("a1"), css("a3"), css("a4")][j] }, s);
      const right = x(tj) > W - 90;
      txt(s, x(tj) + (right ? -5 : 5), T + 26 + 13 * j, lab[j], { class: "t-ink", "text-anchor": right ? "end" : "start" });
    }
    const tmax = N - 1, tmin = (ST.dim - 1) * ST.tau, ts = $("#embT");
    ts.min = tmin; ts.max = tmax; if (ST.t == null) ts.value = nowT();
  }

  function drawPortrait() {
    const y = series(), pts = embed(y, ST.dim, ST.tau), W = 440, H = 400, s = mk("#embPortrait", W, H);
    if (!pts.length) return;
    const fin = y.filter(isFinite), lo = Math.min(...fin), hi = Math.max(...fin), nz = v => 2 * (v - lo) / ((hi - lo) || 1) - 1;
    let P;
    if (ST.dim === 2) {
      const x = lin(-1.08, 1.08, 54, W - 14), yy = lin(-1.08, 1.08, H - 36, 14);
      const tk = ticks(lo, hi, 4);
      tk.forEach(v => { el("line", { x1: x(nz(v)), x2: x(nz(v)), y1: 14, y2: H - 36, class: "gl" }, s); el("line", { x1: 54, x2: W - 14, y1: yy(nz(v)), y2: yy(nz(v)), class: "gl" }, s); txt(s, x(nz(v)), H - 22, short(v), { "text-anchor": "middle" }); txt(s, 48, yy(nz(v)) + 4, short(v), { "text-anchor": "end" }); });
      txt(s, (W + 54) / 2, H - 6, "x(t)", { "text-anchor": "middle", class: "t-ink" });
      txt(s, 12, 24, "x(t−τ)", { class: "t-ink" });
      el("line", { x1: x(-1), y1: yy(-1), x2: x(1), y2: yy(1), stroke: "#cbd5e1", "stroke-dasharray": "4 4" }, s);
      P = pts.map(p => ({ t: p.t, X: x(nz(p.v[0])), Y: yy(nz(p.v[1])), z: 0 }));
    } else {
      const cy = Math.cos(ST.yaw), sy = Math.sin(ST.yaw), cp = Math.cos(ST.pitch), sp = Math.sin(ST.pitch), sc = 128;
      const proj = (a, b, c) => { const x1 = a * cy - b * sy, y1 = a * sy + b * cy; return { X: W / 2 + sc * x1, Y: H / 2 + 10 - sc * (c * cp - y1 * sp), z: y1 * cp + c * sp }; };
      // axes box edges
      const corners = [-1, 1];
      for (const a of corners) for (const b of corners) {
        [[[a, b, -1], [a, b, 1]], [[a, -1, b], [a, 1, b]], [[-1, a, b], [1, a, b]]].forEach(([p, q]) => { const u = proj(...p), v = proj(...q); el("line", { x1: u.X, y1: u.Y, x2: v.X, y2: v.Y, stroke: "#e2e8f0" }, s); });
      }
      const ax = [["x(t)", [1.18, -1, -1]], ["x(t−τ)", [-1, 1.18, -1]], ["x(t−2τ)", [-1, -1, 1.15]]];
      ax.forEach(([l, p]) => { const u = proj(...p); txt(s, u.X, u.Y, l, { class: "t-ink", "text-anchor": "middle" }); });
      P = pts.map(p => ({ t: p.t, ...proj(nz(p.v[0]), nz(p.v[1]), nz(p.v[2])) }));
    }
    el("path", { d: path(P.map(p => [p.X, p.Y])), fill: "none", stroke: "#94a3b8", "stroke-width": P.length > 300 ? 0.6 : 0.9, opacity: 0.8 }, s);
    const r = P.length > 300 ? 1.6 : 3;
    [...P].sort((a, b) => a.z - b.z).forEach(p => el("circle", { cx: p.X, cy: p.Y, r, fill: colOf(p.t), opacity: 0.9 }, s));
    const t = nowT(), q = P.find(p => p.t === t);
    if (q) { el("circle", { cx: q.X, cy: q.Y, r: 7, fill: "none", stroke: css("ink"), "stroke-width": 2 }, s); }
    const NB = nbrs(); if (NB) NB.nb.forEach(n => { const p = P.find(p => p.t === n.t); if (p) el("circle", { cx: p.X, cy: p.Y, r: 6, fill: "none", stroke: css("a2"), "stroke-width": 2 }, s); });
    const ex = cur();
    $("#embRead").textContent = `τ = ${ST.tau} · ${pts.length} points in ${ST.dim}D · first MI minimum τ = ${ex.tau_mi}${ex.tau_acf0 ? ` · first ACF zero τ = ${ex.tau_acf0}` : ""}`;
  }
  // drag to rotate
  (() => {
    const host = $("#embPortrait"); let d = null;
    host.addEventListener("pointerdown", e => { if (ST.dim !== 3) return; d = [e.clientX, e.clientY, ST.yaw, ST.pitch]; host.setPointerCapture(e.pointerId); });
    host.addEventListener("pointermove", e => { if (!d) return; ST.yaw = d[2] + (e.clientX - d[0]) * 0.01; ST.pitch = Math.max(-1.4, Math.min(1.4, d[3] + (e.clientY - d[1]) * 0.01)); drawPortrait(); });
    host.addEventListener("pointerup", () => { d = null; });
  })();

  // ---------- similar states, similar futures (own past) ----------
  const HF = 8;
  // the "now" state: the time slider if moved, else the last training week; its m+1 nearest past states
  // whose next HF weeks were already known at that time (simplex projection's neighbours, weights exp(-d/d_min))
  function nbrs() {
    const y = series(), m = ST.dim, tau = ST.tau, pts = embed(y, m, tau);
    const q = nowT();
    const Q = pts.find(p => p.t === q); if (!Q) return null;
    const c = pts.filter(p => p.t + HF <= q).map(p => ({ t: p.t, d: Math.hypot(...p.v.map((v, i) => v - Q.v[i])) })).sort((a, b) => a.d - b.d).slice(0, m + 1);
    if (!c.length) return null;
    const d1 = Math.max(c[0].d, 1e-9); c.forEach(n => n.w = Math.exp(-n.d / d1)); const sw = c.reduce((z, n) => z + n.w, 0); c.forEach(n => n.w /= sw);
    return { q, m, tau, y, nb: c };
  }
  function drawNb() {
    const NB = nbrs(), W = 440, H = 260, L = 52, R = 12, T = 14, B = 30, s = mk("#embNb", W, H);
    if (!NB) { $("#embNbRead").textContent = "Move the time slider further right: there is not enough past for this τ and m."; return; }
    const { q, m, tau, y, nb } = NB, back = (m - 1) * tau, x = lin(-back, HF, L, W - R);
    const seg = (t0, a, b) => { const o = []; for (let h = a; h <= b; h++) { const v = y[t0 + h]; if (t0 + h >= 0 && t0 + h < y.length && isFinite(v)) o.push([h, v]); } return o; };
    const lines = [seg(q, -back, Math.min(HF, y.length - 1 - q)), ...nb.map(n => seg(n.t, -back, HF))];
    const vals = lines.flat().map(p => p[1]), lo = Math.min(...vals), hi = Math.max(...vals), yy = lin(lo - 0.05 * (hi - lo), hi + 0.08 * (hi - lo), H - B, T);
    yAxis(s, yy, ticks(lo, hi, 4), L, W - R);
    el("rect", { x: x(0), y: T, width: x(HF) - x(0), height: H - B - T, fill: "color-mix(in srgb,var(--a2) 7%,transparent)" }, s);
    el("line", { x1: x(0), x2: x(0), y1: T, y2: H - B, stroke: css("ink"), "stroke-dasharray": "2 3" }, s);
    txt(s, x(0) + 4, T + 11, "now → next weeks", {});
    for (let h = -back; h <= HF; h++) if (h % Math.max(1, Math.ceil((back + HF) / 10)) === 0) txt(s, x(h), H - 14, h, { "text-anchor": "middle" });
    txt(s, (L + W) / 2, H - 2, "weeks from the state (0 = now, or the neighbour's week)", { "text-anchor": "middle" });
    nb.forEach(n => { const o = seg(n.t, -back, HF);
      el("path", { d: path(o.filter(p => p[0] <= 0).map(p => [x(p[0]), yy(p[1])])), fill: "none", stroke: "#94a3b8", "stroke-width": 1.2 }, s);
      el("path", { d: path(o.filter(p => p[0] >= 0).map(p => [x(p[0]), yy(p[1])])), fill: "none", stroke: css("a2"), "stroke-width": 1.2, opacity: 0.75 }, s); });
    const pred = []; for (let h = 0; h <= HF; h++) pred.push([h, nb.reduce((z, n) => z + n.w * y[n.t + h], 0)]);
    el("path", { d: path(pred.map(p => [x(p[0]), yy(p[1])])), fill: "none", stroke: css("a1"), "stroke-width": 2.6 }, s);
    const o = lines[0];
    el("path", { d: path(o.filter(p => p[0] <= 0).map(p => [x(p[0]), yy(p[1])])), fill: "none", stroke: css("ink"), "stroke-width": 2.2 }, s);
    el("path", { d: path(o.filter(p => p[0] >= 0).map(p => [x(p[0]), yy(p[1])])), fill: "none", stroke: css("ink"), "stroke-width": 1.6, "stroke-dasharray": "4 3" }, s);
    for (let j = 0; j < m; j++) { const v = y[q - j * tau]; if (isFinite(v)) el("circle", { cx: x(-j * tau), cy: yy(v), r: 4, fill: css("ink") }, s); }
    const wk = t => y.length === E.dates.length ? E.dates[t] : `t=${t}`;
    $("#embNbRead").textContent = `now = ${y.length === E.dates.length ? E.dates[q] : "t=" + q} · ${nb.length} nearest past states (m + 1): ${nb.map(n => wk(n.t)).join(", ")}`;
  }
  function drawShuf() {
    const ex = cur(), W = 440, H = 170, L = 14, R = 14, s = mk("#embShuf", W, H), real = Math.max(...ex.rhoE.filter(v => v != null));
    if (!ex.rho_shuf) { $("#embShufRead").textContent = "No shuffle baseline for this reference."; return; }
    const g = ex.rho_shuf.filter(v => v != null), lo = Math.min(-0.2, ...g, real) - 0.03, hi = Math.max(1, ...g, real) + 0.0, x = lin(lo, hi, L + 10, W - R - 10);
    el("line", { x1: L, x2: W - R, y1: 110, y2: 110, class: "ax" }, s);
    ticks(lo, hi, 5).forEach(v => { el("line", { x1: x(v), x2: x(v), y1: 106, y2: 114, class: "ax" }, s); txt(s, x(v), 130, fmt(v, 2), { "text-anchor": "middle" }); });
    const r = rng(7); g.forEach(v => el("circle", { cx: x(v), cy: 92 - 30 * r(), r: 4, fill: "#94a3b8", opacity: 0.85 }, s));
    el("line", { x1: x(real), x2: x(real), y1: 40, y2: 112, stroke: css("a1"), "stroke-width": 3 }, s);
    txt(s, Math.min(Math.max(x(real), 80), W - 80), 32, `this series: ρ = ${fmt(real, 2)}`, { "text-anchor": "middle", class: "t-ink" });
    txt(s, W / 2, 152, "simplex skill ρ (next week, best E)  ·  grey: 19 shuffles", { "text-anchor": "middle" });
    const above = g.filter(v => v >= real).length;
    $("#embShufRead").textContent = above === 0 ? `${ex.short}: real order beats all 19 shuffles (p = 0.05)` : `${ex.short}: ${above} of 19 shuffles do as well (p = ${fmt((1 + above) / 20, 2)})`;
  }

  // ---------- similar states in other items (precomputed, pooled library) ----------
  const AN = E.panel.analogs;
  let anK = AN ? Object.keys(AN.ex)[1] : null;
  if (AN && $("#embAnSel")) {
    const sel = $("#embAnSel");
    Object.keys(AN.ex).forEach(k => { const b = document.createElement("button"); b.textContent = E.ex[k] ? E.ex[k].short : k; b.dataset.v = k; b.setAttribute("aria-pressed", k === anK); sel.appendChild(b); });
    sel.querySelectorAll("button").forEach(b => b.addEventListener("click", () => { sel.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); anK = b.dataset.v; drawAn(); }));
  }
  function drawAn() {
    if (!AN) return;
    const a = AN.ex[anK], Lw = AN.L, Hh = a.mean.length, W = 720, H = 270, L = 46, R = 12, T = 14, B = 30, s = mk("#embAn", W, H);
    const x = lin(-Lw + 1, Hh, L, W - R), nb = a.nb;
    const vals = [...a.q, ...a.actual, ...a.q90, ...nb.flatMap(n => [...n.x, ...n.f])], hi = Math.min(Math.max(...vals), Math.max(...a.q, ...a.actual, ...a.q90) * 1.6) * 1.05;
    const yy = lin(0, hi, H - B, T), cl = v => yy(Math.min(v, hi));
    yAxis(s, yy, ticks(0, hi, 4), L, W - R, v => fmt(v, 1));
    el("rect", { x: x(0.5), y: T, width: x(Hh) - x(0.5), height: H - B - T, fill: "color-mix(in srgb,var(--a2) 7%,transparent)" }, s);
    txt(s, x(0.5) + 4, T + 11, "next 14 weeks", {});
    [-25, -20, -15, -10, -5, 0, 5, 10, 14].filter(v => v >= -Lw + 1).forEach(v => txt(s, x(v), H - 14, v, { "text-anchor": "middle" }));
    txt(s, (L + W) / 2, H - 2, "weeks relative to the end of the window (sales ÷ each item's training mean)", { "text-anchor": "middle" });
    const band = a.q90.map((v, h) => [x(h + 1), cl(v)]).concat(a.q10.map((v, h) => [x(h + 1), cl(v)]).reverse());
    el("path", { d: path(band) + "Z", fill: "color-mix(in srgb,var(--a1) 14%,transparent)" }, s);
    nb.forEach(n => {
      el("path", { d: path(n.x.map((v, i) => [x(i - Lw + 1), cl(v)])), fill: "none", stroke: "#94a3b8", "stroke-width": 1, opacity: 0.7 }, s);
      el("path", { d: path([[x(0), cl(n.x[Lw - 1])], ...n.f.map((v, h) => [x(h + 1), cl(v)])]), fill: "none", stroke: css("a2"), "stroke-width": 1, opacity: 0.55 }, s); });
    el("path", { d: path([[x(0), yy(a.q[Lw - 1])], ...a.mean.map((v, h) => [x(h + 1), cl(v)])]), fill: "none", stroke: css("a1"), "stroke-width": 2.6 }, s);
    el("path", { d: path(a.q.map((v, i) => [x(i - Lw + 1), cl(v)])), fill: "none", stroke: css("ink"), "stroke-width": 2.2 }, s);
    el("path", { d: path([[x(0), yy(a.q[Lw - 1])], ...a.actual.map((v, h) => [x(h + 1), cl(v)])]), fill: "none", stroke: css("ink"), "stroke-width": 1.8, "stroke-dasharray": "4 3" }, s);
    const pw = Math.max(2, x(1) - x(0) - 1);
    a.pq.forEach((p, i) => p && el("rect", { x: x(i - Lw + 1) - pw / 2, y: H - B - 5, width: pw, height: 5, fill: css("a2"), opacity: 0.6 }, s));
    a.pa.forEach((p, h) => p && el("rect", { x: x(h + 1) - pw / 2, y: H - B - 5, width: pw, height: 5, fill: css("a2"), opacity: 0.6 }, s));
    $("#embAnRead").textContent = `${a.desc} (${a.id}) · its last ${Lw} training weeks against ${fmt(AN.n_windows)} windows from ${fmt(AN.n_items - 1)} other items · the ${AN.k} nearest come from ${a.n_items} items in ${a.n_depts} departments`;
    $("#embAnList").innerHTML = `<table class="mtable"><thead><tr><th>neighbour item</th><th>window ends</th><th>distance</th></tr></thead><tbody>` +
      nb.slice(0, 8).map(n => `<tr><td>${n.desc}</td><td>${n.end}</td><td>${fmt(n.d, 2)}</td></tr>`).join("") + "</tbody></table>";
  }

  // ---------- choosing tau and m ----------
  function drawMI() {
    const ex = cur(), W = 420, H = 230, L = 46, R = 40, T = 14, B = 30, s = mk("#embMI", W, H);
    const lags = ex.mi.map((_, i) => i + 1), x = lin(0, 30, L, W - R);
    const hi = Math.max(...ex.mi.filter(v => v != null)) * 1.08, y = lin(0, hi, H - B, T), ya = lin(-1, 1, H - B, T);
    yAxis(s, y, ticks(0, hi, 4), L, W - R, v => fmt(v, 1));
    [-1, 0, 1].forEach(v => txt(s, W - R + 6, ya(v) + 4, fmt(v), {}));
    el("line", { x1: L, x2: W - R, y1: ya(0), y2: ya(0), stroke: "#cbd5e1" }, s);
    [1, 5, 10, 13, 20, 26, 30].forEach(v => txt(s, x(v), H - 14, v, { "text-anchor": "middle" }));
    txt(s, (L + W - R) / 2, H - 2, "delay τ (weeks or samples)", { "text-anchor": "middle" });
    el("path", { d: path(ex.acf.map((v, i) => [x(i + 1), ya(v)])), fill: "none", stroke: css("muted"), "stroke-dasharray": "4 3" }, s);
    el("path", { d: path(ex.mi.map((v, i) => [x(i + 1), y(v)])), fill: "none", stroke: css("a1"), "stroke-width": 2 }, s);
    el("line", { x1: x(ST.tau), x2: x(ST.tau), y1: T, y2: H - B, stroke: css("ink"), "stroke-dasharray": "2 3" }, s);
    el("circle", { cx: x(ex.tau_mi), cy: y(ex.mi[ex.tau_mi - 1]), r: 5, fill: css("a2") }, s);
    txt(s, x(ex.tau_mi) + 7, y(ex.mi[ex.tau_mi - 1]) - 7, `first minimum τ=${ex.tau_mi}`, { class: "t-ink" });
  }
  function drawFNN() {
    const ex = cur(), W = 420, H = 230, L = 46, R = 12, T = 14, B = 30, s = mk("#embFNN", W, H);
    const x = lin(0.6, 7.4, L, W - R), y = lin(0, 100, H - B, T), nb = E.panel.fnn_noise;
    yAxis(s, y, [0, 25, 50, 75, 100], L, W - R, v => v + " %");
    for (let m = 1; m <= 7; m++) txt(s, x(m), H - 14, m, { "text-anchor": "middle" });
    txt(s, (L + W - R) / 2, H - 2, "embedding dimension m", { "text-anchor": "middle" });
    const band = nb.q75.map((v, i) => [x(i + 1), y(v)]).concat(nb.q25.map((v, i) => [x(i + 1), y(v)]).reverse());
    el("path", { d: path(band) + "Z", fill: "color-mix(in srgb,var(--muted) 18%,transparent)" }, s);
    el("path", { d: path(nb.q50.map((v, i) => [x(i + 1), y(v)])), fill: "none", stroke: css("muted"), "stroke-dasharray": "4 3" }, s);
    el("line", { x1: L, x2: W - R, y1: y(5), y2: y(5), stroke: css("a3"), "stroke-dasharray": "2 3" }, s);
    txt(s, W - R - 4, y(5) - 5, "5 % (near zero)", { "text-anchor": "end" });
    const lz = E.ex.lorenz_long.fnn;
    el("path", { d: path(lz.map((v, i) => [x(i + 1), y(v)])), fill: "none", stroke: css("a4"), "stroke-width": 1.4, opacity: 0.7 }, s);
    el("path", { d: path(ex.fnn.map((v, i) => [x(i + 1), y(v)])), fill: "none", stroke: css("a1"), "stroke-width": 2.2 }, s);
    ex.fnn.forEach((v, i) => v != null && el("circle", { cx: x(i + 1), cy: y(v), r: 3.5, fill: css("a1") }, s));
    $("#embFnnRead").textContent = ex.m_fnn ? `${ex.short}: false neighbours reach ≤ 5 % at m = ${ex.m_fnn}` : `${ex.short}: false neighbours never reach 5 % up to m = ${ex.fnn.length}`;
  }

  // ---------- recurrence plot ----------
  function drawRP() {
    const y = series(), m = ST.dim, pts = embed(y, m, ST.tau), n = pts.length, cv = $("#embRP"), ctx = cv.getContext("2d");
    const Dm = new Float32Array(n * n), all = [];
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { let d = 0; for (let k = 0; k < m; k++) { const q = pts[i].v[k] - pts[j].v[k]; d += q * q; } d = Math.sqrt(d); Dm[i * n + j] = d; if (j > i) all.push(d); }
    all.sort((a, b) => a - b);
    const eps = all[Math.min(all.length - 1, Math.floor(all.length * ST.rr / 100))];
    const S = 360; cv.width = S * 2; cv.height = S * 2; ctx.setTransform(2, 0, 0, 2, 0, 0);
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, S, S);
    const c = S / n; ctx.fillStyle = "#0f172a";
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (Dm[i * n + j] <= eps) ctx.fillRect(j * c, S - (i + 1) * c, Math.max(c, 0.6), Math.max(c, 0.6));
    if (y.length === E.dates.length) { const tt = pts.findIndex(p => p.t >= nTrain()); if (tt > 0) { ctx.strokeStyle = "#ea580c"; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(tt * c, 0); ctx.lineTo(tt * c, S); ctx.moveTo(0, S - tt * c); ctx.lineTo(S, S - tt * c); ctx.stroke(); ctx.setLineDash([]); } }
    // determinism: share of recurrence points (off the main diagonal) on diagonal lines of length >= 2
    const det = M => { let rec = 0, inl = 0; for (let k = 1; k < n; k++) { let run = 0; for (let i = 0; i + k < n; i++) { const r = M(i, i + k); if (r) { run++; rec++; } if (!r || i + k === n - 1) { if (run >= 2) inl += run; run = 0; } } } return rec ? inl / rec : 0; };
    const d0 = det((i, j) => Dm[i * n + j] <= eps);
    // same values in random order, same recurrence rate: what DET would chance give?
    const r = rng(11), ys = y.filter(isFinite).slice(); for (let i = ys.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [ys[i], ys[j]] = [ys[j], ys[i]]; }
    const ps = embed(ys, m, ST.tau), ns = ps.length, D2 = new Float32Array(ns * ns), a2 = [];
    for (let i = 0; i < ns; i++) for (let j = 0; j < ns; j++) { let d = 0; for (let k = 0; k < m; k++) { const q = ps[i].v[k] - ps[j].v[k]; d += q * q; } D2[i * ns + j] = Math.sqrt(d); if (j > i) a2.push(D2[i * ns + j]); }
    a2.sort((a, b) => a - b); const e2 = a2[Math.min(a2.length - 1, Math.floor(a2.length * ST.rr / 100))];
    let rec = 0, inl = 0; for (let k = 1; k < ns; k++) { let run = 0; for (let i = 0; i + k < ns; i++) { const q = D2[i * ns + i + k] <= e2; if (q) { run++; rec++; } if (!q || i + k === ns - 1) { if (run >= 2) inl += run; run = 0; } } }
    const d1 = rec ? inl / rec : 0;
    $("#embRpRead").textContent = `${n} states (m = ${m}, τ = ${ST.tau}) · recurrence rate ${ST.rr} % · DET ${fmt(100 * d0)} % vs ${fmt(100 * d1)} % for the same values shuffled`;
  }

  // ---------- forecasting in the embedding ----------
  function drawEDM() {
    const ex = cur();
    { const W = 300, H = 200, L = 40, R = 10, T = 12, B = 30, s = mk("#embRhoE", W, H), x = lin(0.4, 6.6, L, W - R), y = lin(-0.4, 1, H - B, T);
      yAxis(s, y, [-0.25, 0, 0.25, 0.5, 0.75, 1], L, W - R, v => fmt(v, 2));
      ex.rhoE.forEach((v, i) => { if (v == null) return; el("rect", { x: x(i + 1) - 14, width: 28, y: Math.min(y(v), y(0)), height: Math.abs(y(v) - y(0)), fill: i + 1 === ex.bestE ? css("a1") : "#bfdbfe" }, s); txt(s, x(i + 1), H - 14, i + 1, { "text-anchor": "middle" }); });
      txt(s, (L + W) / 2, H - 2, "E (simplex, Tp = 1)", { "text-anchor": "middle" }); }
    { const W = 300, H = 200, L = 40, R = 10, T = 12, B = 30, s = mk("#embRhoTp", W, H), x = lin(1, 14, L, W - R), y = lin(-0.4, 1, H - B, T);
      yAxis(s, y, [-0.25, 0, 0.25, 0.5, 0.75, 1], L, W - R, v => fmt(v, 2));
      [1, 4, 7, 10, 14].forEach(v => txt(s, x(v), H - 14, v, { "text-anchor": "middle" }));
      el("path", { d: path(E.ex.lorenz.rhoTp.map((v, i) => [x(i + 1), y(v)])), fill: "none", stroke: css("a4"), opacity: 0.6, "stroke-dasharray": "4 3" }, s);
      el("path", { d: path(ex.rhoTp.map((v, i) => [x(i + 1), y(v)])), fill: "none", stroke: css("a1"), "stroke-width": 2 }, s);
      txt(s, (L + W) / 2, H - 2, `steps ahead Tp (E = ${ex.bestE})`, { "text-anchor": "middle" }); }
    { const W = 300, H = 200, L = 40, R = 10, T = 12, B = 30, s = mk("#embSmap", W, H), th = ex.thetas, x = lin(0, th.length - 1, L, W - R);
      const v0 = ex.rhoTheta.filter(v => v != null), lo = Math.min(0, ...v0) - 0.05, hi = Math.max(...v0, 0.2) + 0.05, y = lin(lo, hi, H - B, T);
      yAxis(s, y, ticks(lo, hi, 4), L, W - R, v => fmt(v, 2));
      th.forEach((t, i) => (i % 2 === 0 || i === th.length - 1) && txt(s, x(i), H - 14, t, { "text-anchor": "middle" }));
      el("path", { d: path(ex.rhoTheta.map((v, i) => [x(i), y(v)])), fill: "none", stroke: css("a1"), "stroke-width": 2 }, s);
      txt(s, (L + W) / 2, H - 2, "θ (S-map locality; 0 = linear)", { "text-anchor": "middle" }); }
    { const W = 300, H = 200, L = 14, R = 14, T = 30, B = 40, s = mk("#embSurr", W, H), g = ex.smap_gain_surr.filter(v => v != null);
      const lo = Math.min(...g, ex.smap_gain, 0) - 0.03, hi = Math.max(...g, ex.smap_gain) + 0.03, x = lin(lo, hi, L + 10, W - R - 10);
      el("line", { x1: L, x2: W - R, y1: 110, y2: 110, class: "ax" }, s);
      ticks(lo, hi, 4).forEach(v => { el("line", { x1: x(v), x2: x(v), y1: 106, y2: 114, class: "ax" }, s); txt(s, x(v), 130, fmt(v, 2), { "text-anchor": "middle" }); });
      const r = rng(5); g.forEach(v => el("circle", { cx: x(v), cy: 90 - 26 * r(), r: 4, fill: "#94a3b8", opacity: 0.8 }, s));
      el("line", { x1: x(ex.smap_gain), x2: x(ex.smap_gain), y1: 40, y2: 112, stroke: css("a2"), "stroke-width": 3 }, s);
      txt(s, x(ex.smap_gain), 34, `this series: ${fmt(ex.smap_gain, 2)}`, { "text-anchor": "middle", class: "t-ink" });
      txt(s, W / 2, 152, "gain in ρ from S-map (best θ > 0 minus θ = 0)", { "text-anchor": "middle" });
      txt(s, W / 2, 168, `grey: 19 IAAFT surrogates · p = ${fmt(ex.smap_p, 2)}`, { "text-anchor": "middle" }); }
  }
  function drawFc() {
    const ex = cur(), host = $("#embFcWrap");
    if (!ex.ref_fc) { host.style.display = "none"; return; } host.style.display = "";
    const y = ex.y, N = y.length, n0 = N - 40, W = 720, H = 230, L = 52, R = 12, T = 14, B = 26, s = mk("#embFc", W, H);
    const F = { Simplex: ex.simplex_fc, ...ex.ref_fc }, all = y.slice(n0).concat(...Object.values(F)).filter(v => v != null);
    const x = lin(n0, N - 1, L, W - R), yy = lin(0, Math.max(...all) * 1.08, H - B, T);
    yAxis(s, yy, ticks(0, Math.max(...all) * 1.08, 4), L, W - R);
    el("rect", { x: x(ex.n_train - 0.5), y: T, width: x(N - 1) - x(ex.n_train - 0.5), height: H - B - T, fill: "color-mix(in srgb,var(--a2) 10%,transparent)" }, s);
    for (let i = n0; i < N; i += 8) txt(s, x(i), H - 8, mon(E.dates[i]), { "text-anchor": "middle" });
    el("path", { d: path(y.slice(n0).map((v, i) => [x(n0 + i), yy(v)])), fill: "none", stroke: css("ink"), "stroke-width": 1.6 }, s);
    const C = { Simplex: "a2", PooledAnalog: "a5", SeasonalNaive: "muted", NHITSx: "a1", Chronos2_zs_cov: "a3" };
    Object.entries(F).forEach(([k, f]) => f && el("path", { d: path(f.map((v, h) => [x(ex.n_train + h), yy(v)])), fill: "none", stroke: css(C[k]), "stroke-width": k === "Simplex" ? 2.4 : 1.6, "stroke-dasharray": k === "SeasonalNaive" ? "4 3" : null }, s));
  }

  // ---------- panel-wide ----------
  function drawPanel() {
    const P = E.panel;
    { // tau histogram
      const W = 420, H = 220, L = 46, R = 10, T = 12, B = 30, s = mk("#embPTau", W, H), ks = Object.keys(P.tau_hist).map(Number), mx = Math.max(...Object.values(P.tau_hist));
      const x = lin(0.5, Math.max(...ks) + 0.5, L, W - R), y = lin(0, mx * 1.1, H - B, T), bw = (x(1) - x(0)) * 0.8;
      yAxis(s, y, ticks(0, mx * 1.1, 4), L, W - R, v => fmt(v));
      ks.forEach(k => { el("rect", { x: x(k) - bw / 2, width: bw, y: y(P.tau_hist[k]), height: y(0) - y(P.tau_hist[k]), fill: css("a1") }, s); txt(s, x(k), H - 14, k, { "text-anchor": "middle" }); });
      txt(s, (L + W) / 2, H - 2, "first MI minimum τ (weeks)", { "text-anchor": "middle" });
    }
    { // m outcome, series vs noise (shares)
      const W = 420, H = 220, L = 46, R = 10, T = 12, B = 30, s = mk("#embPM", W, H), keys = ["2", "3", "4", "5", "6", "7", "never"];
      const sh = (c, n) => keys.map(k => (c[k] || 0) / n), a = sh(P.m_series, P.n), b = sh(P.m_noise, P.n_noise);
      const x = lin(-0.5, keys.length - 0.5, L, W - R), y = lin(0, 1, H - B, T), bw = (x(1) - x(0)) * 0.36;
      yAxis(s, y, [0, 0.25, 0.5, 0.75, 1], L, W - R, v => fmt(100 * v) + " %");
      keys.forEach((k, i) => { el("rect", { x: x(i) - bw, width: bw, y: y(a[i]), height: y(0) - y(a[i]), fill: css("a1") }, s); el("rect", { x: x(i), width: bw, y: y(b[i]), height: y(0) - y(b[i]), fill: "#94a3b8" }, s); txt(s, x(i), H - 14, k, { "text-anchor": "middle" }); });
      txt(s, (L + W) / 2, H - 2, "smallest m with ≤ 5 % false neighbours", { "text-anchor": "middle" });
    }
    { // best simplex rho by demand type, quantile strips
      const W = 420, H = 220, L = 92, R = 14, T = 14, B = 30, s = mk("#embPRho", W, H), rows = ["smooth", "erratic", "intermittent", "lumpy", "all"];
      const x = lin(-0.6, 1, L, W - R), rh = (H - T - B) / rows.length;
      [-0.5, 0, 0.5, 1].forEach(v => { el("line", { x1: x(v), x2: x(v), y1: T, y2: H - B, class: "gl" }, s); txt(s, x(v), H - 14, fmt(v, 1), { "text-anchor": "middle" }); });
      txt(s, (L + W) / 2, H - 2, "best in-sample simplex ρ (Tp = 1)", { "text-anchor": "middle" });
      [["sine", "a3"], ["lorenz", "a4"]].forEach(([k, c]) => { const v = Math.max(...E.ex[k].rhoE); el("line", { x1: x(v), x2: x(v), y1: T, y2: H - B, stroke: css(c), "stroke-dasharray": "4 3" }, s); });
      rows.forEach((r, i) => { const q = P.rho_q[r], cy = T + rh * (i + 0.5);
        txt(s, L - 8, cy + 4, r, { "text-anchor": "end", class: "t-ink" });
        el("line", { x1: x(q[0]), x2: x(q[4]), y1: cy, y2: cy, stroke: "#93c5fd", "stroke-width": 2 }, s);
        el("rect", { x: x(q[1]), width: x(q[3]) - x(q[1]), y: cy - 7, height: 14, fill: "#bfdbfe", stroke: css("a1") }, s);
        el("line", { x1: x(q[2]), x2: x(q[2]), y1: cy - 8, y2: cy + 8, stroke: css("ink"), "stroke-width": 2 }, s); });
    }
    { // S-map significance by type
      const W = 420, H = 220, L = 92, R = 40, T = 14, B = 30, s = mk("#embPSmap", W, H), rows = ["smooth", "erratic", "intermittent", "lumpy"];
      const mx = Math.max(0.3, ...rows.map(r => P.smap_sig[r][0])) * 1.1, x = lin(0, mx, L, W - R), rh = (H - T - B) / rows.length;
      ticks(0, mx, 4).forEach(v => { el("line", { x1: x(v), x2: x(v), y1: T, y2: H - B, class: "gl" }, s); txt(s, x(v), H - 14, fmt(100 * v) + " %", { "text-anchor": "middle" }); });
      el("line", { x1: x(0.05), x2: x(0.05), y1: T, y2: H - B, stroke: css("warn"), "stroke-dasharray": "4 3" }, s);
      txt(s, x(0.05) + 4, T + 10, "5 % by chance", {});
      rows.forEach((r, i) => { const [v, n] = P.smap_sig[r], cy = T + rh * (i + 0.5);
        txt(s, L - 8, cy + 4, r, { "text-anchor": "end", class: "t-ink" });
        el("rect", { x: L, width: x(v) - L, y: cy - 9, height: 18, fill: css("a1") }, s);
        txt(s, x(v) + 5, cy + 4, `${fmt(100 * v)} %`, { class: "t-ink" }); });
      txt(s, (L + W) / 2, H - 2, "share of series with p ≤ 0.05 (S-map vs IAAFT)", { "text-anchor": "middle" });
    }
    if (P.shuffle && $("#embPShuf")) { // real vs shuffled simplex skill, all series
      const S = P.shuffle, W = 720, H = 230, L = 52, R = 12, T = 14, B = 30, s = mk("#embPShuf", W, H), bw = S.bins[1] - S.bins[0];
      const mx = Math.max(...S.real, ...S.shuf) * 1.08, x = lin(S.bins[0], S.bins[S.bins.length - 1], L, W - R), y = lin(0, mx, H - B, T);
      yAxis(s, y, ticks(0, mx, 4), L, W - R, v => fmt(v));
      [-0.5, -0.25, 0, 0.25, 0.5, 0.75, 1].forEach(v => txt(s, x(v), H - 14, fmt(v, 2), { "text-anchor": "middle" }));
      txt(s, (L + W) / 2, H - 2, "simplex skill ρ (next week, best E, weeks 61–93)", { "text-anchor": "middle" });
      S.shuf.forEach((c, i) => el("rect", { x: x(S.bins[i]) + 1, width: x(S.bins[i] + bw) - x(S.bins[i]) - 2, y: y(c), height: y(0) - y(c), fill: "#94a3b8", opacity: 0.55 }, s));
      el("path", { d: path(S.real.flatMap((c, i) => [[x(S.bins[i]), y(c)], [x(S.bins[i] + bw), y(c)]])), fill: "none", stroke: css("a1"), "stroke-width": 2.4 }, s);
      [[S.med_shuf, "#64748b", "shuffled median"], [S.med_real, css("a1"), "real median"]].forEach(([v, c, l], i) => { el("line", { x1: x(v), x2: x(v), y1: T, y2: H - B, stroke: c, "stroke-dasharray": "4 3" }, s); txt(s, x(v) + 4, T + 12 + 14 * i, `${l} ${fmt(v, 2)}`, { class: "t-ink" }); });
    }
    { // forecast table
      const F = P.fc, best = Math.min(...F.mean), nm = { Simplex: "Simplex (own past only)", PooledAnalog: "Pooled analogs (all series)", Chronos2_zs_cov: "Chronos-2 + covariates" };
      let h = `<table class="mtable"><thead><tr><th>model</th><th>mean RMSSE</th><th>median</th>${F.by_type.map(r => `<th>${r[0]}<br><span style="text-transform:none">${fmt(r[2])}</span></th>`).join("")}</tr></thead><tbody>`;
      F.models.forEach((m, i) => { const emb = m === "Simplex" || m === "PooledAnalog"; h += `<tr${emb ? ' style="background:var(--soft)"' : ""}><td>${emb ? "<b>" : ""}${nm[m] || m}${emb ? "</b>" : ""}</td><td>${fmt(F.mean[i], 3)}</td><td>${fmt(F.median[i], 3)}</td>${F.by_type.map(r => `<td>${fmt(r[1][i], 3)}</td>`).join("")}</tr>`; });
      $("#embPFc").innerHTML = h + "</tbody></table>";
    }
  }

  function drawAll() { $("#embTauV").textContent = ST.tau; drawTs(); drawPortrait(); drawNb(); drawShuf(); drawMI(); drawFNN(); drawRP(); drawEDM(); drawFc(); }
  drawAll(); drawPanel(); drawAn();
}
