import D from "../data/day2.json";
const RS = D.res;   // every result number comes from the full reference run (see day2.json → res)
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

const FAM = { nn: ["a1", "neural (Day 2)"], fm: ["a6", "foundation models (Lab 04)"], gbm: ["a3", "LightGBM"], stat: ["a4", "statistical / reconciled"], base: ["muted", "baselines"], ens: ["a2", "ensembles (optimistic here)"] };
if (document.querySelector("#stats")) {
/* ---------------- stats strip */
(() => {
  const items = [[fmt(D.raw_series), "series in the raw data"], [fmt(D.n_series), "eligible series, all of them used"], [String(D.n_weeks), "weeks, Jul 2023 – Jul 2025"], ["14", "week forecast horizon"], ["5", `hierarchy levels, ${fmt(RS.hier5.reduce((z, l) => z + l[1], 0))} nodes`], [String(RS.lb.length), "models on the final board"]];
  $("#stats").innerHTML = items.map(([b, s]) => `<div class="stat"><b>${b}</b><span>${s}</span></div>`).join("");
})();

}
if (document.querySelector("#figTotal")) {
/* ---------------- total chart */
function drawTotal(mode) {
  const W = 900, H = 300, L = 60, R = 16, T = 14, B = 30, s = mk("#figTotal", W, H);
  const xs = D.total.ds.map(dt), vals = mode === "y" ? D.total.y : D.total.promo.map(v => v * 100);
  const x = lin(xs[0], xs[xs.length - 1], L, W - R), mx = Math.max(...vals) * 1.08, y = lin(0, mx, H - B, T);
  const vs = dt(D.valid_start), ts = dt(D.test_start);
  el("rect", { x: L, y: T, width: x(vs) - L, height: H - B - T, fill: css("soft") }, s);
  el("rect", { x: x(vs), y: T, width: x(ts) - x(vs), height: H - B - T, fill: "color-mix(in srgb,var(--a5) 30%,transparent)" }, s);
  el("rect", { x: x(ts), y: T, width: W - R - x(ts), height: H - B - T, fill: "color-mix(in srgb,var(--a2) 22%,transparent)" }, s);
  yAxis(s, y, ticks(0, mx, 4), L, W - R, v => mode === "y" ? (v >= 1e6 ? fmt(v / 1e6, 1) + "M" : fmt(v / 1e3) + "k") : v + "%");
  el("path", { d: path(xs.map((t, i) => [x(t), y(vals[i])])), fill: "none", stroke: css(mode === "y" ? "ink" : "a2"), "stroke-width": 2 }, s);
  [dt("2023-10-01"), dt("2024-01-01"), dt("2024-04-01"), dt("2024-07-01"), dt("2024-10-01"), dt("2025-01-01"), dt("2025-04-01"), dt("2025-07-01")].forEach(t => txt(s, x(t), H - 10, mon(t), { "text-anchor": "middle" }));
  txt(s, x(ts) + 6, T + 14, "test", { class: "t-ink t-b" }); txt(s, x(vs) + 6, T + 14, "valid", { class: "t-ink t-b" });
}
drawTotal("y"); seg("#totToggle", drawTotal);

}
if (document.querySelector("#exToggle")) {
/* ---------------- examples */
const MODELS = [["NHITSx", "a1"], ["Chronos2_zs_cov", "a6"], ["LightGBM", "a3"], ["NHITS_noexog", "a4"], ["ENS_mean_top3", "a2"], ["SeasonalNaive", "muted"]];
const exOn = new Set(["NHITSx", "Chronos2_zs_cov", "LightGBM"]);
let exType = "smooth";
const DT = RS.l7_types, dtv = (t, m) => DT.rows.find(r => r[0] === t)[1][DT.models.indexOf(m)], pct = t => Math.round(100 * D.demand_types[t] / D.n_series) + " %";
const intBest = DT.models.reduce((b, m) => dtv("intermittent", m) < dtv("intermittent", b) ? m : b);
const EXCAP = { smooth: `Smooth: sells most weeks with moderate swings. ${pct("smooth")} of series; every global model does well here (NHITSx ${dtv("smooth", "NHITSx").toFixed(2)}).`, erratic: `Erratic: sells most weeks but the size swings a lot, often with promotions. Covariates help most here (NHITSx ${dtv("erratic", "NHITSx").toFixed(2)} vs NHITS_noexog ${dtv("erratic", "NHITS_noexog").toFixed(2)}; Chronos-2 with price and promotions in context ${dtv("erratic", "Chronos2_zs_cov").toFixed(2)}).`, intermittent: `Intermittent: many zero weeks. ${pct("intermittent")} of series, about ${Math.round(100 * RS.l7_int_share.NHITSx)} % of the summed error. Models without covariates do best (${intBest} ${dtv("intermittent", intBest).toFixed(2)} vs NHITSx ${dtv("intermittent", "NHITSx").toFixed(2)}).`, lumpy: `Lumpy: zero weeks and big spikes. The hardest to time; NHITSx ${dtv("lumpy", "NHITSx").toFixed(2)}.` };
$("#exToggle").innerHTML = Object.keys(EXCAP).map(k => `<button aria-pressed="${k === exType}" data-v="${k}">${k[0].toUpperCase() + k.slice(1)} · ${fmt(D.demand_types[k])}</button>`).join("");
$("#exModels").innerHTML = MODELS.map(([m, c]) => `<label><input type="checkbox" data-m="${m}" ${exOn.has(m) ? "checked" : ""}> <span style="color:var(--${c});font-weight:600">${m}</span></label>`).join("");
$("#exModels").addEventListener("change", e => { const m = e.target.dataset.m; e.target.checked ? exOn.add(m) : exOn.delete(m); drawEx(); });
function drawEx() {
  const ex = D.examples[exType], W = 900, H = 300, L = 54, R = 46, T = 14, B = 30, s = mk("#figEx", W, H);
  const xs = ex.ds.map(dt); const all = [...ex.y]; MODELS.forEach(([m]) => exOn.has(m) && ex.fc[m] && all.push(...ex.fc[m]));
  const x = lin(xs[0], xs[xs.length - 1], L, W - R), mx = Math.max(...all) * 1.1 || 1, y = lin(0, mx, H - B, T);
  const pmin = Math.min(...ex.price, 0.6), pmax = Math.max(...ex.price, 1.2), yp = lin(pmin, pmax, H - B, T);
  const wk = (x(xs[1]) - x(xs[0]));
  ex.promo.forEach((p, i) => p > 0 && el("rect", { x: x(xs[i]) - wk / 2, y: T, width: wk, height: H - B - T, fill: "color-mix(in srgb,var(--a2) 25%,transparent)" }, s));
  const ts = dt(D.test_start); el("line", { x1: x(ts), x2: x(ts), y1: T, y2: H - B, stroke: css("ink"), "stroke-dasharray": "4 4" }, s); txt(s, x(ts) + 5, T + 12, "test →", { class: "t-ink" });
  yAxis(s, y, ticks(0, mx, 4), L, W - R);
  el("path", { d: path(xs.map((t, i) => [x(t), yp(ex.price[i])])), fill: "none", stroke: css("a4"), "stroke-width": 1, opacity: .45 }, s);
  [pmin, 1, pmax].forEach(v => txt(s, W - R + 6, yp(v) + 4, v.toFixed(2)));
  el("path", { d: path(xs.map((t, i) => [x(t), y(ex.y[i])])), fill: "none", stroke: css("ink"), "stroke-width": 1.8 }, s);
  const fx = (ex.fc.ds || []).map(dt);
  MODELS.forEach(([m, c]) => { if (exOn.has(m) && ex.fc[m]) el("path", { d: path(fx.map((t, i) => [x(t), y(ex.fc[m][i])])), fill: "none", stroke: css(c), "stroke-width": 2.2 }, s); });
  [dt("2023-10-01"), dt("2024-04-01"), dt("2024-10-01"), dt("2025-04-01")].forEach(t => txt(s, x(t), H - 10, mon(t), { "text-anchor": "middle" }));
  $("#exCap").textContent = EXCAP[exType] + " Series " + ex.id + ".";
}
drawEx(); seg("#exToggle", v => { exType = v; drawEx(); });

}
if (document.querySelector("#figSB")) {
/* ---------------- Syntetos–Boylan scatter */
(() => {
  const W = 460, H = 340, L = 50, R = 14, T = 14, B = 40, s = mk("#figSB", W, H);
  const lx = lin(0, Math.log10(12), L, W - R), ly = lin(-2, Math.log10(8), H - B, T);
  const X = v => lx(Math.log10(Math.max(1, Math.min(12, v)))), Y = v => ly(Math.log10(Math.max(0.01, Math.min(8, v))));
  const C = { smooth: "a3", erratic: "a1", intermittent: "a2", lumpy: "a4" };
  [1, 2, 5, 10].forEach(v => { el("line", { x1: X(v), x2: X(v), y1: T, y2: H - B, class: "gl" }, s); txt(s, X(v), H - B + 14, v, { "text-anchor": "middle" }); });
  [0.01, 0.1, 1].forEach(v => { el("line", { x1: L, x2: W - R, y1: Y(v), y2: Y(v), class: "gl" }, s); txt(s, L - 6, Y(v) + 4, v, { "text-anchor": "end" }); });
  D.scatter.forEach(([a, c, t]) => el("circle", { cx: X(a), cy: Y(c), r: 2.6, fill: css(C[t]), opacity: .65 }, s));
  el("line", { x1: X(1.32), x2: X(1.32), y1: T, y2: H - B, stroke: css("ink"), "stroke-dasharray": "4 3" }, s);
  el("line", { x1: L, x2: W - R, y1: Y(0.49), y2: Y(0.49), stroke: css("ink"), "stroke-dasharray": "4 3" }, s);
  const lab = (x, y, t) => { txt(s, x, y, t + " · " + D.demand_types[t], { class: "t-b", style: `fill:var(--${C[t]})` }); };
  const lab2 = (x, y, t, anc) => txt(s, x, y, t + " · " + fmt(D.demand_types[t]), { class: "t-b", "text-anchor": anc, style: `fill:var(--${C[t]});font-size:12px` });
  txt(s, X(1.32) + 6, H - B - 8, "← smooth · " + fmt(D.demand_types.smooth), { class: "t-b", style: `fill:var(--${C.smooth});font-size:12px` }); txt(s, X(1.32) + 6, T + 12, "← erratic · " + fmt(D.demand_types.erratic), { class: "t-b", style: `fill:var(--${C.erratic});font-size:12px` }); lab2(W - R - 4, H - B - 8, "intermittent", "end"); lab2(W - R - 4, T + 12, "lumpy", "end");
  txt(s, (L + W - R) / 2, H - 6, "ADI: weeks between sales (log)", { "text-anchor": "middle" });
  txt(s, 12, (T + H - B) / 2, "CV² of non-zero sales (log)", { transform: `rotate(-90 12 ${(T + H - B) / 2})`, "text-anchor": "middle" });
})();

}
if (document.querySelector("#figClass")) {
/* ---------------- velocity classes */
(() => {
  const W = 460, H = 340, L = 44, R = 14, T = 20, B = 36, s = mk("#figClass", W, H), k = Object.keys(D.sale_class), v = Object.values(D.sale_class);
  const vmx = Math.max(...v) * 1.1, bw = (W - L - R) / k.length, y = lin(0, vmx, H - B, T);
  yAxis(s, y, ticks(0, vmx, 4), L, W - R);
  k.forEach((c, i) => { el("rect", { x: L + i * bw + 4, y: y(v[i]), width: bw - 8, height: H - B - y(v[i]), fill: css(c === "J" ? "a2" : "a1"), rx: 2 }, s); txt(s, L + i * bw + bw / 2, H - B + 14, c, { "text-anchor": "middle", class: "t-ink" }); txt(s, L + i * bw + bw / 2, y(v[i]) - 5, fmt(v[i]), { "text-anchor": "middle" }); });
  txt(s, (W) / 2, H - 6, "sale class (A = fastest)", { "text-anchor": "middle" });
})();

}
if (document.querySelector("#figHier")) {
/* ---------------- hierarchy funnel */
(() => {
  const lv = RS.hier5;
  const W = 900, H = 230, s = mk("#figHier", W, H), mx = Math.log10(lv[lv.length - 1][1]);
  lv.forEach(([n, c], i) => {
    const w = 80 + (W - 260) * Math.log10(c) / mx, y0 = 12 + i * 42;
    el("rect", { x: (W - w) / 2, y: y0, width: w, height: 32, rx: 4, fill: css(["ink", "a1", "a1", "a3", "a2"][i]), opacity: i ? .85 : 1 }, s);
    txt(s, W / 2, y0 + 21, `${n} · ${fmt(c)}`, { "text-anchor": "middle", style: "fill:var(--panel);font-weight:600;font-size:13px" });
  });
})();

}
if (document.querySelector("#figCV")) {
/* ---------------- CV diagram */
function drawCV(f) {
  const W = 900, H = 170, L = 20, R = 20, s = mk("#figCV", W, H);
  const weeks = 107, x = lin(0, weeks, L, W - R);
  // weeks index: test starts at 93 (2025-04-16), valid at 79
  txt(s, L, H - 8, ["train (blue) → tune on validation (yellow) → score the 14 test weeks once (orange)", "fold 1: train to Sep 2024, forecast the next 14 weeks", "fold 2: train to Jan 2025, forecast the next 14 weeks"][+f], { class: "t-ink" });
  const rows = [{ n: "Final split", tr: 79, va: 14, te: 93 }, { n: "CV fold 1", tr: 62, va: 0, te: 62 }, { n: "CV fold 2", tr: 79, va: 0, te: 79 }];
  rows.forEach((r, i) => {
    const y0 = 20 + i * 46, on = +f === i, op = on ? 1 : .28;
    el("rect", { x: x(0), y: y0, width: x(r.tr) - x(0), height: 28, fill: css("a1"), opacity: op, rx: 3 }, s);
    if (r.va) el("rect", { x: x(r.tr), y: y0, width: x(r.tr + r.va) - x(r.tr), height: 28, fill: css("a5"), opacity: op }, s);
    el("rect", { x: x(r.te), y: y0, width: x(r.te + 14) - x(r.te), height: 28, fill: css("a2"), opacity: op, rx: 3 }, s);
    txt(s, x(0) + 8, y0 + 18, r.n + (on ? "" : ""), { style: "fill:var(--panel);font-weight:600" });

  });
}
drawCV("0"); seg("#cvToggle", drawCV);

}
if (document.querySelector("#rmNoise")) {
/* ---------------- RMSSE */
const rmBase = (() => { const r = rng(7), a = []; for (let t = 0; t < 78; t++) a.push(60 + 30 * Math.sin(2 * Math.PI * t / 52) + 8 * randn(r)); return a; })();
const rmNoiseV = (() => { const r = rng(11); return Array.from({ length: 26 }, () => randn(r)); })();
function drawRM() {
  const noise = +$("#rmNoise").value, bias = +$("#rmBias").value, W = 460, H = 240, L = 34, R = 10, T = 10, B = 24, s = mk("#figRM", W, H);
  const x = lin(0, 77, L, W - R), y = lin(0, 130, H - B, T);
  yAxis(s, y, [0, 50, 100], L, W - R);
  el("rect", { x: x(52), y: T, width: x(77) - x(52), height: H - B - T, fill: css("soft") }, s);
  const sn = rmBase.slice(0, 26), act = rmBase.slice(52), truth = act.map((_, i) => 60 + 30 * Math.sin(2 * Math.PI * (52 + i) / 52));
  const mine = truth.map((v, i) => v + bias + noise * rmNoiseV[i]);
  el("path", { d: path(rmBase.map((v, t) => [x(t), y(v)])), fill: "none", stroke: css("ink"), "stroke-width": 1.6 }, s);
  el("path", { d: path(sn.map((v, i) => [x(52 + i), y(v)])), fill: "none", stroke: css("muted"), "stroke-dasharray": "4 3", "stroke-width": 1.6 }, s);
  el("path", { d: path(mine.map((v, i) => [x(52 + i), y(v)])), fill: "none", stroke: css("a1"), "stroke-width": 2.2 }, s);
  txt(s, x(53), T + 12, "forecast window", { class: "t-ink" });
  const rmse = (a, b) => Math.sqrt(a.reduce((z, v, i) => z + (v - b[i]) ** 2, 0) / a.length);
  const e1 = rmse(mine, act), e0 = rmse(sn, act), r = e1 / e0;
  $("#rmOut").innerHTML = `my RMSE ${e1.toFixed(1)} ÷ copy-last-year RMSE ${e0.toFixed(1)} = <b style="color:var(--${r < 1 ? "a3" : "warn"})">RMSSE ${r.toFixed(2)}</b> · blue = my forecast, dashed = last year`;
}
["#rmNoise", "#rmBias"].forEach(i => $(i).addEventListener("input", drawRM)); drawRM();

}
if (document.querySelector("#figGL")) {
/* ---------------- global windows */
const glSeries = (() => { const r = rng(3); return Array.from({ length: 6 }, (_, k) => { let v = 0; return Array.from({ length: 90 }, (_, t) => (v = .8 * v + randn(r)) + 3 * Math.sin(2 * Math.PI * t / (20 + 6 * k))); }); })();
let glWins = [];
function drawGL() {
  const W = 460, H = 260, s = mk("#figGL", W, H), L = 8, R = 120, rowH = 40;
  const x = lin(0, 89, L, W - R);
  glSeries.forEach((ser, k) => {
    const mn = Math.min(...ser), mx = Math.max(...ser), y = lin(mn, mx, 8 + k * rowH + 32, 8 + k * rowH + 4);
    el("path", { d: path(ser.map((v, t) => [x(t), y(v)])), fill: "none", stroke: css("ink"), "stroke-width": 1.2 }, s);
  });
  glWins.forEach(([k, t0], j) => { const fresh = j >= glWins.length - 20; el("rect", { x: x(t0), y: 8 + k * rowH + 2, width: x(t0 + 14) - x(t0), height: 32, fill: "none", stroke: css(fresh ? "a2" : "a1"), "stroke-width": fresh ? 1.6 : .8, opacity: fresh ? 1 : .35 }, s); });
  el("rect", { x: W - R + 26, y: 90, width: 84, height: 70, rx: 8, fill: css("a1") }, s);
  txt(s, W - R + 68, 122, "one", { "text-anchor": "middle", style: "fill:var(--panel);font-weight:600" }); txt(s, W - R + 68, 138, "model", { "text-anchor": "middle", style: "fill:var(--panel);font-weight:600" });
  for (let k = 0; k < 6; k++) el("line", { x1: W - R + 4, y1: 8 + k * rowH + 18, x2: W - R + 24, y2: 125, class: "ax" }, s);
  $("#glOut").textContent = glWins.length ? `${glWins.length} windows drawn from ${new Set(glWins.map(w => w[0])).size} of 6 series (the real run: ${fmt(D.n_series)} series, thousands of windows per epoch)` : "Each orange box is a training example: 28 weeks in, 14 weeks out.";
}
const glR = rng(99);
$("#glBtn").addEventListener("click", () => { for (let i = 0; i < 20; i++) glWins.push([Math.floor(glR() * 6), Math.floor(glR() * 76)]); drawGL(); });
$("#glReset").addEventListener("click", () => { glWins = []; drawGL(); }); drawGL();

}
if (document.querySelector("#figNH")) {
/* ---------------- NHITS */
function pooled(a, k) { const out = []; for (let i = 0; i < a.length; i += k) { const c = a.slice(i, i + k); const m = c.reduce((z, v) => z + v, 0) / c.length; for (let j = 0; j < c.length; j++) out.push(m); } return out; }
function smoothInterp(a, k) { // knots at block centres, linear interpolation
  const kn = []; for (let i = 0; i < a.length; i += k) { const c = a.slice(i, i + k); kn.push([i + (c.length - 1) / 2, c.reduce((z, v) => z + v, 0) / c.length]); }
  return a.map((_, t) => { if (t <= kn[0][0]) return kn[0][1]; for (let j = 1; j < kn.length; j++) if (t <= kn[j][0]) { const [x0, y0] = kn[j - 1], [x1, y1] = kn[j]; return y0 + (y1 - y0) * (t - x0) / (x1 - x0); } return kn[kn.length - 1][1]; });
}
function drawNH(n) {
  const ser = D.examples.smooth.y.slice(0, 96), W = 900, H = 300, L = 50, R = 14, T = 12, B = 24, s = mk("#figNH", W, H);
  const s1 = smoothInterp(ser, 8), r1 = ser.map((v, i) => v - s1[i]), s2 = smoothInterp(r1, 4), r2 = r1.map((v, i) => v - s2[i]), s3 = r2;
  const parts = [s1, s2, s3], cols = ["a1", "a3", "a2"];
  const recon = ser.map((_, i) => parts.slice(0, n).reduce((z, p) => z + p[i], 0));
  const x = lin(0, ser.length - 1, L, W - R), mx = Math.max(...ser) * 1.08, mn = Math.min(0, ...r1), y = lin(mn, mx, H - B, T);
  yAxis(s, y, ticks(mn, mx, 4), L, W - R);
  el("path", { d: path(ser.map((v, t) => [x(t), y(v)])), fill: "none", stroke: css("muted"), "stroke-width": 1.2, opacity: .7 }, s);
  for (let k = 1; k < n; k++) el("path", { d: path(parts[k].map((v, t) => [x(t), y(v)])), fill: "none", stroke: css(cols[k]), "stroke-width": 1.2, opacity: .8 }, s);
  el("path", { d: path(recon.map((v, t) => [x(t), y(v)])), fill: "none", stroke: css(cols[n - 1]), "stroke-width": 2.4 }, s);
  if (n === 1) for (let i = 0; i < ser.length; i += 8) { const c = ser.slice(i, i + 8); el("circle", { cx: x(i + (c.length - 1) / 2), cy: y(s1[Math.min(i + 3, ser.length - 1)]), r: 4, fill: css("a1") }, s); }
  txt(s, W - R, T + 12, ["sum = stack 1 (12 knots)", "sum = stack 1 + 2", "sum = stack 1 + 2 + 3 (exact)"][n - 1], { "text-anchor": "end", class: "t-ink t-b" });
  txt(s, W - R, T + 28, "grey = actual · thin lines = each stack's own part", { "text-anchor": "end" });
}
drawNH(1); seg("#nhStack", v => drawNH(+v));

}
if (document.querySelector("#pbTau")) {
/* ---------------- pinball */
const pbDemand = (() => { const r = rng(5); return Array.from({ length: 400 }, () => Math.max(0, Math.exp(3.6 + .45 * randn(r)))); })().sort((a, b) => a - b);
function drawPB() {
  const tau = $("#pbTau").value / 100, W = 460, H = 250, L = 36, R = 10, T = 10, B = 30, s = mk("#figPB", W, H);
  const x = lin(0, 140, L, W - R);
  // histogram
  const bins = 28, bw = 140 / bins, cnt = Array(bins).fill(0); pbDemand.forEach(v => { const b = Math.min(bins - 1, Math.floor(v / bw)); cnt[b]++; });
  const yh = lin(0, Math.max(...cnt) * 1.1, H - B, H / 2);
  cnt.forEach((c, i) => el("rect", { x: x(i * bw) + 1, y: yh(c), width: x(bw) - x(0) - 2, height: H - B - yh(c), fill: css("soft") }, s));
  // expected pinball loss vs forecast
  const loss = q => pbDemand.reduce((z, d) => z + (d >= q ? tau * (d - q) : (1 - tau) * (q - d)), 0) / pbDemand.length;
  const qs = Array.from({ length: 141 }, (_, i) => i), ls = qs.map(loss), lmx = Math.max(...ls), yl = lin(0, lmx, H - B, T);
  el("path", { d: path(qs.map(q => [x(q), yl(loss(q))])), fill: "none", stroke: css("a1"), "stroke-width": 2.2 }, s);
  const best = qs[ls.indexOf(Math.min(...ls))], emp = pbDemand[Math.floor(tau * pbDemand.length)];
  el("line", { x1: x(best), x2: x(best), y1: T, y2: H - B, stroke: css("a2"), "stroke-width": 2 }, s);
  [0, 50, 100].forEach(v => txt(s, x(v), H - 12, v, { "text-anchor": "middle" }));
  txt(s, (L + W) / 2, H - 1, "forecast (units) · bars = simulated demand", { "text-anchor": "middle" });
  txt(s, x(best) + 5, T + 12, "best forecast", { class: "t-ink" });
  $("#pbOut").innerHTML = `τ = ${tau.toFixed(2)} · loss is lowest at <b>${best}</b> units · the ${Math.round(tau * 100)}th percentile of demand is ${emp.toFixed(0)}`;
}
$("#pbTau").addEventListener("input", drawPB); drawPB();

}
if (document.querySelector("#cfN")) {
/* ---------------- conformal */
let cfLevel = 0.8;
function drawCF() {
  const n = +$("#cfN").value, a = 1 - cfLevel, S = 3000, r = rng(1234 + n * 7);
  const rank = Math.ceil((n + 1) * (1 - a)), kk = Math.min(rank, n);
  let hit = 0;
  for (let i = 0; i < S; i++) { const sc = []; for (let j = 0; j < n; j++) sc.push(Math.abs(randn(r))); sc.sort((p, q) => p - q); const q = sc[kk - 1]; if (Math.abs(randn(r)) <= q) hit++; }
  const cov = hit / S, cap = n / (n + 1), W = 460, H = 220, L = 40, R = 14, T = 16, B = 30, s = mk("#figCF", W, H);
  const x = lin(1, 40, L, W - R), y = lin(0.4, 1, H - B, T);
  yAxis(s, y, [0.5, 0.6, 0.7, 0.8, 0.9, 1], L, W - R, v => Math.round(v * 100) + "%");
  const theo = []; for (let m = 1; m <= 40; m++) { const rk = Math.min(Math.ceil((m + 1) * (1 - a)), m); theo.push([x(m), y(rk / (m + 1))]); }
  el("path", { d: path(theo), fill: "none", stroke: css("a1"), "stroke-width": 2 }, s);
  el("line", { x1: L, x2: W - R, y1: y(cfLevel), y2: y(cfLevel), stroke: css("a3"), "stroke-dasharray": "5 4", "stroke-width": 1.6 }, s);
  txt(s, W - R, y(cfLevel) - 5, "target " + Math.round(cfLevel * 100) + "%", { "text-anchor": "end", style: "fill:var(--a3)" });
  el("line", { x1: x(3), x2: x(3), y1: T, y2: H - B, class: "ax", "stroke-dasharray": "2 3" }, s); txt(s, x(3) + 4, H - B - 6, "Lab 06: n = 3");
  el("circle", { cx: x(n), cy: y(cov), r: 6, fill: css("a2") }, s);
  [1, 10, 20, 30, 40].forEach(v => txt(s, x(v), H - 12, v, { "text-anchor": "middle" }));
  txt(s, (L + W) / 2, H - 1, "calibration scores per series (n)", { "text-anchor": "middle" });
  const capped = rank > n;
  $("#cfOut").innerHTML = `n = ${n}: needed rank ${rank}${capped ? ` &gt; n, so the largest score is used (best possible ${Math.round(cap * 100)}%)` : ""} · simulated coverage <b style="color:var(--${Math.abs(cov - cfLevel) < .03 ? "a3" : "warn"})">${(cov * 100).toFixed(1)}%</b> · line = theory`;
}
$("#cfN").addEventListener("input", drawCF); seg("#cfLvl", v => { cfLevel = +v; drawCF(); }); drawCF();

}
if (document.querySelector("#rcA")) {
/* ---------------- reconciliation */
function drawRC() {
  const a = +$("#rcA").value, b = +$("#rcB").value, t = +$("#rcT").value, w = +$("#rcW").value;
  const bu = [a, b, a + b], td = (() => { const p = a + b ? a / (a + b) : .5; return [t * p, t * (1 - p), t]; })();
  // WLS: minimise (a'-a)^2/w + (b'-b)^2/w + (t'-t)^2/1 s.t. t'=a'+b'. Closed form: gap g=t-(a+b), a'=a+g*w/(2w+1)
  const g = t - (a + b), k = w / (2 * w + 1), mt = [a + g * k, b + g * k, a + b + 2 * g * k];
  const rows = [["Base (incoherent)", [a, b, t]], ["BottomUp", bu], ["TopDown", td], ["MinTrace", mt]];
  const W = 900, H = 240, L = 150, R = 20, T = 26, s = mk("#figRC", W, H), x = lin(0, 400, L, W - R), rh = 48;
  [0, 100, 200, 300, 400].forEach(v => { el("line", { x1: x(v), x2: x(v), y1: T - 6, y2: H - 8, class: "gl" }, s); txt(s, x(v), T - 10, v, { "text-anchor": "middle" }); });
  rows.forEach(([n, v], i) => {
    const y0 = T + i * rh + 4;
    txt(s, L - 10, y0 + 22, n, { "text-anchor": "end", class: "t-ink t-b" });
    el("rect", { x: x(0), y: y0, width: x(v[0]) - x(0), height: 16, fill: css("a1") }, s);
    el("rect", { x: x(v[0]), y: y0, width: x(v[1]) - x(0), height: 16, fill: css("a3") }, s);
    el("rect", { x: x(0), y: y0 + 20, width: x(v[2]) - x(0), height: 16, fill: css("a2") }, s);
    const gap = v[2] - v[0] - v[1];
    txt(s, Math.max(x(v[2]), x(v[0] + v[1])) + 8, y0 + 22, Math.abs(gap) < .5 ? "adds up ✓" : `off by ${fmt(gap)}`, { style: `fill:var(--${Math.abs(gap) < .5 ? "a3" : "warn"})` });
  });
  txt(s, W - R, H - 2, "blue = item A · green = item B · orange = total", { "text-anchor": "end" });
}
["#rcA", "#rcB", "#rcT", "#rcW"].forEach(i => $(i).addEventListener("input", drawRC)); drawRC();

}
if (document.querySelector("#eloD")) {
/* ---------------- Elo */
function drawELO() {
  const d = +$("#eloD").value, p = v => 1 / (1 + Math.pow(10, -v / 400)), W = 460, H = 220, L = 40, R = 14, T = 14, B = 30, s = mk("#figELO", W, H);
  const x = lin(-400, 400, L, W - R), y = lin(0, 1, H - B, T);
  yAxis(s, y, [0, .25, .5, .75, 1], L, W - R, v => Math.round(v * 100) + "%");
  el("path", { d: path(Array.from({ length: 81 }, (_, i) => -400 + i * 10).map(v => [x(v), y(p(v))])), fill: "none", stroke: css("a1"), "stroke-width": 2.2 }, s);
  el("circle", { cx: x(d), cy: y(p(d)), r: 6, fill: css("a2") }, s);
  const btr = Object.fromEntries(RS.l7_bt.map(r => [r[0], r[1]])), dN = btr.NHITSx - btr.Naive;
  el("circle", { cx: x(dN), cy: y(p(dN)), r: 4, fill: "none", stroke: css("ink") }, s); txt(s, x(dN) + 6, y(p(dN)) + 14, "NHITSx vs Naive");
  [-400, -200, 0, 200, 400].forEach(v => txt(s, x(v), H - 12, v, { "text-anchor": "middle" }));
  txt(s, (L + W) / 2, H - 1, "rating difference (points)", { "text-anchor": "middle" });
  $("#eloOut").innerHTML = `${d > 0 ? "+" : ""}${d} points → wins <b>${(p(d) * 100).toFixed(0)}%</b> of series`;
}
$("#eloD").addEventListener("input", drawELO); drawELO();

}
if (document.querySelector("#enR")) {
/* ---------------- ensemble */
function drawEN() {
  const rho = $("#enR").value / 100, W = 460, H = 220, L = 40, R = 14, T = 14, B = 30, s = mk("#figEN", W, H);
  const f = (r, m) => Math.sqrt((1 + (m - 1) * r) / m); // rmse ratio of avg of m equal-variance errors
  const x = lin(0, 1, L, W - R), y = lin(0.3, 1, H - B, T);
  yAxis(s, y, [.3, .5, .7, .9, 1], L, W - R, v => v.toFixed(1));
  [[3, "a2"], [10, "a4"]].forEach(([m, c]) => el("path", { d: path(Array.from({ length: 51 }, (_, i) => i / 50).map(r => [x(r), y(f(r, m))])), fill: "none", stroke: css(c), "stroke-width": 2.2 }, s));
  el("circle", { cx: x(rho), cy: y(f(rho, 3)), r: 6, fill: css("a2") }, s);
  txt(s, x(.02), y(f(0, 3)) - 6, "3 models", { style: "fill:var(--a2)" }); txt(s, x(.02), y(f(0.1, 10)) + 14, "10 models", { style: "fill:var(--a4)" });
  [0, .25, .5, .75, 1].forEach(v => txt(s, x(v), H - 12, v, { "text-anchor": "middle" }));
  txt(s, (L + W) / 2, H - 1, "error correlation between members", { "text-anchor": "middle" });
  $("#enOut").innerHTML = `correlation ${rho.toFixed(2)} → the average of 3 has <b>${(f(rho, 3) * 100).toFixed(0)}%</b> of a single model's error (theory, equally good members)`;
}
$("#enR").addEventListener("input", drawEN); drawEN();

}
if (document.querySelector("#lbLegend")) {
/* ---------------- leaderboard */
const LB = RS.lb;
$("#lbLegend").innerHTML = Object.values(FAM).map(([c, n]) => `<span><i style="background:var(--${c})"></i>${n}</span>`).join("");
let lbM = "mean";
function drawLB() {
  const idx = { mean: 1, median: 2, wape: 3 }[lbM], showE = $("#lbEns").checked;
  const rows = LB.filter(r => showE || r[4] !== "ens").slice().sort((a, b) => a[idx] - b[idx]);
  const W = 900, rh = 22, T = 10, H = T + rows.length * rh + 26, L = 150, R = 60, s = mk("#figLB", W, H);
  const mx = Math.max(...rows.map(r => r[idx])) * 1.05, x = lin(0, mx, L, W - R);
  ticks(0, mx, 6).forEach(v => { el("line", { x1: x(v), x2: x(v), y1: T, y2: H - 22, class: "gl" }, s); txt(s, x(v), H - 8, v, { "text-anchor": "middle" }); });
  if (lbM !== "wape") { el("line", { x1: x(1), x2: x(1), y1: T, y2: H - 22, stroke: css("ink"), "stroke-dasharray": "3 3" }, s); }
  rows.forEach((r, i) => { const y0 = T + i * rh; txt(s, L - 8, y0 + 15, r[0] + (r[4] === "ens" ? " *" : ""), { "text-anchor": "end", class: "t-ink" }); el("rect", { x: L, y: y0 + 3, width: x(r[idx]) - L, height: rh - 7, fill: css(FAM[r[4]][0]), rx: 2, opacity: r[4] === "ens" ? .75 : 1 }, s); txt(s, x(r[idx]) + 5, y0 + 15, r[idx].toFixed(3)); });
}
drawLB(); seg("#lbMetric", v => { lbM = v; drawLB(); }); $("#lbEns").addEventListener("change", drawLB);

}
if (document.querySelector("#figJourney")) {
/* ---------------- journey */
(() => {
  const LBm = Object.fromEntries(RS.lb.map(r => [r[0], r[1]]));
  const st = [["SeasonalNaive", LBm.SeasonalNaive, "base"], ["AutoETS", LBm.AutoETS, "stat"], ["LightGBM|(Day 1)", LBm.LightGBM, "gbm"], ["NHITS default", LBm.NHITS, "nn"], ["NHITS tuned", LBm.NHITS_tuned, "nn"], ["NHITS no covariates", LBm.NHITS_noexog, "nn"], ["NHITS + covariates", LBm.NHITSx, "nn"], ["Chronos-2|+ covariates", LBm.Chronos2_zs_cov, "fm"], ["Chronos-2|fine-tuned", LBm.Chronos2_ft, "fm"]];
  const ylo = Math.floor(Math.min(...st.map(d => d[1])) * 10) / 10 - 0.1, yhi = Math.ceil(Math.max(...st.map(d => d[1])) * 10) / 10;
  const W = 900, H = 280, L = 50, R = 20, T = 20, B = 60, s = mk("#figJourney", W, H), x = i => L + (i + .5) * (W - L - R) / st.length, y = lin(ylo, yhi, H - B, T);
  yAxis(s, y, ticks(ylo, yhi, 4), L, W - R, v => v.toFixed(1));
  el("path", { d: path(st.map((d, i) => [x(i), y(d[1])])), fill: "none", stroke: css("line"), "stroke-width": 2 }, s);
  st.forEach((d, i) => { el("circle", { cx: x(i), cy: y(d[1]), r: 7, fill: css(FAM[d[2]][0]) }, s); txt(s, x(i), y(d[1]) - 12, d[1].toFixed(3), { "text-anchor": "middle", class: "t-ink" }); const w = d[0].split(" "), parts = d[0].includes("|") ? d[0].split("|") : [w.slice(0, 2).join(" "), w.slice(2).join(" ")]; txt(s, x(i), H - B + 20, parts[0], { "text-anchor": "middle" }); if (parts[1]) txt(s, x(i), H - B + 34, parts[1], { "text-anchor": "middle" }); });
  txt(s, W - R, T, `Held-out half: top-3 average ${RS.l7_heldout.top3.toFixed(3)} vs best single ${RS.l7_heldout.best_single[1].toFixed(3)}`, { "text-anchor": "end", style: "fill:var(--a2);font-weight:600" });
})();

}
if (document.querySelector("#figL1")) {
/* ---------------- Lab 01 scatter */
(() => {
  const NM = { DLinear: "DLinear", NBEATS_interpretable: "N-BEATS interp.", NBEATS_generic: "N-BEATS generic", NHITS: "NHITS", LightGBM: "LightGBM (Day 1)" };
  const pts = RS.l1.map(([m, t, r, f]) => [NM[m] || m, t, r, f]);
  const rs = pts.map(p => p[2]), ylo = Math.floor(Math.min(...rs) * 20) / 20 - 0.02, yhi = Math.ceil(Math.max(...rs) * 20) / 20 + 0.02;
  const W = 460, H = 260, L = 46, R = 16, T = 14, B = 34, s = mk("#figL1", W, H), x = lin(0, 40, L, W - R), y = lin(ylo, yhi, H - B, T);
  yAxis(s, y, ticks(ylo, yhi, 4), L, W - R, v => v.toFixed(2));
  [0, 10, 20, 30, 40].forEach(v => txt(s, x(v), H - 16, v + " s", { "text-anchor": "middle" }));
  txt(s, (L + W) / 2, H - 2, "fit time (seconds) → · mean RMSSE ↓", { "text-anchor": "middle" });
  pts.forEach(([n, t, r, f]) => { el("circle", { cx: x(t), cy: y(r), r: 6, fill: css(FAM[f][0]) }, s); const off = { "NHITS": [8, 16, "end"], "N-BEATS interp.": [-8, 18, "end"], "N-BEATS generic": [-8, -10, "end"] }[n] || [8, -6, "start"]; txt(s, x(t) + off[0], y(r) + off[1], n, { "text-anchor": off[2], class: "t-ink" }); });
})();

}
if (document.querySelector("#figL2")) {
/* ---------------- Lab 02 */
(() => {
  const W = 460, H = 260, s = mk("#figL2", W, H), L = 110, R = 50;
  const sp = RS.l2_spread, seed = RS.l2_seed;
  txt(s, 8, 16, "spread in validation RMSSE caused by each setting", { class: "t-ink t-b" });
  const x = lin(0, Math.max(...sp.map(d => d[1])) * 1.05, L, W - R);
  sp.forEach(([n, v], i) => { const y0 = 28 + i * 26; txt(s, L - 8, y0 + 14, n, { "text-anchor": "end", class: "t-ink" }); el("rect", { x: L, y: y0 + 2, width: x(v) - L, height: 16, fill: css(i ? "a1" : "a2"), rx: 2 }, s); txt(s, x(v) + 5, y0 + 14, v.toFixed(3)); });
  el("line", { x1: x(seed), x2: x(seed), y1: 26, y2: 28 + sp.length * 26, stroke: css("ink"), "stroke-dasharray": "3 3" }, s); txt(s, x(seed) + 4, 38 + sp.length * 26, "seed noise " + seed.toFixed(3));
  txt(s, 8, 176, "cost vs gain", { class: "t-ink t-b" });
  const cost = RS.l2_cost, cx = lin(0, Math.max(...cost.map(c => c[1])) * 1.25, L, W - R);
  cost.forEach(([n, c, r], i) => { const y0 = 188 + i * 30; txt(s, L - 8, y0 + 14, `${n} · ${r}`, { "text-anchor": "end", class: "t-ink" }); el("rect", { x: L, y: y0 + 2, width: cx(c) - L, height: 16, fill: css(i ? "a2" : "a1"), rx: 2 }, s); txt(s, cx(c) + 5, y0 + 14, fmt(c) + " s"); });
})();

}
if (document.querySelector("#figL3")) {
/* ---------------- Lab 03 lift */
(() => {
  const LC = { raw: ["Raw data (upper bound)", "muted"], LightGBMx: ["LightGBMx", "a3"], LightGBMx_mono: ["LightGBMx_mono", "a3"], NHITSx: ["NHITSx", "a1"] };
  const d = RS.l3_lift.map(([k, v]) => [LC[k][0], v, LC[k][1]]);
  const W = 460, H = 220, L = 160, R = 50, s = mk("#figL3", W, H), x = lin(0, .9, L, W - R);
  txt(s, 8, 16, "units lift when a promotion is switched on", { class: "t-ink t-b" });
  d.forEach(([n, v, c], i) => { const y0 = 34 + i * 40; txt(s, L - 8, y0 + 17, n, { "text-anchor": "end", class: "t-ink" }); el("rect", { x: L, y: y0 + 4, width: x(v) - L, height: 22, fill: css(c), rx: 2 }, s); txt(s, x(v) + 5, y0 + 19, "+" + Math.round(v * 100) + "%", { class: "t-ink t-b" }); });
})();

}
if (document.querySelector("#figL3b")) {
/* ---------------- Lab 03 covariates */
(() => {
  const a = RS.l3_cov.NHITS_noexog, b = RS.l3_cov.NHITSx, d = [["mean RMSSE", a[0], b[0]], ["median RMSSE", a[1], b[1]], ["WAPE", a[2], b[2]]];
  const W = 460, H = 220, L = 100, R = 20, s = mk("#figL3b", W, H), x = lin(0, Math.max(...d.map(r => Math.max(r[1], r[2]))) * 1.6, L, W - R);
  d.forEach(([n, a, b], i) => { const y0 = 14 + i * 64; txt(s, L - 8, y0 + 26, n, { "text-anchor": "end", class: "t-ink" }); [[a, "a4", "no covariates"], [b, "a1", "NHITSx"]].forEach(([v, c, lab], j) => { el("rect", { x: L, y: y0 + j * 22, width: x(v) - L, height: 18, fill: css(c), rx: 2 }, s); txt(s, x(v) + 5, y0 + j * 22 + 13, v.toFixed(3) + " " + lab); }); });
})();

}
if (document.querySelector("#l5Toggle")) {
/* ---------------- Lab 05 */
const L5 = RS.l5;
const l5On = new Set(["BottomUp", "TopDown", "MinT-wls_var"]);
const L5C = { BottomUp: "a3", TopDown: "a4", "MiddleOut(class)": "a1", "MinT-wls_var": "a2", "MinT-wls_struct": "a5", "MinT-ols": "warn" };
$("#l5Toggle").innerHTML = Object.keys(L5.m).map(k => `<button aria-pressed="${l5On.has(k)}" data-v="${k}">${k}</button>`).join("");
$("#l5Toggle").querySelectorAll("button").forEach(b => b.addEventListener("click", () => { const k = b.dataset.v; l5On.has(k) ? l5On.delete(k) : l5On.add(k); b.setAttribute("aria-pressed", l5On.has(k)); drawL5(); }));
function drawL5() {
  const W = 900, H = 280, L = 50, R = 20, T = 16, B = 34, s = mk("#figL5", W, H), on = Object.keys(L5.m).filter(k => l5On.has(k));
  const yTop = Math.min(3, Math.max(1.35, ...on.flatMap(m => L5.m[m].map((v, i) => v / L5.base[i]))) * 1.05), y = lin(0.9, yTop, H - B, T), gw = (W - L - R) / 5;
  yAxis(s, y, ticks(0.9, yTop, 5), L, W - R, v => v + "×");
  el("line", { x1: L, x2: W - R, y1: y(1), y2: y(1), stroke: css("ink"), "stroke-width": 1.4 }, s);
  L5.levels.forEach((lv, i) => {
    txt(s, L + i * gw + gw / 2, H - 12, lv, { "text-anchor": "middle", class: "t-ink" });
    const bw = Math.min(28, (gw - 20) / Math.max(1, on.length));
    on.forEach((m, j) => { const r = L5.m[m][i] / L5.base[i], rc = Math.min(r, yTop), x0 = L + i * gw + gw / 2 - on.length * bw / 2 + j * bw; const top = y(Math.max(1, rc)), bot = y(Math.min(1, rc)); el("rect", { x: x0 + 1, y: top, width: bw - 2, height: Math.max(1, bot - top), fill: css(L5C[m]) }, s); txt(s, x0 + bw / 2, top - 4, r.toFixed(2), { "text-anchor": "middle", style: "font-size:9px" }); });
  });
}
drawL5();

}
if (document.querySelector("#figL6")) {
/* ---------------- Lab 06 */
(() => {
  const L6 = { NHITS_MQ: ["NHITS_MQ", "a1"], LightGBM_pooled: ["LGBM pooled conf.", "a3"], LightGBM_conf: ["LGBM per-series conf.", "warn"], ETS_conf: ["ETS per-series conf.", "warn"] };
  const d = Object.keys(L6).map(k => [L6[k][0], RS.l6[k][0], RS.l6[k][1], L6[k][1]]);
  const W = 460, H = 240, L = 150, R = 16, T = 26, B = 30, s = mk("#figL6", W, H), x = lin(.6, 1, L, W - R);
  [.6, .7, .8, .9, 1].forEach(v => { el("line", { x1: x(v), x2: x(v), y1: T - 6, y2: H - B, class: "gl" }, s); txt(s, x(v), H - B + 14, Math.round(v * 100) + "%", { "text-anchor": "middle" }); });
  [[.8, "80 target"], [.95, "95 target"]].forEach(([v, n]) => { el("line", { x1: x(v), x2: x(v), y1: T - 6, y2: H - B, stroke: css("ink"), "stroke-dasharray": "4 3" }, s); txt(s, x(v), T - 10, n, { "text-anchor": "middle", class: "t-ink" }); });
  d.forEach(([n, a, b, c], i) => { const y0 = T + 14 + i * 44; txt(s, L - 8, y0 + 4, n, { "text-anchor": "end", class: "t-ink" }); el("line", { x1: x(a), x2: x(b), y1: y0, y2: y0, stroke: css("line"), "stroke-width": 3 }, s); el("circle", { cx: x(a), cy: y0, r: 6, fill: css(c) }, s); el("rect", { x: x(b) - 5, y: y0 - 5, width: 10, height: 10, fill: css(c) }, s); });
  txt(s, W - R, H - 2, "● 80 % interval   ■ 95 % interval", { "text-anchor": "end" });
})();

}
if (document.querySelector("#figL7")) {
/* ---------------- Lab 07 heatmap */
(() => {
  const models = RS.l7_types.models, rows = RS.l7_types.rows;
  const W = 460, H = 266, L = 96, T = 86, cw = (W - L - 40) / 6, ch = 40, s = mk("#figL7", W, H);
  models.forEach((m, j) => txt(s, L + j * cw + cw / 2, T - 8, m.replace("LightGBM", "LGBM").replace("NHITS_", "NHITS ").replace("Chronos2_", "Chronos-2 "), { "text-anchor": "start", transform: `rotate(-35 ${L + j * cw + cw / 2} ${T - 8})`, class: "t-ink" }));
  rows.forEach(([n, v, c], i) => {
    const mn = Math.min(...v), mx = Math.max(...v);
    txt(s, L - 8, T + i * ch + 18, n, { "text-anchor": "end", class: "t-ink" }); txt(s, L - 8, T + i * ch + 31, "n=" + fmt(c), { "text-anchor": "end" });
    v.forEach((val, j) => { const best = val === mn, k = (val - mn) / (mx - mn || 1); el("rect", { x: L + j * cw + 1, y: T + i * ch + 1, width: cw - 2, height: ch - 2, rx: 3, fill: best ? css("a3") : `color-mix(in srgb,var(--a2) ${Math.round(12 + 60 * k)}%,var(--panel))` }, s); txt(s, L + j * cw + cw / 2, T + i * ch + 25, val.toFixed(2), { "text-anchor": "middle", style: best ? "fill:var(--panel);font-weight:600" : "fill:var(--ink)" }); });
  });
})();

}
if (document.querySelector("#figL7b")) {
/* ---------------- Lab 07 slope chart */
(() => {
  const SH = m => m.replace("NBEATS_generic", "NBEATS_g").replace("NBEATS_interpretable", "NBEATS_i");
  const top = RS.l7_mean.filter(r => !/^(ETS|AutoETS|Naive|SeasonalNaive|DLinear)/.test(r[0])).slice(0, 10), keep = new Set(top.map(r => r[0]));
  const mean = top.map(([m, v]) => [SH(m), v]), bt = RS.l7_bt.filter(r => keep.has(r[0])).map(r => SH(r[0]));
  const W = 900, H = 330, xl = 260, xr = 640, T = 40, rh = 28, s = mk("#figL7b", W, H);
  txt(s, xl, 18, "rank by mean RMSSE", { "text-anchor": "end", class: "t-ink t-b" }); txt(s, xr, 18, "rank by Bradley–Terry rating", { class: "t-ink t-b" });
  mean.forEach(([m, v], i) => { const j = bt.indexOf(m), hl = ["NHITSx", "LightGBM", "NHITS_noexog", "Chronos2_zs_cov"].includes(m); const c = hl ? css({ NHITSx: "a1", LightGBM: "a3", NHITS_noexog: "a4", Chronos2_zs_cov: "a6" }[m]) : css("line");
    el("line", { x1: xl + 8, x2: xr - 8, y1: T + i * rh, y2: T + j * rh, stroke: c, "stroke-width": hl ? 3 : 1.4 }, s);
    txt(s, xl, T + i * rh + 4, `${i + 1}. ${m} ${v.toFixed(3)}`, { "text-anchor": "end", class: hl ? "t-ink t-b" : "t-ink" });
  });
  bt.forEach((m, j) => txt(s, xr, T + j * rh + 4, `${j + 1}. ${m}`, { class: ["NHITSx", "LightGBM", "NHITS_noexog", "Chronos2_zs_cov"].includes(m) ? "t-ink t-b" : "t-ink" }));
})();
}

