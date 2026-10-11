// =====================================================================
// tests/smoke.mjs
// Kiểm thử giao diện tự động: mở 9 trang ở hai kích thước màn hình,
// chuyển qua 3 chế độ, bấm các nút chạy chính và bắt lỗi JavaScript.
//
// Cài một lần:  npm install --no-save playwright && npx playwright install chromium
// Chạy:         node tests/smoke.mjs            (ảnh chụp lưu ở tests/output/)
//               node tests/smoke.mjs --stub-chart   (khi máy không có mạng
//               và Chart.js vẫn nạp từ CDN: thay Chart.js bằng bản giả)
// =====================================================================

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

let chromium;
try {
    ({ chromium } = await import("playwright"));
} catch {
    const globalPath = process.env.PLAYWRIGHT_MODULE;
    if (!globalPath) {
        console.error("Chưa có Playwright. Cài bằng: npm install --no-save playwright");
        process.exit(2);
    }
    ({ chromium } = await import(globalPath));
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "tests", "output");
fs.mkdirSync(OUT, { recursive: true });
const STUB_CHART = process.argv.includes("--stub-chart");

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css",
    ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".json": "application/json" };

const server = http.createServer((req, res) => {
    let file = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (file.endsWith("/")) file += "index.html";
    const full = path.join(ROOT, file);
    if (!full.startsWith(ROOT) || !fs.existsSync(full)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(full)] || "application/octet-stream" });
    fs.createReadStream(full).pipe(res);
});
await new Promise(resolve => server.listen(0, resolve));
const BASE = `http://localhost:${server.address().port}/`;

const CHART_STUB = `window.Chart=class{constructor(c,cfg){this.canvas=c;this.config=cfg||{};this.data=(cfg&&cfg.data)||{datasets:[]};this.options=(cfg&&cfg.options)||{};}update(){}destroy(){}resize(){}static register(){}};window.Chart.defaults={font:{},plugins:{legend:{labels:{}},tooltip:{}},color:''};`;

// Nút "chạy" chính của từng bài (bấm thử ở chế độ Khám phá).
const LESSONS = [
    ["", []],
    ["simulations/nuclear-structure/", []],
    ["simulations/binding-energy/", []],
    ["simulations/radioactive-decay-types/", []],
    ["simulations/half-life/", ["#startButton"]],
    ["simulations/radiation-penetration/", ["#runButton"]],
    ["simulations/gamma-attenuation/", []],
    ["simulations/nuclear-fission/", []],
    ["simulations/nuclear-fusion/", []]
];

const browser = await chromium.launch();
let problems = 0;
const report = [];

for (const [w, h, tag] of [[1440, 1000, "desktop"], [390, 844, "mobile"]]) {
    for (const [page, buttons] of LESSONS) {
        const context = await browser.newContext({ viewport: { width: w, height: h } });
        const tab = await context.newPage();
        const errors = [];
        const dialogs = [];
        tab.on("pageerror", e => errors.push(e.message));
        tab.on("console", m => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
        tab.on("dialog", d => { dialogs.push(d.message()); d.dismiss(); });
        if (STUB_CHART) {
            await tab.route(/chart(\.umd)?(\.min)?\.js/, r => r.fulfill({ status: 200, contentType: "text/javascript", body: CHART_STUB }));
        }
        await tab.goto(BASE + page, { waitUntil: "load" });
        await tab.waitForTimeout(400);

        const name = (page.split("/")[1] || "home") + "-" + tag;
        await tab.screenshot({ path: path.join(OUT, name + ".png") });

        const overflow = await tab.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        if (overflow > 1) errors.push(`tràn ngang ${overflow}px`);

        for (const selector of buttons) {
            const button = await tab.$(selector);
            if (button && await button.isEnabled()) { await button.click(); await tab.waitForTimeout(800); }
        }

        // Chuyển qua 3 chế độ, mỗi lần đúng một bảng chế độ hiện ra.
        for (const mode of ["experiment", "validation", "explore"]) {
            const button = await tab.$(`#${mode}ModeButton`);
            if (!button) continue;
            await button.click();
            await tab.waitForTimeout(200);
            const visible = await tab.evaluate(() =>
                ["explorePanel", "experimentPanel", "validationPanel"]
                    .filter(id => { const el = document.getElementById(id); return el && el.offsetParent !== null; }));
            if (visible.length !== 1 || !visible[0].startsWith(mode)) errors.push(`chế độ ${mode}: thấy ${visible.join(",") || "không bảng nào"}`);
        }

        if (errors.length) problems += errors.length;
        report.push(`${errors.length ? "✗" : "✓"} ${name}${errors.length ? ": " + errors.join(" | ") : ""}${dialogs.length ? `  (hộp thoại: ${dialogs.length})` : ""}`);
        await context.close();
    }
}

await browser.close();
server.close();
console.log(report.join("\n"));
console.log(`\nKiểm thử giao diện: ${problems === 0 ? "đạt" : problems + " lỗi"}. Ảnh chụp ở tests/output/`);
process.exit(problems === 0 ? 0 : 1);
