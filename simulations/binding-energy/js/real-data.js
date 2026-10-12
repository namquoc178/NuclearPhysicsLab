// =====================================================================
// real-data.js – Bài Năng lượng liên kết hạt nhân
// Kiểm chứng: so Eₗₖ/A tính từ khối lượng đo được (AME2020) với một
// mô hình lí thuyết độc lập: công thức bán thực nghiệm Weizsäcker
// (mô hình giọt chất lỏng). Mô hình giải thích vì sao đường cong có đỉnh.
// =====================================================================

(function () {
    "use strict";

    // Hệ số (MeV) của công thức Weizsäcker, bộ giá trị thường dùng trong giáo trình.
    const COEFFICIENTS = { volume: 15.75, surface: 17.8, coulomb: 0.711, asymmetry: 23.7, pairing: 11.18 };

    function semfBindingEnergy(A, Z) {
        const N = A - Z;
        let pairing = 0;
        if (Z % 2 === 0 && N % 2 === 0) pairing = COEFFICIENTS.pairing / Math.sqrt(A);
        else if (Z % 2 === 1 && N % 2 === 1) pairing = -COEFFICIENTS.pairing / Math.sqrt(A);
        return COEFFICIENTS.volume * A
            - COEFFICIENTS.surface * Math.pow(A, 2 / 3)
            - COEFFICIENTS.coulomb * Z * (Z - 1) / Math.cbrt(A)
            - COEFFICIENTS.asymmetry * Math.pow(A - 2 * Z, 2) / A
            + pairing;
    }

    function semfSmooth(A, Z) {
        return COEFFICIENTS.volume * A
            - COEFFICIENTS.surface * Math.pow(A, 2 / 3)
            - COEFFICIENTS.coulomb * Z * (Z - 1) / Math.cbrt(A)
            - COEFFICIENTS.asymmetry * Math.pow(A - 2 * Z, 2) / A;
    }

    // Z của hạt nhân bền nhất ứng với mỗi A (đáy thung lũng bền).
    function stableZ(A) {
        return A / (1.98 + 0.0155 * Math.pow(A, 2 / 3));
    }

    function plot(points, el) {
        const ns = "http://www.w3.org/2000/svg";
        const W = 560, H = 270, L = 48, R = 14, T = 14, B = 40;
        const X = A => L + (A / 240) * (W - L - R);
        const Y = v => T + (9.2 - v) / (9.2 - 4) * (H - T - B);
        const svg = document.createElementNS(ns, "svg");
        svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
        svg.setAttribute("role", "img");
        svg.setAttribute("aria-label", "Eₗₖ/A theo A: điểm đo AME2020 và đường công thức Weizsäcker");
        svg.style.width = "100%";
        svg.style.maxWidth = W + "px";
        const add = (name, attrs, text) => {
            const node = document.createElementNS(ns, name);
            for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
            if (text !== undefined) node.textContent = text;
            svg.append(node);
            return node;
        };
        for (let v = 4; v <= 9; v++) {
            add("line", { x1: L, y1: Y(v), x2: W - R, y2: Y(v), stroke: "#eef2f6" });
            add("text", { x: L - 8, y: Y(v) + 4, "text-anchor": "end", "font-size": 11, fill: "#475467" }, String(v));
        }
        for (let A = 0; A <= 240; A += 40) {
            add("text", { x: X(A), y: H - B + 16, "text-anchor": "middle", "font-size": 11, fill: "#475467" }, String(A));
        }
        add("line", { x1: L, y1: H - B, x2: W - R, y2: H - B, stroke: "#98a2b3" });
        add("line", { x1: L, y1: T, x2: L, y2: H - B, stroke: "#98a2b3" });
        add("text", { x: (L + W - R) / 2, y: H - 6, "text-anchor": "middle", "font-size": 12, fill: "#344054" }, "Số khối A");
        add("text", { x: L + 6, y: T + 4, "font-size": 12, fill: "#344054" }, "Eₗₖ/A (MeV/nucleon)");

        // Đường trơn: dùng Z không làm tròn và bỏ số hạng cặp (số hạng này
        // chỉ làm đường cong răng cưa giữa hạt nhân chẵn – lẻ).
        let d = "";
        for (let A = 10; A <= 240; A += 2) {
            const Z = stableZ(A);
            const value = semfSmooth(A, Z) / A;
            d += (d ? " L" : "M") + `${X(A).toFixed(1)} ${Y(value).toFixed(1)}`;
        }
        add("path", { d, fill: "none", stroke: "#d97706", "stroke-width": 2.5 });

        for (const point of points) {
            if (point.measured < 4) continue;
            add("circle", { cx: X(point.A), cy: Y(point.measured), r: 4.5, fill: "#2563eb" });
        }
        add("circle", { cx: W - 190, cy: Y(5.4), r: 4.5, fill: "#2563eb" });
        add("text", { x: W - 180, y: Y(5.4) + 4, "font-size": 11, fill: "#344054" }, "Đo được (AME2020)");
        add("line", { x1: W - 196, y1: Y(4.9), x2: W - 184, y2: Y(4.9), stroke: "#d97706", "stroke-width": 2.5 });
        add("text", { x: W - 180, y: Y(4.9) + 4, "font-size": 11, fill: "#344054" }, "Công thức Weizsäcker");
        return svg;
    }

    window.RealDataCheck.mount({
        title: "Eₗₖ/A đo được có khớp với mô hình giọt chất lỏng?",
        intro:
            "Công thức Weizsäcker coi hạt nhân như một giọt chất lỏng: mỗi nucleon liên kết với các nucleon bên cạnh (số hạng thể tích), " +
            "nucleon ở bề mặt liên kết yếu hơn (số hạng bề mặt), các proton đẩy nhau (số hạng Coulomb). " +
            "Công thức này không dùng khối lượng đo được, nên so với số liệu AME2020 là một phép kiểm chứng độc lập.",
        sources: [
            "Khối lượng nguyên tử: AME2020 (Atomic Mass Evaluation 2020).",
            "Công thức bán thực nghiệm Weizsäcker với hệ số aV = 15,75; aS = 17,8; aC = 0,711; aA = 23,7; aP = 11,18 MeV."
        ],
        render(body, ui) {
            const { el, formatNumber, setFeedback } = ui;

            const points = NUCLEAR_DATA.map(nuclide => {
                const props = calculateNuclideProperties(nuclide);
                return {
                    id: nuclide.id,
                    A: nuclide.A,
                    measured: props.bindingEnergyPerNucleonMeV,
                    model: semfBindingEnergy(nuclide.A, nuclide.Z) / nuclide.A
                };
            });

            const tableBody = el("tbody", {});
            for (const point of points.filter(p => p.A >= 12)) {
                const deviation = (point.model - point.measured) / point.measured * 100;
                tableBody.append(el("tr", {},
                    el("td", {}, point.id),
                    el("td", {}, formatNumber(point.measured, 3)),
                    el("td", {}, formatNumber(point.model, 3)),
                    el("td", {}, `${deviation >= 0 ? "+" : ""}${formatNumber(deviation, 1)} %`)));
            }

            const question = el("select", { id: "rdTermSelect" },
                el("option", { value: "" }, "-- Chọn số hạng --"),
                el("option", { value: "surface" }, "Số hạng bề mặt"),
                el("option", { value: "coulomb" }, "Số hạng Coulomb (proton đẩy nhau)"),
                el("option", { value: "volume" }, "Số hạng thể tích"));
            const check = el("button", { type: "button" }, "Kiểm tra");
            const feedback = el("p", { class: "rd-feedback", "aria-live": "polite" });

            check.addEventListener("click", () => {
                if (!question.value) {
                    setFeedback(feedback, false, "Hãy chọn một số hạng.");
                    return;
                }
                const ok = question.value === "coulomb";
                setFeedback(feedback, ok, ok
                    ? "Đúng. Lực đẩy Coulomb tăng theo Z², nhanh hơn lực hạt nhân, nên Eₗₖ/A giảm dần ở hạt nhân nặng; đó là lí do phân hạch hạt nhân nặng tỏa năng lượng."
                    : "Chưa đúng. Số hạng bề mặt làm hạt nhân NHẸ có Eₗₖ/A thấp. Hãy nghĩ xem lực nào tăng nhanh khi số proton lớn.");
            });

            body.append(
                el("div", { class: "rd-step" },
                    el("h3", {}, "1. So sánh trên đồ thị"),
                    plot(points, el),
                    el("p", {}, "Với A ≥ 12, mô hình lệch số liệu đo được dưới khoảng 3 %. Với hạt nhân rất nhẹ, mô hình giọt chất lỏng không còn đúng vì hạt nhân chỉ có vài nucleon.")),
                el("div", { class: "rd-step" },
                    el("h3", {}, "2. Bảng đối chiếu (MeV/nucleon)"),
                    el("div", { class: "rd-table-wrap" },
                        el("table", { class: "rd-table" },
                            el("thead", {}, el("tr", {},
                                el("th", {}, "Hạt nhân"), el("th", {}, "Đo được (AME2020)"),
                                el("th", {}, "Weizsäcker"), el("th", {}, "Lệch"))),
                            tableBody))),
                el("div", { class: "rd-step" },
                    el("h3", {}, "3. Giải thích"),
                    el("div", { class: "rd-input-row" },
                        el("label", { for: "rdTermSelect" }, "Số hạng nào làm Eₗₖ/A giảm ở hạt nhân nặng?"), question, check),
                    feedback)
            );
        }
    });
})();