if (document.querySelector("#figL4")) {
/* ---------------- Lab 04 foundation models: validation vs test */
(() => {
  const V = RS.l4.valid, Te = RS.l4.test, C = m => /^(Chronos|TimesFM)/.test(m) ? "a6" : m === "NHITS" ? "a1" : "muted";
  const NM = { Chronos2_zs: "Chronos-2 zero-shot", Chronos2_zs_cov: "Chronos-2 + covariates", Chronos2_ft: "Chronos-2 fine-tuned", TimesFM_zs: "TimesFM 2.5 zero-shot", NHITS: "NHITS (default)", SeasonalNaive: "SeasonalNaive" };
  const ms = Object.keys(Te).sort((a, b) => Te[a][0] - Te[b][0]);
  const vals = ms.flatMap(m => [V[m][0], Te[m][0]]), lo = Math.floor(Math.min(...vals) * 10) / 10 - 0.05, hi = Math.ceil(Math.max(...vals) * 10) / 10;
  const W = 900, rh = 34, T = 30, H = T + ms.length * rh + 34, L = 190, R = 130, s = mk("#figL4", W, H), x = lin(lo, hi, L, W - R);
  ticks(lo, hi, 6).forEach(v => { el("line", { x1: x(v), x2: x(v), y1: T - 8, y2: H - 30, class: "gl" }, s); txt(s, x(v), H - 14, v.toFixed(1), { "text-anchor": "middle" }); });
  txt(s, (L + W - R) / 2, H - 1, "mean RMSSE ↓", { "text-anchor": "middle" });
  txt(s, W - R + 12, T - 12, "s per 1,000 series", { class: "t-ink t-b" });
  ms.forEach((m, i) => {
    const y0 = T + i * rh + 10, c = C(m), [v, t] = [V[m][0], Te[m][0]];
    txt(s, L - 10, y0 + 4, NM[m] || m, { "text-anchor": "end", class: "t-ink" + (m === "Chronos2_zs_cov" ? " t-b" : "") });
    el("line", { x1: x(v), x2: x(t), y1: y0, y2: y0, stroke: css("line"), "stroke-width": 3 }, s);
    el("circle", { cx: x(v), cy: y0, r: 6, fill: "var(--panel)", stroke: css(c), "stroke-width": 2 }, s);
    el("rect", { x: x(t) - 5.5, y: y0 - 5.5, width: 11, height: 11, fill: css(c) }, s);
    txt(s, x(t) - 9, y0 - 9, t.toFixed(3), { "text-anchor": "middle", style: "font-size:10px" });
    txt(s, W - R + 12, y0 + 4, m === "SeasonalNaive" ? "<0.1" : fmt(V[m][3], 1));
  });
  txt(s, L, T - 12, "○ validation (14 weeks before the test)   ■ test (the leaderboard window)", { class: "t-ink" });
})();

}
if (document.querySelector("#suiteTable")) {
/* ---------------- metric suite table */
(() => {
  const S = RS.suite, fam = Object.fromEntries(RS.lb.map(r => [r[0], r[4]]));
  const famOf = m => fam[m] || (m.startsWith("LightGBM") ? "gbm" : m.startsWith("ETS") ? "stat" : "nn");
  const G = {
    scaled: [["mean_rmsse", "mean RMSSE", "lo"], ["median_rmsse", "median RMSSE", "lo"], ["mean_mase", "mean MASE", "lo"], ["median_mase", "median MASE", "lo"]],
    rel: [["avgrelmae", "AvgRelMAE", "lo"], ["avgrelrmse", "AvgRelRMSE", "lo"], ["share_beats_baseline", "share of series beating SeasonalNaive", "hi"]],
    pct: [["mean_smape", "sMAPE (0–1)", "lo"], ["mean_maape", "MAAPE", "lo"], ["mean_rmsle", "RMSLE", "lo"]],
    vol: [["pooled_wape", "WAPE", "lo"], ["pooled_mae", "MAE (units/wk)", "lo"], ["pooled_rmse", "RMSE (units/wk)", "lo"]],
    bias: [["bias_pct", "bias (+ = over)", "zero"], ["share_series_over", "share of series over-forecast", "half"]],
    type: [["rmsse_smooth", "smooth", "lo"], ["rmsse_erratic", "erratic", "lo"], ["rmsse_intermittent", "intermittent", "lo"], ["rmsse_lumpy", "lumpy", "lo"]],
    int: [["coverage_80", "coverage 80 %", "t80"], ["coverage_95", "coverage 95 %", "t95"], ["scaled_winkler_80", "Winkler 80 %", "lo"], ["scaled_winkler_95", "Winkler 95 %", "lo"], ["scaled_crps", "scaled CRPS", "lo"]],
  };
  const NOTE = {
    scaled: "Each series' error divided by the error of its own seasonal-naive forecast in training, then averaged. Mean RMSSE is the leaderboard score; the median is the typical item. MASE (absolute errors) rewards predicting zero on intermittent items, RMSSE (squared) does not.",
    rel: "Geometric mean over series of the model's MAE (or RMSE) divided by SeasonalNaive's, on the test weeks. 0.57 means 43 % less error than copying last year for a typical series.",
    pct: "Percentage-style errors that stay defined when sales are 0. utilsforecast's sMAPE runs from 0 to 1: double it to compare with the M-competition papers.",
    vol: "Pooled over all series, so the best sellers count most: the view of total volume.",
    bias: "Bias is the sum of forecast minus actual over the sum of actuals; + means too much stock. The second column is the share of series whose total forecast is above the total actual.",
    type: "Mean RMSSE within each Syntetos–Boylan demand type (all 17,238 series). Intermittent and lumpy items carry most of the mean.",
    int: "Only models that produce intervals. Coverage is a diagnostic (closest to 80 % / 95 % is marked); the Winkler (interval) score and scaled CRPS are proper scores, lower is better. Chronos-2's 80 % intervals cover about what they promise, but a few series with very wide misses inflate its 95 % Winkler score and CRPS; NHITS_MQ has the best proper scores. TimesFM 2.5 has no 95 % interval (it outputs only the 10–90 % quantiles).",
  };
  const host = $("#suiteTable"), seg = $("#suiteGroup"), note = $("#suiteNote");
  let grp = "scaled", sortK = "mean_rmsse", asc = true;
  const goal = (d, v) => ({ lo: v, hi: -v, zero: Math.abs(v), half: Math.abs(v - .5), t80: Math.abs(v - .8), t95: Math.abs(v - .95) })[d];
  const f = (k, v) => v == null ? "–" : /^(pooled_mae|pooled_rmse)$/.test(k) ? fmt(v) : /^(coverage|share|bias)/.test(k) || k === "pooled_wape" ? (100 * v).toFixed(1) + " %" : v.toFixed(3);
  function draw() {
    const cols = G[grp], dir = Object.fromEntries(cols.map(c => [c[0], c[2]]));
    if (!cols.some(c => c[0] === sortK)) { sortK = cols[0][0]; asc = true; }
    let ms = Object.keys(S).filter(m => cols.some(c => S[m][c[0]] != null));
    ms.sort((a, b) => (asc ? 1 : -1) * (goal(dir[sortK], S[a][sortK]) - goal(dir[sortK], S[b][sortK])));
    const best = Object.fromEntries(cols.map(([k, , d]) => [k, Math.min(...ms.filter(m => fam[m] !== "ens").map(m => goal(d, S[m][k])))]));
    host.innerHTML = `<table class="mtable num-right"><thead><tr><th>Model</th>${cols.map(([k, n]) => `<th><button class="sorth" data-k="${k}">${n}${k === sortK ? (asc ? " ↑" : " ↓") : ""}</button></th>`).join("")}</tr></thead><tbody>` +
      ms.map(m => `<tr><td><i class="dot" style="background:var(--${FAM[famOf(m)][0]})"></i>${m}${fam[m] === "ens" ? " *" : ""}</td>${cols.map(([k, , d]) => `<td class="num${fam[m] !== "ens" && S[m][k] != null && goal(d, S[m][k]) === best[k] ? " best" : ""}">${f(k, S[m][k])}</td>`).join("")}</tr>`).join("") + "</tbody></table>";
    host.querySelectorAll(".sorth").forEach(b => b.addEventListener("click", () => { asc = b.dataset.k === sortK ? !asc : true; sortK = b.dataset.k; draw(); }));
    note.textContent = NOTE[grp];
  }
  seg.querySelectorAll("button").forEach(b => b.addEventListener("click", () => { seg.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); grp = b.dataset.v; draw(); }));
  draw();
})();
}
