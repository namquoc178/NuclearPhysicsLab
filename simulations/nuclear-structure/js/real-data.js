// =====================================================================
// real-data.js – Bài Cấu tạo hạt nhân và đồng vị
// Kiểm chứng: tính nguyên tử khối trung bình từ đồng vị và độ phổ biến,
// rồi so với nguyên tử khối ghi trong bảng tuần hoàn.
// Số liệu: NIST, Atomic Weights and Isotopic Compositions.
// =====================================================================

(function () {
    "use strict";

    const ELEMENTS = {
        Cl: {
            name: "Chlorine (Cl, Z = 17)",
            tableValue: 35.45,
            isotopes: [
                { label: "Cl-35", A: 35, mass: 34.968852682, abundance: 75.76 },
                { label: "Cl-37", A: 37, mass: 36.965902602, abundance: 24.24 }
            ]
        },
        C: {
            name: "Carbon (C, Z = 6)",
            tableValue: 12.011,
            isotopes: [
                { label: "C-12", A: 12, mass: 12.0, abundance: 98.93 },
                { label: "C-13", A: 13, mass: 13.00335483507, abundance: 1.07 }
            ]
        },
        Ne: {
            name: "Neon (Ne, Z = 10)",
            tableValue: 20.180,
            isotopes: [
                { label: "Ne-20", A: 20, mass: 19.9924401762, abundance: 90.48 },
                { label: "Ne-21", A: 21, mass: 20.993846685, abundance: 0.27 },
                { label: "Ne-22", A: 22, mass: 21.991385114, abundance: 9.25 }
            ]
        },
        Fe: {
            name: "Sắt (Fe, Z = 26)",
            tableValue: 55.845,
            isotopes: [
                { label: "Fe-54", A: 54, mass: 53.93960899, abundance: 5.845 },
                { label: "Fe-56", A: 56, mass: 55.93493633, abundance: 91.754 },
                { label: "Fe-57", A: 57, mass: 56.93539284, abundance: 2.119 },
                { label: "Fe-58", A: 58, mass: 57.93327443, abundance: 0.282 }
            ]
        }
    };

    function averageMass(element) {
        let sum = 0;
        let total = 0;
        for (const isotope of element.isotopes) {
            sum += isotope.mass * isotope.abundance;
            total += isotope.abundance;
        }
        return sum / total;
    }

    window.RealDataCheck.mount({
        title: "Nguyên tử khối trung bình có khớp bảng tuần hoàn không?",
        intro:
            "Mỗi nguyên tố trong tự nhiên là hỗn hợp nhiều đồng vị. Nếu mô hình \"cùng Z, khác số neutron\" đúng, " +
            "thì trung bình khối lượng các đồng vị, tính theo độ phổ biến, phải bằng nguyên tử khối ghi trong bảng tuần hoàn. " +
            "Hãy tự tính rồi kiểm tra.",
        sources: [
            "NIST – Atomic Weights and Isotopic Compositions (khối lượng đồng vị và độ phổ biến).",
            "Nguyên tử khối trong bảng tuần hoàn theo IUPAC (giá trị rút gọn)."
        ],
        render(body, ui) {
            const { el, parseNumber, formatNumber, setFeedback } = ui;

            const select = el("select", { id: "rdElementSelect" });
            for (const [key, element] of Object.entries(ELEMENTS)) {
                select.append(el("option", { value: key }, element.name));
            }

            const tableBody = el("tbody", {});
            const table = el("div", { class: "rd-table-wrap" },
                el("table", { class: "rd-table" },
                    el("thead", {}, el("tr", {},
                        el("th", {}, "Đồng vị"),
                        el("th", {}, "Số neutron N"),
                        el("th", {}, "Khối lượng (u)"),
                        el("th", {}, "Độ phổ biến (%)")
                    )),
                    tableBody
                )
            );

            const input = el("input", { id: "rdAverageInput", inputmode: "decimal", placeholder: "ví dụ 35,45" });
            const check = el("button", { type: "button" }, "Kiểm tra");
            const feedback = el("p", { class: "rd-feedback", "aria-live": "polite" });
            const reveal = el("div", { class: "rd-reveal", hidden: "" });

            function renderElement() {
                const element = ELEMENTS[select.value];
                const Z = Number(element.name.match(/Z = (\d+)/)[1]);
                tableBody.innerHTML = "";
                for (const isotope of element.isotopes) {
                    tableBody.append(el("tr", {},
                        el("td", {}, isotope.label),
                        el("td", {}, String(isotope.A - Z)),
                        el("td", {}, formatNumber(isotope.mass, 6)),
                        el("td", {}, formatNumber(isotope.abundance, isotope.abundance < 1 ? 3 : 2))
                    ));
                }
                input.value = "";
                feedback.textContent = "";
                feedback.className = "rd-feedback";
                reveal.hidden = true;
            }

            check.addEventListener("click", () => {
                const element = ELEMENTS[select.value];
                const value = parseNumber(input.value);
                const exact = averageMass(element);
                if (!Number.isFinite(value)) {
                    setFeedback(feedback, false, "Hãy nhập một số, ví dụ 35,45.");
                    return;
                }
                const ok = Math.abs(value - exact) <= 0.01;
                setFeedback(feedback, ok, ok
                    ? `Đúng. Kết quả tính được ${formatNumber(exact, 3)} u.`
                    : `Chưa đúng. Hãy nhân khối lượng mỗi đồng vị với độ phổ biến (đổi % ra phần thập phân) rồi cộng lại.`);
                reveal.hidden = false;
                reveal.textContent =
                    `M = Σ (mᵢ × xᵢ) = ${formatNumber(exact, 3)} u. Bảng tuần hoàn ghi ${formatNumber(element.tableValue, 3)}. ` +
                    `Chênh lệch ${formatNumber(Math.abs(exact - element.tableValue), 3)} u: nguyên tử khối là trung bình có trọng số ` +
                    `của các đồng vị, nên nó không phải số nguyên dù mỗi số khối A đều là số nguyên.`;
            });

            select.addEventListener("change", renderElement);

            body.append(
                el("div", { class: "rd-step" },
                    el("h3", {}, "1. Chọn nguyên tố và đọc số liệu đồng vị"),
                    el("div", { class: "rd-input-row" }, el("label", { for: "rdElementSelect" }, "Nguyên tố"), select),
                    table
                ),
                el("div", { class: "rd-step" },
                    el("h3", {}, "2. Tính nguyên tử khối trung bình M = Σ mᵢ·xᵢ"),
                    el("div", { class: "rd-input-row" },
                        el("label", { for: "rdAverageInput" }, "M ="), input, el("span", {}, "u"), check),
                    feedback,
                    reveal
                )
            );
            renderElement();
        }
    });
})();
