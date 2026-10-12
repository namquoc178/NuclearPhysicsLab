// =====================================================================
// real-data.js – Bài Khả năng đâm xuyên của bức xạ
// Kiểm chứng: học sinh dùng phần Khám phá để tìm độ dày lớp chắn cần
// thiết, rồi đối chiếu với kết luận thí nghiệm trong SGK và số liệu
// tham khảo cho các nguồn giả định của bài.
// =====================================================================

(function () {
    "use strict";

    const QUESTIONS = [
        {
            id: "rdAlphaPaper",
            label: "α – giấy: độ dày nhỏ nhất chặn hết hạt α",
            unit: "mm",
            accept: value => value > 0 && value <= 1,
            reference: "SGK: một tờ giấy chặn được hạt α. Tầm xa của α khoảng 5 MeV trong giấy chỉ cỡ 0,04–0,05 mm, nên mọi lớp giấy trong bài đều chặn hết α."
        },
        {
            id: "rdBetaAluminum",
            label: "β – nhôm: độ dày nhỏ nhất để không còn hạt β nào qua",
            unit: "mm",
            accept: value => value >= 3.5 && value <= 5,
            reference: "SGK: vài mm nhôm chặn được β. Với β của Sr-90/Y-90 (E_max = 2,28 MeV), tầm xa cực đại theo công thức Katz–Penfold khoảng 1,1 g/cm², tức khoảng 4 mm nhôm."
        },
        {
            id: "rdGammaLead",
            label: "γ – chì: độ dày làm số tia còn khoảng một nửa",
            unit: "mm",
            accept: value => value >= 4.5 && value <= 6.5,
            reference: "Bảng NIST cho tia γ 662 keV (Cs-137): bề dày bán giảm của chì khoảng 5,5 mm. γ chỉ bị làm yếu dần: muốn giảm 1 000 lần cần khoảng 55 mm chì, không có độ dày nào chặn hết hoàn toàn."
        }
    ];

    window.RealDataCheck.mount({
        title: "Kết quả mô phỏng có khớp với thí nghiệm thật?",
        intro:
            "SGK mô tả kết quả thí nghiệm: hạt α bị một tờ giấy chặn lại, hạt β bị vài mm nhôm chặn lại, còn tia γ đi qua được nhiều cm chì. " +
            "Hãy quay lại phần Khám phá, thay đổi loại bức xạ, vật liệu và độ dày để tìm các độ dày dưới đây, rồi đối chiếu.",
        sources: [
            "Kết luận thí nghiệm về khả năng đâm xuyên của α, β, γ trong SGK Vật lí 12.",
            "NIST – X-Ray Mass Attenuation Coefficients (tia γ 662 keV).",
            "Công thức tầm xa Katz–Penfold cho hạt β; quy tắc Bragg–Kleeman cho hạt α."
        ],
        render(body, ui) {
            const { el, parseNumber, setFeedback } = ui;

            const step = el("div", { class: "rd-step" },
                el("h3", {}, "Nhập độ dày em tìm được trong phần Khám phá"));

            for (const question of QUESTIONS) {
                const input = el("input", { id: question.id, inputmode: "decimal", placeholder: "mm" });
                const check = el("button", { type: "button" }, "Đối chiếu");
                const feedback = el("p", { class: "rd-feedback", "aria-live": "polite" });
                const reveal = el("div", { class: "rd-reveal", hidden: "" }, question.reference);

                check.addEventListener("click", () => {
                    const value = parseNumber(input.value);
                    if (!Number.isFinite(value)) {
                        setFeedback(feedback, false, "Hãy nhập một độ dày (mm).");
                        return;
                    }
                    const ok = question.accept(value);
                    setFeedback(feedback, ok, ok
                        ? "Khớp với số liệu tham khảo."
                        : "Chưa khớp. Hãy chạy lại mô phỏng ở vài độ dày khác nhau và quan sát số tia tới đầu dò.");
                    reveal.hidden = false;
                });

                step.append(
                    el("div", { class: "rd-input-row" },
                        el("label", { for: question.id }, question.label), input, el("span", {}, question.unit), check),
                    feedback,
                    reveal
                );
            }

            body.append(step);
        }
    });
})();
