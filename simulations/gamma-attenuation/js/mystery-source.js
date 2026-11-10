// mystery-source.js – Bài 6, chế độ Kiểm chứng: "Nguồn bí ẩn".
// Chương trình giấu một nguồn γ trong GAMMA_SOURCES. Học sinh đo tỉ lệ
// truyền qua I/I₀ ở vài độ dày, tính μ = −ln(I/I₀)/x và so với bảng μ
// tham chiếu (NIST) để tìm ra nguồn.

(function () {
    "use strict";

    const PHOTONS_PER_MEASUREMENT = 10000;
    const MATERIALS = ["lead", "aluminum"];

    const materialSelect = document.getElementById("mysteryMaterial");
    const thicknessInput = document.getElementById("mysteryThickness");
    const measureButton = document.getElementById("mysteryMeasureButton");
    const newButton = document.getElementById("mysteryNewButton");
    const status = document.getElementById("mysteryStatus");
    const tableBody = document.getElementById("mysteryTableBody");
    const referenceBody = document.getElementById("mysteryReferenceBody");
    const optionsBox = document.getElementById("mysteryOptions");
    const checkButton = document.getElementById("mysteryCheckButton");
    const feedback = document.getElementById("mysteryFeedback");
    if (!materialSelect || !referenceBody) return;

    // Đây là hoạt động của học sinh: đặt ngay sau phần "Đối chiếu với dữ liệu
    // thực", trước khối kiểm tra nội bộ dành cho giáo viên (real-data.js gói
    // toàn bộ nội dung cũ của panel vào khối đó).
    const section = materialSelect.closest(".mystery-source");
    const panel = document.getElementById("validationPanel");
    const teacherChecks = panel && panel.querySelector(":scope > details.teacher-checks");
    if (section && teacherChecks) panel.insertBefore(section, teacherChecks);

    let hiddenSource = null;

    // Số photon truyền qua: phân bố nhị thức B(n, p), lấy mẫu bằng cách nhảy
    // qua khoảng cách hình học giữa hai "thành công" (giống Bài 4).
    function sampleBinomial(n, p) {
        if (n <= 0 || p <= 0) return 0;
        if (p >= 1) return n;
        if (p > 0.5) return n - sampleBinomial(n, 1 - p);
        const logQ = Math.log(1 - p);
        let successes = 0;
        let position = 0;
        while (true) {
            position += Math.floor(Math.log(1 - Math.random()) / logQ) + 1;
            if (position > n) return successes;
            successes++;
        }
    }

    function materialLabel(material) {
        return material === "lead" ? "Chì" : "Nhôm";
    }

    function buildReferenceTable() {
        referenceBody.innerHTML = GAMMA_SOURCES.map((source) => `
            <tr>
                <td>${source.label}</td>
                <td>${formatGammaEnergyVi(source.energyMeV)}</td>
                ${MATERIALS.map((material) => `<td>${formatVi(getGammaMu(material, source.energyMeV), 4)}</td>`).join("")}
            </tr>`).join("");
    }

    function buildOptions() {
        optionsBox.innerHTML = GAMMA_SOURCES.map((source) => `
            <label class="mystery-option">
                <input type="radio" name="mysteryAnswer" value="${source.id}">
                <span>${source.label}</span>
            </label>`).join("");
    }

    function newSource() {
        hiddenSource = GAMMA_SOURCES[Math.floor(Math.random() * GAMMA_SOURCES.length)];
        tableBody.innerHTML = "";
        feedback.hidden = true;
        feedback.textContent = "";
        optionsBox.querySelectorAll("input").forEach((input) => {
            input.checked = false;
            input.disabled = false;
        });
        checkButton.disabled = true;
        status.textContent = "Đã có một nguồn bí ẩn mới. Em hãy chọn vật liệu, độ dày rồi bấm Đo.";
    }

    function measure() {
        const material = materialSelect.value;
        const x = parseFloat(String(thicknessInput.value).replace(",", "."));
        if (!Number.isFinite(x) || x <= 0 || x > 50) {
            status.textContent = "Độ dày phải lớn hơn 0 và không quá 50 mm.";
            return;
        }
        const mu = getGammaMu(material, hiddenSource.energyMeV);
        const counted = sampleBinomial(PHOTONS_PER_MEASUREMENT, Math.exp(-mu * x));
        const ratio = counted / PHOTONS_PER_MEASUREMENT;
        const muText = counted > 0
            ? formatVi(-Math.log(ratio) / x, 4)
            : "không tính được (I = 0)";
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${materialLabel(material)}</td>
            <td>${formatVi(x, 1)}</td>
            <td>${counted}</td>
            <td>${formatVi(ratio, 4)}</td>
            <td>${muText}</td>`;
        tableBody.appendChild(row);
        status.textContent = counted === 0
            ? "Không photon nào tới đầu dò. Em hãy giảm độ dày."
            : counted > 0.98 * PHOTONS_PER_MEASUREMENT
                ? "Gần như mọi photon đều qua: μ tính được sai số lớn. Em nên tăng độ dày."
                : "Đã ghi kết quả đo. Em có thể đo thêm ở độ dày khác để kiểm tra lại μ.";
    }

    function check() {
        const chosen = optionsBox.querySelector("input:checked");
        if (!chosen) return;
        const right = chosen.value === hiddenSource.id;
        const muLead = formatVi(getGammaMu("lead", hiddenSource.energyMeV), 4);
        const muAl = formatVi(getGammaMu("aluminum", hiddenSource.energyMeV), 4);
        feedback.hidden = false;
        feedback.className = `mystery-feedback ${right ? "right" : "wrong"}`;
        if (right) {
            feedback.innerHTML = `<strong>Đúng.</strong> Nguồn bí ẩn là ${hiddenSource.label}, phát photon ${formatGammaEnergyVi(hiddenSource.energyMeV)}; μ của chì là ${muLead} mm⁻¹, của nhôm là ${muAl} mm⁻¹. μ đo được lệch một chút so với bảng vì số photon đếm được là ngẫu nhiên.`;
            optionsBox.querySelectorAll("input").forEach((input) => { input.disabled = true; });
            checkButton.disabled = true;
        } else {
            feedback.innerHTML = "<strong>Chưa đúng.</strong> Em hãy so μ trung bình của các lần đo với từng dòng của bảng tham chiếu, đúng cột vật liệu em đã dùng. Nếu μ của các lần đo khác nhau nhiều, hãy đo thêm ở độ dày cho I/I₀ trong khoảng 0,1 đến 0,9.";
        }
    }

    measureButton.addEventListener("click", measure);
    newButton.addEventListener("click", newSource);
    checkButton.addEventListener("click", check);
    optionsBox.addEventListener("change", () => {
        checkButton.disabled = false;
        if (feedback.classList.contains("wrong")) feedback.hidden = true;
    });

    buildReferenceTable();
    buildOptions();
    newSource();
})();
