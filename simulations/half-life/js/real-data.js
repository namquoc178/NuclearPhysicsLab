// =====================================================================
// real-data.js – Bài Định luật phóng xạ và chu kì bán rã
// Kiểm chứng: xác định chu kì bán rã từ một bảng số đếm, rồi so với
// chu kì bán rã ghi trong bảng số liệu hạt nhân.
//
// Lưu ý trung thực: bảng số đếm được tạo bằng mô phỏng một phép đo
// (định luật phóng xạ + thăng giáng Poisson + phông nền), dùng đúng chu kì
// bán rã đã công bố của đồng vị. Điều được kiểm chứng là phương pháp
// đồ thị ln N theo t cho lại đúng giá trị trong bảng số liệu.
// =====================================================================

(function () {
    "use strict";

    // Chu kì bán rã theo NNDC (Brookhaven), làm tròn.
    const ISOTOPES = {
        ba137m: { name: "Ba-137m (từ bộ tạo đồng vị Cs-137, dùng trong phòng thí nghiệm)", halfLife: 2.552, unit: "phút", step: 0.5, points: 13, N0: 2400 },
        i131: { name: "I-131 (dùng trong y học)", halfLife: 8.02, unit: "ngày", step: 2, points: 12, N0: 3000 },
        rn222: { name: "Rn-222 (khí phóng xạ tự nhiên)", halfLife: 3.82, unit: "ngày", step: 1, points: 12, N0: 2600 }
    };

    const BACKGROUND = 20; // số đếm phông nền trong mỗi lần đo

    // Số ngẫu nhiên Poisson (thuật toán Knuth cho kì vọng nhỏ, xấp xỉ chuẩn khi lớn).
    function poisson(mean) {
        if (mean > 60) {
            let u = 0, v = 0;
            while (u === 0) u = Math.random();
            while (v === 0) v = Math.random();
            const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
            return Math.max(0, Math.round(mean + Math.sqrt(mean) * z));
        }
        const limit = Math.exp(-mean);
        let k = 0, p = 1;
        do { k++; p *= Math.random(); } while (p > limit);
        return k - 1;
    }

    function makeDataset(isotope) {
        const lambda = Math.LN2 / isotope.halfLife;
        const rows = [];
        for (let i = 0; i < isotope.points; i++) {
            const t = i * isotope.step;
            const counts = poisson(isotope.N0 * Math.exp(-lambda * t) + BACKGROUND);
            rows.push({ t, counts });
        }
        return rows;
    }

    // Hồi quy ln(N − phông) theo t, trọng số = số đếm (Poisson).
    function fit(rows) {
        let sw = 0, sx = 0, sy = 0, sxx = 0, sxy = 0;
        for (const row of rows) {
            const net = row.counts - BACKGROUND;
            if (net <= 0) continue;
            const w = row.counts;
            const y = Math.log(net);
            sw += w; sx += w * row.t; sy += w * y; sxx += w * row.t * row.t; sxy += w * row.t * y;
        }
        const d = sw * sxx - sx * sx;
        const slope = (sw * sxy - sx * sy) / d;
        const intercept = (sy - slope * sx) / sw;
        return { lambda: -slope, intercept, halfLife: Math.LN2 / -slope };
    }

    function plot(rows, result, isotope, el) {
        const W = 520, H = 260, L = 52, R = 14, T = 14, B = 40;
        const ns = "http://www.w3.org/2000/svg";
        const tMax = rows[rows.length - 1].t;
        const ys = rows.filter(r => r.counts - BACKGROUND > 0).map(r => Math.log(r.counts - BACKGROUND));
        const yMax = Math.ceil(Math.max(...ys));
        const yMin = Math.floor(Math.min(...ys)) - 0.5;
        const X = t => L + (t / tMax) * (W - L - R);
        const Y = v => T + (yMax - v) / (yMax - yMin) * (H - T - B);
        const svg = document.createElementNS(ns, "svg");
        svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
        svg.setAttribute("role", "img");
        svg.setAttribute("aria-label", "Đồ thị ln(N − phông) theo thời gian và đường hồi quy");
        svg.style.width = "100%";
        svg.style.maxWidth = W + "px";
        const add = (name, attrs, text) => {
            const node = document.createElementNS(ns, name);
            for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
            if (text !== undefined) node.textContent = text;
            svg.append(node);
            return node;
        };
        add("line", { x1: L, y1: H - B, x2: W - R, y2: H - B, stroke: "#98a2b3" });
        add("line", { x1: L, y1: T, x2: L, y2: H - B, stroke: "#98a2b3" });
        for (let v = Math.ceil(yMin); v <= yMax; v++) {
            add("line", { x1: L, y1: Y(v), x2: W - R, y2: Y(v), stroke: "#eef2f6" });
            add("text", { x: L - 8, y: Y(v) + 4, "text-anchor": "end", "font-size": 11, fill: "#475467" }, String(v));
        }
        // Vạch chia trục t là bội của bước đo cho dễ đọc.
        const tickStep = isotope.step * Math.max(1, Math.round(rows.length / 6));
        for (let t = 0; t <= tMax + 1e-9; t += tickStep) {
            add("text", { x: X(t), y: H - B + 16, "text-anchor": "middle", "font-size": 11, fill: "#475467" }, t.toLocaleString("vi-VN", { maximumFractionDigits: 1 }));
        }
        add("text", { x: (L + W - R) / 2, y: H - 6, "text-anchor": "middle", "font-size": 12, fill: "#344054" }, `t (${isotope.unit})`);
        add("text", { x: L + 6, y: T + 4, "font-size": 12, fill: "#344054" }, "ln(N − phông)");
        add("line", { x1: X(0), y1: Y(result.intercept), x2: X(tMax), y2: Y(result.intercept - result.lambda * tMax), stroke: "#d97706", "stroke-width": 2 });
        for (const row of rows) {
            const net = row.counts - BACKGROUND;
            if (net <= 0) continue;
            add("circle", { cx: X(row.t), cy: Y(Math.log(net)), r: 4, fill: "#2563eb" });
        }
        return svg;
    }

    window.RealDataCheck.mount({
        title: "Xác định chu kì bán rã từ số đếm và đối chiếu bảng số liệu hạt nhân",
        intro:
            "Trong phòng thí nghiệm, người ta không đếm được từng hạt nhân mà đo số đếm của máy dò trong những khoảng thời gian bằng nhau. " +
            "Hãy xác định chu kì bán rã từ bảng số đếm, rồi so với giá trị đã công bố của đồng vị. " +
            "Bảng số đếm được tạo bằng mô phỏng một phép đo thật: có thăng giáng ngẫu nhiên và phông nền.",
        sources: [
            "Chu kì bán rã: NNDC – National Nuclear Data Center (Brookhaven): Ba-137m 2,552 phút; I-131 8,02 ngày; Rn-222 3,82 ngày.",
            `Số đếm mỗi lần đo đã gồm phông nền ${BACKGROUND} số đếm, cần trừ đi trước khi lấy logarit.`
        ],
        render(body, ui) {
            const { el, parseNumber, formatNumber, setFeedback } = ui;

            const select = el("select", { id: "rdIsotopeSelect" });
            for (const [key, isotope] of Object.entries(ISOTOPES)) select.append(el("option", { value: key }, isotope.name));
            const regenerate = el("button", { type: "button", class: "rd-secondary" }, "Đo lại (bộ số liệu mới)");

            const tableBody = el("tbody", {});
            const headTime = el("th", {}, "t");
            const table = el("div", { class: "rd-table-wrap" },
                el("table", { class: "rd-table" },
                    el("thead", {}, el("tr", {}, headTime, el("th", {}, "Số đếm N"), el("th", {}, "N − phông"), el("th", {}, "ln(N − phông)"))),
                    tableBody));

            const plotBox = el("div", { hidden: "" });
            const showPlot = el("button", { type: "button", class: "rd-secondary" }, "Vẽ đồ thị ln N theo t");
            const input = el("input", { id: "rdHalfLifeInput", inputmode: "decimal", placeholder: "chu kì bán rã" });
            const unitLabel = el("span", {});
            const check = el("button", { type: "button" }, "Đối chiếu");
            const feedback = el("p", { class: "rd-feedback", "aria-live": "polite" });
            const reveal = el("div", { class: "rd-reveal", hidden: "" });

            let rows = [];

            function render() {
                const isotope = ISOTOPES[select.value];
                rows = makeDataset(isotope);
                headTime.textContent = `t (${isotope.unit})`;
                unitLabel.textContent = isotope.unit;
                tableBody.innerHTML = "";
                for (const row of rows) {
                    const net = row.counts - BACKGROUND;
                    tableBody.append(el("tr", {},
                        el("td", {}, formatNumber(row.t, isotope.step < 1 ? 1 : 0)),
                        el("td", {}, String(row.counts)),
                        el("td", {}, String(net)),
                        el("td", {}, net > 0 ? formatNumber(Math.log(net), 3) : "—")));
                }
                plotBox.hidden = true;
                plotBox.innerHTML = "";
                input.value = "";
                feedback.textContent = "";
                feedback.className = "rd-feedback";
                reveal.hidden = true;
            }

            showPlot.addEventListener("click", () => {
                const isotope = ISOTOPES[select.value];
                const result = fit(rows);
                plotBox.innerHTML = "";
                plotBox.append(
                    plot(rows, result, isotope, el),
                    el("p", {}, "Đường màu cam là đường thẳng khớp nhất với các điểm. Hệ số góc của nó bằng −λ; từ đó T = ln2 / λ.")
                );
                plotBox.hidden = false;
            });

            check.addEventListener("click", () => {
                const isotope = ISOTOPES[select.value];
                const value = parseNumber(input.value);
                if (!Number.isFinite(value) || value <= 0) {
                    setFeedback(feedback, false, `Hãy nhập chu kì bán rã em tìm được (đơn vị ${isotope.unit}).`);
                    return;
                }
                const result = fit(rows);
                const errorFromData = Math.abs(value - result.halfLife) / result.halfLife;
                const errorFromTable = Math.abs(value - isotope.halfLife) / isotope.halfLife;
                const ok = errorFromData <= 0.1 || errorFromTable <= 0.1;
                setFeedback(feedback, ok, ok
                    ? `Hợp lí: giá trị của em lệch ${formatNumber(errorFromTable * 100, 1)} % so với bảng số liệu.`
                    : "Còn lệch nhiều. Hãy tìm hệ số góc của đồ thị ln(N − phông) theo t, rồi tính T = ln2 / |hệ số góc|.");
                reveal.hidden = false;
                reveal.textContent =
                    `Từ bộ số đếm này, đường hồi quy cho λ = ${formatNumber(result.lambda, 4)} ${isotope.unit}⁻¹, ` +
                    `T = ${formatNumber(result.halfLife, 2)} ${isotope.unit}. Bảng số liệu hạt nhân ghi T = ${formatNumber(isotope.halfLife, isotope.halfLife < 3 ? 3 : 2)} ${isotope.unit}. ` +
                    `Hai giá trị không trùng hoàn toàn vì số đếm có thăng giáng ngẫu nhiên; bấm "Đo lại" để thấy kết quả dao động quanh giá trị công bố.`;
            });

            select.addEventListener("change", render);
            regenerate.addEventListener("click", render);

            body.append(
                el("div", { class: "rd-step" },
                    el("h3", {}, "1. Chọn đồng vị và đọc bảng số đếm"),
                    el("div", { class: "rd-input-row" }, el("label", { for: "rdIsotopeSelect" }, "Đồng vị"), select, regenerate),
                    table),
                el("div", { class: "rd-step" },
                    el("h3", {}, "2. Tuyến tính hóa: ln(N − phông) = ln N₀ − λt"),
                    el("div", { class: "rd-input-row" }, showPlot),
                    plotBox),
                el("div", { class: "rd-step" },
                    el("h3", {}, "3. Nhập chu kì bán rã em xác định được"),
                    el("div", { class: "rd-input-row" }, el("label", { for: "rdHalfLifeInput" }, "T ="), input, unitLabel, check),
                    feedback,
                    reveal)
            );
            render();
        }
    });
})();
