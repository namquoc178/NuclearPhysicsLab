// =====================================================================
// format.js – hiển thị số theo quy ước tiếng Việt (dấu phẩy thập phân)
//
// Chỉ dùng để HIỂN THỊ. Mọi phép tính vẫn dùng số thực bình thường;
// không đưa chuỗi đã định dạng trở lại vào phép tính hay tệp CSV.
// Tệp này phải được nạp trước các tệp JavaScript của bài.
// =====================================================================

(function () {
    "use strict";

    function toVietnameseDecimal(text) {
        return String(text).replace(".", ",");
    }

    // (2.5).toFixedVi(2) -> "2,50". Giống toFixed nhưng dùng dấu phẩy.
    // Lấy prototype của số nguyên thủy trong chính môi trường đang chạy.
    const numberPrototype = (0).constructor.prototype;
    if (!numberPrototype.toFixedVi) {
        Object.defineProperty(numberPrototype, "toFixedVi", {
            value: function (digits) {
                return toVietnameseDecimal(numberPrototype.toFixed.call(this, digits));
            },
            writable: true,
            configurable: true
        });
    }

    // formatVi(931.49410242) -> "931,49410242"; formatVi(0.5, 3) -> "0,500".
    globalThis.formatVi = function (value, digits) {
        const number = Number(value);
        if (!Number.isFinite(number)) return String(value);
        return digits === undefined
            ? toVietnameseDecimal(String(number))
            : toVietnameseDecimal(number.toFixed(digits));
    };

    // Kí hiệu hạt nhân: số khối A và số proton Z xếp chồng thẳng hàng
    // bên trái kí hiệu nguyên tố, như trong sách giáo khoa.
    // nuclideHtml(235, 92, "U") -> kí hiệu ²³⁵₉₂U xếp chồng.
    globalThis.nuclideHtml = function (A, Z, symbol, suffix) {
        return `<span class="nuclide" role="img" aria-label="${symbol}-${A}${suffix ? " ở trạng thái kích thích" : ""}, Z = ${Z}">` +
            `<span class="nuclide-az"><span class="nuclide-a">${A}</span><span class="nuclide-z">${Z}</span></span>` +
            `<span class="nuclide-symbol">${symbol}${suffix || ""}</span></span>`;
    };

    // Trục và chú thích của mọi đồ thị Chart.js dùng định dạng số tiếng Việt.
    // Không nhóm hàng nghìn bằng dấu chấm ("1.000" dễ bị đọc nhầm là 1 khi
    // trang dùng dấu phẩy thập phân); hiển thị giống toFixedVi: "1000", "0,5".
    if (globalThis.Chart && globalThis.Chart.defaults) {
        const chartDefaults = globalThis.Chart.defaults;
        chartDefaults.locale = "vi-VN";
        for (const type of ["linear", "logarithmic"]) {
            const scale = chartDefaults.scales && chartDefaults.scales[type];
            if (scale && scale.ticks) {
                scale.ticks.format = Object.assign({}, scale.ticks.format, { useGrouping: false });
            }
        }
    }
})();
