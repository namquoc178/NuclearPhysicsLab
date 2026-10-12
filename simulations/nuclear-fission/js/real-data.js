// =====================================================================
// real-data.js – Bài Phân hạch hạt nhân
// Kiểm chứng: so Q tính từ khối lượng với động năng tổng của các mảnh
// phân hạch đo được trong thí nghiệm, và giải thích phần chênh lệch.
// =====================================================================

(function () {
    "use strict";

    // Động năng tổng trung bình của hai mảnh (trước khi phát neutron),
    // phân hạch U-235 bằng neutron nhiệt: 170,7 ± 0,1 MeV
    // (R. Yanez và cộng sự, 2015, arXiv:1512.06731).
    const MEASURED_TKE_MEV = 170.7;

    window.RealDataCheck.mount({
        title: "Q tính từ khối lượng có khớp với năng lượng đo được?",
        intro:
            "Trong thí nghiệm, người ta đo trực tiếp động năng của hai mảnh phân hạch. Nếu cách tính Q = (m_trước − m_sau)c² là đúng, " +
            "động năng đo được phải gần Q, phần còn thiếu nằm ở năng lượng kích thích của các mảnh (sau đó phát ra neutron và tia γ tức thời).",
        sources: [
            "Động năng tổng trung bình của mảnh phân hạch U-235 (neutron nhiệt): 170,7 MeV – R. Yanez và cộng sự (2015), arXiv:1512.06731.",
            "Phân bố năng lượng mỗi phân hạch: HyperPhysics (Georgia State University), mục Uranium-235 Fission."
        ],
        render(body, ui) {
            const { el, parseNumber, formatNumber, setFeedback } = ui;

            const rows = FISSION_CHANNELS.map(channel => ({
                name: channel.shortName,
                q: calculateFissionChannelProperties(channel).qValueMeV
            }));
            const averageQ = rows.reduce((sum, row) => sum + row.q, 0) / rows.length;

            const tableBody = el("tbody", {});
            for (const row of rows) {
                tableBody.append(el("tr", {}, el("td", {}, row.name), el("td", {}, formatNumber(row.q, 1))));
            }

            const input = el("input", { id: "rdAverageQInput", inputmode: "decimal", placeholder: "MeV" });
            const check = el("button", { type: "button" }, "Đối chiếu");
            const feedback = el("p", { class: "rd-feedback", "aria-live": "polite" });
            const reveal = el("div", { class: "rd-reveal", hidden: "" });

            check.addEventListener("click", () => {
                const value = parseNumber(input.value);
                if (!Number.isFinite(value)) {
                    setFeedback(feedback, false, "Hãy nhập Q trung bình của ba kênh (MeV).");
                    return;
                }
                const ok = Math.abs(value - averageQ) <= 0.5;
                setFeedback(feedback, ok, ok
                    ? `Đúng: Q trung bình ≈ ${formatNumber(averageQ, 1)} MeV.`
                    : "Chưa đúng. Cộng Q của ba kênh rồi chia cho 3.");
                reveal.hidden = false;
                reveal.innerHTML = "";
                reveal.append(
                    el("p", {},
                        `Thí nghiệm đo được động năng tổng trung bình của hai mảnh là ${formatNumber(MEASURED_TKE_MEV, 1)} MeV, ` +
                        `nhỏ hơn Q trung bình của ba kênh khoảng ${formatNumber(averageQ - MEASURED_TKE_MEV, 1)} MeV. ` +
                        "Phần chênh lệch ứng với năng lượng kích thích của các mảnh (lớn nhỏ tùy kênh), được giải phóng ngay sau đó; tính trung bình trên mọi kênh, khoảng 5 MeV đi vào neutron tức thời và khoảng 7 MeV vào tia γ tức thời. " +
                        "Ba kênh trong bài chỉ là ví dụ, nên Q trung bình của chúng không phải trung bình thật trên mọi kênh."),
                    el("p", {},
                        "Sau đó các mảnh còn phân rã β và γ trong nhiều giờ, nhiều năm, thêm khoảng 15 MeV, và phát phản neutrino mang năng lượng ra ngoài. " +
                        "Cộng tất cả lại, mỗi phân hạch tỏa khoảng 200 MeV như SGK nêu."));
            });

            body.append(
                el("div", { class: "rd-step" },
                    el("h3", {}, "1. Q của các kênh trong bài (tính từ khối lượng AME2020)"),
                    el("div", { class: "rd-table-wrap" },
                        el("table", { class: "rd-table" },
                            el("thead", {}, el("tr", {}, el("th", {}, "Kênh phân hạch"), el("th", {}, "Q (MeV)"))),
                            tableBody))),
                el("div", { class: "rd-step" },
                    el("h3", {}, "2. Tính Q trung bình rồi so với số liệu đo"),
                    el("div", { class: "rd-input-row" },
                        el("label", { for: "rdAverageQInput" }, "Q trung bình ="), input, el("span", {}, "MeV"), check),
                    feedback,
                    reveal)
            );
        }
    });
})();
