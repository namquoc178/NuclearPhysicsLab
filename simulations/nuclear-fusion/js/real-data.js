// =====================================================================
// real-data.js – Bài Nhiệt hạch hạt nhân
// Kiểm chứng: dùng bảo toàn động lượng và năng lượng để chia Q của
// phản ứng D + T cho neutron và hạt nhân ⁴He, rồi so với năng lượng
// neutron đo được trong các thí nghiệm và lò nhiệt hạch (14,1 MeV).
// =====================================================================

(function () {
    "use strict";

    window.RealDataCheck.mount({
        title: "Neutron của phản ứng D + T mang bao nhiêu năng lượng?",
        intro:
            "Các lò nhiệt hạch thử nghiệm đo được neutron sinh ra từ phản ứng D + T có năng lượng khoảng 14,1 MeV, còn hạt ⁴He khoảng 3,5 MeV. " +
            "Hãy dùng Q tính được trong bài và định luật bảo toàn động lượng để dự đoán các con số này.",
        sources: [
            "Năng lượng neutron D–T 14,1 MeV và hạt α 3,5 MeV: số liệu chuẩn của nghiên cứu nhiệt hạch (ví dụ ITER).",
            "Q và khối lượng: tính trong bài từ khối lượng nguyên tử NIST/AME2020."
        ],
        render(body, ui) {
            const { el, parseNumber, formatNumber, setFeedback } = ui;

            const reaction = getFusionReactionById("D-T-He4-n");
            const q = calculateFusionReactionProperties(reaction).qValueMeV;
            const massHe = getFusionNuclideById("He-4").atomicMassU;
            const massN = NEUTRON_MASS_U;
            // Hai hạt bay ngược chiều với động lượng bằng nhau: p²/2m chia tỉ lệ nghịch khối lượng.
            const neutronEnergy = q * massHe / (massHe + massN);
            const alphaEnergy = q - neutronEnergy;

            const input = el("input", { id: "rdNeutronEnergyInput", inputmode: "decimal", placeholder: "MeV" });
            const check = el("button", { type: "button" }, "Đối chiếu");
            const feedback = el("p", { class: "rd-feedback", "aria-live": "polite" });
            const reveal = el("div", { class: "rd-reveal", hidden: "" });

            check.addEventListener("click", () => {
                const value = parseNumber(input.value);
                if (!Number.isFinite(value)) {
                    setFeedback(feedback, false, "Hãy nhập động năng của neutron (MeV).");
                    return;
                }
                const ok = Math.abs(value - neutronEnergy) <= 0.2;
                setFeedback(feedback, ok, ok
                    ? `Đúng: neutron mang khoảng ${formatNumber(neutronEnergy, 2)} MeV.`
                    : "Chưa đúng. Hai hạt có động lượng bằng nhau, nên động năng W = p²/2m tỉ lệ nghịch với khối lượng: W_n = Q·m_He / (m_He + m_n).");
                reveal.hidden = false;
                reveal.textContent =
                    `Tính toán: W_n = ${formatNumber(q, 2)} × ${formatNumber(massHe, 3)} / (${formatNumber(massHe, 3)} + ${formatNumber(massN, 3)}) ` +
                    `≈ ${formatNumber(neutronEnergy, 2)} MeV; W_He ≈ ${formatNumber(alphaEnergy, 2)} MeV. ` +
                    "Đo đạc thực tế: neutron khoảng 14,1 MeV, ⁴He khoảng 3,5 MeV. Neutron nhẹ nên nhận phần lớn năng lượng; " +
                    "vì neutron không mang điện, nó thoát khỏi plasma và mang năng lượng ra lớp vỏ lò để sinh nhiệt.";
            });

            body.append(
                el("div", { class: "rd-step" },
                    el("h3", {}, "1. Số liệu"),
                    el("p", {}, `Q của phản ứng D + T → ⁴He + n tính trong bài: ${formatNumber(q, 3)} MeV. ` +
                        `Khối lượng: m_He ≈ ${formatNumber(massHe, 4)} u, m_n ≈ ${formatNumber(massN, 4)} u. ` +
                        "Bỏ qua động năng ban đầu của D và T (rất nhỏ so với Q).")),
                el("div", { class: "rd-step" },
                    el("h3", {}, "2. Dự đoán động năng của neutron"),
                    el("div", { class: "rd-input-row" },
                        el("label", { for: "rdNeutronEnergyInput" }, "W_n ="), input, el("span", {}, "MeV"), check),
                    feedback,
                    reveal)
            );
        }
    });
})();
