// ======================================================
// fusion-conditions.js
// BÀI 10 - NHIỆT HẠCH: ĐIỀU KIỆN XẢY RA PHẢN ỨNG
// ======================================================
//
// Hai hạt nhân nhẹ đều mang điện dương nên đẩy nhau.
// Muốn hợp nhất, chúng phải tiến đủ gần để lực hạt nhân tác dụng,
// tức là vượt (hoặc xuyên hầm qua) rào thế Coulomb:
//
//   V = k·Z₁Z₂e² / r,  với k·e² = 1,44 MeV·fm,
//   r ≈ 1,2·(A₁^(1/3) + A₂^(1/3)) fm  (hai hạt nhân vừa chạm nhau).
//
// Động năng trung bình của hạt trong plasma: W = (3/2)·k_B·T.
// Ngay cả ở 10⁸ K, W chỉ khoảng 13 keV, nhỏ hơn rào thế (~0,4 MeV) hàng
// chục lần: phản ứng xảy ra nhờ các hạt rất nhanh ở đuôi phân bố
// Maxwell–Boltzmann và hiệu ứng xuyên hầm lượng tử.
// ======================================================

const COULOMB_CONSTANT_MEV_FM = 1.44;
const NUCLEAR_RADIUS_CONSTANT_FM = 1.2;
const BOLTZMANN_EV_PER_K = 8.617333262e-5;

// Rào thế Coulomb (MeV) khi hai hạt nhân vừa chạm nhau.
function calculateCoulombBarrierMeV(Z1, A1, Z2, A2) {
    const separationFm =
        NUCLEAR_RADIUS_CONSTANT_FM *
        (Math.cbrt(A1) + Math.cbrt(A2));
    return COULOMB_CONSTANT_MEV_FM * Z1 * Z2 / separationFm;
}

// Động năng trung bình (keV) của một hạt ở nhiệt độ T (K).
function calculateMeanThermalEnergyKeV(temperatureK) {
    return 1.5 * BOLTZMANN_EV_PER_K * temperatureK / 1000;
}

(function setupFusionConditions() {
    const slider = document.getElementById("fusionTemperatureInput");
    if (!slider) {
        return;
    }

    const temperatureOutput = document.getElementById("fusionTemperatureDisplay");
    const energyOutput = document.getElementById("fusionMeanEnergyDisplay");
    const barrierOutput = document.getElementById("fusionBarrierDisplay");
    const ratioOutput = document.getElementById("fusionBarrierRatioDisplay");
    const noteOutput = document.getElementById("fusionConditionNote");

    // Rào thế cho cặp D–T (Z = 1, A = 2 và Z = 1, A = 3).
    const barrierMeV = calculateCoulombBarrierMeV(1, 2, 1, 3);

    const format = (value, digits) =>
        value.toLocaleString("vi-VN", {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits
        });

    function formatTemperature(temperatureK) {
        const exponent = Math.floor(Math.log10(temperatureK));
        const mantissa = temperatureK / Math.pow(10, exponent);
        const superscript = String(exponent)
            .split("")
            .map(d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)])
            .join("");
        return `${format(mantissa, 1)}·10${superscript} K`;
    }

    function update() {
        // Thanh trượt theo thang log: giá trị 6…9 ứng với 10⁶…10⁹ K.
        const temperatureK = Math.pow(10, Number(slider.value));
        const meanEnergyKeV = calculateMeanThermalEnergyKeV(temperatureK);
        const ratio = barrierMeV * 1000 / meanEnergyKeV;

        temperatureOutput.textContent = formatTemperature(temperatureK);
        energyOutput.textContent = `${format(meanEnergyKeV, meanEnergyKeV < 10 ? 2 : 1)} keV`;
        barrierOutput.textContent = `${format(barrierMeV * 1000, 0)} keV`;
        ratioOutput.textContent = `${format(ratio, ratio < 10 ? 1 : 0)} lần`;

        let note;
        if (temperatureK < 5e6) {
            note = "Quá lạnh: gần như không có hạt nào đủ năng lượng để tiến sát nhau, nhiệt hạch không xảy ra đáng kể.";
        } else if (temperatureK < 5e7) {
            note = "Cỡ nhiệt độ lõi Mặt Trời (khoảng 1,5·10⁷ K): phản ứng xảy ra chậm, nhờ một số ít hạt rất nhanh và hiệu ứng xuyên hầm lượng tử.";
        } else if (temperatureK < 5e8) {
            note = "Vùng nhiệt độ của lò nhiệt hạch D–T (khoảng 10⁸ K): động năng trung bình vẫn nhỏ hơn rào thế, nhưng số hạt đủ nhanh đã đủ nhiều để phản ứng diễn ra mạnh.";
        } else {
            note = "Rất nóng: phần lớn hạt có năng lượng đủ cao, nhưng giữ được plasma ở nhiệt độ này là thách thức kĩ thuật lớn.";
        }
        noteOutput.textContent = note;
    }

    slider.addEventListener("input", update);
    update();
})();
