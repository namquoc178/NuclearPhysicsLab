// =====================================================================
// real-data.js – Bài Các dạng phân rã phóng xạ
// Kiểm chứng: dùng quy tắc ΔA, ΔZ để dự đoán số lần phân rã α và β⁻
// trong một chuỗi phóng xạ tự nhiên, rồi so với chuỗi thật.
// Chuỗi theo các bảng số liệu hạt nhân (NNDC/IAEA), nhánh chính.
// =====================================================================

(function () {
    "use strict";

    const SERIES = {
        uranium: {
            name: "Chuỗi uranium: U-238 → Pb-206",
            start: { label: "²³⁸U", A: 238, Z: 92 },
            end: { label: "²⁰⁶Pb", A: 206, Z: 82 },
            steps: [
                ["²³⁸U", "α"], ["²³⁴Th", "β⁻"], ["²³⁴Pa", "β⁻"], ["²³⁴U", "α"], ["²³⁰Th", "α"],
                ["²²⁶Ra", "α"], ["²²²Rn", "α"], ["²¹⁸Po", "α"], ["²¹⁴Pb", "β⁻"], ["²¹⁴Bi", "β⁻"],
                ["²¹⁴Po", "α"], ["²¹⁰Pb", "β⁻"], ["²¹⁰Bi", "β⁻"], ["²¹⁰Po", "α"]
            ],
            note: "Có vài nhánh phụ rất hiếm (ví dụ ²¹⁸Po phân rã β⁻); nhánh chính được vẽ ở trên."
        },
        thorium: {
            name: "Chuỗi thorium: Th-232 → Pb-208",
            start: { label: "²³²Th", A: 232, Z: 90 },
            end: { label: "²⁰⁸Pb", A: 208, Z: 82 },
            steps: [
                ["²³²Th", "α"], ["²²⁸Ra", "β⁻"], ["²²⁸Ac", "β⁻"], ["²²⁸Th", "α"], ["²²⁴Ra", "α"],
                ["²²⁰Rn", "α"], ["²¹⁶Po", "α"], ["²¹²Pb", "β⁻"], ["²¹²Bi", "β⁻"], ["²¹²Po", "α"]
            ],
            note: "Tại ²¹²Bi chuỗi tách nhánh: khoảng 64 % phân rã β⁻ thành ²¹²Po, khoảng 36 % phân rã α thành ²⁰⁸Tl rồi β⁻. Cả hai nhánh đều gồm 6 α và 4 β⁻."
        }
    };

    function expectedCounts(series) {
        const alpha = (series.start.A - series.end.A) / 4;
        const beta = 2 * alpha - (series.start.Z - series.end.Z);
        return { alpha, beta };
    }

    window.RealDataCheck.mount({
        title: "Quy tắc ΔA, ΔZ có giải thích được chuỗi phóng xạ tự nhiên?",
        intro:
            "Trong tự nhiên, U-238 và Th-232 phân rã liên tiếp nhiều lần cho tới khi thành chì bền. " +
            "Chỉ dùng quy tắc của bài (α: ΔA = −4, ΔZ = −2; β⁻: ΔA = 0, ΔZ = +1), hãy dự đoán số lần phân rã α và β⁻, " +
            "rồi so với chuỗi phân rã thật.",
        sources: [
            "Chuỗi phân rã tự nhiên của U-238 và Th-232 theo bảng số liệu hạt nhân NNDC (Brookhaven) và IAEA."
        ],
        render(body, ui) {
            const { el, parseNumber, setFeedback } = ui;

            const select = el("select", { id: "rdSeriesSelect" });
            for (const [key, series] of Object.entries(SERIES)) select.append(el("option", { value: key }, series.name));

            const summary = el("p", {});
            const alphaInput = el("input", { id: "rdAlphaInput", inputmode: "numeric", placeholder: "số lần α" });
            const betaInput = el("input", { id: "rdBetaInput", inputmode: "numeric", placeholder: "số lần β⁻" });
            const check = el("button", { type: "button" }, "Kiểm tra dự đoán");
            const feedback = el("p", { class: "rd-feedback", "aria-live": "polite" });
            const reveal = el("div", { class: "rd-reveal", hidden: "" });

            function renderSeries() {
                const series = SERIES[select.value];
                summary.textContent =
                    `Hạt nhân đầu: ${series.start.label} (A = ${series.start.A}, Z = ${series.start.Z}). ` +
                    `Hạt nhân cuối: ${series.end.label} (A = ${series.end.A}, Z = ${series.end.Z}).`;
                alphaInput.value = "";
                betaInput.value = "";
                feedback.textContent = "";
                feedback.className = "rd-feedback";
                reveal.hidden = true;
                reveal.innerHTML = "";
            }

            check.addEventListener("click", () => {
                const series = SERIES[select.value];
                const expected = expectedCounts(series);
                const alpha = parseNumber(alphaInput.value);
                const beta = parseNumber(betaInput.value);
                if (!Number.isFinite(alpha) || !Number.isFinite(beta)) {
                    setFeedback(feedback, false, "Hãy nhập cả số lần α và số lần β⁻.");
                    return;
                }
                const ok = alpha === expected.alpha && beta === expected.beta;
                setFeedback(feedback, ok, ok
                    ? `Đúng: ${expected.alpha} lần α và ${expected.beta} lần β⁻.`
                    : "Chưa đúng. Gợi ý: số lần α = ΔA / 4; sau đó dùng ΔZ = −2·(số α) + (số β⁻).");

                const chain = el("ul", { class: "rd-chain", "aria-label": "Chuỗi phân rã thật" });
                let countAlpha = 0;
                let countBeta = 0;
                for (const [nuclide, type] of series.steps) {
                    chain.append(el("li", {}, nuclide), el("li", { class: "rd-arrow" }, `—${type}→`));
                    if (type === "α") countAlpha++; else countBeta++;
                }
                chain.append(el("li", {}, series.end.label));
                reveal.innerHTML = "";
                reveal.append(
                    el("p", {}, `Chuỗi thật có ${countAlpha} lần α và ${countBeta} lần β⁻, khớp với dự đoán từ quy tắc ΔA, ΔZ:`),
                    chain,
                    el("p", {}, series.note)
                );
                reveal.hidden = false;
            });

            select.addEventListener("change", renderSeries);

            body.append(
                el("div", { class: "rd-step" },
                    el("h3", {}, "1. Chọn chuỗi phóng xạ"),
                    el("div", { class: "rd-input-row" }, el("label", { for: "rdSeriesSelect" }, "Chuỗi"), select),
                    summary
                ),
                el("div", { class: "rd-step" },
                    el("h3", {}, "2. Dự đoán số lần phân rã"),
                    el("div", { class: "rd-input-row" },
                        el("label", { for: "rdAlphaInput" }, "Số lần α"), alphaInput,
                        el("label", { for: "rdBetaInput" }, "Số lần β⁻"), betaInput,
                        check),
                    feedback,
                    reveal
                )
            );
            renderSeries();
        }
    });
})();
