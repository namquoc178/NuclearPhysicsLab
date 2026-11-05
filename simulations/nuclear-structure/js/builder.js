// builder.js – "Dựng hạt nhân từ Z và N" trong chế độ Khám phá.
// Học sinh nhập Z và N; trang tính A = Z + N và tra NUBASE2020 xem hạt nhân
// đã được quan sát chưa. Nếu có, hiện kí hiệu, chu kì bán rã, kiểu phân rã
// và độ phổ cập; nếu chưa, cho biết khoảng N của các đồng vị đã biết.

(function () {
    "use strict";

    const zInput = document.getElementById("builderZInput");
    const nInput = document.getElementById("builderNInput");
    const aOutput = document.getElementById("builderAOutput");
    const result = document.getElementById("builderResult");
    if (!zInput || !nInput || !aOutput || !result) return;

    const MAX_Z = getMaxObservedZ();

    function readInteger(input) {
        if (input.value.trim() === "") return null;
        const value = Number(input.value);
        return Number.isInteger(value) && value >= 0 ? value : NaN;
    }

    function elementName(symbol) {
        const element = typeof getNuclearElementBySymbol === "function"
            ? getNuclearElementBySymbol(symbol)
            : null;
        return element ? element.vietnameseName : "";
    }

    function showInLessonButton(nuclide) {
        if (typeof getNuclearIsotope !== "function" || !getNuclearIsotope(nuclide.symbol, nuclide.A)) return "";
        return `<button type="button" class="builder-show-button" data-symbol="${nuclide.symbol}" data-a="${nuclide.A}">Xem hạt nhân này trên mô hình</button>`;
    }

    function describeFound(nuclide) {
        const name = elementName(nuclide.symbol);
        const title = nuclide.Z === 0
            ? "Neutron tự do"
            : `${name ? `${name} – ` : ""}${nuclide.label}`;

        let status;
        if (nuclide.stable) {
            status = "Bền: chưa quan sát thấy hạt nhân này phân rã.";
        } else if (nuclide.halfLife === "p-unst") {
            status = "Không bền: hạt nhân tách ra ngay sau khi tạo thành.";
        } else {
            // NUBASE xếp kiểu phân rã theo cường độ giảm dần; chỉ nêu kiểu chính.
            const mainMode = formatDecayModesVi(nuclide.modes.slice(0, 1));
            status = `Phóng xạ, chu kì bán rã ${formatHalfLifeVi(nuclide.halfLife)}`
                + (mainMode ? `; phân rã chủ yếu theo kiểu ${mainMode}.` : ".");
        }

        const nature = nuclide.natural
            ? `Có, độ phổ cập ${formatAbundanceVi(nuclide.abundance)}.`
            : "Không có trong tự nhiên (chỉ tạo ra được trong phòng thí nghiệm hoặc lò phản ứng).";

        return `
            <div class="builder-found">
                <div class="builder-notation">${nuclideHtml(nuclide.A, nuclide.Z, nuclide.symbol)}</div>
                <div>
                    <p class="builder-verdict found">Hạt nhân này đã được quan sát.</p>
                    <h3>${title}</h3>
                    <dl class="builder-facts">
                        <dt>Thành phần</dt><dd>${nuclide.Z} proton và ${nuclide.N} neutron</dd>
                        <dt>Trạng thái</dt><dd>${status}</dd>
                        <dt>Trong tự nhiên</dt><dd>${nature}</dd>
                    </dl>
                    ${showInLessonButton(nuclide)}
                </div>
            </div>`;
    }

    function describeMissing(Z, N) {
        const A = Z + N;
        if (Z === 0) {
            return `<p class="builder-verdict missing">Chưa quan sát được hạt nhân nào chỉ gồm toàn neutron.</p>
                <p>Neutron đứng riêng (Z = 0, N = 1) thì có: em thử nhập Z = 0, N = 1.</p>`;
        }
        if (Z > MAX_Z) {
            return `<p class="builder-verdict missing">Chưa có nguyên tố nào có Z = ${Z}.</p>
                <p>Nguyên tố nặng nhất đã được tạo ra có Z = ${MAX_Z} (${NUBASE_SYMBOLS[MAX_Z]}).</p>`;
        }
        const symbol = NUBASE_SYMBOLS[Z];
        const known = getKnownIsotopes(Z);
        const minN = known[0].N;
        const maxN = known[known.length - 1].N;
        let reason = "";
        if (N < minN) {
            reason = "Hạt nhân này có quá ít neutron so với số proton. Những hạt nhân như vậy rã rất nhanh hoặc không liên kết được, nên chưa quan sát được.";
        } else if (N > maxN) {
            reason = "Hạt nhân này có quá nhiều neutron so với số proton. Những hạt nhân như vậy rã rất nhanh hoặc không liên kết được, nên chưa quan sát được.";
        }
        return `<p class="builder-verdict missing">Hạt nhân ${symbol}-${A} (Z = ${Z}, N = ${N}) chưa được quan sát.</p>
            <p>${known.length} đồng vị đã biết của ${symbol} có số neutron từ N = ${minN} đến N = ${maxN}
            (từ ${symbol}-${known[0].A} đến ${symbol}-${known[known.length - 1].A}). ${reason}</p>`;
    }

    function update() {
        const Z = readInteger(zInput);
        const N = readInteger(nInput);

        if (Z === null || N === null) {
            aOutput.textContent = "—";
            result.innerHTML = "<p>Em hãy nhập cả Z và N.</p>";
            return;
        }
        if (Number.isNaN(Z) || Number.isNaN(N)) {
            aOutput.textContent = "—";
            result.innerHTML = '<p class="builder-verdict missing">Z và N phải là số nguyên không âm.</p>';
            return;
        }

        const A = Z + N;
        aOutput.textContent = String(A);
        if (A === 0) {
            result.innerHTML = '<p class="builder-verdict missing">Hạt nhân phải có ít nhất một nucleon.</p>';
            return;
        }
        const nuclide = findNuclide(Z, A);
        result.innerHTML = nuclide ? describeFound(nuclide) : describeMissing(Z, N);
    }

    // "Xem hạt nhân này trên mô hình": chọn đúng nguyên tố và đồng vị ở bảng điều khiển.
    result.addEventListener("click", (event) => {
        const button = event.target.closest(".builder-show-button");
        if (!button) return;
        const elementSelect = document.getElementById("elementSelect");
        const isotopeSelect = document.getElementById("isotopeSelect");
        elementSelect.value = button.dataset.symbol;
        elementSelect.dispatchEvent(new Event("change"));
        isotopeSelect.value = button.dataset.a;
        isotopeSelect.dispatchEvent(new Event("change"));
        const canvas = document.getElementById("nucleusCanvas");
        if (canvas) canvas.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    zInput.addEventListener("input", update);
    nInput.addEventListener("input", update);
    update();
})();
