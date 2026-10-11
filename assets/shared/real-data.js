// =====================================================================
// assets/shared/real-data.js
// Khung dùng chung cho phần "Đối chiếu với dữ liệu thực" của chế độ
// Kiểm chứng. Mỗi bài gọi RealDataCheck.mount({...}) trong tệp
// js/real-data.js của bài đó.
//
// mount() làm hai việc:
//  1. Gói toàn bộ nội dung kiểm chứng cũ (kiểm tra nội bộ của chương trình)
//     vào một khối <details> "Kiểm tra nội bộ của mô hình (dành cho giáo viên)".
//  2. Chèn phần hoạt động mới cho học sinh lên đầu bảng Kiểm chứng.
// Tệp này phải được nạp TRƯỚC assets/shared/lesson-ui.js.
// =====================================================================

(function () {
    "use strict";

    // Đọc số từ ô nhập, chấp nhận cả dấu phẩy thập phân kiểu Việt Nam.
    function parseNumber(text) {
        if (typeof text !== "string") return NaN;
        const cleaned = text.trim().replace(/\s/g, "").replace(",", ".");
        if (cleaned === "") return NaN;
        return Number(cleaned);
    }

    // Định dạng số theo kiểu Việt Nam (dấu phẩy thập phân).
    function formatNumber(value, digits) {
        if (!Number.isFinite(value)) return "—";
        return value.toLocaleString("vi-VN", {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits
        });
    }

    // Tạo phần tử nhanh: el("p", {class: "x"}, "nội dung", con...)
    function el(tag, attributes, ...children) {
        const node = document.createElement(tag);
        for (const [key, value] of Object.entries(attributes || {})) {
            if (key === "class") node.className = value;
            else if (key === "html") node.innerHTML = value;
            else node.setAttribute(key, value);
        }
        for (const child of children) {
            if (child === null || child === undefined) continue;
            node.append(child instanceof Node ? child : document.createTextNode(String(child)));
        }
        return node;
    }

    // Hiển thị phản hồi đúng/sai trong một vùng aria-live.
    function setFeedback(node, ok, message) {
        node.className = "rd-feedback " + (ok ? "rd-ok" : "rd-bad");
        node.textContent = (ok ? "✓ " : "✗ ") + message;
    }

    function mount(options) {
        const panel = document.getElementById("validationPanel");
        if (!panel || panel.querySelector(":scope > .real-data-check")) return null;

        // 1. Gói nội dung cũ vào khối dành cho giáo viên.
        const existing = Array.from(panel.childNodes);
        const details = el("details", { class: "teacher-checks" },
            el("summary", {},
                el("strong", {}, "Kiểm tra nội bộ của mô hình"),
                el("span", {}, " (dành cho giáo viên): chương trình tự kiểm tra dữ liệu và thuật toán của chính nó")
            )
        );
        const inner = el("div", { class: "teacher-checks-body" });
        for (const node of existing) inner.append(node);
        details.append(inner);

        // 2. Phần hoạt động mới cho học sinh.
        const section = el("section", { class: "real-data-check", "aria-label": "Đối chiếu với dữ liệu thực" },
            el("p", { class: "rd-kicker" }, "KIỂM CHỨNG"),
            el("h2", {}, options.title),
            el("p", { class: "rd-intro" }, options.intro)
        );
        const body = el("div", { class: "rd-body" });
        section.append(body);
        if (options.sources && options.sources.length) {
            const list = el("ul", {});
            for (const source of options.sources) list.append(el("li", {}, source));
            section.append(el("div", { class: "rd-sources" }, el("strong", {}, "Nguồn dữ liệu đối chiếu"), list));
        }

        panel.append(section, details);
        options.render(body, { el, parseNumber, formatNumber, setFeedback });
        return section;
    }

    window.RealDataCheck = { mount, parseNumber, formatNumber };
})();
