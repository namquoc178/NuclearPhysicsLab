// =====================================================================
// real-data.js – Bài Suy giảm cường độ tia gamma
// Kiểm chứng: từ μ đo được ở Nhiệm vụ 2, tính hệ số suy giảm khối μ/ρ
// của chì rồi tra bảng NIST để xác định năng lượng photon của nguồn.
// =====================================================================

(function () {
    "use strict";

    const LEAD_DENSITY = 11.35; // g/cm³

    // NIST X-Ray Mass Attenuation Coefficients, chì (Z = 82).
    // 662 keV nội suy log–log giữa 0,6 và 0,8 MeV.
    const NIST_LEAD = [
        { energy: "0,40 MeV", source: "", value: 0.2323 },
        { energy: "0,50 MeV", source: "gần 0,511 MeV của Na-22", value: 0.1614 },
        { energy: "0,60 MeV", source: "", value: 0.1248 },
        { energy: "0,662 MeV", source: "Cs-137", value: 0.1111 },
        { energy: "0,80 MeV", source: "", value: 0.0887 },
        { energy: "1,00 MeV", source: "", value: 0.07102 },
        { energy: "1,25 MeV", source: "Co-60 (trung bình 1,17 và 1,33 MeV)", value: 0.05876 }
    ];

    window.RealDataCheck.mount({
        title: "Từ μ đo được, xác định năng lượng của nguồn γ",
        intro:
            "Hệ số suy giảm khối μ/ρ của chì đã được đo rất chính xác ở nhiều năng lượng photon và công bố trong bảng NIST. " +
            "Nếu cách xử lí số liệu của em đúng, μ đo được ở Nhiệm vụ 2 phải chỉ ra đúng năng lượng của nguồn Cs-137 (662 keV).",
        sources: [
            "NIST – X-Ray Mass Attenuation Coefficients, bảng của chì (Z = 82).",
            "Khối lượng riêng của chì: 11,35 g/cm³."
        ],
        render(body, ui) {
            const { el, parseNumber, formatNumber, setFeedback } = ui;

            const input = el("input", { id: "rdMuInput", inputmode: "decimal", placeholder: "ví dụ 0,127" });
            const useTask = el("button", { type: "button", class: "rd-secondary" }, "Lấy μ từ Nhiệm vụ 2");
            const compute = el("button", { type: "button" }, "Tính μ/ρ");
            const result = el("p", { "aria-live": "polite" });

            const choice = el("select", { id: "rdEnergySelect" }, el("option", { value: "" }, "-- Chọn năng lượng --"));
            const tableBody = el("tbody", {});
            NIST_LEAD.forEach((row, index) => {
                choice.append(el("option", { value: String(index) }, row.energy));
                tableBody.append(el("tr", {},
                    el("td", {}, row.energy),
                    el("td", {}, row.source || "—"),
                    el("td", {}, formatNumber(row.value, 4)),
                    el("td", {}, formatNumber(row.value * LEAD_DENSITY / 10, 4))));
            });
            const check = el("button", { type: "button" }, "Kiểm tra");
            const feedback = el("p", { class: "rd-feedback", "aria-live": "polite" });

            useTask.addEventListener("click", () => {
                // task2ExperimentalMu là biến toàn cục của app.js (Nhiệm vụ 2).
                const measured = typeof task2ExperimentalMu === "number" ? task2ExperimentalMu : NaN;
                if (Number.isFinite(measured) && measured > 0) {
                    input.value = formatNumber(measured, 4);
                } else {
                    result.textContent = "Chưa có μ từ Nhiệm vụ 2. Hãy làm Nhiệm vụ 1 và 2 ở chế độ Thí nghiệm trước.";
                }
            });

            compute.addEventListener("click", () => {
                const mu = parseNumber(input.value);
                if (!Number.isFinite(mu) || mu <= 0) {
                    result.textContent = "Hãy nhập μ (mm⁻¹) lớn hơn 0.";
                    return;
                }
                const massCoefficient = mu * 10 / LEAD_DENSITY;
                result.textContent =
                    `μ/ρ = μ / ρ = ${formatNumber(mu * 10, 3)} cm⁻¹ / 11,35 g/cm³ = ${formatNumber(massCoefficient, 4)} cm²/g. ` +
                    `Hãy tìm trong bảng NIST dòng có μ/ρ gần nhất.`;
            });

            check.addEventListener("click", () => {
                if (choice.value === "") {
                    setFeedback(feedback, false, "Hãy chọn một năng lượng trong danh sách.");
                    return;
                }
                const picked = NIST_LEAD[Number(choice.value)];
                const ok = picked.energy === "0,662 MeV";
                setFeedback(feedback, ok, ok
                    ? "Đúng: μ/ρ em đo được khớp với photon 662 keV của Cs-137. Vì mô phỏng dùng hệ số của bảng NIST, kết quả này cho thấy phương pháp hồi quy của em lấy lại đúng số liệu đo thật."
                    : `Chưa đúng: dòng ${picked.energy} có μ/ρ = ${formatNumber(picked.value, 4)} cm²/g. So lại với μ/ρ em vừa tính.`);
            });

            body.append(
                el("div", { class: "rd-step" },
                    el("h3", {}, "1. Đổi μ đo được thành hệ số suy giảm khối μ/ρ"),
                    el("div", { class: "rd-input-row" },
                        el("label", { for: "rdMuInput" }, "μ ="), input, el("span", {}, "mm⁻¹"), useTask, compute),
                    result),
                el("div", { class: "rd-step" },
                    el("h3", {}, "2. Tra bảng NIST của chì"),
                    el("div", { class: "rd-table-wrap" },
                        el("table", { class: "rd-table" },
                            el("thead", {}, el("tr", {},
                                el("th", {}, "Năng lượng photon"), el("th", {}, "Nguồn tiêu biểu"),
                                el("th", {}, "μ/ρ (cm²/g)"), el("th", {}, "μ của chì (mm⁻¹)"))),
                            tableBody)),
                    el("div", { class: "rd-input-row" },
                        el("label", { for: "rdEnergySelect" }, "Nguồn của bài phát photon năng lượng"), choice, check),
                    feedback,
                    el("p", {}, "Nhận xét: photon năng lượng càng cao thì μ càng nhỏ, tức càng khó chắn. Vì vậy che chắn nguồn Co-60 cần lớp chì dày hơn nguồn Cs-137."))
            );
        }
    });
})();
